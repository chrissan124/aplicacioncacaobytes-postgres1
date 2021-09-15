const { DateTime, Interval } = require('luxon')
const { numberBetween } = require('../../common/domain/betweenValidator')
const parseScheduleType = require('../../templates/domain/parsePaymentSchedule')
const getMaxDeadline = require('./getMaxDeadline')

function setInvoicing(contract, contractTemplate, deadlineDays = 15) {
  let startDate = DateTime.fromISO(contract.startDate)
  const endDate = DateTime.fromISO(contract.expirationDate)
  const interval = Interval.fromDateTimes(startDate, endDate)

  numberBetween(
    deadlineDays,
    2,
    getMaxDeadline(contractTemplate.scheduleType, startDate) *
      contractTemplate.paymentSchedule,
    'deadline interval'
  )

  const intervalUnit = parseScheduleType(contractTemplate.scheduleType)
  const intervalNumber = Math.floor(
    interval.length(intervalUnit) / contractTemplate.paymentSchedule
  )

  const invoices = []

  const amount =
    Math.round((contract.totalPayment / intervalNumber) * 100) / 100

  for (let invoiceNum = 0; invoiceNum < intervalNumber; invoiceNum++) {
    const invoice = {
      contractFk: contract.contractId,
      startDate: startDate.toSQLDate(),
      deadline: startDate.plus({ days: deadlineDays }).toSQLDate(),
      amount: amount,
    }
    invoices.push(invoice)
    startDate = startDate.plus({
      [intervalUnit]: contractTemplate.paymentSchedule,
    })
  }
  return invoices
}

module.exports = setInvoicing
