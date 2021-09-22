const SequelizeRepo = require('../sequilize/sequelizeRepo')

module.exports = class statusRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.Status, apiDb)
  }
}
