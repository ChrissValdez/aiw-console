# Relevo — hilo `cantu-quizzes-latex` (CQL)

## Lo último — 2026-11-25, 03:35 UTC: el quiz de Propiedades, cerrado (cuentapato, nube)

- **PROP-QUIZ fusionado** (PR 1, `d9664fa`), y **REP-PROP fusionado** (PR 2, `11989f5`).
  - REP-PROP escribió 7 nuevas en Propiedades · Medio. VERIF-REP-PROP, en otra sesión: 4 VALIDA, 048 y 053 bajadas a Fácil
    (`Facil-026` y `027`) y 050 fuera por gemela de Medio-017. Se repusieron 054, 055 y 056, y VERIF-REP-PROP-2 las dio VALIDA.
  - **Propiedades: Fácil 26 (meta 20), Medio 40 (meta 40).** Sin faltante.
  - Notas que no bloquean: la retro de Facil-027 mide 7 caracteres sobre el máximo de su fichero, y el 0 ya es la clave en 4 de Medio.
- **LECCIONES, avisada** (hilo «Lecciones y Galería Español»). Le toca alinear el guion de ARI-02, que da por quitadas las 7 de la igualdad.
- **La verificación ciega se hace con un hilo aparte**, que abre el coordinador. Deja sus entregables en
  `/mnt/project-files/quizzes/verif-rep-prop/`, y la cabina los integra.
- **Lo que sigue, en orden:** ESENCIAL-ALG → NUEVAS-FG (+ VERIF-NUEVAS-FG) → BUILD-FINAL-4 → Moodle.
- **Los números con que empieza lo que sigue:** la fila **461** del registro. Ya están usados, y gastados aunque no estén en el
  banco: Propiedades-Facil hasta 027 y Propiedades-Medio hasta 056 (048, 050 y 053 de Medio no existen). Los de Operaciones y
  Fracciones, como en el bloque de abajo.

## Lo último — 2026-11-24, 15:55 UTC: PROP-QUIZ aplicado (cuentapato, hilo en la nube)

> **Desde el 24-nov el repo es de cuentapato** (aviso `mensajes/2026-11-24-1537-…`). Lo de abajo, «Dónde estamos» del cierre,
> sigue valiendo salvo lo que corrige este bloque.

- **PROP-QUIZ, hecho:** en el PR 1 de `cantu-quizzes-latex` (rama `claude/project-thread-w7c8ly`, commit `a1845fd`), por fusionar.
  - De las 65 preguntas de Propiedades salen **8** (RW-85 decía ≈ 7): 3 por ARI-03 y 1 por ARI-04 → Operaciones; 4 por ARI-16 → Fracciones.
    Pato eligió «Mover las 8». Las 3 dudosas (Fácil 022, Medio 012 y 029) y las 7 de la igualdad se quedan.
  - **Propiedades · Medio queda en 33 de 40: faltan 7.** Reponerlas es otro encargo, por escribir.
  - Detalle: `PAA/tickets/quiz-propiedades/informe-PROP-QUIZ.md`. Registro: fila 457.
- **En la nube sí se compila:** TeX Live de Debian por `apt` (~5 min) y `xelatex -shell-escape` con `extra_mem_bot/top=40000000`.
  Aritmética entera: 601 páginas, 2 min 30 s. El envoltorio `_test-ARI.tex` se arma del preámbulo de `Matematicas.tex`.
- **Lo que sigue, en orden:** fusionar el PR 1 → avisar a LECCIONES → ESENCIAL-ALG → NUEVAS-FG (+ VERIF-NUEVAS-FG) → BUILD-FINAL-4.
- **Los números con que empieza lo que sigue:** la fila **458** del registro. Operaciones Fácil 034 y Medio 066, Fracciones Fácil 037
  y Medio 049 ya están usados. Los de cuadráticas (`Facil-027`, `Medio-058`) y BUILD-FINAL-4 no cambian.

## Dónde estamos — 2026-11-24, 09:29 (`date`): el cierre de la cabina suelta

> **Sustituye a todo el relevo anterior**, que era del 2026-09-12 y está vencido. Lo viejo sigue en el historial de git de
> este fichero. Lo escribió la cabina de CQL al cerrar, con `context/metodo-cantu/CIERRE-DE-CABINA.md` (v0), por orden
> del operador.

**El relevo con todo el detalle** es el bloque «🧭 DÓNDE ESTAMOS — 2026-11-24» al principio de
`Metodo_Cantu\cantu-quizzes-latex\PAA\HANDOFF.md`. Aquí va lo necesario para arrancar.

### Al abrir

- **El repo:** `C:\Users\chris\Documents\AIW_Workspace\Metodo_Cantu\cantu-quizzes-latex`
  (https://github.com/ChrissValdez/cantu-quizzes-latex).
  - `main` = `origin/main`, limpio.
  - El sha exacto está en el aviso de cierre al coordinador. Es el commit que trae este «Dónde estamos» en `PAA/HANDOFF.md`.
- **Leer, en este orden:**
  1. el «Dónde estamos» de `PAA/HANDOFF.md`;
  2. `CABINA.md` (las reglas de la cabina) y `AGENTS.md` (las del taller);
  3. `context/cabinas/quizzes/MEMORIA-PC-CHRIS.md` (las 22 lecciones que estaban en la memoria de la PC, y lo que añadió
     el cierre) y `context/cabinas/MEMORIA-COMUN.md`.
- **El régimen:** Chris revisa al final. La cabina decide, lo razona y lo escribe en `PAA/REGISTRO-DE-JUICIO.md`, salvo lo
  que la §0.9 del HANDOFF deja a Chris. Los talleres no corren git: la cabina commitea por ruta y empuja por sha.

### Lo último hecho

| fecha | qué | commit |
|---|---|---|
| 11-06 | **BUILD-FINAL-3:** los cuatro documentos recompilados y promovidos, con las rondas CORR-NQ y CORR-R2, la alineación ALINEAR-V14 y el logo de Método Cantú | `cb11da4`, `0d5aa23` |
| 11-06 | NUEVAS-FG emitido (la fórmula general, pedido de LECCIONES) | `ac5935a` |
| 11-24 | La mudanza a `Metodo_Cantu\`, que hizo el coordinador | `81cf90d` |
| 11-24 | **PROP-QUIZ y ESENCIAL-ALG emitidos (pedidos de LECCIONES del 11-07)**, y la adenda de NUEVAS-FG | `cb9f952` |

**A LECCIONES hoy no se le entregó nada terminado.** Sus tres pedidos están programados, y CL_Cabina_PC_Chris está
avisada de PROP-QUIZ y ESENCIAL-ALG. La versión esencial del álgebra será la etiqueta de Moodle `ruta-esencial`, puesta
en el XML: 774 de 1 019 preguntas, que coinciden con sus cifras.

### Lo publicado

El PDF y el XML de Moodle de los cuatro documentos (BUILD-FINAL-3), en
`C:\Users\chris\Documents\AIW_Workspace\Metodo_Cantu\cantu-quizzes-latex\PAA\`:
- `Banco de Preguntas\Matematicas\Matematicas.pdf`, 3 390 preguntas;
- `Banco de Preguntas\Español\Español.pdf`, 850;
- `Examen Diagnostico\Examen_Diagnostico.pdf`, 1 031;
- `Examen Simulador\Examen_Simulador.pdf`, 1 118.

Cada uno lleva su `-moodle.xml` al lado. Nada está en Moodle todavía.

### Lo que espera al operador

1. **La QA de BUILD-FINAL-3,** sin noticias desde el 11-06. La guía:
   `C:\Users\chris\Documents\AIW_Workspace\Metodo_Cantu\cantu-quizzes-latex\PAA\tickets\build-final-3\qa-visual-FINAL-3.md`.
2. **Arrancar tres talleres.** Sus tarjetas se propusieron el 11-24 y caducan el 12-01. Si se pierden, se lanzan desde su
   encargo:
   - `PAA\tickets\quiz-propiedades\PROP-QUIZ.md`. Es el que más urge: el primer quiz del curso.
   - `PAA\tickets\esencial-alg\ESENCIAL-ALG.md`.
   - `PAA\tickets\nuevas-fg\NUEVAS-FG.md`.
3. **Decisiones suyas,** cada una con la recomendación de la cabina en el HANDOFF:
   - la nota de vocabulario de RW-81, y la grafía MCM o mcm;
   - tres códigos del Banco con dos cifras;
   - borrar las 12 ramas `claude/*` de GitHub, que ya están integradas por contenido;
   - borrar dos `synctex(busy).gz` versionados y `_scratch\CORR-NQ3\nul`.

### La cola, en orden

1. La QA de Chris → una ronda de corrección con su verificación.
2. Los tres talleres → la cabina verifica, integra y avisa a LECCIONES.
   - NUEVAS-FG pide además **VERIF-NUEVAS-FG**, la verificación ciega, con su encargo por escribir.
   - Si PROP-QUIZ saca preguntas de Propiedades Medio, el faltante lo repone otro encargo.
3. **BUILD-FINAL-4:** compila los cuatro documentos, aplica la etiqueta `ruta-esencial` y deja una guía de QA nueva.
4. La importación a Moodle.

**Los números con que empieza lo que sigue:** la fila 457 del registro, los códigos de cuadráticas `Facil-027` y
`Medio-058`, y la compilación BUILD-FINAL-4. CQL no usa puertos.

### Ramas, worktrees y herramientas

- **En local:** solo `main`, sin worktrees aparte y sin stash.
- **En GitHub:** las 12 ramas `claude/*` de NUBE-Q, del 11-04. Cada fichero que traen es idéntico en `main`, medido hoy.
  Borrarlas espera el sí del operador.
- **La mudanza del 24-nov:**
  - `81cf90d` arregló las rutas de las 25 herramientas activas. **Ninguna se ha vuelto a correr desde entonces**
    [NO VERIFICADO].
  - Quedan rutas viejas en 27 scripts de un solo uso (`PAA\herramientas\cabina\CABINA-*`) y en los encargos viejos.
    Son historia: no se arreglan.
  - `_scratch` quedó vacío: los andamiajes viejos ya no existen.
