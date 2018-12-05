const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const Config = require('./config.json')

module.exports = class SwaggerPlugin {
  /**
   * @description SwaggerPlugin constructor
   * @param {Hapi.Server} instance
   */
  constructor (instance) {
    this._instance = instance
  }

  /**
   * @description Register Plugin
   * @param {object} options should be an object with swagger options
   */
  async register (options = {}) {
    const swaggerOptions = Object.assign(options, Config)

    await this._instance.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    ])
  }
}
