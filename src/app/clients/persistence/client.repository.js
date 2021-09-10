const SequelizeRepo = require('../../common/persistence/sequilize/repositories/sequelizeRepo')
const statuses = require('../../common/persistence/status/statuses')

class ClientRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.Client, apiDb, statuses.IDLE)
  }
}

module.exports = ClientRepository
