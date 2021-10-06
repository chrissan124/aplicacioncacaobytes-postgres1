const logger = require('../controllers/logger/logger')

module.exports = function trycatchEvent(callback = () => {}, attempts = 1) {
  if (attempts > 3) {
    return
  }
  try {
    callback()
  } catch (error) {
    logger.error(
      `error at emitting event (attempt #${attempts}) [${error.message}]`
    )
    attempts += 1
    trycatchEvent(callback, attempts)
  }
}
