# HANDOFF — hilo `aiw-console` (la consola)

> **Este archivo es EFÍMERO y se SOBRESCRIBE.** Es el relevo del hilo de la
> consola: se reescribe al cerrar cada sesión y se consume al abrir la siguiente.
> No es un record — no acumula historia, no se versiona por tramo. Lleva **solo**
> lo que la próxima sesión necesita para arrancar sin releerlo todo. Lo que
> seguirá siendo cierto dentro de un mes vive en el roadmap, el contrato o un
> record — no aquí.

> **Disciplina de este handoff:** no afirma hechos, apunta a dónde están medidos.
> Si da una cifra, la da con su cita. Las cinco afirmaciones falsas que se
> arrastraron en su día venían todas de handoffs, ninguna de un record: por eso
> aquí las cifras viajan con su fuente y nada se declara "hecho" sin puntero.

> **Por qué esta reescritura.** La versión anterior estaba fechada el 2026-07-25 y
> decía «Siguiente: LA FASE DE ESCRITURA (`O4.P12`)». Desde entonces se entregaron
> **once commits de trabajo** (contados con `git log` sobre este repo el 2026-07-28,
> del `2e02a8b` al `6519ba5`), el primero de los cuales cerró esa fase. Este es
> el **tercer cierre de registro** (los anteriores: `D-049`/`D-050`, y el de las
> fases `P13`/`P14`, `records/CIERRE-ROADMAP-AL-DIA-FASES-P13-P14.md`). Se repite
> porque **cada encargo produce un record y ninguno toca el roadmap, por diseño**:
> ponerlo fuera de alcance es lo que permite el paralelismo entre talleres.

**Estado del hilo:** O4 — **la consola global existe, enciende, renderiza dos
proyectos reales y ESCRIBE**. Las nueve etapas del plan siguen vivas solo en
cuatro: paridad, UI/UX, AIW y corte. **Ningún run está `active` en O4.**
**Siguiente, por decisión del operador: el ANÁLISIS DE AIW** (ver su sección; no
es la etapa `O4.P6` ejecutada mecánicamente).
Última actualización: **2026-07-28**, al cerrar el registro por tercera vez.

> **Hay un HILO PARALELO abierto para `cantu-studio`**, con su propio relevo en
> `context/handoffs/cantu-studio.md`. Los dos hilos corren a la vez bajo la
> disciplina de carriles (`records/DISCIPLINA-UN-RUN-POR-CARRIL.md`): **superficies
> de escritura disjuntas, y la consola como único punto de serialización**. Antes de
> escribir cualquier archivo, comprobar que el otro hilo no lo tiene.

## El plan y el estado viven en el roadmap — no aquí

    projects/aiw-console/roadmap/roadmap.json

Ésa es **la fuente del plan y del estado**; este handoff apunta ahí y no lo
duplica. Contado sobre ese archivo en disco el 2026-07-28, al cierre:
**2 objetivos, 19 fases, 45 runs**; `queue_order` **1..45 denso, único y
contiguo**; **19 aristas `depends_on`, 0 colgantes**; cada dependencia precede a su
dependiente. O0 "Project Console" **3 fases, 12 runs** (9 `completed`, 1 `active`,
2 `planned`) — **intacto y byte-idéntico** desde `O4.P1`: 19 845 B, md5
`8f954764427c6720361b01f3d785d075`. O4 "Global Console" **16 fases, 33 runs — 27
`completed`, 6 `planned`, 0 `active`**. El status de objetivo y de fase se
**deriva al leer**, no se almacena (CONTRATO §11.b/§12).

Línea base viva del canónico, para que el próximo tramo tenga contra qué comparar
(`records/CIERRE-REGISTRO-Y-RELEVO-TERCERO.md` Bloque G):

| Artefacto | Bytes | md5 |
|---|---:|---|
| `roadmap/roadmap.json` | 94 295 | `e620f0702ed7d0130048bc7c65a914ae` |
| subárbol **O0** | 19 845 | `8f954764427c6720361b01f3d785d075` (y así debe seguir) |
| subárbol **O4** | 71 547 | `e4d59bbb7ac100bd9b534318ccb6991b` |

**`.project/` de este repo está DESFASADO a propósito: trae 42 runs donde el
canónico trae 45** (contado en los dos archivos el 2026-07-28). Este cierre **no
re-emitió**; el operador tiene el botón *Re-emit `.project/`* en la pestaña Roadmap
de la consola. **La consola mostrará 42 hasta que lo pulse.** Ver «Lo primero que
hay que hacer».

## El orden vigente de O4, posición por posición

Las once primeras posiciones son **trabajo entregado**; de la doce en adelante,
plan. `phase_id` es **identidad opaca** (`D-047`): el número no es la posición.

1. `O4.P0` audit (q13) · `O4.P1` contrato y migraciones (q14-19) — **hechos**.
2. `O4.P2` **EMISOR** (q20) — **HECHO**. `records/EMISOR-CARPETA-PROPIA-O4-P2.md`.
3. `O4.P11` **PORT IDÉNTICO** (q21) y su **ACABADO** (q22) — **HECHOS**.
   `records/PORT-IDENTICO-CONSOLA-O4-P11.md`, `records/ACABADO-DOCS-Y-EMISOR-GIT-HISTORY.md`.
4. `O4.P3` **SHELL MULTIPROYECTO** (q23) — **HECHO**. `records/SHELL-MULTIPROYECTO-O4-P3.md`.
5. `O4.P4` **CANTU EMITE** (q24) y el **índice curado** (q25) — **HECHOS**.
6. `O4.P12` **ESCRITURA** (q26) — **HECHA**. `records/ESCRITURA-CONSOLA-GLOBAL-O4-P12.md`.
7. `O4.P13` **ACABADO DE LA CONSOLA PORTADA** (q27-29) — **HECHO**: paridad,
   agrupación de Docs por ruta, ancho de subvistas.
8. `O4.P14` **CARRILES Y BARRIERS** (`D-051`) **y su primera aplicación real**
   (q30-33) — **HECHO**: esquema, correcciones de QA e idioma, migración de Cantu a
   carriles, y la **partición implementación/documentación** (q33, añadida en este
   cierre).
9. `O4.P15` **RE-EMISIÓN MANUAL DE `.project/`** (q34) — **HECHA**, fase nueva de
   este cierre. `records/REEMISION-MANUAL-PROJECT-O4-P14.md`.
10. **Aguas abajo, lo que queda vivo:** `O4.P5` paridad (q35) · `O4.P8` UI/UX (q36)
    · `O4.P6` AIW tercer proyecto (q37) · `O4.P7` corte (q38).
11. `O4.P9` transversal (q39-44: cinco hechos, dos pendientes) · `O4.P10`
    **prototipo retirado** (q45: es historia, y su run declara que se queda al final).

## LO QUE QUEDA VIVO EN O4 — cuatro etapas y dos transversales

Los seis `planned` de O4, leídos del canónico el 2026-07-28:

| `queue_order` | Fase | Run | Qué es |
|---:|---|---|---|
| 35 | `O4.P5` | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | La consola global renderiza Cantu con paridad, y el operador hace QA |
| 36 | `O4.P8` | `RUN-CONSOLE-UI-UX-001` | La revisión de uso, antes del corte |
| 37 | `O4.P6` | `RUN-CONSOLE-AIW-TERCER-PROYECTO-001` | AIW como tercer proyecto (Markdown → v3) |
| 38 | `O4.P7` | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | Corte: retiro de la consola de Cantu + borrado de `.aiw` |
| 41 | `O4.P9` | `RUN-CONSOLE-CONTEXT-PACK-001` | Transversal |
| 42 | `O4.P9` | `RUN-CONSOLE-DIGEST-CABINA-001` | Transversal |

O0 conserva además **1 `active` y 2 `planned`** de `queue_order` bajo (q10-q12), que
preceden a todo O4 en la cola global. Ver el pendiente de operador correspondiente.

## LO SIGUIENTE: el ANÁLISIS DE AIW — y qué NO es

**Decisión del operador, tomada al cerrar este registro.** Lo que sigue **no es**
`O4.P6` ejecutada como una conversión de formato. Es, en este orden:

1. **Revisar el estado real de AIW** — qué es hoy, qué hace y qué no.
2. **Evaluar sus propuestas de mejora** — leerlas y juzgarlas, no transcribirlas.
3. **Decidir qué entra y en qué orden** — es una decisión de cabina.
4. **Y de ahí escribir su roadmap.**

**NO es una conversión mecánica de Markdown a árbol.** El insumo
`context/aiw/roadmap_AIW_temp.md` existe, pero convertirlo tal cual sería fijar en
el esquema un plan que nadie ha juzgado. El trabajo de decidir precede al de
escribir.

> **LA MEDICIÓN DE AIW YA ESTÁ HECHA. Su record es
> `context/aiw-console/records/MEDICION-ESTADO-DE-AIW.md`** (55 281 B, fechado
> 2026-07-28), producido por el encargo paralelo mientras este cierre corría —
> apareció en disco después de que este handoff se escribiera por primera vez, y
> este párrafo es su corrección. **Es la lectura de arranque del análisis**, y está
> escrito para ser autosuficiente: quien lo lea sin más contexto debe poder conducir
> la conversación.
>
> Es **READ-ONLY por declaración**: no convierte, no emite y no escribe nada fuera
> de sí mismo; `aiw` quedó byte-idéntico (manifiesto md5 y `git status` antes y
> después, en su bloque «Verificación de no-escritura»). Marca **[NO VERIFICADO]** lo
> que es inferencia, así que **hay que respetar esa marca al leerlo**.
>
> Sus seis secciones: **1** el roadmap actual de AIW y dónde vive de verdad · **2**
> **O4 duplicado, los dos sitios medidos** —lo que se perdería al retirarlo del
> Markdown— · **3** la brecha campo a campo entre los datos en disco y
> `roadmap_tree_v1` · **4** qué necesita AIW para entrar a la consola (layout, índice
> de docs, el mínimo por artefacto) · **5** estado de ejecución y frescura · **6**
> **14 riesgos y tensiones (`R1`–`R14`), reportados y sin resolver**. Su cierre dice
> qué NO hace, y hay que leerlo: no propone plan, no ordena el trabajo y **no decide
> qué mejoras entran** — eso es la conversación de cabina con el operador.
>
> Contexto que ya existía y **no es medición**: `context/aiw/AIW_CONTEXT.md`,
> `context/aiw/ESTADO.md`, `context/aiw/DELEGACION.md` y
> `context/aiw/roadmap_AIW_temp.md` (el insumo Markdown).

**Lo que ya está medido sobre AIW y no hay que re-medir:** `aiw` **no tiene
canónico que ningún layout reclame** — el botón de re-emisión lo responde en
pantalla nombrando los dos archivos que buscó y su veredicto
(`records/REEMISION-MANUAL-PROJECT-O4-P14.md` Bloque C y D.2). Y el `.aiw/` de
**este** repo no es estado propio: ver su sección abajo.

## La auditoría de contenido del roadmap quedó DIFERIDA — a propósito

El cierre anterior barrió el roadmap y dejó **siete premisas fechadas** reportadas y
**sin tocar** (`records/CIERRE-ROADMAP-AL-DIA-FASES-P13-P14.md` Bloque B.3): son
afirmaciones que eran ciertas cuando se escribieron, y corregirlas sería reescribir
historia. La más clara es la #1, el conteo «30 runs» que declara
`RUN-CONSOLE-PROTOTIPO-CONSOLA-001` — **la única cifra del roadmap que el disco
desmiente**.

**No se auditan ahora, y la razón es de orden, no de pereza:** O4 vive hoy en **dos
sitios** y **`O4.P6` es la fase que los reconcilia**. Auditar el contenido antes de
AIW obligaría a auditarlo otra vez después. La auditoría es del operador y va
**después** del análisis de AIW.

**Y ese duplicado ya está medido, ítem por ítem:**
`records/MEDICION-ESTADO-DE-AIW.md` **sección 2** («O4 duplicado — los dos sitios,
medidos») dice qué afirma cada sitio, en qué difieren, **qué se perdería al retirar
O4 del Markdown** —distinguiendo lo que no se pierde, los tres huecos de capa 2 que
`D-046` ya midió, y uno que `D-046` no nombró— y la escala del problema si se
convierte el roadmap entero. Es el insumo directo de esta decisión: no hay que
re-medirlo.

## Las compuertas vigentes (son `depends_on` reales en el roadmap)

- **paridad + UI/UX → corte:** `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` depende de
  `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` **y** de `RUN-CONSOLE-UI-UX-001`. **Sin
  cambio desde `D-047`**: el corte es irreversible y no procede sin la revisión de
  uso. Ni `D-050` ni los tres cierres de registro la tocaron.
- Las cadenas ya consumidas (emisor → port → shell; port → acabado; Cantu emite →
  índice; shell → lanzador; escritura → paridad/carriles/inglés/re-emisión;
  carriles → QA, migración y partición) siguen declaradas, todas del lado
  `completed`.
- **La ubicación de las fases nuevas es ORDEN, no compuerta:** ningún cierre de
  registro añadió una arista hacia paridad, AIW ni corte. Este proyecto declara
  `depends_on` **sólo donde hay compuerta real** (`D-046`).

Las de aprobación de operador siguen anotadas en el `full_description` de sus runs.

## Qué se puede mirar HOY

**La consola global**, desde la raíz de `projects/aiw-console`:

```bash
node project-console/serve.mjs
```

o el lanzador de doble clic `start-console.cmd` / `start-console.ps1`, que verifica
el checkout y libera el puerto (documentado en `start-console.README.md`; puerto
**8788** por defecto, `PC_PORT` lo sustituye). Levanta con **dos proyectos reales en
el menú** —`aiw-console` y `cantu-studio`— leyendo el `.project/` de cada uno.

**El server ya NO es de solo lectura: expone EXACTAMENTE TRES rutas de escritura**,
y la matriz está **medida por un test que la imprime**, no mantenida a mano
(`records/REEMISION-MANUAL-PROJECT-O4-P14.md` Bloque C.2):

| Ruta | Qué hace | Fase |
|---|---|---|
| `POST …/__project-console/roadmap/edit` | edita el canónico, dry-run → confirm, y re-emite | `O4.P12` |
| `POST …/__project-console/history/sync` | regenera `git_history.json` | `O4.P12` |
| `POST …/__project-console/project/emit` | re-emite los seis artefactos de `.project/` | `O4.P15` |

**Cero rutas aceptan PUT/PATCH/DELETE.** Todo lo demás responde `405
read_only_console`; `.git` responde `403` en los dos namespaces.

La **consola de Cantu** sigue levantable en `projects/cantu-studio` con
`node tools/project-console/serve-project-console.mjs`, puerto 8787 — pero **ya no
es la única que edita**, y para el canónico de Cantu **ya no es la herramienta**
(ver el handoff de ese hilo, pendiente 9). El prototipo `console/` sigue en disco y
sigue siendo historia, no camino.

### Lo primero que hay que hacer al abrir el hilo

**Pulsar `Re-emit .project/`** en la pestaña Roadmap con `aiw-console` seleccionado.
El canónico trae 45 runs y la proyección 42; hasta ese clic la consola pinta 42 y
parece que este cierre no ocurrió. El acuse debe decir **`6 artifacts · 45 runs`**.
La re-emisión **no commitea**: deja el diff para que lo revise el operador.

## Pendientes que son del OPERADOR, no del taller

1. **`governance/` SIN REVISIÓN — y es lo más viejo de esta lista.** Los **7
   guardrails** de `governance/guardrails.json` y los **5 claims** de
   `governance/no_claims.json` (contados en los dos archivos el 2026-07-28) los
   **autoró el taller** en `O4.P2` para que Governance State tuviera datos. Son
   **declaraciones de gobernanza del proyecto**, y el taller no tiene autoridad para
   decidir qué promete un proyecto: **el contenido está pendiente de revisión del
   operador**, y hasta que la tenga se está mostrando en pantalla texto que nadie con
   autoridad aprobó. Ningún cierre lo ha revisado — es revisión suya.
2. **Las 7 premisas fechadas del roadmap.** Reportadas una por una en
   `records/CIERRE-ROADMAP-AL-DIA-FASES-P13-P14.md` Bloque B.3, sin tocar. Ver la
   sección de la auditoría diferida: van **después** de AIW.
3. **Los 16 `run_id` con raíz española.** `CONTRATO`, `CARPETA`, `MIGRACION`,
   `VALIDADOR`, `MEDICION`, `REDACCION`, `EMISOR`, `PROPIA`, `IDENTICO`,
   `MULTIPROYECTO`, `EMITE`, `INDICE`, `CURADO`, `ESCRITURA`, `PARIDAD`, `TERCER`,
   `PROYECTO`, `CORTE`, `RETIRO`, `LANZADOR`, `PROTOTIPO` (barrido en
   `CIERRE-…-P13-P14.md` E.2). **Es una decisión de IDENTIDAD, no de traducción**:
   `D-047` la declara opaca y renombrar rompe `depends_on`, records y
   `DECISIONES.md`. Los runs nuevos nacen en inglés desde el segundo cierre.
4. **Las 9 fuentes diferidas.** Siguen sin emitir y el panel «Not emitted by this
   project» sigue diciendo la verdad (la cadena está en
   `project-console/assets/project-console.js:2940`). Existe como **decisión, no como
   fase abierta**; es materia de `O4.P5` y se abre **solo si el operador la pide**.
5. **Prioridad O0 vs O4 en la cola** (viene de `D-046`): O0 conserva 1 `active` y 2
   `planned` de `queue_order` bajo (q10..q12) que preceden a todo O4. No urge
   mientras la cabina ordene el trabajo; **resolver antes de la paridad** (`O4.P5`),
   cuando la consola pase a ser la fuente del orden.
6. **La dependencia de máquina de `git_history`.** `.project/git_history.json` es el
   **único** artefacto emitido cuyo contenido depende de la MÁQUINA: medido, **35
   commits en un clon fresco vs 42** en la máquina con ramas de trabajo. Registrado
   en CONTRATO §19; **acotarlo a `main` o aceptar la dependencia queda ABIERTO**.
7. **¿El validador viaja a la consola global?** Recomendación de la cabina: **que
   NO viaje.** Los tres ROMPE viven en él y desaparecen con la consola de Cantu en el
   corte. (Bifurcación F.1 del audit, `D-035`.)
8. **Las dos deudas técnicas que este cierre anotó y NO arregló** — están en
   `records/CIERRE-REGISTRO-Y-RELEVO-TERCERO.md` Bloque H, con sus efectos contados:
   los **censos fijados a mano en la suite** (acoplan la suite a un artefacto
   derivado y ya mordieron dos veces) y los **records que se auto-asignan fase en su
   nombre** (tercera vez, y dos de las tres se asignaron mal).

## Deuda medida para la multiconsola — NO arreglada

Tres sitios del **validador de Cantu** asumen que todo `run_id` vive en el roadmap
local; con O0 fuera, eso es falso. Medidos, **no tocados**:

- `CANTU-VALID:847` — `roadmapV3QueueGroupKey` mal-agrupa el run externo en `later`.
- `CANTU-VALID:1059-1069` — el DFS de ciclos salta ids externos con `?.`.
- `build-git-history-snapshot.mjs:103-108` — `deriveRunId` degrada limpio a `null`.

El rojo agudo ya se cerró (`D-045`, validador de Cantu VERDE). Y el motor de Cantu
**tolera pero no adopta** carriles, barriers y aristas externas
(`records/MIGRACION-CANTU-A-CARRILES.md` A.1) — por eso el canónico de Cantu se edita
desde la consola global y no desde su tooling local.

## El `.aiw/` de `aiw-console` NO es estado propio

Es el área de entrega de la **proyección de AIW**: el proyector vive en este repo,
lee `../../aiw/objectives/` y escribe ahí. **La simetría con Cantu no existe** —
allá `.aiw/` sí es del proyecto. Es un supuesto tácito que **ya hizo fallar un
encargo**. Evidencia: `D-044`, `MEDICION-PROYECTOR.md §5.a`, y
`MEDICION-FUENTES-CONSOLA.md` Bloque D.

**Corrección de estado, medida el 2026-07-28:** el handoff anterior decía que ese
`.aiw/` «hoy no existe». **Existe**: `projects/aiw-console/.aiw/` con `roadmap/` y
`views/`, tres artefactos con `mtime` del **2026-07-22 15:38**. Está **ignorado por
Git** (`.gitignore:5`) y **sin trackear**, así que es residuo de la ruta vieja de
proyección, no estado vivo. Las fuentes vivas de este proyecto están en `.project/`.

## Regla de cierre de la cabina

Cada cierre de fase termina con **el mapa** —dónde estamos, qué falta para ver la
consola, qué se habilita después— y con **qué se puede mirar**. Si un encargo no
cambia nada observable, se dice explícitamente. **Este cierre no cambió nada
observable hasta que se pulse el botón**: movió papel (roadmap, dos handoffs, seis
pins de conteo y un record). El código de la consola es el mismo antes y después.

## Lecturas de arranque (en orden de utilidad)

1. `context/aiw-console/records/MEDICION-ESTADO-DE-AIW.md` — **la medición que abre
   lo siguiente.** Léela entera antes de proponer nada sobre AIW.
2. `projects/aiw-console/roadmap/roadmap.json` — el plan y el estado de O4/O0.
3. `context/handoffs/cantu-studio.md` — **el hilo paralelo**, para saber qué está
   tocando el otro taller antes de escribir nada.
4. `context/aiw-console/records/CIERRE-REGISTRO-Y-RELEVO-TERCERO.md` — este cierre:
   las ubicaciones, los invariantes, las líneas base y las dos deudas.
5. `context/DECISIONES.md` — **`D-051` es la última** (carriles, barrier, posición
   derivada). `D-050` metió la escritura como fase; `D-049` el envelope; `D-048` el
   orden de O4. **Los tres cierres de registro no reservaron número**: no cambian el
   contrato, ponen el papel al día contra el disco.
6. `context/aiw-console/CONTRATO.md` — el contrato de la carpeta, tres capas.
7. `context/aiw-console/records/AUDIT-CONSOLE-O4-PHASE0.md` — **Bloque F.3**: qué se
   pierde en el corte y qué cubre el CLI.
8. Records por tema, en `context/aiw-console/records/`:
   - `REEMISION-MANUAL-PROJECT-O4-P14.md` — las tres rutas de escritura, la matriz
     read-only medida y el reporte de QA en PowerShell.
   - `CARRILES-Y-BARRIERS-ROADMAP.md` + `MIGRACION-CANTU-A-CARRILES.md` +
     `PARTICION-IMPLEMENTACION-Y-DOCUMENTACION-CANTU.md` — `D-051` y sus dos
     aplicaciones reales.
   - `DISCIPLINA-UN-RUN-POR-CARRIL.md` — **la disciplina que gobierna los dos hilos
     abiertos**; leerla antes de trabajar en paralelo.
   - `SHELL-MULTIPROYECTO-O4-P3.md` — **D.1 es la tabla de anuncios de §20**.
   - `MEDICION-VALIDADOR-ROJO.md` — la deuda del validador.

## Pendientes menores (siguen vivos)

- `aiw-console/package.json:6` se autodescribe como "verbatim fork" — falso.
- `aiw-console/projects.config.json.bak` sin trackear: borrar o commitear.
- `aiw/.aiw/project_console.snapshot.json` — copia stale (jul 2026); residuo.
- **Un record cita un `run_id` que no existe**:
  `records/EMISOR-CANTU-CARPETA-PROPIA-O4-P4.md` se encabeza citando
  `RUN-CONSOLE-EMISOR-CANTU-CARPETA-PROPIA-001`; el run real de `O4.P4` es
  `RUN-CONSOLE-CANTU-EMITE-CARPETA-001`. Anotado en el `full_description` del run
  real; los `run_id` no se renombran (`D-047`).
- **`DOCS-INDICE-CURADO-TRANSPORTADO.md` sigue diciendo `O4.P5` en su propio H1**,
  aunque el nombre del archivo ya no reclama esa fase. El título indexado en Docs
  seguirá mostrándolo. Es un caso de la deuda 8.2 del operador.
