# Consolidated API UI

[![docker](https://img.shields.io/docker/pulls/gometric/swagger-ui-consolidated.svg?style=flat)](https://hub.docker.com/r/gometric/swagger-ui-consolidated/)

UI that allows to switch between different OpenAPI and AsyncApi schemas.
This allows to build consolidated api documentation for different microservices in one place.

![UI](https://github.com/GoMetric/swagger-ui-consolidated/blob/master/docs/ui.png?raw=true)

## Configuration

To configure your own api copy configuration to `config.json`.

Example configuration:

```json
{
  "openapi": [
    {
      "slug": "amazon-api-gateway",
      "name": "Amazon Api Gateway",
      "url": "https://api.apis.guru/v2/specs/amazonaws.com/apigateway/2015-07-09/openapi.json"
    }
  ],
  "asyncapi": [
    {
      "name": "Slack Real Time Messaging API",
      "slug": "slack-messaging",
      "url:": "https://raw.githubusercontent.com/asyncapi/spec/master/examples/slack-rtm.yml"
    }
  ]
}
```
