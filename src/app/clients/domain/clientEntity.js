const validateEmail = require('../../common/domain/email.js')
const betweenValidator = require('../../common/domain/betweenValidator.js')
const validatePhone = require('../../common/domain/phone.js')
const validateLegalIdentifier = require('../../common/domain/legalIdentifier.js')
const validateId = require('../../common/domain/idValidator.js')

module.exports = function clientEntity(
  { name, legalIdentifier, email, phone, clientId, addressId, statusId },
  update = false
) {
  const trimmedName =
    (update && !name) || betweenValidator.stringBetween(name, 2, 100, 'name')
  ;(update && !legalIdentifier) || validateLegalIdentifier(legalIdentifier)
  ;(update && !email) || validateEmail(email)
  ;(update && !phone) || validatePhone(phone)
  update && validateId(clientId)
  return Object.freeze({
    name: trimmedName,
    legalIdentifier,
    email,
    phone,
    clientId,
    addressId,
    statusId,
    isCreated: () => clientId != undefined,
  })
}
