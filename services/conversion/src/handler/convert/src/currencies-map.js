const WorldCurrencies = require('world-currencies')
const CryptCurrencies = require('cryptocurrencies')

const FlatList = Object.keys(WorldCurrencies).map((currency) => (
  WorldCurrencies[currency].iso.code
))
const CryptoList = CryptCurrencies.symbols()

module.exports = {
  flat: FlatList,
  crypto: CryptoList
}
