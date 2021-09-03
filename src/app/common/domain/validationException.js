class ValidationException {
  constructor(message, name) {
    this.message = message
    this.name = name ? name : 'ValidationException'
  }
}
ValidationException.prototype.toString = function () {
  return `${this.name}: "${this.message}"`
}

module.exports = ValidationException
