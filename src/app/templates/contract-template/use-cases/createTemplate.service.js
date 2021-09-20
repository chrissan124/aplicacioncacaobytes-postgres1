const contractTemplateEntity = require('../domain/contractTemplateEntity')

module.exports = class createTemplateService {
  constructor(templateRepository) {
    this.templateRepository = templateRepository
  }
  async createTemplate(template) {
    contractTemplateEntity(template)
    return await this.templateRepository.create(template)
  }
}
