import { asClass, createContainer, InjectionMode } from 'awilix';
import AppConfig from '../../app.config.js';
import App from './app.js';
import ProductRepository from './product/persistence/products.repository.js';
import registerProductService from './product/use-cases/registerProduct.service.js';

export default class Bootstrap {
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
      registerProductService: asClass(registerProductService).singleton(),
      productRepository: asClass(ProductRepository).singleton(),
    });
    return container;
  }
}
