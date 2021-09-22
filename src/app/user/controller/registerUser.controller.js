const { createController } = require('awilix-router-core')

const registerControllers = (registerUserService) => ({
  registerUser: async (req, res, next) => {
    try {
      const result = await registerUserService.registerUser(req.body)
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(registerControllers)
  .prefix('/users')
  .post('', 'registerUser')
