const { createController } = require('awilix-router-core')
const upload = require('../../files/config/files.config')

const registerControllers = (setReceiptService) => ({
  createReceipt: async (req, res, next) => {
    try {
      const result = await setReceiptService.setReceipt(
        { ...req.body, ...req.file },
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
  .post('', 'createReceipt')
  .before(upload.single('receipt'))
