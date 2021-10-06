const { DateTime } = require('luxon')
const statuses = require('../../common/persistence/status/statuses')
module.exports = class updateInvoiceStatus {
  constructor(invoiceRepository, getStatusesService, bus) {
    this.invoiceRepository = invoiceRepository
    this.getStatusesService = getStatusesService
    this.bus = bus
  }
  async updateInvoiceStatus() {
    const now = DateTime.now()
    const foundStatuses = await this.getStatusesService.getStatuses()

    const startResult = await this.invoiceRepository.getAll({
      startDate: { lte: now.toSQLDate() },
      statusFk: this.findStatus(foundStatuses, statuses.DRAFT),
      include: ['Contract'],
    })
    const startInvoices = startResult.rows
    const expiredResult = await this.invoiceRepository.getAll({
      deadline: { lte: now.toSQLDate() },
      statusFk: {
        notIn: [
          this.findStatus(foundStatuses, statuses.PAID),
          this.findStatus(foundStatuses, statuses.CANCELLED),
        ],
      },
      include: ['Contract'],
      overdue: { ne: true },
    })
    const expiredInvoices = expiredResult.rows
    const startedNumber = await this.handleStart(startInvoices)
    const expiredNumber = await this.handleExpired(expiredInvoices)
    return [startedNumber, expiredNumber]
  }
  //todo: update status + send mail
  async handleStart(invoices = []) {
    invoices.forEach((invoice) => {
      this.invoiceRepository.updateStatus(invoice.invoiceId, statuses.SENT)
      this.bus.emit('invoiceStarted', invoice)
    })
    return invoices.length
  }
  async handleExpired(invoices = []) {
    invoices.forEach((invoice) => {
      this.invoiceRepository.update({
        invoiceId: invoice.invoiceId,
        overdue: true,
      })
      this.bus.emit('invoiceExpired', invoice)
    })
    return invoices.length
  }

  findStatus(statusList = [], statusName = '') {
    return statusList.find((status) => {
      return status[statusName]
    })[statusName]
  }
}
