const SequelizeRepo = require('../../../common/persistence/sequilize/repositories/sequelizeRepo')
class ClientProductRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.ClientProduct, apiDb)
  }
}
module.exports = ClientProductRepository
