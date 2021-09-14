const SequelizeRepo = require('../../common/persistence/sequilize/sequelizeRepo')
const statuses = require('../../common/persistence/status/statuses')

module.exports = class UserRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.User, apiDb, statuses.ACTIVE)
  }
}
