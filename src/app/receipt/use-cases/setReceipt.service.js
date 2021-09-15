const statuses = require('../../common/persistence/status/statuses')
const receiptEntity = require('../domain/receiptEntity')

module.exports = class setReceiptService {
  constructor(receiptRepository, invoiceRepository) {
    this.receiptRepository = receiptRepository
    this.invoiceRepository = invoiceRepository
  }

  async setReceipt(receipt, invoiceId) {
    const invoice = await this.invoiceRepository.getById(invoiceId, {
      include: ['Status'],
    })
    const validReceipt = receiptEntity(receipt, invoice)
    const result = this.receiptRepository.create({
      ...validReceipt,
      invoiceFk: invoiceId,
    })
    await this.invoiceRepository.updateStatus(
      invoice.invoiceId,
      statuses.PENDING_REVIEW
    )
    return result
  }
}
