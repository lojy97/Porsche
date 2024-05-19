const { MongoClient } = require("mongodb");
const authenticationMiddleware = require('../middleware/authentication');
const authorizationMiddleware = require('../middleware/authorization');
const bcrypt = require('bcrypt');

const client = new MongoClient(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const customerController = {
    deleteCustomer: async (req, res) => {
        console.log("Received DELETE request");
        let connection;
        try {
            // Authentication middleware
            console.log("Received DELETE request")
            authenticationMiddleware(['admin', 'customer'])(req, res, async () => {
                console.log("Authentication passed");
                // Authorization middleware
                authorizationMiddleware(['admin', 'customer'])(req, res, async () => {
                    console.log("Authorization passed");
                    // Connect to MongoDB
                    connection = await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = connection.db("PorcheWeb");
                    const collection = database.collection("Customers");

                    const customerId = parseInt(req.params.customerId);
                    const result = await collection.deleteOne({ CustomerID: customerId });

                    if (result.deletedCount === 1) {
                        res.status(200).json({ message: `Customer with CustomerID ${customerId} deleted successfully` });
                    } else {
                        res.status(404).json({ message: `Customer with CustomerID ${customerId} not found` });
                    }
                });
            });
        } catch (error) {
            console.error("Error deleting customer:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                await connection.close();
                console.log("Connection to MongoDB closed.");
            }
        }
    },

    getCustomer: async (req, res) => {
        let connection;
        try {
            // Authentication middleware
            authenticationMiddleware(['admin', 'customer'])(req, res, async () => {
                // Authorization middleware
                authorizationMiddleware(['admin', 'customer'])(req, res, async () => {
                    try {
                        await client.connect();
                        console.log("Connected to MongoDB!");
    
                        const database = client.db("PorcheWeb");
                        const collection = database.collection("Customers");
                        let customerId;
                       if (req.user.role === 'customer') {
                            // If customer, extract customer ID from JWT payload
                            customerId = req.user.customerId;
                        }else if (req.user.role === 'admin') {
                            console.log(req.body.customerId)
                            // If admin, extract customer ID from request body
                            customerId = req.body.customerId;
                        }
    
                        // Extract customer ID from the JWT payload
                        console.log("Customer ID:", customerId);
    
                        const customer = await collection.findOne({ CustomerID: customerId });
    
                        if (customer) {
                            res.status(200).json(customer);
                        } else {
                            res.status(404).json({ message: `Customer with CustomerID ${customerId} not found` });
                        }
                        
                    } catch (error) {
                        console.error("Error getting customer:", error);
                        res.status(500).json({ message: "Internal server error" });
                    } finally {
                        await client.close();
                        console.log("Connection to MongoDB closed.");
                    }
                });
            });
        } catch (error) {
            console.error("Error authenticating/authorizing:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    getAdminCustomer: async (req, res) => {
        let connection;
        try {
            // Authentication middleware
            authenticationMiddleware(['admin'])(req, res, async () => {
                // Authorization middleware
                authorizationMiddleware(['admin'])(req, res, async () => {
                    try {
                        // Connect to MongoDB
                        connection = await client.connect();
                        console.log("Connected to MongoDB!");
    
                        const database = connection.db("PorcheWeb");
                        const collection = database.collection("Customers");
    
                        // Extract customer ID from the route parameter
                        console.log(req.params);
                        const customerId = parseInt(req.params.id, 10);
                        console.log("Customer ID:", customerId);
    
                        const customer = await collection.findOne({ CustomerID: customerId });
    
                        if (customer) {
                            res.status(200).json(customer);
                        } else {
                            res.status(404).json({ message: `Customer with CustomerID ${customerId} not found` });
                        }
                    } catch (error) {
                        console.error("Error getting customer:", error);
                        res.status(500).json({ message: "Internal server error" });
                    } finally {
                        // Close the connection
                        if (connection) {
                            try {
                                await connection.close();
                                console.log("Connection to MongoDB closed.");
                            } catch (error) {
                                console.error("Error closing MongoDB connection:", error);
                            }
                        }
                    }
                });
            });
        } catch (error) {
            console.error("Error authenticating/authorizing:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    
      

    getAllCustomers: async (req, res) => {
        console.log("Received GET request");
        console.log("Getting all customers...");
        let connection;
        try {
            // Connect to MongoDB
            connection = await client.connect();
            console.log("Connected to MongoDB!");
    
            const database = connection.db("PorcheWeb");
            const collection = database.collection("Customers");
    
            const customers = await collection.find().toArray();
    
            res.status(200).json(customers);
        } catch (error) {
            console.error("Error getting all customers:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Close the connection
            if (connection) {
                try {
                    await connection.close();
                    console.log("Connection to MongoDB closed.");
                } catch (error) {
                    console.error("Error closing MongoDB connection:", error);
                }
            }
        }
    },
    
    

     updateCustomer :async (req, res) => {
        let connection;
        try {
            console.log("Received PUT request");
            authenticationMiddleware(['admin', 'customer'])(req, res, async () => {
                authorizationMiddleware(['admin', 'customer'])(req, res, async () => {
                    await client.connect();
                    console.log("Connected to MongoDB!");
    
                    const database = client.db("PorcheWeb");
                    const collection = database.collection("Customers");
                    // let customerId;
                    let customerId;
                    if (req.user.role === 'admin') {
                        // If admin, extract customer ID from request body
                        customerId = parseInt(req.body.customerId,10);
                    } else if (req.user.role === 'customer') {
                        // If customer, extract customer ID from JWT payload
                        customerId = req.user.customerId;
                    }
                    
                    if (!req.body.Password) {
                        throw new Error('Password is missing');
                    }
    
                    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    
                    const updateQuery = {
                        $set: {
                            Name: req.body.Name,
                            Email: req.body.Email,
                            Address: req.body.Address,
                            Password: hashedPassword
                        }
                    };
    
                    const result = await collection.updateOne({ CustomerID: customerId }, updateQuery);
    
                    if (result.modifiedCount === 1) {
                        res.status(200).json({ message: `Customer with CustomerID ${customerId} updated successfully` });
                    } else {
                        res.status(404).json({ message: `Customer with CustomerID ${customerId} not found` });
                    }
                });
            });
        } catch (error) {
            console.error("Error updating customer:", error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    }
    
};

module.exports = customerController;
