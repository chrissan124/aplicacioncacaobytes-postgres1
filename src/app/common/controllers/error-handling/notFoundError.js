const BaseError = require('./baseError')
const httpStatusCodes = require('./httpStatusCodes')

class NotFoundError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = name + ' not found.',
    isOperational = true,
    errorCode = 150
  ) {
    super(name, statusCode, isOperational, description, errorCode)
  }
}
module.exports = NotFoundError
