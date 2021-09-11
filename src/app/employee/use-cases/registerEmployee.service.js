const addressEntity = require('../../address/domain/addressEntity')
const employeeEntity = require('../domain/employeeEntity')

module.exports = class registerEmployeeService {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository
  }

  async registerEmployee(employee) {
    employeeEntity(employee)
    if (employee.Address) addressEntity(employee.Address)
    return await this.employeeRepository.create(employee)
  }
}
