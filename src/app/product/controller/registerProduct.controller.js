@route('/api/products')
export default class productRegisterController {
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
