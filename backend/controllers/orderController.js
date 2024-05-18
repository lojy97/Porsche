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
            authenticationMiddleware(['admin', 'customer'])(req, res, async () => {
                authorizationMiddleware(['admin', 'customer'])(req, res, async () => {
                    connection = await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = connection.db("PorcheWeb");
                    const collection = database.collection("Orders");

                    const orderId = parseInt(req.params.OrderID);
                    const order = await collection.findOne({ OrderID: orderId });

                    if (order) {
                        res.json(order);
                    } else {
                        res.status(404).json({ message: "Order not found" });
                    }
                });
            });
        } catch (error) {
            console.error("Error retrieving order:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                await connection.close();
                console.log("Connection to MongoDB closed.");
            }
        }
    },
    getCustomerOrders: async (req, res) => {
        let connection;
        try {
            authenticationMiddleware(['admin', 'customer'])(req, res, async () => {
                authorizationMiddleware(['admin', 'customer'])(req, res, async () => {
                    connection = await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = connection.db("PorcheWeb");
                    const collection = database.collection("Orders");

                    const customerId = parseInt(req.params.customerId);
                    const orders = await collection.find({ customerId: customerId }).toArray();

                    res.status(200).json(orders);
                });
            });
        } catch (error) {
            console.error("Error getting customer orders:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                await connection.close();
                console.log("Connection to MongoDB closed.");
            }
        }
    }
};

module.exports = orderController;
