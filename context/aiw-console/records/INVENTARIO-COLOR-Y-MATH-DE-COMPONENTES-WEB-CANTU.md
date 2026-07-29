# Inventario de color y math de los componentes Web (Cantu Studio)

Encargo de taller. Carril DEVELOPMENT. Ejecutado el 2026-07-29.

## 1. Guarda de identidad del run

Derivado del canónico `.aiw/roadmap/roadmap.json` por `queue_order`, no por nombre.

- **`queue_order` 12** resuelve a **un solo run**: `RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001`.
- **Ubicación**: objetivo `O1` «Cantu Studio Web Components», fase `O1.P1` «Web Component Revalidation Baseline».
- **Título verificado**: «Inventory the Web components and their color and math integration points». Coincide con el encargo. **La guarda pasa.**
- **Carril**: el run **no lleva campo `lane`**. Solo 23 de 73 runs lo llevan, y los 23 son `DOCUMENTATION`. `DEVELOPMENT` es el carril `default: true` del canónico, así que el run es DEVELOPMENT por omisión, no por declaración. Cifra medida, no heredada.
- **`status` actual**: `active`. **No se tocó.**

## 2. Los tres campos del run, verbatim

**`title`**

> Inventory the Web components and their color and math integration points

**`summary`**

> Normalize the inventory the WEB ENGINE dossier already produced into the two fields this run needs, register it, and retire the older status-group classification it replaces.

**`full_description`**

> The read of the real component code that this run was written to perform has already happened. docs/archive/rewrite-dossiers/WEB-ENGINE-CODE-AUDIT-DOSSIER.md, 177720 bytes, dated 2026-07-11 in its own header, audited src/builders/web/ and carries a component inventory at code level in its Section 7, whose Section 7.5 summary table lists exactly the seventeen author-pipeline component types with their renderer file. What it does not carry is this run's shape: that table records registry, renderer, schema, editor and defaults per component, not the two fields this run needs, which are whether the component reads the shared palette or carries hardcoded or local colors, and whether it has a math integration point. So the work is to normalize the dossier's findings into those two fields per component, verifying each against the code rather than copying the dossier forward, and then to register the result: the dossier declares itself DRAFT EVIDENCE, internal working material, not documentation, not registered, and no entry in .aiw/docs/docs_index.json points at it. Then retire the older status-group classification this inventory replaces, which is still live and still incomplete in .aiw/state/component_status.json: sixteen component_id entries, with columns missing as the seventeenth. This Run produces and registers the inventory and retires the older classification; it audits, repairs, and documents nothing, and it assigns no component status.

**Contradicción encargo vs run: ninguna.** El run pide exactamente lo que el encargo describe, incluida la prohibición literal de auditar, reparar y documentar («it audits, repairs, and documents nothing, and it assigns no component status»).

**Lo que el run pide y el encargo no nombra**, entregado igual: el run cifra el dossier en **177720 bytes** y lo fecha **2026-07-11 en su propia cabecera**. Verificado: 177720 bytes exactos en disco.

## 3. Cifras del ticket, verificadas

| Cifra del ticket | Real | Veredicto |
|---|---|---|
| `component_status.json` con 16 de 17, falta `columns` | 16 entradas, `columns` ausente | correcta |
| `docs_index.json` con 147 entradas | 147 antes, 148 después | correcta |
| Validador «Component statuses: 16» | 16 antes y después | correcta |
| Dossier ~177 KB | 177720 bytes | correcta |
| Math §3 corregida hoy: 230 comandos, 12 entornos, 27 bloqueados | leído de disco, coincide | correcta |
| Contrato de color: seis decisiones abiertas | seis | correcta |
| Contrato de math: ocho decisiones abiertas | ocho | correcta |
| Dossier no registrado en el índice | 0 entradas apuntan a `rewrite-dossiers/` | correcta |

**Medido, no heredado**: 7 objetivos / 28 fases / **73 runs**. El run 12 es la última dependencia pendiente de **17 runs**, no solo del 13: los `queue_order` 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43 y 45 lo declaran en `depends_on`. Los 17 están en `planned`.

## 4. Los diecisiete, medidos contra código vivo

Los 17 salen de `compileWebBlock` (`compiler.js:1059-1168`), no del dossier. Coinciden uno a uno con la §7.5 del dossier, que se usó como punto de partida y se re-midió entera.

**Campo de color** — clases asignadas por lo que emite el compilador, no por lo que muestra el editor:

- **Resuelven contra la paleta activa (3)**: `header`, `list`, `card`.
- **Preservan hex de autor sin resolver (3)**: `iconList`, `hierarchy`, `visual`.
- **Solo `variant` contra mapa hardcodeado (7)**: `callout`, `details`, `rule`, `table`, `split`, `conceptGrid`, `timeline`.
- **Solo propaga (1)**: `columns`.
- **Sin superficie de color alcanzable (3)**: `narrative`, `arithmetic`, `video`.

**Campo math** — 6 con punto de integración, 11 sin él:

- **Superficie A, LaTeX saneado (1)**: `rule`.
- **Superficie B, texto opaco (5)**: `table`, `arithmetic`, `split`, `timeline`, `hierarchy`.
- **Sin campo math (11)**: los otros once.

**Ninguno quedó sin clasificar en ningún campo.** Los 17 tienen clase de color y clase de math, con `archivo:línea` del renderer y de la rama del compilador.

## 5. Divergencias declaradas: gana el disco

Cuatro lecturas del código refinan lo que dicen los contratos. **Ninguno de los dos contratos se editó.**

1. **El mapa hardcodeado no es uno solo.** El contrato de color §5 dice que todo renderer no reconciliado resuelve contra `src/builders/web/partials/commons.js`. Tres no lo hacen: `narrative` (`renderNarrative.js:19-28`) y `timeline` (`renderTimeline.js:10-14`) llevan mapas literales locales, y `conceptGrid` lee un tercero desde `src/design/tokens/tokens.js`. El efecto que describe el contrato no cambia; el archivo fuente sí.

2. **`narrative` no tiene superficie de color en absoluto.** `draftSchema.js:720-725` no tiene `variant` y `compiler.js:1086-1092` no lo emite. El mapa de variantes del renderer es inalcanzable desde el pipeline de autor: todo `narrative` compilado renderiza en el default `meta`.

3. **`success` llega a `ctx` por otra ruta que la del contrato.** El contrato de color §5 y su decisión abierta 4 lo explican por el fallback de paleta. Medido: el compilador **nunca llama al resolvedor de paleta** para `detailsVariant` — `compiler.js:1038` emite el valor crudo, y `renderTimeline.js:274` solo prueba `wrn`. `success`, `def` y `ctx` caen todos en el mismo `#5E81AC` hardcodeado. Mismo resultado visible, mecanismo distinto.

4. **Las tablas del contrato de color no son exhaustivas sobre los 17.** Sus §3 y §4 cubren siete kinds; faltan diez. El inventario cubre los diecisiete: cerrar ese hueco es para lo que sirve. La §5 del contrato de math sí era exhaustiva y coincidió fila por fila.

**Hallazgo adicional no pedido**: seis campos que el engine lee y el pipeline de autor no puede producir (`conceptGrid.items[].math`, `timeline.steps[].preMath`, `.math_mobile`, `.webDetails`, `narrative.variant`, `hierarchy.nodes[].variant`, `arithmetic.themeColor`). Van a la §5 del artefacto como hueco medido, no como defecto.

## 6. «Replaces the older status-group classification»: medido, NO ejecutado

**La retirada está bloqueada por medición, y se dejó como decisión de cabina.**

`tools/project-console/validate-project-console-state.mjs:709-732` **hardcodea dieciséis `component_id` obligatorios** y llama `fail()` por cada uno ausente. Vaciar o borrar el archivo pone el validador en rojo dieciséis veces.

Consumidores medidos:

| Consumidor | Cómo lo usa | Efecto de retirarlo |
|---|---|---|
| Validador, `validate-project-console-state.mjs:155,703-748,2049` | lee y asegura 16 ids + 11 claves por entrada | **rojo, 16 fallos** |
| Consola, `docs/project-console/assets/project-console.js:5,3035,3053` | lo hace fetch y muestra el conteo | mostraría 0, no rompe |
| `.aiw/views/project_console.snapshot.json` | lleva `components_tracked: 16` **independiente**, exigido por el validador | quedaría mintiendo |
| Editor | **ninguno** | - |
| Tests | **ninguno** | - |

**Además, los dos son disjuntos**: el inventario mide integración de color y math; el archivo registra QA, reparación, docs y certificación por componente. **El artefacto no sustituye nada de lo que ese archivo afirma**, y lo declara explícitamente en su §7, junto con qué haría falta para retirarlo: una edición coordinada de la lista del validador, la ruta de lectura de la consola y el resumen del snapshot, en un solo run.

**Fuente de status mientras tanto**: sin cambio, `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md`.

## 7. `columns`: declarado, no inventado

`columns` no tiene entrada en `.aiw/state/component_status.json`. **No se creó.**

El hueco es **consistente, no deriva**: la lista de obligatorios del propio validador (`:709-726`) también nombra los mismos dieciséis y también omite `columns`, y el snapshot reporta dieciséis por su cuenta. Los tres concuerdan entre sí y discrepan de los diecisiete kinds que acepta el compilador. No se supuso status para `columns`.

## 8. Defectos: verificados y dejados en pie

Los cuatro que el encargo nombra **siguen ahí**, todos verificados el 2026-07-29:

| Defecto | Evidencia | Estado |
|---|---|---|
| `hierarchy` emite `nodes[].math` sin delimitadores | `renderHierarchy.js:174,197` | sigue |
| `conceptGrid` en categoría math sin campo math | `blockCatalog.js:96-98`; `compiler.js:385-396` | sigue |
| Alias `success` de `detailsVariant` renderiza en color `ctx` | `compiler.js:55`; `draftSchema.js:482`; `renderTimeline.js:271-278` | sigue |
| `callout` con patrón de regresión de paleta | `compiler.js:1077-1084`; `renderCallout.js:21-28` | sigue |
| `timeline.detailsVariant` con patrón de regresión de paleta | `compiler.js:1038`; `renderTimeline.js:271-278` | sigue |

**Cinco más nombrados por primera vez**, por la misma medición: `details`, `rule`, `table`, `split` y `conceptGrid` cargan el mismo patrón de regresión de paleta. **Ninguno reparado.** Cada reparación es del run de su componente.

## 9. Elección de ruta y formato del artefacto, justificada

**Ruta**: `docs/reference/REFERENCE-WEB-COMPONENT-COLOR-AND-MATH-INVENTORY.md`.

- `DOCUMENTATION-CANONICAL-MODEL.md` §2 asigna «API contracts» a la clase **REFERENCE**, en `docs/reference/`, «verifiable against code». Es exactamente el género: medición sobre código, consumida por runs.
- La misma §2 reserva `docs/components/web/` para la guía de autor por componente. Esto no es un packet.
- **Precedente de esta sesión**: los dos contratos que reconcilia viven ahí, con la misma cabecera, la misma forma de entrada de índice y el mismo `source_role` por documento.
- Blueprint: nombre **UPPERCASE-KEBAB** (OQ-A), banner de status §4a, inglés ASCII §4f/OQ-D, rutas repo-relativas completas §4c, esqueleto REFERENCE §5.2.

**Consumible sin abrir los 177 KB**: **237 líneas**, bajo el tope duro de 250 del §4b. Las tres tablas dan renderer, clase de color y punto math con `archivo:línea` para los diecisiete.

**Verificado**: 0 caracteres no-ASCII, sin emoji, sin versiones manuales.

## 10. Índice: edición quirúrgica

- **Respaldo md5 fuera del repo**, antes de tocar: `157eabdee5652310cbd4f4ba3148c51e`, copiado al scratchpad de sesión.
- **Roundtrip byte-exacto verificado antes de escribir**: el archivo usa **CRLF** y cierra con CRLF. `JSON.stringify(obj, null, 2)` con LF→CRLF más CRLF final reproduce los 316915 bytes **exactos**. Se abortaba si no.
- **Diff a nivel de entradas**: 147 → 148. **1 ruta añadida, 0 eliminadas, 0 modificadas.**
- **Diff no-ASCII**: **1 → 1**. El único carácter no-ASCII del archivo es una raya larga preexistente en las notas de otra entrada; sobrevivió intacta. La entrada nueva es ASCII puro.
- **Posición**: índice 101, junto a sus hermanas REFERENCE.
- Escritura re-leída y comparada byte a byte tras guardar.

## 11. Validador: EXIT 0 antes y después

Por la vía que no escribe: `node tools/project-console/validate-project-console-state.mjs`.

| Métrica | Antes | Después |
|---|---|---|
| Exit code | **0** | **0** |
| Objetivos / fases / runs | 7 / 28 / 73 | 7 / 28 / 73 |
| Docs indexed | 147 | **148** |
| Curated primary-visible | 59 de 147 | 60 de 148 |
| **Component statuses** | **16** | **16** |
| Git provenance episodes | 9 | 9 |
| Avisos | 1, no bloqueante | 1, no bloqueante |

El único aviso es el de la arista externa (`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` → `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`), no bloqueante y no resuelto aquí.

## 12. Superficies disjuntas y `.project/`

**cantu-studio, md5 antes y después, sin cambio**:

- `.aiw/roadmap/roadmap.json`: `f1b90e724b9ec15d8704d2dba4099ba3`
- `.aiw/state/component_status.json`: `f591165bbf19862b04433129d9edf2cb`
- `REFERENCE-COLOR-PALETTE-COMPATIBILITY.md`: `9d2affcd85f18fda92032b341e6136f8`
- `REFERENCE-MATH-FORMULA-COMPATIBILITY.md`: `cb24e85775adf05ed2017a5ae4cb0698`
- `WEB-ENGINE-CODE-AUDIT-DOSSIER.md`: `1cfeb15b7367a3006329b45e23159694`

**`.project/` de cantu-studio: NO se re-emitió, y no se movió solo.** `mtime` idéntico al de apertura, `2026-07-29 04:06:19`, en los seis archivos. Los dos que se tomaron como base al abrir siguen iguales: `.project/roadmap.json` `1c20e965aea5217b02eb8a0d53e0f32f`, `.project/docs_index.json` `a108b0cf0498fc04f87ea3b0ad1f0604`. **Ningún actor concurrente lo tocó en esta ventana.**

**aiw-console, no tocado**: `roadmap/roadmap.json` `f299d968fdf781bf31863d696bd9610e`, `context/DECISIONES.md` `3f6bdf8816a0b43818519eb3582f6511`. Su `.project/` está re-emitido sin commitear con `mtime` `2026-07-29 03:51`, tal como avisaba el encargo; **no se tocó**. `CONTRATO.md` no existe en ese proyecto; el archivo equivalente es `context/DECISIONES.md`, cuyo md5 queda arriba.

**No se ejecutó git en ninguna forma.** No se levantaron servidores. No se corrieron suites.

## 13. Archivos escritos por este encargo, y ninguno más

| Ruta | Acción |
|---|---|
| `projects/cantu-studio/docs/reference/REFERENCE-WEB-COMPONENT-COLOR-AND-MATH-INVENTORY.md` | creado, 237 líneas |
| `projects/cantu-studio/.aiw/docs/docs_index.json` | 1 entrada añadida, 147 → 148 |
| `projects/aiw-console/context/aiw-console/records/INVENTARIO-COLOR-Y-MATH-DE-COMPONENTES-WEB-CANTU.md` | este record |

**Tres archivos. Ninguno más.** Ningún renderer, schema, test o paleta tocado. Ningún documento movido ni desarchivado. Ningún contrato editado.

**Records en el directorio**: 63 antes, **64 con este**. Nombre sin colisión, verificado contra el listado.

## 14. QA humana: no hace falta

Este run es medición read-only sobre código, sin superficie de autor: no hay nada que un operador pueda probar a mano que la lectura del código no diga mejor. **No se preparó QA humana y no se recomienda.** El encargo pedía parar y explicar si la conclusión era la contraria; no lo es.

## 15. Status en el que debe quedar el run

**El run NO se cerró.** No se tocó `status`, `progress` ni `closeout_result` de ningún run.

**Declaración**: `RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001` debe quedar en **`ai_review`**. Produjo y registró su artefacto, pero **no cumplió una de sus dos mitades declaradas**: la retirada de la clasificación vieja está medida y bloqueada, no ejecutada, y esa decisión es de cabina. El cierre depende de que el operador acepte que la retirada quedó fuera con la justificación de la §7 del artefacto, o de que abra un run coordinado que toque validador, consola y snapshot a la vez.

## 16. No-claims

- No se certifica nada. Ningún componente, engine ni superficie cambia de status.
- El artefacto no afirma status de componente. La fuente única sigue siendo `COMPONENT_CERTIFICATION_MATRIX.md`.
- Sobre certificación: no es concepto retirado. `GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md` §2 la define como claim que hay que ganar y §3 se titula «Certification gates». Lo deprecado es `certified` como etiqueta primaria de status de un run (`JAME_HUMAN_GATE_POLICY_LITE.md` §9 y §15). Son cosas distintas y aquí no se confunden.
- No se decide ninguna de las seis decisiones abiertas del contrato de color ni de las ocho del de math.
- Nombrar diez defectos es medición, no autorización de reparación.
- El registro en el índice no es certificación y no supersede ningún documento.
