const { DateTime } = require('luxon')
const ValidationException = require('../../common/domain/validationException')
const statuses = require('../../common/persistence/status/statuses')

class cancelContractService {
  constructor(contractRepository, invoiceRepository) {
    this.contractRepository = contractRepository
    this.invoiceRepository = invoiceRepository
  }

  async cancelContract(contractId) {
    await this.checkStatus(contractId)
    const result = await this.invoiceRepository.getAll({
      contractFk: contractId,
      include: ['Status'],
    })
    const invoices = result.rows
    Array.isArray(invoices) &&
      invoices.forEach(async (invoice) => {
        if (invoice.Status.name !== statuses.PAID) {
          await this.invoiceRepository.updateStatus(
            invoice.invoiceId,
            statuses.CANCELLED
          )
        }
      })
    return await this.contractRepository.updateStatus(
      contractId,
      statuses.CANCELLED
    )
  }

  async checkStatus(contractId) {
    const status = await this.contractRepository.getStatus(contractId)
    if (
      ![statuses.DRAFT, statuses.ACTIVE, statuses.APPROVED].includes(
        status.name
      )
    ) {
      throw new ValidationException(
        `${status.name} status. Only DRAFT, APPROVED or ACTIVE contracts can be cancelled`
      )
    }
    return status
  }
}
module.exports = cancelContractService
