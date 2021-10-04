const betweenValidator = require('../../common/domain/betweenValidator')

module.exports = function productEntity(
  { name, productId, creationDate = new Date() },
  update = false
) {
  ;(update && !name) || betweenValidator.stringBetween(name, 2, 100, 'product')
  return Object.freeze({
    name,
    productId,
    creationDate,
  })
}
