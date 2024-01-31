const db = require('../utils/db.js')
// NEWS LIST QUERY
const getListNews = (req, res) => {
  const sql = `SELECT * FROM news`
  db.query(sql, (err, news) => {
    if (err) throw err
    res.json({
      message: 'success',
      news
    })
  })
}


// GET NEWS BY ID
const getByIdNews = (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM news WHERE id = ?`
  db.query(sql, [id], (err, news) => {
    if (err) throw err
    res.json({
      message: 'success',
      news
    })
  })
}


// POST NEWS QUERY
const postNews = (req, res) => {
  const {tema, title, date, link} = req.body
  const sql = `INSERT INTO news (tema, title, date, link) VALUES (?, ?, ?, ?)`
  db.query(sql, [tema, title, date, link], (err, results) => {
    if (err) throw err
    res.json({
      message: 'success',
      results
    })
  })
} 

// EDIT NEWS QUERY
const updateNews = (req, res) => {
  const id = req.params.id
  const {tema, title, date, link} = req.body
  const sql = `UPDATE news SET tema =?, title=?, date=?, link=? WHERE id = ?`
  db.query(sql, [tema, title, date, link, id], (err, results) => {
    if (err) throw err
    res.json({
      message: 'success',
      results
    })
  })
} 

// DELETE NEWS QUERY
const deleteNews = (req, res) => {
  const id = req.params.id
  const sql = `DELETE FROM news WHERE id = ?`
  db.query(sql, [id], (err, results) => {
    if (err) throw err
    res.json({
      message: 'success',
      results
    })
  })
} 





module.exports={
  getListNews,
  getByIdNews,
  postNews,
  updateNews,
  deleteNews
}