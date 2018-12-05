const AppRoutes = require('./routes')
const Server = require('./server')

const server = new Server(AppRoutes)
module.exports = server.start()
  .then(() => {
    console.log('Api Running')
  })
  .catch(console.log)
