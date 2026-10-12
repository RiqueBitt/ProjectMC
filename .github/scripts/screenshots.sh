#!/usr/bin/env bash
# ProjectMC: abre o app de verdade e captura as telas principais.
source "$(dirname "$0")/screenshots-common.sh"
"$APP" --no-sandbox > "$OUT/app.log" 2>&1 &
APP_PID=$!
sleep 30
maximize "ProjectMC"
shot idioma 2
click 1532 956; shot aparencia 3        # Próximo
click 1532 956; shot pasta-de-dados 3
click 1532 956; shot conta 3
click 1532 956; shot apos-assistente 5
key Escape; sleep 2; shot inicio 3
for y in 120 180 240 300 360 420 480; do click 30 $y; shot "menu-$y" 3; done
finish
