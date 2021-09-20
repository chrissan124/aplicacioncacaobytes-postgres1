function registerEvent(bus, container) {
  const event = 'fileReceiptCreated'
  const ctx = 'createFileMetaService'
  const context = container.resolve(ctx)
  bus.register(event, (file) => {
    context.createFileMeta(file)
  })
}
module.exports = registerEvent
