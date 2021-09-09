module.exports = class GetClientsService {
  constructor(clientRepository) {
    this.clientRepository = clientRepository
  }

  async getClients(paging = {}) {
    return await this.clientRepository.getAll({
      include: ['Address', 'Status'],
      ...paging,
    })
  }
}
