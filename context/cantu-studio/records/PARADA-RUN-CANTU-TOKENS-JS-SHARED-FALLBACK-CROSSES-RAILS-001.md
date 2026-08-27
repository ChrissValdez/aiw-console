# PARADA DE ANÁLISIS — `RUN-CANTU-TOKENS-JS-SHARED-FALLBACK-CROSSES-RAILS-001`

> `queue_order` **136** al medirse · «Decide and migrate the tokens.js fallback, which both rails read»
> Celebrada por la CABINA el **2026-08-27**. El run seguía `planned` y **no se emitió ningún encargo**.
>
> **AVISO DE IDENTIDAD.** `PARADA-136-LA-PREMISA-DE-LOS-DOS-CARRILES-ERA-FALSA.md` **NO es de este
> run**: es de `RUN-CANTU-SHARED-SIZE-CONTROL-STEPPER-001`, que ocupaba la posición 136 el
> 2026-08-24. Este documento se nombra por el `run_id`, que es la identidad, y no por el número,
> que es una coordenada fechada.

---

## POR QUÉ HAY PARADA

El propio `full_description` del run la ordena, verbatim:

> *«PARADA DE ANALISIS: este run NO empieza escribiendo. Empieza midiendo QUE MUEVE EN WEB, y
> llevandoselo al operador.»*

Y añade: *«SI ALGUNA AFIRMACION NO CUADRA CON EL DISCO, PARA Y REPORTA.»* **Dos de las tres no
cuadran.** Por eso este documento existe.

---

## 1 · LAS TRES AFIRMACIONES DEL RUN, CONTRA EL DISCO

| # | lo que dice el run | veredicto |
|---|---|---|
| 1 | «`renderTable.js` lee `design/tokens/tokens`, **NO** `commons.js`» | **IMPRECISO** |
| 2 | «`tokens.js` **lo lee TAMBIÉN WEB** — `web/partials/renderConceptGrid.js`» | **CIERTO** |
| 3 | «converger su respaldo cuesta **52 superficies**» | **NO CUADRA** |

### 1 · Imprecisa

`src/builders/slides/components/renderTable.js` **sí requiere `commons.js`** — línea 3,
`getGridPositionStyles`. Lo cierto, y es lo que importa: **su COLOR no sale de `commons.js`**.
Tiene su propio `themeMap` (líneas 121-125) montado sobre `tokens.def.main`, `tokens.ctx.main`,
`tokens.str.main`, `tokens.res.main`, `tokens.wrn.main`, `tokens.err.main` — **seis de los nueve
tokens**; `ex`, `focus` y `meta` no aparecen. La afirmación se sostiene sobre el color y no sobre
el `require`.

### 2 · Cierta, y por poco no se ve

Web accede **por indexación dinámica**: `resolveColorTheme(tokens, item.variant)`, líneas 193-194.
**Una sonda que busque `tokens.def` NO LO VE.** La primera sonda de esta cabina concluyó
«1 solo lector de color en todo el repo» y **era falso**. Es la lección de `showcase_library.js`
otra vez, con otra cara: la sonda no podía ver lo que buscaba.

### 3 · No cuadra — y el número correcto es más pequeño

Medido **diferencialmente** (ver §2): **41 superficies distintas**, no 52.

---

## 2 · QUÉ MUEVE `tokens.js`, MEDIDO — Y CÓMO

**Método, y sustituye a uno que falló.** El primer censo contaba toda aparición de un hex de
`tokens.js` en el HTML renderizado: dio **3 927** y esa cifra es **falsa** como respuesta a «qué
mueve `tokens.js`», porque cuenta también los hexes iguales escritos a mano en otros ficheros y
los que vienen de hojas de estilo. **Se publica el error, no se borra.**

**El método que vale es diferencial y no toca el disco:** renderizar el corpus; **mutar en memoria**
la tabla de color del módulo ya cargado —todos los lectores comparten la instancia del
`require` cache—; renderizar otra vez; contar lo que cambió. Lo que cambia es, **por
construcción**, exactamente lo que lee `tokens.js`. Ni uno más.

### El resultado

| carril | componente | superficies **distintas** | apariciones renderizadas |
|---|---|---|---|
| DIAPOSITIVA | «Tabla» | **27** | 54 |
| WEB | «Anatomía de fórmula» (rejilla web) | **14** | 28 |
| **total** | | **41** | **82** |

**Por qué las dos columnas.** `src/content/sandbox/showcase_library.js` re-exporta **por
referencia** las 5 secciones de diapositiva de `test_tables.js` y las 10 web de
`test_theory_complex.js` — comprobado por identidad de objeto, 5 de 5 y 10 de 10. El agregador
las renderiza **otra vez**, así que el corpus las pinta dos veces. **41 es la cifra honesta; 82 es
la que sale si se cuenta el corpus renderizado sin descontar el agregador.**

### Tres hechos que el encuadre del run no anticipaba

1. **`.bg` NO SE RENDERIZA NUNCA. Cero, en los dos carriles.** Mutados los nueve `.bg`, **ningún**
   fichero del corpus cambia. Los `bg` y los `label` de `tokens.js` son peso muerto en lo que
   se pinta hoy. **Convergir el respaldo es una decisión sobre `.main` y sólo sobre `.main`.**

2. **TODO EL COSTE ESTÁ EN EL SANDBOX.** De los 63 ficheros del corpus, cambian **4**, y los cuatro
   están bajo `src/content/sandbox/` — y dos de ellos son el agregador repitiendo a los otros dos.
   **Cero lecciones. Cero `staging`. Cero borradores de `author_lite`.** Coherente con lo que ya
   sabía el proyecto: lo que pasa por el compilador recibe la paleta del autor ya resuelta.

3. **`.main` mueve 6 tokens en diapositiva y 2 en Web.** Diapositiva: `def`, `ctx`, `str`, `res`,
   `wrn`, `err`. Web: `def` y `focus`. Los demás no se alcanzan desde el corpus de hoy.

---

## 3 · LA PREMISA QUE HAY QUE CORREGIR: `tokens.js` NO ES UNA COPIA VIEJA. **ES LA REFERENCIA DE WEB.**

Y está **guardado por una prueba que se escribió a propósito** en el lote 0 de `#134`:

`tools/author-lite/compiler-api/tests/slideEngineColourSelfConsistency.test.mjs`

- **C1** — *«tres fuentes independientes fijan la referencia, y coinciden en los nueve ids»*:
  afirma `U(webCommons.PALETTE[…].color) === U(tokens[id].main)` **para los nueve**.
- **C1-bis** — *«la tabla del motor SE SEPARÓ de la paleta de Web, en los nueve, a propósito»*:
  afirma que `commons.resolveVariantAccent(id) !== U(tokens[id].main)` **en los nueve**.

Verificado en disco: `commons.js` (diapositiva) y `tokens.js` **coinciden en 0 de 9**.

| token | `tokens.js` (Web) | `commons.js` (diapositiva) |
|---|---|---|
| `def` | `#B48EAD` | `#9B6FA5` |
| `ctx` | `#5E81AC` | `#4F75A8` |
| `ex` | `#88C0D0` | `#6EB4C7` |
| `focus` | `#C2B280` | `#B69F58` |
| `str` | `#D6CFC2` | `#C9BFAE` |
| `res` | `#A3BE8C` | `#87A96B` |
| `wrn` | `#D08770` | `#C97353` |
| `err` | `#BF616A` | `#B24B5A` |
| `meta` | `#4C566A` | `#3F4A5D` |

**Consecuencia, y es lo que cambia la conversación:** mover los `.main` de `tokens.js` a los
valores de diapositiva **rompe C1 y C1-bis**. No es un daño colateral que se arregle actualizando
la prueba: **C1 dice que `tokens.js` ES la paleta de Web**. Moverlo sin mover `web/partials/commons.js`
deja a Web con dos referencias que se contradicen; moverlo CON `web/partials/commons.js` **es
repintar el carril Web entero**, que es una decisión de producto y no de higiene.

---

## 4 · HALLAZGO QUE SE NOMBRA Y NO SE ABRE

`tokens.js` **no es la única copia de la tabla vieja**. Censados los literales en `src/builders/`
(excluido el propio `tokens.js`, y separando código de comentario):

**32 ficheros del motor · 145 apariciones EN CÓDIGO · 8 en comentario.**

Los mayores: `renderStackSlide.js` (20), `inkEngine.js` (16), `renderTimelineSlide.js`
(13, `_deprecated`), `renderArithmetic.js` (11), `web/partials/renderNarrative.js` (10),
`web/partials/commons.js` (9), `renderConceptCard.js` (8).

**Convergir `tokens.js` deja esos 32 ficheros exactamente como están.** Se nombra como hallazgo:
que se pueda convergir no significa que deba abrirse aquí, y esa segunda pregunta es del operador.

---

## 5 · EL COMPROMISO PENDIENTE DE `#134` NO ESTÁ DONDE EL RELEVO LO PUSO

El relevo del 2026-08-26 apunta a este run *«la consolidación de los dos hexes del verde del paso
de resultado»*. Medido:

- `src/builders/slides/layouts/renderStackSlide.js:54` — `const VERDE_DEL_RESULTADO = '#A3BE8C'`
- `src/builders/slides/helpers/commons.js:77` — `res: { color: "#87A96B" }`

**Los dos son literales escritos a mano. `#A3BE8C` coincide con `tokens.res.main`, pero
`renderStackSlide.js` NO lee `tokens.js`.** Cerrar ese compromiso es una edición de
`renderStackSlide.js`, **no de `tokens.js`**, y por tanto **no depende de lo que se decida aquí**.

El propio fichero ya lo tiene declarado en sus líneas 409-411: la insignia queda en `#FFF` sobre
`#A3BE8C`, **2,04:1**, y está en el reporte de `#134` como defecto declarado y no reparado.

---

## 6 · LO QUE LA CABINA NO PUEDE JUZGAR

Las **14 superficies de Web** son un cambio de color en pantalla. **La cabina no ve interfaces.**
Cualquier opción que las mueva necesita veredicto visual del operador **antes** de cerrarse.

---

## 7 · LAS OPCIONES, CON SU COSTE MEDIDO

| | qué hace | superficies que mueve | rompe C1 / C1-bis | juicio visual |
|---|---|---|---|---|
| **A** | los nueve `.main` de `tokens.js` → valores de diapositiva | 27 diapositiva + **14 Web** | **sí, las dos** | **sí, Web** |
| **B** | partir `tokens.js` en tabla de diapositiva y tabla de Web | 27 diapositiva + 0 Web | no | no |
| **C** | retirar la tabla de color de `tokens.js`; cada carril lee el respaldo de SU `commons.js` | 27 diapositiva + 0 Web | no | no |
| **D** | no tocar `tokens.js`; sólo declarar la divergencia | 0 | no | no |

**Coste añadido de A:** obliga a mover `web/partials/commons.js` en los nueve para no dejar Web con
dos referencias contradictorias — y eso **repinta el carril Web**, que ninguna decisión registrada
del operador ha pedido.

**Nota sobre C:** `web/partials/commons.js` ya tiene su tabla completa (`PALETTE` + `VARIANTS`
por nombre de color), así que el destino existe y no hay que inventarlo. `renderTable.js` pasaría a
`commons.resolveVariantAccent`, que es la ranura única que ese componente ya necesita.

---

## 8 · SONDAS

Todas en fichero, fuera de todo repo, en `_scratch/`. **La sonda 3 se declara fallida y su
resultado (3 927) se marca como no válido.**

| sonda | qué mide | resultado |
|---|---|---|
| `parada136-1-quien-lee-tokens.mjs` | lectores estáticos de `tokens.js` por carril | **incompleta** — no ve la indexación dinámica de Web |
| `parada136-2-las-tablas.mjs` | `tokens.js` vs `commons.js` en los nueve | coinciden **0 de 9** |
| `parada136-3-censo-superficies.mjs` | apariciones de hexes de `tokens.js` | **DESCARTADA** — cuenta copias ajenas |
| `parada136-4-que-se-mueve.mjs` | **diferencial**: mutar en memoria y diffear | `.main` **41** distintas · `.bg` **0** |
| `parada136-5-el-agregador.mjs` | si `showcase_library` duplica | **sí**: 5/5 y 10/10 por referencia |
| `parada136-6-copias-privadas.mjs` | la tabla vieja escrita a mano en el motor | **32 ficheros · 145 en código** |
