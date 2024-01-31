const db = require("../utils/db.js");

// GET MEMBER LIST
const getMemberList = (req, res) => {
  const sql = `SELECT id, callname, status, profile, showall, gen, birthday FROM member`
  db.query(sql, (err, results) => {
    if (err) throw err
    res.json({
      message: 'SUCCESS',
      results
    })
  })
}

// GET DETAIL MEMBER BY ID 
const getMemberById = (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM member WHERE id = '${id}'`
  db.query(sql, (err, results) => {
    if (err) throw err
    res.json({
      message: 'SUCCESS',
      results
    })
  })
}

// POST MEMBER
const postMember = (req, res) => {
  const {
    firstname, lastname, callname, gen, birthday, zodiak, 
    blood, height, showall, status, jiko, instagram, tiktok,
    tweet, showroom, fanbase
    } = req.body
    const profile = req.file.filename
    
    const sql = `INSERT INTO member (firstname, lastname, callname, gen, birthday, zodiak, blood, height, showall, status, profile, jiko, instagram, tiktok, tweet, showroom, fanbase) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    
    db.query(sql, [
      firstname, lastname, callname, gen, birthday, zodiak, 
    blood, height, showall, status, profile, jiko, instagram, tiktok, tweet, showroom, fanbase], (err, results) => {
      if (err) throw err
      res.json({
        message:   'SUCCESS',
        results
      })
    })
    
    
}



module.exports = {
  getMemberList,
  postMember,
  getMemberById
}