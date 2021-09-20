const { glob } = require('glob')
const { resolve } = require('path')
const eventBus = require('js-event-bus')()

/*
  Event bus for chaining actions without coupling directly 
*/
function createBus(container) {
  const bus = {
    emit: (event = '', ...args) => {
      eventBus.emit(event, null, ...args)
    },
    register: (event = '', callback = () => {}) => {
      eventBus.on(event, callback)
    },
  }
  glob.sync(`${resolve('src')}/**/*.event.js`).forEach((file) => {
    const fileFunction = require(file)
    fileFunction(bus, container)
  })
  return bus
}

module.exports = createBus
