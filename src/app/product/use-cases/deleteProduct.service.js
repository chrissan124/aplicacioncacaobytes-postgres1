class deleteProductService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }
  async deleteProduct(productId) {
    return await this.productsRepository.remove(productId)
  }
  async restoreProduct(productId) {
    return await this.productsRepository.restore(productId)
  }
}
module.exports = deleteProductService
