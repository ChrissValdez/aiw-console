#!/bin/bash
# uso: cierra.sh <qo> <run_id> <closeoutFile>
export W=$HOME/mnt/AIW_Workspace
cd $W/_scratch/cabina-cs-20260930
O=$(timeout 80 node status.mjs $1 $2 active completed dry "" $3 2>&1); echo "$O" | grep -E "guarda|ABORT" | cut -c1-160
B=$(echo "$O" | grep -o 'sha256:[0-9a-f]*' | head -1); [ -n "$B" ] || { echo SIN-BASELINE; echo "$O"|tail -3; exit 3; }
timeout 90 node status.mjs $1 $2 active completed apply $B $3 2>&1 | grep -E "md5|campos|ABORT" | cut -c1-160
