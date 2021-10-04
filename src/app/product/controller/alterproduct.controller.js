const { createController } = require('awilix-express')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')
const UpdateError = require('../../common/controllers/error-handling/updateError')

const ValidationException = require('../../common/domain/validationException')

const API = (updateProductService, deleteProductService) => ({
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
  restoreProduct: (req, res, next) => {
    const id = req.params.id
    if (id)
      deleteProductService
        .restoreProduct(id)
        .then((result) => {
          if (result) {
            res.status(200).send(`Succesfully restored product ${id}`)
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
  .prefix('/products')
  .put('/:id', 'updateProduct')
  .delete('/:id', 'deleteProduct')
  .patch('/:id', 'restoreProduct')
