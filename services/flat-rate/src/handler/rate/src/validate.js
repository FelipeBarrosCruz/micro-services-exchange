const Joi = require('joi')

module.exports = Joi.object().keys({
  from: Joi.string()
    .required()
    .description('the base currency to do get the rate'),
  
  to: Joi.string()
    .required()
    .description('the final currency to get the rate')
})
