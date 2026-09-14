# DECISIÓN DEL OPERADOR — la lista plana entra en diapositiva

**Fecha: 2026-09-14** · **Origen:** una pregunta del hilo de LECCIONES, traída por el operador
**Estado: RUN PENDIENTE DE INSERTAR.** El shell de la cabina no llega al disco (avería del
montaje, 2026-09-08); **no se pudo escribir el canónico**. El texto del run queda redactado abajo
para que la inserción sea una sola escritura cuando vuelva el montaje.

---

## Lo que dijo, VERBATIM

```
algo que noto cantu lesson es que no creamos el compoentne en slide de lista
(no la lista con etiquetas) la lista normal que tiene web pero en slide
es correcto o me confundi si es correcto deberiamos abrir un run para eso

  -> «Run que admite `list` en Slide (recomendada)»
```

**No se confundió.** Y el hallazgo lo trajo el hilo de LECCIONES mirando el sistema desde fuera —
como los cinco defectos de la cadena de las fórmulas, que también salieron de usar el producto y
no de una medición de la cabina.

---

## Lo medido, cuatro superficies

| superficie | qué dice |
|---|---|
| `SlideItemSchema` | **11 miembros**, `list` no está — `editor-ui/src/schemas/draftSchema.js:3015-3027` |
| `SLIDE_ITEM_TYPE_OPTIONS` | **11 entradas**, `list` no está — `editorOptions.js:291-308` |
| `SLIDE_GRID_COMPONENT_FITNESS` | 12 entradas: los 11 + `header: 'not_admitted_operator_verdict'`. **`list` sin entrada** |
| el plan por componente | **R1–R15**, ninguna es `list` — `docs/project-console/SLIDE-PER-COMPONENT-RUN-PLAN-ENTRIES.md` |

**Y «Lista con etiquetas» no lo sustituye:** `IconListItemSchema` exige **`badge` y `title`, los dos
con `min(1)`** (`draftSchema.js:610-615`). La `list` de Web son **cadenas sueltas**
(`:1321-1327`). Una no hace el trabajo de la otra.

---

## ⚠ UN ERROR QUE LA CABINA ESTUVO A UN GREP DE PUBLICAR

Iba a concluir que `list` es **un hueco que nadie nombró** — y el argumento era bueno: no está ni
en el mapa de aptitud, que es justo el mecanismo que existe para registrar «este no entra», donde
`header` sí figura con su veredicto.

**Barrió los docs antes de publicarlo y está escrito.**
`docs/reference/REFERENCE-SLIDE-WEB-COMPONENT-MAPPING.md:347`, en una tabla cuya cabecera declara
que *«"No aplica" sin razón escrita no es un veredicto aquí»*:

> **«Lista» — `list` · No destination** · *Slide has no plain-string list. Slide `iconList`
> requires structured items and is already the counterpart of Web `iconList` — that pairing is
> taken. **Plain bullets on Slide today are only reachable via the raw `html` cell.***

**Es la tercera vez en esta semana que el instinto de «nadie lo escribió» habría sido falso.** Y
las tres veces lo que lo evitó fue barrer antes de publicar, no acordarse de la regla.

---

## Por qué se abre el run pese al veredicto escrito

**El veredicto contesta una pregunta distinta de la del operador.**

- Lo que contesta: *«¿a qué componente de Slide CORRESPONDE `list`?»* → a ninguno, porque el
  emparejamiento con `iconList` ya está tomado. **Correcto, y sigue siéndolo.**
- Lo que NO contesta: *«¿puede un autor escribir viñetas planas en una diapositiva?»* → hoy
  **solo bajando a HTML crudo**, según su propia última frase.

**Es la misma forma que el hallazgo de `\lt` / `\gt`:** no hay manera de escribir una cosa básica
en ningún sitio del sistema, y nadie lo sabía porque nadie lo había intentado. Allí también el
defecto lo encontró el operador usando el producto.

**Un veredicto de mapeo no es un veredicto de autoría.** Que `list` no tenga homólogo no decide si
el autor necesita viñetas.

### Las tres alternativas, y por qué se descartan

- **Relajar `iconList` para que `badge` sea opcional.** Más barato, sin tipo nuevo. Pero hace que
  un componente haga dos trabajos, y **la etiqueta «Lista con etiquetas» pasaría a mentir** cuando
  no las lleva. Es el patrón de «una pieza que hace dos cosas» que esta sesión lleva deshaciendo.
- **Cerrarlo: el HTML crudo es la respuesta.** Cuesta una línea. Pero deja al autor de lecciones
  escribiendo HTML para poner tres viñetas, en un sistema cuyo propósito es que no tenga que
  hacerlo.
- **Medir primero.** Habría sido lo correcto **si faltara medición**. No falta: cuatro superficies
  y el veredicto escrito, todo leído hoy.

---

## EL TEXTO DEL RUN, redactado y pendiente de insertar

**`run_id`:** `RUN-CANTU-SLIDE-LIST-ADMIT-AND-IMPLEMENT-001`
*(La familia exacta de las cinco admisiones anteriores: `…-CALLOUT-ADMIT-AND-IMPLEMENT-001`,
`…-RULE-…`, `…-SPLIT-…`, `…-CONCEPTGRID-…`, `…-TABLE-…`.)*

**`title`:** `Admit the plain list as a slide item`

**`summary`:** Admit Web's plain-string list as a slide grid item so an author can write plain
bullets on a slide without dropping to the raw html cell, and amend the mapping reference that
verdicts it «no destination» with the reason it changed.

**`full_description`:**

> Web's `list` — plain bullets, items as bare strings — has no counterpart on Slide. Measured on
> 2026-09-14 across four surfaces: it is absent from `SlideItemSchema` (11 members), from
> `SLIDE_ITEM_TYPE_OPTIONS` (11 entries), from the per-component run plan (R1–R15), and it has no
> entry at all in `SLIDE_GRID_COMPONENT_FITNESS` — not even the `not_admitted_*` that `header`
> carries. Slide `iconList` does not substitute for it: `IconListItemSchema` requires both `badge`
> and `title` with `min(1)`, so a plain bullet cannot be written through it.
>
> THIS RUN CONTRADICTS A WRITTEN VERDICT ON PURPOSE, AND MUST AMEND IT.
> `docs/reference/REFERENCE-SLIDE-WEB-COMPONENT-MAPPING.md:347` classifies «Lista» — `list` as
> **No destination**, and that classification is correct for the question it answers: `list` has
> no same-name Slide counterpart, because the `iconList` pairing is taken. It does not answer the
> author's question, and its own last clause is what opens this Run: *«Plain bullets on Slide
> today are only reachable via the raw `html` cell.»* The operator decided on 2026-09-14 that an
> author should not have to write HTML to put three bullets on a slide. **Amending that entry —
> with the reason, the date and this Run's id — is part of this Run's deliverable. Contradicting a
> written verdict in silence is what makes the next session stop trusting the document.**
>
> THE SHAPE IS THE ONE THE FIVE PREVIOUS ADMISSIONS ALREADY USE — callout, rule, split,
> conceptGrid, table. Derive it from them rather than from this text: read what
> `RUN-CANTU-SLIDE-TABLE-ADMIT-AND-IMPLEMENT-001` touched and follow that shape. The three
> surfaces that must agree are named in the comments of `editorOptions.js`: the selector
> (`SLIDE_ITEM_TYPE_OPTIONS`), the fitness map (`SLIDE_GRID_COMPONENT_FITNESS`), and the import
> gate (`containedSlideComponentTypes`) — and `slideIconListJsonImportGate.test.mjs` requires them
> to agree type by type. Both schema twins move together, and the census comment that counts the
> union must be updated so the change is visible and has to be declared.
>
> WHAT THIS RUN MUST MEASURE BEFORE DECIDING ANYTHING. Does the slide engine already render a
> plain list, or does admitting the type require an engine change? The engine is read-only: if it
> cannot be admitted safely without touching it, **stop and report** the measured defect instead.
> What minimum footprint does a plain list need in the grid — the footprint duty applies to every
> admitting run, and the numbers come from measuring this component, not from copying another's.
> And which of Web's fields cross: `variant` (palette token or hex), `textSize`, `title`, and the
> `MAX_LIST_ITEMS` cap. A field that crosses without being measured is a field that lies.
>
> THE AUTHOR-FACING LABEL IS THE OPERATOR'S. Web calls it «Lista». Do not propose, abbreviate or
> invent one; if the name needs deciding, stop and ask. And it goes at the END of the selector
> list, like the five before it: adding at the end does not move the order the author already
> knows.
>
> This Run changes no other component, makes no production-readiness claim, and does not certify
> anything.

**Posición propuesta:** delante de los dos renombrados de clases, es decir **inserción en 193**,
desplazando `jame-` a 194 y `j-` a 195. La razón: los renombrados son SILENT y **necesitan que el
operador rebase su QA visual**, mientras que esto no; y el hilo de LECCIONES está vivo ahora
mismo. **La tabla de desplazamientos se sacará del `remap` del dry-run, no de este párrafo.**

**Modelo y esfuerzo cuando se emita:** Opus · Alto · sesión nueva.

---

## Lo que queda del operador

**Nada, salvo esperar al montaje.** Cuando el shell vuelva, la cabina inserta el run con su
ritual completo —respaldo, dry-run con el remap publicado, verificación campo a campo— y emite el
ticket en el mismo turno.
