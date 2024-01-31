const merchModels = require("../models/merch.js");

const getMerch = async (req, res) => {
  await merchModels.getAll(req, res)
}

module.exports = {
  getMerch
}