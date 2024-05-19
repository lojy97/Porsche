require('dotenv').config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
const authenticationMiddleware = require('../middleware/authentication');
const authorizationMiddleware = require('../middleware/authorization');

const client = new MongoClient(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const productController = {
    addProduct: async (req, res) => {
        let connection;
        try {
            authenticationMiddleware(['admin'])(req, res, async () => {
                authorizationMiddleware(['admin'])(req, res, async () => {
                    connection = await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = connection.db("PorcheWeb");
                    const collection = database.collection("Products");

                    const lastProduct = await collection.find().sort({ ProductID: -1 }).limit(1).toArray();
                    let lastProductId = 0;
                    if (lastProduct.length > 0) {
                        lastProductId = lastProduct[0].ProductID;
                    }

                    const { ProductName, Description, Price, Stock } = req.body;

                    const newProductId = lastProductId + 1;

                    const newProduct = {
                        ProductID: newProductId,
                        ProductName,
                        Description,
                        url: "",
                        Price,
                        Stock
                    };

                    await collection.insertOne(newProduct);
                    console.log(`Inserted product with ID: ${newProductId}`);

                    res.status(201).json({ message: "Product added successfully", productId: newProductId });
                });
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        } finally {
            if (connection) {
                await connection.close();
                console.log("Connection to MongoDB closed.");
            }
        }
    },
    getAllProducts: async (req, res) => {
        let connection;
        try {
            connection = await client.connect();
            console.log("Connected to MongoDB!");
    
            const database = connection.db("PorcheWeb");
            const collection = database.collection("Products");
    
            const products = await collection.find().toArray();
    
            res.status(200).json(products);
                    connection = await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = connection.db("PorcheWeb");
                    const collection = database.collection("Products");

                    const products = await collection.find().toArray();

                    res.status(200).json(products);
          
        } catch (error) {
            console.error("Error getting products:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                await connection.close();
                console.log("Connection to MongoDB closed.");
            }
        }
    },
    deleteProduct: async (req, res) => {
        let connection;
        try {
            authenticationMiddleware(['admin'])(req, res, async () => {
                authorizationMiddleware(['admin'])(req, res, async () => {
                    connection = await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = connection.db("PorcheWeb");
                    const collection = database.collection("Products");

                    const productId = parseInt(req.params.productId);

                    const result = await collection.deleteOne({ ProductID: productId });

                    if (result.deletedCount === 1) {
                        res.status(200).json({ message: `Product with ProductID ${productId} deleted successfully` });
                    } else {
                        res.status(404).json({ message: `Product with ProductID ${productId} not found` });
                    }
                });
            });
        } catch (error) {
            console.error("Error deleting product:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                await connection.close();
                console.log("Connection to MongoDB closed.");
            }
        }
    },
    editProduct: async (req, res) => {
        let connection;
        try {
            authenticationMiddleware(['admin'])(req, res, async () => {
                authorizationMiddleware(['admin'])(req, res, async () => {
                    const productId = parseInt(req.params.productId);

                    connection = await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = connection.db("PorcheWeb");
                    const collection = database.collection("Products");

                    const updateQuery = {
                        $set: {
                            ProductName: req.body.ProductName,
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
                });
            });
        } catch (error) {
            console.error("Error editing product:", error);
            res.status(500).json({ error: "Internal server error" });
        } finally {
            if (connection) {
                await connection.close();
                console.log("Connection to MongoDB closed.");
            }
        }
    },
    getOneProduct: async (req, res) => {
        let connection;
        try {
            authenticationMiddleware(['admin', 'customer'])(req, res, async () => {
                authorizationMiddleware(['admin', 'customer'])(req, res, async () => {
                    connection = await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = connection.db("PorcheWeb");
                    const collection = database.collection("Products");

                    const productId = parseInt(req.params.productId);

                    const product = await collection.findOne({ ProductID: productId });
                    if (product) {
                        res.status(200).json(product);
                    } else {
                        res.status(404).json({ message: `Product with ProductID ${productId} not found` });
                    }
                });
            });
        } catch (error) {
            console.error("Error getting product:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                await connection.close();
                console.log("Connection to MongoDB closed.");
            }
        }
    }
};

module.exports = productController;
