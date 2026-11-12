#!/bin/bash
# Integra una lección web nueva de un carril cuyo informe trae las filas del registro en su §5.
# bash web-nueva.sh <sha> <LEC> <informe relativo a cantu-lessons> "<título>" "<carril·nn>" "<línea del veredicto>"
set -e
SHA=$1; LEC=$2; INF=$3; TIT=$4; CAR=$5; VER=$6
SPU=$(cd "$(dirname "$0")" && pwd)   # esta carpeta: herramientas de la cabina
TMPD=$(mktemp -d)
W=/c/Users/chris/Documents/AIW_Workspace
cd $W && timeout 900 node _scratch/cabina-lecciones/integrar.mjs $SHA --sin-publicar 2>&1 | grep -E 'cherry-pick|empujado' | head -3
cd $W/projects/cantu-lessons && git pull -q --rebase
node $SPU/filas.mjs $INF $LEC
git commit -q -m "cabina: registro, las filas de $LEC en slide ($CAR)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -- docs/BLOQUES-PROVISIONALES.md && git push -q origin HEAD:main
REG=$(git log --oneline -1 | cut -c1-8)
CARP=$(node -e "const c=JSON.parse(require('fs').readFileSync('lecciones/codigos.json','utf8'));const s=JSON.stringify(c);const m=s.match(new RegExp('\"$LEC\",\"carpeta\":\"([^\"]+)\"'))||s.match(new RegExp('\"$LEC\"[^}]*?\"carpeta\":\\s*\"([^\"]+)\"'));console.log(m?m[1]:'')")
SLUG=$(echo "$CARP" | sed "s/^$LEC-//" | tr '-' '_')
D=$(ls drafts/web/matematicas_paa/*/$SLUG.web.draft.json | head -1)
timeout 600 node tools/revision/build.mjs $D --slide 2>&1 | grep -E "$LEC.*(VERDE|AMARILLO|ROJO)|✖" | head -3 | cut -c1-220
cd tools/revision && timeout 300 node publicar-paginas.mjs $LEC 2>&1 | grep "· $LEC" | head -1 | cut -c1-200
cd $W/projects/cantu-revisiones && git add -- lecciones && git commit -q -m "lecciones: $LEC «$TIT», las slides ($CAR)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -- lecciones && git fetch -q && git rebase -q origin/main && git push -q origin HEAD:main
PAG=$(git log --oneline -1 | cut -c1-7)
cd $W/projects/cantu-lessons && H=$(date +%H:%M)
printf '%s\n' "## $LEC «$TIT», las slides, publicadas ($(date +%F), $H)" "" "- **$CAR** ($SHA): $VER" "  - Filas del registro, puestas por la cabina ($REG). Páginas: $PAG." > $TMPD/nota.md
git pull -q --rebase && node "$SPU/anexar-veredicto.mjs" $TMPD/nota.md "$SPU/vacio.txt" | tail -1
git commit -q -m "cabina: veredicto, $LEC en slides

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -- docs/veredictos/2026-10-16-lectura-de-las-seis-lecciones-web.md 2>/dev/null && git push -q origin HEAD:main
T="$LEC slides publicadas ($CAR; páginas $PAG)"
printf '%s' "$T" > $TMPD/relevo.txt
cd $W/projects/aiw-console && git pull --rebase -q && node "$SPU/relevo.mjs" context/handoffs/cantu-lessons.md $(date +%H:%M) $TMPD/relevo.txt | tail -1
git commit -q -m "cantu-lessons: relevo, $LEC en slides

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -- context/handoffs/cantu-lessons.md
if [ "$(git log --oneline origin/main..HEAD | wc -l)" = 1 ]; then git push -q origin HEAD:main; echo "relevo empujado"; else echo "relevo NO empujado: commits ajenos"; fi
echo "LISTO $LEC registro $REG páginas $PAG"
