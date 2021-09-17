const { DateTime } = require('luxon')

module.exports = class logoutUserService {
  constructor(tokenRepository, verifyTokenService) {
    this.tokenRepository = tokenRepository
    this.verifyTokenService = verifyTokenService
  }
  async logoutUser(data) {
    const verifiedData = this.verifyTokenService.verifyToken(data)
    const expiration_date = DateTime.fromSeconds(verifiedData.exp)
    this.tokenRepository.create({
      token: data,
      expiration_date: expiration_date.toString(),
    })
  }
}
