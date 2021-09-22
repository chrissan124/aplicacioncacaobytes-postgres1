const statuses = require('../../common/persistence/status/statuses')
const receiptEntity = require('../domain/receiptEntity')

module.exports = class setReceiptService {
  constructor(
    receiptRepository,
    invoiceRepository,
    createFileReceiptService,
    bus
  ) {
    this.receiptRepository = receiptRepository
    this.invoiceRepository = invoiceRepository
    this.createFileReceiptService = createFileReceiptService
    this.bus = bus
  }

  async setReceipt(receipt, invoiceId) {
    const invoice = await this.invoiceRepository.getById(invoiceId, {
      include: ['Status'],
    })
    const validReceipt = receiptEntity(receipt, invoice)
    const result = await this.receiptRepository.create({
      ...validReceipt,
      invoiceFk: invoiceId,
    })
    await this.invoiceRepository.updateStatus(
      invoice.invoiceId,
      statuses.PENDING_REVIEW
    )
    const fileReceipt = await this.createFileReceiptService.createFileReceipt(
      result.receiptId
    )
    fileReceipt &&
      this.bus.emit('fileReceiptCreated', {
        fileReceiptId: fileReceipt.fileReceiptId,
        ...receipt,
      })
    return result
  }
}
