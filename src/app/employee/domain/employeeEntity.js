const betweenValidator = require('../../common/domain/betweenValidator')
const validateEmail = require('../../common/domain/email')
const validateId = require('../../common/domain/idValidator')
const validateLegalIdentifier = require('../../common/domain/legalIdentifier')

const validatePhone = require('../../common/domain/phone')

module.exports = function employeeEntity(
  {
    legalIdentifier,
    firstName,
    secondName,
    lastName,
    secondLastName,
    email,
    phone,
    employeeId,
    addressId,
    statusId,
  },
  update = false
) {
  ;(update && !legalIdentifier) || validateLegalIdentifier(legalIdentifier)
  ;(update && !phone) || validatePhone(phone)
  ;(update && !email) || validateEmail(email)
  ;(update && !firstName) ||
    betweenValidator.stringBetween(firstName, 2, 50, 'first name')
  ;(update && !lastName) ||
    betweenValidator.stringBetween(lastName, 2, 50, 'last name')
  !secondName ||
    betweenValidator.stringBetween(secondName, 2, 50, 'second name')
  !secondLastName ||
    betweenValidator.stringBetween(secondLastName, 2, 50, 'second last name')

  update && validateId(employeeId)

  return Object.freeze({
    legalIdentifier,
    firstName,
    secondName,
    lastName,
    secondLastName,
    email,
    phone,
    employeeId,
    addressId,
    statusId,
  })
}
