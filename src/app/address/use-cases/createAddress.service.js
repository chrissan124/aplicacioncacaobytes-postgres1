const addressEntity = require('../domain/addressEntity')
class createAddressService {
  constructor(addressRepository) {
    this.addressRepository = addressRepository
  }
  async createAddress(address) {
    addressEntity(address)
    return await this.addressRepository.create(address)
  }
}
module.exports = createAddressService
