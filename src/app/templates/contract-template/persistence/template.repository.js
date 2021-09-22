const SequelizeRepo = require('../../../common/persistence/sequilize/sequelizeRepo')
const statuses = require('../../../common/persistence/status/statuses')

class TemplateRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.ContractTemplate, apiDb, statuses.ACTIVE)
  }
}
module.exports = TemplateRepository
