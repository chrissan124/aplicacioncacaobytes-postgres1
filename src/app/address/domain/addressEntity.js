const betweenValidator = require('../../common/domain/betweenValidator')
const validateId = require('../../common/domain/idValidator')

module.exports = function addressEntity(
  { primaryLine, secondaryLine, city, state, country, zipCode, addressId },
  update = false
) {
  ;(update && !primaryLine) ||
    betweenValidator.stringBetween(primaryLine, 2, 200, 'primary line')
  !secondaryLine ||
    betweenValidator.stringBetween(secondaryLine, 2, 200, 'secondary line')
  ;(update && !city) || betweenValidator.stringBetween(city, 2, 100, 'city')
  ;(update && !state) || betweenValidator.stringBetween(state, 2, 100, 'state')
  ;(update && !country) ||
    betweenValidator.stringBetween(country, 2, 100, 'country')
  ;(update && !zipCode) || betweenValidator.stringBetween(zipCode, 4, 5, 'zip')

  update && validateId(addressId)

  return Object.freeze({
    primaryLine,
    secondaryLine,
    city,
    state,
    country,
    zipCode,
    addressId,
  })
}
