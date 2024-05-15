const jwt = require("jsonwebtoken");
const customerModel = require("../models/productModel.js");
const bcrypt = require("bcrypt");
const { get } = require("mongoose");
require('dotenv').config();

const productController = {
    addProduct: async (req, res) => {
        try {
            // Connect the client to the server
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access a specific database
            const database = client.db("PorcheWeb");

            // Access the "Products" collection within the database
            const collection = database.collection("Products");

            // Find the last product document to get the last ProductID
            const lastProduct = await collection.find().sort({ ProductID: -1 }).limit(1).toArray();
            let lastProductId = 0;
            if (lastProduct.length > 0) {
                lastProductId = lastProduct[0].ProductID;
            }

            // Extract product data from the request body
            const { Name, Description, Price, Image } = req.body;

            // Increment the last ProductID by 1 to get the new ProductID
            const newProductId = lastProductId + 1;

            // Create a new product document
            const newProduct = {
                ProductID: newProductId,
                Name: name,
                Description: description,
                Price: price,
                Image: image

            };

            //save product to database
            await newProduct.save();

            // Send a success response
            res.status(201).json({ message: "Product added successfully", productId: newProduct.ProductID });
        } catch (error) {
            // Handle errors
            console.error("Error adding product:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Ensure that the client will close when you finish/error
            await client.close();
        }
    },
    getProducts: async (req, res) => {
        try {
            // Connect the client to the server
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access a specific database
            const database = client.db("PorcheWeb");

            // Access the "Products" collection within the database
            const collection = database.collection("Products");

            // Find all products
            const products = await collection.find().toArray();

            // Send a success response
            res.status(200).json(products);
        } catch (error) {
            // Handle errors
            console.error("Error getting products:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Ensure that the client will close when you finish/error
            await client.close();
        }
    },
    deleteProduct: async (req, res) => {
        try {
            // Connect the client to the server
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access a specific database
            const database = client.db("PorcheWeb");

            // Access the "Products" collection within the database
            const collection = database.collection("Products");

            // Extract the product ID from the request parameters
            const productId = parseInt(req.params.productId);

            // Find and delete the product document with the given ProductID
            const result = await collection.deleteOne({ ProductID: productId });

            if (result.deletedCount === 1) {
                // If a product was deleted successfully
                res.status(200).json({ message: `Product with ProductID ${productId} deleted successfully` });
            } else {
                // If no product was found with the given ProductID
                res.status(404).json({ message: `Product with ProductID ${productId} not found` });
            }
        } catch (error) {
            // Handle errors
            console.error("Error deleting product:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Ensure that the client will close when you finish/error
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },
    editProduct: async (req, res) => {
        try {
            console.log("Received PATCH request");
            const productId = parseInt(req.params.productId);
            console.log("Product ID:", productId);
            console.log("Request Body:", req.body);

            // Connect to MongoDB
            await client.connect();
            console.log("Connected to MongoDB!");

            const database = client.db("PorcheWeb");
            const collection = database.collection("Products");

            const updateQuery = {
                $set: {
                    ProductName: req.body["ProductName"],
                    Description: req.body.Description,
                    Price: req.body.Price,
                    Stock: req.body.Stock
                }
            };

            const result = await collection.updateOne({ ProductID: productId }, updateQuery);

            if (result.modifiedCount === 1) {
                res.status(200).json({ message: `Product with ProductID ${productId} updated successfully` });
            } else {
                res.status(404).json({ message: `Product with ProductID ${productId} not found` });
            }
        } catch (error) {
            console.error("Error editing product:", error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    }
}