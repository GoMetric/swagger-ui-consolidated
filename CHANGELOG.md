# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
* AsyncApi ui implemented
* Added `asyncapi` parameter to `config.json`
### Changed
* Config parameter `schemas` renamed to `openapi`
* Consul tag in nomad job renamed from `swagger-api-docs-provider` to `openapi-schema-provider`, also renamed `openapi-schema-url`, `openapi-schema-name`, `openapi-schema-slug`
* Added consul tag `asyncapi-schema-provider` with meta `asyncapi-schema-url`, `asyncapi-schema-name`, `asyncapi-schema-slug`

## [0.2.2] - 2022-01-05
### Added
* Swagger specification
* routing by slug in url