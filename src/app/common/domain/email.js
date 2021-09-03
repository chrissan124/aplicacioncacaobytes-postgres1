const validateExp = require('./regexValidator.js')

module.exports = function validateEmail(email) {
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	return validateExp(regex, email, 'email')
}
