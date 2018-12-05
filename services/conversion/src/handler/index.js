const Convert = require('./convert')

module.exports = class Handler {
  constructor (instance) {
    this._instance = instance
  }

  get convert () {
    return new Convert(this._instance)
  }
}