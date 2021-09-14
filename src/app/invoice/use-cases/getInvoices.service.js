class getInvoicesService {
  constructor(invoiceRepository) {
    this.invoiceRepository = invoiceRepository
  }
  getInvoices(contractId, options) {
    return this.invoiceRepository.getAll({
      contractFk: contractId,
      include: ['Status'],
      ...options,
    })
  }
}
module.exports = getInvoicesService
