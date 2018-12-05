# Exchange - conversion

## Propose

This microservice is responsible to contains the conversion operations

### Patterns
  - `payload`

        {
          topic: "crypto-rate",
          cmd: "rate",
          from: "USD",
          to: "BTC"
        }
### Microservice Dependency
  - crypto-rate
  - flat-rate
