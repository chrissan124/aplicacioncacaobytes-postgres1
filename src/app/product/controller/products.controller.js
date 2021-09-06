const { createController } = require('awilix-express')

const API = (registerProductService, getAllProductsService) => ({
  registerProduct: async (req, res, next) => {
    return await registerProductService
      .registerProduct(req.body)
      .then((result) => {
        res.send(result)
      })
      .catch((err) => {
        next(err)
      })
  },
  getAllProducts: async (req, res, next) => {
    return await getAllProductsService
      .getAllProducts()
      .then((result) => {
        res.send(result)
      })
      .catch((err) => {
        next(err)
      })
  },
  updateProduct: async (req, res, next) => {
    if (req.params.id === req.body.productId) {
    } else {
    }
  },
})

module.exports = createController(API)
  .prefix('/api/products')
  .post('', 'registerProduct')
  .get('', 'getAllProducts')
  .put('/:id', 'updateProduct')
