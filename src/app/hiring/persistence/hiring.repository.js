const SequelizeRepo = require('../../common/persistence/sequilize/sequelizeRepo')
const statuses = require('../../common/persistence/status/statuses')

module.exports = class HiringRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.Hiring, apiDb, statuses.DRAFT)
  }
}
