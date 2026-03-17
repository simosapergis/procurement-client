#!/usr/bin/env bash

# Runs after `git checkout` / `git switch`.
# Automatically selects the Firebase project matching the branch name.

# $3 = 1 for branch checkout, 0 for file checkout — skip file checkouts
[ "$3" != "1" ] && exit 0

# Skip validation when setup_client.sh is creating/switching branches (it writes .env.local first)
[ -n "${SETUP_CLIENT_SKIP_HOOK:-}" ] && exit 0

BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null)
[ -z "$BRANCH" ] && exit 0  # detached HEAD

ENV_FILE="pwa-client/.env.local"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

if [ ! -f "$ENV_FILE" ]; then
  echo -e "${RED}✗ post-checkout: $ENV_FILE not found — skipping Firebase project switch${NC}"
  exit 1
fi

PROJECT_ID=$(grep '^VITE_FIREBASE_PROJECT_ID=' "$ENV_FILE" | sed 's/^VITE_FIREBASE_PROJECT_ID=//' | tr -d '"')

if [ -z "$PROJECT_ID" ]; then
  echo -e "${RED}✗ post-checkout: VITE_FIREBASE_PROJECT_ID not set in $ENV_FILE${NC}"
  exit 1
fi

if [ "$BRANCH" != "$PROJECT_ID" ]; then
  echo -e "${RED}✗ post-checkout: branch '${BRANCH}' does not match VITE_FIREBASE_PROJECT_ID '${PROJECT_ID}' in $ENV_FILE${NC}"
  echo -e "${YELLOW}  Make sure .env.local is configured for this branch's Firebase project.${NC}"
  exit 1
fi

if ! command -v firebase &>/dev/null; then
  echo -e "${RED}✗ post-checkout: 'firebase' CLI not found — install it with: npm i -g firebase-tools${NC}"
  exit 1
fi

OUTPUT=$(cd pwa-client && firebase use "$BRANCH" 2>&1)
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ post-checkout: Firebase project set to '${BRANCH}'${NC}"
else
  echo -e "${RED}✗ post-checkout: Firebase project '${BRANCH}' does not exist or is not accessible${NC}"
  echo -e "${YELLOW}  $OUTPUT${NC}"
  echo -e "${YELLOW}  Run 'firebase projects:list' to see available projects.${NC}"
  exit 1
fi
