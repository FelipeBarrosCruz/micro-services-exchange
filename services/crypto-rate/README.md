# Exchange - crypto-rate

## Propose

This microservice is responsible to contains the crypto currencies operations

### Patterns
  - `payload`

        {
          topic: "crypto-rate",
          cmd: "rate",
          from: "USD",
          to: "BTC"
        }
### Microservice Dependency
  - none
