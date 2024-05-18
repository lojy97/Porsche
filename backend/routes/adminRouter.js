// adminRouter.js

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authorizationMiddleware = require('../middleware/authorization');

// Get all admins
router.get("/getAdmins", authorizationMiddleware(['admin']), adminController.getAdmins);

// Get one admin
router.get("/GetAdmin:id", authorizationMiddleware(['admin']), adminController.getSpecificAdmin);

// Update one admin
router.put("/UpdateAdmin:id", authorizationMiddleware(['admin', 'customer']), adminController.editAdmin); // Corrected function name

// Delete one admin
router.delete("/DeleteAdmin:id", authorizationMiddleware(['admin']), adminController.deleteAdmin);

module.exports = router;
