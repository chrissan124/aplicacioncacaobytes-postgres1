module.exports = class getReceiptsService {
  constructor(receiptRepository) {
    this.receiptRepository = receiptRepository
  }

  async getReceipts(options) {
    return await this.receiptRepository.getAll(options)
  }

  async getContractReceipts(contractId, options) {
    return await this.receiptRepository.getAllByContract(contractId, options)
  }
}
