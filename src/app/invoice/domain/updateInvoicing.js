const { DateTime } = require('luxon')
const { numberBetween } = require('../../common/domain/betweenValidator')
const ValidationException = require('../../common/domain/validationException')
const getMaxDeadline = require('./getMaxDeadline')

function updateInvoicing(
  contract,
  contractTemplate,
  invoices = [],
  deadlineDays = 15
) {
  if (!deadlineDays) {
    throw new ValidationException('missing deadline interval for invoicing')
  }
  let startDate = DateTime.fromISO(contract.startDate)
  numberBetween(
    deadlineDays,
    2,
    getMaxDeadline(contractTemplate.scheduleType, startDate) *
      contractTemplate.paymentSchedule -
      1,
    'deadline interval'
  )

  return invoices.map((inv) => {
    const date = DateTime.fromISO(inv.startDate)
    const invoice = {
      invoiceId: inv.invoiceId,
      deadline: date.plus({ days: deadlineDays }).toSQLDate(),
    }
    return invoice
  })
}

module.exports = updateInvoicing
