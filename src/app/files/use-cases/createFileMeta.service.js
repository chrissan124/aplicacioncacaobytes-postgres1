const mapFileData = require('../domain/mapFileData')

module.exports = class createFileMetaService {
  constructor(fileTemplateMetaRepository, fileReceiptMetaRepository) {
    this.repo = fileTemplateMetaRepository
    this.receiptRepo = fileReceiptMetaRepository
  }
  async createFileMeta(file) {
    const parsedFile = mapFileData(file)
    const id = file.fileTemplateId || file.fileReceiptId
    if (file.fileTemplateId) {
      return await this.repo.create({ ...parsedFile, _id: id })
    }
    return await this.receiptRepo.create({ ...parsedFile, _id: id })
  }
}
