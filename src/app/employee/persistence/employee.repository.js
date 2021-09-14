const SequelizeRepo = require('../../common/persistence/sequilize/sequelizeRepo')
const statuses = require('../../common/persistence/status/statuses')

module.exports = class EmployeeRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.Employee, apiDb, statuses.IDLE)
  }
}
