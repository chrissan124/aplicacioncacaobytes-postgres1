const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')
const ValidationException = require('../../common/domain/validationException')
const validateInvoice = require('../domain/validateInvoice')

class createInvoiceService {
  constructor(invoiceRepository, contractRepository) {
    this.invoiceRepository = invoiceRepository
    this.contractRepository = contractRepository
  }
  async createInvoice(invoices, contractId) {
    invoices = await this.validate(invoices, contractId)
    const result = await this.invoiceRepository.createList(invoices)
    return result?.length > 1 ? result : result[0]
  }

  async validate(invoices, contractId) {
    const contract = await this.contractRepository.getById(contractId)

    if (!contract) {
      throw new NotFoundError(`contract ${contractId}`)
    }
    if (contract.automaticInvoice) {
      throw new ValidationException(
        'this contract has automatic invoicing enabled'
      )
    }
    let currentAmount = await this.invoiceRepository.getTotalAmount(contractId)
    invoices = Array.isArray(invoices) ? invoices : [invoices]

    invoices.forEach((invoice) => {
      validateInvoice(invoice)
      if (invoice.amount + currentAmount > contract.totalPayment) {
        if (currentAmount === contract.totalPayment)
          throw new ValidationException(
            `This contract has enough invoices to cover its total amount of '${currentAmount}''`
          )
        else
          throw new ValidationException(
            `invoice amount '${
              invoice.amount
            }' exceeds contract's total amount of '${
              contract.totalPayment
            }' by '${invoice.amount + currentAmount - contract.totalPayment}'.`
          )
      }
      invoice.contractFk = contractId
    })
    return invoices
  }
}
module.exports = createInvoiceService
