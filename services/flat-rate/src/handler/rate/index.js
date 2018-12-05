const Validate = require('./src/validate')
const Action = require('./src/action')

module.exports = class RateHandler {
  /**
   * @description RateHandler constructor
   * @param {Hemera} instance 
   */
  constructor(instance) {
    this._instance = instance
    this._pattern = {
      cmd: 'rate',
      joi$: Validate
    }
  }

  /**
   * @description Register Handler
   * @param {object} pattern 
   * @param {string} pattern.topic
   */
  register(pattern) {
    this._instance.add(
      Object.assign(pattern, this._pattern),
      Action.dispatch
    )
  }
}
