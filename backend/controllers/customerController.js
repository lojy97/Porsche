const jwt = require("jsonwebtoken");
const customerModel = require("../models/customerModel.js");
const bcrypt = require("bcrypt");
require('dotenv').config();

const customerController = {
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

