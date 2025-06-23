# —— 📘 TypeScript —————————————————————————————————————————————————————————————
ts: ## Run TypeScript type-check (tsc --noEmit)
	@echo "🔍 Running TypeScript type-check..."
	$(TS_NPX) tsc --noEmit

tslint: ## Run ESLint on all TypeScript files
	@echo "🧹 Running ESLint..."
	$(TS_NPX) eslint "src/**/*.{ts,tsx}"

tstest: ## Run TypeScript unit tests
	@echo "🧪 Running tests..."
	$(TS_NPM) run test -- --watchAll=false --passWithNoTests

tscheck: ## Run all TS checks (lint, type-check, tests)
	@echo "🔧 Running full TypeScript checks (lint + tsc + test)..."
	$(TS_NPX) eslint "**/*.{ts,tsx}" && \
	$(TS_NPX) tsc --noEmit && \
	$(TS_NPM) run test -- --watchAll=false --passWithNoTests
