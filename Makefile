# —— Configuration de base —————————————————————————————————————————————————————————
DOCKER_COMP = docker compose
PHP_CONT    = $(DOCKER_COMP) exec php
PHP         = $(PHP_CONT) php
COMPOSER    = $(PHP_CONT) composer
SYMFONY     = $(PHP) bin/console

.DEFAULT_GOAL = help
.PHONY: help build up start down logs sh bash test composer vendor sf cc

# —— 🐳 Docker - Dev Environment ———————————————————————————————————————————————
.PHONY: build-dev
build-dev: ## Build Docker images for dev
	$(DOCKER_COMP) -f compose.yaml -f compose.override.yaml build --no-cache

.PHONY: up-dev
up-dev: ## Start development environment (MariaDB + Postgres + Adminer)
	$(DOCKER_COMP) -f compose.yaml -f compose.override.yaml up -d

.PHONY: install-dev
install-dev: ## Build & launch dev environment
	@$(MAKE) build-dev
	@$(MAKE) up-dev
	git config core.hooksPath hooks

.PHONY: down-dev
down-dev: ## Stop and remove all containers, networks, volumes (dev mode)
	$(DOCKER_COMP) -f compose.yaml -f compose.override.yaml down -v --remove-orphans

.PHONY: logs-dev
logs-dev: ## Show logs for all containers (dev mode)
	$(DOCKER_COMP) -f compose.yaml -f compose.override.yaml logs -f

# —— 🐳 Docker - Standard Commands ———————————————————————————————————————————————
build: ## Build all images (full)
	$(DOCKER_COMP) build --pull --no-cache

up: ## Start containers (basic)
	$(DOCKER_COMP) up --detach

start: build up ## Build and start the containers

down: ## Stop and clean containers (standard)
	$(DOCKER_COMP) down --remove-orphans

logs: ## Show live logs
	$(DOCKER_COMP) logs --tail=0 --follow

sh: ## Shell into the PHP container (sh)
	$(PHP_CONT) sh

bash: ## Shell into the PHP container (bash)
	$(PHP_CONT) bash

# —— 🧪 Tests ————————————————————————————————————————————————————————————————
test: ## Run PHPUnit, ex: make test c="--group e2e"
	@$(eval c ?=)
	$(DOCKER_COMP) exec -e APP_ENV=test php bin/phpunit $(c)

# —— 🧙 Composer ———————————————————————————————————————————————————————————————
composer: ## Run Composer, ex: make composer c='req symfony/orm-pack'
	@$(eval c ?=)
	$(COMPOSER) $(c)

vendor: ## Install production vendors
vendor: c=install --prefer-dist --no-dev --no-progress --no-scripts --no-interaction
vendor: composer

# —— 🎵 Symfony ————————————————————————————————————————————————————————————————
sf: ## Run Symfony command, ex: make sf c=cache:clear
	@$(eval c ?=)
	$(SYMFONY) $(c)

cc: c=c:c ## Clear Symfony cache
cc: sf

# —— 🧠 GrumPHP ————————————————————————————————————————————————————————————————
.PHONY: grum grum-init grum-task

grum: ## Run GrumPHP manually on all configured tasks
	@$(DOCKER_COMP) exec php vendor/bin/grumphp run

grum-task: ## Run a specific GrumPHP task, ex: make grum-task t=phpstan
	@$(eval t ?=)
	@if [ -z "$(t)" ]; then \
		echo "❌ Please provide a task name with: make grum-task t=<task>"; \
		exit 1; \
	fi
	@$(DOCKER_COMP) exec php vendor/bin/grumphp run --tasks=$(t)

# —— 🧾 Help —————————————————————————————————————————————————————————————————————
help: ## The help, because if no help, no RTFM
	@grep -E '(^[a-zA-Z0-9\./_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | \
	sed -e 's/\[32m##/[33m/'
