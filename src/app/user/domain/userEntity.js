const betweenValidator = require('../../common/domain/betweenValidator')
const validateEmail = require('../../common/domain/email')
const validateId = require('../../common/domain/idValidator')

const validatePhone = require('../../common/domain/phone')

module.exports = function userEntity(
  { firstName, lastName, email, phone, userId, roleId, password, statusId },
  update = false
) {
  ;(update && !phone) || validatePhone(phone)
  ;(update && !email) || validateEmail(email)
  ;(update && !firstName) ||
    betweenValidator.stringBetween(firstName, 2, 50, 'first name')
  ;(update && !lastName) ||
    betweenValidator.stringBetween(lastName, 2, 50, 'last name')
  update && validateId(userId)

  return Object.freeze({
    firstName,
    lastName,
    email,
    phone,
    userId,
    statusId,
    roleId,
    password,
  })
}
