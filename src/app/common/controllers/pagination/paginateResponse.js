const dotenv = require('dotenv')
dotenv.config()
const paginateResponse = (req, res, data = []) => {
  let { page, size } = req.query
  page = parseInt(page || 0)
  size = parseInt(size || 10)
  const totalCount = data.length
  const lastPage = Math.floor(totalCount / size)
  const nextPage = page < lastPage ? page + 1 : null
  if (nextPage) {
    res.set(
      'Link',
      process.env.DM_API_ROOT +
        req.path.substring(1) +
        `?page=${nextPage}&size=${size}`
    )
  }
  res.set('X-Total-Count', totalCount)
  res.send(data)
}

module.exports = paginateResponse
