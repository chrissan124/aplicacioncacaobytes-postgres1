const hiringEntity = require('../domain/hiringEntity')

module.exports = class CreateHiringService {
  constructor(hiringRepository) {
    this.hiringRepository = hiringRepository
  }

  async createHiring(hiring, employeeId) {
    hiringEntity(hiring)
    return await this.hiringRepository.create({
      ...hiring,
      employeeFk: employeeId,
    })
  }
}
