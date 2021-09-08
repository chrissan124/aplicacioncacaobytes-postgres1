class getAllProductsService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }
  async getAllProducts(pagination = { limit, offset }) {
    return this.productsRepository.getAll(pagination)
  }
  async getProduct(id) {
    return this.productsRepository.getById(id)
  }
}
module.exports = getAllProductsService
