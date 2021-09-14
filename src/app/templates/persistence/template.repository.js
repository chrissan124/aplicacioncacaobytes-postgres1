const SequelizeRepo = require('../../common/persistence/sequilize/sequelizeRepo')

class TemplateRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.ContractTemplate, apiDb)
  }
}
module.exports = TemplateRepository
