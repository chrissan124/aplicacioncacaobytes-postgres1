const { createController } = require('awilix-router-core')

const loginController = (
  loginUserService,
  logoutUserService,
  getAuthUserService,
  updateUserService
) => ({
  loginUser: async (req, res, next) => {
    try {
      const result = await loginUserService.loginUser(req.body)
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const result = await updateUserService.updateUser({
        ...req.body,
        userId: req._user,
      })
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
  getUser: async (req, res, next) => {
    try {
      const userId = req._user
      const result = await getAuthUserService.getAuthUser(userId)
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
  .get('/me', 'getUser')
  .put('/me', 'updateUser')
