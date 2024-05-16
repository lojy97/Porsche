// customerRouter.js

const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const authorizationMiddleware = require('../middleware/authorization');

// * Get all customers
router.get("/", authorizationMiddleware(['admin']), customerController.getAllCustomers);

// * Get one customer
router.get("/:id", authorizationMiddleware(['admin', 'customer']), customerController.getCustomer);

// * Update one user
router.put("/:id", authorizationMiddleware(['admin', 'customer']), customerController.updateCustomer);

// * Delete one user
router.delete("/:id", authorizationMiddleware(['admin', 'customer']), customerController.deleteCustomer);

module.exports = router;
