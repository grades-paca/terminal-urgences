.PHONY: doctrine-reset doctrine-migrate doctrine-fixtures

doctrine-reset: ## Drop and create the database
	$(PHP) bin/console doctrine:database:drop --force
	$(PHP) bin/console doctrine:database:create

doctrine-migrate: ## Run database migrations
	$(PHP) bin/console doctrine:migrations:migrate --no-interaction

doctrine-fixtures: ## Load data fixtures into the database
	$(PHP) bin/console doctrine:fixtures:load --no-interaction
