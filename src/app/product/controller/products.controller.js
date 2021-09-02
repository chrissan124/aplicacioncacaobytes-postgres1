import { POST, route } from 'awilix-express';
@route('/api/products')
export default class productsController {
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
