module.exports = class GetClientsService {
  constructor(clientRepository) {
    this.clientRepository = clientRepository
  }

  async getClients(options = {}) {
    return await this.clientRepository.getAll({
      include: ['Address', 'Status'],
      ...options,
    })
  }
}
