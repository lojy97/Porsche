require('dotenv').config();

const jwt = require("jsonwebtoken");
const orderModel = require("../models/orderModel.js");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
const authenticationMiddleware = require('../middleware/authentication');
const authorizationMiddleware = require('../middleware/authorization');

const client = new MongoClient(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const orderController = {
    addOrder: async (req, res) => {
        let connection;
        try {
            authenticationMiddleware(['admin', 'customer'])(req, res, async () => {
                authorizationMiddleware(['admin', 'customer'])(req, res, async () => {
                    connection = await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = connection.db("PorcheWeb");
                    const collection = database.collection("Orders");

                    const lastOrder = await collection.find().sort({ OrderID: -1 }).limit(1).toArray();
                    let lastOrderId = lastOrder.length > 0 ? lastOrder[0].OrderID + 1 : 1;

                    const { customerId, products, totalPrice, shippingAddress } = req.body;

                    const newOrder = {
                        OrderID: lastOrderId,
                        customerId: customerId,
                        products: products,
                        totalPrice: totalPrice,
                        shippingAddress: shippingAddress,
                        createdAt: new Date()
                    };

                    await collection.insertOne(newOrder);
                    res.status(201).json({ message: "Order added successfully", OrderID: lastOrderId });
                });
            });
        } catch (error) {
            console.error("Error adding order:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                await connection.close();
                console.log("Connection to MongoDB closed.");
            }
        }
    },
    getAllOrders: async (req, res) => {
        let connection;
        try {
            authenticationMiddleware(['admin'])(req, res, async () => {
                authorizationMiddleware(['admin'])(req, res, async () => {
                    connection = await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = connection.db("PorcheWeb");
                    const collection = database.collection("Orders");

                    const orders = await collection.find().toArray();
                    res.status(200).json(orders);
                });
            });
        } catch (error) {
            console.error("Error getting orders:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                await connection.close();
                console.log("Connection to MongoDB closed.");
            }
        }
    },
    deleteOrder: async (req, res) => {
        let connection;
        try {
            authenticationMiddleware(['admin'])(req, res, async () => {
                authorizationMiddleware(['admin'])(req, res, async () => {
                    connection = await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = connection.db("PorcheWeb");
                    const collection = database.collection("Orders");

                    const orderIdToDelete = parseInt(req.params.OrderID);
                    const result = await collection.deleteOne({ OrderID: orderIdToDelete });

                    if (result.deletedCount === 1) {
                        res.status(200).json({ message: 'Order deleted successfully' });
                    } else {
                        res.status(404).json({ message: 'Order not found' });
                    }
                });
            });
        } catch (error) {
            console.error("Error deleting order:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                await connection.close();
                console.log("Connection to MongoDB closed.");
            }
        }
    },
    getOrder: async (req, res) => {
        let connection;
        try {
            // Authentication middleware
            authenticationMiddleware(['customer', 'admin'])(req, res, async () => {
                // Authorization middleware
                authorizationMiddleware(['customer', 'admin'])(req, res, async () => {
                    try {
                        connection = await client.connect();
                        console.log("Connected to MongoDB!");
    
                        const database = connection.db("PorcheWeb");
                        const collection = database.collection("Orders");
    
                        let customerId;
                        if (req.user.role === 'admin') {
                            // If admin, extract customer ID from request body
                            customerId = req.body.customerId;
                        } else if (req.user.role === 'customer') {
                            // If customer, extract customer ID from JWT payload
                            customerId = req.user.customerId;
                        }
    
                        console.log("Extracted Customer ID:", customerId);
    
                        // Ensure customerId is defined
                        if (!customerId) {
                            res.status(400).json({ message: "Customer ID is required" });
                            return;
                        }
    
                        // Retrieve cart documents for the specific customer
                        const queryResult = await collection.find({ customerId: customerId }).toArray();
    
                        console.log("Query Result:", queryResult);
    
                        // Send the retrieved documents as a JSON response
                        res.json(queryResult);
                    } catch (error) {
                        // Handle errors
                        console.error("Error retrieving cart:", error);
                        res.status(500).json({ message: "Internal server error" });
                    } finally {
                        if (connection) {
                            await connection.close();
                            console.log("Connection to MongoDB closed.");
                        }
                    }
                });
            });
        } catch (error) {
            console.error("Error authenticating/authorizing:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
    // getCustomerOrders: async (req, res) => {
    //     let connection;
    //     try {
    //         // Authentication middleware
    //         authenticationMiddleware(['admin', 'customer'])(req, res, async () => {
    //             // Authorization middleware
    //             authorizationMiddleware(['admin', 'customer'])(req, res, async () => {
    //                 try {
    //                     connection = await client.connect();
    //                     console.log("Connected to MongoDB!");
    
    //                     const database = connection.db("PorcheWeb");
    //                     const collection = database.collection("Orders");
    
    //                     let customerId;
    //                     if (req.user.role === 'admin') {
    //                         // If admin, extract customer ID from request body
    //                         customerId = req.body.customerId;
    //                     } else if (req.user.role === 'customer') {
    //                         // If customer, extract customer ID from JWT payload
    //                         customerId = req.user.customerId;
    //                     }
    
    //                     // Ensure customerId is defined
    //                     if (!customerId) {
    //                         res.status(400).json({ message: "Customer ID is required" });
    //                         return;
    //                     }
    
    //                     console.log("Customer ID:", customerId);
    
    //                     // Retrieve orders for the specific customer
    //                     const orders = await collection.find({ customerId: customerId }).toArray();
    
    //                     // Send the retrieved orders as a JSON response
    //                     res.status(200).json(orders);
    //                 } catch (error) {
    //                     // Handle errors
    //                     console.error("Error retrieving customer orders:", error);
    //                     res.status(500).json({ message: "Internal server error" });
    //                 } finally {
    //                     if (connection) {
    //                         await connection.close();
    //                         console.log("Connection to MongoDB closed.");
    //                     }
    //                 }
    //             });
    //         });
    //     } catch (error) {
    //         console.error("Error authenticating/authorizing:", error);
    //         res.status(500).json({ message: "Internal server error" });
    //     }
    // }
    
};

module.exports = orderController;
