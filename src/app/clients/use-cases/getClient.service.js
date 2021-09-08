module.exports = class GetClientService {
  constructor(clientRepository) {
    this.clientRepository = clientRepository
  }

  async getClient(id) {
    return await this.clientRepository.getById(id, {
      include: ['Address'],
    })
  }
}
