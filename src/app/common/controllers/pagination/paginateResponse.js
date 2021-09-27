const dotenv = require('dotenv')
dotenv.config()

function paginateResponse(data, req, res, next) {
  if (data.rows && data.count >= 0) {
    let { page, size } = req.query
    page = parseInt(page || 0)
    size = !page && !size ? undefined : parseInt(size || 20)
    const totalCount = data.count
    const lastPage = !size ? 0 : Math.floor(totalCount / size)
    const nextPage = page < lastPage ? page + 1 : null
    if (nextPage) {
      res.set(
        'Link',
        process.env.API_ROOT +
          req.path.substring(1) +
          `?page=${nextPage}&size=${size}`
      )
    }
    res.set('Last-Page', lastPage)
    res.set('X-Total-Count', totalCount)
    res.send(data.rows)
  } else {
    next(data)
  }
}

module.exports = paginateResponse
