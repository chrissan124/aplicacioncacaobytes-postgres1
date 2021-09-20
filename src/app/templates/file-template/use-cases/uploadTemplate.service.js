module.exports = class uploadTemplateService {
  constructor(fileTemplateRepository, bus) {
    this.fileTemplateRepository = fileTemplateRepository
    this.bus = bus
  }
  async uploadTemplate(template) {
    const created = await this.fileTemplateRepository.create({
      ...template,
      name: template.name || template.filename,
    })
    this.bus.emit('fileTemplateCreated', {
      ...template,
      fileTemplateId: created.fileTemplateId,
    })
    return created
  }
}
