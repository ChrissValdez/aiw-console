# VEREDICTO — `#131` «Anatomía de fórmula»: el motor no tenía celda, y el operador eligió extraer

> Escrito por la cabina el **2026-08-21**, ANTES de emitir el ticket y en el mismo turno en que se
> abrió el run. Es un veredicto de DISEÑO del operador, y se guarda igual que uno de QA.

---

## LO QUE SE MIDIÓ, Y POR QUÉ SE PARÓ ANTES DE EMITIR

El texto de `#131` mandaba admitir `conceptGrid` como componente de celda usando `split` de
plantilla. La cabina midió la superficie antes de escribir el ticket y encontró que **la plantilla
no cubre la pieza principal**:

| medición | ruta | resultado |
|---|---|---|
| el despachador de celda | `src/builders/slides/layouts/renderColumnsSlide.js:98-118` | **DOCE** `case`, y `conceptGrid` NO está |
| qué le pasa hoy a un `conceptGrid` en celda | ídem, `default` (:118) | cae al `default` y se pinta como prosa suelta en un `j-slide-text-card` |
| el componente de tarjeta | `src/builders/slides/components/` | **`renderConceptCard.js` NO EXISTE** |
| dónde vive el dibujo | `src/builders/slides/layouts/renderConceptGridSlide.js:134-214` | incrustado en el `.map()`, con `ANATOMY_STYLES` (9 clases `j-anatomy-*`) en el mismo fichero |
| a qué está atado | ídem, `rowStyle` / `defaultTargetRow` (:132) | a la **fila 2 de una rejilla de tres** — geometría de diapositiva entera |

**Y la razón de que `split` engañe, medida en git y no razonada:**

- `case 'split'` entró en `renderColumnsSlide.js` en el commit **`3e3e5551`**, viejo, muy anterior
  al run de admisión.
- El commit del run de admisión de `split` (**`946c5bec`**) **no tocó `renderColumnsSlide.js`**:
  su único fichero bajo `src/builders/slides/` fue `renderSplitCard.js`, y solo para ampliar
  `SPLIT_STYLES` (+127/-…, un solo hunk a partir de la línea 135).

> **`split` admitió un tipo QUE EL MOTOR YA PINTABA. `conceptGrid` no.** La frontera compartida del
> plan decía «el motor es de solo lectura; si el componente no puede admitirse sin cambio de motor,
> **para y reporta**». Emitir el ticket como estaba escrito habría mandado al taller a chocar con
> esa frontera en la primera hora.

**Esto es la regla de `#130` aplicada a tiempo:** el defecto no estaba en el ticket, estaba en la
capa de abajo. Se llamó a la capa de abajo ANTES de gastar una ronda, no después de cuatro.

---

## LAS CUATRO OPCIONES QUE SE LE DIBUJARON

Se le dibujaron, no se le describieron. Decidió en una línea, como las otras veces que se le
dibujó.

| | salida | coste de motor | deuda |
|---|---|---|---|
| **A** | extraer una vez: nace `renderConceptCard.js` y **el layout pasa a consumirlo** | alto | **cero** — una sola implementación |
| B | extraer sin tocar el layout | medio | dos dibujos vivos del mismo concepto |
| C | parar y reportar, como manda el contrato | cero | gasta un taller sin admitir nada |
| D | reordenar: `#132` «Tabla» primero (su `case` ya existe) | cero hoy | `conceptGrid` espera |

**Medido y publicado con las opciones:** nadie declara `depends_on` a `#131`; `#131`–`#135` tienen
todos `depends_on: []`; ninguno lleva `lane`, `barrier` ni `batch`. **La cola era reordenable sin
tocar una sola arista** — la cadena serial del plan es de superficie de escritura, no de aristas.
D era real, no un adorno.

---

## EL VEREDICTO

**Christopher Valdez Cantu, 2026-08-21: opción A — «A · extraer una vez».**

Consecuencia, escrita en el `full_description` del run en el mismo turno (**D-061**: la pide el
operador, no cambia la identidad del run, y el texto se enmienda en el mismo encargo):

1. Nace `src/builders/slides/components/renderConceptCard.js`.
2. `renderConceptGridSlide.js` **pasa a consumirlo** y deja de duplicar el dibujo.
3. `renderColumnsSlide.js` gana su `case 'conceptGrid'`.
4. Los estilos `j-anatomy-*` viajan con el componente.

**La guarda de la extracción es el corpus, y sale gratis:** los árboles fijados capturan el HTML
byte a byte. Si el HTML de `conceptGridSlide` no cambia, la extracción está probada sin escribir
una guarda nueva. **Si un árbol se mueve, se para y se reporta QUÉ cambió antes de refijar nada.**

---

## EL NOMBRE NO SE PROPUSO: SE MIDIÓ

La compuerta de nombre de este run **se cerró midiendo**. `conceptGrid` **ya tiene etiqueta de
autor en Web**, y es el mismo caso que `split`, en la línea de al lado del mismo catálogo:

| superficie | ruta | línea | etiqueta |
|---|---|---|---|
| `WEB_COMPONENT_UI` | `…/editor/constants/blockCatalog.js` | 148 | **«Anatomía de fórmula»** |
| `BLOCK_CATALOG` | ídem | 292 | «Anatomía de fórmula» |
| menú de columna | `…/editor/components/web/WebBlockEditor.jsx` | 390 | «Anatomía de fórmula» |
| marcador «sin título» | ídem | 605 | «Anatomía de fórmula sin título» |
| **el precedente** | `WebBlockEditor.jsx` | **386** | `split` → «Explicación guiada» |

Y el equivalente de Web **no es un tipo distinto**: es literalmente `conceptGrid`
(`src/content/sandbox/test_theory_complex.js:131`). El identificador interno **no se renombra** —
`blockCatalog.js:142-147` ya lo dejó escrito: renombrarlo tocaría Core, los fixtures y el
compilador por una razón cosmética.

**Nada se inventó.** Es la corrección de la ronda 1 de `#130`, aplicada antes de cometerla.

---

## EL MATERIAL DE QA, PASADO POR LA PUERTA REAL ANTES DE ENTREGARLO

La regla dice que la cabina produce el material y lo prueba contra la puerta real, porque un
material sin probar puede fabricar un rojo falso. Hoy el material **tiene que rebotar** —el tipo
aún no está admitido—, así que lo que se probó es **que rebota SOLO por eso**:

| prueba | qué probó | resultado |
|---|---|---|
| 1 | `SlidesDraftSchema` con el material | **rebota, 2 incidencias, LAS DOS del discriminante `type`** |
| 2 | mismo envoltorio y mismas coordenadas, con `card` | **valida** — `columnsSlide` + `rows:['1fr','auto','1fr']` + `row:2/col:1,2` es correcto |
| 3 | la puerta real `parseAndValidateBlocks(…, 'slide')` con el control | **ok: true** |
| 4 | la puerta real con el material | `ok: false`, y los dos errores son del discriminante |
| 5 | el átomo suelto por la puerta de **Web** | **ok: true** — los datos del átomo ya validan hoy |

**Conclusión: si tras el run el material rebota, no será por el envoltorio ni por los datos.**

**Y un fallo propio, declarado:** la primera versión de la prueba 5 pasó un `{type:'columns'}` por
la puerta de Web y dio rojo. **Era la sonda, no el material** — el esquema pide `webBlocks`, y el
contenedor `columns` del importador no acepta la forma del fixture de Core. Nombrado, no reparado,
y **fuera del alcance de este run**.

---

## OTRO FALLO PROPIO DE ESTA SESIÓN, Y VA AQUÍ POR LA MISMA RAZÓN

Al verificar el cierre, la cabina corrió `tools/project-console/validate-project-console-state.mjs`
sobre `cantu-studio` y obtuvo **veinticinco líneas de rojo**, incluida una que decía que falta
`.aiw/roadmap/roadmap.json` —**el fichero que acababa de escribir**—. **Herramienta equivocada:**
ese validador reconcilia otro árbol. El validador que gobierna es `checkInvariants` del motor de
`aiw-console`, que es el que corre `serve.mjs` tras cada `apply`.

Y **la segunda pasada también fue falsa, en el otro sentido**: la primera sonda de `checkInvariants`
compuso `externalRunIds` mal —resolvió los `root` del registro contra la raíz del workspace en vez
de contra `project-console/`— y recogió **cero** externos, lo que produjo **un rojo por dependencia
huérfana que no existe**. Con los `root` resueltos bien: **155 externos, cero errores**.

> **Las dos caras del mismo defecto en una sola sesión: una sonda equivocada produce un verde, y
> también produce un rojo. Ninguno de los dos se cuestiona solo.**

---

## ESTADO AL ABRIR EL RUN

    canónico   .aiw/roadmap/roadmap.json
    md5        041b43af  ->  87a6a2e2
    motor      projects/aiw-console/tools/roadmap/roadmap-core.mjs (2479 líneas, conoce `lane`)
    cambios    SOLO dos, y los dos esperados:
                 #131.full_description  2230 -> 5556 caracteres
                 #131.status            planned -> active
    censo      153 runs · 131 completed · 1 active · 21 planned · densidad 1..153 · cero huecos
    validador  checkInvariants EXIT 0 · 0 errores · 155 run_ids externos
    cola       history=131 · now=1 · ready_next=7 · later=14
