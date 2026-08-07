# Relevo — hilo `cantu-quizzes-latex`

**Fecha: 2026-08-06, 14:40 CST.** Sustituye al relevo inaugural del 2026-08-04, que escribió el
hilo `aiw-console`. **Este lo escribe el propio hilo, al cierre de su primera sesión.**

**Motivo del cierre:** el operador va a configurar una laptop nueva y continúa allí. Todo lo que
no esté commiteado no viaja.

---

## 0. LO PRIMERO AL ABRIR

**Estamos en `#2` «Review ARI-FA-Fracciones against the rubric, as the pilot», `active`,
esperando QA humana.** Es el único run `ATTENDED` del roadmap: **el juicio del operador es la
ENTRADA, no el sello**, y sin él no cierra.

**La QA está redactada y entregada en el chat de la sesión anterior, en 5 pasos.** Si el operador
no la conserva, se vuelve a redactar desde el record
`context/cantu-quizzes-latex/records/PILOTO-FRACCIONES-Y-QA-PENDIENTE.md`, que la contiene entera.

**Su Paso 1 es de parada:** si el operador no está de acuerdo con los dos movimientos de nivel,
el criterio no sirve y hay que reescribir la rúbrica antes de los otros 39 runs. Los otros cuatro
pasos no importan si el primero falla.

---

## 1. Qué es este proyecto, en una línea

Quizzes y exámenes de Método Cantu para la PAA, en LaTeX. **5 727 preguntas** en cuatro unidades
autocontenidas bajo `PAA/`. Su verificación natural es la compilación, y **esa verificación aún
no existe**.

---

## 2. El estado del canónico — medido al cierre

`roadmap/roadmap.json`, md5 **`f2797026b691ed252f1919fbbd7c6c0e`**.
**5 objetivos · 16 fases · 42 runs · `checkInvariants` 0 errores · 0 sin clasificar.**

| | |
|---|---|
| `O1` The repository stands on its own | 3 fases, 0 runs |
| `O2` A green or a red exists | 4 fases, 0 runs |
| `O3` The content is legible from outside | 3 fases, 0 runs |
| `O4` The content can be trusted | 1 fase, **1 run — `#1`, `completed`** |
| `O5` Mathematics is reviewed, subtopic by subtopic | 5 fases (`Arithmetic` 7 · `Algebra` 14 · `Functions` 8 · `Statistics and probability` 5 · `Geometry` 7), **41 runs** |

**`#2` es BARRERA GLOBAL:** nada de la cola arranca hasta que cierre.
**Clasificación:** 41 `SEMI_ATTENDED` y 1 `ATTENDED` (el piloto). `SILENT` en todos, y no es
adorno: una pregunta mal clasificada no anuncia nada al fallar.

## 3. La rúbrica es el criterio de aceptación de los 40 runs

**`docs/RUBRICA-DE-NIVELES.md`, v2**, primer y único `.md` del repositorio. El emisor ya la
indexa (`docs_index.json` pasó de 0 a 1 entrada).

**Los runs la REFERENCIAN, no la repiten.** Cambiarla no obliga a tocar el roadmap. Y funciona
hoy sin ninguna función nueva de la consola, porque **el `# Scope` de `aiw` restringe escritura,
no lectura** (`kernel.mjs`, `evaluateGuards` compara contra `git status --porcelain`).

### Su §2, el ancla, es lo que el piloto está probando

La v1 definía el ancla como «las preguntas del Banco que aparecen en los exámenes», calculada
como intersección de códigos. **Era falsa: el código es un espacio de nombres LOCAL.**
`ARI-FA-Fracciones-Medio-001` designa tres preguntas distintas en Banco, Diagnóstico y Simulador
— verificado en texto crudo. La intersección medía colisión de nombres.

**La v2 la reconstruye como CORPUS DE REFERENCIA:** se compara contra las preguntas de examen del
mismo subtema, sin exigir identidad. Cobertura medida: mín 10, mediana 20, máx 50. Fracciones
tiene 40.

**El error lo escribió la cabina; lo encontró el taller.** Es la separación adversaria
funcionando, y es la razón de que la cabina NO ejecute los runs que ella misma especifica.

### Lo que la v3 tiene que arreglar, ya identificado por el piloto

1. **§6.4 cita «88 de 90» y esa cifra no es reproducible** — el taller obtiene 1 en lectura
   estricta y 5 en amplia, porque **la §6.4 no define qué cuenta como explicar una distractora**.
   La conclusión se sostiene; la cifra no debe citarse como medición.
2. **§5, la prueba de INFLADA, es inejecutable como está**: dice «más pasos que cualquier pregunta
   del ancla», y la que sí estaba inflada no supera ese techo. Lo que la delata es la §3.4.
   Reescribir la viñeta en términos de las cinco dimensiones, no de pasos.
3. **§7.2 + cantidades fijas obligan a reclasificar POR PAREJAS.** En Fracciones hubo suerte: una
   inflada y una desinflada se cancelaron. Un subtema con tres infladas y ninguna desinflada deja
   al run sin jugada legal, y la rúbrica no dice qué hacer.
4. **§8.4 pide «antes y después del texto» y en un movimiento no cambia texto**, cambia el código.
5. **§8.7 (retroalimentaciones sobre el p90) es casi ruido**: el filtro útil sería longitud
   relativa al número de pasos, no absoluta.
6. **§2 no dice qué hacer con ancla pequeña.** «Preséntalo como más débil» no es un procedimiento.
7. **Falta la política de numeración al mover** — el taller la inventó y va al Paso 4 de la QA.
8. **Falta el criterio «dos opciones con el mismo valor»** — lo inventó el taller y encontró 3 de
   sus 5 correcciones. Va al Paso 2 de la QA.

**Aviso del piloto que vale para los 39:** el ancla dice si una OPERACIÓN es de nivel PAA, no si
una PRESENTACIÓN lo es. **Sobrepromociona el nivel Fácil sistemáticamente.** Y sus veredictos se
apoyan en los EXTREMOS del ancla, no en su centro: con 40 el juicio es firme, **con 10 se degrada
más rápido de lo que sugiere el recuento**.

## 4. Lo cerrado y lo abierto

**`#1` `completed`** — dos familias de código reparadas: `ARI-PI-Interteres` (15 comentarios) y
`GEO-GP-Triangulo` (104 sitios: 45 comentarios, 45 ids de `multi`, 14 rutas de figura) más **14
PNG renombrados**. Las 21 figuras siguen resolviendo, 0 fallan. Recuentos intactos.

**Tres hallazgos suyos SIN DUEÑO, y el operador aprobó run propio para los tres:**

1. **`\end{m}` en `GEO-GP-Triangulos-Facil-005`** — rompe el fichero entero al compilar. Es un
   carácter. Está latente porque el 100 % de los `\input` de los maestros está comentado.
2. **Dos cuadernos generadores siguen emitiendo los nombres de PNG antiguos.** Si alguien los
   reejecuta, los retoques de figura dejan de verse.
3. **8 PNG huérfanos** sin referencia en ningún `.tex`.

**`#2` `active`** — el piloto entregó. Cambios ya en disco y commiteados: dos reclasificaciones
(`Dificil-001`→`Medio-046` desinflada, `Medio-033`→`Dificil-021` inflada) y cinco correcciones,
la mayor de ellas `Facil-014`, que tenía **tres respuestas correctas**. Recuentos **25/45/20**
antes y después, **cero bajas**. Falta solo el veredicto humano.

## 5. Adjudicaciones tomadas en esta sesión, que no hay que reabrir

- **El Reto se queda en todos los subtemas.** El operador lo habilita o deshabilita por alumno.
  Ningún run propone eliminarlo. Con eso **desaparece del roadmap la deliberación
  esencial/complementario**: sigue siendo criterio pedagógico, no entrada de un run.
- **La revisión es de clasificación y calidad, no de reestructuración.**
- **El orden de fases es de temario, no de coste.** Geometría queda last y es la más cara
  (189 figuras); Álgebra es 14 subtemas con **cero** figuras y queda segunda. Reordenar es `move`
  y es barato, si el piloto muestra que el coste manda.
- **Adjudicación C (higiene del árbol) va primero** entre las tres del relevo inaugural.

## 6. Lo que sigue bloqueando a `aiw`, medido en solo lectura

- **El puente roadmap→ticket NO EXISTE.** Es el run **#31** de `aiw`, `planned`:
  *«Build the bridge that does not exist»*. Hoy `aiw` lee `objectives/pending/*.md`.
- **La verificación es obligatoria:** `kernel.mjs:279` aborta sin comando. El de este repo sería
  `O2.P3`, y el taller lo midió en **~1,2 s** sobre 12,9 MB — el 0,25 % del presupuesto de
  600 000 ms. **`O2.P3` es la llave, y es de este hilo.**
- **`cantu-quizzes-latex` no está en `aiw/config.json`** — solo `sandbox` y `console`.
- **`push: false`** en ambos; activarlo es el run #30 de `aiw`, `planned`.
- **Los 41 `SEMI_ATTENDED` están listos en FORMA, no en VÍA.**
- **Convergencia NOMBRADA, no tocada:** el run **#22 de `aiw` está `active`** y pide *«un
  repositorio grande con red de pruebas real»*, con la medición como entregable.

## 7. Defectos de la CABINA medidos en esta sesión — leer antes de repetirlos

1. **Cada `git status` que corre la cabina deja un `.git/index.lock` que la cabina NO PUEDE
   BORRAR.** El de este repo, creado a la 01:15, bloqueó las escrituras de git del operador
   durante **12 horas y media** sin que nadie lo viera: leer sigue funcionando, y solo se rompe al
   commitear. Al cierre había locks en tres de cinco repos. **Es transversal y pertenece a las
   reglas de cabina; se NOMBRA desde aquí y no se corrige.**
2. **`git status` NO acepta `--ignore-cr-at-eol`** en el git de la cabina: devuelve
   `error: unknown option` y `exit=129`. Con `2>/dev/null` eso se convierte en «0 modificados»,
   que es justo la mentira que la regla quería evitar. **La forma que funciona es
   `git diff --ignore-cr-at-eol`**, y con `--numstat`, nunca con `--name-only` — este último
   lista el árbol entero en un repo sin `.gitattributes`.
3. **Tres extractores de la cabina produjeron artefactos en una sola sesión** —el emparejador por
   conjunto de opciones, el resolutor de `\includegraphics` y el lector de bloques `multi`—. Los
   tres se atraparon mirando el texto **en crudo** antes de publicar. **Ninguna cifra derivada de
   un parser propio se publica sin verla cruda primero.**
4. **La cabina escribió el canónico mientras el operador ejecutaba un bloque de git**, dejando su
   guarda describiendo un estado que ya no existía. La superficie de escritura de la cabina cuenta
   como una más.
5. **Una cifra se cita con su unidad y su alcance, o no se cita.** La cabina publicó «989
   preguntas que elegiste para el examen» cuando eran 989 **códigos coincidentes**, y sobre esa
   frase construyó la rúbrica v1 entera.

## 8. Notas de topología para la laptop nueva

- **`aiw/config.json` lleva rutas absolutas de Windows** (`C:\Users\chris\Documents\AIW_Workspace\…`)
  para `sandbox` y `console`. Si la laptop nueva usa otro usuario o ruta, `aiw` no arranca.
  **Es de `aiw`; se nombra aquí porque bloquea la puesta en marcha.**
- **`_backups/` y `_scratch/` están fuera de todo repo y NO VIAJAN.** Es correcto: son
  desechables.
- **Los cuatro repos y `cantu-lessons` estaban sincronizados al cierre.** `aiw-console` tenía
  trabajo real en vuelo de otro hilo (+279 en `roadmap-core.mjs`, +119 en `project-console.js`,
  y tres ficheros sin rastrear) — **eso es suyo, no de este hilo.**
