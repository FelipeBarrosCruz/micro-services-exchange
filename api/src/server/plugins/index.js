const Hemera = require('./hemera')
const Swagger = require('./swagger')

module.exports = class Plugins {
  constructor(instance) {
    this._instance = instance
  }

  get Hemera () {
    return new Hemera(this._instance)
  }

  get Swagger () {
    return new Swagger(this._instance)
  }
}
