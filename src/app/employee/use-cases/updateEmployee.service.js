const addressEntity = require('../../address/domain/addressEntity')
const employeeEntity = require('../domain/employeeEntity')

module.exports = class updateEmployeeService {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository
  }

  async updateEmployee(employee) {
    employeeEntity(employee, true)
    if (employee.Address) addressEntity(employee.Address, true)
    return await this.employeeRepository.update(employee)
  }
}
