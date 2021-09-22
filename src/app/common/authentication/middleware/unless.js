/* exclude paths from middleware */

const unless = (middleware, ...paths) => {
  return function (req, res, next) {
    const pathCheck = paths.some((path) => path === req.path)
    pathCheck ? next() : middleware(req, res, next)
  }
}

module.exports = unless
