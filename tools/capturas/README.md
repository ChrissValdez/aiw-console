# tools/capturas — capturas de la consola, antes y después

Herramientas para fotografiar las superficies de la consola y montar una página que las compara lado a lado. Las
escribió el taller de `RUN-CONSOLE-UI-POLISH-001` (`#78`, 2026-10-21) y sirvieron para las dos QA visuales de ese run
(`context/aiw-console/records/REPORTE-TALLER-78-2026-10-21.md` y `REPORTE-AMPLIACION-78-2026-10-21.md`).

**Copiadas tal cual el 2026-10-29** desde `_scratch/pulido-ui-78/` por la mudanza a la PC (D-081,
`context/cabinas/MUDANZA-2026-10-28.md`): `_scratch` es desechable y estas herramientas se van a reusar, por ejemplo al
reanudar `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001`, cuya guía hay que volver a medir. No se ha cambiado ni un byte.

## Qué hay

| fichero | de dónde viene | qué hace |
|---|---|---|
| `shot.mjs` | `_scratch/pulido-ui-78/ampliacion/herramientas/shot.mjs` | captura cada «shot» de un plan. Es la versión de la ampliación: la del pulido más las opciones `full` y `measure`. Su primera línea cita la ruta de `_scratch` de la que salió |
| `build-comparison.mjs` | `_scratch/pulido-ui-78/herramientas/` (idéntico en las dos carpetas) | monta una página autocontenida con cada par antes/después |
| `planes/pulido-78/` | `_scratch/pulido-ui-78/herramientas/` | los 58 shots del pulido, sus notas y un registro para el fixture de lotes |
| `planes/ampliacion-78/` | `_scratch/pulido-ui-78/ampliacion/herramientas/` | los shots del Project Portfolio y las medidas de altura de las tarjetas a varios anchos |

## Cómo se usa

```text
node tools/capturas/shot.mjs <plan.json> <carpeta-de-salida>
node tools/capturas/build-comparison.mjs <notes.json> <carpeta>/comparacion.html
```

`build-comparison.mjs` lee las imágenes de `<carpeta>/antes/` y `<carpeta>/despues/`.

## Lo que hay que saber antes de usarlas

- **Cero dependencias**: Node con `WebSocket` nativo (Node 22 o más nuevo) y Chrome. La ruta de Chrome por defecto es
  la de Windows; otra se pasa con la variable `CHROME`. `ONLY` limita a unos shots y `SETTLE` cambia la espera.
- **Los planes son de la interfaz del 2026-10-21.** Llevan selectores y pasos de aquella consola, y el propio `#78`
  quitó superficies del Portfolio. Antes de reusarlos, se comprueba cada selector contra el código del día.
- **Los planes fijan los puertos `8797` y `8800`**, y `planes/pulido-78/batches-registry.json` lleva una ruta absoluta
  de Windows al fixture `tests/fixtures/batches/project`. Hay que ajustarlos a la máquina y a los puertos libres.
- **Las capturas no van a git.** Pesan (las del `#78` eran unos 33 MB) y un repo no olvida. Se escriben fuera del repo
  y se tratan como desechables; lo que se guarda es el veredicto del operador.
- `shot.mjs` crea un perfil de Chrome (`.chrome-profile-<puerto>`) junto a la carpeta de salida.
