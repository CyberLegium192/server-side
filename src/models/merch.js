let db = require("../utils/db.js")


// GET ALL MERCH
const getAll = (req, res) => {
  const sql = `SELECT * FROM merch`
  db.query(sql, (err, results) => {
    if(err) throw err
    res.json({
      message: 'success',
      results
    })
  })
}






module.exports = {
  getAll
}