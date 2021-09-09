const addressEntity = require('../../address/domain/addressEntity')
const clientEntity = require('../domain/clientEntity')

class updateClientService {
  constructor(clientRepository) {
    this.clientRepository = clientRepository
  }
  async updateClient(client) {
    clientEntity(client, true)
    if (client.Address) addressEntity(client.Address, true)
    return await this.clientRepository.update(client)
  }
}

module.exports = updateClientService
