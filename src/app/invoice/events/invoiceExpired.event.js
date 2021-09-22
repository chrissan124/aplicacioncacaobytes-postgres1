const logger = require('../../common/controllers/logger/logger')
function registerEvent(bus, container) {
  const event = 'invoiceExpired'
  const ctx = 'sendStartInvoiceService'
  const context = container.resolve(ctx)
  bus.register(event, (invoice) => {
    context
      .sendStartInvoice(invoice, true)
      .then((result) => {})
      .catch((error) => {
        logger.error(`error at sending invoice email [${error.message}]`)
      })
  })
}
module.exports = registerEvent
