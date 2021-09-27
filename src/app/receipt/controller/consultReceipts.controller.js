const { createController } = require('awilix-router-core')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')

const consultControllers = (getReceiptsService) => ({
  getReceiptContract: async (req, res, next) => {
    try {
      const result = await getReceiptsService.getContractReceipts(
        req.params.contractId,
        req.query
      )
      next(result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/contracts/:contractId')
  .get('/receipts', 'getReceiptContract')
