const modelsSchedule = require("../models/schedule-models.js")
const db = require('../utils/db.js')

// GET LIST SCHEDULE
const getSchedule = async (req, res) => {
  try {
    await modelsSchedule.getSchedule(req, res)
  } catch (e) {
    res.json({
      erorr : e.message
    })
  }
}

// GET MEMBER PERFORM WITH LIST
const getMemberPerform = async (req, res) => {
  try {
    await modelsSchedule.getMemberPerform(req, res)
  } catch (e) {
    res.json({
      erorr : e.message
    })
  }
}
// GET DETAILS MEMBER AND MEBERPERFORM BY ID 
const getMemberAndSchedule = async (req, res) => {
  await modelsSchedule.getScheduleAndMemberPerforms(req,res)
}




// POST SCHEDULE 
const postSchedule = async (req, res) => {
  await modelsSchedule.postSchedule(req, res)
}
// UPDATE SCHEDULE
const updateSchedule = async (req,res) => {
  await modelsSchedule.updateQuery(req, res)
}

// POST SCHEDULE AND MEMBERPERFROM 
const postScheduleAndMember = async (req, res) => {
  await modelsSchedule.scheduleAndMemberPerform(req,res)
}
// UPDATE SCHEDULE AND MEMBERPERFORM
const updateScheduleMember = async (req, res) => {
  await modelsSchedule.updateScheduleMember(req, res)
}


// DELTE POST SCHEDULE
const deletePostSchedule = async (req, res) => {
  await modelsSchedule.deleteScheduleQuery(req, res)
}





module.exports={
  getSchedule,
  postSchedule,
  updateSchedule,
  postScheduleAndMember,
  updateScheduleMember,
  deletePostSchedule,
  getMemberPerform,
  getMemberAndSchedule
}