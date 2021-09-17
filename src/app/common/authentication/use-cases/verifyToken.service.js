require('dotenv').config()
const jwt = require('jsonwebtoken')
const encryptor = require('../../controllers/encryption/encryptor')
const ForbiddenError = require('../../controllers/error-handling/forbiddenError')
const logger = require('../../controllers/logger/logger')

/*
  Verify created token, and decrypt it's payload
*/

class verifyTokenService {
  constructor() {}
  verifyToken(token) {
    try {
      const payload = jwt.verify(token, process.env.TOKEN_SECRET)
      const decrypted = {}
      for (let [key, value] of Object.entries(payload)) {
        if (!['iat', 'exp'].includes(key))
          decrypted[key] = encryptor.decrypt(value)
        else decrypted[key] = value
      }
      return decrypted
    } catch (error) {
      logger.error(`Invalid token [${error.message}]`)
      throw new ForbiddenError('invalid token')
    }
  }
}

module.exports = verifyTokenService
