#!/usr/bin/env bash

# Stop script for GYCcom mono-repo: kills frontend (3000) and backend (8080)
# Works on macOS/Linux. Tries PID files first, then falls back to port-based kill.

set -euo pipefail

ROOT_DIR="/Users/gyc/Desktop/study/GYCcom"
BACKEND_PORT=8080
FRONTEND_PORT=3000

info() { echo -e "\033[1;34m[INFO]\033[0m  $*"; }
warn() { echo -e "\033[1;33m[WARN]\033[0m  $*"; }

kill_by_pidfile() {
  local file="$1"
  if [[ -f "$file" ]]; then
    local pid; pid=$(cat "$file" 2>/dev/null || true)
    if [[ -n "${pid:-}" ]] && kill -0 "$pid" >/dev/null 2>&1; then
      kill "$pid" || true
      info "Killed process $pid from $(basename "$file")"
    else
      warn "PID in $(basename "$file") not running; removing file"
    fi
    rm -f "$file" || true
  fi
}

kill_by_port() {
  local port="$1"
  # macOS uses lsof; Linux usually has fuser/lsof
  if command -v lsof >/dev/null 2>&1; then
    local pids
    pids=$(lsof -t -i :"$port" || true)
    if [[ -n "$pids" ]]; then
      kill $pids || true
      info "Killed processes on port $port: $pids"
    else
      warn "No process found on port $port"
    fi
  elif command -v fuser >/dev/null 2>&1; then
    fuser -k "$port"/tcp || true
    info "Requested kill for processes on port $port via fuser"
  else
    warn "Neither lsof nor fuser found; cannot kill by port $port"
  fi
}

main() {
  # 1) PID files (if we later decide to write them in run.sh)
  kill_by_pidfile "$ROOT_DIR/.pids/backend.pid"
  kill_by_pidfile "$ROOT_DIR/.pids/frontend.pid"

  # 2) Fallback kill by ports
  kill_by_port "$BACKEND_PORT"
  kill_by_port "$FRONTEND_PORT"

  info "Stop complete."
}

main "$@"

