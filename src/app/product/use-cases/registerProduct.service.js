class registerProductService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }
  async registerProduct(product) {
    return true;
  }
}
module.exports = registerProductService;
