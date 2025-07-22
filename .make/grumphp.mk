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
