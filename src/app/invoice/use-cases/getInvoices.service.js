class getInvoicesService {
  constructor(invoiceRepository) {
    this.invoiceRepository = invoiceRepository
  }
  async getInvoices(contractId, options) {
    return await this.invoiceRepository.getAll({
      contractFk: contractId,
      include: ['Status'],
      ...options,
    })
  }
}
module.exports = getInvoicesService
