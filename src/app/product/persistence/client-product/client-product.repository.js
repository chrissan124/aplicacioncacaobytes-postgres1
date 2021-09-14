const SequelizeRepo = require('../../../common/persistence/sequilize/sequelizeRepo')

class ClientProductRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.ClientProduct, apiDb)
  }
}
module.exports = ClientProductRepository
