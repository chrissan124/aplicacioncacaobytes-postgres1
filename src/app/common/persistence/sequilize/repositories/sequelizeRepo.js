const findId = require('../../idFinder')
const Repo = require('../../repo')
const statuses = require('../../status/statuses')
const findAssociations = require('../findAssociations')
/*PENDIENTES
-ver si separar lo de estatus en otra clase
-ver cómo hacer update solo de ciertos campos !!CHECK!!
*/
class SequelizeRepo extends Repo {
  constructor(model, apiDb, baseStatus = false, relations = []) {
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
    ops = { include: [], limit, offset, conditions: {}, paranoid: true }
  ) {
    const associations = findAssociations(this.model, ops.include)
    const items = await this.model.findAll({
      include: associations,
      limit: ops.limit,
      offset: ops.offset,
      where: ops.conditions,
      paranoid: ops.paranoid,
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
      if (this.baseStatus) {
        await this.updateStatus(itemInstance[this.primaryKey], this.baseStatus)
      }
      return itemInstance
    } else {
      return false
    }
  }

  async update(item) {
    if (item) {
      const result = await this.model.update(item, {
        where: { [this.primaryKey]: item[this.primaryKey] },
        returning: true,
      })
      const itemInstance = Array.isArray(result) ? result[1] : false
      this.setUpAssociations(itemInstance, item)
      return itemInstance
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

  async updateStatus(id, statusName) {
    if (this.baseStatus) {
      const status = await this.apiDb.models.Status.findOne({
        where: {
          name: statusName,
        },
      })
      if (status) {
        const result = await this.model.update(
          { statusFk: status.statusId },
          { where: { [this.primaryKey]: id }, paranoid: false, returning: true }
        )
        return Array.isArray(result) ? result[1] : false
      }
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
                  [assoc.toLowerCase() + 'Fk']: associationId,
                },
                { where: { [this.primaryKey]: item[this.primaryKey] } }
              ))
          } else await itemInstance[`create${assoc}`](associationData)
        }
      })
  }
}

module.exports = SequelizeRepo
