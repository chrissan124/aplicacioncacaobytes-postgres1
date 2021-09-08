const SequilizeRepository = require('../../common/persistence/sequilize/sequelizeRepository')

class ClientRepository extends SequilizeRepository {
  constructor(apiDb) {
    super(apiDb.models.Client, apiDb)
  }
  async create(client) {
    if (client) {
      const clientInstance = await this.model.create(client)
      if (client.address) {
        await clientInstance.createAddress(client.address)
      }
      return clientInstance
    } else {
      return false
    }
  }
  async update(client) {
    if (client) {
      const result = await this.model.upsert(client)
      const clientInstance = Array.isArray(result) ? result[0] : result
      if (client.address && client.address.addressId) {
        this.apiDb.models.Address.upsert(client.address)
      }
      return clientInstance
    } else {
      return false
    }
  }
}

module.exports = ClientRepository
