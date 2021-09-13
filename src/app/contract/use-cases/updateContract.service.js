const ValidationException = require('../../common/domain/validationException')
const statuses = require('../../common/persistence/status/statuses')
const contractEntity = require('../domain/contractEntity')

class updateContractService {
  constructor(contractRepository) {
    this.contractRepository = contractRepository
  }

  async updateContract(contract) {
    contractEntity(contract, true)
    await this.checkStatus(contract)
    return await this.contractRepository.update(contract)
  }

  async checkStatus(contract) {
    const status = await this.contractRepository.getStatus(contract.contractId)
    if (status.name !== statuses.DRAFT) {
      throw new ValidationException(
        `${status.name} status. Only drafted contracts can be modified`
      )
    }
    return status
  }
}
module.exports = updateContractService
