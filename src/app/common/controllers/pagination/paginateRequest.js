const paginateRequest = (req) => {
  const { size, page } = req.query
  const limit = size ? +size : 10
  const offset = page ? page * limit : 0
  return { limit, offset }
}

module.exports = paginateRequest
