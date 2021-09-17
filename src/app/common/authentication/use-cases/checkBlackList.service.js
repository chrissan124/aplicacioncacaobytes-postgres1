const ForbiddenError = require('../../controllers/error-handling/forbiddenError')

module.exports = class checkBlackListService {
  constructor(tokenRepository) {
    this.tokenRepository = tokenRepository
  }
  async checkBlackList(token) {
    const blackListed = await this.tokenRepository.getOne({
      conditions: { token: token },
      attr: ['_id'],
    })
    if (blackListed) {
      throw new ForbiddenError('blackListed token')
    }
    return true
  }
}
