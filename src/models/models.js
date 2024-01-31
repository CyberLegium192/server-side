const con = require('../utils/db.js')

const getUserByEmail = (email, callback) => {
  // console.log(email)
  const sql = `SELECT * FROM user WHERE email= ?`
  con.query(sql, [email], (err, results) => {
    if(err) throw err
    callback(results[0])
  })
}

const getUserProfile = (id, res) => {
  const sql = `SELECT * FROM user WHERE id= ?`
  con.query(sql, [id], (err, results) => {
    if(err) throw err
    return res.json({
      message: 'success getting data',
      results
    })
  })
}


const postUser = (body, hashedPassword, req, res) => {
  const {username, email, password, bio, gender, role} = body
  const roleId = role
  // const profile = req.file.filename
  const sql = `INSERT INTO user (username, email, password, bio, gender, role, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)`
  con.query(sql, [username, email, hashedPassword, bio, gender, role, roleId], (err, results) => {
    if (err) throw err
  });
}

const updateUser = (body, avatar, req, res) => {
  const {username, bio, gender, role} = body
  const id = req.params.id
  const profile = req.file.filename
  
  const sql = `UPDATE user SET username='${username}', bio='${bio}', gender='${gender}', avatar='${profile}' WHERE id ='${id}'`
  con.query(sql, (err, results) => {
    if (err) {
      console.log(err.message)
      res.json({
        message: err.message
      });
    } else {
      res.json({
        message: "successfully"
      })
    }
  });
}


const updateAvatarUser = (id, profile) => {
  const sql = `UPDATE user SET avatar='${profile}' WHERE id='${id}'`
  con.query(sql, (err, result) => {
    if(err) throw err 
  })
}



const updateBio = (req, res) => {
  const {username, bio, gender} = req.body
  const id = req.params.id
  const sql = `UPDATE user SET username = ?, bio = ?, gender =? WHERE id=?`
  con.query(sql, [username, bio, gender, id], (err, results) => {
    if(err) throw err
    res.json({
      message: 'success',
      results
    })
  })
}




module.exports = {
  postUser,
  updateUser,
  getUserByEmail,
  updateAvatarUser,
  getUserProfile,
  updateBio
}