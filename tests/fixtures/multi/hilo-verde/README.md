# Nota del telar

`hilo-verde` es un PROYECTO SINTETICO DE PRUEBA. Vive bajo `tests/fixtures/multi/` y existe
para una sola cosa: probar que el shell multiproyecto de la consola puede leer un segundo
`.project/` con `project_id` propio y `taxonomy_model` propio, sin cambios de codigo.

No describe trabajo real. Su `.project/` esta escrito a mano (no emitido) y su vocabulario
de status (`por_hacer` / `haciendo` / `hecho` / `atascado` en los runs; `pendiente` /
`empezado` / `en_marcha` / `atascado` / `hecho` en objetivos y fases) es deliberadamente
distinto del de aiw-console, para que cualquier vocabulario horneado en el shell falle a la
vista.

La tabla de derivacion viaja en `taxonomy_model.derivations` del propio snapshot, como
decidio O4.P2: un lector que la ejecute en orden obtiene el status de cada objetivo y fase.
