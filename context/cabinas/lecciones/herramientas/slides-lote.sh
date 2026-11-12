#!/bin/bash
# Integra un lote de lecciones en slide de un carril: bash slides-lote.sh <informe> "<carril·nn>" <sha…> -- <LEC…>
set -e
INF=$1; CAR=$2; shift 2
SHAS=(); LECS=(); en=s
for a in "$@"; do if [ "$a" = "--" ]; then en=l; elif [ $en = s ]; then SHAS+=($a); else LECS+=($a); fi; done
SPU=$(cd "$(dirname "$0")" && pwd)   # esta carpeta: herramientas de la cabina
TMPD=$(mktemp -d)
W=/c/Users/chris/Documents/AIW_Workspace
cd $W
for s in "${SHAS[@]}"; do timeout 900 node _scratch/cabina-lecciones/integrar.mjs $s --sin-publicar 2>&1 | grep -E 'cherry-pick|ya estaba' | head -1 | cut -c1-140; done
cd $W/projects/cantu-lessons && git pull -q --rebase
for L in "${LECS[@]}"; do node $SPU/filas.mjs $INF $L; done
if ! git diff --quiet -- docs/BLOQUES-PROVISIONALES.md; then git commit -q -m "cabina: registro, las filas de ${LECS[*]} en slide ($CAR)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -- docs/BLOQUES-PROVISIONALES.md && git push -q origin HEAD:main; fi
echo "registro $(git log --oneline -1 | cut -c1-8)"
for L in "${LECS[@]}"; do
  CARP=$(node -e "const s=JSON.stringify(JSON.parse(require('fs').readFileSync('lecciones/codigos.json','utf8')));const m=s.match(new RegExp('\"$L\",\"carpeta\":\"([^\"]+)\"'))||s.match(new RegExp('\"$L\"[^}]*?\"carpeta\":\\s*\"([^\"]+)\"'));console.log(m?m[1]:'')")
  SLUG=$(echo "$CARP" | sed "s/^$L-//" | tr '-' '_')
  D=$(ls drafts/web/matematicas_paa/*/$SLUG.web.draft.json | head -1)
  timeout 600 node tools/revision/build.mjs $D --slide 2>&1 | grep -E "$L.*(VERDE|AMARILLO|ROJO)|✖" | head -2 | cut -c1-200
done
cd tools/revision && timeout 600 node publicar-paginas.mjs "${LECS[@]}" 2>&1 | grep -E "· ALG-" | cut -c1-120
cd $W/projects/cantu-revisiones && git add -- lecciones && git commit -q -m "lecciones: ${LECS[*]}, las slides ($CAR)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -- lecciones && git fetch -q && git rebase -q origin/main && git push -q origin HEAD:main
echo "páginas $(git log --oneline -1 | cut -c1-7)"
