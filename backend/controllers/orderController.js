require('dotenv').config();

const jwt = require("jsonwebtoken");
const orderModel = require("../models/orderModel.js");
const bcrypt = require("bcrypt");
const { get } = require("mongoose");


const orderController = {
    addOrder: async (req, res) => {
        try {
            // Connect to MongoDB
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access the specific database
            const database = client.db("PorcheWeb");

            // Access the "Orders" collection within the database
            const collection = database.collection("Orders");

            // Extract the last order from the database
            const lastOrder = await collection.find().sort({ OrderID: -1 }).limit(1).toArray();

            // Initialize the OrderID to 1 if no orders exist, otherwise increment by 1
            let lastOrderId = lastOrder.length > 0 ? lastOrder[0].OrderID + 1 : 1;

            // Extract order data from the request body
            const { customerId, products, totalPrice, shippingAddress } = req.body;

            // Create a new order document
            const newOrder = {
                OrderID: lastOrderId,
                customerId: customerId,
                products: products,
                totalPrice: totalPrice,
                shippingAddress: shippingAddress,
                createdAt: new Date()
            };

            // Insert the new order document into the collection
            const result = await collection.insertOne(newOrder);

            // Send a success response with the generated OrderID
            res.status(201).json({ message: "Order added successfully", OrderID: lastOrderId });
        } catch (error) {
            // Handle errors
            console.error("Error adding order:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Close the MongoDB connection
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },
    getAllOrders: async (req, res) => {
        try {
            // Connect to MongoDB
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access the specific database
            const database = client.db("PorcheWeb");

            // Access the "Orders" collection within the database
            const collection = database.collection("Orders");

            // Find all orders in the collection
            const orders = await collection.find().toArray();

            // Send a success response with the orders
            res.status(200).json(orders);
        } catch (error) {
            // Handle errors
            console.error("Error getting orders:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Close the MongoDB connection
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },
    deleteOrder: async (req, res) => {
        try {
            // Connect to MongoDB
            await client.connect();
            console.log("Connected to MongoDB!");
    
            // Access the specific database
            const database = client.db("PorcheWeb");
    
            // Access the "Orders" collection within the database
            const collection = database.collection("Orders");
    
            // Delete the order with the provided ID
          const  orderIdToDelete=parseInt(req.params.OrderID)
           // const productId = parseInt(req.params.productId);
            const result = await collection.deleteOne({ OrderID: orderIdToDelete });
            console.log(orderIdToDelete)
            console.log(result)
            console.log({ OrderID: orderIdToDelete })
          console.log("-------------------------------------------------------")
         
            if (result.deletedCount === 1) {
                res.status(200).json({ message: 'Order deleted successfully' });
            } else {
                res.status(404).json({ message: 'Order not found' });
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
    },
    getOrder: async (req, res) => {
        try {
            // Connect to MongoDB
            await client.connect();
            console.log("Connected to MongoDB!");
    
            // Access the specific database
            const database = client.db("PorcheWeb");
    
            // Access the "Orders" collection within the database
            const collection = database.collection("Orders");
    
            // Extract the orderId from the request parameters
            const orderId = parseInt(req.params.OrderID);
    
            // Find the order document with the specified orderId
            const order = await collection.findOne({ OrderID: orderId });
    
            // If order is found, send it as a JSON response
            if (order) {
                res.json(order);
            } else {
                res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            // Handle errors
            console.error("Error retrieving order:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Close the MongoDB connection
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },
    // get all orders
    getOrders: async (req, res) => {
        try {
            // Connect to MongoDB
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access the specific database
            const database = client.db("PorcheWeb");

            // Access the "Orders" collection within the database
            const collection = database.collection("Orders");

            // Find all orders in the collection
            const orders = await collection.find().toArray();

            // Send a success response with the orders
            res.status(200).json(orders);
        } catch (error) {
            // Handle errors
            console.error("Error getting orders:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Close the MongoDB connection
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    },
    // get all orders for a specific customer
    getCustomerOrders: async (req, res) => {
        try {
            // Connect to MongoDB
            await client.connect();
            console.log("Connected to MongoDB!");

            // Access the specific database
            const database = client.db("PorcheWeb");

            // Access the "Orders" collection within the database
            const collection = database.collection("Orders");

            // Extract the customerId from the request parameters
            const customerId = parseInt(req.params.customerId);

            // Find all orders in the collection
            const orders = await collection.find({ customerId: customerId }).toArray();

            // Send a success response with the orders
            res.status(200).json(orders);
        } catch (error) {
            // Handle errors
            console.error("Error getting orders:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            // Close the MongoDB connection
            await client.close();
            console.log("Connection to MongoDB closed.");
        }
    }
}
module.exports = orderController;
