# Relevo — hilo `aiw-console`

**Fecha:** 2026-09-25 · **Sustituye** al relevo del 2026-09-02.
**Escrito para una MUDANZA DE COMPUTADORA.** El §7 dice qué viaja por git y qué no.

Aquella sesión cerró con **70 runs** y **cero activos**. Ésta deja **71 runs** y **el `#64`
ACTIVO**, entregado y verde, **esperando una sola cosa: el veredicto visual del operador**.

La sustancia va DENTRO. Los punteros a records son procedencia, no respuesta.

---

## 1. DÓNDE ESTAMOS

**UN run activo, el `#64`, y su trabajo está TERMINADO y COMMITEADO.** Lo único que falta
es que el operador mire dos pantallas.

`projects/aiw-console/roadmap/roadmap.json` · md5 **`b681760b39d6d081e1f2301e1e2c2642`**
**71 runs** · `completed 63 · planned 7 · active 1` · densidad `1..71` · ids únicos.
Cero candados `index.lock` en ningún repo. Árbol de trabajo **limpio**.

| | run | estado |
|---|---|---|
| **#64** | `RUN-CONSOLE-SHARED-RENDERER-QUOTES-001` | **ACTIVE** · entregado, 841 tests verdes · **falta SU QA** |
| #65 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | una de las dos compuertas del cutover · **es QA del operador** |
| #66 | `RUN-CONSOLE-UI-UX-001` | espera al #65 |
| #67 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | ⚠ escribe en `cantu-studio`, muy activo |
| #68 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | el cutover |
| #69 | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` | textos falsos |
| #70 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | las cuatro ops de contenedor |
| #71 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | la auditoría visual · **el operador decidió que va la última** |

**Todos los `#N` de esta tabla son COORDENADAS del 2026-09-25.** El `#64` nació en esta
sesión y empujó siete runs una posición. Derívalos del canónico, no de aquí.

**Siguen sin existir, de sesiones anteriores:** el catálogo de criterios del piloto de
quizzes (por la excepción de piloto de la D-069) y el ancla externa de nivel PAA.

---

## 2. EL `#64` — qué es y qué falta exactamente

**El defecto, medido en código el 2026-09-02:** el renderizador compartido de Markdown
convertía **cada línea que empieza por `>` en su propio `<blockquote>`**. Una cita de N
líneas se pintaba como N cajas; un `>` solo daba una caja vacía; y una negrita que cruzaba
dos líneas nunca cerraba dentro de su caja, así que los `**` salían literales.

**Por qué nadie lo había visto:** los documentos de `cantu-studio` sólo usan la cita de UNA
línea de su cabecera de estado, y una cita de una línea se ve igual rota que entera. **Una
capacidad que nunca se ejercitó no estaba probada, aunque el verde dijera que sí.**

**Es código COMPARTIDO** — lo alcanzan la pestaña de Docs (`renderDocBodyContent`,
`project-console.js:2797`) y el lector modal (`scope.renderDocBodyContent`,
`doc-side-reader.js:123`). Dos superficies, una sola función.

### Lo entregado, en dos tandas

| commit | qué |
|---|---|
| `b2fdd8a` | abre el run: lo crea en `O4.P17` en la posición 64 y lo pone `active` |
| `7af9fcf` | **el agrupado**: N líneas consecutivas → UN `<blockquote>` |
| `20d75fb` | el record de la decisión del operador sobre citas anidadas y listas |
| `4305d85` | **el anidamiento**: una cita dentro de otra → **caja dentro de caja** |

**Medido por la cabina, no transcrito:** suite completa **841 tests, 841 pass, 0 fail,
EXIT 0**, salida a fichero y nunca canalizada. El fichero `tests/docs-markdown-quotes.test.mjs`
pasó de 28 a **46 tests**. Barrido del corpus por el taller: **3 196 → 723** cajas pintadas,
**282 → 0** cajas vacías, **360 → 7** citas con `**` literal.

### ⚠ LO ÚNICO QUE FALTA: la QA visual, y son cuatro pasos

La consola normal basta con nombrarla (`start-console.cmd`, R-01). No es superficie de
fixtures.

1. **PARADA.** Proyecto `aiw-console` → **Docs** → `CONTENEDORES SIN RUNS — MANDA EL CÓDIGO`.
   **Esperado:** la cita larga es **una sola caja** de 42 líneas, con los huecos dentro y las
   negritas cerradas. Si sigue partida, es del run y paramos.
2. El **mismo documento en el lector modal**. **Esperado:** pintura idéntica al paso 1. Si
   difiere, el arreglo no llegó a las dos superficies.
3. Un documento con **cita dentro de cita** — `HALLAZGOS-67-SUPERFICIE-DEL-REPORTE.md`.
   **Esperado:** una caja **dentro** de otra, y **ni un `>` visible como texto**.
4. Listas, tablas y bloques de código de esos documentos **como siempre**.

**Tres cosas que va a ver y NO son regresiones — nombradas antes de que mire:**
- En `MEDICION-O4.md`, el bloque de 62 líneas **no** se pinta como cita. Correcto: va dentro
  de un cercado. Ver §5.
- Quedan **7 `**` literales** en todo el corpus. Son de `inline()`, no de las citas:
  `**negrita con *cursiva* dentro**` falla igual en un párrafo. Pre-existente.
- El **validador de estado sale 1**, con 25 fallos por `.aiw/…` ausente — carpeta que este
  repo no tiene. El taller comprobó que falla **idéntico** antes y después. Ajeno.

**Lo que el taller NO pudo verificar:** ninguna captura de pantalla; el panel del navegador
no estaba desplegado. Verificó ambas superficies leyendo el DOM, que es legítimo pero **no
es mirar**. Todo el juicio visual es del operador, sin red.

---

## 3. LAS DECISIONES DE ESTA SESIÓN

A disco en `context/aiw-console/records/DECISION-CITAS-ANIDADAS-Y-LISTAS-EN-CITA.md`.

- **Cita dentro de cita → CAJA DENTRO DE CAJA.** Un solo caso en el repo hoy, pero es **el
  patrón con el que se guarda todo veredicto del operador**: sus palabras verbatim dentro
  del bloque que escribió la cabina. Un `>` colgando delante de su voz es ruido.
  **Descartado** fundir las dos citas: borraría la distinción entre las dos voces.
- **Lista dentro de cita → SE QUEDA LITERAL.** El `>` sobrante es ruido; el `-` sobrante es
  una **viñeta pobre pero honesta**. Y parsearla reabriría la interacción entre el agrupado
  de citas y el corte de listas, que es la parada que el taller midió como **no disparada**
  y dejó clavada con goldens.

**Ninguna decisión numerada nueva.** La última en `context/DECISIONES.md` sigue siendo la
**D-073**, y **el número siguiente se MIDE, no se supone**: en este repo escriben cuatro
hilos y ya pasó una vez que las D-070..D-072 existían sin que este relevo lo supiera.

---

## 4. TRES LECCIONES DE MÉTODO, y las tres costaron

### 4a · Una parada que se resuelve con una pregunta que el operador no puede contestar es una parada GASTADA

El ticket del `#64` mandó parar y preguntar si aparecían citas anidadas o listas dentro de
cita. El taller midió bien, paró como debía y preguntó — **en su vocabulario**: `>>`, parseo,
regla. El operador respondió lo que se le recomendó **para que el taller pudiera seguir**.
Verbatim suyo, seis días después: **«no entendí realmente la pregunta»**.

El taller registró «texto literal en ambas» como veredicto del operador y lo clavó con tests.
**La cabina lo transcribió al mensaje de un commit actuando sobre el relato del taller, sin
tener las palabras del operador.** Lo declaró en el mismo turno, y aquí queda escrito.

**Lo que funcionó la segunda vez:** enseñarle **los casos reales de sus propios records** y
**un dibujo de cómo se vería cada opción**. Decidió en un turno.

### 4b · Una sonda que no distingue cita de bloque cercado miente

El ticket afirmó «la cita más larga son 62 líneas en `MEDICION-O4.md`». **Falso.** Ese bloque
empieza con una valla de código dentro de la cita, y el renderizador **parte el texto por las
vallas antes de mirar líneas**, así que nunca fue una cita para él. La mayor real son **42
líneas**, en `CONTENEDORES-SIN-RUNS-MANDA-EL-CODIGO.md`. **Lo encontró el taller, no la
cabina**, y está clavado con su propio test. La cifra de 227 ficheros sí se sostuvo al
rehacer la sonda — era correcta **por accidente, no por método**.

### 4c · El trabajo del taller estuvo SIETE DÍAS en el árbol sin que nadie lo supiera

El taller del anidamiento entregó el **2026-09-08 a las 12:09**, minutos después de recibir
su ticket. **Nadie volvió a mirar el árbol hasta el 2026-09-15**, y se descubrió por otro
motivo. La cabina no lo comprobó al retomar y el operador no lo reportó.

**Regla que sale de aquí, y va al arranque:** cuando un hilo se retoma después de días, **lo
primero es un `git status` acotado del repo**, no leer el relevo. El relevo dice lo que se
sabía; el árbol dice lo que hay.

---

## 5. SEMILLAS PARA EL `#69` (textos falsos), no su inventario

De sesiones anteriores, siguen vivas:
- **El fichero se llama `doc-side-reader.js` y el lector lateral ya no existe.** Lo retiró
  el `#63`. Un nombre que miente.
- **La copia `CASO-1` dejó de seguir al piloto.** Le faltan el bloque `compilation` y la
  verificación que el emisor añadió el 2026-08-15. Su identidad declarada —«copia byte a
  byte»— hoy es falsa.

---

## 6. LO QUE ESTÁ ABIERTO CON `cantu-quizzes-latex`

`context/aiw-console/records/PETICIONES-ABIERTAS-AL-EMISOR-2026-08-15.md`, más una cuarta:

1. **Que commiteen la adopción del sobre.** Su árbol la tiene sin versionar y nuestros
   fixtures copian ese disco.
2. **`QZ-R-06`** — dicen citarla y hay cero apariciones en el reporte. Sin confirmar.
3. **`verification.command` lleva una nota pegada dentro** — el paréntesis es una
   precondición, y el comando así no se puede copiar. Hay casa: `verification_note`.
4. **El ítem `declared_gap` no se entiende.** Verbatim del operador: «no me deja claro qué
   error fue, qué decisión se tomó, o qué necesita de mí».

**El patrón, y ya son DOS casos medidos:** campos que prometen dato y llevan prosa dentro.
Es material del contrato de la cita.

---

## 7. ⚠ LA MUDANZA DE COMPUTADORA — qué viaja y qué NO

**Medido el 2026-09-25 a las 15:0x CST.**

### Lo que viaja por git, en cuanto se haga `push`

| repo | sin publicar |
|---|---|
| `projects/aiw-console` | **3** |
| `aiw` | **1** |
| `projects/cantu-studio` | **1** |
| `Acervo` · `cantu-lessons` · `cantu-quizzes-latex` | 0 — al día |

**Todo el `#64` YA ESTÁ PUBLICADO**: los cuatro commits del §2 están en `origin/main`. Lo
que falta por publicar en este repo son tres commits **de otros hilos**.

### Lo que NO viaja por git, y hay que decidir

- **`aiw/sandbox` NO TIENE REMOTO.** `origin/main` no resuelve. Ese repo **no se pushea y no
  se clona**: si se quiere en la otra máquina, va por USB o no llega.
- **`_scratch/` — 792 entradas**, y la mayoría **no son de este hilo**: hay material vivo de
  septiembre de otros hilos (`ALG-*`, `CAP-*`, `CABINA-*`, `ANEXO-*`). **De este hilo no
  queda nada ahí**: su único fichero fue un payload que la cabina ya borró.
- **`_backups/` — 56 entradas.** El respaldo del `#64`
  (`roadmap-aiw-console-ANTES-DE-CREAR-QUOTES-20260902-1950.json`) **sigue vivo porque su run
  sigue abierto**; se borra al cerrar.
- **`PHD/`** — no es repo. No viaja.
- **`.claude/launch.json`** en la raíz del workspace: el taller le añadió una entrada
  `aiw-console` que se engancha al 8788 en vez de levantar un segundo servidor. **Ese fichero
  ahora lo tocan dos hilos** — el otro es `cantu-studio`. No está versionado.

### Lo que la máquina nueva NO necesita

`aiw` tenía 15 ficheros «modificados» en `git status` y **cero cambios reales**: todo eran
finales de línea. **`aiw` no tiene `.gitattributes` y su `status` ENGAÑA** — se pasa siempre
por `git diff --ignore-cr-at-eol --numstat`. No hay nada que rescatar ahí.

---

## 8. LA MÁQUINA Y GIT

**Modo COWORK CONECTADO.** La ruta de montaje **se deriva cada sesión**.

**El borrado hay que PEDIRLO** con la herramienta cuando `rm` dé `Operation not permitted`;
se habilita por carpeta y persiste en la sesión.

**⚠ EL SANDBOX SE CAYÓ ENTRE EL 12 Y EL 15 DE SEPTIEMBRE.** El error decía
`Plan9 share "c" which is not mounted`, con un aviso que lo atribuía a una actualización de
Windows del 8 de septiembre. **Dos cosas medidas que acotan esa atribución:** el 8 de
septiembre a mediodía el bash funcionaba con normalidad en este mismo disco, y **durante la
caída las herramientas de fichero (Read, Write, Grep) seguían funcionando**. O sea: no era
que Claude no alcanzara los ficheros, era que **el sandbox Linux** no los alcanzaba. El 15
volvió solo. **Si vuelve a pasar: se puede leer y escribir, pero no correr git ni node**, así
que no se puede commitear ni verificar suites.

**No hay CLI de roadmap en este repo.** La escritura del canónico va **por la consola**:
levantar `project-console/serve.mjs` en un puerto libre y hacer POST a
`/projects/aiw-console/__project-console/roadmap/edit` — dry-run primero, luego apply con el
baseline del dry-run. **`serve.mjs` re-emite los siete artefactos de `.project/` él solo.**

**Medido el 2026-09-02, y ahorra media hora:** el flag `--port` **no se respeta**; el puerto
se pasa por la variable `PC_PORT`. Y el op de inserción es `insert`, anclado con `after`,
que **hereda la fase del run ancla** — así se elige posición y fase en una sola operación.

**`insert` pide exactamente uno de `after` / `before` / `endOfPhase`, y el `depends_on` viaja
por `run_id`**, así que desplazar runs **no rompe ninguna arista**.

**Este canónico NO usa `barrier`, `lane` ni `batch`** — cero apariciones. Sólo `depends_on`.
El motor que conduce es `tools/roadmap/roadmap-core.mjs` de **este** repo, 2 479 líneas.

**Dos trampas de sonda que ya mordieron:** un `node -e` que carga `project-console.js` en un
sandbox pobre cae en una rama de texto plano y devuelve algo que parece medición y no lo es
—para preguntar por el renderizador, **leer el código gana**—; y **canalizar un validador a
`tail` hace que `$?` sea del `tail`**.

**`git status` acotado a rutas.** El completo sobre `cantu-quizzes-latex` (327 MB) excede el
tiempo, y canalizarlo a `head` convierte el timeout en «cero modificados». **`origin/main` se
resuelve por NOMBRE**, nunca desde `packed-refs`: en este repo el loose ref y el packed
discrepan y gana el loose.

**`context/aiw/records/` está sin versionar y es del hilo `aiw`: no entra en ningún `add`.**

**La falsa consola.** La viva es `project-console/`. `docs/project-console/` es un fork
descartado por D-035 y `console/` un prototipo retirado. Y `start-console.ps1` **miente sobre
sí mismo**: dice ser de sólo lectura y tiene cuatro rutas de escritura.

---

## 9. LAS REGLAS DE OPERACIÓN DEL OPERADOR

Verbatim en `context/aiw-console/records/REGLAS-DE-OPERACION-DEL-OPERADOR.md`. En vigor:

- **R-01** — la superficie de QA de **fixtures** se abre con los comandos que la cabina
  entrega **completos, cada vez** (`PC_REGISTRY`, `PC_PORT`, `start-console.cmd`). La consola
  **normal** sólo se nombra.
- **R-02** — **el push NO se recuerda** salvo cuando el operador declare que se cierra el
  hilo. Quién lo declara es él.
- **R-03** — todo ticket termina con un bloque `# Sesión` diciendo si es el mismo taller o
  uno nuevo, **y sólo recomienda modelo y esfuerzo cuando es nuevo**.

---

## 10. RECORDS DE ESTA SESIÓN

```
context/aiw-console/records/
  DECISION-CITAS-ANIDADAS-Y-LISTAS-EN-CITA.md     ← nuevo
  REGLAS-DE-OPERACION-DEL-OPERADOR.md
  PETICIONES-ABIERTAS-AL-EMISOR-2026-08-15.md
  HALLAZGOS-67-SUPERFICIE-DEL-REPORTE.md
tests/
  docs-markdown-quotes.test.mjs                    ← nuevo, 46 tests
```
