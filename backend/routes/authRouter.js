// routes/authRouter.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Public routes
router.post("/CustLogin", authController.customerLogin);
router.post("/CustRegister", authController.customerRegister);
router.post("/AdminLogin", authController.adminLogin);
router.post("/AdminRegister", authController.adminRegister);

module.exports = router;
