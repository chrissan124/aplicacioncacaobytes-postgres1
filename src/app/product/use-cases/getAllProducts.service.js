class getAllProductsService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository
  }
  async getAllProducts(pagination = { limit, offset }) {
    return this.productsRepository.getAll({
      ...pagination,
      include: ['Status'],
    })
  }
  async getProduct(id) {
    return this.productsRepository.getById(id, { include: 'Status' })
  }
}
module.exports = getAllProductsService
