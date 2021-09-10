const paginateRequest = (req) => {
  //Set pagination
  const { size, page, deleted } = req.query
  const limit = size ? +size : 20
  const offset = page ? page * limit : 0

  const conditions = setConditions(req)

  const sort = setSort(req)

  return {
    limit,
    offset,
    deleted: deleted === 'true',
    conditions,
    order: sort,
  }
}

function setConditions(req) {
  //Set filter conditions
  const conditions = {}
  const notConditions = ['page', 'size', 'deleted', 'sort']
  for (let [key, value] of Object.entries(req.query)) {
    if (!notConditions.includes(key)) {
      const values =
        typeof value === 'string' ? value.replace('-', ' ').split(',') : value

      conditions[key] = values
    }
  }
  return conditions
}
/*
  order query structure:
  sort=<attribute>:<sort direction>

  sort directions: 
    -a:ascendent
    -d:descendent
    -nf:nulls first
    -nl:nulls last

*/
function setSort(req) {
  const { sort } = req.query
  const sortSet = []
  if (typeof sort === 'string') {
    const sortParams = sort.split(',')
    sortParams.forEach((param) => {
      let [attr, dir] = param.split(':')
      switch (dir) {
        case 'a':
          dir = 'ASC'
          break
        case 'd':
          dir = 'DESC'
          break
        case 'nf':
          dir = 'NULLS FIRST'
          break
        case 'nl':
          dir = 'NULLS LAST'
          break
        default:
          dir = 'ASC'
      }
      sortSet.push([attr, dir])
    })
  }
  return sortSet
}

module.exports = paginateRequest
