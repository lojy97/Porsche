const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");


// Add a product
router.post("/addProduct", productController.addProduct);

// Get all products
router.get("/getAllProducts",  productController.getAllProducts);

// Get one product
router.get("/getProduct/:id", productController.getOneProduct);

// Update a product
router.put("/editProduct/:id",  productController.editProduct);

// Delete a product
router.delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = router;
