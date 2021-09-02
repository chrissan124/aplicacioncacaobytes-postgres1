/*import { POST, route } from 'awilix-express';

@route('/api/products')
class productsController {
  constructor(registerProductService) {
    this.registerService = registerProductService;
  }

  @POST()
  async register(req, res, _next) {
    try {
      const result = await this.registerService
        .registerProduct(req.body)
        .json(result);
      return res.status(200);
    } catch (error) {
      return res.status(400);
    }
  }
}

export default productsController;
*/

import { createController } from 'awilix-express';

function API({ registerProductService }) {
  return {
    registerProduct: (req, res) => {
      return registerProductService.registerProduct(req.body).then((result) => {
        res.send(result);
      });
    },
  };
}

export default createController(API)
  .prefix('/api/products')
  .post('', 'registerProduct');
