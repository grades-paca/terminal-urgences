# —— 🎵 Symfony ————————————————————————————————————————————————————————————————
sf: ## Run Symfony command, ex: make sf c=cache:clear
	@$(eval c ?=)
	$(SYMFONY) $(c)

cc: c=c:c ## Clear Symfony cache
cc: sf
