const SequilizeRepository = require('../../common/persistence/sequilize/repositories/sequelizeRepo')
const statuses = require('../../common/persistence/status/statuses')

module.exports = class EmployeeRepository extends SequilizeRepository {
  constructor(apiDb) {
    super(apiDb.models.Employee, apiDb, true)
  }
  async create(employee) {
    const instance = await this.model.create(employee)
    if (employee.Address) {
      await instance.createAddress(employee.Address)
    }
    await this.updateStatus(instance.employId, statuses.IDLE)
    return instance
  }
}
