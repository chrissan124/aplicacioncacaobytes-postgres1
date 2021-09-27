const contractTemplateEntity = require('../../templates/contract-template/domain/contractTemplateEntity')
const contractEntity = require('../domain/contractEntity')

class createContractService {
  constructor(contractRepository, clientProductRepository) {
    this.contractRepo = contractRepository
    this.clientProdRepo = clientProductRepository
  }
  async createContract(clientId, productId, contract) {
    contractEntity(contract)
    let clientProductId = await this.checkClientProduct(clientId, productId)
    clientProductId =
      typeof clientProductId === 'object'
        ? clientProductId.clientProductId
        : clientProductId

    contract.ContractTemplate &&
      contractTemplateEntity(contract.ContractTemplate)

    return await this.contractRepo.create({
      ...contract,
      clientProductFk: clientProductId,
    })
  }

  async checkClientProduct(clientId, productId) {
    const clientProd = {
      clientFk: clientId,
      productFk: productId,
    }

    const existsRelation = await this.clientProdRepo.getAll({
      clientFk: clientId,
      productFk: productId,
    })
    const id = existsRelation.count
      ? existsRelation.rows[0].clientProductId
      : await this.clientProdRepo.create(clientProd)
    return id
  }
}
module.exports = createContractService
