module.exports = class getFileTemplatesService {
  constructor(fileTemplateRepository, fileTemplateMetaRepository) {
    this.repo = fileTemplateRepository
    this.metaRepo = fileTemplateMetaRepository
  }
  async getFileTemplates(options) {
    return await this.repo.getAll({
      include: ['Status', 'Category'],
      ...options,
    })
  }

  async getFileTemplate(id) {
    return await this.metaRepo.getById(id, {
      attr: ['url', 'name'],
    })
  }
}
