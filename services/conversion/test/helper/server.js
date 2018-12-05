const Nats = require('hemera-testsuite/nats')
const Connection = new Nats()
const Server = require('../../src/server')
const Handler = require('../../src/handler')


module.exports = async () => {
  const hemera = Server(Connection, {
    logLevel: 'silent'
  })
  await hemera.ready()
  const handler = new Handler(hemera)
  return { hemera, handler }
}
