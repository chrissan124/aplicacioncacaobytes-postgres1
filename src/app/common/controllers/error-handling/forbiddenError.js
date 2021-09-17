const BaseError = require('./baseError')
const httpStatusCodes = require('./httpStatusCodes')

class ForbiddenError extends BaseError {
  constructor(
    name = 'forbidden',
    statusCode = httpStatusCodes.FORBIDDEN,
    description = name,
    isOperational = true,
    errorCode = 405
  ) {
    super(name, statusCode, isOperational, description, errorCode)
  }
}
module.exports = ForbiddenError
