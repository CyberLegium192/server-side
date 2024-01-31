const express = require("express");
const router = express.Router();
const secretKey = `${process.env.SECRET_KEY}`;
const memberController = require('../controller/member-controller.js')
const upload = require('../middleware/memberMulter.js')

// PATH MEMBER LIST
router.get('/memberList', (req, res) => memberController.memberList(req, res))
// PATH POST MEMBER
router.post('/post', upload.single('profile'), (req, res) => memberController.memberPost(req, res))
// PATH GET MEMBER BY ID
router.get('/memberDetail/:id', (req, res) => memberController.memberDetail(req, res))



module.exports = router;