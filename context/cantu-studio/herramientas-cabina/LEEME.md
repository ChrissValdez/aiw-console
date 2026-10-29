# Herramientas de la cabina de `cantu-studio`

> Copiadas el 2026-10-29 desde `_scratch/cabina-cs-20260930/`, en la mudanza a la PC (D-081). Copia verbatim
> (comparada con `cmp`): **siguen esperando correr desde `_scratch/cabina-cs-20260930/`** (`abre.sh` y `cierra.sh` hacen
> `cd` allí, y `cadena.mjs` escribe sus cadenas y su respaldo junto a ella y en `_backups`).

**Para usarlas:** cópialas a `_scratch/cabina-cs-<fecha>/` y córrelas desde ahí, con `W=$HOME/mnt/AIW_Workspace`.
Nunca desde aquí: escribirían ficheros de trabajo dentro de `aiw-console`.

| fichero | qué hace |
|---|---|
| `abre.sh <qo> <run_id>` | `planned → active` por la consola: dry-run, baseline, apply, md5 y campos cambiados |
| `cierra.sh <qo> <run_id> <closeoutFile>` | `active → completed`, con el `closeout_result` del fichero |
| `cadena.mjs vN/cadena-vN.json dry\|apply` | inserciones y movimientos en cadena. Las largas agotan 175 s: se parten de 4 en 4 |
| `settext.mjs` | enmienda de `full_description` por sustituciones exactas |
| `status.mjs` | el cambio de status que usan `abre.sh` y `cierra.sh` |
| `valida.mjs` | el validador de arranque: errores, `history`, siguiente `planned` |
| `qa/arma.mjs` | arma borradores de QA |
