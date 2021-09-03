const { createController } = require('awilix-express')

const API = (registerProductService, getAllProductsService) => ({
  registerProduct: async (req, res) => {
    return await registerProductService
      .registerProduct(req.body)
      .then((result) => {
        res.send(result)
      })
  },
  getAllProducts: async (req, res) => {
    return await getAllProductsService.getAllProducts().then((result) => {
      res.send(result)
    })
  },
  updateProduct: async (req, res) => {
    if (req.params.id) {
    }
  },
})

module.exports = createController(API)
  .prefix('/api/products')
  .post('', 'registerProduct')
  .get('', 'getAllProducts')
  .put('/:id', 'updateProduct')
