const express = require("express");
const db = require('../utils/db.js')
const router = express.Router();
const scheduleController = require('../controller/schedule-controller.js')

// GET SCHEDULE LIST
router.get("/scheduleList", (req, res) => scheduleController.getSchedule(req, res))

// POST SCHEDULE 

router.post("/post/schedule", (req, res) => scheduleController.postSchedule(req, res))

// UPDATE DATA SCHEDULE
router.patch("/update/schedule/:id", (req, res) => {
  scheduleController.updateSchedule(req, res)
})

// POST SCHEDULE AND MEMEBER ||| PERFORM
router.post('/post/schedule/member', (req, res) => {
  scheduleController.postScheduleAndMember(req, res)
})


// GET SCHEDULE AND MEMBER BY ID
router.get('/detail/schedule/:id', (req, res) => {
  scheduleController.getMemberAndSchedule(req, res)
})



router.patch('/update/member/:id', (req, res) => {
  scheduleController.updateScheduleMember(req, res)
})
















// DELETE MEMBER PERFORM AND SCHEDULE
router.delete('/delete/schedule/:id', (req, res) => scheduleController.deletePostSchedule(req, res))



// SEARCH SCHEDULE 
router.get('/scheduleList/search', (req, res) => {
  const title = req.query.q
  
  const sql = `SELECT * FROM schedule WHERE title LIKE ?`
  
  db.query(sql, [`%${title}%`], (err, results) => {
    if(err) throw err
    res.json({
      message: 'success',
      results
    })
  })
})



// GET MEMBER PERFORM IN SCHEDULE
router.get("/memberPerform/:id", (req, res) => scheduleController.getMemberPerform(req, res))


module.exports = router;