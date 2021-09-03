const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const kill = require('kill-port')
const { loadControllers, scopePerRequest } = require('awilix-express')
const { resolve } = require('path')

class App {
  constructor(appConfig) {
    this.appConfig = appConfig
  }

  async start(container, callback) {
    const app = this._create(container)
    const port = this.appConfig.port
    await kill(port)
    app.listen(port, callback(port))
  }
  _create(container) {
    const app = express()

    app.use(bodyParser.json())
    app.use(cors())
    app.use(scopePerRequest(container))
    //Automatically load all controller routes
    app.use(
      loadControllers(`${resolve('src')}/**/*.controller.js`, {
        cwd: __dirname,
      })
    )

    return app
  }
}

module.exports = App
