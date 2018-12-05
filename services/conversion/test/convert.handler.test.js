const expect = require('chai').expect
const Server = require('./helper/server')

const SERVICE_TOPIC = { topic: process.env.SERVICE_NAME }
const PRE_DEFINED_RATE = 3

describe('ConvertHandler', () => {
  let instance = null

  before(async () => {
    const { hemera, handler } = await Server()
    instance = hemera
    handler.convert.register(SERVICE_TOPIC)

    /**
     * @description Mocking patterns
     */
    instance.add({ topic: 'flat-rate', cmd: 'rate' }, async (request) => {
      return { rate: PRE_DEFINED_RATE }
    })
    instance.add({ topic: 'crypto-rate', cmd: 'rate' }, async (request) => {
      return { rate: PRE_DEFINED_RATE }
    })
  })

  it('Expect to have a valid hemera instance', async () => {
    expect(instance).to.be.not.equal(null)
    expect(instance.constructor).to.not.be.equal(null)
    expect(instance.constructor.name).to.be.equal('Hemera')
  })

  it('Expect throws a validate error when send empty payload data', async () => {
    const payload = {
      topic: SERVICE_TOPIC.topic,
      cmd: 'convert'
    }
    try {
      await instance.act(payload)
    } catch (err) {
      expect(err).to.not.be.equal(null)
      expect(typeof err).to.be.equal('object')
      expect(err.name).to.be.equal('ValidationError')
    }
  })

  it('Expect throws a validate error when send payload without from field', async () => {
    const payload = {
      topic: SERVICE_TOPIC.topic,
      cmd: 'convert',
      to: 'BRL',
      amount: 1
    }
    try {
      await instance.act(payload)
    } catch (err) {
      expect(err).to.not.be.equal(null)
      expect(typeof err).to.be.equal('object')
      expect(err.name).to.be.equal('ValidationError')
      expect(err.message).to.be.equal('child "from" fails because ["from" is required]')
    }
  })

  it('Expect throws a validate error when send payload without to field', async () => {
    const payload = {
      topic: SERVICE_TOPIC.topic,
      cmd: 'convert',
      from: 'BRL',
      amount: 1
    }
    try {
      await instance.act(payload)
    } catch (err) {
      expect(err).to.not.be.equal(null)
      expect(typeof err).to.be.equal('object')
      expect(err.name).to.be.equal('ValidationError')
      expect(err.message).to.be.equal('child "to" fails because ["to" is required]')
    }
  })

  it('Expect throws a validate error when send payload without amount field', async () => {
    const payload = {
      topic: SERVICE_TOPIC.topic,
      cmd: 'convert',
      from: 'BRL',
      to: 'USD'
    }
    try {
      await instance.act(payload)
    } catch (err) {
      expect(err).to.not.be.equal(null)
      expect(typeof err).to.be.equal('object')
      expect(err.name).to.be.equal('ValidationError')
      expect(err.message).to.be.equal('child "amount" fails because ["amount" is required]')
    }
  })

  it('Expect throws a validate error when send payload with invalid amount', async () => {
    const payload = {
      topic: SERVICE_TOPIC.topic,
      cmd: 'convert',
      from: 'BRL',
      to: 'USD',
      amount: 0
    }
    try {
      await instance.act(payload)
    } catch (err) {
      expect(err).to.not.be.equal(null)
      expect(typeof err).to.be.equal('object')
      expect(err.name).to.be.equal('ValidationError')
      expect(err.message).to.be.equal('child "amount" fails because ["amount" must be a positive number]')
    }
  })

  it(
    'Expect returns a valid amount when send payload with currencies and the transaction type is flat',
    async () => {
      const payload = {
        topic: SERVICE_TOPIC.topic,
        cmd: 'convert',
        from: 'BRL',
        to: 'USD',
        amount: 2
      }

      try {
        const expectedAmount = PRE_DEFINED_RATE * payload.amount
        const { data } = await instance.act(payload)
        expect(typeof data).to.be.equal('object')
        expect(data.status).to.be.equal(true)
        expect(data.value).to.be.equal(expectedAmount)
      } catch (err) {
        expect(err).to.be.equal(null)
      }
  })
})