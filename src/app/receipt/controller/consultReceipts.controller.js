const { createController } = require('awilix-router-core')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')
const paginateResponse = require('../../common/controllers/pagination/paginateResponse')

const consultControllers = (getReceiptsService) => ({
  getReceiptContract: async (req, res, next) => {
    try {
      const result = await getReceiptsService.getContractReceipts(
        req.params.contractId,
        req.query
      )
      paginateResponse(req, res, result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/api/contracts/:contractId')
  .get('/receipts', 'getReceiptContract')
