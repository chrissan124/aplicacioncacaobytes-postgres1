const { DateTime } = require('luxon')

module.exports = class removeBlackListService {
  constructor(tokenRepository) {
    this.tokenRepository = tokenRepository
  }
  async removeBlackList() {
    return await this.tokenRepository.removeMany({
      expiration_date: { lte: DateTime.now().toString() },
    })
  }
}
