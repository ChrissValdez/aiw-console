# Prompt de reinicio — hilo `cantu-studio`

> Actualizado por la cabina el **2026-08-16**. **Se pega tal cual al abrir la sesión nueva.**
> El operador lo pidió como parte fija del cierre: *«siempre que cerremos sesion, me generas
> (actualizas) el handoff y el prompt de reinicio»*.

---

```
Hilo cantu-studio. Eres la cabina.

ARRANQUE, en este orden y midiendo, no suponiendo:

1. Deriva la ruta de montaje del workspace. No la heredes de ningun documento.
2. Comprueba .git/index.lock en los cinco repos CON ls, nunca corriendo git para
   averiguarlo. Si hay alguno, borralo y declaralo.
3. Prueba la capacidad: que se lee el workspace, que git log responde, que el
   borrado esta habilitado y que .git es escribible. Si algo falla, declara modo
   ESPEJO.
4. Lee tu relevo desde disco: projects/aiw-console/context/handoffs/cantu-studio.md
   Y CONTRASTA SUS CIFRAS CONTRA EL CANONICO. Gana el disco.
5. El canonico es projects/cantu-studio/.aiw/roadmap/roadmap.json -- con .aiw/ --
   y su forma es objectives[].phases[].runs[]: no hay runs en la raiz.
   .project/roadmap.json es la proyeccion emitida, no la fuente.
6. Reporta el estado en una tabla, con la hora de medicion.

DONDE QUEDAMOS: #104 RUN-CANTU-SLIDE-TITLE-SLIDE-AUTHORABLE-001 esta ACTIVE --
«Make the Portada a real editable block created with the presentation». El ticket
ya se entrego y el taller pudo haberlo ejecutado. Al terminar el arranque,
PIDEME EL RESULTADO DEL TICKET: te lo voy a pegar justo despues de este prompt.

Al cerrar sesion, actualizas el handoff y este prompt sin que te lo pida.
```

---

## Lo que la sesión nueva debe saber sin tener que leerlo todo

**El estado al cerrar:** `136 runs` · `completados 104` · `densidad 1..N` · **un solo activo, el
`#104`** · canónico `d320d2ca` · **1 commit sin publicar** al escribir esto.

**Respaldo vivo que NO se borra** mientras `#104` siga abierto:
`_backups/roadmap.cantu-studio.20260816-151726.pre-titleslide.json`.

**La vía de escritura del canónico es la consola**, levantando `serve.mjs` y haciendo POST **en la
misma llamada de bash** —los procesos de fondo no sobreviven entre llamadas—, con dry-run primero
y `baseline` en el apply.

**La suite completa no cabe en una llamada de la cabina:** se mide por lotes, y
`webCorpusFixtureNet.test.mjs` no cabe ni solo. **1499 / 1494 / 5** al cerrar, y **los cinco
fallos tienen TRES causas**, no una — una de ellas, `C5 [SENTINEL]`, está roja **simplemente
porque hay un run abierto**.

**Y el ciclo:** el run se abre en el turno 1 con su ticket, se mide y se commitea en el turno 2
**sin cerrarlo**, y **se cierra en el turno 3 con el veredicto del operador**, escrito a disco
verbatim. Antes de cada ticket: **modelo, esfuerzo y sesión**.
