module.exports = class createFileReceiptService {
  constructor(fileReceiptRepository) {
    this.repo = fileReceiptRepository
  }
  async createFileReceipt(receiptId) {
    const fileReceipt = await this.repo.create({ receiptFk: receiptId })

    return fileReceipt
  }
}
