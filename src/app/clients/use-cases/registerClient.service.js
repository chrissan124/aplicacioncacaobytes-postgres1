const addressEntity = require('../../address/domain/addressEntity')
const clientEntity = require('../domain/clientEntity')

class registerClientService {
  constructor(clientRepository) {
    this.clientRepository = clientRepository
  }
  async registerClient(client) {
    clientEntity(client)
    if (client.Address) addressEntity(client.Address)
    return await this.clientRepository.create(client)
  }
}

module.exports = registerClientService
