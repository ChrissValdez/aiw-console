# VEREDICTO — `#131` ronda 1: el separador de términos y la paleta de colores

> Veredicto del operador **Christopher Valdez Cantu**, 2026-08-21, sobre la QA de `#131`
> «Anatomía de fórmula». Guardado **VERBATIM** antes de que la cabina actúe sobre él.

---

## SUS PALABRAS, SIN TOCAR

> mira como en la version web cuando agrego un termino tengo la lista de esos terminos
> separadores y esos no se imprimen dentro del recuadro poruqe son separadores de terminos
> el de slide no tiene eso
>
> la paleta de colores es una lista que no se de donde saco, y deberia tomar la paleta global
> de colores (igual que web toma la paleta global) + el color personalizado (el color picker)
> que no agarre un color extra raro como (color automatico) que me ha pasado que lo agrega
> cuadno agrego este arreglo del colo

Aportó **dos capturas**: el formulario de Web con el desplegable de signo entre `TERMINO 1` y
`TERMINO 2` desplegado —`+ − = > < ∙ x`— y la tarjeta «MONOMIO» renderizada, con el `+` pintado
**fuera** de la pastilla.

**Es un VETO sobre el paso 11** de la QA y un **defecto nombrado sobre el paso 13**. No dio
veredicto sobre los otros trece pasos.

---

## LO QUE LA CABINA MIDIÓ DESPUÉS, Y CAMBIA LA RESPUESTA A CADA UNA

### A · EL SEPARADOR — es SOLO FORMULARIO, y el precedente ya está ejecutado

| medición | resultado |
|---|---|
| representación del separador | **un elemento más del array plano `terms`**, en los DOS carriles |
| el validador de `terms` | **el mismo objeto compartido por referencia** (`draftSchema.js:3089`), no una copia |
| cómo lo distingue el motor | lista cerrada + igualdad exacta sobre `.trim()` — `renderConceptCard.js:181` |
| el compilador | copia cadenas verbatim, `compiler.js:2931-2934`; no inspecciona signos |
| el precedente de Web | ronda 3, `conceptGridSmartFormulaPilot.js:72-74`: **«Cero esquema, cero compilador, cero motor, cero migracion»** |
| las funciones de agrupar/aplanar | `groupConceptGridTerms` / `flattenConceptGridTermGroups`, **puras y ya exportadas** |

**Veredicto de la cabina: añadir el desplegable a Slide NO toca esquema ni motor.**

**Y LA MEDICIÓN DESMINTIÓ UN DETALLE DE SU FRASE, que además es la trampa:** los signos de Web no
son `+ − = > < · ×`. Son `+ - = > < ∙ x` — guion ASCII, `∙` **U+2219**, y `x` **letra equis**. El
motor de diapositiva dibuja **cinco**: `+ - = x ·`, con `·` **U+00B7**. Se ven casi iguales y son
caracteres distintos.

> **Intersección real: CUATRO.** `>`, `<` y `∙` de Web caen como **pastilla** en diapositiva.
> Un autor que copie de Web verá su signo dentro del recuadro, que es exactamente lo que él
> señala que no debe pasar.

El taller lo había medido y lo dejó **nombrado, no reparado** — `SlideConceptGridFields.jsx:46-51`.

### B · LA PALETA — NO es solo formulario, y el motor NO lo impide

| medición | resultado |
|---|---|
| de dónde salen los seis | `VARIANT_OPTIONS` (nueve del editor) **filtrada** por las claves del mapa privado del motor |
| qué hace el motor con el color | consume **dos hexes** —`.color` y `.tint`— en **cuatro** sitios; **no ramifica por `variant`** |
| de dónde sale el `tint` | seis tonos **escritos a mano**, no derivados (comprobado: no es `mixWithWhite` al 0.92) |
| ¿existe función que derive el tinte? | **sí**: `deriveColorRolesFromAccent` (`colorSystem.js:475-488`), cuyo rol `surface` ES el tinte |
| ¿hay precedente de emitir DOS roles? | **sí**: `callout` ya lo hace, `compiler.js:2686-2688` |
| los hermanos con paleta | `split`, `callout`, `rule`, `card`, `iconList` — **los cinco** la tienen; `conceptGrid` es **el único que no** |

**Veredicto de la cabina: requiere las TRES capas** —motor, esquema y compilador—, exactamente
como las tuvo `split`. La razón escrita para no haberlo hecho es **una frontera de alcance de run,
no una imposibilidad**, y está declarada verbatim en `draftSchema.js:3067-3071`.

### C · EL VETO DE «AUTOMÁTICO» — medido, y la respuesta es tranquilizadora

`emptyStateLabel` es **opt-in y por defecto apagado** (`VariantSelect.jsx:139`).

- `split`, `rule` y `card` **NO pasan la prop** → sus desplegables muestran `[paleta activa] +
  «Personalizado»` y **ninguna opción «Automático»**.
- `conceptGrid` de **Web** tampoco la pasa en su control de `variant`.
- El único hermano de Slide que la lleva es `callout`.

> **Copiar el montaje de `split` garantiza que «Automático» no aparezca.** Y se puede poner
> guarda que lo afirme, en vez de confiar en que nadie pase la prop.

Su queja previa —la del tamaño— la mató `RUN-CANTU-SLIDE-SIZE-SELECT-DROP-AUTOMATIC-DEFAULT-001`
el 2026-08-18, y su frase de entonces está citada en `SlideSizeSelect.jsx:31-33`.

---

## LO QUE LA MEDICIÓN ENCONTRÓ Y ÉL NO PIDIÓ — nombrado, no reparado

Comparando los dos formularios control por control, Web tiene **cinco** cosas que Slide no:

1. El desplegable de signo — **la que él señaló**.
2. El inserter «Editar fórmula» / «Insertar fórmula» por término.
3. El `<details>` «LaTeX textual avanzado» por término.
4. El campo «Color texto de etiqueta» (`badgeTextVariant`) — el motor de Slide clava blanco.
5. El `InlineFormulaField` alrededor de «Contenido».

**Y UN DEFECTO QUE NO ES DIVERGENCIA, ES FALLO:** el botón «+ Agregar termino» de Slide
**no comprueba el tope** `MAX_CONCEPT_GRID_TERMS` (5). Web sí lo hace
(`WebBlockEditor.jsx:3455`). En Slide el autor puede añadir un sexto término y **el esquema lo
rebota después**: el formulario le deja hacer algo que la puerta le va a negar.

---

## EL PATRÓN, PORQUE ES LA TERCERA VEZ

`conceptGrid` es el único de seis componentes de celda sin paleta global. **No es una decisión de
diseño: es un residuo de frontera de run.** El taller cerró un enum de seis cuando el patrón
resuelto ya existía en cinco hermanos, y su razón —la frontera— era correcta.

> Es el patrón ya nombrado cuatro veces en este proyecto: **capacidad en el motor, cerrada en el
> esquema.** Aquí con una vuelta de tuerca: la capacidad no está en el motor todavía, pero está
> en los cinco hermanos, y la función que la produce está escrita y probada.
