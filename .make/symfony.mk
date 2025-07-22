# —— 🎵 Symfony ————————————————————————————————————————————————————————————————
sf: ## Run Symfony command, ex: make sf c=cache:clear
	@$(eval c ?=)
	$(SYMFONY) $(c)

wait-symfony:
	@until docker compose exec php php bin/console about > /dev/null 2>&1; do \
		echo "Waiting for Symfony..."; \
		sleep 2; \
	done

cc: c=c:c ## Clear Symfony cache
cc: sf
