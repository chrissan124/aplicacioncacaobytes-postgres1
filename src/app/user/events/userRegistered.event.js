const trycatchevent = require('../../common/events/trycatchevent')

function registerEvent(bus, container) {
  const event = 'userRegistered'
  const ctx = 'setupUserService'
  const context = container.resolve(ctx)
  bus.register(event, (user) => {
    trycatchevent(() => {
      context.setupUser(user)
    })
  })
}
module.exports = registerEvent
