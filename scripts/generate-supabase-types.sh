#!/bin/bash

CURRENT_DIR=$(pwd)

REPO_ROOT=$(git rev-parse --show-toplevel)

DATABASE_TYPES_PATH="$REPO_ROOT/lib/types/database.ts"
PROJECT_ID="lhiocohhafpcjnxwogxa"

cd $REPO_ROOT

bunx supabase gen types --lang=typescript --project-id $PROJECT_ID > $DATABASE_TYPES_PATH
bunx biome check --write $DATABASE_TYPES_PATH

rm -rf supabase/

cd $CURRENT_DIR

echo "[+] Type generation and replacements complete."
