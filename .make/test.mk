# —— 🧪 Tests ————————————————————————————————————————————————————————————————
test: ## Run PHPUnit, ex: make test c="--group e2e"
	@$(eval c ?=)
	$(DOCKER_COMP) exec -e APP_ENV=test php bin/phpunit $(c)
