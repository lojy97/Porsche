const { MongoClient } = require("mongodb");
const authenticationMiddleware = require('../middleware/authentication');
const authorizationMiddleware = require('../middleware/authorization');

const client = new MongoClient(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const adminController = {
    deleteAdmin: async (req, res) => {
        console.log("Received DELETE request");
        let connection;
        try {
            // Authentication middleware
            authenticationMiddleware(['admin'])(req, res, async () => {
                console.log("Authentication passed");
                // Authorization middleware
                authorizationMiddleware(['admin'])(req, res, async () => {
                    console.log("Authorization passed");
                    // Connect to MongoDB
                    connection = await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = connection.db("PorcheWeb");
                    const collection = database.collection("Admins");

                    const adminId = parseInt(req.params.id);
                    const result = await collection.deleteOne({ AdminID: adminId });

                    if (result.deletedCount === 1) {
                        res.status(200).json({ message: `Admin with AdminID ${adminId} deleted successfully` });
                    } else {
                        res.status(404).json({ message: `Admin with AdminID ${adminId} not found` });
                    }
                });
            });
        } catch (error) {
            console.error("Error deleting admin:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                await connection.close();
                console.log("Connection to MongoDB closed.");
            }
        }
    },

    editAdmin: async (req, res) => {
        console.log("Received PATCH request");
        let connection;
        try {
            const adminId = parseInt(req.params.id);
            // Authentication middleware
            authenticationMiddleware(['admin'])(req, res, async () => {
                console.log("Authentication passed");
                // Authorization middleware
                authorizationMiddleware(['admin'])(req, res, async () => {
                    console.log("Authorization passed");
                    // Connect to MongoDB
                    connection = await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = connection.db("PorcheWeb");
                    const collection = database.collection("Admins");

                    const updateQuery = {
                        $set: {
                            Name: req.body.name,
                            Email: req.body.email,
                            Address: req.body.address
                        }
                    };

                    const result = await collection.updateOne({ AdminID: adminId }, updateQuery);

                    if (result.modifiedCount === 1) {
                        res.status(200).json({ message: `Admin with AdminID ${adminId} updated successfully` });
                    } else {
                        res.status(404).json({ message: `Admin with AdminID ${adminId} not found` });
                    }
                });
            });
        } catch (error) {
            console.error("Error updating admin:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                await connection.close();
                console.log("Connection to MongoDB closed.");
            }
        }
    },

    getAdmins: async (req, res) => {
        console.log("Received GET request");
        let connection;
        try {
            // Authentication middleware
            authenticationMiddleware(['admin'])(req, res, async () => {
                console.log("Authentication passed");
                // Authorization middleware
                authorizationMiddleware(['admin'])(req, res, async () => {
                    console.log("Authorization passed");
                    // Connect to MongoDB
                    connection = await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = connection.db("PorcheWeb");
                    const collection = database.collection("Admins");

                    const admins = await collection.find().toArray();

                    res.status(200).json(admins);
                });
            });
        } catch (error) {
            console.error("Error retrieving admins:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                await connection.close();
                console.log("Connection to MongoDB closed.");
            }
        }
    },

    getSpecificAdmin: async (req, res) => {
        console.log("Received GET request");
        let connection;
        try {
            // Authentication middleware
            authenticationMiddleware(['admin'])(req, res, async () => {
                console.log("Authentication passed");
                // Authorization middleware
                authorizationMiddleware(['admin'])(req, res, async () => {
                    console.log("Authorization passed");
                    // Connect to MongoDB
                    connection = await client.connect();
                    console.log("Connected to MongoDB!");

                    const database = connection.db("PorcheWeb");
                    const collection = database.collection("Admins");

                    const adminId = parseInt(req.params.id);
                    const admin = await collection.findOne({ AdminID: adminId });

                    if (admin) {
                        res.status(200).json(admin);
                    } else {
                        res.status(404).json({ message: `Admin with AdminID ${adminId} not found` });
                    }
                });
            });
        } catch (error) {
            console.error("Error retrieving admin:", error);
            res.status(500).json({ message: "Internal server error" });
        } finally {
            if (connection) {
                await connection.close();
                console.log("Connection to MongoDB closed.");
            }
        }
    },
    

};

module.exports = adminController;
