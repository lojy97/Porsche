const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authorizationMiddleware = require('../middleware/authorization');

// Add a product
router.post("/addProduct", authorizationMiddleware(['admin']), productController.addProduct);

// Get all products
router.get("/getAllProducts", authorizationMiddleware(['admin', 'customer']), productController.getAllProducts);

// Get one product
router.get("/getProduct/:id", authorizationMiddleware(['admin', 'customer']), productController.getOneProduct);

// Update a product
router.put("/editProduct/:id", authorizationMiddleware(['admin']), productController.editProduct);

// Delete a product
router.delete("/deleteProduct/:id", authorizationMiddleware(['admin']), productController.deleteProduct);

module.exports = router;
