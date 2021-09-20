require('dotenv').config()
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const kind = file.fieldname || 'other'
    const path = `${process.env.FILE_SRC}/${kind.toLowerCase()}`
    cb(null, path)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

module.exports = upload
