const newAsyncBootstrap = require('./app/bootstrap.js')

newAsyncBootstrap()
  .then((bootstrap) => {
    bootstrap.run((port) =>
      console.log(`Server started and running on port ${port}`)
    )
  })
  .catch((err) => {
    console.log(`Error at bootstrapping service [${err.message}]`)
  })
