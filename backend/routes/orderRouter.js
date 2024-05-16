const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authorizationMiddleware = require('../middleware/authorization');

// * Get all orders
router.get("/",  authorizationMiddleware(['admin']),orderController.getAllOrders);

// * Get one order
// * Get one order
router.get("/order/:id", authorizationMiddleware(['admin','customer']), orderController.getOrder);

// * Get a specific user's orders
router.get("/customer/:id", authorizationMiddleware(['admin']), orderController.getCustomerOrders);

// * Delete one order
router.delete("/delete-order/:id", authorizationMiddleware(['admin']), orderController.deleteOrder);

//add an order
router.post("/addOrder", authorizationMiddleware(['admin','customer']),orderController.addOrder);

module.exports = router;