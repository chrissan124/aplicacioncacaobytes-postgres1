const productEntity = require('../domain/productEntity')

class updateProductService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }
  async updateProduct(product) {
    productEntity(product, true)
    return this.productsRepository.update(product)
  }
}
module.exports = updateProductService
