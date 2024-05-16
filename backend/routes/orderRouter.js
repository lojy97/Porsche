const express = require("express");
const router = express.Router();
const userController = require("../controllers/orderController");
const authorizationMiddleware=require('../middleware/authorization')

// * Get all orders
router.get("/",  authorizationMiddleware(['admin']),orderController.getAllOrders);

// * Get one order
router.get("/:id", authorizationMiddleware(['admin','customer']), orderController.getOrder);

// * Get a specific user's orders
router.get("/:id", authorizationMiddleware(['admin']), orderController.getCustomerOrders);

// * Delete one order
router.delete("/:id", authorizationMiddleware(['admin']), orderController.deleteOrder);

//add an order
router.post("/addOrder", authorizationMiddleware(['admin','customer']),orderController.addOrder);