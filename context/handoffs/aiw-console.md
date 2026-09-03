# Relevo — hilo `aiw-console`

**Fecha:** 2026-09-02 · **Sustituye** al relevo del 2026-08-15.
Aquella sesión cerró con **67 runs** y el `#60` activo con su QA pendiente.
Ésta cierra con **70 runs**, **cero activos**, y **cuatro runs cerrados**: el `#60`, el `#61`,
el `#62` y el `#63`.

La sustancia va DENTRO. Los punteros a records son procedencia, no respuesta.

---

## 1. DÓNDE ESTAMOS

**CERO runs activos.** La cola está limpia y el hilo siguiente elige por dónde entra.

`projects/aiw-console/roadmap/roadmap.json` · md5 **`78f41c560e7bb6492c31133017d9b0e7`**
**70 runs** · `completed 63 · planned 7` · densidad `1..70` · ids únicos.
Cero candados `index.lock` en ningún repo.

| | run | estado |
|---|---|---|
| **#64** | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | una de las dos compuertas del cutover · **es QA del operador** |
| #65 | `RUN-CONSOLE-UI-UX-001` | espera al #64 |
| #66 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | ⚠ escribe en `cantu-studio`, que está muy activo |
| #67 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | el cutover |
| #68 | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` | textos falsos · **le cayeron dos semillas nuevas, §6** |
| #69 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | las cuatro ops de contenedor |
| #70 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | la auditoría visual · **el operador decidió que va la última** |

**Y hay UN run que el operador ya encargó y no existe todavía: el del renderizador de citas.**
Es lo siguiente y está medido entero en el §3.

**Siguen sin existir, de sesiones anteriores:** el catálogo de criterios del piloto de quizzes
(aquí, por la excepción de piloto de la D-069) y el ancla externa de nivel PAA.

---

## 2. LO QUE ESTA SESIÓN ENTREGÓ

| | run | qué dejó |
|---|---|---|
| **#60** | `ENVELOPE-RENDER` | la consola pinta el resumen del emisor y la cobertura · **QA aprobada, 13 pasos** |
| **#61** | `COVERAGE-READABILITY` | el vistazo de tres cifras arriba, el material de auditoría plegado |
| **#62** | `DOC-SIDE-READER` | una cita que viaja como dato se vuelve control y abre su documento |
| **#63** | `DOC-READER-MODAL` | **un lector y no dos**: modal centrado que reutiliza el layout y el renderizador de Docs |

### El hallazgo del `#60`, y es el que gobierna todo lo demás

La sección de cobertura **aprobó los cuatro pasos de QA que la miden y aun así no le servía al
operador**. Correcta e inútil a la vez. Eso no lo encuentra ninguna medición: lo encontró su ojo.
De ahí salieron el `#61`, el `#62` y el `#63`, en cascada.

### El defecto que 23 tests no vieron

En el `#62` el operador pulsó «Documents» y **no pasó nada, con la suite verde**. El escuchador
del botón se registraba **dentro** de la función que abre el panel: una puerta cableada desde
dentro de la habitación. **Todos los tests llamaban a la función en vez de pulsar el control.**
La reparación incluyó tests dirigidos por clic real, corridos primero contra el fichero sin
arreglar para probar que veían la regresión.

### La cifra que explicaba «cansa la vista»

**137 caracteres por línea** contra una banda cómoda de 45–75. Casi el doble. No era el tamaño ni
el interlineado. Se capó en `66ch` — y el taller **corrigió su propia derivación**: calculó 76
caracteres, midió 64, y entonces probó cinco topes en vez de discutir.

---

## 3. ⚠ LO SIGUIENTE, MEDIDO Y LISTO PARA EMITIR

**El renderizador compartido convierte CADA LÍNEA que empieza por `>` en su propio
`<blockquote>`.** Medido el 2026-09-02 en `project-console/assets/project-console.js:2726`:

```js
html.push(`<blockquote>${inline(trimmed.replace(/^&gt;\s?/, ""))}</blockquote>`);
```

**Lo que produce, y el operador lo vio antes que nadie:** el documento del emisor abre con una
cita de **46 líneas**, así que se pinta como **46 cajas**; un `>` solo da una caja vacía —los
«huecos fantasma»—; y una negrita que cruza dos líneas **nunca cierra dentro de su caja**, así
que los `**` se pintan literales.

**Por qué nadie lo había visto:** los documentos de `cantu-studio` sólo usan la cita de **una
línea** de su cabecera de estado, y una cita de una línea se ve igual rota que entera. **Una
capacidad que nunca se ejercitó no estaba probada, aunque el verde dijera que sí.**

**Su alcance:** es código COMPARTIDO y arreglarlo **cambia también la pestaña de Docs**, que es
otra superficie con su propia QA. Por eso fue condición de parada del `#63` y va a run propio.

---

## 4. LA D-073 — el blueprint pasa a ser el estándar de todos

**Decidida por el operador el 2026-09-02.** El estándar es
`projects/cantu-studio/docs/docs_management/DOCUMENTATION-BLUEPRINT.md`, rige la documentación
NUEVA de los cinco proyectos, se adopta **hacia adelante**, y **cada hilo adopta en SU repo**.

**Lo que la motivó, medido:** los tres documentos del emisor tienen **983, 259 y 216 líneas**
contra un tope duro de **250**, y **ninguno lleva la cabecera de estado del §4a** — que no es
cosmética: **el renderizador ya la detecta y la pliega** en el bloque METADATA. Un documento que
la lleva se ve limpio sin tocar código.

**Lo que queda POR CERRAR y está declarado en la propia decisión:** qué secciones del blueprint
son de forma —parecen §4a, §4b, §4h, §4i y §4j, y **eso es lectura de la cabina, no decisión del
operador**— y cuáles son del dominio de Cantu Studio. Lo cierra un run que lea el blueprint
entero.

⚠ **Y una lección de método de esta sesión:** la cabina estuvo a punto de numerar esa decisión
como D-070. **La D-070, la D-071 y la D-072 ya existían** — política de sesiones, decididas por
el operador el 26 y el 30 de agosto **desde el hilo `cantu-studio`**. El relevo anterior sólo
llegaba a la D-069. **En este repo escriben cuatro hilos: el número siguiente se mide, no se
supone.**

---

## 5. LAS REGLAS DE OPERACIÓN QUE FIJÓ EL OPERADOR

**Nuevo fichero, vivo y append-only:**
`context/aiw-console/records/REGLAS-DE-OPERACION-DEL-OPERADOR.md`. Van verbatim.

- **R-01** — la superficie de QA de fixtures se abre con comandos que **la cabina entrega
  siempre, completos**; la consola normal sólo se nombra (`start-console.cmd`).
- **R-02** — **el push NO se recuerda** salvo cuando el operador declare que se cierra el hilo. Y
  quién lo declara es él.
- **R-03** — todo ticket termina con un bloque `# Sesión` diciendo si es el mismo taller o uno
  nuevo, **y sólo recomienda modelo y esfuerzo cuando es nuevo**.

**El comando de la superficie de QA, para no volver a derivarlo:**

```
cd C:\Users\chris\Documents\AIW_Workspace\projects\aiw-console
$env:PC_REGISTRY="tests\fixtures\reports-qa\projects.json"
$env:PC_PORT="8799"
.\start-console.cmd
```

---

## 6. SEMILLAS NUEVAS PARA EL `#68`, no su inventario

- **El fichero se llama `doc-side-reader.js` y el lector lateral ya no existe.** Lo retiró el
  `#63`. Un nombre que miente, de la misma familia por la que el `#62` se cerró en vez de
  enmendarse.
- **La copia `CASO-1` dejó de seguir al piloto.** Medido dos veces por caminos distintos: le
  faltan el bloque `compilation` y la verificación que el emisor añadió el 2026-08-15. Su
  identidad declarada —«copia byte a byte»— hoy es falsa.

---

## 7. LO QUE ESTÁ ABIERTO CON `cantu-quizzes-latex`

`context/aiw-console/records/PETICIONES-ABIERTAS-AL-EMISOR-2026-08-15.md`, más una cuarta:

1. **Que commiteen la adopción del sobre.** Su árbol la tiene sin versionar y nuestros fixtures
   copian ese disco.
2. **`QZ-R-06`** — dicen citarla y hay cero apariciones en el reporte. Sin confirmar.
3. **`verification.command` lleva una nota pegada dentro** — el paréntesis no es adorno, es una
   precondición, y el comando así **no se puede copiar**. Hay casa para ella:
   `verification_note`, que el renderizador ya pinta en los dos idiomas.
4. **NUEVA — el ítem `declared_gap` no se entiende.** Verbatim del operador: «no me deja claro
   qué error fue, qué decisión se tomó, o qué necesita de mí». Lo escribe el emisor, no lo pinta
   la vista.

**Y el patrón que ya son DOS casos medidos:** campos que prometen dato y llevan prosa dentro —
`verification.command`, y las **23 citas enterradas en prosa** que no se pueden enlazar sin un
regex de dominio que la ceguera veta. Con dos casos, la pregunta de si es familia dejó de ser
hipótesis. Es material del contrato de la cita.

---

## 8. LA MÁQUINA Y GIT

**Modo COWORK CONECTADO.** La ruta de montaje **se deriva cada sesión**. **El borrado hay que
PEDIRLO** con la herramienta cuando `rm` dé `Operation not permitted`; se habilita por carpeta y
persiste en la sesión.

**No hay CLI de roadmap en este repo.** La escritura del canónico va **por la consola**:
levantar `project-console/serve.mjs` en un puerto libre y hacer POST a
`/projects/aiw-console/__project-console/roadmap/edit` — dry-run primero, luego apply con el
baseline del dry-run. **`serve.mjs` re-emite los siete artefactos de `.project/` él solo** tras
cada escritura, y lo declara en la respuesta.

**Dos trampas de sonda que mordieron esta sesión y conviene no repetir:**

- **Un `node -e` que carga `project-console.js` en un sandbox pobre cae en una rama de texto
  plano** y devuelve un resultado que parece una medición y no lo es. Para preguntar por el
  comportamiento del renderizador, **leer el código gana**.
- **Canalizar la salida de un validador a `tail` hace que `$?` sea del `tail`.** Un `EXIT 0` así
  no dice nada. Pasó, y ese verde no se publicó.

**`git status` acotado a rutas** en este repo; el completo sobre `cantu-quizzes-latex` (327 MB)
excede el tiempo. **`origin/main` se resuelve por NOMBRE.**

**`context/aiw/records/` está sin versionar y es del hilo `aiw`: no entra en ningún `add`.**

---

## 9. RECORDS DE ESTA SESIÓN

```
context/aiw-console/records/
  VEREDICTO-QA-DEL-60-Y-CIERRE.md
  HALLAZGOS-67-SUPERFICIE-DEL-REPORTE.md
  DISENO-DEL-REPORTE-LECTURA-Y-CITAS-2026-08-27.md
  PETICIONES-ABIERTAS-AL-EMISOR-2026-08-15.md
  REGLAS-DE-OPERACION-DEL-OPERADOR.md
  UN-LECTOR-NO-DOS-MODAL-CENTRADO-Y-RENDERIZADOR-COMPARTIDO.md   ← del taller
context/
  DECISIONES.md                                                   ← D-073
```
