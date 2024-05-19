const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");


router.post("/AddCart/:id",cartController.addToCart)

router.get("/getCart",cartController.getCart);

router.delete("/deleteCart/:id",  cartController.deleteFromCart);

router.get("/GetAllCart",cartController.getAllCart);

module.exports = router;