const { DateTime } = require('luxon')
const ValidationException = require('../../common/domain/validationException')
const statuses = require('../../common/persistence/status/statuses')
const setInvoicing = require('../../invoice/domain/setInvoicing')
const contractEntity = require('../domain/contractEntity')

class startContractService {
  constructor(contractRepository, templateRepository, invoiceRepository) {
    this.contractRepository = contractRepository
    this.contTempRepo = templateRepository
    this.invoiceRepository = invoiceRepository
  }

  async startContract(contract) {
    const today = DateTime.now()
    contract.signedDate = contract.signedDate
      ? contract.signedDate
      : today.toSQL()
    if (!contract.startDate) {
      throw new ValidationException(
        `A start date must be provided to start a contract`
      )
    }
    contractEntity(contract, true)
    await this.checkStatus(contract)

    const fullContract = await this.contractRepository.update(contract)

    const template = await this.contTempRepo.getById(
      fullContract.contractTemplateFk
    )
    if (fullContract.automaticInvoice) {
      const invoices = setInvoicing(
        fullContract,
        template,
        contract.deadlineDays
      )

      await this.invoiceRepository.createList(invoices)
    }

    return await this.contractRepository.updateStatus(
      fullContract.contractId,
      statuses.APPROVED
    )
  }

  async checkStatus(contract) {
    const status = await this.contractRepository.getStatus(contract.contractId)
    if (status.name !== statuses.DRAFT) {
      throw new ValidationException(
        `${status.name} status. Only DRAFT contracts can be started`
      )
    }
    return status
  }
}
module.exports = startContractService
