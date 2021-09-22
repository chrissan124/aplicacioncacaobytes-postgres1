const cron = require('node-cron')
const logger = require('../controllers/logger/logger')

function job(updateInvoiceStatusService, expression) {
  cron.schedule(expression, () => {
    try {
      updateInvoiceStatusService
        .updateInvoiceStatus()
        .then(([started, expired]) => {
          logger.info(
            `running invoice update job [started: ${started}, expired: ${expired}]`
          )
        })
    } catch (error) {
      logger.error(`updating invoice error [${error.message}]`)
    }
  })
}
const service = 'updateInvoiceStatusService'
module.exports = { job, service }
