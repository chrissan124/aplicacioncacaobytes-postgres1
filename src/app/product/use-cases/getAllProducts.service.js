class getAllProductsService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }
  async getAllProducts() {
    return this.productsRepository.getAll()
  }
}
module.exports = getAllProductsService
