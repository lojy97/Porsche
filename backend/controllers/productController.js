require('dotenv').config();

const jwt = require("jsonwebtoken");
const productModel = require("../models/productModel.js");
const bcrypt = require("bcrypt");
const { get } = require("mongoose");


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
            //           const { ProductName, Description, Price, Stock } = req.body;
            const ProductName = req.body.ProductName;
            const Description = req.body.Description;
            const Price = req.body.Price;
            const Stock = req.body.Stock;

            // Increment the last ProductID by 1 to get the new ProductID
            const newProductId = lastProductId + 1;
            console.log(newProductId)
            // Create a new product document
            const newProduct = {
                ProductID: newProductId,
                ProductName: ProductName,
                Description: Description,
                url: "",
                Price: Price,
                Stock: Stock
            };

            // Insert the new customer document into the collection
            await newProduct.save();
            console.log(`Inserted product with ID: ${newProductId}`);


            // Close the connection to the MongoDB client
            //          await client.close();

            res.status(201).json({ message: "Product added successfully", productId: newProductId });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    getAllProducts: async (req, res) => {
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
    },
    //get one product
    getOneProduct: async (req, res) => {
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
            const product = await collection.findOne({ ProductID: productId });
            if (product) {
                // If a product was found with the given productID
                res.status(200).json(product);
            } else {
                // If no product was found with the given productID
                res.status(404).json({ message: `product with productID ${productId} not found` });
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
    }

}
module.exports = productController;