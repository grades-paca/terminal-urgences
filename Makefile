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

help: ## The help, because if no help, no RTFM
	@grep -E '(^[a-zA-Z0-9\./_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | \
	sed -e 's/\[32m##/[33m/'
