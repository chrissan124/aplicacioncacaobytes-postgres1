const newAsyncBootstrap = require('./app/bootstrap.js')

newAsyncBootstrap().then((bootstrap) => {
  bootstrap.run((port) =>
    console.log(`Server started and running on port ${port}`)
  )
})
