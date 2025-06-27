.PHONY: build-dev up-dev install-dev down-dev logs-dev

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

# —— 🐳 Docker - Dev Environment ———————————————————————————————————————————————
build-dev: ## Build Docker images for dev
	$(DOCKER_COMP) -f compose.yaml -f compose.override.yaml build

up-dev: ## Start development environment (MariaDB + Postgres + Adminer)
	$(DOCKER_COMP) -f compose.yaml -f compose.override.yaml up -d

down-dev: ## Stop and remove all containers, networks, volumes (dev mode)
	$(DOCKER_COMP) -f compose.yaml -f compose.override.yaml down -v --remove-orphans

logs-dev: ## Show logs for all containers (dev mode)
	$(DOCKER_COMP) -f docker-compose.yaml -f docker-compose.override.yaml logs -f

install-root-cert-dev: ## Install local root certificate into system keychain (macOS)
	docker cp $(shell docker compose ps -q php):/data/caddy/pki/authorities/local/root.crt /tmp/root.crt && \
	sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain /tmp/root.crt

install-dev: ## Build & launch dev environment
	@$(MAKE) down-dev
	@$(MAKE) build-dev
	@$(MAKE) up-dev
	git config core.hooksPath .hooks
	@$(MAKE) doctrine-reset
	@$(MAKE) doctrine-migrate
	@$(MAKE) doctrine-fixtures
	$(PHP) bin/console app:create-admin
	@$(MAKE) install-root-cert-dev
