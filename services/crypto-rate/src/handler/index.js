const Rate = require('./rate')

module.exports = class Handler {
  constructor (instance) {
    this._instance = instance
  }

  get rate () {
    return new Rate(this._instance)
  }
}