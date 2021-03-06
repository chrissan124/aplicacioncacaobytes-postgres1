const productEntity = require('../domain/productEntity')

class registerProductService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }
  async registerProduct(product) {
    productEntity(product)
    return this.productsRepository.create(product)
  }
}
module.exports = registerProductService
