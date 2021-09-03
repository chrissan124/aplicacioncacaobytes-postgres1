const findId = require('../idFinder')
const Repo = require('../repo')

class SequilizeRepository extends Repo {
  constructor(model) {
    super()
    this.model = model
    this.primaryKey = findId(this.model.primaryKeys)
  }

  async getAll() {
    const items = await this.model.findAll()
    return items
  }
  async getById(id) {
    const item = this.model.findByPk(id)
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
      await this.model.update(item, {
        where: {
          [this.primaryKey]: item[this.primaryKey],
        },
      })
    }
  }
}

module.exports = SequilizeRepository
