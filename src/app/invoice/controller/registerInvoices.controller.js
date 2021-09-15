const { createController } = require('awilix-router-core')

const registerControllers = (createInvoiceService, updateInvoiceService) => ({
  createInvoices: async (req, res, next) => {
    try {
      const result = await createInvoiceService.createInvoice(
        req.body,
        req.params.contractId
      )
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
  updateInvoices: async (req, res, next) => {
    try {
      const result = await updateInvoiceService.updateInvoice(
        req.body,
        req.params.contractId
      )
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(registerControllers)
  .prefix('/api/contracts/:contractId/invoices')
  .post('', 'createInvoices')
  .put('', 'updateInvoices')
