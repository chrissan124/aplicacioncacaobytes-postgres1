module.exports = class RemoveClientService {
  constructor(clientRepository) {
    this.clientRepository = clientRepository
  }

  async removeClient(id) {
    if (id) return await this.clientRepository.remove(id)
  }
}
