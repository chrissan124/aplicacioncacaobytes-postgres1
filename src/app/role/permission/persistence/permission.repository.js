const SequelizeRepo = require('../../../common/persistence/sequilize/sequelizeRepo')

module.exports = class PermissionRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.Permission, apiDb)
  }
}
