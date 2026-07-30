# FRONTERA Y TEST DE REGRESIÓN DE PARSEO DE TICKETS DE AIW

**Fecha:** 2026-07-29 · **Run:** `RUN-AIW-TICKET-PARSE-REGRESSION-TEST-001`
(`queue_order` 24, O3 «Reliable autonomous run» / O3.P4 «Ticket parse regression
test») · **Naturaleza:** añade UN archivo de test a la suite de `aiw`
(`aiw/tests/ticket-parse.test.mjs`) y traza la frontera entre entrada viva del
kernel y registro histórico, derivada del código. **No toca `kernel.mjs` ni
`queue.mjs`, no repara ningún ticket, no mueve ni borra nada bajo `processed/`, no
ejecuta git, no toca la consola, no cambia el status de ningún run, no corre la
suite de `aiw-console`.** · **Máquina:** PC (Windows 10,
`C:\Users\chris\Documents\AIW_Workspace\`). · **Node:** v24.12.0 (`node --version`).

**Escritura total de este run:** `aiw/tests/ticket-parse.test.mjs` (nuevo), este
record, y un fixture temporal de demostración creado y **retirado** (§6). Nada más.

---

## 1. Guarda de identidad (criterio 1) — PASA

Derivada del canónico `aiw/roadmap/roadmap.json` recorriendo
`objectives[].phases[].runs[]` y filtrando por `queue_order === 24`. Un solo nodo
coincide:

| Campo | Valor en disco | Cita |
|---|---|---|
| `title` | `Add the regression test that runs the parser against every real ticket` | `roadmap/roadmap.json:339` |
| `run_id` | `RUN-AIW-TICKET-PARSE-REGRESSION-TEST-001` | `roadmap/roadmap.json:337` |
| `queue_order` | `24` | `roadmap/roadmap.json:338` |
| `phase_id` | `O3.P4` («Ticket parse regression test») | `roadmap/roadmap.json:333-334` |
| `objective_id` | `O3` («Reliable autonomous run») | `roadmap/roadmap.json:279-280` |
| `status` | `active` | `roadmap/roadmap.json:342` |

El `title` coincide **carácter a carácter** con el exigido por la guarda. No hubo
que resolver por parecido.

**Renumeración de cola detectada y declarada (medida, no inferida).** Dos records
fechados citan otra numeración: `REPARACION-PARSEO-TICKETS-AIW.md:497` llama a este
run «`queue_order` 25», y `MEDICION-GUARDA-PARSEO-CASOS-EVALUACION.md:3-4`
(2026-07-29) midió que `queue_order` 24 era entonces
`RUN-AIW-EVAL-CASE-CONVENTION-001`. Hoy el canónico asigna **24 a este run**
(`roadmap/roadmap.json:338`) y **25 a la convención de casos**
(`roadmap/roadmap.json:320`), que ahora depende de este run
(`roadmap/roadmap.json:325-328`). **Gana el disco de hoy.** Cuándo y por qué acto
se renumeró es **[NO VERIFICADO]** — vive en el historial de git y de la consola, y
este encargo tiene git vedado.

---

## 2. `CONST §4` — los tres criterios fijos, verificados de primera mano (criterio 2)

`aiw/CONSTITUCION.md` §4 se leyó de disco en este encargo: techo ~500 y «Para
añadir, se borra» (`CONSTITUCION.md:29`), ningún mecanismo sin incidente con los
cuatro campos (`CONSTITUCION.md:30-31`), «Una idea no es un incidente. Un miedo no
es un incidente» (`CONSTITUCION.md:32`), criterio de borrado «se elimina si X»
(`CONSTITUCION.md:33`). `D-055` y `D-056` se leyeron de disco en
`context/DECISIONES.md:1806-1962` y `:1964-2054`.

### 2.a El incidente y sus cuatro campos (`CONST:30-32`), de `D-055` caso 4

Transcritos campo a campo de `DECISIONES.md:1900-1934`, con lo que hoy los
sostiene:

1. **FECHA.** La del commit `7659ff3` («aiw2: english normalization + …»).
   `D-055` la dejó **[NO VERIFICADO]** (`DECISIONES.md:1904-1907`) y `D-056`
   mantuvo ese hueco abierto (`DECISIONES.md:2039-2042`). El `full_description` de
   este run la reporta como `2026-07-10T15:24:15-06:00`, leída del historial por la
   comisión que escribió el roadmap (`roadmap/roadmap.json:341`). Para este encargo
   sigue siendo **cita, no medición** — git vedado —, así que de primera mano queda
   **[NO VERIFICADO]**. Lo que sí está fechado sin hueco es la **constatación**:
   2026-07-28, cuando el audit corrió el parser contra los archivos reales
   (`DECISIONES.md:1907-1908`).
2. **QUÉ SE ROMPIÓ.** `parseObjective` normaliza cada H1 con `stripAccents` y busca
   las claves en inglés; los seis tickets de `qualification/` y `queue-e7/`
   llevaban encabezados en español, las tres secciones requeridas salían vacías y
   el kernel abortaba (`DECISIONES.md:1909-1919`). **Sostenido hoy de primera
   mano:** el mecanismo sigue tal cual en el código — `stripAccents` en
   `kernel.mjs:120`, captura de H1 en `kernel.mjs:131-133`, claves en inglés en
   `kernel.mjs:138-144`, aborto en `kernel.mjs:146-147` —, y el efecto sigue
   visible en las cinco copias españolas de `processed/`, medidas hoy (§7).
3. **QUÉ COSTÓ.** Dos de los cinco desenlaces del kernel perdieron su único fixture
   ejecutable — `BLOCKED` (`e5-secreto`) y `ROUNDS_EXHAUSTED` por
   `CHANGES_REQUIRED` agotado (`e6-changes-requerido`) — y los seis tickets
   quedaron en letra muerta, abortando antes de git, del lockfile y del preflight
   (`DECISIONES.md:1920-1926`). Sostenido por cita de `AUDIT §6.4` vía `D-055`; la
   cobertura de desenlaces no se re-midió aquí (fuera de alcance, igual que declaró
   `MEDICION-GUARDA-PARSEO-CASOS-EVALUACION.md:360-363`).
4. **POR QUÉ EL DIFF MATINAL NO LO CAZÓ.** El cambio estuvo en el parser y el
   template; **los seis tickets no aparecieron en ese diff porque no se tocaron**;
   nada en la suite los ejecutaba y son invisibles a toda vista de la consola
   (`DECISIONES.md:1927-1934`). **Sostenido hoy de primera mano en su parte
   estructural:** antes de este run, el único test que nombraba `objectives/` era
   `sandbox-objective.test.mjs:20-21`, y solo para asertar la **ausencia** de un
   archivo — ninguna prueba de la suite leía ticket real alguno
   (`grep -rn "objectives" tests/`, ejecutado hoy).

### 2.b El criterio de borrado VIGENTE

**El que rige es el de `D-056`** (`DECISIONES.md:1983-1997`), que corrigió hacia
adelante el de `D-055` sin reescribirlo. Los dos, verbatim:

El de `D-055` (`DECISIONES.md:1939-1942`), **corregido y ya no vigente**:

> «se elimina si los tickets en Markdown dejan de ser la entrada del kernel —el
> test se queda sin sujeto— o si los cinco desenlaces ganan fixture por otra vía
> que la suite sí ejecute».

El de `D-056` (`DECISIONES.md:1983-1990`), **VIGENTE**:

> El test de parseo de tickets se elimina si:
> - **(a)** los tickets en Markdown dejan de ser la entrada del kernel —el test se
>   queda sin sujeto— *(cláusula 1, INTACTA: transcrita de `D-055`, sin
>   reformular)*; **o**
> - **(b)** los cinco desenlaces del kernel ganan fixture por otra vía que la suite
>   sí ejecute **Y**, **a la vez**, todos los tickets bajo `objectives/**` siguen
>   parseando bajo el parser vigente.

La sustancia de la corrección: las dos condiciones de (b) son **conjuntas**
(`DECISIONES.md:1992-1997`). La disyunción vieja permitía retirar el vigilante
reparando solo el daño menor (`DECISIONES.md:2015-2023`).

**Nota de lectura sobre (b), derivada de la frontera de §4 y solo nombrada:** hoy
cinco archivos de `processed/` no parsean y por doctrina no se reparan; mientras
eso sea así, la condición «todos los tickets bajo `objectives/**` siguen
parseando» de (b) no puede cumplirse leída literalmente sobre todo el árbol. Si
(b) debe leerse sobre la frontera viva o sobre el árbol entero es cosa de la
cabina, no de este run; se deja nombrado.

### 2.c El presupuesto de líneas: 0 contra el techo — VERIFICADO

`D-055` declara 0 líneas porque el test vive en la suite
(`DECISIONES.md:1936-1938`); `D-056` lo ratifica (`DECISIONES.md:2037-2038`).
Medido con `wc -l aiw/kernel.mjs`:

| Momento | Líneas |
|---|---|
| ANTES de todo el trabajo | **478** |
| DESPUÉS de todo el trabajo | **478** |

**Idénticos.** La implementación no necesitó tocar `kernel.mjs` ni ningún otro
código del kernel. La compuerta declarada por el disco (`D-055`/`D-056`) queda
respetada tal como se abrió.

---

## 3. LA FRONTERA — derivada del código, no elegida (criterio 3)

### 3.1 Lo que dice el código, medido hoy

- **El kernel no conoce ninguna carpeta.** Recibe UN archivo por `argv[2]`
  (`kernel.mjs:263`), lo lee y lo parsea (`kernel.mjs:269-270`). `grep` de
  `objectives` y de `processed` sobre `kernel.mjs` devuelve **cero líneas**
  (ejecutado hoy; consistente con «no hay una sola referencia a processed en sus
  478 líneas», `roadmap/roadmap.json:163`).
- **La única entrada viva por código es `objectives/pending/`.** `queue.mjs:14` la
  fija (`PENDING`), `queue.mjs:49` la lee (`readdirSync(PENDING)`, filtro `.md`,
  orden alfabético) y `queue.mjs:55` lanza el kernel sobre cada archivo.
- **`objectives/processed/` es destino de escritura y nada más.** `queue.mjs:15` lo
  fija (`PROCESSED`), `queue.mjs:48` lo crea si falta y `queue.mjs:58` archiva ahí
  cada ticket consumido como `<STATE>-<nombre>` (estados de `queue.mjs:18`).
  **Ningún código de `aiw` lo lee de vuelta.**
- **Ningún código de `aiw` lee `parked/`, `qualification/` ni `queue-e7/`** (los
  greps anteriores; el único test que nombraba `objectives/` aserta una ausencia,
  `sandbox-objective.test.mjs:20-21`). Quien clasifica carpetas es el proyector de
  la consola, que recorre exactamente pending/parked/processed
  (`roadmap/roadmap.json:172`, cita del canónico) — código de consola, fuera del
  alcance de este run.

### 3.2 Lo que dice la doctrina escrita, leído y citado

- `REPARACION-PARSEO-TICKETS-AIW.md:356-361` (§7), verbatim: «`processed/` es
  **registro histórico inmutable de lo que corrió**: sus archivos son la foto del
  ticket tal como el kernel lo consumió aquel día, y reescribirlos falsificaría el
  registro. El ticket de `queue-e7/` es el **artefacto vivo**: existe para volver a
  correr, y para eso tiene que parsear.» El `#15` excluyó `processed/` a propósito
  bajo esa doctrina (`REPARACION-PARSEO-TICKETS-AIW.md:363-364`).
- `DISPOSICION-CARPETAS-COLA-AIW.md` §2.c y §3: `queue-e7/` es el almacén fuente
  del fixture E7 y `qualification/` el banco de los escenarios E5/E6/E8; su casa
  definitiva la define la convención de casos de evaluación (hoy `#25`), y por eso
  «se quedan donde están» (`DISPOSICION-CARPETAS-COLA-AIW.md:254-259`). `prepared/`
  y `staged/` fueron suprimidas por ese mismo run
  (`DISPOSICION-CARPETAS-COLA-AIW.md:280-292`); hoy `objectives/` tiene exactamente
  cinco carpetas, medido con `ls`: `parked`, `pending`, `processed`,
  `qualification`, `queue-e7`.
- Los tres de `parked/` son tickets **vivos aparcados** — la reconciliación del
  `#13` los declaró «Alive: the three parked» (`roadmap/roadmap.json:163`) — que
  ningún código de `aiw` lee hoy; declaran `# Project` `jame_snapshot`, no
  registrado en `config.json` (cita: `DISPOSICION-CARPETAS-COLA-AIW.md:131-141`;
  `config.json` leído hoy: registra `sandbox` y `console`). No parsear NO es su
  problema: los tres parsean (§7).

### 3.3 La tabla de adjudicación

| Carpeta | Adjudicación | Qué lo decide | ¿Cubierta por el test? |
|---|---|---|---|
| `objectives/pending/` | **VIVA** — entrada de la cola | `queue.mjs:14`, `:49`, `:55` | **SÍ** |
| `objectives/parked/` | **VIVA latente** — tickets aparcados que existen para volver a la cola | ausencia de referencia en código (greps de hoy) + `roadmap/roadmap.json:163` («Alive: the three parked») | **SÍ** |
| `objectives/qualification/` | **BANCO DE FIXTURES** (E5/E6/E8) — artefacto vivo | `DISPOSICION-CARPETAS-COLA-AIW.md:254-259` + `REPARACION-PARSEO-TICKETS-AIW.md:356-361` | **SÍ** |
| `objectives/queue-e7/` | **BANCO DE FIXTURES fuente** (E7) — artefacto vivo | `DISPOSICION-CARPETAS-COLA-AIW.md:204-214` + `REPARACION-PARSEO-TICKETS-AIW.md:356-361` | **SÍ** |
| `objectives/processed/` | **REGISTRO HISTÓRICO INMUTABLE** | `queue.mjs:15`, `:58` (solo escritura; nada lo lee) + doctrina `REPARACION-PARSEO-TICKETS-AIW.md:356-364` | **NO** |
| `.md` sueltos en la raíz de `objectives/` y **carpetas futuras** | cubiertos **por defecto** | diseño del test: excluye por nombre solo lo histórico, no lista blanca de lo vivo (`tests/ticket-parse.test.mjs:17`) | **SÍ** |

**Por qué lista de exclusión y no lista blanca, y es la lección del incidente:** los
seis rotos de `D-055` vivían en carpetas que ninguna lista blanca de entonces
habría nombrado — `qualification/` y `queue-e7/` estaban fuera de todo recorrido
(`DECISIONES.md:1930-1933`). Un test que enumerara lo vivo repetiría esa ceguera
con la carpeta que se cree mañana. El test cubre todo `objectives/**` y excluye por
nombre únicamente lo adjudicado histórico: `processed/`.

---

## 4. GUARDA DE UTILIDAD — el test caza el incidente que lo justifica (criterio 4)

El incidente de `D-055` caso 4 son tickets con encabezados en español en carpetas
que no son `pending/`. Las dos carpetas del incidente (`qualification/`,
`queue-e7/`) **están cubiertas** por la frontera de §3, así que la frontera habría
cazado a los seis. Demostrado ejecutándolo:

1. Se sembró un fixture temporal
   `objectives/qualification/tmp-demo-incidente-espanol.md` con los seis
   encabezados en español del incidente (`# Proyecto`, `# Objetivo`, `# Criterios
   de aceptación`, `# Alcance`, `# Fuera de alcance`, `# Verificación`).
2. Suite completa (`node --test tests/*.test.mjs` desde `aiw/`): **ROJA** —
   `tests 51, pass 50, fail 1`. El fallo nombra el archivo y el mensaje del
   kernel, no un conteo pelado. Salida real, transcrita:

   ```
   ✖ every live ticket under objectives/** parses (processed/ is history, not asserted)
   AssertionError [ERR_ASSERTION]: 1 ticket(s) the kernel can no longer parse:
   objectives/qualification/tmp-demo-incidente-espanol.md: objective.md invalid:
   missing required sections: project, objective, criteria. See templates/objective.md
   ```

3. Fixture **retirado**. `ls objectives/qualification/` de vuelta a sus tres
   archivos (`e5-secreto.md`, `e6-changes-requerido.md`, `e8-multiarchivo.md`).
4. Suite completa de nuevo: **VERDE** (§5).

---

## 5. GUARDA DE VERDAD — la suite, verde contra el repo real de hoy (criterio 5)

Comando: `node --test tests/*.test.mjs` desde `aiw/` (no hay `package.json` en la
raíz de `aiw`; el glob lo expande el shell — `create-sandbox.mjs:38` documenta que
el descubrimiento por directorio de `node --test` no funciona en Windows).

| Momento | tests | pass | fail |
|---|---|---|---|
| ANTES de escribir el test (línea base) | 49 | **49** | 0 |
| Con el fixture de demostración sembrado | 51 | 50 | **1** |
| DESPUÉS, contra el repo real de hoy | 51 | **51** | **0** |

El test nuevo pasa **sin reparar, mover, renombrar ni tocar un solo byte bajo
`processed/`**. Prueba de intocabilidad sin git (git vedado): md5 de hoy contra los
md5 de las mediciones fechadas — idénticos uno a uno:

| Archivo | md5 hoy (`md5sum`, medido) | md5 en record fechado |
|---|---|---|
| `processed/APPROVED-000-sandbox-suma.md` | `cc7def32d972355e4dcf84927e7cd919` | idem, `MEDICION-GUARDA-PARSEO-CASOS-EVALUACION.md:163` |
| `processed/APPROVED-a-resta.md` | `f7fd01200b207a71e17c96d424481a52` | idem, `:164` |
| `processed/APPROVED-b-multiplica.md` | `efdfeb2cbbc83308334bb8519e92e420` | idem, `:165` |
| `processed/HUMAN_REVIEW-999-sandbox-imposible.md` | `03bce013a4c8d637bc96cede2153eade` | idem, `:161` |
| `processed/HUMAN_REVIEW-c-imposible.md` | `62c571fd9779dddeab398999013059c2` | idem, `:162` |
| `processed/ERROR-000-sandbox.md` | `8b063ee0350a30b89f27fe6895e349fd` | idem, `:160` |

---

## 6. El test, en la forma de la suite (criterio 6)

Los archivos de `aiw/tests/` se leyeron antes de escribir. Convención imitada, no
inventada:

- **Nombre:** `ticket-parse.test.mjs` — kebab-case por tema, como
  `archive-move.test.mjs` o `sandbox-objective.test.mjs`.
- **Cabecera:** comentario que nombra el incidente y la decisión que lo justifican,
  como las cabeceras M1/M2/M3 de la suite (`sandbox-objective.test.mjs:1-4`,
  `archive-move.test.mjs:1-4`, `observability.test.mjs:1-4`).
- **Aserción:** `node:test` + `node:assert/strict`, importando el `parseObjective`
  real desde `../kernel.mjs` (el guard de entry-point de `kernel.mjs:470` hace el
  import inocuo), como `objective.test.mjs:4-6`.
- **Rutas:** `path.dirname(path.dirname(fileURLToPath(import.meta.url)))`, calcado
  de `sandbox-objective.test.mjs:13`.
- **Rojo con nombre y mensaje:** el fallo lista `ruta: mensaje-del-kernel` por cada
  ticket huérfano (§4), y un segundo test asegura que un recorrido roto no pase
  como verde silencioso (`tests/ticket-parse.test.mjs:35-38`).

Archivos de test: **11 antes → 12 después** (`ls tests/ | wc -l`, medido antes y
después).

---

## 7. Cifras verificadas contra disco hoy (criterio 7)

Barrido propio ejecutado hoy: `parseObjective` importado del módulo real, corrido
sobre todo `.md` bajo `objectives/**` (script en el scratchpad de la sesión, fuera
de `aiw/`):

| Cifra fechada | Medido hoy | ¿Coincide? |
|---|---|---|
| 22 tickets `.md` bajo `objectives/**` | **22** (parked 3, pending 0, processed 13, qualification 3, queue-e7 3) | **sí** |
| 17 parsean, 5 no | **17 / 5** | **sí** |
| Los cinco fallan en `kernel.mjs:147` con `missing required sections: project, objective, criteria` | los cinco, `kernel.mjs:147:29`, mensaje literal `objective.md invalid: missing required sections: project, objective, criteria. See templates/objective.md` | **sí** |
| Los cinco están todos en `processed/` | `APPROVED-000-sandbox-suma`, `APPROVED-a-resta`, `APPROVED-b-multiplica`, `HUMAN_REVIEW-999-sandbox-imposible`, `HUMAN_REVIEW-c-imposible` | **sí**, mismos archivos que `MEDICION-GUARDA-PARSEO-CASOS-EVALUACION.md:188` |
| `kernel.mjs` en 478 líneas, techo ~500 | **478** (`wc -l`), antes y después | **sí** |
| 11 archivos de test bajo `aiw/tests/` | **11** antes de este run (12 después, por el test nuevo) | **sí** |

**La discrepancia de los diecisiete días, verificada y declarada.** El `summary` de
este run dice «going unnoticed for **seventeen days**»
(`roadmap/roadmap.json:340`), y su propio `full_description` cierra el campo 4 con
«**seventeen days later**» (`roadmap/roadmap.json:341`). Pero ese mismo
`full_description` fecha el commit `7659ff3` el `2026-07-10T15:24:15-06:00` y la
constatación el `2026-07-28` — **que son 18 días**, no 17. La cuenta de 18 ya la
usaba `REPARACION-PARSEO-TICKETS-AIW.md:14` («llevaban 18 días muertos»). `D-055`
y `D-056` también dicen «17 días» (`DECISIONES.md:1934`, `:2002`), pero en su día
la fecha del commit era `[NO VERIFICADO]`, así que no se contradicen a sí mismos;
el roadmap sí, porque carga la fecha y el «seventeen» en el mismo campo. **El
roadmap NO se edita: corregirlo es un acto propio, de la cabina.**

---

## 8. Lo que este run NO hizo (criterio 8)

- No reparó, movió, renombró ni borró nada bajo `processed/` (§5, md5 idénticos).
- No reparó ningún ticket, en ninguna carpeta: el único `.md` tocado bajo
  `objectives/` fue el fixture temporal de §4, creado y retirado.
- No escribió la convención de casos de evaluación — ése es el `#25`
  (`roadmap/roadmap.json:320`) y depende de este run
  (`roadmap/roadmap.json:325-328`).
- No tocó `kernel.mjs` (478 → 478) ni `queue.mjs` ni ningún otro código del kernel.
- No cerró su propio run ni re-emitió `.project/`. No ejecutó git en ninguna forma.
  No corrió la suite de `aiw-console`.

---

## 9. LO QUE ESTE RUN LE ENTREGA AL `#25`

La tabla de frontera de §3.3, dicha como hecho derivado del código y de la doctrina
escrita, no como propuesta:

**Bajo esta frontera, un caso de evaluación no puede vivir en `processed/` y ser a
la vez artefacto vivo.** `processed/` es destino de escritura del archivado
(`queue.mjs:15`, `:58`) que ningún código lee de vuelta, y su doctrina lo declara
registro histórico inmutable que no se repara
(`REPARACION-PARSEO-TICKETS-AIW.md:356-364`). La garantía de parseo que la suite
impone desde hoy (`tests/ticket-parse.test.mjs`) existe exactamente sobre el
complemento: `pending/`, `parked/`, `qualification/`, `queue-e7/`, los `.md`
sueltos y toda carpeta futura bajo `objectives/`. Cinco archivos de `processed/` no
parsean hoy y la suite está verde: eso no es un hueco del test, es la frontera
funcionando — lo histórico no promete parsear bajo el parser vigente, lo vivo sí, y
el vigilante hace cumplir la promesa solo donde existe.

Consecuencia ya constatada por la medición previa y vigente bajo esta frontera:
`HUMAN_REVIEW-999-sandbox-imposible` no tiene encarnación viva en ninguna parte —
su único ejemplar está en `processed/` y no parsea
(`MEDICION-GUARDA-PARSEO-CASOS-EVALUACION.md:167-171`, corroborado hoy por md5 y
por el barrido de §7). Qué hace el `#25` con eso no se dice aquí.

---

## 10. Inferencias y no verificados

- **[NO VERIFICADO]** de primera mano la fecha del commit `7659ff3`
  (`2026-07-10T15:24:15-06:00` según `roadmap/roadmap.json:341`): git vedado a este
  encargo. El hueco que `D-055`/`D-056` dejaron abierto sigue formalmente abierto
  en `DECISIONES.md`; cerrarlo ahí es un acto propio.
- **[NO VERIFICADO]** que los 17 tickets que parsean **ejecuten** o produzcan el
  desenlace para el que existen: este run midió parseo, no ejecución — la misma
  limitación declarada por `REPARACION-PARSEO-TICKETS-AIW.md:422-428` y
  `MEDICION-GUARDA-PARSEO-CASOS-EVALUACION.md:356-359`.
- **[NO VERIFICADO]** el estado de git de `aiw` y de `aiw-console` al abrir y al
  cerrar: git vedado. La intocabilidad de `processed/` se probó por md5 contra
  mediciones fechadas (§5) y la del kernel por `wc -l` (§2.c); el resto es por
  construcción: las únicas escrituras de este run son las declaradas en la
  cabecera.
- **[NO VERIFICADO]** cuándo y por qué acto se renumeró la cola 24↔25 (§1): vive en
  historiales que este encargo no abre.
- **[INFERENCIA]** la cobertura por defecto de carpetas futuras (§3.3, última fila)
  es una propiedad del diseño del test, verificada hoy solo contra el árbol
  existente más el fixture temporal; una carpeta futura real la ejercerá cuando
  exista.

Todo lo demás está medido de disco en esta sesión, con su comando o su
`ruta:línea`: el barrido de parseo por ejecución del `parseObjective` real; conteos
por `ls` y `wc -l`; md5 por `md5sum`; el código por lectura directa de
`kernel.mjs`, `queue.mjs` y `tests/`; el canónico por lectura de
`roadmap/roadmap.json`. Lo citado de records o de `DECISIONES.md` va siempre con su
`ruta:línea` y como cita.

---

## 11. Status y cierre

**El `#24` debe quedar en `completed`.** Sus entregables existen y están
verificados: el test vive en la suite (`aiw/tests/ticket-parse.test.mjs`), la suite
está verde 51/51 contra el repo real de hoy, la demostración roja/verde del
incidente consta en §4 con salida real, la frontera está derivada y publicada en
§3, y el presupuesto de 0 líneas contra el techo se cumplió (478 → 478).

**Este record no cambia ningún status.** El operador cierra el `#24` desde la
consola.
