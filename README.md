# Consolidated API UI

[![docker](https://img.shields.io/docker/pulls/gometric/swagger-ui-consolidated.svg?style=flat)](https://hub.docker.com/r/gometric/swagger-ui-consolidated/)

UI that allows to switch between different OpenAPI and AsyncApi schemas.
This allows to build consolidated api documentation for different microservices in one place.

![UI](https://github.com/GoMetric/swagger-ui-consolidated/blob/master/docs/ui.png?raw=true)

## Installation

Use docker image:

```
docker pull gometric/swagger-ui-consolidated
```

## Configuration

Application reads its configuration from `config.json` file located in root of work directory.
In Docker environment works in workdir `/var/www/swagger-ui`.

You may pass configuration in `APP_CONFIG` environment variable and it's content will be stored during initiation 
of container, or you may mount your own configuration file.

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
      "url": "https://raw.githubusercontent.com/asyncapi/spec/master/examples/slack-rtm.yml"
    }
  ]
}
```

## Nomad job

Deploy app to Nomad cluster:

```
levant deploy \
    -log-level=debug \
    -address $NOMAD_ADDR_PROD \
    -var dc="$NOMAD_DC" \
    -var name="$NOMAD_JOB_NAME" \
    -var urlprefix="$PUBLIC_URL_PROD" \
    -var imageversion="$IMAGE_VERSION" \
    .nomad.standalone.job
```

There are to nomad file examples:
* .nomad.standalone.job - Jobs not connected with Consul Connect
* .nomad.mesh.job - Jobs connected with Consul Connect
