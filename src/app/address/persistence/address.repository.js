const SequelizeRepo = require('../../common/persistence/sequilize/repositories/sequelizeRepo')

class AddressRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.Address)
  }
}

module.exports = AddressRepository
