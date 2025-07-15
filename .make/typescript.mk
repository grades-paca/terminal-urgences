# —— 📘 TypeScript —————————————————————————————————————————————————————————————
ts: ## Run TypeScript type-check (tsc --noEmit)
	@echo "🔍 Running TypeScript type-check..."
	$(TS_NPX) tsc --build

tslint: ## Run ESLint on all TypeScript files
	@echo "🧹 Running ESLint..."
	$(TS_NPX) eslint "src/**/*.{ts,tsx}"

# Run ESLint with auto-fix on all TypeScript and JavaScript files
tslint-fix: ## Fix lint issues using ESLint
	@echo "🛠️  Fixing ESLint issues..."
	$(TS_NPX) eslint "src/**/*.{ts,tsx,js,jsx}" --fix

tsformat-check: ## Check format Prettier
	@echo "🔎 Checking code format with Prettier..."
	$(TS_NPX) prettier --check "src/**/*.{ts,tsx,js,jsx,json}"

tsformat-fix: ## Format code using Prettier
	@echo "🎨 Formatting code with Prettier..."
	$(TS_NPX) prettier --write "src/**/*.{ts,tsx,js,jsx,json}"

ts-fix: ## Run full fix (ESLint + Prettier)
	@echo "🚀 Running full code fix..."
	$(MAKE) tslint-fix
	$(MAKE) tsformat-fix

tstest: ## Run TypeScript unit tests
	@echo "🧪 Running tests..."
	$(TS_NPM) test

tscheck: ## Run all TS checks (lint + tsc + test + format)
	@echo "🔧 Running full TypeScript checks (lint + format + tsc + test)..."
	$(MAKE) tslint
	$(MAKE) tsformat-check
	$(MAKE) ts
	$(MAKE) tstest
