const validateExp = require('./regexValidator.js')
function validateLegalIdentifier(identifier) {
  return validateExp(
    /^([a-z|A-Z]{1})?[-. ]?(\w{5,50})$/,
    identifier,
    'legal identifier'
  )
}
module.exports = validateLegalIdentifier
