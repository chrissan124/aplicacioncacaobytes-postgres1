class deleteProductService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }
  async deleteProduct(productId) {
    return await this.productsRepository.remove(productId)
  }
}
module.exports = deleteProductService
