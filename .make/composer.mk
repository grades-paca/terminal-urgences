# —— 🧙 Composer ———————————————————————————————————————————————————————————————
composer: ## Run Composer, ex: make composer c='req symfony/orm-pack'
	@$(eval c ?=)
	$(COMPOSER) $(c)

vendor: ## Install production vendors
vendor: c=install --prefer-dist --no-dev --no-progress --no-scripts --no-interaction
vendor: composer
