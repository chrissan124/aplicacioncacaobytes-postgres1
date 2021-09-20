const mapFileData = require('../domain/mapFileData')

module.exports = class updateFileMetaService {
  constructor(fileTemplateMetaRepository) {
    this.repo = fileTemplateMetaRepository
  }
  async updateFileMeta(file) {
    const parsedFile = mapFileData(file)
    return await this.repo.update({ ...parsedFile, _id: file.id })
  }
}
