# —— 📘 TypeScript —————————————————————————————————————————————————————————————
ts-check-build: ## Run TypeScript type-check (tsc --noEmit)
	@echo "🔍 Running TypeScript type-check..."
	$(TS_CONT_ASSETS) npx tsc --build

ts-lint: ## Run ESLint on all TypeScript files
	@echo "🧹 Running ESLint..."
	$(TS_CONT_ASSETS) npx eslint "src/**/*.{ts,tsx}"

# Run ESLint with auto-fix on all TypeScript and JavaScript files
ts-lint-fix: ## Fix lint issues using ESLint
	@echo "🛠️  Fixing ESLint issues..."
	$(TS_CONT_ASSETS) npx eslint "src/**/*.{ts,tsx,js,jsx}" --fix

ts-format-check: ## Check format Prettier
	@echo "🔎 Checking code format with Prettier..."
	$(TS_CONT_ASSETS) npx prettier --check "src/**/*.{ts,tsx,js,jsx,json}"

ts-format-fix: ## Format code using Prettier
	@echo "🎨 Formatting code with Prettier..."
	$(TS_CONT_ASSETS) npx prettier --write "src/**/*.{ts,tsx,js,jsx,json}"

ts-fix: ## Run full fix (ESLint + Prettier)
	@echo "🚀 Running full code fix..."
	$(MAKE) ts-lint-fix
	$(MAKE) ts-format-fix

ts-test: ## Run TypeScript unit tests
	@echo "🧪 Running tests..."
	$(TS_CONT_ROOT) npm test

ts-flowbite-init: ## Run flowbite-init commande for generate flowbite class
	@echo "🎨 Running flowbite-init commande..."
	$(TS_CONT_ROOT) npm run flowbite-init

ts-flowbite-build: ## Run flowbite-build commande for generate flowbite class
	@echo "🎨 Running flowbite-build commande..."
	$(TS_CONT_ROOT) npm run flowbite-build

ts-flowbite-patch: ## Run flowbite-patch commande for generate flowbite class
	@echo "🎨 Running flowbite-patch commande..."
	$(TS_CONT_ROOT) npm run flowbite-patch

ts-check: ## Run all TS checks (lint + tsc + test + format)
	@echo "🔧 Running full TypeScript checks (lint + format + tsc + test)..."
	$(MAKE) ts-lint
	$(MAKE) ts-format-check
	$(MAKE) ts-check-build
	$(MAKE) ts-test
