# CIERRE de `RUN-CANTU-TOKENS-JS-SHARED-FALLBACK-CROSSES-RAILS-001` — y el censo REAL de la capa 3

> Cerrado el **2026-08-27**, `active → completed`, **sin QA visual y declarado**.
> Commits: `da00a332` (trabajo del taller) · `2994e9cd` (cierre del roadmap).

---

## EL CIERRE SIN QA — es el PRIMERO del proyecto

`#134` cerró con la QA del operador. Éste no. **Lo aprobó él**, con las opciones y el coste
delante, y la razón está medida:

- Las **27 superficies** que cambian están **todas bajo `src/content/sandbox/`**. Cero lecciones,
  cero staging, cero borradores de `author_lite`.
- Los seis colores nuevos son los de la **paleta de diapositiva que ya aprobó en `#134`**, y que
  ya ve en «Nota destacada», «Explicación guiada» y «Regla».

**Lo que queda sin mirar:** cómo se ven esos seis en una tabla real, a tamaño real, en pantalla.
Si eso estuviera mal, lo estaría también en los otros cuatro componentes ya aprobados — sería de
`#134`, no de este run.

**⚠ SI EL SIGUIENTE RUN SOBRE ESTA MISMA SUPERFICIE TAMBIÉN CIERRA SIN QA, HAY QUE NOMBRARLO.**

### La verificación que sustituyó a la QA, y es más fuerte que mirar

**No hizo falta correr la red de fixtures: bastó leer sus pines.** Los dos árboles re-fijados
cambian **27 líneas cada uno** y, emparejadas una a una, **27 de 27 cambian sólo el hex de un
token**, con **cero cambios estructurales**. Migraciones idénticas en los dos árboles:
`def`×3, `ctx`×5, `str`×3, `res`×7, `wrn`×4, `err`×5.

**Un re-fijado no pudo esconder nada, y está demostrado.** Es una técnica que conviene reusar:
cuando un run re-fija árboles, el diff de los pines **es** la QA estructural.

### Lo que la cabina NO pudo verificar, y se declara

**La suite completa.** 136 ficheros; **22 ya revientan el tope de una llamada de la cabina**, y la
red de fixtures sola también. Corrió los seis ficheros que el run tocó: **45 pruebas, 0 fallos**
en los cuatro rápidos. **El `1986 → 1987, 0 fallos` es cifra del taller y queda marcada como suya.**

---

## EL CENSO REAL DE LA CAPA 3 — el techo de 145 era falso por partida doble

El operador preguntó si limpiar los hexes viejos del motor eran «tres runs o treinta». Se midió.

### Error propio, publicado

La primera sonda contaba **literales en el fuente** y además **acumulaba las recompilaciones** del
mismo módulo. Daba miles. **Esa cifra no vale.**

### El método que sí vale

Se engancha `Module.prototype._compile` y, al cargar cada fichero de `src/builders/`, se sustituye
**cada par (fichero, hex viejo) por un centinela único**. Luego se renderiza el corpus entero en
los dos carriles y se cuenta qué centinelas aparecen. **Un centinela que aparece, pinta.**
No toca el disco.

### El resultado, y lo que corrige del planteamiento

|  | ficheros que pintan | apariciones |
|---|---|---|
| Carril **WEB** | 12 | 1 246 |
| Carril **DIAPOSITIVA** | 9 | 1 209 |

**⚠ LOS DE WEB NO SON VIEJOS.** `#5E81AC` es viejo para diapositiva y es el `ctx` **vigente** de
Web. Borrarlos no sería limpiar: **sería repintar Web**, que es la opción **A** que el operador
descartó el mismo día. **La capa 3 que hay que limpiar es sólo la de diapositiva.**

### Los SIETE ficheros que quedan

De los 9 de diapositiva, dos sólo pintan `meta` (`#4C566A`), que se usa como gris genérico y
probablemente no es el token. Quedan:

| fichero | tokens obsoletos | dueño |
|---|---|---|
| `slides/helpers/inkEngine.js` | `def ctx res wrn err` | — |
| `slides/components/renderCard.js` | `ex str` | — |
| `slides/layouts/renderStackSlide.js` | `res wrn` | **el compromiso del verde de `#134`** |
| `slides/layouts/renderTitleSlide.js` | `ctx wrn` | — |
| `slides/components/renderArithmetic.js` | `def ctx res err` | — |
| `slides/components/renderSplitCard.js` | `res` | — |
| `slides/components/renderConceptCard.js` | `def focus` | **`RUN-CANTU-SLIDE-CONCEPTGRID-BADGE-INK-AND-TABLE-001`** |

**Son unos cinco trabajos, no treinta. Dos ya tienen dueño.**

### Dos límites de este censo, declarados

1. **Las cuentas de apariciones están infladas** por el agregador —que renderiza dos veces las
   mismas escenas— y por las hojas de estilo emitidas en cada render. **Sirven para ordenar los
   ficheros por peso, no para prometer superficies.** Eso se mide en diferencial, run por run.
2. **Mide contra el corpus de HOY.** Una rama que sólo se enciende con un dato que nadie ha
   escrito sale como «no pinta» y podría pintar mañana.

---

## LO QUE EL TALLER HIZO MEJOR DE LO QUE EL TICKET PEDÍA

1. **`C1` no se apuntó a `web/partials/commons.js`**, que la habría vuelto *«commons coincide
   consigo mismo»*. Su segunda fuente pasa a ser **la paleta de autor de Web**. Y **añadió una
   guarda contra la tautología futura** — afirma que `web/partials/commons.js` no importa
   `colorSystem`. Verificado por la cabina: ni una importa a la otra, y coinciden 9 de 9.
2. **Cazó una guarda hueca.** La comprobación de forma de `conceptGrid` dejó de estar ejercitada
   por dato real al cambiar de mapa: **se podía quitar media guarda con la suite en verde.**
   Escribió la prueba que la vuelve exigible. **La cazó su arnés de mutación, no la suite.**
3. **Re-fijó los árboles y explicó por qué se movieron**, que es lo que `pinCorpusFixtures.mjs`
   exige por diseño al ser un acto manual y no automático.

---

## DOS COSAS QUE QUEDAN VIVAS Y SON DEL OPERADOR

**1 · La parada de convergencia del §3 de «Tabla» dejó de disparar.** Medido de punta a punta: por
el camino del autor, una tabla sin sembrar y una con `ctx` **ya pintaban ambas `#4F75A8` antes de
este run**, porque desde el lote 2 de `#134` el compilador emite el `borderColor` resuelto también
por defecto. **El §3 sigue sin hacer, a propósito.** Sembrar el formulario es decisión del
operador y de otro encargo. Es el **único** sitio donde cambió lo que una prueba afirma, y no es
`C1` ni `C1-bis`.

**2 · Delta declarado.** La tabla de Web trae cuatro claves más — `success`, `warning`, `error`,
`code` — que antes caían al respaldo limpio. **Cero superficies se mueven.** Es el idioma que ya
usan las otras doce parciales de Web; restringirlo sería añadir criterio que nadie pidió.
