const repo = require('../repo')

module.exports = class mongoRepo extends repo {
  constructor(nosqlDb, collection) {
    super()
    if (typeof nosqlDb === 'undefined') {
      throw new Error('MongoDB connection is a required parameter.')
    }

    if (typeof collection === 'undefined') {
      throw new Error('Collection is a required parameter.')
    }
    this.connection = nosqlDb
    this.collection = this.connection.models[collection]
  }

  async getAll(options = { attr: '', conditions: {} }) {
    const items = await this.collection
      .find(options.conditions, options.attr)
      .exec()
    return items
  }

  async getById(id, attr = '') {
    return await this.collection.findById(id, attr)
  }

  async getOne(options = { attr: '', conditions: {} }) {
    return await this.collection
      .findOne(options.conditions, options.attr)
      .exec()
  }

  async create(documents) {
    const result = await this.collection.create(documents)
    return result
  }
}
