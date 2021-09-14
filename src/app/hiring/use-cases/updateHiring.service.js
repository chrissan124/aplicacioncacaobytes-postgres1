const statuses = require('../../common/persistence/status/statuses')
const hiringEntity = require('../domain/hiringEntity')

module.exports = class UpdateHiringService {
  constructor(hiringRepository) {
    this.hiringRepository = hiringRepository
  }

  async updateHiring(hiring) {
    hiringEntity(hiring, true)
    if (hiring.statusName && statuses[hiring.statusName.toUpperCase()]) {
      await this.hiringRepository.updateStatus(
        hiring.hiringId,
        hiring.statusName.toUpperCase()
      )
    }
    return await this.hiringRepository.update(hiring)
  }
}
