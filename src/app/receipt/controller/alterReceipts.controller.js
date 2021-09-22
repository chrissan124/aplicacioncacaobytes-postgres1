const { createController } = require('awilix-router-core')

const registerControllers = (updateReceiptService) => ({
  updateReceipt: async (req, res, next) => {
    try {
      const result = await updateReceiptService.updateReceipt(
        { ...req.body, receiptId: req.params.receiptId },
        req.params.invoiceId
      )
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(registerControllers)
  .prefix('/contracts/:contractId/invoices/:invoiceId/receipts')
  .put('/:receiptId', 'updateReceipt')
