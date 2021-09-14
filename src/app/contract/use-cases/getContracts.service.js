class GetContractsService {
  constructor(contractRepository, getContractProductService) {
    this.contractRepo = contractRepository
    this.getContractProduct = getContractProductService
  }

  async getAllContracts(options) {
    return this.contractRepo.getAll({
      ...options,
      include: ['Status', 'ContractTemplate', 'ClientProduct'],
    })
  }

  async getContractsByClient(clientId, options) {
    const validEntries = await this.getContractProduct.getContractProduct(
      {
        clientFk: clientId,
      },
      'clientProductId'
    )
    return validEntries.length
      ? await this.contractRepo.getAll({
          clientProductFk: validEntries,
          include: ['Status', 'ContractTemplate'],
          ...options,
        })
      : []
  }
  async getContract(contractId, options) {
    return await this.contractRepo.getById(contractId, {
      include: ['Status', 'ContractTemplate'],
      ...options,
    })
  }
}
module.exports = GetContractsService
