const axios = require('axios')

module.exports = class RateAction {

  static async generateRequestUrl (conversionKey) {
    return `https://free.currencyconverterapi.com/api/v6/convert?q=${conversionKey}&compact=y`
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
      const conversionKey = `${request.from}_${request.to}`
      const url = await RateAction.generateRequestUrl(conversionKey)
      const { data } = await axios.get(url)

      if (!data || !Object.keys(data).length) {
        throw new Error('Uable to do the conversion between the currencies')
      }

      const rate = data[conversionKey].val
      return { status: true, rate }

    } catch (err) {
      return { status: false, message: err.message }
    }
  }
}
