const BaseError = require('./baseError')
const httpStatusCodes = require('./httpStatusCodes')

module.exports = class UnauthorizedError extends BaseError {
  constructor(
    name = 'unauthorized',
    statusCode = httpStatusCodes.UNAUTHORIZED,
    description = name,
    isOperational = true,
    errorCode = 400
  ) {
    super(name, statusCode, isOperational, description, errorCode)
  }
}
