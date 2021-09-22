const trycatchevent = require('./trycatchevent')

function registerEvent(bus, container) {
  const event = 'receiptReceived'
  const ctx = 'createFileReceiptService'
  const context = container.resolve(ctx)
  bus.register(
    event,
    trycatchevent((receipt) => {
      context.createFileReceipt(receipt.receiptId)
    })
  )
}
module.exports = registerEvent
