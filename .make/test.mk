# —— 🧪 Tests ————————————————————————————————————————————————————————————————
test: ## Run Codeception, ex: make test c="--steps"
	@$(eval c ?=)
	$(DOCKER_COMP) exec -e APP_ENV=test php vendor/bin/codecept run $(c)
