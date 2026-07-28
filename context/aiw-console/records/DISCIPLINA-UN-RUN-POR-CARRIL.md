# DISCIPLINA DE EJECUCIÓN PARALELA — «un run a la vez POR CARRIL»

> Encargo de taller. La regla de proceso de Cantu declaraba **ejecución en serie**: se escribió
> antes de que existieran los carriles (D-051) y contradecía de frente la metodología nueva. Un
> hilo que la leyera seguiría ejecutando en serie aunque el roadmap ya esté migrado a carriles.
>
> Fecha: 2026-07-27. **Ningún comando de git que escriba.** Git se usó SOLO EN LECTURA:
> `status --porcelain` (frontera, antes y después, en los dos repos), `log --oneline -1`
> (HEAD), `diff --numstat` / `--stat` (medir lo escrito y lo ajeno). **No se emitió ni re-emitió
> ningún `.project/`.** No se tocó ningún roadmap, ni `CONTRATO.md`, ni `DECISIONES.md`, ni
> ningún record existente, ni el tooling, ni los docs, ni el código de cantu-studio.
>
> **NO SE RESERVA NÚMERO DE DECISIÓN.** Nada aquí cambia el contrato: se corrige el texto de
> gobernanza que quedó atrasado respecto de D-051.
>
> **Archivos escritos, y ninguno más:**
>
> | Repo | Archivo | Qué |
> |---|---|---|
> | `aiw-console` | `context/cantu-studio/CANTU_STUDIO_CONTEXT.md` | bloque «Process discipline», en inglés |
> | `cantu-studio` | `CLAUDE.md` | regla 7 del pipeline + subsección nueva, en español |
> | `cantu-studio` | `AGENTS.md` | regla 7 del pipeline + subsección nueva, en español |
> | `aiw-console` | este record | |

---

## BLOQUE A — EL BARRIDO. Dónde se buscó y qué apareció

**Se midió primero.** Barrido sobre todo `AIW_Workspace` (los tres proyectos, el kernel y
`_reference`) con los patrones `ONE run at a time`, `one run`, `simultaneous runs`, `SAME file`,
`clean git log BEFORE`, `un run a la vez`, `a la vez`, `en paralelo`, `simultane`, `carril`,
`lane`, `mismo archivo`.

### A.1 El texto literal de la regla vieja: UNA sola aparición

| Archivo | Línea | Texto |
|---|---|---|
| `aiw-console/context/cantu-studio/CANTU_STUDIO_CONTEXT.md` | 339 | `- ONE run at a time. Commit + confirm a clean git log BEFORE issuing the next ticket.` |

Es la única. Ninguna otra copia del texto existe en el workspace.

### A.2 Los archivos de reglas de cantu-studio: revisados uno a uno

| Archivo | ¿Existe? | ¿Regla vieja literal? | Qué se encontró |
|---|---|---|---|
| `cantu-studio/CLAUDE.md` | sí (21 637 b) | **no** | `Reglas del pipeline` **7.** «Un solo executor por fase.» y **8.** «No se implementan componentes en paralelo.» (líneas 45-46) |
| `cantu-studio/AGENTS.md` | sí (22 958 b) | **no** | las mismas reglas 7 y 8, en su lista de 11 (líneas 46-47) |
| `cantu-studio/CONSTITUCION.md` | **NO EXISTE** | — | `find -iname "*constituc*"` sobre el workspace entero devuelve **un solo** archivo: `aiw/CONSTITUCION.md`, el del kernel |

**Hallazgo:** la formulación literal no vive en el repo de cantu-studio. Lo que vive ahí es la
**misma serialidad en vocabulario pre-carril**: la regla 7 prohíbe ejecutores en paralelo por
fase, que es exactamente lo que los carriles habilitan.

### A.3 Lo que se encontró y se dejó en paz, con la razón

| Sitio | Texto | Por qué NO se tocó |
|---|---|---|
| `aiw/CONSTITUCION.md:41` | «Un run por repo a la vez (lockfile). Multiproyecto = repos distintos en paralelo.» | **Otra regla.** Es el lockfile del kernel, una garantía de exclusión mutua por repo, no la disciplina de emisión de tickets. Además es el kernel, fuera del alcance declarado. |
| `CLAUDE.md` / `AGENTS.md` regla **8** | «No se implementan componentes en paralelo.» | **Decisión de la cabina**, consultada antes de escribir: se trata como regla de alcance de componentes, no de scheduling de runs. Queda intacta. |
| Coincidencias en roadmaps, snapshots, `.project/`, tests y run notes | «ONE run until it is planned in detail», «one run per batch», «at most one running», … | Ninguna es la regla: son descripciones de runs, invariantes del validador o prosa histórica. |

---

## BLOQUE B — La regla vieja y la nueva, textuales

### B.1 ANTES (`CANTU_STUDIO_CONTEXT.md`, bloque «Process discipline»)

```text
- ONE run at a time. Commit + confirm a clean git log BEFORE issuing the next ticket.
- NEVER launch two simultaneous runs touching the SAME file.
```

### B.2 DESPUÉS

```text
- ONE run at a time PER LANE. Lanes run in parallel; a single lane never runs two.
  (This replaces the pre-lane rule "ONE run at a time. Commit + confirm a clean git
  log BEFORE issuing the next ticket.", written before lanes existed.)
- NEVER launch two simultaneous runs touching the SAME file. Two lanes are parallel
  ONLY if their WRITE surfaces are disjoint: if two runs would touch the same file
  they go in SERIES, even when their lanes differ.
- A ticket never changes its own run's status and never re-emits .project/. Each
  ticket DECLARES the status its run must land in; the operator closes it from the
  global console, whose write endpoint writes the canonical and re-emits .project/
  atomically. The console is the serialisation point.
- The operator is the only one who runs Git, so commits are already serialised
  there. A ticket does not wait on a clean git log before the next one is issued.
- NEVER run the full suite in two workshops at once: one writes while the other
  reads, and that produces phantom failures.
```

**«NEVER launch two simultaneous runs touching the SAME file» NO SE BORRÓ.** Sigue ahí, palabra
por palabra, y ahora lleva pegada la condición que la convierte en operativa bajo carriles: las
superficies de escritura tienen que ser **disjuntas**. Es la mitad de la regla que ya era
correcta; la que se cae es la otra mitad, la que serializaba por commit.

### B.3 Las cuatro disciplinas que el paralelismo obliga a escribir

1. **El encargo no cierra su propio run.** Declara el status en el que debe quedar; no cambia el
   status ni re-emite `.project/`. Lo cierra el operador desde la consola global, cuyo endpoint
   de escritura (`POST /projects/<key>/__project-console/roadmap/edit`) escribe el canónico de
   forma atómica y re-emite `.project/` a continuación. **La consola es el punto de
   serialización** — el único escritor, aunque haya N talleres.
2. **El operador es el único que ejecuta git.** Por eso los commits ya están serializados, y por
   eso un ticket **no espera un git log limpio** antes de que se emita el siguiente: esa espera
   era el mecanismo de serialización de la regla vieja, y ahora sobra.
3. **La suite completa no se corre en dos talleres a la vez.** Uno escribe mientras el otro lee,
   y eso produce fallos fantasma — fallos que no son del código sino de la concurrencia, y que
   cuestan una investigación entera.
4. **Superficies de escritura disjuntas.** Es la condición de existencia del paralelismo, no una
   recomendación: si dos runs tocarían el mismo archivo van en serie **aunque estén en carriles
   distintos**. El carril no autoriza la colisión; solo dice que el trabajo no compite.

---

## BLOQUE C — Los tres sitios escritos

### C.1 `aiw-console/context/cantu-studio/CANTU_STUDIO_CONTEXT.md` — **en inglés**

El documento entero está en inglés y el bloque «Process discipline» es un fence `text`. El texto
nuevo respeta las dos cosas: inglés, sin backticks dentro del fence (`.project/` se escribe
plano, como el resto del bloque). Dos bullets pasan a seis; **ningún otro bullet del bloque se
tocó** — ni la regla del validador, ni la del STOP del ejecutor, ni la de Phase 0, ni la de
verificar con la terminal del operador.

### C.2 y C.3 `cantu-studio/CLAUDE.md` y `AGENTS.md` — **en español**

Los dos están en español y los dos llevan el mismo bloque `Reglas del pipeline`. La regla 7 se
reescribe en su sitio, con el titular y la cláusula del mismo archivo:

| | Texto |
|---|---|
| **antes** | `7. Un solo executor por fase.` |
| **después** | `7. Un run a la vez POR CARRIL. Los carriles corren en paralelo; un mismo carril nunca corre dos.`<br>`   NUNCA se lanzan dos runs simultáneos que toquen el MISMO archivo.` |

Y debajo de la lista, en los dos archivos, una subsección nueva **`### Disciplina de ejecución
paralela`** con las cuatro disciplinas de B.3 y una línea que dice explícitamente qué regla
sustituye y por qué («escrita antes de que existieran los carriles»).

**Por qué una subsección y no un punto 7 gigante:** las dos listas son de one-liners. Meter cinco
párrafos dentro de una entrada numerada habría roto la forma del documento y enterrado la regla.
El titular queda en su número —que es donde un hilo lo lee— y el detalle operativo queda contiguo.

Diff medido: **AGENTS.md 12 líneas (+11/−1), CLAUDE.md 12 líneas (+11/−1)**. Estrictamente el
reemplazo de la regla 7 más la subsección.

---

## BLOQUE D — Verificación sin daño

### D.1 El validador de cantu-studio: VERDE, por la vía que no escribe

`CLAUDE.md` y `AGENTS.md` **sí están registrados** en el `docs_index` de Cantu (medido con un
parseo del JSON, no con grep): `AGENTS.md` → «AGENTS Operating Governance», `CLAUDE.md` → «CLAUDE
Legacy Operating Guide», presentes en `.aiw/docs/docs_index.json` **y** en `.project/docs_index.json`
(140 entradas cada uno). Por eso el validador era condición y no formalidad.

```
node tools/project-console/validate-project-console-state.mjs
```

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 71 runs; queue groups needs_human_decision=0 now=0 ready_next=9 later=60 history=2
Docs indexed: 140
Docs curated primary-visible: 53 of 140 registered
Component statuses: 16
```

`EXIT=0`. El único aviso es el no-bloqueante de siempre (la dependencia externa legal
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` → `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`),
palabra por palabra igual que en los records anteriores.

Es el comando de lectura: valida el estado en disco y **no escribe nada**. No se ejecutó ninguna
emisión, ninguna re-emisión ni ninguna operación del motor de roadmap.

### D.2 Frontera, antes y después

| Repo | Antes del encargo | Después |
|---|---|---|
| `cantu-studio` | `git status --porcelain` **vacío**; HEAD `b4e8ed0f` | `M AGENTS.md`, `M CLAUDE.md` — **más un archivo ajeno, ver E.1** |
| `aiw-console` | `git status --porcelain` **vacío**; HEAD `897c710` | `M context/cantu-studio/CANTU_STUDIO_CONTEXT.md` (+ este record, sin trackear) |

**Ningún roadmap tocado por este encargo**: ni `aiw-console/roadmap/roadmap.json`, ni
`cantu-studio/.aiw/roadmap/roadmap.json`, ni ningún `.project/roadmap.json`. Los seis archivos de
`.project/` de Cantu conservan su `mtime` de las 17:43, anterior a este encargo: **no se re-emitió
nada**. Nada borrado en ninguno de los dos repos.

---

## BLOQUE E — Lo que queda abierto

### E.1 UNA COLISIÓN REAL, EN VIVO, DURANTE ESTE ENCARGO

`cantu-studio/.aiw/roadmap/roadmap.json` aparece modificado y **no lo escribió este encargo.**

| Evidencia | Valor |
|---|---|
| `git status --porcelain` de Cantu al empezar | **vacío** |
| `mtime` del canónico ahora | **22:35:17** |
| `mtime` de los dos archivos que sí escribió este encargo | 22:36:38 (`CLAUDE.md`), 22:36:44 (`AGENTS.md`) |
| Delta | **+346 / −96 líneas**; el validador cuenta **71 runs** donde el record de la migración a carriles registró **53** |
| `.project/` de Cantu | `mtime` **17:43**, sin re-emitir |

Este encargo no ejecutó ni una operación de motor, ni una emisión, ni una escritura fuera de
`AGENTS.md` y `CLAUDE.md`; el canónico cambió **un minuto y veinte segundos antes** de la primera
de esas dos escrituras. **Otro taller estaba escribiendo el roadmap de Cantu mientras este
encargo leía sus reglas.**

Se reporta y **no se toca**. Merece decirse en voz alta porque es exactamente el caso que la
regla nueva gobierna, ocurrido mientras se escribía la regla: dos carriles con superficies de
escritura **disjuntas** (uno el canónico, otro los archivos de gobernanza) corriendo a la vez sin
pisarse — que es el resultado correcto. Lo que sí queda para el operador es que **el `.project/`
de Cantu está desfasado respecto de su canónico** (71 runs en `.aiw/`, la emisión de las 17:43
sin ellos). Re-emitir es escritura y estaba fuera de alcance; se nombra para que no se lea como
daño de este encargo.

### E.2 Lo demás

1. **La regla 8** («No se implementan componentes en paralelo») queda **intacta por decisión de
   la cabina**, tomada antes de escribir. Si algún día se lee como scheduling y no como alcance
   de componentes, contradirá los carriles igual que lo hacía la 7. Queda dicho.
2. **`aiw/CONSTITUCION.md:41`** («un run por repo a la vez, lockfile») no se tocó: es exclusión
   mutua del kernel, no emisión de tickets. Pero **el vocabulario colisiona** — la palabra «run»
   significa cosas distintas en las dos frases. Si la cabina quiere desambiguarlo, es una línea.
3. **`DECISIONES.md` no se tocó** (fuera de alcance). Si la cabina quiere numerar la corrección
   de la disciplina de proceso, es una entrada de una línea que apunta a este record.
4. **`.project/` de `aiw-console`**: el desfase que arrastran los records anteriores sigue ahí.
   Este encargo no añade un byte y tampoco lo resuelve.

---

## Estado de completitud

- Bloque A (barrido con patrones declarados; una sola aparición literal; los tres archivos de
  reglas revisados uno a uno, incluida la constatación de que `CONSTITUCION.md` no existe en
  cantu-studio; lo encontrado y dejado en paz, con razón) — COMPLETO.
- Bloque B (regla vieja y nueva textuales; la mitad conservada verbatim; las cuatro disciplinas
  del paralelismo) — COMPLETO.
- Bloque C (los tres sitios, cada uno en el idioma de su documento; antes/después de la regla 7;
  la razón de la forma; diff medido) — COMPLETO.
- Bloque D (validador verde por la vía que no escribe, con `CLAUDE.md` y `AGENTS.md` probados
  presentes en el `docs_index`; frontera antes y después en los dos repos; ningún roadmap y
  ningún `.project/` tocados) — COMPLETO.
- Bloque E (la colisión ajena medida y reportada sin tocarla; lo abierto) — COMPLETO.
