# Consolidated Swagger UI

[![docker](https://img.shields.io/docker/pulls/gometric/swagger-ui-consolidated.svg?style=flat)](https://hub.docker.com/r/gometric/swagger-ui-consolidated/)

Swagger UI that allows to switch between different api schemas.
This allows to build consolidated api documentation for different microservices in one place.

![Opcache dashboard](https://github.com/GoMetric/swagger-ui-consolidated/blob/master/docs/ui.png?raw=true&1)

## Configuration

To configure your own api copy configuration to `config.json`.

Example configuration:

```json
{
  "schemas": [
    {
      "name": "Petstore",
      "slug": "petstore",
      "url": "https://petstore.swagger.io/v2/swagger.json"
    },
    {
      "slug": "amazon-api-gateway",
      "name": "Amazon Api Gateway",
      "url": "https://api.apis.guru/v2/specs/amazonaws.com/apigateway/2015-07-09/openapi.json"
    },
    {
      "slug": "amazon-appconfig",
      "name": "Amazon AppConfig",
      "url": "https://api.apis.guru/v2/specs/amazonaws.com/appconfig/2019-10-09/openapi.json"
    }
  ]
}
```
