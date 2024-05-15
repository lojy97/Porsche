const jwt = require("jsonwebtoken");
const customerModel = require("../models/cartModel.js");
const bcrypt = require("bcrypt");
const { get } = require("mongoose");
require('dotenv').config();

const cartController = {
    addToCart: async (req, res) => {
        try {
            // const customerId = req.user.id; // Assuming you have the user's ID in the JWT token

            // Connect to MongoDB
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access the specific database
            const database = client.db("PorcheWeb");

            // Access the "Carts" collection within the database
            const cartCollection = database.collection("Carts");

            // Extract item data from the request body
            const { customerId, productId, quantity } = req.body;

            // Check if the item is already in the user's cart
            const existingCartItem = await collection.findOne({ customerId: customerId, productId: productId });

            if (existingCartItem) {
                // If the item already exists in the cart, update its quantity
                await collection.updateOne({ customerId: customerId, productId: productId }, { $inc: { quantity: quantity } });
            } else {
                return res.status(400).json({ message: 'Invalid action specified' });
            }

            // Calculate total price - you need to fetch product price from the database
            // Assuming productPrice is fetched from the database
            const productPrice = 100; // Example product price
            const totalPrice = updatedProducts.reduce((total, product) => total + productPrice, 0);

            // Update the cart with the updated products and total price
            await cartCollection.updateOne(
                { CustomerID: customerId },
                { $set: { Products: updatedProducts, TotalPrice: totalPrice } }
            );

            res.status(200).json({ message: 'Cart updated successfully' });
        } catch (error) {
            console.error("Error updating cart:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Close the MongoDB connection
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },
    getCart: async (req, res) => {
        try {
            // Connect to MongoDB
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access the specific database
            const database = client.db("PorcheWeb");

            // Access the "Orders" collection within the database
            const collection = database.collection("Cart");

            // Retrieve all documents from the collection
            const queryResult = await collection.find().toArray();

            // Send the retrieved documents as a JSON response
            res.json(queryResult);
        } catch (error) {
            // Handle errors
            console.error("Error retrieving documents:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Close the MongoDB connection
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },
    deleteFromCart: async (req, res) => {
        try {
            // Connect to MongoDB
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access the specific database
            const database = client.db("PorcheWeb");

            // Access the "Orders" collection within the database
            const collection = database.collection("Cart");

            // Delete the order with the provided ID
            const cartIdtoDelete = parseInt(req.params.OrderID);
            const result = await collection.deleteOne({ OrderID: cartIdtoDelete });
            console.log(cartIdtoDelete);
            console.log(result);

            console.log("-------------------------------------------------------");

            if (result.deletedCount === 1) {
                res.status(200).json({ message: 'cart item deleted successfully' });
            } else {
                res.status(404).json({ message: 'cart item not found' });
            }
        } catch (error) {
            // Handle errors
            console.error("Error deleting order:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            try {
                // Close the MongoDB connection
                await client.close();
                console.log("Connection to MongoDB closed.");
            } catch (e) {
                console.error("Error closing MongoDB connection:", e);
            }
        }
    }
}