const logger = require('../logger/logger')

function logError(err) {
  logger.error(err.message)
}

function logErrorMiddleware(err, req, res, next) {
  logError(err)
  next(err)
}

function databaseErrors(err, req, res, next) {
  if (err.sql) {
    if (err.original.constraint) {
      const [table, field, key] = err.original.constraint.split('_')
      err.statusCode = 400
      err.errorCode = 300
      err.message = `This ${field} already exists in ${table}`
    }
  }
  next(err)
}

function returnError(err, req, res, next) {
  const statusCode = err.statusCode || 500
  const errorCode = err.errorCode || 404
  res.status(statusCode).send({
    statusCode,
    error: err.message,
    errorCode,
  })
}

function isOperationalError(error) {
  if (error instanceof BaseError) {
    return error.isOperational
  }
  return false
}

module.exports = {
  logError,
  logErrorMiddleware,
  returnError,
  isOperationalError,
  databaseErrors,
}
