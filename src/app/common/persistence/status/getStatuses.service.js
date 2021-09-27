module.exports = class getStatusesService {
  constructor(statusRepository) {
    this.statusRepository = statusRepository
  }

  async getStatuses() {
    const { rows } = await this.statusRepository.getAll({ sort: 'name' })
    const statuses = rows.map((row) => {
      return {
        [row.dataValues?.name]: row.dataValues?.statusId,
      }
    })
    return statuses
  }
}
