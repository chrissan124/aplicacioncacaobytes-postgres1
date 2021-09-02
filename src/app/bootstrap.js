const {
  asClass,
  createContainer,
  InjectionMode,
  asValue,
  Lifetime,
} = require('awilix');
const awilix = require('awilix');
const AppConfig = require('./app.config.js');
const App = require('./app.js');
const apiDb = require('./common/persistence/apiDb.js');
const { resolve } = require('path');
class Bootstrap {
  constructor() {
    this.instance = this._createContainer();
  }

  run(callback) {
    const app = this.instance.resolve('app');
    app.start(this.instance, callback);
  }

  _createContainer() {
    const container = createContainer({ injectionMode: InjectionMode.CLASSIC });

    container.register({
      app: asClass(App).singleton(),
      appConfig: asClass(AppConfig).singleton(),
      apiDb: asValue(apiDb),
    });

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
    );

    return container;
  }
}
module.exports = Bootstrap;
