const { stringBetween } = require('./betweenValidator')

function validateId(id) {
  stringBetween(id, 1, Infinity, 'id')
}

module.exports = validateId
