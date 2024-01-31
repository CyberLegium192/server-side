const models = require('../models/member-models.js')


// MEMBER LIST
const memberList = async (req, res) => {
  try {
    await models.getMemberList(req, res)
  } catch (e) {
    res.json({
      erorr: 'server erorr ',
      message: e.message
    })
  }
}

// GET DETAIL MEMBER BY ID
const memberDetail = async (req, res) => {
  try {
    await models.getMemberById(req, res)
  } catch (e) {
    res.json({
      erorr: "SERVER ERORR",
      message: e.message
    })
  }
}

// POST MEMBER
const memberPost = async (req, res) => {
  try {
    await models.postMember(req, res)
  } catch (e) {
    res.json({message: e.message})
  }
}



module.exports = {
  memberList,
  memberPost,
  memberDetail
}