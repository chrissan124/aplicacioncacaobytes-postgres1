const SequelizeRepo = require('../../common/persistence/sequilize/sequelizeRepo')
const statuses = require('../../common/persistence/status/statuses')

module.exports = class InvoiceRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.Invoice, apiDb, statuses.DRAFT)
  }
}
