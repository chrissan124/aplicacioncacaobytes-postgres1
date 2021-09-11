module.exports = class GetTemplatesService {
  constructor(templateRepository) {
    this.templateRepository = templateRepository
  }
  async getTemplates(options) {
    return await this.templateRepository.getAll({
      ...options,
      include: ['Category'],
    })
  }
  async getTemplate(id) {
    return await this.templateRepository.getById(id, { include: ['category'] })
  }
}
