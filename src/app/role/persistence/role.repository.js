const SequelizeRepo = require('../../common/persistence/sequilize/sequelizeRepo')

module.exports = class RoleRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.Role, apiDb)
  }
}
