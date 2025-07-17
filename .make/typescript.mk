# —— 📘 TypeScript —————————————————————————————————————————————————————————————
ts-check-build: ## Run TypeScript type-check (tsc --noEmit)
	@echo "🔍 Running TypeScript type-check..."
	$(TS_NPX) tsc --build

ts-lint: ## Run ESLint on all TypeScript files
	@echo "🧹 Running ESLint..."
	$(TS_NPX) eslint "src/**/*.{ts,tsx}"

# Run ESLint with auto-fix on all TypeScript and JavaScript files
ts-lint-fix: ## Fix lint issues using ESLint
	@echo "🛠️  Fixing ESLint issues..."
	$(TS_NPX) eslint "src/**/*.{ts,tsx,js,jsx}" --fix

ts-format-check: ## Check format Prettier
	@echo "🔎 Checking code format with Prettier..."
	$(TS_NPX) prettier --check "src/**/*.{ts,tsx,js,jsx,json}"

ts-format-fix: ## Format code using Prettier
	@echo "🎨 Formatting code with Prettier..."
	$(TS_NPX) prettier --write "src/**/*.{ts,tsx,js,jsx,json}"

ts-fix: ## Run full fix (ESLint + Prettier)
	@echo "🚀 Running full code fix..."
	$(MAKE) ts-lint-fix
	$(MAKE) ts-format-fix

ts-test: ## Run TypeScript unit tests
	@echo "🧪 Running tests..."
	$(TS_NPM) test

ts-build-css: ## Run postinstall commande for generate flowbite class
	@echo "🎨 Running postinstall commande..."
	$(TS_NPX) buildCss

ts-post-install: ## Run postinstall commande for generate flowbite class
	@echo "🎨 Running postinstall commande..."
	$(TS_NPX) postinstall

ts-check: ## Run all TS checks (lint + tsc + test + format)
	@echo "🔧 Running full TypeScript checks (lint + format + tsc + test)..."
	$(MAKE) ts-lint
	$(MAKE) ts-format-check
	$(MAKE) ts-check-build
	$(MAKE) ts-test
