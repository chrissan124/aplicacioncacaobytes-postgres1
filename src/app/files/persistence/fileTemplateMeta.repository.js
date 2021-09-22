const mongoRepo = require('../../common/persistence/mongo/mongoRepo')

module.exports = class fileTemplateMetaRepository extends mongoRepo {
  constructor(nosqlDb) {
    super(nosqlDb, 'file_templates')
  }
}
