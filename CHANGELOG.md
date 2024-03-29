# Changelog
All notable changes to this project will be documented in this file.

## [0.5.1] - 2023-02-17
* Bump npm deps
* Fix github workflow step actin versions

## [0.5.0] - 2023-02-17
* Bump node & nginx versions
* Allow configure application configuration by environment variable `APP_CONFIG`

## [0.4.2] - 2022-08-27
### Fixed
* Schemas in toolbar selector sorted by name

## [0.4.1]
### Changed
* Fixed openid authorization

## [0.4.0]
### Changed
* Fixed state management, apis now switched correctly

## [0.3.0]
### Added
* AsyncApi UI
* AsyncApi configuration implemented
* Added `asyncapi` parameter to `config.json`
### Changed
* Config parameter `schemas` renamed to `openapi`
* Consul tag in nomad job renamed from `swagger-api-docs-provider` to `openapi-schema-provider`, also renamed `openapi-schema-url`, `openapi-schema-name`, `openapi-schema-slug`
* Added consul tag `asyncapi-schema-provider` with meta `asyncapi-schema-url`, `asyncapi-schema-name`, `asyncapi-schema-slug`

## [0.2.2] - 2022-01-05
### Added
* Swagger specification
* routing by slug in url
