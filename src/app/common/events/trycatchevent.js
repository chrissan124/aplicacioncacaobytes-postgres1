const logger = require('../controllers/logger/logger')

module.exports = function trycatchEvent(callback = () => {}) {
  try {
    callback()
  } catch (error) {
    logger.error(`error at emitting event [${error.message}]`)
  }
}
