# Relevo — hilo `aiw-console`

**Fecha:** 2026-08-15 · **Sustituye** al relevo del 2026-08-13.
Aquella sesión cerró con **64 runs** y el subsistema de reportes construido.
Ésta cierra con **67**, el subsistema **cerrado de verdad** —se escribe, se lee y se
confirma antes de sobrescribir—, y **el contrato del sobre CONGELADO como v1**.

La sustancia va DENTRO. Los punteros a records son procedencia, no respuesta.

---

## 1. DÓNDE ESTAMOS

**Hay UN run `active`: el `#60`, y su QA está PENDIENTE.**

`projects/aiw-console/roadmap/roadmap.json` · md5 **`216921399eeea31105ef3e90438f162a`**
**67 runs** · `completed 59 · planned 7 · active 1` · densidad `1..67` · ids únicos
`HEAD` = **`a7f50dfe`** · **cero commits sin publicar** · cero candados en los cinco repos.

| | run | estado |
|---|---|---|
| **#60** | `RUN-CONSOLE-REPORT-ENVELOPE-RENDER-001` | **`active`. El trabajo está entregado y commiteado (`6aee60a`). Falta que el operador mire la pantalla.** |
| #61 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | una de las dos compuertas del cutover |
| #62 | `RUN-CONSOLE-UI-UX-001` | espera al #61 |
| #63 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | saca el canónico de Cantu de la carpeta que el cutover borra |
| #64 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | el cutover; espera a #61, #62 y #63 |
| #65 | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` | textos falsos; **esta sesión le dejó tres semillas nuevas, §7** |
| #66 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | las cuatro ops de contenedor en el frontend |
| #67 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | auditoría visual, deliberadamente la última |

**Y hay DOS runs que no existen todavía y que el operador ya encargó:**

- **El catálogo de criterios del piloto de quizzes** — en ESTE repo, por la excepción de
  piloto de la D-069, con destino declarado al repo del emisor. §5.
- **El ancla externa de nivel PAA** — el operador está extrayendo cuatro simuladores
  fuera del chat y los traerá en la sesión siguiente. §6.

---

## 2. LO QUE ESTA SESIÓN ENTREGÓ — el subsistema de reportes, cerrado

| | run | qué dejó |
|---|---|---|
| **#57** | `VERDICT-POST` | la **cuarta ruta de escritura**: `verdict.json` al lado del reporte |
| **#58** | `VERDICT-SURFACE` | el veredicto **se lee de vuelta**, el borrador sobrevive a la recarga, y sobrescribir **avisa y resume** |
| **#59** | `ENVELOPE-CONTRACT` | **el documento del sobre, 942 líneas, CONGELADO como v1** |
| **#60** | `ENVELOPE-RENDER` | la consola **pinta** el resumen del emisor y la cobertura de criterios |

### El ciclo del veredicto, cerrado y probado con un humano

El operador firmó un veredicto real, salió, volvió y **no vio nada** — porque la consola
escribía y **no leía nunca**. Firmó otra vez y **sobrescribió en silencio**. Los dos
ficheros eran idénticos salvo la marca de tiempo, así que no costó nada; **la próxima no
tenía por qué**. El `#58` lo cerró: hoy el primer pulsado nunca escribe, avisa con un
resumen **derivado de comparar los dos ficheros**, y **cuando no cambia nada también avisa**
—porque un aviso que sólo aparece cuando hay diferencias enseña a pulsar sin leer—.

**La guarda del `#54` mordió delante del operador por primera vez:** *«APPROVED is not
available for the run: 1 fix is owed to this run itself»*. Hasta entonces sólo la probaban
tests.

### El renderizador pasó de CERO a pintar la cobertura

Medido antes de empezar el `#60`: el renderizador mencionaba `satisfies` **cero veces** y
`profile_data` **cero veces**. Todo el valor del mecanismo de criterios estaba enterrado en
el JSON mientras el operador leía el reporte. Hoy pinta los tres cubos —**cumplidos y
declarados · declarados sin cumplir · silencio = no revisado**— y el cubo del silencio
**pinta la regla**, no un número neutro.

**Lo que la consola todavía NO puede:** nombrar **cuáles** ids están en silencio. El
inventario de los 29 `QZ-C-*` **no tiene canal máquina** —no viaja en el reporte ni en el
índice, y parsear el documento del emisor exigiría un regex de dominio que la ceguera veta—.
**Eso lo arregla el catálogo como dato (§5).**

---

## 3. ⚠⚠ LA LECCIÓN DE MÉTODO: MEDIR PRESENCIA CUANDO HABÍA QUE MEDIR CONTENIDO

**Seis errores de la cabina esta sesión, y tres son el mismo:**

1. **«Ocho pasos de veredicto». Eran ONCE.** Conté `items` y **no le pregunté a la vista**:
   `rrSteps` cuenta también las dos autodecisiones y el run. El taller acertó; CQL también
   se equivocó, con «10».
2. **«El árbol de CQL está limpio», dicho DOS veces. No lo estaba.** `git status --porcelain`
   sobre un repo de **327 MB** excede el tiempo, y **la tubería convirtió el timeout en cero
   modificados**. Misma clase que `--ignore-cr-at-eol` canalizado.
3. **Di por bueno «`subject.feedback` en 17 de 18».** La clave existía y **el valor estaba
   vacío en nueve**. Mi sonda preguntó `!== undefined`.
4. **«El taller sigue trabajando»** cuando ya había entregado — lo deduje de la hora del
   fichero en vez de preguntar.
5. **Le di un comando de arranque peor que su propio script**, que mata el servidor viejo
   del puerto — el fallo que ese lanzador existe para impedir.
6. **Di un coste falso en una decisión** —«barata, la escribo yo»— cuando tocaba el motor.
   Se corrigió **antes** de registrarla.

**Y el hallazgo que lo convierte en patrón y no en descuido:** el validador de CQL aprobaba
las nueve retroalimentaciones vacías **porque comprobaba `"feedback" in subject`** —
presencia, no contenido. **Dos hilos independientes, la misma trampa, y en los dos produjo
un verde.**

**Regla que queda: una sonda de presencia NO es una sonda de contenido, y en un campo de
texto casi nunca es la que quieres.**

---

## 4. EL CONTRATO DEL SOBRE — congelado, y qué significa

`docs/SOBRE-DEL-REPORTE-v1.md` · **942 líneas · CONGELADO el 2026-08-15**

Se estrenó contra el reporte real del piloto **antes** de darse por bueno, se enmendó con la
decisión del operador y **se volvió a medir bajo la regla nueva**. Toda cifra viaja con su
comando en el Anexo A.

**Congelado significa: no se mueve salvo por decisión numerada.** Ya se movió una vez así
—la D-069— y la enmienda va **fechada y visible dentro del §0**, no editada en silencio.

### Las cinco decisiones que lo gobiernan

- **D-065** — el resumen es del **emisor**; presencia obligatoria, contenido opcional, **y
  una ausencia declara su motivo**; lo derivable se deriva y nadie lo escribe.
- **D-066** — sobrescribir un veredicto **avisa, resume lo que cambia y pide confirmación**;
  y que no cambie nada **también se avisa**.
- **D-067** — la cobertura se lee **DURA**: el silencio es «no revisado», quien revisó y
  encontró limpio **lo declara**, y `satisfies` puede colgar de la cabecera **donde vive la
  evidencia** (`header_satisfies[]` con `where` obligatorio).
- **D-068** — el perfil se declara **en el run, antes de ejecutar** (hoy en
  `full_description`, forma barata); la **versión se fija al ABRIR** el run; y lo
  irreproducible **por construcción** lo declara el **perfil**, una vez, no las 39
  revisiones.
- **D-069** — el catálogo de criterios lo escribe **la CABINA del proyecto dueño**, no su
  ejecutor. **Excepción de piloto acotada y con caducidad escrita**, §5.

### La regla que impide la cobertura falsa, y de dónde salió

**Un criterio reutilizable no es un enunciado con un id: es un id más un chequeo tan
concreto que dos ejecutores saquen el mismo número.** La rúbrica afirma «88 de 90
distractoras explicadas»; el ejecutor obtuvo **1 en lectura estricta y 5 en amplia**, porque
la §6.4 nunca define qué cuenta como explicar una distractora. **Un criterio sin chequeo
sale verde y no significa nada.**

### Una quinta situación que apareció midiendo

El encuadre de la cobertura tenía cuatro filas y **resultó tener cinco**:
`QZ-C-COUNT-MOVE` está **cumplido por ítems que existen y no lo citan**. No lo alcanza la
extensión a la cabecera —colgarlo de `counts` sería citar evidencia donde no vive— y **la
regla 2 de la D-067 ya lo resuelve** sin reabrir nada.

---

## 5. EL CATÁLOGO DE CRITERIOS — el run que falta, y por qué es aquí

**La D-069 lo pone en la cabina del proyecto dueño. La excepción de piloto lo trae aquí**,
porque el ida y vuelta entre hilos añade fricción que una prueba piloto no debe pagar.

**Nace con destino declarado: se muda al repo del emisor en su run de adopción.** Y la
caducidad está escrita porque **una excepción sin fecha de muerte se convierte en la regla**,
y ésta pondría a este repo a redactar criterios de un dominio del que es **deliberadamente
ciego** — la suite de tokens vetados creció de 94 a **160** agujas y **ya mordió a tres
autores distintos**, el último el ejecutor del `#60` con un `it.type !=`.

**La forma acordada es JSON**, y no por gusto: **cero ficheros YAML o TOML en el repo y
`dependencies: {}` vacías**. Y sobre todo, el motor asegura **ida y vuelta byte a byte**, que
es lo que sostiene el ritual de `md5 antes/después`; YAML no puede prometerlo.

Cada ficha: **`id` · `demands` · `check` · `evidence` · `reproducible`**. El `check` es el
campo que hoy no existe y que la §6.4 demuestra que hace falta.

**Y el inventario viaja como artefacto derivado en `.project/`**, igual que los otros siete
— con eso la consola pasa a **nombrar** los ids en silencio.

**El trabajo de fondo es del operador, no de un taller:** escribir el chequeo de un criterio
**es fijar el estándar**, y un ejecutor que se lo invente estaría inventando la vara con la
que se le mide. Un taller sí puede extraer los 29 de la rúbrica, rellenar lo derivable y
**marcar lo que no**.

---

## 6. EL ANCLA DE NIVEL PAA — lo que el operador está extrayendo ahora

**El problema que lo motiva, en sus palabras:** no tiene una referencia de nivel — *«no
tengo un examen nivel PAA para decir: tengo que poder pasar este examen, no más difícil, no
más fácil»*.

**Y el diagnóstico que salió al medir: su ancla actual es AUTORREFERENCIAL.** El reporte del
piloto declara `anchor_size: 40` — «20 del Examen Diagnóstico + 20 del Simulador», **material
propio construido por el mismo proceso que se está revisando**. Si deriva, el ancla deriva
con él y nadie se entera.

**Lo que ya tenía sin saberlo:** su propia prueba de práctica dice en la página 1, verbatim,
que **«se elaboró con la misma cantidad de ejercicios, la misma variedad de temas y el mismo
nivel de dificultad que la prueba verdadera»**. Eso ES el ancla.

**Lo que le faltaba:** la **Práctica Oficial** de College Board con AprendoLibre —
`paa.aprendolibre.com`, gratuita, cientos de ejercicios oficiales. **De ahí salen los cuatro
simuladores que está extrayendo.**

### Lo acordado para cuando los traiga

- **Una fuente canónica, no cuatro ficheros ni una carpeta por tema.** Cada reactivo con
  `source`, `position`, `topic`, enunciado, opciones y **respuesta**. Las vistas por tema son
  **consultas**, no ficheros — un derivado persistido es una copia de la verdad que nadie
  regenera.
- **Conservar la POSICIÓN.** Hipótesis **a verificar, no a creer**: si la PAA ordena de
  fácil a difícil dentro de la sección, la posición es el único dato de dificultad por
  reactivo que se puede obtener, porque las estadísticas no se publican.
- **Clasificar con los códigos del corpus** —`ARI-FA-Fracciones`, `ARI-PI-Porcentajes`…— o el
  cruce no ocurre. **Y marcar los que no encajen: ésos son temas que la PAA evalúa y el banco
  no cubre.**
- **Contar reactivos por subtema ANTES de escribir el criterio.** Habrá subtemas con dos o
  tres, y un criterio que compare contra un ancla de dos **no significa nada**: tiene que
  declarar el tamaño y decir cuándo es demasiado delgada.
- **Verbatim.** Arreglar una redacción al transcribir convierte la vara en material propio.
- **Y la vara se mira, no se copia:** es propiedad de College Board y su PDF prohíbe la
  reproducción. Ruta separada, marcados como externos, **fuera de toda compilación de quiz**.

**El operador extraerá primero los cuatro de matemáticas.** Se le recomendó parar ahí antes
de hacer los doce restantes: si el diseño falla, falla habiendo pagado 4 y no 16.

---

## 7. LO QUE ESTÁ ABIERTO CON `cantu-quizzes-latex`

**Adoptaron el sobre a mitad de esta sesión, y el reporte del piloto cambió bajo nuestros
pies** — el `#60` lo detectó y ganó el disco. Hoy el reporte trae `summary` con sus tres
claves, `header_satisfies`, `QZ-C-COUNT-MOVE` citado, y `QZ-C-DISTR` declarado en un
`affects`.

**Cobertura verificada con comando propio: `citados 14 (11 ítems + 3 cabecera) · cumplidos 13
· declarados 16 · silencio 0`.** La regla 5 funciona sobre dato: `QZ-C-DISTR` sale de
cumplidos **sin leer una línea de prosa**.

**Lo que queda con ellos, y el operador ya lo aprobó:**

1. **Que commiteen la adopción.** Su árbol la tiene **sin versionar**, y **nuestros fixtures
   copian ese disco**: si se descartara, tendríamos pruebas apuntando a algo que nunca
   existió en la historia.
2. **Su run de adopción** — el sobre v1, la D-068 y la D-069. Aprobado por el operador,
   **va a su cola**.
3. **`QZ-R-06`:** dicen que va citada en `header_satisfies` y **en el reporte hay cero
   apariciones de `QZ-R-06` ni de ningún `QZ-R-*`**. Puede que se refieran a su perfil. **Sin
   confirmar.**

**El veredicto del piloto NO es el veredicto del operador.** Lo firmó para probar la
herramienta y **lo retiraron por renombrado**, dejando un fichero que se delata solo con
cinco señales. **`D1` NO está ratificada** pese a lo que dijera el fichero, y su alcance
declarado es entrar en la rúbrica v3 y **aplicarse a los 39 runs restantes**.

---

## 8. LA MÁQUINA, GIT Y LOS CANDADOS

**Modo COWORK CONECTADO.** La ruta de montaje **se deriva cada sesión**. **El borrado hay
que pedirlo**: al abrir esta sesión `rm` daba `Operation not permitted`, se pidió el permiso
y quedó habilitado para la carpeta.

**Dos cosas medidas que muerden y no estaban en el relevo anterior:**

- **`git status --porcelain` completo sobre `cantu-quizzes-latex` (327 MB) EXCEDE EL TIEMPO.**
  Va **acotado a rutas** — `-- reports .project` — o miente por timeout. **Y no se canaliza a
  `head`**, porque eso convierte el error en un cero.
- **El entorno puede ponerse lento y matar un `commit` a mitad es lo que crea el candado.**
  Pasó una vez: el commit **sí entró** y se verificó **leyendo `.git/HEAD` y `.git/logs/HEAD`
  directamente, sin invocar git**. Es la sonda correcta cuando git no responde.

`origin/main` **se resuelve por nombre**, no por `refs/remotes/origin/main` — el ref suelto y
el empaquetado discrepan y `rev-parse` de la ruta completa falla.

**El lanzador del operador es mejor que un `node` a mano:** `start-console.cmd` mata el
proceso viejo del puerto, verifica que queda libre y abre el navegador. **Y miente sobre sí
mismo** — §9.

---

## 9. SEMILLAS PARA EL `#65`, no su inventario

**El `#65` tiene que derivar la lista corriendo el método. Estas tres aparecieron de paso:**

- **`start-console.ps1` se llama a sí mismo «Read-only console: the server answers GET and
  HEAD only and writes nothing».** **Son CUATRO rutas de escritura**, y la frase se le enseña
  al operador justo cuando va a firmar. **La más peligrosa de las encontradas.**
- **`CONTRATO.md` declara que un run admite 11 claves y el disco tiene 15** — la
  clasificación añadió seis por una op sancionada. Es el contrato del roadmap describiendo un
  árbol que ya no existe.
- **El acuse de la re-emisión dice «Re-emitted 6 artifacts»** y son siete; el README decía
  «all six artifacts».

---

## 10. RECORDS DE ESTA SESIÓN

```
context/aiw-console/records/
  MENSAJE-DE-CQL-CIERRE-DE-LAS-TRES-DEL-EMISOR.md
  ENDPOINT-DEL-VEREDICTO-CIERRE-Y-VEREDICTO-DEL-OPERADOR.md
  SUPERFICIE-DEL-VEREDICTO-CIERRE-Y-EL-APPROVED-QUE-NO-ES-REAL.md
  PINTADO-DEL-SOBRE-RESUMEN-Y-COBERTURA.md
docs/
  SOBRE-DEL-REPORTE-v1.md            ← el contrato congelado
context/
  DECISIONES.md                      ← D-065 a D-069
```

**Y una nota sobre formatos, por si vuelve la pregunta:** se decidió **JSON para dato** y se
descartaron YAML, XML y TOML con razones medidas. **Markdown se queda para los tickets**, que
los lee un humano. **Y para bloques de contenido pegado a un modelo, etiquetas tipo XML**,
porque delimitan lo que el Markdown no puede cuando el contenido trae su propio Markdown
dentro. Son tres preguntas distintas con tres respuestas distintas.
