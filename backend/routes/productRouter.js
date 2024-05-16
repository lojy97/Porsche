const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authorizationMiddleware=require('../middleware/authorization')

//add a product
router.post("/addProduct", authorizationMiddleware(['admin']),productController.addProduct);

//get all products
router.get("/getAllProducts",authorizationMiddleware(['admin','customer']),productController.getAllProducts);

//get one product
router.get("/getProduct/:id",authorizationMiddleware(['admin','customer']),productController.getProduct);

//update a product
router.put("/editProduct/:id",authorizationMiddleware(['admin']),productController.editProduct);

//delete a product
router.delete("/deleteProduct/:id",authorizationMiddleware(['admin']),productController.deleteProduct);

module.exports = router; 