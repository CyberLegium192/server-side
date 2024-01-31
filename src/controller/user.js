const userModels = require("../models/models.js");
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = `${process.env.SECRET_KEY}`;

function getUserByEmail(email, callback){
  userModels.getUserByEmail(email, callback)
}

// ================== REGISTER CONTROLLER ===================
const userRegis = async (req, res) => {
    try {
    const body = req.body;
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(body.password, saltRounds)
    await userModels.postUser(body, hashedPassword, req, res)
      res.json({
        message: "CREATE NEW User Success",
      });
    } catch (err) {
      res.json({
        message: err.message
      })
    }
};

// ================ UPDATE CONTROLLER ======================
const updateUser = async (req, res) => {
    try {
    const avatar = req.file.filename
    const body = req.body;
    await userModels.updateUser(body, avatar, req, res);
    
    const {username, bio, gender, role} = body
    res.json({
      message: "success update user",
      username: username,
      bio: bio,
      gender: gender,
      avatar: avatar,
    })
    } catch (e) {
      res.json({
        message: e.message
      })
    }
};

// =================== LOGIN CONTROLLER ======================
const userLogin = (req, res) => {
  const {email, password} = req.body;
  
  getUserByEmail(email, (user) => {
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userId: user }, secretKey, { expiresIn: '365d' });
        res.cookie('token', token, { expires: new Date(Date.now() + 2 * 60 * 60 * 1000)
        })
        res.json({ token, user });
      } else {
        res.json({ error: 'Password salah' });
      }
    } else {
      res.json({ error: 'Pengguna tidak ditemukan' });
    }
  });
}

// ==================== UPDATE AVATAR  ======================
const updateAvatar = async (req, res) => {
  const profile = req.file.filename
  const id = req.params.id
  try {
    await userModels.updateAvatarUser(id, profile);
    res.json({
      message: 'update avatar success',
      profile
    })
  } catch (e) {
    console.log('error dari update avatar',  e)
    res.json(e.message)
  }
}

// ====================== GET USER ==========================
const getUser = async (req, res) => {
  const id = req.params.id
  const body = req.body
  try {
    await userModels.getUserProfile(id, res)
    
  } catch (e) {}
}

// =================== UPDATE BIO USER ======================
const updateBio = async (req, res) => {
  await userModels.updateBio(req, res)
}



module.exports = {
    userRegis,
    updateUser,
    userLogin,
    updateAvatar,
    getUser,
    updateBio
};
