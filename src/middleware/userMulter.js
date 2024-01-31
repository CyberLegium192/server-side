const multer = require("multer")

const storageEngine = multer.diskStorage({
  destination: "./public/userProfile",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({
  storage: storageEngine,
  limits: { filesize: 5000000 }
})

module.exports = upload