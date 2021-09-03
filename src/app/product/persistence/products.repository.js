const Repository = require('../../common/persistence/sequilize/sequelizeRepository')
class ProductRepository extends Repository {
  constructor(apiDb) {
    super(apiDb.models.Product)
  }
}

module.exports = ProductRepository
