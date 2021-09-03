const ValidationException = require('./validationException')

module.exports = function validateExp(regEx, arg, kind) {
  if (Array.isArray(regEx)) {
    let valid = false
    regEx.forEach((reg) => {
      if (reg.test(arg)) {
        valid = true
        return
      }
    })
    if (valid) return valid
  } else {
    if (regEx && regEx.test(arg)) {
      return true
    }
  }
  throw new ValidationException(
    `${arg} is not a valid ${kind ? kind : 'value'}!`
  )
}
