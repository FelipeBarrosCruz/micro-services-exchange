# Exchange - flat-rate

## Propose

This microservice is responsible to contains the flat currencies operations

### Patterns
  - `payload`

        {
          topic: "flat-rate",
          cmd: "rate",
          from: "USD",
          to: "BRL"
        }
### Microservice Dependency
  - none
