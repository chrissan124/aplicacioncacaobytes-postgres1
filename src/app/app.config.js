const dotenv = require('dotenv')

dotenv.config()

class AppConfig {
  constructor() {
    this.environment = process.env.NODE_ENV
    this.port = process.env.PORT
    this.storage = process.env.FILE_SRC
    this.prefix = process.env.API_PREFIX
  }
}

module.exports = AppConfig
