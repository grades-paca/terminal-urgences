include .make/config.mk
include .make/composer.mk
include .make/docker.mk
include .make/doctrine.mk
include .make/symfony.mk
include .make/typescript.mk
include .make/grumphp.mk
include .make/test.mk

.DEFAULT_GOAL = help
.PHONY: help

help: ## Show this help grouped by file
	@for file in $(MAKEFILE_LIST); do \
		echo "\n\033[1m$${file}:\033[0m"; \
		grep -E '^[a-zA-Z0-9._/-]+:.*?## ' $$file | \
		awk -F: '{desc=$$0; sub(/^.*## /, "", desc); printf "  \033[32m%-28s\033[0m %s\n", $$1, desc}'; \
	done
