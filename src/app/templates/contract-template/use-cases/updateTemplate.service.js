const contractTemplateEntity = require('../domain/contractTemplateEntity')

module.exports = class updateTemplateService {
  constructor(templateRepository) {
    this.templateRepository = templateRepository
  }
  async updateTemplate(template) {
    contractTemplateEntity(template, true)
    return await this.templateRepository.update(template)
  }
}
