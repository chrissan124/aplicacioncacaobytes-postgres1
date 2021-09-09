const SequilizeRepository = require('./sequelizeRepo')

class sequilizeRepoStatus extends SequilizeRepository {
  constructor(model,apiDb){
    super(model,apiDb)
  }
}
