const findId = require('../idFinder')
const Repo = require('../repo')
const findAssociations = require('./findAssociations')

class SequilizeRepository extends Repo {
  constructor(model, apiDb) {
    super()
    if (model) {
      this.model = model
      this.apiDb = apiDb
      this.primaryKey = findId(this.model.primaryKeys)
    } else {
      throw new Error(`Model can't be undefined!`)
    }
  }

  async getAll(ops = { include: [], limit, offset, conditions: {} }) {
    const associations = findAssociations(this.model, ops.include)
    const items = await this.model.findAll({
      include: associations,
      limit: ops.limit,
      offset: ops.offset,
      where: ops.conditions,
    })
    return items
  }
  async getById(id, ops = { include: [] }) {
    const associations = findAssociations(this.model, ops.include)
    const item = this.model.findByPk(id, {
      include: associations,
    })
    return item
  }
  async create(item) {
    if (item) {
      return await this.model.create(item)
    } else {
      return false
    }
  }
  async update(item) {
    if (item) {
      const result = await this.model.upsert(item)
      const res = Array.isArray(result) ? result[0] : result
      return res
    }
    return false
  }
  async remove(id) {
    if (id) {
      return await this.model.destroy({
        where: {
          [this.primaryKey]: id,
        },
      })
    }
    return false
  }
}

module.exports = SequilizeRepository
