const BaseError = require('./baseError')
const httpStatusCodes = require('./httpStatusCodes')

class UpdateError extends BaseError {
  constructor(
    paramId,
    bodyId,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = `param ID (${paramId}) does not match body ID (${bodyId})`,
    isOperational = true,
    errorCode = 105
  ) {
    super('Update error', statusCode, isOperational, description, errorCode)
  }
}
module.exports = UpdateError
