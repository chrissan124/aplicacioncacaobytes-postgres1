class getContractProductService {
  constructor(clientProductRepository) {
    this.clientProdRepo = clientProductRepository
  }

  async getContractProduct(ops, field) {
    const { rows } = await this.clientProdRepo.getAll(ops)
    return Array.isArray(rows)
      ? rows.map((raw) => {
          return field ? raw.dataValues[field] : raw.dataValues
        })
      : rows
  }
}
module.exports = getContractProductService
