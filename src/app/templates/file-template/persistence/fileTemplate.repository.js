const SequelizeRepo = require('../../../common/persistence/sequilize/sequelizeRepo')
const statuses = require('../../../common/persistence/status/statuses')

class FileTemplateRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.FileTemplate, apiDb, statuses.ACTIVE)
  }
}
module.exports = FileTemplateRepository
