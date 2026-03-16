.PHONY: help install dev dev-backend dev-storefront build type-check clean db-up db-down db-reset db-clear seed seed-clear create-admin logs tail-logs stop test-storefront test-apis test-e2e test-frontend test-all

help:
	@echo "Available commands:"
	@echo "  make install        - Install all dependencies"
	@echo "  make dev           - Start backend + storefront (with log rotation)"
	@echo "  make dev-backend   - Start Medusa backend only"
	@echo "  make dev-storefront - Start Next.js storefront only"
	@echo "  make build         - Build all workspaces"
	@echo "  make type-check    - TypeScript type checking"
	@echo "  make db-up         - Start PostgreSQL + Redis containers"
	@echo "  make db-down       - Stop database containers"
	@echo "  make db-reset      - Reset database (run migrations)"
	@echo "  make db-clear      - Clear ALL data and reset database (DESTRUCTIVE)"
	@echo "  make seed          - Seed demo data (categories, products, promotions)"
	@echo "  make seed-clear    - Clear seeded demo data only"
	@echo "  make create-admin  - Create admin user (default: admin@medusa-test.com / supersecret)"
	@echo "  make logs          - View current dev logs"
	@echo "  make tail-logs     - Tail dev logs in real-time"
	@echo "  make stop          - Stop all running services"
	@echo "  make clean         - Remove node_modules"
	@echo ""
	@echo "Testing:"
	@echo "  make test-storefront - Quick storefront health check"
	@echo "  make test-apis      - Test backend API endpoints"
	@echo "  make test-e2e       - Comprehensive E2E backend tests"
	@echo "  make test-frontend  - Frontend integration tests"
	@echo "  make test-all       - Run all tests (full validation)"

install:
	@echo "📦 Installing dependencies..."
	npm install
	npm run install:all
	@echo "✅ Dependencies installed"

dev:
	@echo "🚀 Starting development environment..."
	@./scripts/dev.sh

dev-backend:
	@echo "🔧 Starting Medusa backend..."
	cd backend && npm run dev

dev-storefront:
	@echo "🎨 Starting Next.js storefront..."
	cd storefront && npm run dev

build:
	@echo "🏗️  Building all workspaces..."
	npm run build

type-check:
	@echo "🔍 Type checking..."
	npm run type-check

db-up:
	@echo "🐳 Starting database services..."
	cd backend && docker-compose up -d
	@echo "✅ Database services started"

db-down:
	@echo "🛑 Stopping database services..."
	cd backend && docker-compose down
	@echo "✅ Database services stopped"

db-reset:
	@echo "🔄 Resetting database..."
	cd backend && npm run migrate
	@echo "✅ Database reset complete"

db-clear:
	@echo "⚠️  DESTRUCTIVE: This will delete ALL data and reset the database!"
	@read -p "Are you sure? Type 'yes' to continue: " confirm && [ "$$confirm" = "yes" ] || (echo "Aborted" && exit 1)
	@echo "🗑️  Clearing database..."
	cd backend && docker-compose down -v
	@echo "📦 Starting fresh database..."
	cd backend && docker-compose up -d
	@echo "⏳ Waiting for database to be ready..."
	@sleep 5
	@echo "🔄 Running migrations..."
	cd backend && npm run migrate
	@echo "🚀 Setting up infrastructure..."
	cd backend && npx medusa exec ./scripts/setup-infrastructure.ts
	@echo "👤 Creating default admin user..."
	cd backend && npx medusa user -e admin@medusa-test.com -p supersecret 2>&1 | grep -v "warn\|info" || true
	@echo ""
	@echo "✅ Database cleared and reset complete!"
	@echo ""
	@echo "📧 Admin Email: admin@medusa-test.com"
	@echo "🔑 Admin Password: supersecret"
	@echo "🌐 Admin Panel: http://localhost:9000/app"
	@echo ""
	@echo "💡 Next steps:"
	@echo "   1. Run 'make seed' to add demo data"
	@echo "   2. Run 'make dev' to start backend + storefront"
	@echo "   3. Or run 'make create-admin' to create a custom admin user"

seed-clear:
	@echo "🗑️  Clearing demo data..."
	cd backend && npx medusa exec ./scripts/clear-demo-data.ts
	@echo "✅ Demo data cleared"

create-admin:
	@echo "👤 Creating admin user..."
	@read -p "Email (default: admin@medusa-test.com): " email; \
	email=$${email:-admin@medusa-test.com}; \
	read -sp "Password (default: supersecret): " password; \
	password=$${password:-supersecret}; \
	echo ""; \
	cd backend && npx medusa user -e "$$email" -p "$$password" 2>&1 | grep -v "warn\|info" || echo "✅ User created or already exists"; \
	echo ""; \
	echo "📧 Email: $$email"; \
	echo "🔑 Password: $$password"; \
	echo ""; \
	echo "🌐 Login at: http://localhost:9000/app"

seed:
	@echo "🌱 Seeding demo data..."
	@echo "   This creates categories, collections, products, and promotions"
	@echo ""
	cd backend && npx medusa exec ./scripts/seed-demo-data.ts
	@echo ""
	@echo "✅ Demo data seeded successfully!"
	@echo ""
	@echo "💰 Test these discount codes on storefront:"
	@echo "   - WELCOME10 (10% off)"
	@echo "   - GAMING20 (₹2000 off)"
	@echo "   - SAVE500 (₹500 off)"
	@echo ""

logs:
	@if [ -f "dev.log" ]; then \
		cat dev.log; \
	else \
		echo "No dev.log found. Run 'make dev' first."; \
	fi

tail-logs:
	@if [ -f "dev.log" ]; then \
		tail -f dev.log; \
	else \
		echo "No dev.log found. Run 'make dev' first."; \
	fi

stop:
	@echo "🛑 Stopping all services..."
	@pkill -f "medusa develop" || true
	@pkill -f "next dev" || true
	@echo "✅ All services stopped"

clean:
	@echo "🧹 Cleaning node_modules..."
	npm run clean
	@echo "✅ Cleaned"

# ============================================
# Testing Commands
# ============================================

test-storefront:
	@echo "🔍 Running storefront health check..."
	@./scripts/test/check-storefront.sh

test-apis:
	@echo "🧪 Testing backend APIs..."
	@./scripts/test/test-apis.sh

test-e2e:
	@echo "🔄 Running E2E backend tests..."
	@./scripts/test/test-medusa-e2e.sh

test-frontend:
	@echo "🎨 Testing frontend integration..."
	@./scripts/test/test-frontend.sh

test-all:
	@echo "🚀 Running full test suite..."
	@./scripts/test/test-everything.sh
