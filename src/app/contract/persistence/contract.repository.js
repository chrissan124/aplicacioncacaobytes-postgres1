const SequelizeRepo = require('../../common/persistence/sequilize/sequelizeRepo')
const statuses = require('../../common/persistence/status/statuses')

module.exports = class ContractRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.Contract, apiDb, statuses.DRAFT)
  }
}
