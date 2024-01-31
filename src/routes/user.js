const express = require("express");
const router = express.Router();
const userController = require("../controller/user.js");
const upload = require("../middleware/userMulter.js");
const jwt = require('jsonwebtoken');
const secretKey = `${process.env.SECRET_KEY}`;

const verifyToken = (req, res, next) => {
    const token = req.cookies && req.cookies.token;
    if (!token) {
        return res.json({ error: "Token tidak disediakan" });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.json({ error: "Token tidak valid" });
        }
        req.userId = decoded.userId;
        next();
    });
}

const generateToken = (userId, avatar) => {
  const payload = {
    userId,
    avatar,
  };
  return jwt.sign(payload, secretKey, { expiresIn: '365d' });
};

const updateTokenAfterAvatarChange = (req, res, next) => {
  const { userId, avatar } = req;
  const token = generateToken(userId, avatar);
  res.cookie('token', token, { expires: new Date(Date.now() + 2 * 60 * 60 * 1000)
  })
  res.locals.newToken = token
  next();
};


router.post("/register", upload.single("avatar"), (req, res) => userController.userRegis(req, res));
router.patch("/update/:id", upload.single("avatar"), (req, res) => userController.updateUser(req, res));
router.post("/login", (req, res) => userController.userLogin(req, res));

// GET ID USER
router.get("/profileUser", verifyToken, updateTokenAfterAvatarChange, (req, res) => {
  return res.json({
    message: "SUCCESS",
    user: req.userId
  })
})

// CHANGE AVATAR
router.patch('/profile/edit/avatar/:id', upload.single('avatar'), userController.updateAvatar, updateTokenAfterAvatarChange, (req, res) => {
  res.json({
    message: 'Update avatar success',
    profile: req.userId,
  });
});








// GET PERSONAL USER AFTER LOGIN
router.get('/profilePage/:id', (req, res) => userController.getUser(req,res))


router.patch('/update/user/:id', (req, res) => {
  userController.updateBio(req, res)
})


// DELETE cookie
router.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({status: "success"})
})



module.exports = router;
