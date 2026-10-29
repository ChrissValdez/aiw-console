# Herramientas de la cabina de LECCIONES

Copiadas tal cual desde `_scratch/cabina/` el 2026-10-28. Son ayudas de medición de la cabina, no código de lecciones.

| herramienta | qué hace |
|---|---|
| `pintar.mjs` | pinta la página web de una lección con el motor de Studio, sin el build completo (su salida era idéntica byte a byte al `web.html` del build). Uso de la cabina de Cowork: `node pintar.mjs <carpeta-salida> Lnn=<borrador> …` |

**No corre tal cual en Windows:** lleva la ruta de la VM de Cowork (`process.env.HOME + '/mnt/AIW_Workspace/…'`). Antes
de usarla aquí, la cabina la adapta y lo dice; si hace falta un cambio de código de verdad, va al ticket de herramientas.
