const { DateTime } = require('luxon')
const { numberBetween } = require('../../common/domain/betweenValidator')
const ValidationException = require('../../common/domain/validationException')

module.exports = function validateInvoice({ startDate, deadline, amount }) {
  amount && numberBetween(amount, 1, Infinity, 'invoice amount')
  startDate = DateTime.fromISO(startDate)
  deadline = DateTime.fromISO(deadline)
  if (startDate > deadline) {
    throw new ValidationException('start date must be before deadline')
  }
}
