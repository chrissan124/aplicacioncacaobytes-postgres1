const SequelizeRepo = require('../../common/persistence/sequilize/sequelizeRepo')

module.exports = class fileReceiptRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.FileReceipt, apiDb)
  }
}
