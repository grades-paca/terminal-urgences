# —— Configuration de base —————————————————————————————————————————————————————————
DOCKER_COMP = docker compose
PHP_CONT    = $(DOCKER_COMP) exec php
PHP         = $(PHP_CONT) php
COMPOSER    = $(PHP_CONT) composer
SYMFONY     = $(PHP) bin/console

TS_CONT     = $(DOCKER_COMP) exec php
TS_NPX      = $(TS_CONT) npx
TS_NPM      = $(TS_CONT) npm
