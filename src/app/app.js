import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { loadControllers, scopePerRequest } from 'awilix-express';
import { resolve } from 'path';
export default class App {
  constructor(appConfig) {
    this.appConfig = appConfig;
  }

  start(container, callback) {
    const app = this._create(container);
    const port = this.appConfig.port;

    app.listen(port, callback(port));
  }
  _create(container) {
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());
    app.use(scopePerRequest(container));

    app.use(
      loadControllers(`${resolve('src')}/**/*.controller.js`, {
        cwd: import.meta.url,
      })
    );

    return app;
  }
}
