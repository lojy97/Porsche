const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authorizationMiddleware=require('../middleware/authorization')

router.post("/AddCart/:id",cartController.addToCart)

router.get("/getCart/:id",cartController.getCart);

router.delete("/deleteCart/:id",  cartController.deleteFromCart);

module.exports = router;