const {
  asClass,
  createContainer,
  InjectionMode,
  asValue,
  Lifetime,
} = require('awilix')
const awilix = require('awilix')
const AppConfig = require('./app.config.js')
const App = require('./app.js')
const apiDb = require('./common/persistence/sequilize/apiDb.js')
const { resolve } = require('path')
class Bootstrap {
  constructor() {}

  async init() {
    this.instance = await this._createContainer()
    return this
  }

  async run(callback) {
    const app = this.instance.resolve('app')
    await app.start(this.instance, callback)
  }

  async _createContainer() {
    const container = createContainer({ injectionMode: InjectionMode.CLASSIC })
    await apiDb.sync({ alter: true })
    container.register({
      app: asClass(App).singleton(),
      appConfig: asClass(AppConfig).singleton(),
      apiDb: asValue(apiDb),
    })
    //Register all services and repositories injectables automatically, thanks to global patterns
    container.loadModules(
      [
        `${resolve('src')}/**/*.service.js`,
        `${resolve('src')}/**/*.repository.js`,
      ],
      {
        formatName: 'camelCase',
        resolverOptions: {
          lifetime: Lifetime.SINGLETON,
          register: awilix.asClass,
        },
      }
    )

    return container
  }
}
async function newAsyncBootstrap() {
  return await new Bootstrap().init()
}
module.exports = newAsyncBootstrap
