const HapiHemera = require('hapi-hemera')
const HemeraJoi = require('hemera-joi')
const Config = require('./config.json')

module.exports = class HemeraPlugin {
  /**
   * @description HemeraPlugin constructor
   * @param {Hapi.Server} instance
   */
  constructor (instance) {
    this._instance = instance
    this._plugins = [
      HemeraJoi
    ]
  }

  /**
   * @description Register Plugin
   * @param {object} options should contain the hemera options
   * @param {Array} plugins should contain an array with Hemera Plugin items
   */
  async register (options = {}, plugins = []) {
    const hemeraOptions = Object.assign(options, Config)
    const pluginOptions = plugins.concat(this._plugins)

    await this._instance.register({
      plugin: HapiHemera,
      options: {
        hemera: hemeraOptions,
        nats: process.env.NATS_URI,
        plugins: pluginOptions
      }
    })
  }
}
