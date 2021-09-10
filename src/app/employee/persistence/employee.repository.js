const SequilizeRepository = require('../../common/persistence/sequilize/repositories/sequelizeRepo')
const statuses = require('../../common/persistence/status/statuses')

module.exports = class EmployeeRepository extends SequilizeRepository {
  constructor(apiDb) {
    super(apiDb.models.Employee, apiDb, statuses.IDLE)
  }
}
