const findId = require('../idFinder')
const Repo = require('../repo')
const statuses = require('../status/statuses')
const findAssociations = require('./findAssociations')
const prepareQuery = require('./prepareQuery')

class SequelizeRepo extends Repo {
  constructor(model, apiDb, baseStatus = false) {
    super()
    if (model && apiDb) {
      this.model = model
      this.apiDb = apiDb
      this.primaryKey = findId(this.model.primaryKeys)
      this.baseStatus = baseStatus

      let associations = Object.keys(model.associations)
      associations = associations.filter((value) => {
        return value !== 'Status'
      })
      this.associations = associations
    } else {
      throw new Error(`Model can't be undefined!`)
    }
  }

  async getAll(
    options = {
      include: [],
      limit: 100,
      offset: 0,
      conditions: {},
      deleted: true,
      order: [],
      attr,
      excl,
    }
  ) {
    const ops = prepareQuery(options)
    const associations = findAssociations(this.model, options.include)
    const items = await this.model.findAll({
      include: associations,
      limit: ops.limit,
      offset: ops.offset,
      attributes: {
        include: ops.attributes,
        exclude: ops.exclude,
      },
      where: ops.conditions,
      paranoid: !ops.deleted,
      order: ops.order,
    })
    return items
  }

  async getById(id, ops = { include: [], paranoid: true }) {
    const associations = findAssociations(this.model, ops.include)
    const item = this.model.findByPk(id, {
      include: associations,
      paranoid: ops.paranoid,
    })
    return item
  }

  async create(item) {
    if (item) {
      const itemInstance = await this.model.create(item)
      this.setUpAssociations(itemInstance, item)
      if (this.baseStatus && !itemInstance.statusFk) {
        await this.updateStatus(itemInstance[this.primaryKey], this.baseStatus)
      }
      return itemInstance
    } else {
      return false
    }
  }

  async createList(items = []) {
    const result = []
    for (const item of items) {
      const instance = await this.create(item)
      if (instance) result.push(instance.dataValues)
    }
    return result
  }

  async update(item) {
    if (item) {
      const result = await this.model.update(item, {
        where: { [this.primaryKey]: item[this.primaryKey] },
        returning: true,
      })
      const itemInstance = Array.isArray(result) ? result[1] : false
      this.setUpAssociations(itemInstance, item)
      return Array.isArray(itemInstance) ? itemInstance[0] : itemInstance
    }
    return false
  }

  async remove(id) {
    if (id) {
      const result = await this.model.destroy({
        where: {
          [this.primaryKey]: id,
        },
      })
      if (result && this.baseStatus) {
        await this.updateStatus(id, statuses.DELETED)
      }
      return result
    }
    return false
  }

  async restore(id) {
    if (id) {
      const result = await this.model.restore({
        where: {
          [this.primaryKey]: id,
        },
      })
      if (result && this.baseStatus) {
        await this.updateStatus(id, this.baseStatus)
      }
      return result
    }
    return false
  }

  async doOperation(options = { operation: '', attribute, conditions: {} }) {
    const operation = options.operation.toLowerCase()
    if (['max', 'min', 'sum', 'count'].includes(operation)) {
      if (operation === 'count')
        return await this.model[operation]({ where: options.conditions })
      return await this.model[operation](options.attribute, {
        where: options.conditions,
      })
    }
    return false
  }

  async updateStatus(id, statusName, updateKey, conditions = {}) {
    if (this.baseStatus) {
      const status = await this.findStatus(statusName)
      if (status) {
        const result = await this.model.update(
          { statusFk: status.statusId },
          {
            where: {
              [updateKey ? updateKey : this.primaryKey]: id,
              ...conditions,
            },
            paranoid: false,
            returning: true,
          }
        )
        return Array.isArray(result) ? result[1] : false
      }
    }
    return false
  }

  async findStatus(name) {
    const status = await this.apiDb.models.Status.findOne({
      where: {
        name: name,
      },
    })
    return status
  }

  async getStatus(id) {
    if (this.baseStatus) {
      const entity = await this.getById(id, {
        include: ['Status'],
        paranoid: false,
      })
      return entity ? entity.Status?.dataValues : false
    }
    return false
  }
  setUpAssociations(itemInstance, item) {
    //Setup associations if provided
    itemInstance &&
      this.associations.forEach(async (assoc) => {
        const associationData = item[assoc]
        const associationModel = this.apiDb.models[assoc]

        if (associationData && associationModel) {
          const idName = findId(associationModel.primaryKeys)
          const associationId = associationData[idName]
          //If association id is provided, it means it already exists, otherwise create new association
          if (associationId) {
            ;(await associationModel.update(associationData, {
              where: { [idName]: associationId },
            })) &&
              (await this.model.update(
                {
                  [assoc.charAt(0).toLowerCase() + assoc.slice(1) + 'Fk']:
                    associationId,
                },
                { where: { [this.primaryKey]: item[this.primaryKey] } }
              ))
          } else await itemInstance[`create${assoc}`](associationData)
        }
      })
  }
}

module.exports = SequelizeRepo
