const validateEmail = require('../../common/domain/email.js')
const betweenValidator = require('../../common/domain/betweenValidator.js')
const validatePhone = require('../../common/domain/phone.js')
const {
	validateLegalIdentifier,
} = require('../../common/domain/legalIdentifier.js')

module.exports = function clientEntity({
	name,
	legalIdentifier,
	email,
	phone,
	clientId,
	addressId,
	statusId,
}) {
	const trimmedName = betweenValidator.stringBetween(name, 2, 100, 'name')
	validateLegalIdentifier(legalIdentifier)
	validateEmail(email)
	validatePhone(phone)

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
