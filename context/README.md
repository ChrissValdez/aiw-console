# context/ — Contexto de gobernanza de la cabina AIW

Esta carpeta contiene el **contexto de gobernanza** que la cabina (el Project de
Claude) lee: decisiones, estado, roadmap y records de AIW. Vive aquí porque
`aiw-console` es el **único repo sincronizable como knowledge** del Project; por
eso el contexto se centraliza en este repo y no en `aiw`.

## Estos archivos son CANÓNICOS, no copias

Los documentos bajo `context/aiw/` son los originales: fueron **mudados** desde
el repo `aiw` (no copiados). Ya no existen en `aiw`; en su lugar `aiw` conserva
un puntero (`aiw/CONTEXTO.md`) hacia esta ubicación. No hay una segunda copia
viva en ningún otro repo.

## ⚠️ Advertencia: este repo contiene un FORK DESCARTADO de la consola

`aiw-console` **también** contiene un fork de la consola de Cantu que fue
**descartado** por la decisión **D-035**. Ese código de consola **NO es la
consola viva**. La consola viva está en `projects/cantu-studio`.

**Ninguna sesión debe leer el fork de este repo creyendo que es la consola
actual.** El fork permanece en el árbol solo hasta su corte formal (D-035); su
presencia aquí es histórica, no operativa.

## `cantu-studio` todavía no tiene carpeta aquí

No existe `context/cantu-studio/` de forma deliberada. El validador de
`cantu-studio` exige la existencia física de los documentos listados en
`.aiw/docs/docs_index.json`, y mudar uno de ellos lo pondría en rojo. Ese
movimiento queda **pendiente de verificar** cuáles de sus documentos de raíz
aparecen en ese `docs_index.json`; hasta tener ese dato, `cantu-studio` se
inventaría en solo lectura y no se muda nada.

## Contenido actual

- `aiw/DECISIONES.md` — bitácora de decisiones de AIW.
- `aiw/ESTADO.md` — estado actual del proyecto AIW.
- `aiw/AIW_CONTEXT.md` — contexto de gobernanza de AIW.
- `aiw/roadmap_AIW_temp.md` — roadmap de trabajo de AIW.
- `aiw/records/AUDIT-CONSOLE-O4-PHASE0.md` — audit Phase 0 de la consola (O4).
- `aiw/records/HANDOFF-O4-TRAMO1.md` — handoff del tramo 1 de O4.
