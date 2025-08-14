#!/usr/bin/env bash

# One-click runner for backend (Spring Boot) and frontend (Next.js)
# macOS/Linux friendly. Starts both apps concurrently and cleans up on exit.

set -euo pipefail

ROOT_DIR="/Users/gyc/Desktop/study/GYCcom"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

BACKEND_PORT="8080"
FRONTEND_PORT="3000"

FRONTEND_ONLY=false
BACKEND_ONLY=false
OPEN_TERMINAL=false # open separate macOS Terminal windows for logs

while [[ $# -gt 0 ]]; do
  case "$1" in
    --frontend-only)
      FRONTEND_ONLY=true
      shift
      ;;
    --backend-only)
      BACKEND_ONLY=true
      shift
      ;;
    --terminal)
      OPEN_TERMINAL=true
      shift
      ;;
    --help|-h)
      echo "Usage: ./run.sh [--frontend-only|--backend-only|--terminal]"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

info()  { echo -e "\033[1;34m[INFO]\033[0m  $*"; }
error() { echo -e "\033[1;31m[ERROR]\033[0m $*"; }

wait_for_port() {
  local port="$1"; local name="$2"; local retries=60
  until nc -z localhost "$port" >/dev/null 2>&1; do
    ((retries--)) || { error "$name didn't open port $port in time"; return 1; }
    sleep 1
  done
}

BACK_PID=""; FRONT_PID=""
cleanup() {
  echo
  info "Shutting down..."
  [[ -n "$FRONT_PID" ]] && kill "$FRONT_PID" >/dev/null 2>&1 || true
  [[ -n "$BACK_PID"  ]] && kill "$BACK_PID"  >/dev/null 2>&1 || true
  wait >/dev/null 2>&1 || true
}
trap cleanup INT TERM EXIT

start_backend() {
  info "Starting backend (Spring Boot) on :$BACKEND_PORT"
  cd "$BACKEND_DIR"
  chmod +x mvnw 2>/dev/null || true
  ./mvnw -q -DskipTests spring-boot:run &
  BACK_PID=$!
  wait_for_port "$BACKEND_PORT" "backend" || exit 1
  info "Backend up at http://localhost:$BACKEND_PORT"
}

start_frontend() {
  info "Starting frontend (Next.js) on :$FRONTEND_PORT"
  cd "$FRONTEND_DIR"
  if [[ ! -d node_modules ]]; then
    info "Installing frontend dependencies (first run)"
    npm ci --no-audit --no-fund
  fi
  # Respect project's dev script
  npm run dev -- --port "$FRONTEND_PORT" &
  FRONT_PID=$!
  wait_for_port "$FRONTEND_PORT" "frontend" || exit 1
  info "Frontend up at http://localhost:$FRONTEND_PORT"
}

if $FRONTEND_ONLY && $BACKEND_ONLY; then
  error "Choose either --frontend-only or --backend-only, not both."
  exit 1
fi

# If user requests separate terminals and we're on macOS, launch via AppleScript
if $OPEN_TERMINAL && [[ "$(uname -s)" == "Darwin" ]]; then
  info "Opening separate Terminal windows for backend and frontend logs..."
  BACK_CMD="cd \"$BACKEND_DIR\"; chmod +x mvnw 2>/dev/null || true; ./mvnw -DskipTests spring-boot:run"
  FRONT_CMD="cd \"$FRONTEND_DIR\"; if [[ ! -d node_modules ]]; then npm ci --no-audit --no-fund; fi; npm run dev -- --port $FRONTEND_PORT"
  esc_back=$(printf "%s" "$BACK_CMD" | sed 's/\\/\\\\/g; s/\"/\\\"/g')
  esc_front=$(printf "%s" "$FRONT_CMD" | sed 's/\\/\\\\/g; s/\"/\\\"/g')
  osascript -e "tell application \"Terminal\" to do script \"$esc_back\"" >/dev/null
  osascript -e "tell application \"Terminal\" to do script \"$esc_front\"" >/dev/null
  info "Launched. You can watch logs in the two windows. (This shell can be closed)"
  exit 0
fi

if $FRONTEND_ONLY; then
  start_frontend
elif $BACKEND_ONLY; then
  start_backend
else
  start_backend
  start_frontend
fi

echo
info "All services are running. Press Ctrl+C to stop."
wait

