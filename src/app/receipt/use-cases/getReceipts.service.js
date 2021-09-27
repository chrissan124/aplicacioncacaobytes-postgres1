module.exports = class getReceiptsService {
  constructor(receiptRepository) {
    this.receiptRepository = receiptRepository
  }

  async getReceipts(options) {
    return await this.receiptRepository.getAll(options)
  }
  //Raro: quiero quitar el atributo Invoice pero no deja
  async getContractReceipts(contractId, options) {
    const receipts = await this.receiptRepository.getAll({
      include: ['Status', 'Invoice'],
      '$Invoice.contractFk$': contractId,
      attr: ['amount', 'receiptId', 'concept', 'paymentMethod'],
      exclude: ['Invoice'],
      ...options,
    })
    return receipts
  }
}
