# RECORD — publicación de la especificación de clasificación de runs

Estado: RECORD de ejecución, fechado **2026-07-30**. Registra qué se transcribió,
de dónde, qué se buscó y no se encontró, y qué NO se hizo. **No repite las tablas
del sistema: apuntan a `context/CLASIFICACION-DE-RUNS.md`, que es el documento
normativo.** Dos copias de una tabla de derivación son dos verdades en cuanto una
se edite.

Run que lo produce: **`RUN-CONSOLE-RUN-CLASSIFICATION-SPEC-001`**, `queue_order`
**39**, derivado de `roadmap/roadmap.json` y no tecleado de memoria. Guarda de
título verificada: su `title` es exactamente «Publish the run classification
specification and register it as a transversal decision».

**Encargo de PAPEL.** No se añadió ningún campo a ningún esquema, no se clasificó
ningún run, no se tocó código, no se tocaron tests, no se corrió la suite y no se
corrió git en ninguna forma.

---

## 1. Qué se escribió

| Archivo | Acción |
|---|---|
| `context/CLASIFICACION-DE-RUNS.md` | **NUEVO** — el documento canónico |
| `context/DECISIONES.md` | **APPEND** de una entrada al final: **`D-057`** |
| `context/handoffs/aiw-console.md` | **SUSTITUCIÓN** de una sección por un puntero |
| `context/aiw-console/records/PUBLICACION-CLASIFICACION-DE-RUNS.md` | **NUEVO** — este archivo |

Ningún otro archivo del repo se tocó.

## 2. Qué se transcribió y de dónde

**Fuente del SISTEMA — una sola, y era la única copia existente:**
`context/handoffs/aiw-console.md`, sección **«EL SISTEMA DE CLASIFICACIÓN —
PROVISIONAL, y es la excepción declarada»** (líneas **149-199** del archivo tal
como estaba antes de esta ejecución). De ahí salen, transcritos sin pérdida y sin
añadidos: los cinco campos almacenados con sus valores admitidos y `classified_at`;
la nota de que **todos** son opcionales en el esquema; que `blast_radius` se mide
contando consumidores presentes y planificados; que `external_effects` es lista de
guarda vacía por defecto; que el validador **reporta** los runs vivos sin
clasificar y **no rechaza**; la tabla de `severity` (`work_type` × `blast_radius`)
con el ajuste único de `failure_surfaces` saturando entre `MINOR` y `CRITICAL`; la
derivación de `closure_mode` con la guarda de `external_effects`; las tres
combinaciones ilegales; que `severity` y `closure_mode` son derivados y nunca se
almacenan; la tabla `care_budget`; y el régimen de los `completed`.

**Fuente del ALCANCE y del ENCUADRE:** el `full_description` del run
`queue_order` **39** en `roadmap/roadmap.json` (**`:685`**). De ahí salen: dónde
vive el documento y por qué es transversal; que la clasificación es del run y no
del repo; que existen **cuatro vocabularios en competencia** para el eje de
delegabilidad y que un run `planned` del roadmap de `aiw` está a punto de construir
uno; la procedencia (nació en el hilo de `cantu-studio`, se cerró en la auditoría
de cabina del 2026-07-29/30, existía solo como texto pegado en dos conversaciones);
que **no va en ningún handoff**; y la declaración de delegabilidad de `aiw` —todo
run de su roadmap es manual bajo la regla anti-auto-hosting, con `aiw-console` como
excepción explícita—, **tomada de ahí y no de memoria**.

**Fuente del FORMATO y del NÚMERO de la decisión:** `context/DECISIONES.md`.

**Nada fuera de esas tres fuentes se escribió.**

## 3. El número real de la decisión — derivado de disco

**La última entrada era `D-056`** (`## D-056 — 2026-07-28 — …`, línea **1964** del
archivo antes del append), exactamente como se esperaba. **La entrada nueva es por
tanto `D-057`**, y quedó en la línea **2056**.

Conteo sobre disco al terminar: **2135 líneas**, **59 encabezados `## `**, de los
cuales **58 son entradas `D-*`** —las 57 previas, que incluyen `D-010-enmienda`,
más `D-057`— y **uno no lo es**: `## Doctrina H1 — 2026-07-10 — Guardias como
segunda línea`, que es doctrina numerada aparte y no una entrada `D-`.

**Ninguna entrada anterior se editó.** El append es la única escritura sobre el
archivo, y `D-057` se apoya en el precedente de corrección hacia adelante de
[[D-045]] y [[D-056]].

## 4. Las tres reglas mecánicas para runs mixtos — BUSCADAS, NO ENCONTRADAS

El `full_description` del `#39` afirma que este run publica «**the three mechanical
rules for mixed runs**». **No están en disco.** El documento canónico lleva por
tanto la sección **«Runs mixtos — PENDIENTE»**, que declara el hueco y remite a
este record. **No se reconstruyeron, ni siquiera por coherencia con el resto del
sistema.**

### 4.1 Procedimiento seguido, en orden

**(a) Se leyó el handoff COMPLETO**, no solo la sección del sistema:
`context/handoffs/aiw-console.md`, **456 líneas**, íntegro. **Las reglas no
aparecen en ninguna sección.**

**(b) Se buscó en `context/aiw-console/records/` y en `context/DECISIONES.md`**, y
de hecho en todo el repo. Comandos, todos vía la herramienta de búsqueda
(ripgrep), con la raíz `projects/aiw-console` salvo donde se indica:

```
rg -i "mixto|mixtos|mixed|MIXED|Mixed"  projects/aiw-console/context
rg "correctness_model|work_type|blast_radius|failure_surfaces|external_effects|closure_mode|care_budget|JUDGED_ACCEPTS|JUDGED_DEFINES|PROJECT_SHAPE|SEMI_ATTENDED|UNATTENDED"  projects/aiw-console
rg -i "tres reglas|three mechanical|reglas mec|mechanical rules|regla.{0,40}mixt|mixt.{0,40}regla"  projects/aiw-console
rg -i "mixed run|run mixto|runs mixtos|MIXED"  projects/aiw-console
rg -n "^## D-0\d+"  projects/aiw-console/context/DECISIONES.md
```

### 4.2 Qué devolvió cada búsqueda

- **`mixto|mixed`, sobre `context/`** — 15 aciertos, **ninguno es una regla**:
  prefijos de `run_id` mixtos (`DECISIONES.md:838`, `CONTRATO.md:914` y `:1997`,
  `MIGRACION-O0.md:117`), idioma mixto, carriles con alcances mixtos
  (`CARRILES-Y-BARRIERS-ROADMAP.md:80`, `:300`), un entregable mixto de Cantu
  (`MIGRACION-CANTU-A-CARRILES.md:373`), un fixture llamado `mixto`, finales de
  línea mixtos, el *mixed feed* retirado de la consola y una frase de estilo del
  contexto de Cantu.
- **Los nombres de los campos, sobre el repo entero** — **7 archivos**. Cuatro son
  la fuente misma o sus derivados: `roadmap/roadmap.json`,
  `.project/roadmap.json`, `.project/snapshot.json` y
  `context/handoffs/aiw-console.md`. Los **tres records** que salieron
  —`MEDICION-INCIDENTE-SCOPE-PREFLIGHT.md:149`,
  `CONVENCION-DOCUMENTACION-AIW.md:531`, `EMISION-PROJECT-AIW.md:229-230`— son
  **falsos positivos del token `UNATTENDED`** dentro de dos `run_id` de `aiw`
  (`RUN-AIW-LONG-UNATTENDED-SESSIONS-001`,
  `RUN-AIW-UNATTENDED-OPERATION-DOCUMENTATION-001`). **Ningún record menciona
  ninguno de los cinco campos.**
- **`tres reglas|mechanical rules|regla…mixt`** — 5 aciertos. **Tres son la misma
  frase**: el `full_description` del `#39` en `roadmap/roadmap.json:685` y sus dos
  copias derivadas (`.project/roadmap.json:695`, `.project/snapshot.json:729`). Los
  otros dos son `MIGRACION-O0.md:117` (prefijos mixtos) y
  `MEDICION-VALIDADOR-ROJO.md:122` («las tres reglas de identidad», del validador
  de Cantu — otra cosa).
- **`mixed run|runs mixtos`** — solo *mixed feed*, finales de línea mixtos,
  prefijos mixtos y un test de carriles.

### 4.3 Conclusión

**El único rastro de las tres reglas en todo el repo es la MENCIÓN de su
existencia** en `roadmap/roadmap.json:685`, dentro del `full_description` del
`#39`: dice que existen y que se publican, **no dice cuáles son**. Se acordaron en
la auditoría de cabina del **2026-07-29/30** y **no llegaron a disco**. Se
incorporarán por **corrección hacia adelante**, con sección nueva y entrada nueva,
sin reescribir nada de lo publicado hoy.

## 5. `CLAUDE.md` / `AGENTS.md` en la raíz de este repo — NO EXISTEN

Comprobado en disco: en la raíz de `projects/aiw-console` **no existe `CLAUDE.md`
ni `AGENTS.md`**. Los únicos `.md` de la raíz son **`README.md`** y
**`start-console.README.md`**.

**No se crearon, y es deliberado.** Crear un archivo de reglas de agente para este
repo es una decisión de gobernanza que este run no tiene. La ausencia queda
reportada aquí y en `D-057`; **el puntero se añadirá cuando el archivo exista, por
decisión de quien corresponda.**

Los punteros de `aiw` y de `cantu-studio` **son trabajo de sus hilos** y aquí solo
se nombran: este encargo no leyó ni escribió un byte de ninguno de los dos repos.

## 6. Qué NO se hizo, y por qué

- **No se añadió ningún campo al esquema** del roadmap, ni al motor, ni al emisor,
  ni al validador. Es el run siguiente; éste es papel y lo dice su propio texto.
- **No se clasificó ningún run**, vivo ni cerrado. Es el run de después.
- **No se cambió el `status` de ningún run y no se re-emitió `.project/`.** El
  `#39` debe quedar en `completed`, **pero lo cierra el operador desde la consola**,
  que escribe el canónico y re-emite de forma atómica. Al medir para este record, el
  `#39` figura en disco como **`active`**.
- **No se corrió la suite.** Está en rojo por fallos heredados que asertan contra
  datos vivos, y correrla ensucia el árbol re-emitiendo `.project/`. Es el `#40`.
- **No se corrió git en ninguna forma**, ni siquiera de lectura.
- **No se insertó, movió ni renumeró ningún run**, y **no se reescribió ninguna
  entrada de `DECISIONES.md` ni ningún record**.
- **No se tocó ninguna otra sección del handoff** más que la que él mismo ordenaba
  sustituir.

## 7. Verificaciones finales — contadas sobre disco al terminar

- **`context/DECISIONES.md`**: **58 entradas `D-*`** (más `## Doctrina H1`, que no
  es entrada `D-`), **2135 líneas**. **Última entrada: `D-057`**, en la línea
  **2056**. La anterior era `D-056`, en `:1964`.
- **`roadmap/roadmap.json`**: **2 objetivos, 19 fases, 51 runs**, `schema_version`
  **`roadmap_tree_v1`**. Reparto por `status`: **38 `completed`, 12 `planned`, 1
  `active`** — el `active` es el `#39`, este run.
- **Carriles:** el archivo **NO declara `lanes`**, como se esperaba. Cero
  ocurrencias del token `"lane"`/`"lanes"` en todo el archivo y **cero runs con
  propiedad `lane`**; por tanto **el `#39` no tiene carril**. Un solo carril
  implícito: la cola es serial y el `queue_order` es la historia completa.
- **`git status --porcelain` no se ejecutó**, por instrucción explícita del
  encargo.

## 8. Punteros

- El sistema, íntegro y normativo: **`context/CLASIFICACION-DE-RUNS.md`**.
- La decisión transversal: **`context/DECISIONES.md`, [[D-057]]**.
- El relevo, ya sin la copia provisional: `context/handoffs/aiw-console.md`.
