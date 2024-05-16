const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const adminController = require("../controllers/adminController");
const authorizationMiddleware=require('../middleware/authorization')

// * Customer Login
router.post("/CustLogin", authorizationMiddleware(['customer']),customerController.customerLogin);
//* Customer Register
router.post("/CustRegister", authorizationMiddleware(['customer']),customerController.customerRegister);
//* Admin Login
router.post("/AdminLogin", authorizationMiddleware(['admin']),adminController.adminLogin);
//* Admin Register
router.post("/AdminRegister", authorizationMiddleware(['admin']),adminController.adminRegister);

