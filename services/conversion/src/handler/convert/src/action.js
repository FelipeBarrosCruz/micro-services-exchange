const { pick, merge } = require('lodash')
const CURRENCIES_MAP = require('./currencies-map')
/**
 * @description ConvertAction
 * @param {Hemera} this
 */
module.exports = class ConvertAction {
  /**
   * @description Find and returns currency type
   * @param {string} currency 
   * @returns {string|unddefined}
   */
  static async getCurrencyType (currency) {
    return Object.keys(CURRENCIES_MAP).find(type => (
      CURRENCIES_MAP[type].find(value => value === currency) && type
    ))
  }

  /**
   * @param {Hemera} instance
   * @param {object} request 
   * @param {string} request.topic
   * @param {string} request.cmd
   * @param {string} request.from
   * @param {string} request.to
   * @param {float} request.amount
   * @returns {float} rate
   */
  static async requestRate(instance, request) {
    const type = await ConvertAction.getCurrencyType(request.to)
    if (!type) {
      throw new Error(`Currency ${request.to} isn't allowed to convert`)
    }

    const pattern = { topic: `${type}-rate`, cmd: 'rate' }
    const payload = pick(request, ['from', 'to'])
    const { data } = await instance.act(merge(pattern, payload))

    if (!data.status) {
      throw new Error(data.message)
    }

    return data.rate
  }
  /**
   * @description Dispatch Action
   * @param {object} request 
   * @param {string} request.topic
   * @param {string} request.cmd
   * @param {string} request.from
   * @param {string} request.to
   * @param {float} request.amount 
   * @returns {object} response
   * @returns {boolean} response.status
   * @returns {float} response.value 
   */
  static async dispatch (request) {
    try {
      const rate = await ConvertAction.requestRate(this, request)
      return { status: true, value: request.amount * rate }
    } catch (err) {
      return { status: false, message: err.message }
    }
  }
}
