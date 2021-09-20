module.exports = class removeTemplateService {
  constructor(templateRepository) {
    this.templateRepository = templateRepository
  }
  async removeTemplate(id) {
    return await this.templateRepository.remove(id)
  }
}
