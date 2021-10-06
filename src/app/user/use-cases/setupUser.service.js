const logger = require('../../common/controllers/logger/logger')
const { sendEmail } = require('../../common/services/mailer/mailer')
require('dotenv').config()
module.exports = class setupUserService {
  constructor(loginUserService) {
    this.loginUserService = loginUserService
  }
  async setupUser(user) {
    this.loginUserService
      .loginUser(user, '72h')
      .then(async ({ token }) => {
        const url = `${process.env.WEB_APP_URL}/register/${token}`
        return await sendEmail(
          user.email,
          `CacaoEnBytes' sign up`,
          'register',
          {
            user,
            url,
          }
        )
      })
      .catch((error) => {
        logger.error(`At setting up user sign up [${error.message}]`)
      })
  }
}
