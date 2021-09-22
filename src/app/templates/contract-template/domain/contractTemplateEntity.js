const betweenValidator = require('../../../common/domain/betweenValidator')
const validateId = require('../../../common/domain/idValidator')
const ValidationException = require('../../../common/domain/validationException')

const scheduleTypes = ['D', 'W', 'M', 'Y']
module.exports = function contractTemplateEntity(
  {
    name,
    paymentSchedule = 1,
    scheduleType = 'M',
    specificPayments = false,
    description,
    templateId,
    statusFk,
    categoryFk,
  },
  update = false
) {
  ;(update && !name) ||
    betweenValidator.stringBetween(name, 2, 100, 'template name')

  if (!scheduleTypes.includes(scheduleType))
    throw new ValidationException(
      `${scheduleType} is not a valid schedule type (D, W, M, Y)`
    )
  !description ||
    betweenValidator.stringBetween(description, 2, 100, 'template description')

  !paymentSchedule ||
    betweenValidator.numberBetween(
      paymentSchedule,
      1,
      Infinity,
      'number of payments'
    )

  update && validateId(templateId)
  return Object.freeze({
    name,
    templateId,
    scheduleType,
    specificPayments,
    description,
    statusFk,
    categoryFk,
  })
}
