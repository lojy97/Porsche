const jwt = require("jsonwebtoken");
const customerModel = require("../models/adminModel.js");
const bcrypt = require("bcrypt");
require('dotenv').config();

const adminController = {

    register: async (req, res) => {
        try {
            // Connect the client to the server
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access a specific database
            const database = client.db("PorcheWeb");

            // Access the "Admins" collection within the database
            const collection = database.collection("Admins");

            // Find the last admin document to get the last AdminID
            const lastAdmin = await collection.find().sort({ AdminID: -1 }).limit(1).toArray();
            let lastAdminId = 0;
            if (lastAdmin.length > 0) {
                lastAdminId = lastAdmin[0].AdminID;
            }

            // Extract admin data from the request body
            const { Name, Email, Password } = req.body;

            // Increment the last AdminID by 1 to get the new AdminID
            const newAdminId = lastAdminId + 1;
            const hashedPassword = await bcrypt.hash(password, 10)

            // Create a new admin document
            const newAdmin = {
                AdminID: newAdminId,
                Name: name,
                Email: email,
                Password: hashedPassword

            };

            //save admin to database
            await newAdmin.save();

            const payload = {
                adminId: newAdmin.AdminID,
                email: newAdmin.Email
            };
            const token = jwt.sign(payload, 'secretK', { expiresIn: '1h' })

            // Send a success response
            res.status(201).json({ message: "Admin added successfully", adminId: newAdmin.AdminID });
        } catch (error) {
            // Handle errors
            console.error("Error adding admin:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Ensure that the client will close when you finish/error
            await client.close();
        }
    },
    login: async (req, res) => {
        const name = req.body.Name
        const password = req.body.Password
        try {
            // Connect the client to the server
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access a specific database
            const database = client.db("PorcheWeb");

            // Access the "Admins" collection within the database
            const collection = database.collection("Admins");

            // Find the admin document with the given name
            const admin = await collection.findOne({ Name: name });

            // Check if the admin exists
            if (admin) {
                // Compare the given password with the hashed password
                const valid = await bcrypt.compare(password, admin.Password);
                if (valid) {
                    const payload = {
                        adminId: admin.AdminID,
                        email: admin.Email
                    };
                    const token = jwt.sign(payload, 'secretK', { expiresIn: '1h' })
                    res.status(200).json({ message: "Login successful", token: token });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            } else {
                res.status(404).json({ message: "Admin not found" });
            }
        } catch (error) {
            // Handle errors
            console.error("Error logging in admin:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Ensure that the client will close when you finish/error
            await client.close();
        }
    },
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
