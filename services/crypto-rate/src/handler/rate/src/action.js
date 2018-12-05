const axios = require('axios')

module.exports = class RateAction {

  static async generateRequestUrl (request) {
    return `https://api.cryptonator.com/api/ticker/${request.from}-${request.to}`
  }
  /**
   * @description Dispatch Action
   * @param {object} request
   * @param {string} request.from
   * @param {string} request.to
   * @param {float} request.amount 
   */
  static async dispatch(request) {
    try {
      const url = await RateAction.generateRequestUrl(request)
      const { data } = await axios.get(url)
      if (!data.success) {
        throw new Error('Cannot get the current rate')
      }

      const rate = data.ticker && parseFloat(data.ticker.price)
      return { status: true, rate }
    } catch (err) {
      return { status: false, message: err.message }
    }
  }
}
