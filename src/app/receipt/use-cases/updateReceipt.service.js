const ValidationException = require('../../common/domain/validationException')
const statuses = require('../../common/persistence/status/statuses')

module.exports = class updateReceiptService {
  constructor(receiptRepository, invoiceRepository, contractRepository) {
    this.receiptRepository = receiptRepository
    this.invoiceRepository = invoiceRepository
    this.contractRepository = contractRepository
  }

  async updateReceipt(receipt = { receiptId, approved: true }, invoiceId) {
    const invoice = await this.invoiceRepository.getById(invoiceId, {
      include: ['Status'],
    })
    const fullReceipt = await this.receiptRepository.getById(receipt.receiptId)
    if (invoice.Status?.name !== statuses.PENDING_REVIEW) {
      throw new ValidationException(
        'this invoice is not marked for reviewing receipts'
      )
    }
    if (receipt.approved) {
      return await this.handleApproved(fullReceipt, invoice)
    }
    return await this.handleRejected(fullReceipt, invoice)
  }
  async handleApproved(receipt, invoice) {
    await this.receiptRepository.updateStatus(
      receipt.receiptId,
      statuses.APPROVED
    )
    const contract = await this.contractRepository.getById(invoice.contractFk)
    contract.curentPayment += receipt.amount
    await this.contractRepository.update(contract)
    const newInvoiceStatus =
      receipt.amount === invoice.amount ? statuses.PAID : statuses.PARTIAL

    return await this.invoiceRepository.updateStatus(
      invoice.invoiceId,
      newInvoiceStatus
    )
  }
  async handleRejected(receipt, invoice) {
    await this.receiptRepository.updateStatus(
      receipt.receiptId,
      statuses.REJECTED
    )
    return await this.invoiceRepository.updateStatus(
      invoice.invoiceId,
      statuses.SENT
    )
  }
}
