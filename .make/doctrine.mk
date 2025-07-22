.PHONY: doctrine-reset doctrine-migrate

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
