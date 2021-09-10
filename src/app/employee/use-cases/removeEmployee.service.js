module.exports = class RemoveEmployeeService {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository
  }

  async removeEmployee(id) {
    if (id) return await this.employeeRepository.remove(id)
  }
  async restoreEmployee(id) {
    if (id) return await this.employeeRepository.restore(id)
  }
}
