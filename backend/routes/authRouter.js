

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


// customer routes
router.post("/CustLogin", authController.customerLogin);
router.post("/CustRegister", authController.customerRegister);
//admin routes
router.post("/AdminLogin", authController.adminLogin);
router.post("/AdminRegister", authController.adminRegister);

// Logout route
router.post('/logout', authController.logout);

module.exports = router;
