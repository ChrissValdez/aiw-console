#!/bin/bash
# uso: abre.sh <qo> <run_id>
export W=$HOME/mnt/AIW_Workspace
cd $W/_scratch/cabina-cs-20260930
O=$(timeout 80 node status.mjs $1 $2 planned active dry 2>&1); echo "$O" | grep -E "guarda|ABORT|HTTP" | cut -c1-200
B=$(echo "$O" | grep -o 'sha256:[0-9a-f]*' | head -1)
[ -n "$B" ] || { echo SIN-BASELINE; exit 3; }
timeout 90 node status.mjs $1 $2 planned active apply $B 2>&1 | grep -E "md5|campos|cabecera|ABORT|applied" | sed 's/"baseline".*reemit/reemit/'
