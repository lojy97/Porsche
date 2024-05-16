const jwt = require("jsonwebtoken");
const customerModel = require("../models/customerModel.js");
const bcrypt = require("bcrypt");
require('dotenv').config();

const customerController = {

    regster: async (req, res) => {
        try {
            // Connect the client to the server
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access a specific database
            const database = client.db("PorcheWeb");

            // Access the "Customers" collection within the database
            const collection = database.collection("Customers");

            // Find the last customer document to get the last CustomerID
            const lastCustomer = await collection.find().sort({ CustomerID: -1 }).limit(1).toArray();
            let lastCustomerId = 0;
            if (lastCustomer.length > 0) {
                lastCustomerId = lastCustomer[0].CustomerID;
            }

            // Extract customer data from the request body
            const { Name, Email, Address, Password } = req.body;

            // Increment the last CustomerID by 1 to get the new CustomerID
            const newCustomerId = lastCustomerId + 1;
            const hashedPassword = await bcrypt.hash(password, 10)

            // Create a new customer document
            const newCustomer = {
                CustomerID: newCustomerId,
                Name: name,
                Email: email,
                Address: address,
                Password: hashedPassword

            };

            //save customer to database
            await newCustomer.save();

            const payload = {
                customerId: newCustomer.CustomerID,
                email: newCustomer.Email
            };
            const token = jwt.sign(payload, 'secretK', { expiresIn: '1h' })

            // Send a success response
            res.status(201).json({ message: "Customer added successfully", customerId: newCustomer.CustomerID });
        } catch (error) {
            // Handle errors
            console.error("Error adding customer:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Ensure that the client will close when you finish/error
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },

    login: async (req, res) => {

        const name = req.body.Name
        const password = req.body.Password
        try {
            // Connect to MongoDB
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access the specific database
            const database = client.db("PorcheWeb");

            // Access the "Customers" collection within the database
            const collection = database.collection("Customers");

            // Find the user by name (assuming 'name' is unique)
            const user = await collection.findOne({ Name: name });
            console.log(user)
            if (!user) {
                // If user not found, send error response
                return res.status(401).json({ auth: false, message: 'User not found.' });
            }

            // Compare the provided password with the stored hashed password
            console.log(password)
            console.log(user.Password)
            const validPassword = (password.toString() === user.Password.toString())

            if (!validPassword) {
                // If password is invalid, send error response
                return res.status(401).json({ auth: false, message: 'Invalid password.' });
            }

            const accessToken = jwt.sign(req.body.Name, process.env.ACCESS_TOKEN_SECRET)

            res.cookie('jwt', accessToken, { httpOnly: true })
            res.cookie('info', user, { httpOnly: true })


            // Send success response with the generated token
            res.status(200).json({ auth: true, token: accessToken });
        } catch (error) {
            // Handle errors
            console.error("Error during login:", error.message);
            res.status(500).json({ auth: false, message: "Internal server error" });
        } finally {
            // Close the MongoDB connection
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },

    deleteCustomer: async (req, res) => {
        try {
            // Connect the client to the server
            await client.connect();
            console.log("Connected to MongoDB!");
    
            // Access a specific database
            const database = client.db("PorcheWeb");
    
            // Access the "Customers" collection within the database
            const collection = database.collection("Customers");
    
            // Extract the customer ID from the request parameters
            const customerId = parseInt(req.params.customerId);
    
            // Find and delete the customer document with the given CustomerID
            const result = await collection.deleteOne({ CustomerID: customerId });
    
            if (result.deletedCount === 1) {
                // If a customer was deleted successfully
                res.status(200).json({ message: `Customer with CustomerID ${customerId} deleted successfully` });
            } else {
                // If no customer was found with the given CustomerID
                res.status(404).json({ message: `Customer with CustomerID ${customerId} not found` });
            }
        } catch (error) {
            // Handle errors
            console.error("Error deleting customer:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Ensure that the client will close when you finish/error
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
    
            // Connect to MongoDB
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
        } catch (error) {
            console.error("Error editing customer:", error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },
    //get a certain customer

    getCustomer: async (req, res) => {
        try {
            // Connect the client to the server
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access a specific database
            const database = client.db("PorcheWeb");

            // Access the "Customers" collection within the database
            const collection = database.collection("Customers");

            // Extract the customer ID from the request parameters
            const customerId = parseInt(req.params.customerId);

            // Find the customer document with the given CustomerID
            const customer = await collection.findOne({ CustomerID: customerId });

            if (customer) {
                // If a customer was found with the given CustomerID
                res.status(200).json(customer);
            } else {
                // If no customer was found with the given CustomerID
                res.status(404).json({ message: `Customer with CustomerID ${customerId} not found` });
            }
        } catch (error) {
            // Handle errors
            console.error("Error getting customer:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Ensure that the client will close when you finish/error
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },
    //get all customers 
    getAllCustomers: async (req, res) => {
        try {
            // Connect the client to the server
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access a specific database
            const database = client.db("PorcheWeb");

            // Access the "Customers" collection within the database
            const collection = database.collection("Customers");

            // Find all customer documents
            const customers = await collection.find().toArray();

            // Send the customer documents as a response
            res.status(200).json(customers);
        } catch (error) {
            // Handle errors
            console.error("Error getting all customers:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Ensure that the client will close when you finish/error
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    }
}

