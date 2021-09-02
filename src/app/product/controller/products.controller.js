const { createController } = require('awilix-express');

const API = (registerProductService) => ({
  registerProduct: async (req, res) => {
    console.log('Injected?', registerProductService);
    return await registerProductService
      .registerProduct(req.body)
      .then((result) => {
        res.send(result);
      });
  },
});

module.exports = createController(API)
  .prefix('/api/products')
  .post('', 'registerProduct');
