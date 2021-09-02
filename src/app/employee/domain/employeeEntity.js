const betweenValidator = require('../../common/domain/betweenValidator');
const validateEmail = require('../../common/domain/email');
const {
  validateLegalIdentifier,
} = require('../../common/domain/legalIdentifier');
const validatePhone = require('../../common/domain/phone');

module.exports = function employeeEntity({
  legalIdentifier,
  firstName,
  secondName,
  lastName,
  secondLastName,
  email,
  phone,
  employId,
  addressId,
  statusId,
}) {
  validateLegalIdentifier(legalIdentifier);
  validatePhone(phone);
  validateEmail(email);
  betweenValidator.stringBetween(firstName, 2, 50, 'name');
  betweenValidator.stringBetween(lastName, 2, 50, 'name');

  return Object.freeze({
    legalIdentifier,
    firstName,
    secondName,
    lastName,
    secondLastName,
    email,
    phone,
    employId,
    addressId,
    statusId,
  });
};
