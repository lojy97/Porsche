const jwt = require("jsonwebtoken");
const customerModel = require("../models/customerModel.js");
const adminModel = require("../models/adminModel.js");
const bcrypt = require("bcrypt");
require('dotenv').config();

const authController = {
    customerRegister: async (req, res) => {
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
    customerLogin: async (req, res) => {

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
    adminRegister: async (req, res) => {
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
    adminLogin: async (req, res) => {
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
    }

};