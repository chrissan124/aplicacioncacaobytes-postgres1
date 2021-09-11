class getContractProductService {
  constructor(clientProductRepository) {
    this.clientProdRepo = clientProductRepository
  }

  async getContractProduct(ops, field) {
    const contractProducts = await this.clientProdRepo.getAll(ops)
    return Array.isArray(contractProducts)
      ? contractProducts.map((raw) => {
          return field ? raw.dataValues[field] : raw.dataValues
        })
      : contractProducts
  }
}
module.exports = getContractProductService
