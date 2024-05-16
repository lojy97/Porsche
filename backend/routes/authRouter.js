// authRouter.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Fix import
const authorizationMiddleware = require('../middleware/authorization');

// Customer Login
router.post("/CustLogin", authorizationMiddleware(['customer']), authController.customerLogin); // Use authController

// Customer Register
router.post("/CustRegister", authorizationMiddleware(['customer']), authController.customerRegister); // Use authController

// Admin Login
router.post("/AdminLogin", authorizationMiddleware(['admin']), authController.adminLogin); // Use authController

// Admin Register
router.post("/AdminRegister", authorizationMiddleware(['admin']), authController.adminRegister); // Use authController

module.exports = router;
