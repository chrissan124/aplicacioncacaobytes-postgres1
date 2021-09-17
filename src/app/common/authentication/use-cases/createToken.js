require('dotenv').config()
const jwt = require('jsonwebtoken')
const encryptor = require('../../controllers/encryption/encryptor')
const logger = require('../../controllers/logger/logger')

/*
  Create token after authentication, with encrypted payload
*/

function createToken(payloadData, time) {
  let token = undefined
  try {
    const payload = {}
    for (let [key, value] of Object.entries(payloadData)) {
      payload[key] = encryptor.encrypt(value)
    }
    time = time || process.env.TOKEN_DURATION

    token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: time })
    logger.info(`Token created for [Time: ${time}]`)
  } catch (error) {
    logger.error(`Failure at creating token [${error.message}]`)
  } finally {
    return token
  }
}

module.exports = createToken
