module.exports = class getEmployeesService {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository
  }

  async getEmployees(options) {
    return await this.employeeRepository.getAll({
      ...options,
      include: ['Address', 'Status'],
    })
  }
}
