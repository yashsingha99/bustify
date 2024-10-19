const express = require('express');
const router = express.Router();

const {create, verify_payment} = require("../controllers/order.controller")

router.post("/create-order", create)
router.post("/verify_payment", verify_payment)

module.exports = router