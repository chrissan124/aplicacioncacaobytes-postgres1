const { numberBetween } = require('../../common/domain/betweenValidator')
const ValidationException = require('../../common/domain/validationException')

module.exports = function hiringEntity(
  {
    signedDate,
    startDate,
    expirationDate,
    totalPayment,
    currentPayment = 0,
    hiringId,
    contractTemplateId,
    statusId,
  },
  update
) {
  signedDate = new Date(signedDate)
  startDate = new Date(startDate)
  expirationDate = new Date(expirationDate)

  if (signedDate && expirationDate < signedDate) {
    throw new ValidationException('signed date must be before expiration date')
  }

  if (startDate && startDate > expirationDate) {
    throw new ValidationException('expiration date must be after start date')
  }

  ;(update && !totalPayment) ||
    numberBetween(totalPayment, 1, Infinity, 'contract payment')
  return Object.freeze({
    signedDate: new Date(signedDate),
    startDate: new Date(startDate),
    expirationDate: new Date(expirationDate),
    totalPayment,
    currentPayment,
    hiringId,
    contractTemplateId,
    statusId,
    isCreated: () => hiringId,
  })
}
