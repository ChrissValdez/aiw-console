# Alta del run de unificación del selector de color

**Proyecto:** cantu-studio
**Run creado:** `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001` — `queue_order` **16**, carril DEVELOPMENT
**Fecha:** 2026-07-30
**Tipo:** Encargo de taller. **Alta de un run en el canónico. NO lo ejecuta.**
**Estado del run creado:** `planned` — nace así y nadie lo toca.

**Resultado en una línea:** el run está insertado en `queue_order` 16, los quince anteriores
están **sin renumerar** y los cincuenta y ocho que estaban en 16 o más subieron **exactamente
uno**; 73 → **74** runs, 153 → **154** aristas, validador **EXIT 0** antes y después con
**Component statuses: 16** sin moverse y el mismo aviso no bloqueante único; y el run nuevo
**entra en el conjunto elegible** porque su dependencia ya está `completed`.

---

## 1. Guarda de identidad, y la deriva del canónico desde el record anterior

### 1.1 La dependencia, DERIVADA — no tecleada

Criterio 1. El único `run_id` que este encargo teclea es el del run nuevo, que el ticket fija.
El de la dependencia se buscó **por `queue_order`**, con guarda de título que aborta el proceso
(`process.exit`) antes de planear nada.

| Campo | Valor leído verbatim del canónico |
|---|---|
| Ruta recorrida | `objectives[2].phases[2].runs[0]` |
| `queue_order` | 15 |
| `run_id` **derivado** | `RUN-JAME-WEB-HEADER-REVALIDATION-001` |
| `title` | `Audit and implement the Header component` |
| `status` | **`completed`** |
| Objetivo | `O1` — «Cantu Studio Web Components» |
| Fase | `O1.P1C` — «Web Components - Basics» |
| Clave `lane` | **ausente** → carril por defecto |

**La guarda pasa.** El título coincide carácter por carácter con el que el ticket cita. No hubo
que corregir nada por parecido, y si hubiera fallado el driver aborta con código 9 sin tocar el
archivo.

### 1.2 La comprobación de fase que el ticket manda verificar — CUADRA

El motor **ancla la fase al punto de inserción** (`roadmap-core.mjs:602-674`), así que había que
verificar antes de escribir que 15 y 16 comparten fase. Medido:

| | `queue_order` 15 | `queue_order` 16 (antes) |
|---|---|---|
| `run_id` | `RUN-JAME-WEB-HEADER-REVALIDATION-001` | `RUN-CANTU-WEB-HEADER-DOC-001` |
| Objetivo | `O1` Cantu Studio Web Components | **el mismo** |
| Fase | `O1.P1C` Web Components - Basics | **la misma** |

**Comparten objetivo y fase.** No hubo que parar. Se ancló con `--after <dependencia>`, que mete
el run en la fase del run 15 —la misma que la del 16— y lo coloca en el índice global 15, es
decir `queue_order` **16**. **Ningún `move` hizo falta**, a diferencia del alta anterior.

### 1.3 Deriva del canónico desde los tres records citados, declarada

Los tres records previos cerraron con el canónico en md5 `1dfcf17eccb7ec79b0864f040a5714b9`.
**Al abrir este encargo valía `b4d53a75886e1b7ad58886ca8851783a`, con `mtime` 2026-07-30
21:32:33.** No fui yo: mi primera escritura es de las **22:04:15**. La causa está medida en el
propio contenido:

| Qué cambió respecto de lo que registraban los tres records | Antes | Al abrir este encargo |
|---|---|---|
| `RUN-JAME-WEB-HEADER-REVALIDATION-001` (`q15`) | `active` | **`completed`** |
| Runs `completed` | 15 | **16** |
| Runs `active` | 1 | **0** |
| Colas del validador | `now=1 ready_next=20 later=37 history=15` | `now=0 ready_next=21 later=36 history=16` |

**La cabina cerró el run 15 y la consola re-emitió `.project/` en el mismo instante atómico**
(§10). Es exactamente el escenario que el ticket anticipaba al decir que el run nuevo dependería
de un `completed`.

---

## 2. Lo que se escribió: el run, campo a campo

Leído **de vuelta del disco** después de escribir, no de mi entrada.

```json
{
  "run_id": "RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001",
  "queue_order": 16,
  "title": "Unify the color selector across every Web component",
  "summary": "Give every Web component with a color surface the same selector: ...",
  "full_description": "Every Web component that lets the author pick a colour must offer ...",
  "status": "planned",
  "depends_on": ["RUN-JAME-WEB-HEADER-REVALIDATION-001"]
}
```

| Campo | Valor | Comprobación |
|---|---|---|
| `queue_order` | **16** | verificado tras escribir |
| `run_id` | `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001` | libre antes; casa `RUN-[A-Z0-9-]+-\d{3}` |
| **Carril** | DEVELOPMENT **por omisión de la clave** | `has lane: false` — las claves del run son exactamente las siete obligatorias, ninguna opcional |
| `status` | `planned` | nace así |
| `depends_on` | **1 arista**, a la dependencia derivada | y nada más |
| Objetivo / fase | `O1` / `O1.P1C` | los mismos que el run 15 |
| Orden de claves | `run_id, queue_order, title, summary, full_description, status, depends_on` | el canónico del motor |

**Los tres textos, verbatim y en ASCII puro**, verificados contra la entrada del ticket
carácter por carácter **después** de la escritura:

| Campo | ¿Verbatim? | Bytes | Bytes no-ASCII | ¿Una línea? |
|---|---|---|---|---|
| `title` | **sí** | 51 | **0** | sí |
| `summary` | **sí** | 213 | **0** | sí |
| `full_description` | **sí** | 1 479 | **0** | sí |

---

## 3. Método — el mismo camino que las veces anteriores

### 3.1 Motor

**El de `aiw-console`**: `tools/roadmap/roadmap-plan.mjs` sobre `tools/roadmap/roadmap-core.mjs`,
el mismo módulo que ejecuta el endpoint de escritura de la consola global. Importado en modo
lectura desde un driver que vive **en el scratchpad de sesión**, fuera de los dos repos.

**Ids externos, compuestos como los compone la consola** (`serve.mjs:335`, `externalRunIdsFor`):
recorriendo los roots de los **otros** proyectos de `project-console/projects.json` con
`detectRootLayout` y quedándose con sus `run_id`. Lectura pura.

| Proyecto | Layout | Árbol leído | Ids |
|---|---|---|---|
| `aiw-console` | `repo_root` | `roadmap/roadmap.json` | 51 |
| `aiw` | `repo_root` | `roadmap/roadmap.json` | 42 |
| | | **unión** | **93** |

Sin ese conjunto el pre-flight del motor rechaza el archivo por la arista externa
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` → `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`,
que **resuelve** contra ese conjunto y **no se tocó**.

### 3.2 Roundtrip byte-exacto, comprobado ANTES de tocar

`serialize(parseRoadmap(raw), detectEol(raw)) === raw` sobre el archivo objetivo:
**byte-exacto**, EOL **CRLF**, 99 035 bytes. Comprobado **dos veces**: en el ensayo y otra vez
contra el canónico en la pasada real. Si hubiera fallado, el driver aborta sin planear.

### 3.3 Respaldo con md5, fuera del repo

`<scratchpad>/work/roadmap.BACKUP.json`, md5 `b4d53a75886e1b7ad58886ca8851783a`, idéntico al del
canónico al abrir. Es contra este respaldo —no contra ningún record— que se comparó run por run.
El motor además deja el suyo en `os.tmpdir()` durante la escritura atómica.

### 3.4 Ensayo completo sobre copia, y `cmp` contra ella

La secuencia entera —guardas, derivación, roundtrip, plan, invariantes **y la escritura**— se
corrió primero contra `<scratchpad>/work/out/rehearsal.json`. Solo con todo en verde sobre la
copia se corrió contra el canónico.

```
cmp <canónico> <copia ensayada>   ->  NO DIFFERENCES
```

md5 de los dos: **`f4589a7205e55e08b8a1ea60f009cfd0`**. Lo ensayado es exactamente lo escrito.

### 3.5 Una sola escritura, con autoridad inyectada

`insert` es operación de identidad y el motor **la excluye de `batch`** por regla propia
(`roadmap-plan.mjs:159-182`); aquí no hizo falta ninguna otra operación, así que el encargo es
**un solo `planEdit` y un solo `applyPlan`**.

- **Compare-and-swap:** el baseline del plan
  (`sha256:a95d3d8fa18b516cb872b12fce0df1e07ff8c8a7005be0e881ec86133bf90558`) se releyó justo
  antes de escribir y **no se había movido**.
- **Escritura:** respaldo → temp → `fsync` → `rename` atómico.
- **Autoridad post-escritura inyectada:** re-lee el archivo ya renombrado, re-verifica los
  invariantes del motor con la arista externa resuelta, comprueba que conserva la forma
  `objectives → phases → runs`, y lanza el validador del propio proyecto exigiendo EXIT 0.
  Cualquiera de los tres en rojo restaura el respaldo. Salida registrada:
  **`re-read OK + project validator EXIT 0`**.
- `written=true`, `rolledBack=false`. **No hubo rollback: la escritura sobre el canónico fue una
  y sólo una.**

---

## 4. Invariantes, antes y después, campo a campo

Criterio 4. Medidos los dos lados con el mismo script, contra el respaldo y contra el canónico
escrito. **Ninguna de estas cifras viene del ticket.**

| Invariante | Antes | Después | ¿Esperado? |
|---|---|---|---|
| **Objetivos** | **7** | **7** | sin cambio ✔ |
| **Fases** | **28** | **28** | sin cambio ✔ |
| **Runs** | **73** | **74** | **+1** ✔ |
| `queue_order` denso 1..N | sí, 1..73 | **sí, 1..74** | ✔ |
| `queue_order` único | sí | sí | ✔ |
| **Aristas `depends_on`** | **153** | **154** | **+1**, la del run nuevo ✔ |
| Aristas colgantes | 1 (la externa, resuelve) | **la misma, 1** | sin cambio ✔ |
| Dependencias que no preceden | **0** | **0** | ✔ |
| `completed` | **16** | **16** | los mismos ids ✔ |
| `planned` | 57 | **58** | +1, el nuevo ✔ |
| `active` / `blocked` | 0 / 0 | 0 / 0 | ningún `status` tocado ✔ |
| Carril `DOCUMENTATION` | **23** | **23** | sin cambio ✔ |
| Carril `DEVELOPMENT` | **50** | **51** | **+1** ✔ |
| Runs con clave `lane` explícita | 23 | **23** | el nuevo **no** la lleva ✔ |
| Bytes no-ASCII del archivo | **24** | **24** | sin cambio ✔ |
| Bytes | 99 035 | 101 149 | +2 114 |
| md5 | `b4d53a75886e1b7ad58886ca8851783a` | **`f4589a7205e55e08b8a1ea60f009cfd0`** | |
| EOL | CRLF | CRLF | ✔ |
| Roundtrip byte-exacto | sí | **sí** | ✔ |

### 4.1 La cifra del ticket que había que verificar, verificada

El ticket decía «hoy debería ser 73 → 74, **verifícalo, no lo des por bueno**». **Medido: 73
antes, 74 después. Cierta.** Igual con las aristas: el ticket no daba número y pedía medirlo —
**153 → 154**.

### 4.2 Los 73 runs preexistentes, byte-idénticos salvo su `queue_order`

Comparación run por run contra el respaldo, serializando cada objeto run **con `queue_order`
retirado** y comparando la cadena resultante, más el conjunto **y el orden** de sus claves:

| Comprobación | Resultado |
|---|---|
| Runs del respaldo hallados en el canónico | **73 de 73** |
| Cuerpo cambiado más allá de `queue_order` | **0** |
| Conjunto u orden de claves cambiado | **0** |
| Fase cambiada | **0** |
| Objetivo cambiado | **0** |
| `status` cambiado | **0** |
| Runs nuevos inesperados | **0** |
| **Problemas totales** | **0** |

### 4.3 `queue_order` 1..15 — SIN RENUMERAR, uno a uno

Criterio 2. Los quince se compararon **uno a uno** contra el respaldo y los quince conservan su
número exacto:

| q | run_id |
|---|---|
| 1 | `RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001` |
| 2 | `RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001` |
| 3 | `RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001` |
| 4 | `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` |
| 5 | `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001` |
| 6 | `RUN-CANTU-REPO-RENAME-001` |
| 7 | `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001` |
| 8 | `RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001` |
| 9 | `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001` |
| 10 | `RUN-JAME-VIRTUAL-KEYBOARD-KATEX-COMPATIBILITY-001` |
| 11 | `RUN-CANTU-MATH-ALLOWLIST-EXPANSION-AND-FORMULA-EDITOR-001` |
| 12 | `RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001` |
| 13 | `RUN-JAME-WEB-COLUMNS-REVALIDATION-001` |
| 14 | `RUN-CANTU-WEB-COLUMNS-DOC-001` |
| 15 | `RUN-JAME-WEB-HEADER-REVALIDATION-001` |

**Quince, ninguno movido.**

---

## 5. TABLA DE DESPLAZAMIENTO

**Sección propia y visible, como pide el criterio 9. Es lo que la cabina necesita para no citar
números viejos en el ticket siguiente.** Todo lo que estaba en 16 o más sube **exactamente uno**;
**ningún run cambia de fase ni de objetivo**.

| Antes | Después | Título |
|---|---|---|
| 16 | **17** | Verify the Header component packet |
| 17 | **18** | Audit and implement the List component |
| 18 | **19** | Verify the List component packet |
| 19 | **20** | Audit and implement the IconList component |
| 20 | **21** | Verify the IconList component packet |
| 21 | **22** | Audit and implement the Card component |
| 22 | **23** | Verify the Card component packet |
| 23 | **24** | Audit and implement the Video component |
| 24 | **25** | Verify the Video component packet |
| 25 | **26** | Audit and implement the Narrative component |
| 26 | **27** | Verify the Narrative component packet |
| 27 | **28** | Audit and implement the Callout component |
| 28 | **29** | Verify the Callout component packet |
| 29 | **30** | Audit and implement the Details component |
| 30 | **31** | Verify the Details component packet |
| 31 | **32** | Audit and implement the Arithmetic component |
| 32 | **33** | Verify the Arithmetic component packet |
| 33 | **34** | Audit and implement the Rule component |
| 34 | **35** | Verify the Rule component packet |
| 35 | **36** | Decide scope and enable the Split component |
| 36 | **37** | Verify the Split component packet |
| 37 | **38** | Audit and implement the Table component |
| 38 | **39** | Verify the Table component packet |
| 39 | **40** | Audit and implement the ConceptGrid component |
| 40 | **41** | Verify the ConceptGrid component packet |
| 41 | **42** | Audit and implement the Hierarchy component |
| 42 | **43** | Verify the Hierarchy component packet |
| 43 | **44** | Audit and implement the Timeline component |
| 44 | **45** | Verify the Timeline component packet |
| 45 | **46** | Audit and implement the Visual component |
| 46 | **47** | Verify the Visual component packet |
| 47 | **48** | Audit the Web components as a whole |
| 48 | **49** | Audit the Web component documentation as a whole |
| 49 | **50** | Establish MathLive integration readiness |
| 50 | **51** | Verify global Formula Inserter integration after component revalidation |
| 51 | **52** | Audit and define the Slide grid system |
| 52 | **53** | Establish the Slide architecture baseline |
| 53 | **54** | Reproduce the sandbox files in the editor |
| 54 | **55** | Establish the Slide Component Guide from the Web template |
| 55 | **56** | Audit the reproduced components and define the per-component runs |
| 56 | **57** | Per-component Slide runs, to be created by the definer run |
| 57 | **58** | Assemble the Slide whole-set audit and readiness evidence |
| 58 | **59** | Audit Cantu Studio UX and route concrete follow-up runs |
| 59 | **60** | Measure the generated HTML payload |
| 60 | **61** | Design the Asset Registry |
| 61 | **62** | Define the ctx.assets contract |
| 62 | **63** | Integrate the Asset Registry into renderers |
| 63 | **64** | Validate Asset Dedup output equivalence |
| 64 | **65** | Validate the production lesson workflow |
| 65 | **66** | Implement and validate the production export flow |
| 66 | **67** | Define the hosting and deployment plan |
| 67 | **68** | Update the canonical Docs view to render authority and consume packets by contract |
| 68 | **69** | Deep documentation audit |
| 69 | **70** | Rename internal code directories and their references |
| 70 | **71** | Sweep the legacy documentation paths and decide the empty directories |
| 71 | **72** | Rename the jame-prefixed editor UI classes |
| 72 | **73** | Rename the Core j-prefix render namespace |
| 73 | **74** | Implement the Component Guide as a canonical packet consumer |

**Runs desplazados: 58.** Sumados al run nuevo, el remap del motor tiene **59 filas** — 1 alta
(`new → 16`) y 58 desplazamientos. Ninguna otra.

### 5.1 Los números nuevos que el ticket pide reportar explícitamente

| Run | `run_id` | Antes | **Ahora** |
|---|---|---|---|
| «Verify the Header component packet» | `RUN-CANTU-WEB-HEADER-DOC-001` | 16 | **17** |
| «Audit and implement the List component» | `RUN-JAME-WEB-LIST-REVALIDATION-001` | 17 | **18** |
| Audit de conjunto **de componentes** | `RUN-JAME-WEB-READINESS-EVIDENCE-001` | 47 | **48** |
| Audit de conjunto **de documentación** | `RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001` | 48 | **49** |
| Cableado del **Component Guide** | `RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001` | 73 | **74** |

---

## 6. El movimiento de `ready_next` y `later`, calculado run a run

Criterio 7. Calculado a los dos lados con el mismo criterio —un run `planned` es elegible cuando
**todas** sus dependencias están `completed`— y contrastado con lo que imprime el validador.

| Cola | Antes | Después | Movimiento |
|---|---|---|---|
| `needs_human_decision` | 0 | 0 | — |
| `now` | 0 | 0 | — |
| **`ready_next`** | **21** | **22** | **+1** |
| **`later`** | **36** | **36** | **sin cambio** |
| `history` | 16 | 16 | — |

**El +1 es el run nuevo y nadie más.** Entra en el conjunto elegible en el mismo instante en que
nace, porque su única dependencia —`RUN-JAME-WEB-HEADER-REVALIDATION-001`— ya está `completed`.
Es exactamente lo que el ticket anticipaba.

**Los otros veintiún elegibles son los mismos runs de antes**, con su número corrido:

| Antes | Después | Run |
|---|---|---|
| — | **16** | `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001` **(nuevo)** |
| 16 | 17 | `RUN-CANTU-WEB-HEADER-DOC-001` |
| 17 | 18 | `RUN-JAME-WEB-LIST-REVALIDATION-001` |
| 19 | 20 | `RUN-JAME-WEB-ICONLIST-REVALIDATION-001` |
| 21 | 22 | `RUN-JAME-WEB-CARD-REVALIDATION-001` |
| 23 | 24 | `RUN-JAME-WEB-VIDEO-REVALIDATION-001` |
| 25 | 26 | `RUN-JAME-WEB-NARRATIVE-REPAIR-001` |
| 27 | 28 | `RUN-JAME-WEB-CALLOUT-REPAIR-001` |
| 29 | 30 | `RUN-JAME-WEB-DETAILS-REPAIR-001` |
| 31 | 32 | `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` |
| 33 | 34 | `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` |
| 35 | 36 | `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` |
| 37 | 38 | `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` |
| 39 | 40 | `RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001` |
| 41 | 42 | `RUN-JAME-WEB-HIERARCHY-AUDIT-AND-REPAIR-001` |
| 43 | 44 | `RUN-JAME-WEB-TIMELINE-AUDIT-AND-REPAIR-001` |
| 45 | 46 | `RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001` |
| 50 | 51 | `RUN-JAME-FORMULA-INSERTER-INTEGRATION-001` |
| 51 | 52 | `RUN-CANTU-SLIDE-GRID-SYSTEM-001` |
| 67 | 68 | `RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001` |
| 68 | 69 | `RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001` |
| 73 | 74 | `RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001` |

**Ninguno entró ni salió del conjunto salvo el nuevo.** `later` conserva sus 36 runs, los mismos
ids, cada uno con su número corrido.

---

## 7. Validador — EXIT 0 antes y después

Criterio 7. Vía que no escribe: `node tools/project-console/validate-project-console-state.mjs`,
desde la raíz de cantu-studio. **Verificado por lectura del propio script que no contiene ninguna
llamada de escritura** (`writeFile`, `writeFileSync`: cero apariciones).

| Métrica | Antes | Después |
|---|---|---|
| **Validador** | **EXIT 0** | **EXIT 0** |
| Objetivos / fases / runs | 7 / 28 / **73** | 7 / 28 / **74** |
| **Component statuses** | **16** | **16** |
| Colas | `needs_human_decision=0 now=0 ready_next=21 later=36 history=16` | `... ready_next=22 later=36 ...` |
| `Docs indexed` | 149 | **149** |
| `Docs curated primary-visible` | 60 de 149 | 60 de 149 |
| Episodios de procedencia git | 9 | 9 |
| Snapshot git | 918 commits / 2 ramas | idéntico |
| **Avisos** | **1 no bloqueante**, la arista externa `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` | **el mismo, único** |

**Component statuses: 16, sin moverse.** **Ningún aviso nuevo**: el texto del aviso es idéntico
palabra por palabra antes y después, y sigue siendo el no bloqueante de la arista externa, que
**no se resolvió**.

El validador se corrió además **una tercera vez dentro de la escritura atómica**, como autoridad
inyectada sobre el archivo ya renombrado: EXIT 0, sin rollback.

---

## 8. Bytes no-ASCII — medidos, no heredados

Criterio 8.

| | Antes | Después |
|---|---|---|
| **Bytes no-ASCII del archivo entero** | **24** | **24** |

**Sin cambio, y la explicación es que los tres campos nuevos no aportan ninguno**: `title`,
`summary` y `full_description` dan **0 bytes fuera de rango** cada uno, medidos sobre lo que
quedó en disco.

Los 24 preexistentes viven en cinco líneas y **ninguna es del run nuevo**:

| Dónde | Bytes | Qué es |
|---|---|---|
| `lanes[0].title` | 3 | raya larga en «Development — code, structure, tooling» |
| `lanes[1].title` | 3 | raya larga en «Documentation — writing, updating, reorganising docs» |
| `full_description` de `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001` | 6 | dos rayas largas |
| `full_description` de `RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001` | 6 | dos rayas largas |
| `full_description` de `RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001` | 6 | dos rayas largas |

**No se tocó ninguna de las cinco.** Son de runs preexistentes y de la declaración de carriles.

---

## 9. Un solo archivo tocado en `cantu-studio`

Criterio 11. Barrido de `mtime` de **todo el repo**, **con `node_modules` cubierto** (no
excluido), con corte en el minuto anterior a mi primera escritura (2026-07-30 22:03:00).

```
21 436 archivos barridos, node_modules incluido
->  1 ruta devuelta
```

| `mtime` | Ruta |
|---|---|
| 2026-07-30 22:04:15 | `.aiw/roadmap/roadmap.json` |

**Exactamente una, y es la mía.** Ocho directorios `node_modules` estaban dentro del alcance del
barrido y no devolvieron nada.

---

## 10. `.project/` NO se re-emitió — pero se movió antes que yo, y se declara

Criterio 10. **No lo re-emití**, y el barrido de §9 no devuelve ninguno de sus seis archivos.

**Pero sí se movió, y no fui yo.** Sus seis archivos llevan `mtime` **2026-07-30 21:32:33**, el
mismo instante atómico que el `mtime` que el canónico tenía al abrir este encargo — la escritura
de la consola al cerrar el run 15 (§1.3), **treinta y dos minutos antes de mi primera escritura**.

| Archivo | md5 al abrir | md5 al cerrar | ¿Cambió por mí? |
|---|---|---|---|
| `.project/docs_index.json` | `cb0d3d6f5491ecd94315f25bb1010d88` | `cb0d3d6f5491ecd94315f25bb1010d88` | **No** |
| `.project/git_history.json` | `357088aed403c67d1282e332949fbbeb` | `357088aed403c67d1282e332949fbbeb` | **No** |
| `.project/guardrails.json` | `b933c6e32864e5c401a6bd7de2bc66e9` | `b933c6e32864e5c401a6bd7de2bc66e9` | **No** |
| `.project/no_claims.json` | `83daa01071c676e25ed5913c8f6bd609` | `83daa01071c676e25ed5913c8f6bd609` | **No** |
| `.project/roadmap.json` | `8def076b875a24e9e65aa6abab043d94` | `8def076b875a24e9e65aa6abab043d94` | **No** |
| `.project/snapshot.json` | `26f4a3d797eaf282674d0ab929a98a80` | `26f4a3d797eaf282674d0ab929a98a80` | **No** |

**Los seis md5 y los seis `mtime` son idénticos antes y después de mi escritura.** Consecuencia
que la cabina debe saber: **`.project/` está ahora desactualizado respecto del canónico** — su
vista de roadmap sigue mostrando 73 runs y los números viejos. Re-emitirlo es de la consola, y
este encargo tiene prohibido hacerlo.

---

## 11. Superficies disjuntas — `aiw-console` intacto salvo mi record

Criterio 14. El hilo paralelo está muy activo sobre `aiw-console`. md5 antes y después,
declarados:

| Ruta | md5 antes | md5 después | ¿Cambió? |
|---|---|---|---|
| aiw-console `roadmap/roadmap.json` | `41839f226c0b9c82e763f9ad37ecb44f` | `41839f226c0b9c82e763f9ad37ecb44f` | **No** |
| aiw-console `.aiw/roadmap/roadmap.json` | `08b9d813d6e3ee31aee464eb02294b61` | `08b9d813d6e3ee31aee464eb02294b61` | **No** |
| aiw-console `project-console/assets/project-console.js` | `227d280165737f03caff6ca04463890b` | `227d280165737f03caff6ca04463890b` | **No** |
| cantu `.aiw/roadmap/roadmap.json` | `b4d53a75886e1b7ad58886ca8851783a` | **`f4589a7205e55e08b8a1ea60f009cfd0`** | **Sí — es el encargo** |

De `aiw-console` se **leyeron** el motor (`tools/roadmap/`), el proyector
(`tools/projector/project.mjs`), el registro (`project-console/projects.json`), los dos árboles de
roadmap para componer los ids externos, y los tres records citados. **Ninguno se escribió.**
`context/aiw/`, `.project/` de aiw-console, `CONTRATO.md`, `DECISIONES.md`, handoffs, tests y
records existentes: **sin tocar**.

**Nota honesta sobre `roadmap/roadmap.json` de aiw-console:** su md5 vale hoy
`41839f226c0b9c82e763f9ad37ecb44f`, que es el valor con el que **cerró** el record anterior tras
cambiarle el hilo paralelo debajo. **Se tomó ya así y se dejó igual.**

---

## 12. Archivos escritos por este encargo, y ninguno más

| # | Archivo | Acción | md5 final |
|---|---|---|---|
| 1 | `cantu-studio/.aiw/roadmap/roadmap.json` | **Modificado** — un run insertado, 58 renumerados | `f4589a7205e55e08b8a1ea60f009cfd0` |
| 2 | `aiw-console/context/aiw-console/records/ALTA-RUN-UNIFICACION-SELECTOR-COLOR-CANTU.md` | **Creado** | este record |

**Dos filas.** Ningún schema, editor, test, packet, índice, draft, contrato ni `.project/` fue
modificado. El driver, el respaldo, la copia de ensayo y las mediciones viven en el scratchpad de
sesión, **fuera de los dos repos**.

**Records existentes:** había **75** antes de éste. Éste es el **76**. **Sin colisión de nombre:**
ningún otro record contiene `UNIFICACION`; el único que empieza por `ALTA-RUN` es
`ALTA-RUN-COMPONENT-GUIDE-Y-REENCUADRE-AUDIT-DOC.md` y el único que contiene `SELECTOR` es
`REPARACION-SELECTOR-COLOR-HEADER-CANTU.md`, los dos de nombre completo distinto y de otro asunto.

---

## 13. Dependencias implícitas detectadas — NOMBRADAS, NO ESCRITAS

El alcance prohíbe añadir cualquier arista que no sea la del run nuevo hacia su dependencia. Las
que la lectura de los tres records deja a la vista se **nombran aquí y no se escriben**:

1. **`RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` (ahora `q36`) y el run nuevo se solapan.** El
   record de clases mide que `split` es el enum más severo del repo —tres valores, y el autor ya
   usa los tres— y lo señala como el candidato de mejor relación coste/beneficio. Quien ejecute
   primero condiciona al otro. **No se escribe arista.**
2. **Los dieciséis doc-runs de componente** (`q17`, `q19`, `q21`…) documentarían un selector que
   el run nuevo rediseña. Es la razón por la que el ticket lo coloca en 16 y no al final; el orden
   ya expresa la precedencia **sin necesidad de aristas**, y no se añadió ninguna.
3. **`RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001` (ahora `q74`).** El swatch de Header se derivó
   del editor de paletas, que vive en `ComponentGuide.jsx`; unificar diecisiete selectores toca la
   misma superficie que ese run cablea. **No se escribe arista.**
4. **Superficie Slides fuera del alcance Web.** `VariantSelect` —la pieza compartida que alcanza a
   seis de los diecisiete de una vez— la consume además `slide/SlideCardEditor.jsx:26`. El run
   nuevo dice «Web component»; **quien lo ejecute debe decidir qué pasa con el consumidor de
   Slides**, y esa decisión no es de este encargo.
5. **La arista externa** `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` →
   `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` sigue **sin resolver**, exactamente como estaba.

---

## 14. Cifras del ticket, verificadas y no creídas

Criterio 12.

| Cifra o afirmación del encargo | ¿Verificada? | Resultado |
|---|---|---|
| Runs **73 → 74** | sí, midiendo los dos lados | **cierta** |
| «los otros **cincuenta**» omiten `lane` | sí, contando | **cierta** — 50 DEVELOPMENT antes, ninguno con clave `lane`; 23 DOCUMENTATION, los 23 con ella |
| El run de `q15` se titula «Audit and implement the Header component» | sí, guarda que aborta | **cierta** |
| **15 y 16 comparten fase** | sí, comparando `phase_id` y `objective_id` | **cierta** — `O1` / `O1.P1C` los dos |
| El run nuevo depende de un `completed` y debería entrar en el elegible | sí | **cierta** — `ready_next` 21 → 22 |
| **Component statuses: 16** | sí, dos veces | **cierta**, sin moverse |
| Aristas **+1** | sí | **cierta** — 153 → 154 |
| Que el canónico estaba como lo dejaron los records | **no** | **FALSA** — md5 y `status` de `q15` habían cambiado antes de abrir (§1.3). Se declara y se sigue |
| «`queue_order` 16 = el doc-run de Header» | sí | **cierta** — `RUN-CANTU-WEB-HEADER-DOC-001` |

---

## 15. No-claims de este record

- **El run creado NO se ejecutó.** No se tocó ningún selector, schema, editor, componente, test ni
  draft de cantu-studio. El único archivo modificado del repo es el canónico.
- **No se reescribió el texto de ningún run existente.** Los 73 preexistentes están
  byte-idénticos salvo su `queue_order`, verificado clave a clave.
- **No se tocó ningún `status`.** Los 16 `completed` son los mismos 16 ids; el run nuevo nace
  `planned` y nadie más cambia.
- **No se cerró ningún run**, no se aplicó ningún `barrier`, no se resolvió la arista externa.
- **No se añadió ninguna arista** salvo la única del run nuevo hacia su dependencia. Las cinco
  dependencias implícitas detectadas quedan **nombradas y no escritas** (§13).
- **No se escribió la clave `lane`** en el run nuevo: el carril se resuelve al leer, como en los
  otros cincuenta.
- **No se editaron contratos de referencia, la Definition of Done, el Blueprint ni el modelo
  canónico.**
- **`.project/` no se re-emitió** — se movió antes que yo y se declara con `mtime` y md5 (§10).
  Queda desactualizado respecto del canónico, y repararlo es de la consola.
- **No se tocó nada de `aiw-console` salvo este record**, con md5 antes y después declarados de
  sus tres superficies calientes (§11).
- **No se ejecutó git en ninguna forma**, no se levantaron servidores, no se corrió ninguna suite
  de `aiw-console` ni de cantu-studio.
- **Ninguna cifra de este record viene del ticket.** Las que el ticket daba se midieron, y una de
  sus premisas resultó vencida (§14).
