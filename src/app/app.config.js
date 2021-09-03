const dotenv = require('dotenv')

dotenv.config()

class AppConfig {
	constructor() {
		this.environment = process.env.NODE_ENV
		this.port = process.env.PORT
	}
}

module.exports = AppConfig
