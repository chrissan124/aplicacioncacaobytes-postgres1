const mongoRepo = require('../../persistence/mongo/mongoRepo')

module.exports = class tokenRepository extends mongoRepo {
  constructor(nosqlDb) {
    super(nosqlDb, 'tokens')
  }
}
