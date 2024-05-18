const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authorizationMiddleware = require('../middleware/authorization');

// Get all admins
router.get("/getAdmins", authorizationMiddleware(['admin']), adminController.getAdmins);

// Get one admin
router.get("/getAdmin/:id", authorizationMiddleware(['admin']), adminController.getSpecificAdmin);

// Update one admin
router.put("/updateAdmin/:id", authorizationMiddleware(['admin']), adminController.editAdmin);

// Delete one admin
router.delete("/deleteAdmin/:id",adminController.deleteAdmin);

module.exports = router;
