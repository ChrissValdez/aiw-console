# LAS FUENTES DE GOBERNANZA DECLARADA DE AIW — ESCRITAS Y MEDIDAS

Run `RUN-AIW-DECLARED-GOVERNANCE-001` (`queue_order` 17, `O2.P4`).

Este encargo escribe **dos** archivos: `aiw/governance/guardrails.json` y
`aiw/governance/no_claims.json`. **No escribe `contract.json`**: esa pieza se MIDE
y se reporta en el bloque 6, y la decide la cabina con la medición delante.

El principio que gobierna todo, transcrito del propio ejemplar
(`aiw-console/governance/guardrails.json:2`): *«fuente declarada, mantenida a
mano; este archivo REGISTRA reglas, no las CREA»*. Ninguna regla nueva entró.
Toda regla lleva archivo y línea.

---

## Abreviaturas de cita

| Sigla | Archivo |
|---|---|
| `CONST` | `aiw/CONSTITUCION.md` |
| `CLAUDE` | `aiw/claude.md` |
| `PROJ` | `aiw-console/tools/projector/project.mjs` |
| `CONTRATO` | `aiw-console/context/aiw-console/CONTRATO.md` |
| `DEC` | `aiw-console/context/DECISIONES.md` |
| `EJ-G` / `EJ-N` / `EJ-C` | `aiw-console/governance/{guardrails,no_claims,contract}.json` |

---

# 1. Las dos guardas de apertura — PASADAS

## 1.1 Guarda de título e id (criterio 1)

Leído de `aiw/roadmap/roadmap.json`, run de `queue_order` **17**:

| Campo | Esperado | Medido | |
|---|---|---|---|
| `title` | `Write AIW's declared governance sources` | idéntico | ✅ |
| `run_id` | `RUN-AIW-DECLARED-GOVERNANCE-001` | idéntico | ✅ |

## 1.2 Guarda de apertura (criterio 2)

**`status` del run 17 = `"active"`.** No es `planned`. ✅

**HEAD de `aiw` a la apertura:** `f55449fac3a6a11651aed015adfd73d6bfdfb34f`

**`git status --porcelain` de `aiw` a la apertura, literal y completo:**

```
 M .project/roadmap.json
 M .project/snapshot.json
 M roadmap/roadmap.json
?? .project/docs_index.json
?? .project/git_history.json
```

Cinco entradas: una es `roadmap/roadmap.json` y las otras cuatro son de
`.project/`. **Nada más.** La guarda pasa. ✅

---

# 2. LA FORMA, DERIVADA DEL EJEMPLAR (criterio 3)

No se inventó nada de la forma: se transcribió de los tres archivos de
`aiw-console/governance/` y se confirmó contra el emisor.

## 2.1 Esquema de `guardrails.json`, transcrito de `EJ-G`

**Raíz** (`EJ-G:1-3,64-65`) — exactamente **dos** claves:

| Clave | Tipo | Papel |
|---|---|---|
| `note` | string | prosa de la fuente; ver 2.4 |
| `guardrails` | array | las entradas |

**Cada entrada** (`EJ-G:4-12`, y las siete son idénticas en forma) — **cuatro**
claves, siempre las cuatro:

| Clave | Tipo | Ejemplo del ejemplar |
|---|---|---|
| `id` | string, kebab-case, prefijo `guardrail-` | `guardrail-aiw-delivery-area` (`EJ-G:5`) |
| `rule` | string, prosa | `EJ-G:6` |
| `status` | string | `EJ-G:7` |
| `source_refs` | array de strings | `EJ-G:8-11` |

**Vocabulario de `status`, medido y no supuesto:** las **7** entradas de `EJ-G`
llevan `"ACTIVE"` y **ninguna otra**. El vocabulario observado tiene **un solo
token**. No hay enum declarado en ninguna parte, y **el emisor no valida
`status`** (ver 2.3): que sea un token único es un hecho del ejemplar, no una
regla escrita. Se siguió el ejemplar.

**Forma de `source_refs`:** `"<ruta> <localizador>"` — `EJ-G:18`
(`"context/aiw-console/CONTRATO.md §2"`), `EJ-G:10`
(`"context/DECISIONES.md D-044"`), `EJ-G:9`
(`"…/MEDICION-FUENTES-CONSOLA.md (Bloque D)"`). Rutas **relativas a la raíz del
proyecto**. El criterio 4 exige además **línea**, así que se usó la forma del
ejemplar con la línea añadida: `"CONSTITUCION.md §3 (:24-26)"`.

## 2.2 Esquema de `no_claims.json`, transcrito de `EJ-N`

**Raíz** (`EJ-N:1-3,51-52`) — dos claves: `note` y **`claims`** (nótese: la clave
NO se llama `no_claims`).

**Cada entrada** (`EJ-N:4-13`) — **cinco** claves:

| Clave | Papel, según `EJ-N:2` |
|---|---|
| `claim` | lo que el proyecto **no debe afirmar todavía** |
| `status` | `EJ-N:6` |
| `allowed_only_if` | **la condición que haría verdadera la afirmación** |
| `current_reason` | **por qué no es verdadera hoy** |
| `source_refs` | array de strings, misma forma que en `guardrails` |

**Vocabulario de `status`:** las **5** entradas llevan `"DISALLOWED"` y ninguna
otra. Un solo token, otra vez medido, no supuesto.

**Qué significa exactamente esta lista** — transcrito de `EJ-N:2`, porque el
criterio 5 pide derivarlo antes de escribir una entrada:

> *«Each entry names something this project must NOT claim yet, the condition
> that would make the claim true, and why it is not true today.»*

De ahí las tres consecuencias que se aplicaron al escribir:

1. **No es una lista de defectos ni de deuda.** Es una lista de **afirmaciones
   prohibidas**. Un defecto entra sólo si alguien podría afirmar lo contrario.
2. **`allowed_only_if` es una condición, no un plan.** El ejemplar admite
   `"Never: it was measured false."` (`EJ-N:44`) — una condición puede ser
   imposible, y decirlo es la respuesta correcta.
3. **`current_reason` es una medición, no una opinión.** Las cinco del ejemplar
   citan dónde se midió.

## 2.3 CONFIRMADO CONTRA EL EMISOR: qué array espera exactamente

`buildTransportedList`, transcrito literal de `PROJ:1276-1284`:

```js
function buildTransportedList(root, sourcePath, key, opts) {
  if (!sourcePath) return null;
  const source = safeReadJson(resolve(root, sourcePath));
  if (!source || !Array.isArray(source[key])) return null;
  return {
    ...projectFileEnvelope(root, opts, [sourcePath]),
    [key]: source[key]
  };
}
```

Y las dos llamadas, `PROJ:1288-1294`:

```js
export function buildGuardrails(root, opts = {}) {
  return buildTransportedList(root, detectRootLayout(root)?.paths.guardrails, "guardrails", opts);
}
export function buildNoClaims(root, opts = {}) {
  return buildTransportedList(root, detectRootLayout(root)?.paths.no_claims, "claims", opts);
}
```

**Lo que el emisor exige, exactamente y nada más:**

| Archivo | Clave que lee | Condición única |
|---|---|---|
| `governance/guardrails.json` | **`guardrails`** | `Array.isArray(source["guardrails"])` (`PROJ:1279`) |
| `governance/no_claims.json` | **`claims`** | `Array.isArray(source["claims"])` (`PROJ:1279`) |

Y las rutas, del layout `repo_root` (`PROJ:623-631`):

```
guardrails:   governance/guardrails.json      (PROJ:627)
no_claims:    governance/no_claims.json       (PROJ:628)
contract_ref: governance/contract.json        (PROJ:629)
```

**El emisor NO exige:** ni `note`, ni ninguna clave por entrada, ni ningún
`status`, ni que las entradas sean objetos. Copia el array **verbatim**
(`PROJ:1282`).

## 2.4 ¿DISCREPAN el ejemplar y el emisor? — NO

El ejemplar es un **superconjunto estricto** de lo que el emisor exige: todo lo
que el emisor pide está en el ejemplar, y el ejemplar añade disciplina que el
emisor no comprueba (`note`, las claves por entrada, el token de `status`).
**No hay conflicto, así que la regla «gana el emisor» no tuvo que aplicarse.**
Se siguió el ejemplar por ser la forma más estricta de las dos, y se declara
aquí que **la disciplina del ejemplar es documental: ningún código la
verifica.**

## 2.5 El papel de `note`, medido — NO VIAJA

`buildTransportedList` devuelve `{...envelope, [key]: source[key]}`
(`PROJ:1280-1283`). **`note` no está en esa expresión.** Comprobado ejecutando la
función (bloque 5): la salida no tiene la clave `note`.

**Consecuencia declarada:** `note` es una **instrucción para quien mantiene el
archivo a mano**, no contenido para el consumidor. Vive sólo en la fuente y
nunca llega a `.project/`. Por eso el `note` de los dos archivos escritos aquí
dice a quién obliga y a qué — es su único lector.

---

# 3. `guardrails.json` — LAS REGLAS ENCONTRADAS Y LAS QUE ENTRARON (criterio 4)

`CONST` y `CLAUDE` se leyeron **enteros** (47 y 47 líneas). Se enumeró cada
enunciado normativo antes de decidir nada.

## 3.1 Criterio de inclusión, declarado antes de aplicarlo

Entra un enunciado que **(a)** ya está en vigor hoy, **(b)** constriñe lo que el
sistema o el taller PUEDEN HACER, y **(c)** se puede citar por archivo y línea.
No entran: hechos descriptivos (dónde vive cada archivo), rituales, roles, ni
prosa vencida. Los enunciados excluidos se listan en 3.4 con su razón, no se
omiten.

## 3.2 `CONSTITUCION.md` — 18 enunciados encontrados, **18 entraron**

| # | Línea | Enunciado | Entrada |
|---|---|---|---|
| 1 | `:5` | cambiar la constitución exige decisión humana en `DECISIONES.md` | `…changes-only-by-human-decision` |
| 2 | `:8` | la evidencia del reviewer nunca es aprobación; v2 nunca hace merge | `…final-merge-authority` |
| 3 | `:9` | commit/push es trazabilidad, no certificación | `…traceability-not-certification` |
| 4 | `:9-10` | push nocturno de ramas `aiw/*`; main sólo por merge humano | `…main-is-never-touched` |
| 5 | `:11-12` | fail-closed ante veredicto no parseable o evidencia ambigua | `…fail-closed…` |
| 6 | `:13` | el humano es autoridad final del merge | `…final-merge-authority` |
| 7 | `:15-22` | piso de severidad del reviewer; NOTAS no bloquea | `…reviewer-severity-floor` |
| 8 | `:24-26` | **anti-auto-hosting** | `…anti-self-hosting` |
| 9 | `:28-29` | **techo ~500 líneas; para añadir, se borra** | `…kernel-line-ceiling` |
| 10 | `:30-32` | **ningún mecanismo sin incidente documentado (4 campos)** | `…documented-incident` |
| 11 | `:33` | **todo mecanismo nace con criterio de borrado** | `…deletion-criterion…` |
| 12 | `:34-35` | prohibido reintroducir las siete familias sin incidente | `…banned-families` |
| 13 | `:38` | assert cwd == repo objetivo | `…cwd-assert…` |
| 14 | `:39` | assert rama != main y empieza con `aiw/` | fundido en `…main-is-never-touched` |
| 15 | `:40` | push sólo de la rama de trabajo; jamás `--force`; jamás rewrite | `…no-force-push…` |
| 16 | `:41` | un run por repo (lockfile) | `…one-run-per-repo` |
| 17 | `:42` | rondas default 3, 1..10, tope duro 10 | `…rounds-are-bounded` |
| 18 | `:44-47` | dos métricas; si no suben, ningún mecanismo nuevo | `…two-metrics-rise` |

**18 de 18.** Dos pares se fundieron (2+6 → una entrada; 4+14 → una entrada)
porque son el mismo invariante dicho dos veces, no dos reglas.

## 3.3 `claude.md` — 16 enunciados encontrados, **9 entraron**

| # | Línea | Enunciado | Destino |
|---|---|---|---|
| 19 | `:8-11` | v1 read-only; retiro CONGELADO (D-032); ubicación no se asume | ❌ **VENCIDA** — ver 3.4.a |
| 20 | `:14` | leer `CONSTITUCION.md` antes de cualquier cambio | ✅ `…rules-live-in-the-repo…` |
| 21 | `:15` | v2 nunca se ejecuta sobre sí mismo | ✅ citado en `…anti-self-hosting` |
| 22 | `:16` | nunca tocar main; siempre ramas `aiw/*` | ✅ citado en `…main-is-never-touched` |
| 23 | `:17` | nunca force-push, rewrite ni merge automático | ✅ citado en `…no-force-push…` y `…merge-authority` |
| 24 | `:18` | el reviewer sólo bloquea por criterios, tests o seguridad | ✅ citado en `…reviewer-severity-floor` |
| 25 | `:19` | rondas 1..10 vía `# Max rounds` (D-019) | ✅ citado en `…rounds-are-bounded` |
| 26 | `:20` | techo ~500; añadir requiere incidente | ✅ citado en `…ceiling` y `…incident` |
| 27 | `:23` | el contexto de gobernanza se mudó a `aiw-console` (D-037) | ✅ `…rules-live-in-the-repo…` |
| 28 | `:26` | `DECISIONES.md` es log append-only; nunca se reescribe | ✅ `…human-decision` |
| 29 | `:25-34` | tabla «dónde vive cada cosa» | ❌ hechos descriptivos — 3.4.c |
| 30 | `:28` | `roadmap_AIW_temp.md` es el backlog de AIW | ❌ **PUNTERO VENCIDO** — 3.4.b |
| 31 | `:36-37` | este repo es el taller: construir y operar el kernel | ❌ descripción de rol |
| 32 | `:38-39` | toda decisión de la cabina se registra en `DECISIONES.md` | ✅ `…human-decision` |
| 33 | `:40-43` | ritual de cierre de sesión; toca DOS repos | ✅ parcial: «dos repos» entró; el ritual no — 3.4.d |
| 34 | `:46` | coordinación en español | ❌ convención — 3.4.e |

**RECUENTO GLOBAL: 34 enunciados normativos encontrados. 27 entraron, fundidos
en 17 entradas. 7 quedaron fuera**, cada uno con su razón abajo.

## 3.4 Lo que NO entró, y por qué

### 3.4.a `CLAUDE:8-11` — prosa VENCIDA, y se NOMBRA

`claude.md` sigue diciendo que el retiro del v1 está **CONGELADO** hasta un
diagnóstico de identidad, y que su ubicación en disco no se asume. **Eso ya no
está en vigor.** El run de `queue_order` **4**
(`RUN-AIW-LEGACY-RETIREMENT-001`, `completed`) dice, en su `full_description`:
el diagnóstico se hizo, el veredicto fue que el retiro era seguro, y se ejecutó
— *worktree* eliminado, copia local borrada, repositorio renombrado a
`aiw-v1-legacy` en GitHub y **archivado read-only**. **No hay v1 en disco.** Una
regla sobre no reabrir un árbol que ya no existe no es una regla en vigor.

**Y hay un segundo defecto en la misma frase.** `CLAUDE:8` llama al v1 *«cantera
de consulta»*; `D-032` (`DEC:318`) mide exactamente lo contrario: el árbol
contenía runs de junio-2026 y desarrollo reciente del CLI, *«lo que CONTRADICE
la afirmación del pack de que es "cantera congelada v1 extraída"»*. El título de
la propia decisión lo dice: *«el Legacy NO es "cantera congelada"»*.

**Se NOMBRA y no se corrige:** `claude.md` es materia prima y está fuera del
alcance de este encargo. Queda registrado como candidato a un encargo de
higiene.

### 3.4.b `CLAUDE:28` — puntero VENCIDO, y se NOMBRA

`claude.md` presenta `roadmap_AIW_temp.md` como *el* backlog de AIW. Desde
`D-052` y el run 16, el canónico es `aiw/roadmap/roadmap.json`. El Markdown lo
retira el run **20** (`RUN-AIW-MARKDOWN-RETIREMENT-001`, `planned`), y hasta
entonces **los dos coexisten** — eso está declarado en la nota de roadmap del
run 16, punto 3. Lo vencido no es que el archivo exista: es que `claude.md` lo
presenta como la única fuente, sin decir que hay un canónico. **Se nombra; no se
corrige aquí.**

### 3.4.c `CLAUDE:25-34` (la tabla de ubicaciones)

Son hechos descriptivos: dónde vive cada archivo. No constriñen ninguna acción.
**Excepción:** `:29` (`CONSTITUCION.md` vive aquí porque el taller la lee del
repo donde trabaja) sí es normativo y entró, junto con `CONTEXTO.md`
(«Lo que NO se mudó, y por qué»), en `guardrail-the-rules-live-in-the-repo-being-worked`.

### 3.4.d `CLAUDE:40-41` (ritual de cierre de sesión)

`actualizar ESTADO.md → registrar decisiones → commit "docs: sesión AAAA-MM-DD"`
es un procedimiento operativo, no un invariante: incumplirlo desordena, no rompe
nada del kernel. Lo que sí entró es su **consecuencia estructural** (`:42-43`):
un cierre toca DOS repos, porque el contexto vive en `aiw-console`.

### 3.4.e `CLAUDE:46` (coordinación en español) — CANDIDATA, se reporta

Es una regla real y en vigor, pero es una **convención de idioma de la
coordinación humana**, no una restricción sobre lo que el sistema puede hacer;
su ruptura no sería un defecto del kernel. **Se deja fuera y se reporta como
candidata** para que la cabina la mueva dentro si considera que la tabla de
Governance debe registrarla.

## 3.5 La regla anti-auto-hosting y su excepción (criterio 4, obligatoria)

Entró como **primera** entrada, con sus tres citas:

- **La regla**: `CONST §3 (:24-26)` — *«v2 nunca se ejecuta sobre su propio
  repo. v2 se edita a mano en sesión supervisada normal, nunca mediante su
  propio loop.»* Reforzada por `CLAUDE:15`.
- **La excepción declarada**: del `full_description` del run de `queue_order`
  **16** (`RUN-AIW-CANONICAL-ROADMAP-001`), nota de roadmap, **punto 2**:
  *«Every run in this roadmap is category manual for as long as the
  anti-self-hosting rule stands — the kernel NEVER executes against AIW
  (CONSTITUCION §3) — with this one explicit exception: runs targeting
  aiw-console are delegable to the kernel when that flow is resumed.»*

La excepción se cita **desde el roadmap**, que es donde está escrita, tal como
pide el criterio. No se reformuló.

## 3.6 Las cláusulas de `CONST §4` (criterio 4, obligatorias)

Las tres entraron **por separado**, porque son tres exigencias distintas sobre
el mismo acto:

| Cláusula | Entrada | Citas |
|---|---|---|
| techo de líneas | `guardrail-kernel-line-ceiling` | `CONST:28-29`, `CLAUDE:20`, `D-055` |
| incidente documentado | `guardrail-no-mechanism-without-a-documented-incident` | `CONST:30-32`, `CLAUDE:20`, `D-055` |
| criterio de borrado | `guardrail-deletion-criterion-written-at-birth` | `CONST:33`, `D-055`, `D-056` |

`D-056` se citó **sólo** en la del criterio de borrado, que es lo único que esa
decisión corrige (`DEC:1964`: *«CORRECCIÓN a D-055, caso 4 … y solo a su
criterio de borrado»*), y por eso la entrada dice que el criterio *«se corrige
hacia adelante por una entrada nueva, nunca reescribiendo la vieja»* — que es la
maniobra que `D-056` ejecuta.

Se añadió una cuarta entrada por `CONST:34-35` (familias prohibidas), que es
cláusula de §4 y no estaba en la lista obligatoria: recoge además el argumento
de `D-055` de por qué **estas reglas no se automatizan** — un check de techo en
la suite sería un *detector*, la clase nominalmente prohibida, y nacería sin
incidente.

**Dato medido, por si sirve al lector:** `kernel.mjs` tiene hoy **478 líneas**
(`wc -l`), contra el techo de ~500 — las 22 de holgura que `D-055` declara.

---

# 4. `no_claims.json` — LAS CUATRO, VERIFICADAS UNA A UNA (criterio 5)

Las cuatro candidatas del encargo se **verificaron contra disco y contra los
records**, no se copiaron. Las cuatro sobrevivieron, con la cita que faltaba.

## 4.1 «La suite de tests de AIW está verde»

- **Medido en disco:** existen **11** archivos de test bajo `aiw/tests/`.
- **La cifra 49/49** la afirma `ESTADO.md:65`, bajo un encabezado que dice de sí
  mismo *«Salud del kernel (NO re-verificada esta sesión — fue disco, no
  código)»* (`:64`). Es de segunda mano en su propia fuente.
- **Tres records la declaran `[NO VERIFICADO]` de primera mano:**
  `AUDIT-CONTENIDO-AIW.md:787`, `ESCRITURA-ROADMAP-AIW.md:587`,
  `PORTABILIDAD-EVIDENCIA-AIW.md:520`.
- **Este encargo tampoco la corrió** (fuera de alcance). ✅ ENTRA.

## 4.2 «Los `summary.md` de `logs/` describen el workspace actual»

- **Contados en disco: 8** archivos `summary.md`. **Los 8** citan
  `C:\Users\chris\Documents\AI_Workflow_Workspace\…` (grep sobre los ocho).
- **Verificado que ese workspace no existe:** `ls` sobre esa ruta →
  *«No such file or directory»*.
- **Cita de la medición original:** `MEDICION-ESTADO-DE-AIW.md §5.2.d (:841-847)`
  — *«cada comando "To review in the morning" de cada log apunta a una ruta que
  ya no existe»*.
- **Cita de la adjudicación:** `D-053`, adjudicación 1 (`DEC:1666-1675`) — los 8
  se versionan *«tal cual, como registro histórico inmutable»*. ✅ ENTRA.

## 4.3 «La evidencia de `logs/000-sandbox/` describe un solo run»

Verificado **en disco, no citado**:

| Hecho | Fuente |
|---|---|
| `summary.md` dice `APPROVED`, cerrado `2026-07-11T01:56:53.134Z` | `logs/000-sandbox/summary.md` |
| `preflight.txt` lleva `2026-07-11T06:00:33.205Z` — **posterior al cierre** | `logs/000-sandbox/preflight.txt` |
| El archivado dice `ERROR` | `objectives/processed/ERROR-000-sandbox.md` |
| Y además existe `APPROVED-000-sandbox-suma.md` | `objectives/processed/` |

Dos archivos de `processed/` reclaman el id `000` contra **una sola** carpeta de
log. La causa: `logDir` deriva sólo del nombre del objetivo — sin timestamp, sin
contador, sin comprobar que la carpeta ya exista (`AUDIT-CONTENIDO-AIW.md §6.1`,
`:643-654`). Es el incidente que `D-055` documenta para el manifest por run
(`DEC:1839-1861`). **No se ha reparado.** ✅ ENTRA.

## 4.4 «`e5-secreto` produce `BLOCKED` y `e6-changes-requerido` produce `ROUNDS_EXHAUSTED`»

- **Los dos tickets existen** en `aiw/objectives/qualification/`.
- **La reparación los devolvió a `OK` bajo `parseObjective`**
  (`REPARACION-PARSEO-TICKETS-AIW.md:317-318`), pero el propio record dice
  (`:422-425`): *«Lo que este run NO afirma: que los seis corran, ni que
  produzcan el desenlace para el que existen. Que parseen es el entregable; que
  corran, no. Ninguno de los seis se ejecutó.»*
- **`[NO VERIFICADO]` explícito, dos veces**: `:424-425` y `:478-480`.
- **Consecuencia medida** (`:410-411`): dos de los cinco desenlaces del kernel
  siguen sin fixture que la suite ejecute — que es justo el daño que `D-056`
  cierra al volver conjunta la cláusula 2. ✅ ENTRA.

**Cuatro candidatas, cuatro verificadas, cuatro entraron.** Ninguna se descartó
por falta de cita.

---

# 5. VALIDEZ Y COMPATIBILIDAD — PROBADAS (criterio 6)

## 5.1 Parseo

```
governance/guardrails.json -> JSON.parse OK; claves raiz: note,guardrails
governance/no_claims.json  -> JSON.parse OK; claves raiz: note,claims
```

## 5.2 `buildTransportedList` ejecutado sobre los archivos reales

Se **importó la función del emisor** (`buildGuardrails` / `buildNoClaims`, que
delegan en `buildTransportedList`) y se ejecutó contra el root real de `aiw`,
igual que el audit importó `parseObjective`. **No se corrió el proyector
completo y no se escribió nada en `.project/`.** Salida literal:

```
detectRootMode(aiw)       = roadmap_tree
layout                    = repo_root
layout.paths.guardrails   = governance\guardrails.json
layout.paths.no_claims    = governance\no_claims.json
layout.paths.contract_ref = governance\contract.json

buildGuardrails -> null?  false
  Array.isArray(guardrails): true
  ENTRADAS: 17
  envelope keys: schema_version, project_id, generated_at, generated_from, sources, guardrails
  sources: [{"path":"governance/guardrails.json","mtime":"…"}]
  transporta `note`?: false

buildNoClaims   -> null?  false
  Array.isArray(claims): true
  ENTRADAS: 4
  envelope keys: schema_version, project_id, generated_at, generated_from, sources, claims
  sources: [{"path":"governance/no_claims.json","mtime":"…"}]
  transporta `note`?: false

claves por entrada guardrails: id, rule, status, source_refs
claves por entrada claims    : claim, status, allowed_only_if, current_reason, source_refs
status guardrails (unicos)   : ACTIVE
status claims (unicos)       : DISALLOWED
```

**VEREDICTO:**

| | Devuelve | Entradas |
|---|---|---|
| `buildGuardrails(aiw)` | objeto **no nulo**, `guardrails` es array | **17** |
| `buildNoClaims(aiw)` | objeto **no nulo**, `claims` es array | **4** |

Los dos artefactos que `EMISION §5` midió como **NO EMITIDOS** ya tienen fuente.
La condición de `PROJ:1279` se cumple para ambos, así que el `if (!data) return;`
de `PROJ:1590` **ya no los saltará** cuando alguien re-emita. Esa re-emisión es
un acto posterior y **este encargo no la hizo**.

---

# 6. `contract.json` — MEDIDO, NO ESCRITO (criterio 7)

**El archivo NO se escribió.** Este bloque mide la pregunta y la deja abierta.

## 6.1 Qué contiene el de `aiw-console`, y qué dice su `note`

`EJ-C` completo son **cuatro líneas**:

```json
{
  "note": "Declared source, maintained by hand. Where THIS project's normative contract lives. The projector emits it as taxonomy_model.specified_by so a reader can find the prose behind the vocabulary and the derivation rule that travel in the snapshot; it emits nothing when this file is absent, and omits the pointer when the path does not resolve (CONTRATO.md §7).",
  "specified_by": "context/aiw-console/CONTRATO.md"
}
```

**Qué dice el `note` que SIGNIFICA el campo, transcrito:** *«dónde vive el
contrato normativo de ESTE proyecto»*, emitido *«para que un lector pueda
encontrar la prosa detrás del VOCABULARIO y de la REGLA DE DERIVACIÓN que
viajan en el snapshot»*.

**Eso es más estrecho de lo que su nombre sugiere.** No es «el documento
importante del proyecto»: es **la prosa que especifica el vocabulario de status
y la función de derivación** que el snapshot transporta en `taxonomy_model`. Es
la lectura que `CONTRATO §17` gobierna.

## 6.2 Cómo lo consume el emisor — leído por línea

`buildTaxonomyModel`, `PROJ:841-849` y `PROJ:891`:

```js
const declared = safeReadJson(resolve(root, layout.paths.contract_ref));   // PROJ:845
const specifiedBy =
  declared && typeof declared.specified_by === "string"
    ? sourceRecord(root, declared.specified_by)                            // PROJ:848
    : null;
…
...(specifiedBy ? { specified_by: specifiedBy.path } : {})                 // PROJ:891
```

Y `sourceRecord`, `PROJ:716-726`, con su comentario:

> *«A `{path, mtime}` source record (CONTRATO §6). Returns null when the file
> does not exist: §7 — a path that does not resolve is OMITTED, never emitted as
> a broken pointer.»*

```js
function sourceRecord(root, relativePath) {
  const absolute = resolve(root, relativePath);
  if (!existsSync(absolute)) return null;          // PROJ:720  ← LA ÚNICA validación
  try {
    return { path: repoRelative(root, absolute), … };
  } catch { return null; }
}
```

**Dónde lee `contract_ref`:** `PROJ:845`, dentro de `buildTaxonomyModel`, que
sólo se llama al construir el snapshot. **Sí valida que la ruta resuelva:**
`existsSync` en `PROJ:720`. **Qué emite si no resuelve:** nada — `specifiedBy`
queda `null` y el *spread* condicional de `PROJ:891` **omite la clave entera**,
que es lo que `CONTRATO §7` manda (*«Si no existe, se omite la clave — nunca se
emite un puntero roto»*).

## 6.3 ¿Resolvería una ruta que apunta FUERA del root? — **SÍ. MEDIDO.**

No se razonó: se montó una raíz de banco de pruebas en el *scratchpad* (con el
canónico real de AIW como árbol conforme) y se ejecutó la función **real** del
emisor, `buildRoadmapTreeSnapshot`, que construye en memoria y no escribe.
**Ni un byte de `aiw` participó.** Salida literal:

```
A. dentro de la raiz, EXISTE             -> "CONSTITUCION.md"
B. FUERA de la raiz (../), EXISTE        -> "../CONTRATO-fuera.md"
C. dentro de la raiz, NO existe          -> CLAVE OMITIDA
D. sin contract.json (archivo ausente)   -> CLAVE OMITIDA
E. contract.json sin clave specified_by  -> CLAVE OMITIDA
```

Y la pregunta con la ruta real de AIW, medida directamente:

```
resolve(aiw, "../projects/aiw-console/context/aiw-console/CONTRATO.md")
  = C:\Users\chris\Documents\AIW_Workspace\projects\aiw-console\context\aiw-console\CONTRATO.md
existsSync = true
repoRelative daria = ../projects/aiw-console/context/aiw-console/CONTRATO.md
```

**HALLAZGO, y es el que decide el bloque:** una ruta que escapa del root
**resuelve y se emite**, tal cual, con su `../` delante. El emisor **no tiene
guarda de contención**: `PROJ:720` sólo pregunta si el archivo existe, nunca si
está dentro del repo. `CONTRATO §7` dice *«Toda ruta del snapshot es relativa a
la raíz del repo»* — una ruta con `../` es relativa a la raíz pero **sale de
ella**, y esa garantía es **documental, no de código**.

Que hoy `existsSync` diga `true` es un hecho **de esta máquina**: `aiw` y
`aiw-console` son **dos repositorios git distintos** (verificado), y quien clone
sólo `aiw` no tendrá `../projects/aiw-console/` en ninguna parte.

## 6.4 Los candidatos DENTRO de `aiw`, y qué pierde un lector con cada uno

Lo que `aiw` versiona como prosa de gobernanza: `CONSTITUCION.md`, `claude.md`,
`CONTEXTO.md` y `records/*.md` (113 archivos trackeados en total).
**Ninguno especifica `roadmap_tree_v1`.** La prosa que sí lo hace —el vocabulario
de `status` y la función de derivación— es `CONTRATO.md §10-§17, §11, §12`, y
vive en `aiw-console`.

| Opción | ¿Resuelve? | Qué pierde / qué cuesta |
|---|---|---|
| **A. No escribir el archivo** *(el estado en que este encargo lo deja)* | n/a — clave omitida (**medido**, caso D) | El lector del snapshot de AIW **no tiene puntero** a la prosa que especifica el vocabulario: tiene que saber por fuera que vive en `aiw-console`. **Nada falso se afirma**, nada se rompe, y ningún otro campo depende de éste. Es salida legítima por `CONTRATO §7` y por el texto del propio run. |
| **B. `../projects/aiw-console/context/aiw-console/CONTRATO.md`** | **SÍ** (medido, caso B) — se emitiría como `"../projects/…"` | Es el documento **semánticamente correcto**. Coste: el puntero **apunta fuera del repo**, así que un clon de sólo `aiw` —la laptop, el remoto, el knowledge de la cabina— recibe una ruta que no puede abrir. **Es exactamente el problema de portabilidad que `D-053` existe para resolver**, reintroducido a nivel de campo. Y emite una ruta que escapa de la raíz, contra la letra de `§7`, sin que ningún código lo impida. |
| **C. `CONSTITUCION.md`** *(la analogía que el run marca `[INFERENCIA]`)* | **SÍ** (medido, caso A) — repo-relativo y viaja con el clon | Coste: `CONSTITUCION.md` **no especifica el vocabulario del snapshot ni la regla de derivación** — especifica la gobernanza del kernel. Un lector que siga `specified_by` esperando el referente de `§17` encuentra otra cosa. **Un puntero que resuelve y desorienta es peor que ninguno**: `§7` nace de `run_queue_ref`, un puntero roto medido en disco, y su lección es no emitir punteros en los que no se puede confiar. |
| **D. Traer la prosa del vocabulario a `aiw`** | — | Fuera del alcance de este encargo, y **duplicaría un documento canónico en dos repos** — la clase de colisión que el propio roadmap de AIW disuelve por construcción (nota de roadmap del run 16, punto 1; `D-046`, `D-054`). |

**No se decide.** El encargo reserva esta pieza al operador y este bloque no la
usurpa. Lo único que este encargo afirma es que **dejarlo fuera no rompe nada**:
medido en el caso D, la clave simplemente se omite.

---

# 7. EL CONTENIDO ÍNTEGRO DE LOS DOS ARCHIVOS (criterio 9)

## 7.1 `aiw/governance/guardrails.json` — 8 434 bytes, 17 entradas

```json
{
  "note": "Declared source, maintained by hand. The projector (aiw-console tools/projector/project.mjs, roadmap_tree mode, layout repo_root) reads `guardrails` from here and republishes it under the contract envelope at .project/guardrails.json. Nothing under .project/ is written or edited by hand (CONTRATO.md §2, §18). Each entry states a rule that is ALREADY IN FORCE and cites the file and line where it was decided; this file RECORDS rules, it does not CREATE them. A rule that cannot be cited does not belong here. Paths starting with ../ point into the aiw-console repository, where AIW's governance context lives (D-037); that is the same relative form CONSTITUCION.md:5 and claude.md:26 already use, and these strings are transported verbatim — they are not resolved by the emitter.",
  "guardrails": [
    {
      "id": "guardrail-anti-self-hosting",
      "rule": "v2 NEVER runs over its own repository. AIW is edited by hand in a normal supervised session, never through its own loop. One explicit exception is declared: runs targeting aiw-console are delegable to the kernel when that flow is resumed. Every run of this roadmap is category manual for as long as this rule stands.",
      "status": "ACTIVE",
      "source_refs": [
        "CONSTITUCION.md §3 (:24-26)",
        "claude.md (:15)",
        "roadmap/roadmap.json RUN-AIW-CANONICAL-ROADMAP-001 (roadmap-level note, point 2)"
      ]
    },
    {
      "id": "guardrail-kernel-line-ceiling",
      "rule": "Hard ceiling of the kernel: ~500 lines. To add, something is deleted. Every run that adds mechanism declares its line budget against the ceiling and, if it exceeds it, what it deletes. Enforcement is human and documentary: no test, hook or suite check verifies it.",
      "status": "ACTIVE",
      "source_refs": [
        "CONSTITUCION.md §4 (:28-29)",
        "claude.md (:20)",
        "../projects/aiw-console/context/DECISIONES.md D-055 (:1806-1963)"
      ]
    },
    {
      "id": "guardrail-no-mechanism-without-a-documented-incident",
      "rule": "No new mechanism without an incident documented in DECISIONES.md, carrying its four fields: date, what broke, what it cost, why the morning diff did not catch it. An idea is not an incident. A fear is not an incident.",
      "status": "ACTIVE",
      "source_refs": [
        "CONSTITUCION.md §4 (:30-32)",
        "claude.md (:20)",
        "../projects/aiw-console/context/DECISIONES.md D-055 (:1806-1963)"
      ]
    },
    {
      "id": "guardrail-deletion-criterion-written-at-birth",
      "rule": "Every mechanism is born with its deletion criterion written down: \"it is removed if X\". The criterion is written in the same DECISIONES.md entry that documents its incident, and it is corrected forward by a new entry, never by rewriting the old one.",
      "status": "ACTIVE",
      "source_refs": [
        "CONSTITUCION.md §4 (:33)",
        "../projects/aiw-console/context/DECISIONES.md D-055 (:1806-1963)",
        "../projects/aiw-console/context/DECISIONES.md D-056 (:1964-2054)"
      ]
    },
    {
      "id": "guardrail-no-reintroduction-of-the-banned-families",
      "rule": "Reintroducing any of these without a documented incident is forbidden: families, detectors, contract-quality, waivers, lifecycle folders, resolvers, coordinators. This is why the §4 criteria are not automated: a ceiling check or an incident check in the suite would itself be a DETECTOR, born without an incident.",
      "status": "ACTIVE",
      "source_refs": [
        "CONSTITUCION.md §4 (:34-35)",
        "../projects/aiw-console/context/DECISIONES.md D-055 (:1806-1963)"
      ]
    },
    {
      "id": "guardrail-human-is-the-final-merge-authority",
      "rule": "The reviewer's evidence is NEVER human approval. v2 therefore never merges, and never merges automatically. The human is the final authority of the merge.",
      "status": "ACTIVE",
      "source_refs": [
        "CONSTITUCION.md §1.1 (:8)",
        "CONSTITUCION.md §1.4 (:13)",
        "claude.md (:17)"
      ]
    },
    {
      "id": "guardrail-main-is-never-touched",
      "rule": "main of any repository is never touched. Work always happens on aiw/* branches, and the run asserts that the current branch is not main and begins with aiw/. main changes only by human merge in the morning.",
      "status": "ACTIVE",
      "source_refs": [
        "CONSTITUCION.md §1.2 (:9-10)",
        "CONSTITUCION.md §5 (:39)",
        "claude.md (:16)"
      ]
    },
    {
      "id": "guardrail-no-force-push-no-history-rewrite",
      "rule": "Push is permitted only from the working branch. Never --force. Never a rewrite of history.",
      "status": "ACTIVE",
      "source_refs": [
        "CONSTITUCION.md §5 (:40)",
        "claude.md (:17)"
      ]
    },
    {
      "id": "guardrail-commit-is-traceability-not-certification",
      "rule": "Commit and push are traceability, not certification. That a change is committed or pushed says nothing about whether it was approved.",
      "status": "ACTIVE",
      "source_refs": ["CONSTITUCION.md §1.2 (:9)"]
    },
    {
      "id": "guardrail-fail-closed-on-ambiguous-evidence",
      "rule": "Fail-closed: faced with an unparseable verdict or ambiguous evidence, stop and wait for the human.",
      "status": "ACTIVE",
      "source_refs": ["CONSTITUCION.md §1.3 (:11-12)"]
    },
    {
      "id": "guardrail-reviewer-severity-floor",
      "rule": "The reviewer may emit CHANGES_REQUIRED or BLOCKED ONLY for: a declared acceptance criterion of objetivo.md not met; the project's tests failing; or real security risk (exposed secrets, destructive operation). Everything else — style, names, architecture, whitespace, local configuration, improvement ideas — goes to the NOTAS section. NOTAS does not block, does not generate follow-ups, and does not generate mandatory work.",
      "status": "ACTIVE",
      "source_refs": [
        "CONSTITUCION.md §2 (:15-22)",
        "claude.md (:18)"
      ]
    },
    {
      "id": "guardrail-one-run-per-repo",
      "rule": "One run per repository at a time, enforced by a lockfile. Multi-project means distinct repositories in parallel, never two runs in one repository.",
      "status": "ACTIVE",
      "source_refs": ["CONSTITUCION.md §5 (:41)"]
    },
    {
      "id": "guardrail-cwd-assert-before-the-run",
      "rule": "The run asserts that its working directory is the expected target repository before doing anything.",
      "status": "ACTIVE",
      "source_refs": ["CONSTITUCION.md §5 (:38)"]
    },
    {
      "id": "guardrail-rounds-are-bounded",
      "rule": "Rounds per run: default 3, configurable per objective between 1 and 10 through the \"# Max rounds\" field; hard cap 10.",
      "status": "ACTIVE",
      "source_refs": [
        "CONSTITUCION.md §5 (:42)",
        "claude.md (:19)",
        "../projects/aiw-console/context/DECISIONES.md D-019 (:136)"
      ]
    },
    {
      "id": "guardrail-the-constitution-changes-only-by-human-decision",
      "rule": "Changing CONSTITUCION.md requires an explicit human decision recorded in DECISIONES.md. Every decision of the cabin is recorded there, and that log is append-only: never rewritten, only appended to.",
      "status": "ACTIVE",
      "source_refs": [
        "CONSTITUCION.md (:5)",
        "claude.md (:26)",
        "claude.md (:38-39)"
      ]
    },
    {
      "id": "guardrail-the-rules-live-in-the-repo-being-worked",
      "rule": "CONSTITUCION.md and claude.md stay in the aiw repository and are read from the repository the workshop is working in. The rest of AIW's governance context moved to aiw-console (D-037) and the copies there are the canonical ones; a session close therefore touches TWO repositories.",
      "status": "ACTIVE",
      "source_refs": [
        "claude.md (:14)",
        "claude.md (:23)",
        "claude.md (:42-43)",
        "CONTEXTO.md (\"Lo que NO se mudó, y por qué\")",
        "../projects/aiw-console/context/DECISIONES.md D-037 (:453)"
      ]
    },
    {
      "id": "guardrail-no-new-mechanism-unless-the-two-metrics-rise",
      "rule": "Success is measured monthly by two numbers: how many nights it ran unattended, and how many diffs were accepted by merge without being rewritten. If those two numbers do not rise, no new mechanism is justified.",
      "status": "ACTIVE",
      "source_refs": ["CONSTITUCION.md §6 (:44-47)"]
    }
  ]
}
```

## 7.2 `aiw/governance/no_claims.json` — 5 337 bytes, 4 entradas

```json
{
  "note": "Declared source, maintained by hand. The projector (aiw-console tools/projector/project.mjs, roadmap_tree mode, layout repo_root) reads `claims` from here and republishes it under the contract envelope at .project/no_claims.json. Each entry names something this project must NOT claim yet, the condition that would make the claim true, and why it is not true today. Every entry cites where its non-truth was MEASURED; an entry that cannot be cited does not belong here. Paths starting with ../ point into the aiw-console repository, where AIW's governance context lives (D-037); these strings are transported verbatim and are not resolved by the emitter.",
  "claims": [
    {
      "claim": "AIW's test suite is green",
      "status": "DISALLOWED",
      "allowed_only_if": "Someone runs `node --test` inside aiw and transcribes the result with its date. Only a real execution says this.",
      "current_reason": "The last recorded green — 49 tests, 49/49 — is second-hand: it is asserted by context/aiw/ESTADO.md, under a heading that itself says the kernel's health was NOT re-verified that session. No commission since has run the suite, and three separate records declare it [NO VERIFICADO] first-hand. The suite files exist (11 test files under tests/); that they pass today is not measured.",
      "source_refs": [
        "../projects/aiw-console/context/aiw/ESTADO.md (:63-65)",
        "../projects/aiw-console/context/aiw-console/records/AUDIT-CONTENIDO-AIW.md (:787-788)",
        "../projects/aiw-console/context/aiw-console/records/ESCRITURA-ROADMAP-AIW.md (:587-588)",
        "../projects/aiw-console/context/aiw-console/records/PORTABILIDAD-EVIDENCIA-AIW.md (:520-521)"
      ]
    },
    {
      "claim": "The summary.md files under logs/ describe the current workspace",
      "status": "DISALLOWED",
      "allowed_only_if": "Never by rewriting them: they are immutable historical record. Only a NEW run, executed from today's workspace, produces evidence that describes the workspace as it is.",
      "current_reason": "All eight summary.md files cite C:\\Users\\chris\\Documents\\AI_Workflow_Workspace\\..., the workspace O1 declared demolished on both machines. They are correct as historical record — they were written before the move — but every \"To review in the morning\" command in every log points at a path that no longer exists. D-053 accepted that cost in writing when it versioned logs/: hiding the staleness is not repairing it.",
      "source_refs": [
        "../projects/aiw-console/context/aiw-console/records/MEDICION-ESTADO-DE-AIW.md §5.2.d (:841-847)",
        "../projects/aiw-console/context/DECISIONES.md D-053, adjudication 1 (:1666-1675)",
        "../projects/aiw-console/context/aiw-console/records/PORTABILIDAD-EVIDENCIA-AIW.md (:280-284)",
        "logs/000-sandbox/summary.md"
      ]
    },
    {
      "claim": "The evidence in logs/000-sandbox/ describes a single run",
      "status": "DISALLOWED",
      "allowed_only_if": "Never for this folder: it holds the evidence of two distinct runs and editing it would destroy the incident, not repair it. What changes going forward is that no new folder can be silently reused — that is RUN-AIW-RUN-IDENTITY-001 and RUN-AIW-RUN-MANIFEST-001, both still planned.",
      "current_reason": "logs/000-sandbox/summary.md asserts APPROVED, closed 2026-07-11T01:56:53.134Z, while objectives/processed/ERROR-000-sandbox.md asserts ERROR for the same id; preflight.txt inside the same folder is stamped 2026-07-11T06:00:33.205Z, AFTER that close. Two runs shared one log folder because logDir derives from the objective name alone — no timestamp, no counter, and no check that the folder already exists. It has not been repaired, and it is the very incident D-055 documents for the per-run manifest.",
      "source_refs": [
        "../projects/aiw-console/context/aiw-console/records/AUDIT-CONTENIDO-AIW.md §6.1 (:643-654)",
        "../projects/aiw-console/context/DECISIONES.md D-055, case 1 (:1839-1861)",
        "logs/000-sandbox/summary.md",
        "logs/000-sandbox/preflight.txt",
        "objectives/processed/ERROR-000-sandbox.md"
      ]
    },
    {
      "claim": "e5-secreto produces BLOCKED and e6-changes-requerido produces ROUNDS_EXHAUSTED under today's kernel",
      "status": "DISALLOWED",
      "allowed_only_if": "The two tickets are executed against the running kernel and the outcome is transcribed.",
      "current_reason": "The parse repair returned both tickets to OK under parseObjective — they no longer abort at K:147 — but none of the six repaired tickets was executed. That they PARSE was the deliverable; that they RUN was not. The record marks it [NO VERIFICADO] twice, in its own words: only a real execution says this. Consequence, measured: two of the kernel's five outcomes still have no fixture the suite actually exercises.",
      "source_refs": [
        "../projects/aiw-console/context/aiw-console/records/REPARACION-PARSEO-TICKETS-AIW.md (:422-428)",
        "../projects/aiw-console/context/aiw-console/records/REPARACION-PARSEO-TICKETS-AIW.md (:410-411)",
        "../projects/aiw-console/context/aiw-console/records/REPARACION-PARSEO-TICKETS-AIW.md (:478-480)",
        "../projects/aiw-console/context/DECISIONES.md D-056 (:1964-2054)"
      ]
    }
  ]
}
```

## 7.3 Por qué los dos archivos están en inglés

Por la **regla de idioma** fijada en
`records/CORRECCIONES-QA-CARRILES-Y-REGLA-DE-IDIOMA.md`, Bloque C (`:153-164`):
*«El CONTENIDO de cada proyecto va en el idioma que el proyecto use… la consola
los muestra VERBATIM»*. Estos dos archivos son **contenido transportado** de
AIW, y el contenido de AIW está en inglés: su roadmap canónico lo está
(títulos, `summary` y `full_description` de los 42 runs), y el ejemplar de
`aiw-console` también. Este record va en español porque **un record no es
interfaz** (misma fuente, `:262`).

---

# 8. LA FRONTERA DE SALIDA (criterio 8)

`git status --porcelain` de `aiw` **al cierre**:

```
 M .project/roadmap.json
 M .project/snapshot.json
 M roadmap/roadmap.json
?? .project/docs_index.json
?? .project/git_history.json
?? governance/
```

Idéntico a la apertura **más una sola línea**: `?? governance/`.

`git status --porcelain -uall governance/`:

```
?? governance/guardrails.json
?? governance/no_claims.json
```

**Exactamente dos archivos nuevos, los dos bajo `aiw/governance/`.** Ningún
tercero — en particular, **`governance/contract.json` NO existe**.

`git diff --stat` (sobre trackeados):

```
 .project/roadmap.json  |  6 +++---
 .project/snapshot.json | 10 +++++-----
 roadmap/roadmap.json   |  2 +-
 3 files changed, 9 insertions(+), 9 deletions(-)
```

Los tres son la **suciedad de apertura**, intactos: este encargo no escribió en
ninguno. **Cero archivos modificados en el resto de `aiw`.**

| Superficie | Estado |
|---|---|
| `kernel.mjs`, `queue.mjs`, `config.json` | intactos — no aparecen en `diff --stat` |
| `objectives/`, `logs/`, `roadmap/`, `.project/` | intactos (`roadmap/` y `.project/` sólo con la suciedad de apertura) |
| `CONSTITUCION.md`, `claude.md`, `CONTEXTO.md` | intactos — se leyeron y se citaron |
| `aiw-console` | `git status --porcelain` **vacío** salvo este record |
| `cantu-studio` | `git status --porcelain` **vacío**. Ni un byte |

**HEAD de `aiw` al cierre: `f55449fac3a6a11651aed015adfd73d6bfdfb34f`** — el
mismo de la apertura. No se commiteó.

## 8.1 Lo que este encargo NO hizo

- **No escribió `aiw/governance/contract.json`.**
- **No re-emitió `.project/`** ni ejecutó el proyector completo. Que los dos
  artefactos aparezcan es un acto posterior.
- No modificó el proyector ni ningún archivo de `aiw-console` fuera de este
  record. No escribió en `DECISIONES.md`.
- No modificó `CONSTITUCION.md` ni `claude.md`. Los dos defectos hallados en
  `claude.md` (3.4.a, 3.4.b) se **nombran**, no se corrigen.
- No modificó `kernel.mjs`, `queue.mjs` ni `config.json`. **No corrió la
  suite.** No ejecutó ningún ticket.
- No levantó la consola ni el server. Git sólo en lectura: `status`,
  `rev-parse`, `diff --stat`, `ls-files`.
- **No creó ninguna regla nueva.**

---

# 9. INFERENCIAS Y NO VERIFICADOS (criterio 10)

- **`[INFERENCIA]`** — que el vocabulario de `status` sea de un solo token
  (`ACTIVE` / `DISALLOWED`) es lo que el ejemplar exhibe; **no hay enum escrito
  en ninguna parte y el emisor no lo valida** (2.3). Se siguió el ejemplar.
- **`[INFERENCIA]`** — el criterio de inclusión de 3.1 lo redactó este encargo
  para poder separar regla de hecho descriptivo. El ejemplar sólo dice *«a rule
  that is already in force»* (`EJ-G:2`); el resto es lectura del taller y por eso
  los 7 excluidos se listan uno a uno en vez de desaparecer.
- **`[NO VERIFICADO]`** — que los dos artefactos aparezcan en `.project/` al
  re-emitir. Está probado que `buildTransportedList` devuelve array no nulo para
  ambos (bloque 5) y que `PROJ:1590` sólo salta artefactos nulos; **la emisión no
  se ejecutó.**
- **`[NO VERIFICADO]`** — que la consola renderice las dos tablas. No se levantó
  (fuera de alcance), igual que en `EMISION §5.3`.
- **`[NO VERIFICADO]`** — que los 49 tests estén verdes. Este encargo tampoco los
  corrió; es, de hecho, la primera entrada de `no_claims.json`.
- **Medido, no inferido:** la resolución de rutas fuera del root (6.3), las 17 y
  4 entradas (5.2), los 8 `summary.md`, las 478 líneas de `kernel.mjs`, y la
  contradicción de `000-sandbox`.

---

# 10. EL RUN

Este encargo entregó lo que el run 17 pedía, con una salvedad **declarada por el
propio encargo, no descubierta aquí**: de los tres archivos que el `summary` del
run nombra, se escribieron **dos**; `contract.json` se midió y se dejó a la
cabina, que es lo que el `full_description` reserva al operador
(*«it is the one part of this run that needs the operator to confirm rather than
the workshop to draft»*).

**Se declara que el run `RUN-AIW-DECLARED-GOVERNANCE-001` debe quedar en
`completed`.** Este record **no cambia su status**: `roadmap/roadmap.json` no se
tocó (bloque 8) y el cierre lo hace el operador desde la consola.

**No es mecanismo bajo `CONST §4`:** `D-055` excluye del alcance de «mecanismo»
los papeles, y su alcance es *«código o paso nuevo en `aiw`: kernel, cola,
lanzadores, guards»*. Estos dos archivos son **fuente declarada, no código**.
Ninguna línea del kernel cambió.
