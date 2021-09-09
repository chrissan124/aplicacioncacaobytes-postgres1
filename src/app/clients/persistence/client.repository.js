const SequelizeRepo = require('../../common/persistence/sequilize/repositories/sequelizeRepo')
const statuses = require('../../common/persistence/status/statuses')

class ClientRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.Client, apiDb, statuses.IDLE, ['Address'])
  }
  /*async create(client) {
    if (client) {
      const clientInstance = await this.model.create(client)
      if (client.Address) {
        await clientInstance.createAddress(client.Address)
      }
      const status = await this.updateStatus(
        clientInstance.clientId,
        statuses.IDLE
      )
      clientInstance.statusFk = status.statusFk
      return clientInstance
    } else {
      return false
    }
  }*/
  /*async update(client) {
    if (client) {
      const result = await this.model.upsert(client)
      const clientInstance = Array.isArray(result) ? result[0] : result
      if (client.Address) {
        this.apiDb.models.Address.upsert(client.Address)
      }
      return clientInstance
    } else {
      return false
    }
  }*/
}

module.exports = ClientRepository
