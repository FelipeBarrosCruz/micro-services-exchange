const Validate = require('./src/validate')
const Action = require('./src/action')
const { merge } = require('lodash')

module.exports = class ConvertHandler {
  /**
   * @description ConvertHandler constructor
   * @param {Hemera} instance 
   */
  constructor (instance) {
    this._instance = instance
    this._pattern = {
      cmd: 'convert',
      joi$: Validate
    }
  }

  /**
   * @description Register Handler
   * @param {object} pattern 
   * @param {string} pattern.topic
   */
  register (pattern) {
    this._instance.add(
      merge(pattern, this._pattern),
      Action.dispatch
    )
  }
}
