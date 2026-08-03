# Relevo — hilo `aiw-console`

**Fecha:** 2026-08-02 · **Sustituye** al relevo del 2026-08-01, que queda obsoleto.

Este relevo lleva la sustancia DENTRO. Los punteros a records son procedencia, no
respuesta: **los records no se leen desde cabina** (ver §2).

---

## 1. DÓNDE ESTAMOS

**El piloto de clasificación CERRÓ.** El run *«Classify aiw-console's live runs as
the pilot, and rule on the procedure itself»* está `completed`. Entregó sus dos
mitades: los doce runs vivos clasificados, y el procedimiento como documento.

**Cabeza de cola: *«A second dependency list for edges that wait on a person»*,
`planned`, sin abrir.** Su compuerta está abierta y no hay nada delante.

**DECIDIDO Y NO REABRIR:** ese run **se ejecuta tal cual**, sin insertar antes ningún
run de generalización. Su ticket debe **medir, mientras lo paga, cuántos sitios
cuesta dar de alta su campo**. Razón: está medido que un alta cuesta **12 sitios en 4
archivos de código** —2 más si el campo tiene forma propia— y que la pieza compartida
existe pero **el campo no pasa por ella**: por ahí viajan el vocabulario y la
derivación, y la lista de campos se enumera a mano en cada capa. Con el número real
en la mano se decide si un run de generalización va antes de *«Batches in the roadmap
schema, with the branch they determine»* o no va nunca. **Insertarlo ahora sería
sobre una hipótesis que nadie ha medido.**

---

## 2. ⚠ TOPOLOGÍA — el aviso sigue vigente y está confirmado por dos hilos

**El sync del Project está RECORTADO, aunque la configuración diga que no.**

**NO llegan al knowledge:** `context/aiw-console/records/`, `tools/`, `tests/`,
`project-console/`, `.project/`. Pedir sync **no los trae**.

**SÍ llegan:** `roadmap/roadmap.json`, `context/DECISIONES.md`,
`context/handoffs/`, `context/CLASIFICACION-DE-RUNS.md`,
`context/PROCEDIMIENTO-DE-CLASIFICACION.md`, `context/aiw-console/CONTRATO.md`.

**Confirmado por los dos lados** el 2026-08-02: el hilo `aiw` hizo la misma sonda con
un record suyo, con línea y fragmento verbatim, y tampoco le llega.

**COROLARIO ADOPTADO COMO DOCTRINA:** un handoff que apunta a un record **no resuelve
para el hilo que lo lee**. Una cifra que la sesión siguiente vaya a usar **viaja
dentro del relevo, con su unidad**. Lo que solo exista en un record se trae con
**encargo de taller**, nunca pidiendo sync.

**El repo sincronizado contiene un fork DESCARTADO de la consola** (`D-035`), en
`docs/project-console/`. La consola viva está en `projects/cantu-studio`. Y
`console/` es un prototipo retirado.

---

## 3. LO QUE SE ENTREGÓ, Y DÓNDE ESTÁ

**`context/PROCEDIMIENTO-DE-CLASIFICACION.md`** — 216 líneas, 8 secciones. Dice CÓMO
se clasifica: qué se mira, en qué orden, con qué criterio. **Si discrepa de
`context/CLASIFICACION-DE-RUNS.md`, gana la especificación.** Está en el espejo: se
puede leer desde cabina.

**`context/DECISIONES.md`, entrada `D-060`** — transversal. Adjudica seis cosas:
el procedimiento existe; la definición de run mixto; la regla provisional de mezcla;
el criterio de irreversibilidad; las formas de `external_effects`; y la fuente única
de `acceptance_criteria`. También está en el espejo.

**Los doce clasificados**, escritos en el canónico por la operación
`set-classification` del motor. `classified_at` lo estampa el motor.

---

## 4. LAS CIFRAS DEL PILOTO — con su unidad, porque no se pueden ir a buscar

**Reparto de `severity`:** 6 CRITICAL · 3 MAJOR · 3 MODERATE · **0 MINOR**.
**Reparto de `closure_mode`:** 4 `ATTENDED` · 6 `SEMI_ATTENDED` · 2 `UNATTENDED`.

**Esta cola NO produce ningún MINOR.** Los cuatro escalones no están ocupados. Es dato
de calibración y **no se maquilla**. Los seis CRITICAL son los que tocan el esquema
que obedecen tres proyectos, o actúan sobre otro repositorio.

**Los dos `UNATTENDED` son los primeros candidatos reales a ventana desatendida que
este workspace ha producido.**

**Coste de dar de alta un campo opcional de run:** 12 sitios en 4 archivos de código,
+2 si el campo tiene forma propia.

**El precedente de los carriles, medido entero:** costaron 8 archivos de código y
**333 sitios** —430 contando `barrier`— más 25 archivos de test, **sin ningún módulo
compartido**. Y **este canónico no guarda ni una sola clave `lane` o `barrier`**:
todas sus apariciones son prosa dentro de `full_description`. *(El conteo exacto
depende del criterio de búsqueda —con límite de palabra da 23 `lane` y 10 `barrier`;
sin él, 80 y 23, arrastrando `plane` y `declareLanes`—. Lo estructural está medido;
la cifra, no: si hace falta, se re-mide con criterio fijado.)* En `aiw` sí hay datos
—6 runs con `lane`, 2 con `barrier`— pero **cero consumidores**: `kernel.mjs` no
contiene ni `lane` ni `barrier`. **Coste pagado en los dos lados, consumidor ninguno.**

**El validador de `tools/project-console/validate-project-console-state.mjs` sale ROJO
y es CORRECTO que salga rojo.** Lee `docs/project-console/`, el fork descartado, y
tiene cero ocurrencias de los seis campos de clasificación. **No valida la consola
viva y no bloquea nada.** La validación real de escritura es `checkInvariants` del
motor.

---

## 5. LOS CUATRO DEFECTOS DE MÉTODO QUE COSTARON LA SESIÓN

Están en el procedimiento, y se repiten aquí porque son de la CABINA:

1. **Una tabla terminada solo admite sí o no.** Aísla la pregunta que decide los
   valores y preséntala antes que la tabla.
2. **Antes de declarar que el modelo falla, relee la definición del campo y busca el
   caso.** Se emitieron tres «huecos del modelo» y dos eran lectura. El peor:
   confundir `closure_mode` con una escala de riesgo. **No lo es: mide PRESENCIA**
   —cuánta persona hace falta dentro del run— mientras `severity` mide DAÑO. Se
   cruzan: el corte deriva CRITICAL y `SEMI_ATTENDED`; la auditoría visual deriva
   MODERATE y `ATTENDED`.
3. **Cuenta `blast_radius`, no lo razones — y guarda la RAZÓN junto al valor.** Hubo
   dos runs con valor correcto y razón falsa.
4. **Una cifra marcada «por verificar» no puede ser además el gatillo de una parada.**
   La parada cuelga de la IDENTIDAD: `run_id`, título, `depends_on`.

**Y una quinta, aprendida el mismo día:** **si quieres confirmar una predicción de
derivación, déjala FUERA del ticket.** Escrita en el criterio, el taller verifica la
aritmética de quien la escribió, no la del motor.

**Tres paradas de taller atraparon errores REALES de cabina en esta sesión:** una
cifra caducada usada como gatillo; una `severity` derivada mal a mano
(`COSMETIC`×`LOCAL` = MINOR, y `SILENT` suma un paso → **MODERATE**); y un bloque de
decisión escrito en una forma que el log no usa. **La cláusula «para y reporta» se
gana su sitio en todos los tickets.**

---

## 6. LO QUE QUEDA ABIERTO, CON SU CONDICIÓN DE CIERRE

**Las tres reglas mecánicas de runs mixtos** — hueco de `CLASIFICACION-DE-RUNS.md`
§7. Población real de casos: **tres**. Se cierran con los casos de `aiw` delante y su
censo actualizado. **No se reconstruyen por coherencia.**

**La calibración de los `completed`** — sin un solo caso. Los `completed` de este
roadmap quedan sin clasificar.

**La irreversibilidad sin eje propio** — hueco declarado **sin testigo**. **Y esto es
lo primero que hay que resolver con `aiw`:** su candidato —el run *«Turn on push per
project»*— ya está en disco. Reordenaron y commitearon en **`ae7e7f1`**, poniendo
*«A failed push escalates to human review instead of closing the run silently»*
delante, con la arista invertida. **Falta juzgar si con eso el run de push queda
visible, local e irreversible en la población de hoy.** Si lo queda, `D-060` se reabre
por su propia condición de cierre, con entrada nueva.

---

## 7. LOS OTROS DOS HILOS

**`aiw`** — estable en `ae7e7f1`, 46 runs (25 `completed`, 21 `planned`), 21 aristas,
0 colgantes, 0 ciclos. **Cero campos de clasificación escritos**; iba a clasificar los
21 con el procedimiento delante.

**Comprometido con ellos, y este hilo lo debe:**
- **Tres campos nuevos de run** —`constraints`, `acceptance_criteria`,
  `references`— **en UN solo run**, con `acceptance_criteria` declarado dentro como la
  parte que no se cae si hay recorte, y `references` con **rutas resueltas por el
  validador**, que falla si no existen. **Sin insertar todavía.** Van DESPUÉS de la
  medición de coste del run de cabeza de cola.
- **`cantu-quizzes-latex`**, proyecto nuevo, **lo incorpora este hilo**, y su sitio es
  **después del corte** — precedente `D-048`: no entra un proyecto nuevo mientras la
  consola se pule con los que tiene.

**`cantu-studio`** — activo, escribiendo en este repo (sus records viven aquí). **NO
ha declarado estable.** Su clasificación es PREVIA a la regla del piloto y no se
re-hace.

**Corolario que no se olvida: en `aiw-console` escriben tres hilos.** El `git add`
sobre este repo va SIEMPRE dirigido a archivos por su nombre, **nunca `-A`**.

---

## 8. ESTADO MEDIDO EN DISCO

Medido el 2026-08-02 desde la raíz del repo. Cada valor lleva el comando que lo
produjo. Los comandos `node` llevan delante este prólogo, que aplana el canónico:

```
const j = JSON.parse(require('fs').readFileSync('roadmap/roadmap.json','utf8'));
const R = j.objectives.flatMap(o => (o.phases||[]).flatMap(p => p.runs||[]));
```

**HEAD y limpieza del árbol.** Rama `main`, HEAD en **`5af9416`** — *«chore(project):
re-emision de la derivada - indice de docs con dos records nuevos de cantu-studio e
historia de commits al dia; sin cambios de contenido en snapshot ni roadmap»*. **El
árbol está LIMPIO**: `git status --porcelain` no devuelve ni una línea.
Comandos: `git log -1 --format="%h %s"` · `git rev-parse --abbrev-ref HEAD` ·
`git status --porcelain`.

**Total de runs y desglose por `status`.** **55 runs** en total: **44 `completed`** y
**11 `planned`**. No existe ningún otro valor de `status` en el canónico.
Comando: `R.length` y `R.reduce((a,r)=>(a[r.status]=(a[r.status]||0)+1,a),{})`.

**Densidad y unicidad de `queue_order`.** **Es denso y único de 1..55**: 55 valores
distintos, mínimo 1, máximo 55, sin huecos ni repetidos.
Comando: `const q=R.map(r=>r.queue_order).sort((a,b)=>a-b);` ·
`new Set(q).size===R.length` · `q.every((v,i)=>v===i+1)`.

**Los once runs `planned`, por `queue_order`, con título verbatim y `depends_on`.**
Comando: `R.filter(r=>r.status==='planned').sort((a,b)=>a.queue_order-b.queue_order)`,
imprimiendo `queue_order`, `run_id`, `JSON.stringify(r.title)` y `depends_on`.

- **45** · `RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001` ·
  *«A second dependency list for edges that wait on a person»* ·
  `depends_on: []`
- **46** · `RUN-CONSOLE-PROGRESS-NORMATIVE-001` ·
  *«Freeze the shape of progress so human approval becomes machine-readable»* ·
  `depends_on: ["RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001"]`
- **47** · `RUN-CONSOLE-BATCHES-001` ·
  *«Batches in the roadmap schema, with the branch they determine»* ·
  `depends_on: ["RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001",
  "RUN-CONSOLE-PROGRESS-NORMATIVE-001"]`
- **48** · `RUN-CONSOLE-DIGEST-CABINA-001` ·
  *«Digest for the cockpit»* ·
  `depends_on: []`
- **49** · `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` ·
  *«Global console renders Cantu (parity, operator QA)»* ·
  `depends_on: ["RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001"]`
- **50** · `RUN-CONSOLE-UI-UX-001` ·
  *«UI/UX of the global console»* ·
  `depends_on: ["RUN-CONSOLE-PARIDAD-RENDER-CANTU-001"]`
- **51** · `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` ·
  *«Move cantu-studio's canonical roadmap out of .aiw before the cutover can delete
  it»* · `depends_on: []`
- **52** · `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` ·
  *«Cutover: retirement of Cantu's local console and deletion of .aiw»* ·
  `depends_on: ["RUN-CONSOLE-PARIDAD-RENDER-CANTU-001", "RUN-CONSOLE-UI-UX-001",
  "RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001"]`
- **53** · `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` ·
  *«Repair the five texts that describe this repo falsely»* ·
  `depends_on: []`
- **54** · `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` ·
  *«Expose the four container operations in the console frontend»* ·
  `depends_on: []`
- **55** · `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` ·
  *«Deep visual audit of the console, led by the operator»* ·
  `depends_on: []`

**Conteo de campos de clasificación.** **12 runs con `correctness_model`**, **12 con
`classified_at`**, **4 con `external_effects`**. Los doce son los once `planned` de
arriba más el piloto `RUN-CONSOLE-CLASSIFICATION-PILOT-001` (`queue_order` 44), que ya
está `completed` y conserva su clasificación.
Comando: `R.filter(r => r[campo] !== undefined && r[campo] !== null).length` para cada
uno de los tres campos.

**Aristas que salen de runs vivos, y colgantes.** Runs vivos = los 11 `planned` (no
hay ningún otro `status` sin cerrar). Salen de ellos **8 aristas**, y **0 son
colgantes**: los 8 destinos existen como `run_id` en el canónico. En el grafo completo
—incluidos los `completed`— hay 29 aristas y **0 colgantes**.
Comando: `const ids=new Set(R.map(r=>r.run_id));` ·
`const L=R.filter(r=>r.status!=='completed').flatMap(r=>(r.depends_on||[]).map(d=>[r.run_id,d]));`
· `L.length` · `L.filter(([,d])=>!ids.has(d)).length`.