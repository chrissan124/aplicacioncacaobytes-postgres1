const { createController } = require('awilix-router-core')
const UpdateError = require('../../common/controllers/error-handling/updateError')

const addressEndpoints = (createAddressService, updateAddressService) => ({
  createAddress: (req, res, next) => {
    createAddressService
      .createAddress(req.body)
      .then((result) => res.send(result))
      .catch((err) => next(err))
  },
  updateAddress: (req, res, next) => {
    const id = parseInt(req.params.id)
    if (id === req.body.addressId)
      updateAddressService
        .updateAddress(req.body)
        .then((result) => res.send(result))
        .catch((err) => next(err))
    else next(new UpdateError(id, req.body.addressId))
  },
})

module.exports = createController(addressEndpoints)
  .prefix('/api/address')
  .post('', 'createAddress')
  .put('/:id', 'updateAddress')
