const verifyToken = require('../use-cases/verifyToken.service')
const logger = require('../../controllers/logger/logger')

function validateToken(verifyUserService, checkBlackListService) {
  return async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        logger.error(`request without authorization`)
        return res.status(403).end()
      }
      const token = req.headers.authorization.split(' ')[1]
      const payload = new verifyToken().verifyToken(token)
      //verify user and set attributes in request
      await verifyUserService.verifyUser(payload)
      await checkBlackListService.checkBlackList(token)
      req._user = payload.user
      req._role = payload.role
      next()
    } catch (error) {
      next(error)
    }
  }
}
module.exports = validateToken
