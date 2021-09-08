const { createController } = require('awilix-express')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')
const UpdateError = require('../../common/controllers/error-handling/updateError')
const paginateRequest = require('../../common/controllers/pagination/paginateRequest')
const paginateResponse = require('../../common/controllers/pagination/paginateResponse')
const ValidationException = require('../../common/domain/validationException')

const API = (
  registerProductService,
  getAllProductsService,
  updateProductService,
  deleteProductService
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
    const paging = paginateRequest(req)
    getAllProductsService
      .getAllProducts(paging)
      .then((result) => {
        //res.send(result)
        paginateResponse(req, res, result)
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
  updateProduct: (req, res, next) => {
    if (req.params.id === req.body.productId) {
      updateProductService
        .updateProduct(req.body)
        .then((result) => {
          res.send(result)
        })
        .catch((err) => {
          next(err)
        })
    } else {
      next(new UpdateError(req.params.id, req.body.productId))
    }
  },
  deleteProduct: (req, res, next) => {
    const id = req.params.id
    if (id)
      deleteProductService
        .deleteProduct(id)
        .then((result) => {
          if (result) {
            res.status(200).send(`Succesfully deleted product ${id}`)
          } else {
            next(new NotFoundError(`Product ${id}`))
          }
        })
        .catch((err) => {
          next(err)
        })
    else throw new ValidationException('Missing id')
  },
})

module.exports = createController(API)
  .prefix('/api/products')
  .post('', 'registerProduct')
  .get('', 'getAllProducts')
  .get('/:id', 'getProduct')
  .put('/:id', 'updateProduct')
  .delete('/:id', 'deleteProduct')
