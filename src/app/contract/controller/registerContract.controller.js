const { createController } = require('awilix-router-core')

const registerControllers = (createContractService) => ({
  createContract: async (req, res, next) => {
    try {
      const { prodId, clientId } = req.params
      const result = await createContractService.createContract(
        clientId,
        prodId,
        req.body
      )
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(registerControllers)
  .prefix('/api/clients/:clientId/contracts/products/:prodId')
  .post('', 'createContract')
