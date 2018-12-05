const Joi = require('joi')
const WorldCurrencies = require('world-currencies')
const CryptoCurrencies = require('cryptocurrencies')
const FlatCurrencies = Object.keys(WorldCurrencies).map((currency) => (
  WorldCurrencies[currency].iso.code
))
const ValidCurrenyList = [...FlatCurrencies, ...CryptoCurrencies.symbols()]

module.exports = {
  payload: {
    from: Joi.string()
      .required()
      .valid(ValidCurrenyList)
      .description('the base currency to do the conversion'),

    to: Joi.string()
      .required()
      .valid(ValidCurrenyList)
      .description('the final currency of conversion'),

    amount: Joi.number()
      .positive()
      .min(1)
      .description('the amount to do the conversion')
  }
}
