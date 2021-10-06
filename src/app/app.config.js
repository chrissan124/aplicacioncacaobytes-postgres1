const dotenv = require('dotenv')

dotenv.config()

const freeRoutes = ['auth/access', 'perms', 'statuses', 'api-status']

class AppConfig {
  constructor() {
    this.environment = process.env.NODE_ENV
    this.port = process.env.PORT
    this.storage = process.env.FILE_SRC
    this.prefix = process.env.API_PREFIX
    this.freeRoutes = freeRoutes.map((route) => {
      return `${this.prefix}/${route}`
    })
  }
}

module.exports = AppConfig
