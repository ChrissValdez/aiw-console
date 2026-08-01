# Relevo de `cantu-studio` al cierre del 2026-08-01

Reescritura completa de `context/handoffs/cantu-studio.md`. **Encargo sin run**, de
taller. **No se tocó `cantu-studio`**: se leyó para medir.

---

## 0. Resultado en una tabla

| | |
|---|---|
| Archivos escritos | **2** (el handoff y este record) |
| Archivos de `cantu-studio` escritos | **0** — huella de árbol idéntica antes y después |
| Cifras copiadas del ticket | **0** — todas re-medidas en disco |
| Records en `context/aiw-console/records/` antes | **93** |
| Records después | **94** (este) |
| Colisión de nombre | **Ninguna**. El único que contiene «RELEVO» es `CIERRE-REGISTRO-Y-RELEVO-TERCERO.md` |
| Handoff: antes → después | 316 líneas / 18 875 B → **300 líneas / 18 538 B** |
| Git | **No ejecutado en ninguna forma** |
| Suites | **No corridas** |
| Servidores | **No levantados** |

---

## 1. Método

Todo lo escrito en el handoff salió de una de tres vías, y ninguna es el ticket:

1. **El canónico**, `projects/cantu-studio/.aiw/roadmap/roadmap.json`
   (md5 `6d13a7c617801b4b197b6075f418cbac`), recorrido con scripts propios alojados en el
   scratchpad de sesión — **no en ninguno de los dos repos**.
2. **El validador del propio repo por la vía que no escribe**:
   `node tools/project-console/validate-project-console-state.mjs` desde
   `projects/cantu-studio`.
3. **El motor de clasificación de `aiw-console`**,
   `tools/classification/classification.mjs`, importado en lectura y **ejecutado**
   (`deriveSeverity()`, `deriveClosureMode()`) sobre los 46 pendientes.

Cuando algo no se pudo medir en esta sesión, va marcado **`[NO VERIFICADO]`** en el
handoff en vez de omitirse. Hay **uno solo** (§4.1).

---

## 2. Las cifras del ticket, contrastadas una a una

**El ticket es guía, no autoridad.** Se contrastó cada cifra que daba.

| Cifra del ticket | Medido | Veredicto |
|---|---|---|
| «Diecisiete runs cerrados, del `#1` al `#16` más el de MathLive» | 17 `completed`: `#1`–`#16` y `#40` (`RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001`) | **Exacta** |
| «la ampliación de la allowlist de math de 39 a 230 comandos» | no re-medida — no entra en el handoff | fuera de alcance del relevo |
| «los 46 runs pendientes» | 46 `planned` | **Exacta** |
| «la clasificación por `closure_mode`» | `closure_mode` **no es clave de run**: se deriva | **Matizado** — ver §3 |
| «4 fallos previos» de la suite | declarado en record; **no re-medido** (correr suites está fuera de alcance) | **`[NO VERIFICADO]`** |
| «`split` está en el techo con tres valores» | `SPLIT_VARIANT_VALUES = new Set(['ctx','focus','wrn'])`, `compiler.js:66` | **Exacta** |
| «cinco componentes descartando el hex en silencio» | `callout`, `rule`, `table`, `details`, `conceptGrid` | **Exacta** |
| «`component_status.json` tiene 16 componentes frente a 17 packets» | 16 ids, falta `columns`; 17 `.md` en `docs/components/web/` | **Exacta** |
| «los seis huecos abiertos del §17» | `REDISENO-CARRIL-DOCUMENTATION-CANTU.md` §17 lista **6** | **Exacta** |

### 2.1 Las cifras del handoff VIEJO, y por qué salieron todas

Eran del 2026-07-27. Ninguna sigue en pie:

| Handoff viejo (2026-07-27) | Hoy (2026-08-01) |
|---|---|
| 71 runs | **63** |
| 2 `completed` / 69 `planned` | **17 / 46** |
| 150 aristas `depends_on` | **126** |
| `queue_order` 1..71 | **1..63** |
| `DEVELOPMENT` 48 · `DOCUMENTATION` 23 | **52 · 11** |
| `ready_next=9`, `history=2` | **`ready_next=20`, `history=17`** |

El bajón de 71 a 63 y de 23 a 11 en `DOCUMENTATION` es el rediseño del carril
(`REDISENO-CARRIL-DOCUMENTATION-CANTU.md`), que colapsó dieciséis doc-runs en cuatro
lotes y retiró el audit de conjunto. **No se conservó nada «por si acaso».**

Salieron enteras, además, tres secciones del handoff viejo cuyo contenido ya no es
estado de arranque: la tabla de compuertas (`depends_on` que hoy o están cerradas o
viven en el roadmap), los nueve pendientes del operador de aquel tramo (siete
resueltos o superados; los que siguen abiertos se re-midieron y están en la sección
nueva), y el matiz de `ready_next=9` — que existía porque el motor no resolvía la
arista externa y hoy es irrelevante: ese run está `completed`.

---

## 3. `closure_mode` no está en disco — la corrección de vocabulario

El criterio 4 pide «cuántos runs pendientes hay por `closure_mode`». **`closure_mode` no
es un campo almacenado.** El motor lo rechaza como clave de run
(`CLASIFICACION-EMISOR-Y-CONSOLA.md` §D.3) y lo **deriva** de `correctness_model` +
`severity`, con la guarda `external_effects` que **sólo sube**.

Lo almacenado en los 46 pendientes son seis campos —`correctness_model`, `work_type`,
`blast_radius`, `failure_surfaces`, `external_effects`, `classified_at`—, todos con
`classified_at: 2026-08-01T05:45:24.479Z`. **Ninguno sin clasificar.**

Así que la tabla del handoff se produjo **ejecutando la derivación**, no transcribiendo:

| `closure_mode` | pendientes | `DEVELOPMENT` | `DOCUMENTATION` |
|---|---:|---:|---:|
| ATTENDED | 23 | 23 | 0 |
| SEMI_ATTENDED | 17 | 10 | 7 |
| UNATTENDED | 6 | 5 | 1 |
| **Total** | **46** | **38** | **8** |

Severidad: CRITICAL 15 · MAJOR 9 · MODERATE 22 · MINOR 0.

**Coincide run a run** con `CLASIFICACION-DE-LOS-46-RUNS-PENDIENTES-CANTU.md` §4.3, que
lo midió por otra vía el 2026-08-01. Dos mediciones independientes, mismo resultado.

---

## 4. Lo que se midió de primera mano, con su comando

| Afirmación del handoff | Cómo se midió |
|---|---|
| 7 / 28 / 63; 17+46; 126 aristas; `qo` 1..63 denso; 52+11; 0 `barrier` | recorrido del canónico, script en scratchpad |
| `ready_next=20`, `history=17`, aviso no bloqueante | validador, `EXIT 0` |
| 20 elegibles, títulos verbatim | `depends_on` ⊆ `completed`, arista por arista |
| 1 solo elegible en `DOCUMENTATION`; por qué esperan los otros 7 | ídem, con el estado de cada arista |
| `closure_mode` y `severity` | motor de clasificación, ejecutado |
| Mojibake: 32 y 23 líneas | conteo de líneas con `Ã`/`Â`/`â`/`�` en los dos `draftSchema.js` |
| Puntero muerto: 462 apariciones / 112 archivos | `grep -o` y `grep -l` sobre todo el repo, excluidos `.git` y `node_modules`; y la ruta **no existe**, la real es `docs/archive/author-lite/…` |
| 403 líneas inalcanzables | rangos `146-161`, `240-544`, `952-1033` de `blockCatalog.js` (1 176 líneas) = 16+305+82; y **0** referencias a `docs/components/` en `editor-ui/src` |
| `AGENTS.md`: español, 671 líneas, «72 runs» y «49 de 72 / 23» | lectura directa, líneas 70 y 73 |
| 16 statuses vs 17 packets, falta `columns` | lectura de `component_status.json` y `ls docs/components/web/*.md` |
| Compuerta del compilador: `:66`, `:579`, `:985`, `:481-483` | lectura directa de `compiler.js` |
| §5 del contrato de fuente única, verbatim | lectura de `COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md:86` |

### 4.1 Lo único `[NO VERIFICADO]`

**Los 4 fallos de la suite de `cantu-studio`.** Correr suites está explícitamente fuera
de alcance de este encargo, así que la cifra se declara **como la declaró
`TOLERANCIA-DE-CLASIFICACION-EN-CANTU.md` §7** (173 tests, 169 pass, 4 fail:
`clearProgress` 1, `createPhase` 2, `deletePhase` 1) y se marca en el handoff. Lo que sí
se verificó de primera mano es **la causa**: la arista huérfana
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` **sigue sin resolver en el canónico** y el
validador sigue emitiendo su aviso. La condición que produce los cuatro fallos no ha
desaparecido; el conteo exacto de hoy no se midió.

---

## 5. Un matiz que el ticket no anticipaba, y que cambia una frase

El ticket describe la arista externa como viva. **Lo está como aviso, no como
compuerta**: `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` —el run que la
porta— ya está `completed` (`#4`). Así que la arista **ya no gobierna ningún orden**, y
el `ready_next` del validador de Cantu **ya no se queda corto** por no saber resolverla:
da 20, y el conteo sobre el canónico da 20. El aviso, en cambio, sigue emitiéndose y
sigue siendo la causa de los cuatro fallos de suite. El handoff lo dice así.

---

## 6. Qué se dejó FUERA del handoff, y por qué

Criterio 10: el tope es que quepa en una lectura. Lo que se midió y **no** entró:

| Dejado fuera | Por qué |
|---|---|
| La tabla de compuertas `depends_on` del relevo viejo | Es **estado**, y su sitio es el roadmap. La sesión nueva lo lee del canónico, no de aquí |
| El desglose de las trece familias de runs pendientes | Vive entero en `FAMILIAS-DE-RUNS-PENDIENTES-CANTU.md`; el handoff apunta |
| La tabla run-a-run de `severity`/`closure_mode` de los 46 | Ídem, `CLASIFICACION-DE-LOS-46-RUNS-PENDIENTES-CANTU.md` §4.2. El handoff lleva sólo los totales, que es lo que decide delegación |
| Los siete pendientes del operador del tramo anterior ya resueltos o superados | Dejaron de ser ciertos. Criterio 2 |
| El estado de `.project/` y su re-emisión | No es arranque; es operación, y su record ya la fija (`REEMISION-MANUAL-PROJECT-O4-P14.md`). El handoff conserva sólo el puntero |
| Las cifras de la ampliación de allowlist de math (39 → 230) | Es logro de la sesión cerrada, no estado de arranque. Vive en `AMPLIACION-ALLOWLIST-MATH-Y-EDITOR-FORMULAS-CANTU.md` |
| Los 10 hallazgos del Bloque I del contrato de fuente única | Sólo entró el que el ticket nombra (16 vs 17). Los otros nueve viven en su record |
| Las 292 rutas muertas del corpus vivo y las 96 del Blueprint | El ticket pide **un** puntero con su unidad; el resto es materia de `#17` y `#59` |
| Los defectos 1-3, 5-6, 9-10 de `CIERRE-HUECOS…` §7 | No los nombra el ticket y no son arranque |

**Nada de lo dejado fuera es una decisión abierta ni una deriva sin dueño.** Las que
había están las siete en el handoff (cinco decisiones —una de ellas con cuatro
sub-huecos— y seis derivas).

---

## 7. `cantu-studio` NO se tocó — huella de árbol antes y después

Huella tomada sobre **21 345 archivos**, excluidos `.git` y `node_modules`, por dos vías
independientes.

| Vía | Antes | Después | ¿Igual? |
|---|---|---|---|
| md5 de path + tamaño + mtime (21 345 archivos) | `ef8cf513d519d9ac2827036a81ef717a` | `ef8cf513d519d9ac2827036a81ef717a` | **Sí** |
| md5 del canónico `.aiw/roadmap/roadmap.json` | `6d13a7c617801b4b197b6075f418cbac` | `6d13a7c617801b4b197b6075f418cbac` | **Sí** |
| md5 del contenido de todos los archivos | `90b3b4d63972c628f48010151a00f80e` | — | ver nota |

Además de los hashes, se corrió `diff` línea a línea entre las dos listas de 21 345
entradas: **sin diferencias**. Ni un byte, ni un mtime.

Nota sobre la tercera fila: el md5 del contenido completo se tomó **sólo antes** (tarda
varios minutos sobre 21 345 archivos). La huella de path+tamaño+mtime, tomada por
duplicado, es la que cierra el árbol: cualquier escritura habría movido un `mtime` o un
tamaño, y ninguno se movió.

El validador se corrió **por la vía que no escribe** — es la única invocación sobre el
repo de Cantu que ejecuta código, y la huella posterior lo confirma.

---

## 8. Superficies disjuntas con el hilo paralelo

El hilo de `aiw-console` está activo sobre este repo. Se tomó md5 de sus superficies
**antes** de escribir, para poder declarar que no se tocaron.

| Archivo ajeno | md5 antes | md5 después | ¿Igual? |
|---|---|---|---|
| `context/handoffs/aiw-console.md` | `0140f00078ffe5c2c2199b0bbdfab824` | `0140f00078ffe5c2c2199b0bbdfab824` | **Sí** |
| `context/handoffs/aiw.md` | `2b06cf12f2d61dac230ad1ef24007bff` | `2b06cf12f2d61dac230ad1ef24007bff` | **Sí** |
| `context/DECISIONES.md` | `f879e89f640cbac0c933bce659d83327` | `f879e89f640cbac0c933bce659d83327` | **Sí** |
| `context/aiw-console/CONTRATO.md` | `f77ccec64d99f2048d4bde41638cb228` | `f77ccec64d99f2048d4bde41638cb228` | **Sí** |
| `context/aiw/`, `tests/`, `roadmap/`, `.project/` de `aiw-console` | — | — | **No abiertos para escribir** |

**La única superficie compartida reescrita:** `context/handoffs/cantu-studio.md`, que
partía de `27e624da9817f17f832ca077e395389c` y queda en
`80309dbf4e0ea00a1010e5a81484f86f`. Es el handoff de **este** hilo, no el del paralelo.

---

## 9. Archivos escritos por este encargo, y ninguno más

| Archivo | Qué |
|---|---|
| `context/handoffs/cantu-studio.md` | El relevo, reescrito entero. 300 líneas / 18 538 B |
| `context/aiw-console/records/RELEVO-CANTU-AL-CIERRE-2026-08-01.md` | Este record |

**Dos filas. No hay una tercera.** Los scripts de medición se escribieron en el
scratchpad de sesión, fuera de los dos repos.

---

## 10. No-claims

- **No se cerró ningún run**, no se cambió `status`, no se editó ningún roadmap y no se
  re-emitió `.project/` de nada.
- **No se resolvió ninguna decisión abierta.** Se listan con su puntero; son del
  operador.
- **No se reparó ninguna deriva.** Se nombra; no se toca.
- **No se ejecutó Git en ninguna forma**, ni siquiera de lectura.
- **No se corrió ninguna suite** ni se levantó ningún servidor.
- Este record **no certifica** ningún componente, contrato ni superficie.
