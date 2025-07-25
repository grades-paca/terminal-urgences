.PHONY: doctrine-reset doctrine-migrate doctrine-sync doctrine-diff doctrine-validate doctrine-clear doctrine-update doctrine-fixtures

doctrine-reset: ## Drop and create the database (with confirmation)
	@read -p "⚠️  Cette opération va supprimer la base de données. Continuer ? (y/N) " confirm && \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		$(PHP) bin/console doctrine:database:drop --force && \
		$(PHP) bin/console doctrine:database:create; \
	else \
		echo "Opération annulée."; \
	fi

doctrine-migrate: ## Run database migrations
	$(PHP) bin/console doctrine:migrations:migrate --no-interaction

doctrine-sync: ## Sync metadata storage (required before diff sometimes)
	$(PHP) bin/console doctrine:migrations:sync-metadata-storage

doctrine-diff: ## Generate a migration based on entity changes
	$(PHP) bin/console doctrine:migrations:diff

doctrine-validate: ## Validate doctrine mapping
	$(PHP) bin/console doctrine:schema:validate

doctrine-revert: ## Revert the last Doctrine migration
	$(PHP) bin/console doctrine:migrations:migrate prev --no-interaction

doctrine-clear: ## Clear metadata, query and result caches
	$(PHP) bin/console doctrine:cache:clear-metadata
	$(PHP) bin/console doctrine:cache:clear-query
	$(PHP) bin/console doctrine:cache:clear-result

doctrine-update: ## Update the schema (not recommended in prod)
	$(PHP) bin/console doctrine:schema:update --force

doctrine-fixtures: ## Load data fixtures
	$(PHP) bin/console doctrine:fixtures:load --no-interaction
