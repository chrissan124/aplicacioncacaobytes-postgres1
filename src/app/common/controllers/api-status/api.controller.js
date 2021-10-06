const { createController } = require('awilix-router-core')

const consultControllers = () => ({
  getStatus: async (req, res, next) => {
    try {
      res.send({ message: 'Admin API active', status: 200, date: new Date() })
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/api-status')
  .get('', 'getStatus')
