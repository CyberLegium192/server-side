const express = require("express");
const router = express.Router();
const newsController = require('../controller/news-controller.js')


// GET LIST NEWS
router.get("/newslist", (req, res) => newsController.getNews(req, res))

// GET NEWS BY ID
router.get("/:id", (req, res) => newsController.getIdNews(req, res))

// POST NEWS 
router.post("/post/news", (req, res) => newsController.postNews(req, res))

// POST NEWS 
router.patch("/edit/news/:id", (req, res) => newsController.editNews(req, res))


// DELETE NEWS
router.delete("/delete/news/:id", (req, res) => newsController.deleteNews(req, res))


module.exports = router;