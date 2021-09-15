const updateInvoicing = require('../domain/updateInvoicing')
const validateInvoice = require('../domain/validateInvoice')

class updateInvoiceService {
  constructor(invoiceRepository, contractRepository) {
    this.invoiceRepository = invoiceRepository
    this.contractRepository = contractRepository
  }
  async updateInvoice(invoice, contractId) {
    return this.validate(invoice, contractId)
  }

  async validate(invoice, contractId) {
    const contract = await this.contractRepository.getById(contractId, {
      include: ['ContractTemplate'],
    })

    if (!contract) {
      throw new NotFoundError(`contract ${contractId}`)
    }
    if (contract.automaticInvoice) {
      const invoices = await this.invoiceRepository.getAll({
        contractFk: contractId,
      })
      const updatedInvoices = updateInvoicing(
        contract,
        contract.ContractTemplate,
        invoices,
        invoice.deadlineDays
      )
      return await Promise.all(
        updatedInvoices.map(async (inv) => {
          return await this.invoiceRepository.update(inv)
        })
      )
    } else {
      validateInvoice(invoice)
      return await this.invoiceRepository.update({
        invoiceId: invoice.invoiceId,
        startDate: invoice.startDate,
        deadline: invoice.deadline,
      })
    }
  }
}
module.exports = updateInvoiceService
