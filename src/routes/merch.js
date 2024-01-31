
const express = require("express");
const router = express.Router();
const merchController = require('../controller/merch.js')

router.get('/', (req, res) => merchController.getMerch(req, res))








module.exports = router;