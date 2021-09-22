const { createController } = require('awilix-router-core')

const loginController = (loginUserService, logoutUserService) => ({
  loginUser: async (req, res, next) => {
    try {
      const result = await loginUserService.loginUser(req.body)
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
  logoutUser: async (req, res, next) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]
        const result = await logoutUserService.logoutUser(token)
        res.send('ok')
      } else {
        res.status(403).end()
      }
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(loginController)
  .prefix('/auth')
  .all('/access', 'loginUser')
  .all('/logout', 'logoutUser')
