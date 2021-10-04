const { createController } = require('awilix-express')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')
const UpdateError = require('../../common/controllers/error-handling/updateError')

const ValidationException = require('../../common/domain/validationException')

const API = (
  registerProductService,
  getAllProductsService,
) => ({
  registerProduct: (req, res, next) => {
    registerProductService
      .registerProduct(req.body)
      .then((result) => {
        res.send(result)
      })
      .catch((err) => {
        next(err)
      })
  },
  getAllProducts: (req, res, next) => {
    getAllProductsService
      .getAllProducts(req.query)
      .then((result) => {
        //res.send(result)
        //next(result)
        next(result)
      })
      .catch((err) => {
        next(err)
      })
  },
  getProduct: (req, res, next) => {
    const id = req.params.id
    getAllProductsService
      .getProduct(id)
      .then((result) => {
        if (result) {
          res.status(200).send(result)
        } else {
          next(new NotFoundError(`Product ${id}`))
        }
      })
      .catch((err) => {
        next(err)
      })
  },
})

module.exports = createController(API)
  .prefix('/products')
  .post('', 'registerProduct')
  .get('', 'getAllProducts')
  .get('/:id', 'getProduct')
