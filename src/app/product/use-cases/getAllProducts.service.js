class getAllProductsService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }
  async getAllProducts(options) {
    return this.productsRepository.getAll({
      ...options,
      include: ['Status'],
    })
  }
  async getProduct(id) {
    return this.productsRepository.getById(id, { include: ['Status'] })
  }
}
module.exports = getAllProductsService
