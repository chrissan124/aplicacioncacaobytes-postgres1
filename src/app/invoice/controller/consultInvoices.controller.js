const { createController } = require('awilix-router-core')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')

const consultControllers = (getInvoicesService) => ({
  getInvoices: async (req, res, next) => {
    try {
      const result = await getInvoicesService.getInvoices(
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
  .prefix('/contracts/:contractId/invoices')
  .get('', 'getInvoices')
