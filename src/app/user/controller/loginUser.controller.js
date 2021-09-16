const { createController } = require('awilix-router-core')

const loginController = (loginUserService) => ({
  loginUser: async (req, res, next) => {
    try {
      const result = await loginUserService.loginUser(req.body)
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(loginController)
  .prefix('/api/auth/access')
  .all('', 'loginUser')
