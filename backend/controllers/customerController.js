const jwt = require("jsonwebtoken");
const customerModel = require("../models/customerModel.js");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const authenticationMiddleware = require('../middleware/authentication');
const authorizationMiddleware = require('../middleware/authorization');

const customerController = {
    deleteCustomer: async (req, res) => {
        try {
            // Authentication middleware
            console.log("Received DELETE request")
            authenticationMiddleware(['admin', 'customer'])(req, res, async () => {
                console.log("Authentication passed");
                // Authorization middleware
                authorizationMiddleware(['admin', 'customer'])(req, res, async () => {
                    console.log("Authorization passed");
                    // Connect to MongoDB
                    await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = client.db("PorcheWeb");
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
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },

    editCustomer: async (req, res) => {
        try {
            console.log("Received PATCH request");
            const customerId = parseInt(req.params.customerId);
            console.log("Customer ID:", customerId);
            console.log("Request Body:", req.body);

            authenticationMiddleware(['admin', 'customer'])(req, res, async () => {
                authorizationMiddleware(['admin', 'customer'])(req, res, async () => {
                    await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = client.db("PorcheWeb");
                    const collection = database.collection("Customers");

                    const updateQuery = {
                        $set: {
                            Name: req.body.name,
                            Email: req.body.email,
                            Address: req.body.address
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
            console.error("Error editing customer:", error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },

    getCustomer: async (req, res) => {
        try {
            // Authentication middleware
            authenticationMiddleware(['admin', 'customer'])(req, res, async () => {
                // Authorization middleware
                authorizationMiddleware(['admin', 'customer'])(req, res, async () => {
                    await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = client.db("PorcheWeb");
                    const collection = database.collection("Customers");

                    const customerId = parseInt(req.params.customerId);
                    const customer = await collection.findOne({ CustomerID: customerId });

                    if (customer) {
                        res.status(200).json(customer);
                    } else {
                        res.status(404).json({ message: `Customer with CustomerID ${customerId} not found` });
                    }
                });
            });
        } catch (error) {
            console.error("Error getting customer:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },

    getAllCustomers: async (req, res) => {
        console.log("Received GET request");
        try {
            // Authentication middleware
            authenticationMiddleware(['admin', 'customer'])(req, res, async () => {
                // Authorization middleware
                authorizationMiddleware(['admin', 'customer'])(req, res, async () => {
                    await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = client.db("PorcheWeb");
                    const collection = database.collection("Customers");

                    const customers = await collection.find().toArray();

                    res.status(200).json(customers);
                });
            });
        } catch (error) {
            console.error("Error getting all customers:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },

    updateCustomer: async (req, res) => {
        try {
            console.log("Received PUT request");
            const customerId = parseInt(req.params.id);

            authenticationMiddleware(['admin', 'customer'])(req, res, async () => {
                authorizationMiddleware(['admin', 'customer'])(req, res, async () => {
                    await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = client.db("PorcheWeb");
                    const collection = database.collection("Customers");

                    const updateQuery = {
                        $set: {
                            Name: req.body.name,
                            Email: req.body.email,
                            Address: req.body.address
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
}

module.exports = customerController;
