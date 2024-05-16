const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authorizationMiddleware=require('../middleware/authorization')

router.post("/:id", authorizationMiddleware(['admin']),cartController.addToCart)

router.get("/:id", authorizationMiddleware(['admin','customer']), cartController.getCart);

router.delete("/:id", authorizationMiddleware(['admin']), cartController.deleteFromCart);

