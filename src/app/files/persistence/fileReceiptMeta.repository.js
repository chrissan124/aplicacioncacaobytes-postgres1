const mongoRepo = require('../../common/persistence/mongo/mongoRepo')

module.exports = class fileReceiptMetaRepository extends mongoRepo {
  constructor(nosqlDb) {
    super(nosqlDb, 'file_receipts')
  }
}
