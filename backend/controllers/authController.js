require('dotenv').config();

const jwt = require("jsonwebtoken");
const customerModel = require("../models/customerModel.js");
const adminModel = require("../models/adminModel.js");
const bcrypt = require("bcrypt");

const { MongoClient } = require("mongodb"); // Import MongoClient

const client = new MongoClient(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const authController = {
    customerRegister: async (req, res) => {
        try {
            await client.connect();
            console.log("Connected to MongoDB!");

            const database = client.db("PorcheWeb");
            const collection = database.collection("Customers");

            const lastCustomer = await collection.find().sort({ CustomerID: -1 }).limit(1).toArray();
            let lastCustomerId = 0;
            if (lastCustomer.length > 0) {
                lastCustomerId = lastCustomer[0].CustomerID;
            }

            const { Name, Email, Address, Password } = req.body;

            // Validate input data
            if (!Name || !Email || !Address || !Password) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const newCustomerId = lastCustomerId + 1;
            const hashedPassword = await bcrypt.hash(Password, 10);

            const newCustomer = {
                CustomerID: newCustomerId,
                Name,
                Email,
                Address,
                Password: hashedPassword,
                role: 'customer'
            };

            await collection.insertOne(newCustomer);

            const payload = {
                customerId: newCustomer.CustomerID,
                email: newCustomer.Email,
                role: newCustomer.role
            };
            console.log('SECRET_KEY:', process.env.SECRET_KEY);

            // Ensure SECRET_KEY is loaded from environment variables
            if (!process.env.SECRET_KEY) {
                throw new Error("SECRET_KEY is not defined in environment variables");
            }

            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

            res.status(201).json({ message: "Customer added successfully", customerId: newCustomer.CustomerID, token: token });
        } catch (error) {
            console.error("Error adding customer:", error.message);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },
    customerLogin: async (req, res) => {
        const { Name, Password } = req.body;
        try {
            await client.connect();
            console.log("Connected to MongoDB!");
    
            const database = client.db("PorcheWeb");
            const collection = database.collection("Customers");
    
            const user = await collection.findOne({ Name });
            if (!user) {
                return res.status(401).json({ auth: false, message: 'User not found.' });
            }
    
            const validPassword = await bcrypt.compare(Password, user.Password);
            if (!validPassword) {
                return res.status(401).json({ auth: false, message: 'Invalid password.' });
            }
    
            const payload = { customerId: user.CustomerID, email: user.Email, role: user.role };  // Add role to payload
            const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    
            // Set the JWT token in a cookie
            res.cookie('jwt', accessToken, { httpOnly: true, secure: true, sameSite: 'None' });
    
            res.status(200).json({ auth: true, token: accessToken });
        } catch (error) {
            console.error("Error during login:", error.message);
            res.status(500).json({ auth: false, message: "Internal server error" });
        } finally {
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },

    adminRegister: async (req, res) => {
        try {
            await client.connect();
            console.log("Connected to MongoDB!");
    
            const database = client.db("PorcheWeb");
            const collection = database.collection("Admins");
    
            const lastAdmin = await collection.find().sort({ AdminID: -1 }).limit(1).toArray();
            let lastAdminId = 0;
            if (lastAdmin.length > 0) {
                lastAdminId = lastAdmin[0].AdminID;
            }
    
            const { Name, Email, Password } = req.body;
            const newAdminId = lastAdminId + 1;
    
            // Hash the password with 10 rounds of salt
            const hashedPassword = await bcrypt.hash(Password, 10);
    
            const newAdmin = {
                AdminID: newAdminId,
                Name,
                Email,
                Password: hashedPassword,
                role: 'admin'
            };
    
            await collection.insertOne(newAdmin);
    
            const payload = {
                adminId: newAdmin.AdminID,
                email: newAdmin.Email,
                role: newAdmin.role
            };
            
            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    
            res.status(201).json({ message: "Admin added successfully", adminId: newAdmin.AdminID });
        } catch (error) {
            console.error("Error adding admin:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            await client.close();
        }
    }
    ,
    adminLogin: async (req, res) => {
        const { Name, Password } = req.body;
        try {
            await client.connect();
            console.log("Connected to MongoDB!");
    
            const database = client.db("PorcheWeb");
            const collection = database.collection("Admins");
    
            const admin = await collection.findOne({ Name });
            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }
    
            const validPassword = await bcrypt.compare(Password, admin.Password);
            if (!validPassword) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
    
            const payload = { adminId: admin.AdminID, email: admin.Email, role: admin.role };  // Add role to payload
            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    
            // Set the token in a cookie
            res.cookie('jwt', token, { httpOnly: true }); // Set the cookie named 'jwt' with the token
    
            res.status(200).json({ message: "Login successful", token: token });
        } catch (error) {
            console.error("Error logging in admin:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            await client.close();
        }
    },
    logout: (req, res) => {
        // Clear the JWT cookie
        res.clearCookie('jwt', { httpOnly: true });
        res.status(200).json({ message: "Logout successful" });
    }
    

};
module.exports = authController;