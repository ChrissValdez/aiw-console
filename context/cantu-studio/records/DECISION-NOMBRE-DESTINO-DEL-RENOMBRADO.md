# El nombre destino del renombrado interno — decisión del operador

**2026-08-30. Christopher Valdez Cantu.** Sale de la PARADA Y REPORTA del taller de
`RUN-CANTU-INTERNAL-CODE-RENAME-001` (`#180`).

---

## Por qué existe este documento

El run mandaba renombrar «following the frozen disposition map», y **el mapa congelado no
nombra destino**. El taller lo midió, paró, y la cabina lo verificó contra disco:

```
docs/reference/REFERENCE-NAMING-DISPOSITION-AND-EXCLUSION.md:62
| 8 | `tools/author-lite/` | RENAMABLE PATH | 213 files / 2,314 refs | 235 files / 2,846 refs |
    Rename atomically with its launcher references. Highest inbound coupling in the repo. |

:63
| 11 | `src/content/author_lite/` | RENAMABLE PATH | 18 files / 89 refs | 31 files / 221 refs |
    Renamable. Underscore variant; 23 files on disk. |
```

**Dicen que se puede y cómo. No dicen a qué.** Tampoco lo dan la decisión de congelación, ni
el run #74 que difirió el renombrado, ni la decisión de nombres del 2026-07-11 — esa
**excluyó expresamente los identificadores físicos**.

Control positivo de la sonda: el mapa tiene 3 líneas con `->` y el documento de referencia
tiene 0 porque usa tabla, no flechas. **La sonda no estaba ciega; el dato no estaba.**

---

## La decisión

```
tools/author-lite/         ──►  tools/studio/
src/content/author_lite/   ──►  src/content/studio/
```

**Verbatim del operador:** «vamos con tu recomendacion A».

---

## La razón, y viaja con el nombre para que no haya que reconstruirla

**El dato que decidió, medido en disco:**

```
tools/author-lite/editor-ui/index.html:6    <title>Cantu Studio</title>
```

**El nombre en pantalla ya era «Cantu Studio»; el del disco se había quedado en la capa
vieja** — la de `JAME` y `Author Lite`.

- **Nombra lo que la cosa ES**, igual que sus hermanos: `dev`, `roadmap`, `prototypes`,
  `project-console`.
- **No repite.** `projects/cantu-studio/tools/studio/` se lee; `.../tools/cantu-studio/`
  dice el nombre del repositorio dos veces. **Por eso se descartó `cantu-studio`.**
- **El mismo nombre en los dos sitios es deliberado**: `src/content/studio/` es *lo que el
  studio produce* — `drafts`, `exports`, `generated`, `metadata`. Y de paso muere el guion
  bajo, el único de todo el árbol (`src/content/` tiene `lecciones`, `sandbox`, `staging`).
- **Descartado `editor`**: es media verdad, dentro vive también `compiler-api`.
  **Descartado `borradores`**: es falso, ese directorio guarda además exports y generated.
- **La prueba de los seis meses.** `author-lite` ya la falló dos veces: ni es «lite» ni es
  el único autor. `studio` dura lo que dure el producto.

---

## Lo que NO entra, y por qué

- **`tools/prototypes/author-lite-workbench-v1/`** (fila 12: 8 ficheros / 11 refs) —
  **no se renombra.** Su nombre registra de qué fue prototipo; cambiarlo lo hace mentir
  sobre su propia historia. Está aislado y no cuelga de nadie.

  ⚠ **Este punto es INFERIDO, y se declara.** El operador escribió «vamos con tu
  recomendacion A», que nombra la decisión 1. La decisión 2 —recomendación: NO— viajaba
  **dentro del ticket**, y el operador preguntó «¿mando el ticket tal cual?» y lo envió sin
  cambios. **Su envío es la adopción.** Si algún día se desmonta, se desmonta por aquí.

- **Las claves `jame-author-lite-*` de localStorage** — 22 reales, excluidas por nombre en
  el documento congelado. **Tocarlas le borraría borradores al operador.**
- **Los nombres de paquete npm** (`jame-author-lite-root`, `author-lite-workbench-v1`) —
  fila 26: cosméticos, ningún paquete se resuelve por nombre.
- **La prosa de `docs/`**, las clases CSS `jame-smart-formula-*` (fila 19, son runtime), y
  todo lo cubierto por las exclusiones de la Sección 5.

---

## Tres cifras del run que el taller corrigió contra disco

| el canónico / la cabina decían | el disco |
|---|---|
| el ancla del lanzador, **un sitio** | **3 ficheros / 6 sitios** — la prueba de raíz vive en `tools/dev/lib/dev-common.ps1:23-31`, vía `tools\author-lite\package.json`, y el canónico solo nombraba `start-editor.ps1:48` |
| «en los runs anteriores fueron 3 árboles» | **37 de los 63** derivan su nombre de fichero de `src/content/author_lite` vía `fixtureSlug` |
| — | **un cerrojo en la propia suite**: `cantuStudioRenameAuthorFacingSurfaces.test.mjs:164` afirma que existe `tools/author-lite/editor-ui/index.html`. Sin enmendarlo en el mismo cambio, la suite cae |

**La del ancla es de la cabina: la heredó del texto del run sin medirla.** La de los árboles
salió porque el ticket la puso explícitamente a medir. Es la diferencia entre las dos.

⚠ **Y el fichero del ancla es PowerShell y usa separador `\`.** Una sonda escrita solo con
`/` no lo ve.

---

## Un hallazgo de otra superficie, que no es de este run

`tools/roadmap` viene **168/173, con 5 fallos preexistentes** contra el canónico real, sin
que nadie tocara nada. **Son guardas del propio motor de roadmap fallando en silencio.**
No se arreglan de rebote en `#180` y quedan nombradas aquí para que no se pierdan.
