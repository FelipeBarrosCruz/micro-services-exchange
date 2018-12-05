const Hapi = require('hapi')
const Plugins = require('./plugins')

module.exports = class Server {
  constructor (routes, serverOptions = {}) {
    const options = Object.assign(serverOptions, {
      port: process.env.APP_PORT
    })

    this.instance = new Hapi.Server(options)
    this.routes = routes
    this.plugins = new Plugins(this.instance)
  }

  async _registerRoutes () {
    this.instance.route(this.routes)
  }

  async _registerPlugins () {
    await this.plugins.Hemera.register()
    await this.plugins.Swagger.register()
  }

  async start () {
    await this._registerPlugins()
    await this._registerRoutes()
    await this.instance.start()
  }
}
