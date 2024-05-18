const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.use((req, res, next) => {
  console.log("Customer route accessed");
  next();
});

router.get("/GetAll", customerController.getAllCustomers);

router.get("/Get", customerController.getCustomer);

router.put("/Update/:id", customerController.updateCustomer);

router.delete("/deleteCustomer/:customerId", customerController.deleteCustomer);

module.exports = router;
