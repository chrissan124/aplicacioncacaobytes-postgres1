const { createController } = require('awilix-router-core')

const registerControllers = (setReceiptService, updateReceiptService) => ({
  createReceipt: async (req, res, next) => {
    try {
      const result = await setReceiptService.setReceipt(
        req.body,
        req.params.invoiceId
      )
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
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
  .prefix('/api/contracts/:contractId/invoices/:invoiceId/receipts')
  .post('', 'createReceipt')
  .put('/:receiptId', 'updateReceipt')
