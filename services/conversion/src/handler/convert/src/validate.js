const Joi = require('joi')

module.exports = {
  from: Joi.string()
    .required()
    .description('the base currency to do the conversion'),
  
  to: Joi.string()
    .required()
    .description('the final currency of conversion'),

  amount: Joi.number()
    .positive()
    .min(1)
    .description('the amount to do the conversion')
}
