const SequelizeRepo = require('../../common/persistence/sequilize/sequelizeRepo')

module.exports = class categoriesRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.Category, apiDb)
  }
}
