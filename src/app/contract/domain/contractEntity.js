const { numberBetween } = require('../../common/domain/betweenValidator')

module.exports = function contractEntity({
  signedDate,
  startDate,
  expirationDate,
  totalPayment,
  currentPayment = 0,
  automaticInvoicing = true,
  contractId,
  clientProductId,
  contractTemplateId,
  statusId,
}) {
  signedDate = new Date(signedDate)
  startDate = new Date(startDate)
  expirationDate = new Date(expirationDate)

  if (signedDate && expirationDate < signedDate) {
    throw new Error('Signed date must be before expiration date')
  }

  if (startDate && startDate > expirationDate) {
    throw new Error('Expiration date must be after start date')
  }

  numberBetween(totalPayment, 1, Infinity, 'contract payment')

  return Object.freeze({
    signedDate: new Date(signedDate),
    startDate: new Date(startDate),
    expirationDate: new Date(expirationDate),
    automaticInvoicing,
    totalPayment,
    currentPayment,
    contractId,
    clientProductId,
    contractTemplateId,
    statusId,
    isCreated: () => contractId && clientProductId,
  })
}
