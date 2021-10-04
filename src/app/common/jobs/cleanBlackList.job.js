const cron = require('node-cron')
const logger = require('../controllers/logger/logger')

function job(removeBlackListService, expression) {
  cron.schedule(expression, () => {
    try {
      removeBlackListService
        .removeBlackList()
        .then((count) => {
          logger.info(`running clean blacklist job [deleted: ${count}]`)
        })
        .catch((error) => {
          logger.error(`blacklist job error [${error.message}]`)
        })
    } catch (error) {
      logger.error(`blacklist job error [${error.message}]`)
    }
  })
}
const service = 'removeBlackListService'
module.exports = { job, service }
