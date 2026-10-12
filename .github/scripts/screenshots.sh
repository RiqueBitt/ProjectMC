#!/usr/bin/env bash
# ProjectMC: abre o app de verdade e captura as telas principais.
source "$(dirname "$0")/screenshots-common.sh"
"$APP" --no-sandbox > "$OUT/app.log" 2>&1 &
APP_PID=$!
sleep 30
maximize "ProjectMC"
shot inicio 2
sleep 15; shot inicio-2 1
key Tab; key Return; shot passo-1 4
key Tab; key Return; shot passo-2 4
finish
