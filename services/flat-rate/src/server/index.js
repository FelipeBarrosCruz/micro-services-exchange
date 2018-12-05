const { merge } = require('lodash') 
const Hemera = require('nats-hemera')
const HemeraJoi = require('hemera-joi')
const HemeraStats = require('hemera-stats')

    
module.exports = (connection, serverOptions = {}) => {
  const options = merge({
    name: `svc-${process.env.SERVICE_NAME}`,
    logLevel: process.env.LOG_LEVEL || 'info',
    timeout: process.env.TIMEOUT || 9000
  }, serverOptions)

  const Server = new Hemera(connection, options)
  Server.use(HemeraJoi)
  Server.use(HemeraStats)

  return Server
}
