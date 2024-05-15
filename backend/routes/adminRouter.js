const express = require("express");
const router = express.Router();
const userController = require("../controller/adminController");
const authorizationMiddleware=require('../middleware/authorization')

// * Get all admins
//router.get("/",  authorizationMiddleware(['admin']),adminController.getAllAdmins);

// * Get one admin
//router.get("/:id", authorizationMiddleware(['admin']), adminController.getAdmin);

// * Update one user
router.put("/:id",  authorizationMiddleware(['admin','customer']),adminController.updateAdmin);

// * Delete one user
router.delete("/:id", authorizationMiddleware(['admin']), adminController.deleteAdmin);
