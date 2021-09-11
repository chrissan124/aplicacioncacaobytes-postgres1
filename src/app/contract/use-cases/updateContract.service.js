const contractEntity = require('../domain/contractEntity')

class updateContractService {
  constructor(contractRepository) {
    this.contractRepository = contractRepository
  }

  async updateContract(contract) {
    contractEntity(contract, true)
    return await this.contractRepository.update(contract)
  }

  async checkStatus(contract) {}
}
module.exports = updateContractService
