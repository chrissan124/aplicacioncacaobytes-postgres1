const repo = require('../repo')
const prepareConditions = require('./prepareConditions')

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
    if (!this.collection) {
      throw new Error(`collection [${collection}] couldn't be found`)
    }
  }

  async getAll(options = { attr: '', conditions: {} }) {
    const items = await this.collection
      .find(options.conditions, options.attr)
      .exec()
    return items
  }

  async getById(id, options = { attr: '' }) {
    return await this.collection.findById(id, options.attr)
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

  async remove(id) {
    return await this.collection.deleteOne({ _id: id })
  }

  async removeMany(conditions = {}) {
    conditions = prepareConditions(conditions)
    const deleted = await this.collection.deleteMany(conditions)
    return deleted.deletedCount
  }
  async update(item) {
    return await this.collection
      .findOneAndUpdateOne({ _id: item.id }, item, { new: true })
      .exec()
  }
}
