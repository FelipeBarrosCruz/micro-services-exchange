const Server = require('./server')
const Handler = require('./handler')
const Connection = require('nats').connect(process.env.NATS_URI)
const SERVICE_TOPIC = { topic: process.env.SERVICE_NAME }

const server = Server(Connection)
server.ready(() => {
  const handler = new Handler(server)
  /**
   * @description Registering rate action
   */
  handler.rate.register(SERVICE_TOPIC)
})
