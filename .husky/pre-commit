#!/usr/bin/env sh

check_hardcoded_inputs() {
  local file=$1
  local patterns=(
    "goto\(\s*['\"][^'\"]+['\"]\s*\)"
    "\.goto\(\s*['\"][^'\"]+['\"]\s*\)"
    "fill\(\s*['\"][^'\"]+['\"]\s*\)"
    "\.fill\(\s*['\"][^'\"]+['\"]\s*\)"
    "request\(\s*['\"][^'\"]+['\"]\s*\)"
    "\.request\(\s*['\"][^'\"]+['\"]\s*\)"
  )

  for pattern in "${patterns[@]}"; do
    if grep -E "$pattern" "$file"; then
      echo "❌ Hardcoded value found in file: $file"
      return 1
    fi
  done
  return 0
}

# Ambil file yang dimodifikasi
MODIFIED_FILES=$(git diff --cached --name-only --diff-filter=AM | grep -v "node_modules")
PLAYWRIGHT_FILES=$(echo "$MODIFIED_FILES" | grep -E '\.spec\.(js|ts)$' | grep 'tests')
PRETTIER_FILES=$(echo "$MODIFIED_FILES" | grep -E '\.(js|jsx|ts|tsx|json|css|scss|md)$')

if [ -z "$PLAYWRIGHT_FILES" ] && [ -z "$PRETTIER_FILES" ]; then
  exit 0
fi

# Cek hardcoded inputs
for file in $PLAYWRIGHT_FILES; do
  check_hardcoded_inputs "$file" || exit 1
done

# Format file dengan Prettier
if [ -n "$PRETTIER_FILES" ]; then
  npx prettier --write $PRETTIER_FILES
  echo "$PRETTIER_FILES" | xargs git add
fi

exit 0
