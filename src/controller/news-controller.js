const newsModels = require("../models/news-models.js");

// GET NEWS LIST  
const getNews =async (req, res) => {
  await newsModels.getListNews(req, res)
}

// GET NEWS BY ID
const getIdNews = async (req, res) => {
  await newsModels.getByIdNews(req, res)
}

// POST NEWS
const postNews = async (req, res) => {
  await newsModels.postNews(req, res)
}
// POST NEWS
const editNews = async (req, res) => {
  await newsModels.updateNews(req, res)
}

// DELETE NEWS
const deleteNews = async (req, res) => {
  await newsModels.deleteNews(req, res)
}


module.exports = {
  getNews,
  getIdNews,
  postNews,
  editNews,
  deleteNews
}