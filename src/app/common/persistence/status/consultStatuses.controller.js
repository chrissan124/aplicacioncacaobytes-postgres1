const { createController } = require('awilix-router-core')

const consultControllers = (getStatusesService) => ({
  getStatuses: async (req, res, next) => {
    try {
      const result = await getStatusesService.getStatuses()
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/statuses')
  .get('', 'getStatuses')
