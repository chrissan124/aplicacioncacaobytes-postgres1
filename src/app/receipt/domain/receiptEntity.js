const { DateTime } = require('luxon')
const ValidationException = require('../../common/domain/validationException')
const statuses = require('../../common/persistence/status/statuses')

module.exports = function receiptEntity(
  receipt = {
    amount,
    paymentDate,
    concept,
    paymentMethod,
  },
  invoice = { Status: { name: '' }, amount, invoiceId }
) {
  if (!invoice) {
    throw NotFoundError(`invoice`)
  }

  if (receipt.amount < 0) {
    throw new ValidationException('invalid receipt amount')
  }

  if (invoice.Status?.name === statuses.PAID) {
    throw new ValidationException('this invoice is already paid')
  }

  if (invoice.Status?.name === statuses.PENDING_REVIEW) {
    throw new ValidationException(
      'there are other receipts being reviewed for this invoice, try again later'
    )
  }

  if (invoice.amount < receipt.amount) {
    throw new ValidationException(
      `Please make sure the receipt's amount covers invoice amount`
    )
  }

  return Object.freeze({
    ...receipt,
    paymentDate: receipt.paymentDate
      ? receipt.paymentDate
      : DateTime.now().toSQL(),
    concept: receipt.concept
      ? receipt.concept
      : `payment for invoice ${invoice.invoiceId}`,
  })
}
