require('dotenv').config()
const { glob } = require('glob')
const { resolve } = require('path')
const logger = require('../controllers/logger/logger')
function bootstrapJobs(container) {
  glob(`${resolve('src')}/**/*.job.js`, function (err, files) {
    if (err) {
      logger.error(`error at loading job files [${err.message}]`)
    } else {
      const expression = process.env.CRON_EXPRESSION
      files.forEach((file) => {
        const { job, service } = require(file)
        job(container.resolve(service), expression)
      })
    }
  })
}
module.exports = bootstrapJobs
