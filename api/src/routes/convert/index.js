const validate = require('./src/validate')
const handler = require('./src/handler')

module.exports = {
  method: 'POST',
  path: '/convert',
  options: {
    description: 'To do the conversion between currencies',
    notes: 'Should return 200 with status and amount converted',
    tags: ['api'],
    validate,
    handler
  }
}
