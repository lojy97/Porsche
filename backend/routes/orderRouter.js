const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");



// * Get all orders
router.get("/GetAll", orderController.getAllOrders);

// * Get one order
// * Get one order
router.get("/getOrder", orderController.getOrder);


// * Delete one order
router.delete("/delete-order/:id",  orderController.deleteOrder);

//add an order
router.post("/addOrder",orderController.addOrder);

module.exports = router;