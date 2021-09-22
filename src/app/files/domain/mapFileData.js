require('dotenv').config()
const { DateTime } = require('luxon')

module.exports = function mapFileData(file) {
  return {
    url: `${process.env.API_ROOT}${process.env.API_PREFIX}/${process.env.FILE_FOLDER}/${file.fieldname}/${file.filename}`,
    type: file.filename.split('.')[1],
    size: file.size,
    name: file.filename,
    upload_date: DateTime.now().toString(),
  }
}
