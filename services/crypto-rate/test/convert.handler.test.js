const expect = require('chai').expect
const Server = require('./helper/server')

const SERVICE_TOPIC = { topic: process.env.SERVICE_NAME }

describe('RateHandler', () => {
  let instance = null

  before(async () => {
    const { hemera, handler } = await Server()
    instance = hemera
    handler.rate.register(SERVICE_TOPIC)
  })

  it('Expect to have a valid hemera instance', async () => {
    expect(instance).to.be.not.equal(null)
    expect(instance.constructor).to.not.be.equal(null)
    expect(instance.constructor.name).to.be.equal('Hemera')
  })

  it('Expect throws a validate error when send empty payload data', async () => {
    const payload = {
      topic: SERVICE_TOPIC.topic,
      cmd: 'rate'
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
      cmd: 'rate',
      to: 'BRL'
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
      cmd: 'rate',
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

  it.only('Expect returns a valid rate value when send the correct payload', async () => {
    const payload = {
      topic: SERVICE_TOPIC.topic,
      cmd: 'rate',
      from: 'USD',
      to: 'BTC',
    }

    try {
      const { data } = await instance.act(payload)
      expect(typeof data).to.be.equal('object')
      expect(data.status).to.be.equal(true)
      expect(data.rate).to.be.greaterThan(0)
    } catch (err) {
      expect(err).to.be.equal(null)
    }
  })
})