module.exports = class getHiringsService {
  constructor(hiringRepository) {
    this.hiringRepository = hiringRepository
  }

  async getHirings(options) {
    return await this.hiringRepository.getAll({
      include: ['Status', 'ContractTemplate'],
      ...options,
    })
  }

  async getHiringsByEmployee(employeeId, options) {
    return await this.hiringRepository.getAll({
      employeeFk: employeeId,
      include: ['Status', 'ContractTemplate'],
      ...options,
    })
  }
}
