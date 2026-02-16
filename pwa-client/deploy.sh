#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────────────────────
# Deployment script for the Procurement PWA
# Usage: ./deploy.sh [production|staging]
# Default: staging (safe — won't accidentally deploy to production)
# ─────────────────────────────────────────────────────────────────────────────

ENV="${1:-staging}"
CHANNEL_NAME="${2:-staging}"
CHANNEL_EXPIRY="7d"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

info()    { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }
warn()    { echo -e "${YELLOW}[WARN]${NC} $1"; }
error()   { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# ─── Validate environment argument ───────────────────────────────────────────

if [[ "$ENV" != "production" && "$ENV" != "staging" ]]; then
  error "Invalid environment: '$ENV'. Use 'production' or 'staging'."
fi

info "Deploying to: ${ENV}"

# ─── Check prerequisites ────────────────────────────────────────────────────

if ! command -v firebase &> /dev/null; then
  error "Firebase CLI not found. Install with: npm install -g firebase-tools"
fi

if [ ! -d "node_modules" ]; then
  warn "node_modules not found. Running npm install..."
  npm install
fi

# ─── Run tests ───────────────────────────────────────────────────────────────

info "Running tests..."
if npm run test:run; then
  success "Tests passed"
else
  error "Tests failed. Fix failing tests before deploying."
fi

# ─── Type check ──────────────────────────────────────────────────────────────

info "Running TypeScript type check..."
if npx vue-tsc --noEmit; then
  success "Type check passed"
else
  error "Type check failed. Fix TypeScript errors before deploying."
fi

# ─── Build ───────────────────────────────────────────────────────────────────

info "Building production bundle..."
npm run build
success "Build completed"

# ─── Deploy ──────────────────────────────────────────────────────────────────

if [[ "$ENV" == "production" ]]; then
  echo ""
  warn "You are about to deploy to PRODUCTION."
  read -r -p "Are you sure? (y/N): " confirm
  if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    info "Deployment cancelled."
    exit 0
  fi

  info "Deploying to production..."
  firebase deploy --only hosting
  echo ""
  success "Production deployment complete!"
else
  info "Deploying to staging channel '${CHANNEL_NAME}' (expires in ${CHANNEL_EXPIRY})..."
  firebase hosting:channel:deploy "$CHANNEL_NAME" --expires "$CHANNEL_EXPIRY"
  echo ""
  success "Staging deployment complete! Preview channel expires in ${CHANNEL_EXPIRY}."
fi
