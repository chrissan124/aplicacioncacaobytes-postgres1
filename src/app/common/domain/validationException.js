const BaseError = require('../controllers/error-handling/baseError')
const httpStatusCodes = require('../controllers/error-handling/httpStatusCodes')

class ValidationException extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = name,
    isOperational = true,
    errorCode = 100
  ) {
    super(name, statusCode, isOperational, description, errorCode)
  }
}

module.exports = ValidationException
