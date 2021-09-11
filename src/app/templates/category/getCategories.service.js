module.exports = class getCategoriesService {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async getCategories(ops) {
    return await this.categoriesRepository.getAll(ops)
  }
}
