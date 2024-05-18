const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.use((req, res, next) => {
    console.log("Admin route accessed");
    next();
  });

// Get all admins
router.get("/getAdmins", adminController.getAdmins);

// Get one admin
router.get("/getAdmin/:id",  adminController.getSpecificAdmin);

// Update one admin
router.put("/updateAdmin/:id",  adminController.editAdmin);

// Delete one admin
router.delete("/deleteAdmin/:id",adminController.deleteAdmin);

module.exports = router;
