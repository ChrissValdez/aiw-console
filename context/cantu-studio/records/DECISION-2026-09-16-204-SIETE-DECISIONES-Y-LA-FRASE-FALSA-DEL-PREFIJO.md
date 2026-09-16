# DECISIÓN 2026-09-16 — `#204`: siete decisiones del operador, y la frase falsa del prefijo

> Run: `#204` «Rename the Core j-prefix render namespace» (`RUN-CANTU-RUNTIME-J-NAMESPACE-RENAME-001`), `active`.
> Origen: informe de la ronda 1, `cantu-studio/docs/_historical_run_record/RUN-CANTU-RUNTIME-J-NAMESPACE-RENAME-001-INFORME.md` (commit `4e5abb09` en `cantu-studio`).
> Escrito por la cabina el 2026-09-16.

## Lo que dijo el operador, VERBATIM

> «vamos con tu recomendacion»

**Aviso de alcance, porque es un acuerdo sobre un relato (guarda H):** el operador aceptó en bloque
las siete recomendaciones que la cabina redactó. No hay detalle por decisión. Lo de abajo es el
texto de la cabina que el operador aprobó, no palabras suyas.

## Las siete, tal como quedaron aprobadas

| # | Pregunta | Aprobado |
|---|---|---|
| D1 | ¿Debe existir `jame-inline-formula-field`? | **A — se borra la clase.** Un escritor, cero lectores medidos |
| D2 | Destino del prefijo `j-` | **`cs-`**, como en `#201` |
| D3 | Las nueve clases `.j-author-lite-*` del renderizador de previa | **A — entran en este mismo run.** ⚠ La subpregunta —¿`cs-studio-*` o solo cambio de prefijo?— **quedó SIN RECOMENDACIÓN de la cabina y por tanto SIN DECIDIR.** Se pregunta aparte |
| D4 | Regenerar las 63 capturas de referencia en bulto | **Sí, solo para este renombrado**, con guarda mecánica: el cambio de cada captura es exactamente la sustitución `j-` → `cs-` y nada más |
| D5 | Qué guarda se cablea | **A + B**: la propiedad del transformador (nunca toca `jame-`) y la igualdad de conjuntos antes/después de la ronda. **C no** |
| D6 | ¿Se corrige la frase falsa en los tres documentos que la llevan? | **No se toca ninguno.** Se corrige hacia adelante: en el informe de `#204` y en este record |
| D7 | Las 15 claves de `LEGACY_PREVIEW_STORAGE_KEYS` | **Se dejan.** Son `jame-`, fuera de este run |

## La corrección que la cabina publica igual de fuerte que el error

**«`j-` es prefijo de `jame-`» es FALSO.** `"jame-".startsWith("j-")` es `false`. La cabina lo
escribió en la enmienda de `#204` el 2026-09-16 **heredándolo sin medir** de
`cantu-studio/docs/archive/ops/NAMING_DISPOSITION_MAP.md:595`, que también lo repiten
`cantu-studio/docs/reference/REFERENCE-NAMING-DISPOSITION-AND-EXCLUSION.md` §4 y
`cantu-studio/docs/_historical_run_record/RUN-CANTU-RUNTIME-JAME-CLASS-RENAME-001-INFORME.md:171-172`.
Lo cazó el taller de la ronda 1, no la cabina. Es la trampa (E) del prompt de arranque.

**Dónde NO se registró, y por qué:** la cabina había dicho que iría también a `DECISIONES.md`. No
va: ese log es transversal y esta frase solo vive en `cantu-studio`. Se declara el cambio en vez
de hacerlo en silencio.

## Hallazgo nombrado, SIN run

`cantu-studio/tools/studio/editor-ui/src/features/editor/hooks/usePreviewPanelSize.js`: si la clave
del ancho del panel **no existe** —navegador nuevo, no solo renombrado— `Number(null) === 0` pasa la
guarda `Number.isFinite` y el panel abre al **mínimo** (896 px), no al valor por defecto. Defecto
preexistente, independiente de `#204`. Abrirlo es decisión del operador.
