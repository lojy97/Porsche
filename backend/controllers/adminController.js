const jwt = require("jsonwebtoken");
const customerModel = require("../models/adminModel.js");
const bcrypt = require("bcrypt");
require('dotenv').config();

const adminController = {
    
    deleteAdmin: async (req, res) => {
        try {
            // Connect the client to the server
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access a specific database
            const database = client.db("PorcheWeb");

            // Access the "Admins" collection within the database
            const collection = database.collection("Admins");

            // Find the admin document with the given AdminID
            const admin = await collection.findOne({ AdminID: req.params.id });

            // Check if the admin exists
            if (admin) {
                // Delete the admin document
                await collection.deleteOne({ AdminID: req.params.id });
                res.status(200).json({ message: "Admin deleted successfully" });
            } else {
                res.status(404).json({ message: "Admin not found" });
            }
        } catch (error) {
            // Handle errors
            console.error("Error deleting admin:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Ensure that the client will close when you finish/error
            await client.close();
        }
    },
    editAdmin: async (req, res) => {
        try {
            // Connect the client to the server
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access a specific database
            const database = client.db("PorcheWeb");

            // Access the "Admins" collection within the database
            const collection = database.collection("Admins");

            // Find the admin document with the given AdminID
            const admin = await collection.findOne({ AdminID: req.params.id });

            // Check if the admin exists
            if (admin) {
                // Update the admin document
                await collection.updateOne({ AdminID: req.params.id }, { $set: req.body });
                res.status(200).json({ message: "Admin updated successfully" });
            } else {
                res.status(404).json({ message: "Admin not found" });
            }
        } catch (error) {
            // Handle errors
            console.error("Error updating admin:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Ensure that the client will close when you finish/error
            await client.close();
        }
    },
    // get all admins
    getAdmins: async (req, res) => {
        try {
            // Connect the client to the server
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access a specific database
            const database = client.db("PorcheWeb");

            // Access the "Admins" collection within the database
            const collection = database.collection("Admins");

            // Retrieve all admin documents
            const admins = await collection.find().toArray();

            // Send the retrieved documents as a JSON response
            res.json(admins);
        } catch (error) {
            // Handle errors
            console.error("Error retrieving admins:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Ensure that the client will close when you finish/error
            await client.close();
        }
    },
    // get a specific admin
    getSpecificAdmin: async (req, res) => {
        try {
            // Connect the client to the server
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access a specific database
            const database = client.db("PorcheWeb");

            // Access the "Admins" collection within the database
            const collection = database.collection("Admins");

            // Find the admin document with the given AdminID
            const admin = await collection.findOne({ AdminID: req.params.id });

            // Check if the admin exists
            if (admin) {
                res.json(admin);
            } else {
                res.status(404).json({ message: "Admin not found" });
            }
        } catch (error) {
            // Handle errors
            console.error("Error retrieving admin:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Ensure that the client will close when you finish/error
            await client.close();
        }
    }
}
