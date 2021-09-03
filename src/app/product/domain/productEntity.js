const betweenValidator = require('../../common/domain/betweenValidator')

module.exports = function productEntity({
	name,
	productId,
	creationDate = new Date(),
}) {
	betweenValidator.stringBetween(name, 2, 100, 'product')
	return Object.freeze({
		name,
		productId,
		creationDate,
	})
}
