const { createController } = require('awilix-router-core')

const registerControllers = (registerClientService) => ({
  registerClient: async (req, res, next) => {
    try {
      const result = await registerClientService.registerClient(req.body)
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(registerControllers)
  .prefix('/api/clients')
  .post('', 'registerClient')
