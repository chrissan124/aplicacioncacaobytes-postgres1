const SequilizeRepository = require('../../common/persistence/sequilize/sequelizeRepository')
class AddressRepository extends SequilizeRepository {
  constructor(apiDb) {
    super(apiDb.models.Address)
  }
}

module.exports = AddressRepository
