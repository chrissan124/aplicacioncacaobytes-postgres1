const addressEntity = require('../domain/addressEntity')
class updateAddressService {
  constructor(addressRepository) {
    this.addressRepository = addressRepository
  }
  async updateAddress(address) {
    addressEntity(address)
    return await this.addressRepository.update(address)
  }
}
module.exports = updateAddressService
