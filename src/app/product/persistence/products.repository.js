const Repository = require('../../common/persistence/sequilize/repositories/sequelizeRepo')
const statuses = require('../../common/persistence/status/statuses')
class ProductRepository extends Repository {
  constructor(apiDb) {
    super(apiDb.models.Product, apiDb, statuses.ACTIVE)
  }
}

module.exports = ProductRepository
