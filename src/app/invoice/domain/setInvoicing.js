const { DateTime, Interval } = require('luxon')
const parseScheduleType = require('../../templates/domain/parsePaymentSchedule')

function setInvoicing(
  contract,
  contractTemplate,
  invoiceAmounts = [],
  deadlineDays = 7
) {
  let startDate = DateTime.fromISO(contract.startDate)
  const endDate = DateTime.fromISO(contract.expirationDate)
  const interval = Interval.fromDateTimes(startDate, endDate)
  const intervalUnit = parseScheduleType(contractTemplate.scheduleType)
  const intervalNumber = Math.floor(interval.length(intervalUnit))

  const invoices = []

  for (let invoiceNum = 0; invoiceNum < intervalNumber; invoiceNum++) {
    startDate = startDate.plus({ [intervalUnit]: 1 })
    const invoice = {
      startDate: startDate.toSQLDate(),
      endDate: startDate.plus({ days: deadlineDays }).toSQLDate(),
      amount: invoiceAmounts[invoiceNum]
        ? invoiceAmounts[invoiceNum]
        : contract.totalPayment / intervalNumber,
    }
    invoices.push(invoice)
  }
  return invoices
}

module.exports = setInvoicing
