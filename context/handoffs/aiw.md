# Handoff — hilo `aiw`

Última sesión: 2026-08-03. Escrito al cierre.

Este documento lleva la sustancia DENTRO. Razón de topología:
`context/aiw-console/records/` NO se sincroniza al Project. Un record no se puede
citar como si estuviera delante — se trae con encargo de taller o pegado por el
operador. Lo que la próxima sesión necesite para arrancar tiene que estar aquí.

---

## 1. Estado al cierre — verificado, no recordado

- `aiw` en **`e1feead`**, árbol limpio, empujado a `origin/main`.
- `.project/` **re-emitido desde la consola** antes del commit, en el mismo commit.
- **46 runs · 25 `completed` · 21 `planned` · 0 `active`.**
- `queue_order` **denso, único y contiguo `1..46`**.
- **21 aristas `depends_on`, 0 colgantes.**
- **6 objetivos** (`O1`, `O2`, `O3`, `O5`, `O6`, `O7` — **no existe `O4`**, medido, no
  investigado) y **33 fases**, una vacía: "Per-project push activation" (`O6.P1`).
- `kernel.mjs` en **478 líneas** contra el techo de ~500 → **22 de holgura**.
  La cifra viene de los textos del roadmap, no de una medición de esta sesión.
  **Re-medir contra disco antes de usarla en un criterio.**
- `aiw/.project/` tiene **SEIS** artefactos: `docs_index.json`, **`git_history.json`**,
  `guardrails.json`, `no_claims.json`, `roadmap.json`, `snapshot.json`.

`aiw-console` en `04b1ecb`, árbol limpio. Solo se le escribieron dos records y nada
más.

---

## 2. Lo que hizo esta sesión

**Los 21 runs vivos quedaron clasificados**, bajo `D-059`/`D-060`, siguiendo
`context/PROCEDIMIENTO-DE-CLASIFICACION.md`, y escritos **por el motor** de
`aiw-console/tools/roadmap/` — nunca a mano.

- `classified_at` = **`2026-08-03T06:57:46.901Z`**, marca **única** para los 21.
- Escritura verificada campo a campo contra respaldo: 21 runs cambiados, 5 claves
  cada uno, **84/84 valores** idénticos a la tabla aprobada, **0 anomalías**, los 25
  `completed` byte a byte intactos.
- **`external_effects` quedó AUSENTE en los 46.** El motor no lo materializó como
  `[]`. Fue lo aprobado, no un olvido.
- Invariantes: **0 violaciones** en las tres combinaciones ilegales.

Records de esta sesión, en `context/aiw-console/records/` (NO sincronizados):

- `MEDICION-INSUMOS-CLASIFICACION-AIW-2026-08-02.md`
- `ESCRITURA-CLASIFICACION-21-RUNS-AIW.md`

---

## 3. La clasificación de los 21 — la tabla, dentro

`#N` es el `queue_order` **al 2026-08-03**. Es una coordenada FECHADA: si alguien
insertó o movió un run después, ya no es el número de hoy. La identidad es el
título.

| `#N` | Título | `correctness_model` | `work_type` | `blast_radius` | `failure_surfaces` |
|---|---|---|---|---|---|
| 22 | Run the first real objective against a large repository with a test net | SPECIFIED | FUNCTIONAL | SYSTEMIC | SILENT |
| 23 | Make the scope pre-flight demand a real match | SPECIFIED | FUNCTIONAL | ADJACENT | **LOUD** |
| 28 | Let consecutive runs share one working branch so their work chains | **JUDGED_DEFINES** | **FOUNDATIONAL** | SYSTEMIC | SILENT |
| 29 | A failed push escalates to human review instead of closing the run silently | **JUDGED_DEFINES** | **FOUNDATIONAL** | SYSTEMIC | SILENT |
| 30 | Turn on push per project | JUDGED_ACCEPTS | FUNCTIONAL | **PROJECT_SHAPE** | VISIBLE |
| 31 | The intake: turn a roadmap run into an executable contract | SPECIFIED | FUNCTIONAL | SYSTEMIC | SILENT |
| 32 | Declare providers in config and choose one per role in the ticket | SPECIFIED | FUNCTIONAL | SYSTEMIC | SILENT |
| 33 | Give every run an identity its log folder cannot silently overwrite | SPECIFIED | FUNCTIONAL | SYSTEMIC | SILENT |
| 34 | Write one manifest of identity and outcome per run | SPECIFIED | FUNCTIONAL | SYSTEMIC | SILENT |
| 35 | Record tokens and cost per run, if the provider exposes them | SPECIFIED | FUNCTIONAL | ADJACENT | SILENT |
| 36 | Expose signals the reviewer can query instead of trusting self-reports | SPECIFIED | FUNCTIONAL | ADJACENT | SILENT |
| 37 | Document what a run writes and where | JUDGED_ACCEPTS | FUNCTIONAL | ADJACENT | SILENT |
| 38 | Add the category field and settle its vocabulary | **JUDGED_DEFINES** | **FOUNDATIONAL** | SYSTEMIC | SILENT |
| 39 | Let the operator group runs into batches, and let the batch decide the branch | SPECIFIED | FUNCTIONAL | SYSTEMIC | VISIBLE |
| 40 | Document categories and batches | SPECIFIED | FUNCTIONAL | ADJACENT | SILENT |
| 41 | Make the queue survive the terminal that launched it | SPECIFIED | FUNCTIONAL | SYSTEMIC | SILENT |
| 42 | Recover from a lock whose owner is gone | SPECIFIED | FUNCTIONAL | ADJACENT | SILENT |
| 43 | Give each run its own worktree so runs can overlap inside one repository | SPECIFIED | FUNCTIONAL | SYSTEMIC | SILENT |
| 44 | Teach the kernel to read lanes and barriers | SPECIFIED | FUNCTIONAL | SYSTEMIC | SILENT |
| 45 | Run real long unattended sessions and count them honestly | SPECIFIED | FUNCTIONAL | SYSTEMIC | SILENT |
| 46 | Document how to run and audit an unattended window | JUDGED_ACCEPTS | FUNCTIONAL | ADJACENT | SILENT |

Repartos: `correctness_model` 15 SPECIFIED · 3 JUDGED_DEFINES · 3 JUDGED_ACCEPTS ·
`work_type` 18 FUNCTIONAL · 3 FOUNDATIONAL · 0 COSMETIC ·
`blast_radius` 13 SYSTEMIC · 7 ADJACENT · 1 PROJECT_SHAPE · 0 LOCAL ·
`failure_surfaces` 18 SILENT · 2 VISIBLE · 1 LOUD.

**El sesgo de `failure_surfaces` se declara sin maquillar.** Se afiló la pregunta y
siguió en 18. La lectura es que este roadmap está organizado explícitamente contra el
fallo silencioso, así que lo que le queda por hacer es casi todo de esa clase. Es
dato de calibración, no defecto — pero si una sesión futura ve la escala sin
discriminar, esta es la explicación que debe poner a prueba, no aceptar.

### Derivados por el motor al 2026-08-03 — NO son almacenados

`severity`: CRITICAL 12 · MAJOR 8 · MINOR 1 · MODERATE 0
`closure_mode`: SEMI_ATTENDED 17 · ATTENDED 3 · UNATTENDED 1

Se recalculan en lectura; estos números son una foto. **Ese `UNATTENDED 1` no
autoriza a AIW a ejecutarse a sí mismo:** bajo `D-057` cierre y delegabilidad son
ejes distintos, y AIW declara su lado a nivel de roadmap — todo run suyo es manual,
con `aiw-console` como excepción escrita (está en el texto del `#38`).

---

## 4. Los criterios con que se clasificó — y su historia de enmienda

Van aquí porque una sesión futura que reclasifique algo tiene que usar los mismos, o
declarar que los cambia.

**`blast_radius` — se cuentan CONSUMIDORES QUE EL PROPIO TEXTO DEL RUN NOMBRA:**
`LOCAL` ninguno · `ADJACENT` uno o dos · `SYSTEMIC` tres o más, o una forma que otros
runs no pueden contradecir · `PROJECT_SHAPE` cruza la frontera del repo o toca el
contrato de config, ticket o roadmap. Los tests de la misma superficie no son
consumidores.

**`failure_surfaces` — ¿quién toca el resultado PRIMERO, y lo vería?**
Entrega un test que assertea su propio comportamiento → `LOUD`. El operador revisa la
salida al cerrarlo → `VISIBLE`. Se consume confiando en él sin re-derivarlo →
`SILENT`.

**Dos enmiendas, ambas hechas DESPUÉS de ver números, declaradas como tales:**

1. Se retiró una cláusula que hacía `SYSTEMIC` a un run con tres o más dependientes.
   El in-degree máximo entre los 21 es **2**: el umbral no disparaba nunca. La razón
   es estructural — en este roadmap **la arista se escribe donde impide, no donde hay
   consumo**, así que contar aristas es contar otra cosa.
2. El criterio original contaba **capas** de `aiw` (kernel · cola/lanzadores ·
   prompts-tickets · docs). Colapsó: con 8 runs leídos daba `ADJACENT` en 7. Casi todo
   run del kernel toca el kernel y una cosa más — dos capas siempre.

Ninguna enmienda movió una etiqueta ya escrita: no había ninguna escrita cuando se
hicieron.

**PENDIENTE, Y NO ES DE ESTE HILO SOLO:** estos criterios son la lectura de `aiw` de
una escala que es normativa en `context/CLASIFICACION-DE-RUNS.md`. Si van a regir para
los demás proyectos, **eso es una entrada de `DECISIONES.md`**, que es transversal, y
se ejecuta en el hilo de cada proyecto por separado. No se decidió aquí.

### El discriminador que hizo el trabajo

**Cada run declara por sí mismo si DECIDE o si EJECUTA, y lo declara con una frase
localizable.** Los tres `FOUNDATIONAL` los eligió el texto, no la cabina:

- `#28` — «Where that verification runs, and against what, is this run's central decision»
- `#29` — «WHICH outcome, and what it does to the exit codes that automation reads, is this run's decision»
- `#38` — «a measured tension that this run has to resolve rather than inherit»

Un run sin frase de decisión ejecuta algo ya decidido → `SPECIFIED`, y la combinación
ilegal `SPECIFIED`+`FOUNDATIONAL` cierra la puerta sola.

**Y una regla que salió de ahí:** un run `JUDGED_DEFINES` **nunca puede ser `LOUD`**,
porque su test verifica que hace lo decidido, no que lo decidido sea correcto. La
combinación ilegal `FOUNDATIONAL`+`LOUD` estaba diciendo esto.

---

## 5. Correcciones al handoff anterior — hacia adelante, no reescribiendo

El handoff del 2026-08-02 afirmaba dos cosas que el disco desmintió:

1. **«`aiw/.project/`: 5 artefactos»** — son **SEIS**. Faltaba `git_history.json`.
2. **«el blanco del `#22` es `aiw-console`, excepción escrita en el canónico de AIW»**
   — se leyeron los 21 textos verbatim y **esa afirmación no está en ninguno**. Lo que
   sí está escrito es la excepción anti-auto-hosting del `#38`, que es de
   **delegabilidad**, no del blanco de una medición. Son dos cosas distintas.

**Consecuencia viva:** `#22` y `#45` corren «against a REAL repository» y **ninguno
nombra cuál**. Si el blanco resulta ser otro repo, el `external_effects` de esos dos
se revisa antes de cerrarlos.

---

## 6. Un instrumento que esta sesión certificó y conviene reusar

**`aiw/.project/roadmap.json` SÍ está en el knowledge del Project**, y se midió que es
**byte a byte idéntico al canónico** en `full_description`, `title`, `queue_order`,
`status` y `depends_on` para los 21 vivos — verificado por dos encargos independientes
que dieron la misma huella md5 run por run.

**Pero la cabina lo lee en FRAGMENTOS de búsqueda, y un fragmento truncado se lee
igual de completo que uno entero.** Esta sesión perdió tres turnos por eso.

**La forma que funcionó**, y que la próxima sesión debe usar desde el primer turno si
necesita los textos verbatim: un script Node a archivo —nunca `node -e`, PowerShell se
come las comillas— que vuelca los `full_description` de los `planned` a un `.md` fuera
de los dos repos, con `len` y `md5` por bloque en la cabecera, y el operador **lo
adjunta al chat**. No se escribe a ningún record: sería una segunda copia del canónico
que deriva contra él. Se discute y muere.

Suma de los 21 `full_description` al cierre: **48 788 caracteres**.

---

## 7. `CONST §4` — la compuerta, y dónde estaba

Cifra **heredada del handoff del 2026-08-02 y NO re-medida en esta sesión**: de los 21
vivos, **8 elegibles y 13 detenidos** por falta de incidente documentado. Verificar
antes de planificar sobre ella.

Lo que sí se leyó verbatim esta sesión, y es firme porque está en los textos:

- **Tres runs declaran sus tres criterios COMPLETOS** y pueden ejecutar sobre
  incidente ya documentado: `#34` *Write one manifest of identity and outcome per
  run* y `#41` *Make the queue survive the terminal that launched it* (ambos citan
  `D-055` casos 1 y 2). El texto dice «one of only three»; **el tercero no se
  identificó** — hay que medirlo.
- **Dos tienen incidente documentado pero les FALTA el criterio de borrado:** `#33`
  *Give every run an identity its log folder cannot silently overwrite* y `#42`
  *Recover from a lock whose owner is gone*. En ambos, el criterio escrito en `D-055`
  es el de OTRO mecanismo y no puede servirles.
- **`#31` *The intake* tiene una adjudicación ABIERTA que no le toca resolver a quien
  lo tome:** si `§4` alcanza a un componente nuevo que traduce roadmap a contrato, dado
  que `D-055` define mecanismo como código o paso nuevo en kernel, cola, lanzadores o
  guards — **y un intake no es ninguno de los cuatro**. Se resuelve en `DECISIONES.md`
  antes, no dentro del run.
- **`#32` ya fue adjudicado por el operador: `§4` SÍ le aplica** (toca la restricción
  read-only del reviewer, que es superficie de seguridad).

---

## 8. Deudas con el hilo `aiw-console`

Se **nombran**, no se corrigen desde aquí.

1. **El hash cambió: `ae7e7f1` → `e1feead`.** Tenían pendiente juzgar si *Turn on push
   per project* es el testigo de irreversibilidad; el estado que miren es este.
2. **Censo de mixtos:** su §8.1 citaba «7 de 17» para `aiw`. Bajo `D-060` la cifra es
   **2 de 21**, y de los 21 clasificados esta sesión **ninguno resultó mixto**.
3. **La consola no carga `aiw/.project/git_history.json`.** Medido: el archivo
   **existe (23 533 bytes), parsea, y tiene las doce claves idénticas** a las del
   `git_history.json` de `aiw-console`, que sí carga. El mensaje dice
   `projects/aiw/…` cuando `aiw` cuelga de la raíz del workspace, **pero el prefijo no
   puede ser la causa: si lo fuera fallarían los seis artefactos y falla uno.** El
   arreglo se escribe en `aiw-console`.

---

## 9. Qué NO hacer en la próxima sesión

- **No reclasificar sin declararlo.** Los 21 llevan marca única; reescribirlos crea
  dos verdades sobre un mismo acto.
- **No citar `#N` de este documento como el número de hoy.** Son coordenadas fechadas.
- **No dar por buenas las 478 líneas del kernel, ni «8 elegibles / 13 detenidos».**
  Ambas son heredadas. Re-medir.
- **No abrir un run detenido por `§4` sin que su entrada de `DECISIONES.md` exista.**
  La compuerta ha detenido runs tres sesiones seguidas con razón.
- **No tocar `aiw-console` salvo records y este handoff**, y el `git add` siempre
  dirigido a archivos por su nombre: ahí escriben tres hilos.
