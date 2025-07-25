# —— Configuration de base —————————————————————————————————————————————————————————
DOCKER_COMP = docker compose
PHP_CONT    = $(DOCKER_COMP) exec php
PHP         = $(PHP_CONT) php
COMPOSER    = $(PHP_CONT) composer
SYMFONY     = $(PHP) bin/console

TS_CONT_ASSETS   = $(DOCKER_COMP) exec -w /app/assets typescript
TS_CONT_ROOT     = $(DOCKER_COMP) exec typescript
