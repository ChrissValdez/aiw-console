# Revalidación del componente «Recurso visual» (`visual`) — Cantu Studio

| Campo | Valor |
|---|---|
| Run | `RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001` |
| `queue_order` | **38** — derivado del canónico `.aiw/roadmap/roadmap.json`, no del ticket |
| Título canónico | `Audit and implement the Visual component` |
| Status al abrir | `active` |
| Fecha | 2026-08-08 |
| Packet | `docs/_historical_run_record/RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001-OPERATOR-QA-PACKET.md` — **ronda 2: 21 checks**, 5 de parada |
| Código modificado | **Ronda 1: ninguno. Ronda 2: seis archivos de código y dos de prueba** (§12) |
| Suite | Ronda 1: 436/436. **Ronda 2: 437/437** |

> **Este record tiene dos rondas y las dos siguen vigentes.** Las secciones 1 a 11 son la
> auditoría de la ronda 1 y **se conservan enteras**: son la medida del estado *antes* de
> reparar. La **sección 12** registra las dos reparaciones que el operador autorizó tras su QA
> humana, y **anota junto a cada hallazgo de la ronda 1 si sigue abierto o quedó cerrado.**

## Guarda de coordenadas

El ticket avisaba de un adelanto de cola reciente (`#43` → `#38`) y pedía derivar del canónico.
Hecho: `.objectives[2].phases[2].runs[9]` da `queue_order` 38, `run_id`
`RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001`, `title` `Audit and implement the Visual component`,
`status` `active`. **Coincide en los tres campos.** No se tecleó el `run_id`.

---

## 1. Inventario medido

Todo contado en disco hoy. Nada heredado del ticket.

| Pieza | Ruta | Medida |
|---|---|---|
| Renderer Web | `src/builders/web/partials/renderVisual.js` | **77 líneas** |
| Esquema (compiler-api) | `tools/author-lite/compiler-api/schemas/draftSchema.js` | `visualShape` `:301-313`; `WebVisualSchema` `:788-791` con `.strict()` en `:791`; `SlideVisualItemSchema` `:1080-1083` |
| Esquema (editor-ui) | `tools/author-lite/editor-ui/src/schemas/draftSchema.js` | `visualShape` `:298-310`; `WebVisualSchema` `:760-763` con `.strict()`; `SlideVisualItemSchema` `:1052-1055` |
| Editor | `.../components/common/VisualFields.jsx` | **63 líneas**, montado en `WebBlockEditor.jsx:4271-4273` y `SlideItemEditor.jsx:56` |
| Compilador | `tools/author-lite/compiler-api/services/compiler.js` | `normalizeVisualSvg` `:308-314`; `buildVisualOutput` `:331-338`; ruta Web `:1303-1304`; ruta Slide `:1366-1367` |
| Catálogo | `.../constants/blockCatalog.js` | `:66-71` |
| Fábrica | `.../utils/blockFactory.js` | `:81-89` (Web), `:360-368` (Slide) |
| Prueba propia | `tools/author-lite/compiler-api/tests/webVisualSvgSafety.test.mjs` | 7 pruebas |

**Cinco campos, confirmados:** `title`, `width`, `background`, `caption`, `svg`. `.strict()` en
ambos esquemas. **Los dos `visualShape` son byte-idénticos** (comparados programáticamente).

**`rail: true` — confirmado**, `blockCatalog.js:69`. El ticket pedía confirmarlo por contraste
con los tres últimos auditados; es correcto.

**Colocación:** solo de nivel superior. `visual` **no** está en `WebColumnsChildSchema`
(`draftSchema.js:955-965`), y el rechazo está fijado por prueba (`webVisualSvgSafety.test.mjs:152-167`).

---

## 2. Contrato de color — medido, no reparado

`renderVisual.js:14` valida `background` contra `/^#[0-9A-Fa-f]{6}$/` y cae a `#FFFFFF`.
**Verificado en la línea indicada por el ticket.**

**`background` es un hex suelto: no participa del sistema de paleta del autor.** El editor lo
pinta con un `<input type="color">` crudo (`VisualFields.jsx:32-36`), y `VisualFields` **no
recibe la prop `palette`** que sí reciben los demás bloques con color. El compilador lo pasa
tal cual (`compiler.js:335`), sin derivar rol alguno.

El resto del color del componente está **fijo en el motor**: `#2E3440` (título, `:36`),
`#E5E9F0` (línea inferior del título, `:37`), `#4C566A` (descripción, `:58`). Solo el borde de
la caja usa una variable, con repliegue: `var(--n-border, #D8DEE9)` (`:47`).

**¿Debería consumir los roles derivados?** Medido contra el resto del conjunto:

| Rol | Renderers que lo leen hoy | `visual` |
|---|---|---|
| Color derivado del autor (`data.color`) | **9** — `renderCallout`, `renderCard`, `renderConceptGrid`, `renderDetails`, `renderHeader`, `renderIconList`, `renderList`, `renderRule`, `renderTable` | no |
| `accentTextColor` | **6** — `renderArithmetic`, `renderBadge`, `renderCard`, `renderConceptGrid`, `renderIconList`, `renderRule` | no |

**No reparado, por instrucción y por alcance.** Cualquier reconciliación aquí cruza el sistema
de color compartido, que este run tiene fuera de alcance. Se enruta como decisión del operador
en los checks 10 y 11 del packet.

---

## 3. Contrato de math — no aplica, declarado

`visual` no tiene campo de fórmula. **Ninguno de sus cinco campos es de prosa con insertor.**

Los cinco campos de prosa con insertor están fijados por prueba en
`webInlineFormulaInserterMount.test.mjs:95-145` (`PROSE_FIELDS`) y son:
`details.items[].content`, `callout.content`, `card(normal).content`,
`conceptGrid.items[].content`, `rule.description`. **Ninguno pertenece a `visual`.**

`title` y `caption` son texto plano que el compilador escapa con `escapeHtml`
(`compiler.js:333`, `:336`). **El contrato de math no aplica a este componente.**

---

## 4. HALLAZGO DE SEGURIDAD — las dos guardas de SVG divergen en las dos direcciones

Este es el criterio en que el ticket ordenaba parar y reportar con la lista exacta. Aquí está.

**Las dos guardas:**

| Guarda | Dónde | Técnica |
|---|---|---|
| `isSafeSvg` | `safeSvg.js` (esquema, ambos lados) | Parser con **lista blanca**: reconstruye el documento etiqueta a etiqueta y atributo a atributo, con regex de valor por atributo |
| `isSafeCompiledSvg` | `renderVisual.js:3-11` | **Nueve líneas de lista negra** por expresión regular |

**Los siete casos exigidos por el ticket los rechazan LAS DOS.** `<script>`, atributos `on*`,
`javascript:`, `data:text/html`, URLs externas y `<foreignObject>` caen en ambas; un SVG legítimo
pasa en ambas. **Hasta ahí, coinciden.** La divergencia empieza justo después.

### 4A — El motor acepta lo que el esquema rechaza (21 entradas medidas)

Lista exacta. Todas: `isSafeSvg` = RECHAZA, `isSafeCompiledSvg` = ACEPTA.

*Etiquetas fuera de la lista negra de nueve líneas:*
`<use>` · `<animate>` (SMIL) · `<set>` (SMIL) · `<defs>`+`<pattern>` · `<a>` · `<tspan>`

*Atributos:*
`class="…"` · `style="fill:red"` (atributo; la **etiqueta** `<style>` sí está en la lista negra) ·
valores sin comillas (`cx=1`) · `xlink:href`

*Estructura:*
comentarios `<!-- -->` · `<![CDATA[…]]>` · dos raíces `<svg>` · etiquetas sin cerrar

*Y estas siete, que son vías de ejecución activa, no solo laxitud:*

| Entrada | Por qué pasa la lista negra |
|---|---|
| `<a href="&#106;avascript:alert(1)">` | La regex busca `javascript:` literal. El navegador **decodifica la entidad antes de resolver la URL**. |
| `<a href="&#74;avascript:alert(1)">` | Igual, con entidad en mayúscula. |
| `<a href="java⇥script:alert(1)">` (tabulador literal) | Los navegadores **eliminan TAB/LF/CR del esquema de URL** antes de resolverlo. |
| `<animate attributeName="href" to="&#106;avascript:…">` dentro de `<a>` | SMIL reescribe el `href` en tiempo de ejecución; la regex nunca ve el valor final. |
| `<set attributeName="onload" to="alert(1)">` | SMIL **instala un manejador de evento**; la regex `\son[a-zA-Z]+\s*=` no lo ve porque el nombre viaja como *valor*. |
| `<circle onclick />` | Atributo `on*` **sin `=`**. La regex exige el `=`. |
| `…</svg><form><button formaction><input></form><svg></svg>` | La regex ancla `^<svg…</svg>$` y es **codiciosa**: cualquier HTML no listado en la lista negra entre dos raíces `<svg>` se emite tal cual. Verificado: el `<form>`, el `<button>` y el `<input>` salen íntegros en el HTML. |

**Alcance real de 4A:** esta guarda solo actúa sola cuando **se llama a `renderVisual` por fuera
de Author Lite** — el sandbox de Core, o cualquier consumidor futuro del motor. En la vía normal
de Author Lite el compilador normaliza antes (`compiler.js:308-314`), y ahí manda la lista blanca.
**Es una debilidad de la defensa en profundidad, no un agujero en la vía de autoría.** Dicho sin
rebajarlo: la prueba `webVisualSvgSafety.test.mjs` afirma que «Core renderVisual neutraliza SVG
inseguro si se le llama fuera del compilador de Author Lite», y **eso es cierto solo para los
casos que la prueba enumera**, no en general.

### 4B — El esquema acepta lo que el motor rechaza (4 entradas) — y esto sí rompe hoy

| Entrada `<text>…</text>` | `isSafeSvg` | `isSafeCompiledSvg` sobre el **compilado** |
|---|---|---|
| `Fuente: http://ejemplo.mx` | ACEPTA | **RECHAZA** |
| `a//b` (doble barra) | ACEPTA | **RECHAZA** |
| `usa url(x) aqui` | ACEPTA | **RECHAZA** |
| `via ftp: legado` | ACEPTA | **RECHAZA** |

Causa: `renderVisual.js:9` escanea `https?:|ftp:|//|url\s*\(` **sobre todo el documento**,
incluido el **contenido de texto**, del que solo exime el `xmlns` canónico (`:5`). La lista
blanca, en cambio, permite texto libre siempre que no lleve markup ni `javascript:`/`data:text/html`.

**Consecuencia medida, extremo a extremo:** el autor pega un SVG legítimo, el editor lo acepta,
el compilador lo normaliza y lo guarda, y **el motor descarta el SVG entero** (`:17` deja
`safeSvg = ''`). La salida es una caja con título, marco y descripción **y sin dibujo**.
**Sin error en ningún punto de la cadena.** Pérdida de contenido silenciosa.

**Es un defecto real y está en el archivo propio del componente.** **No reparado**: el ticket
marca la guarda de SVG como la pieza más delicada y prohíbe tocarla sin veredicto. Va a los
checks 2 y 3 del packet.

### 4C — Hallazgo adjunto: `title` y `caption` no se escapan en el motor

Medido de paso, misma clase que 4A. `renderVisual.js:22` y `:26` interpolan `data.title` y
`data.caption` **en crudo**. Su hermano `renderVideo.js` **sí escapa** los suyos (`:103`, `:107`,
con `escapeHtml` en `:9`) y tiene prueba explícita de que lo hace. Verificado: `renderVisual`
con `title = '<img src=x onerror=alert(1)>'` emite la etiqueta intacta; `renderVideo` la escapa.

En la vía de Author Lite el compilador ya escapa (`compiler.js:333`, `:336`), así que **la vía
de autoría es segura**; la exposición es de nuevo la llamada directa a Core. **No reparado**, por
ser la misma superficie de defensa en profundidad que 4A y no tener veredicto.

---

## 5. HALLAZGO — el identificador aleatorio rompe la idempotencia

`renderVisual.js:19` genera `j-visual-${Math.random().toString(36).substr(2, 9)}` **en cada
render**, y lo usa **cinco veces** por bloque (el `<style>` y el `id` de la `<section>`).

**Medido, dos compilaciones del mismo borrador sin cambiar nada:**

```
compilación 1 → id  j-visual-bsnzx1vwm
compilación 2 → id  j-visual-lwdmz93hm
HTML byte-idéntico: false
```

El aspecto no cambia; los bytes sí. Rompe cualquier comparación de salida byte a byte, y ensucia
el diff de cualquier build reproducible.

**No cambiado**, por instrucción. **Y el motivo que el ticket dejaba abierto queda resuelto:
no hay CSS externo que dependa de ese identificador.** Se buscó `j-visual` en todo el repo; los
únicos otros usos son clases ajenas de otros componentes —`j-visual-header` en
`renderArithmetic.js:151`, `:193`, `:292`, `:296`; `j-visual-web` en `renderTimeline.js:295`;
`j-visual-slide-wrapper` en el renderer de Slides— **ninguna es este identificador**. El
identificador vive solo dentro del `<style>` que el propio motor emite en la misma salida.

**Nota para quien lo repare**: un id fijo colisionaría entre dos bloques `visual` de la misma
página (id duplicado + reglas CSS cruzadas). La reparación correcta es un id **derivado del
índice del bloque**, no una constante.

---

## 6. Campos sin control en el editor — **ninguno**

Los cinco campos del esquema tienen control:

| Campo | Control | Rótulo | Línea |
|---|---|---|---|
| `title` | `TextInputField` | «Título (opcional)» | `VisualFields.jsx:13-18` |
| `width` | `TextInputField` | «Ancho» | `:21-27` |
| `background` | `<input type="color">` | «Fondo» | `:28-41` |
| `caption` | `TextInputField` | «Descripción (opcional)» | `:44-49` |
| `svg` | `TextAreaField` | «SVG» | `:51-58` |

**No hay hallazgo en este criterio.** A diferencia de los dos componentes anteriores donde sí lo
hubo, aquí **no existe campo alcanzable solo por «Insertar JSON»**.

Observación adjunta, no defecto: `background` usa un selector de color nativo, que **nunca puede
quedar vacío**. `blockFactory.js:85` siembra `#FFFFFF`, así que el estado vacío no se alcanza por
la interfaz. El `blankToUndefined` del esquema sigue siendo alcanzable por «Insertar JSON».

---

## 7. Corpus en disco

- **Borradores guardados escaneados: 10** (todo el árbol `src/content/author_lite`).
- **Bloques `visual` en borradores guardados: 0.** Ninguno, con ningún campo.
- Únicos ejemplares de `visual` en el repo: fixtures de Core, no borradores de Author Lite —
  `src/content/sandbox/test_multimedia.js:55` (Web) y `:101` (Slide), y
  `src/content/staging/Aritmetica/1_propiedades_numeros_slide.js:132` (Slide).
- **¿Alguno usaría un SVG que la guarda del motor rechazaría?** **No.** El SVG de
  `test_multimedia.js` (`DATA_SVG`, `:15-25`) pasa las dos guardas y se pinta.

Consecuencia: **el defecto 4B no tiene víctimas hoy.** Es un defecto latente, no una regresión
en producción. Eso baja su urgencia; no su realidad.

---

## 8. Qué se reparó

**Nada.** Cero líneas de código.

Cada hallazgo cae en una de estas dos casillas:

| Hallazgo | Por qué no se reparó |
|---|---|
| Contrato de color (§2) | Cruza el sistema de color compartido — fuera de alcance explícito |
| Divergencia de guardas 4A y 4B | El ticket ordena parar y reportar; la guarda es la pieza más delicada |
| `title`/`caption` sin escapar 4C | Misma superficie de defensa en profundidad que 4A, sin veredicto |
| Identificador aleatorio (§5) | El ticket ordena declarar, no cambiar |
| Campos del editor (§6) | No hay defecto |

**Coste de las reparaciones, si el operador las autoriza:**

| Reparación | Superficie | Coste |
|---|---|---|
| 4B — dejar de escanear protocolos dentro del contenido de texto | `renderVisual.js` solo | **Bajo.** Un cambio en `:5`/`:9` para escanear etiquetas y atributos, no texto. Requiere pruebas nuevas. |
| 4C — escapar `title`/`caption` | `renderVisual.js` solo | **Bajo**, con el precedente exacto de `renderVideo.js:9`, `:103`, `:107`. Ojo con el doble escapado: el compilador ya escapa. |
| 4A — alinear las dos guardas | `renderVisual.js`, y en la práctica **la guarda compartida** | **Alto.** La forma correcta no es engordar la lista negra sino que el motor use el mismo parser de lista blanca, y eso cruza a `safeSvg.js`, que es pieza compartida. **Otro run.** |
| §5 — id derivado del índice | `renderVisual.js` + su llamador | **Medio.** El motor no recibe hoy el índice del bloque. |
| §2 — roles de color | Sistema de color compartido | **Otro run**, por definición. |

---

## 9. Suite, lint y build

- **436/436.** Línea base **medida a mano antes de empezar**, no heredada del ticket:
  `node --test "tools/author-lite/compiler-api/tests/*.test.mjs"` → `tests 436 / pass 436 / fail 0`.
  El ticket decía 436/436 y **acertó**.
- **Cero pruebas modificadas, cero añadidas, cero en rojo.** No hubo que clasificar ninguna
  como aditiva ni de conducta, porque no se tocó código.
- **Lint limpio** — `npm --prefix tools/author-lite/editor-ui run lint`, sin salida.
- **Build limpio** — `npm --prefix tools/author-lite/editor-ui run build`, `✓ built in 558ms`.
  El aviso de *chunk* > 500 kB es previo y ajeno a este componente.

---

## 10. Filas desfasadas que hubo que sortear

Los dos documentos que el ticket marcaba como desfasados **lo están**. Se midió cada fila citada.
**Ninguno de los dos se corrigió**: hay un run enrutado para eso.

### 10A — `docs/reference/…-DEFINITION-OF-DONE.md:328` — **falsa, confirmada**

Dice: «`header` and `list` are the only reconciled renderers (`renderHeader.js`, `renderList.js`
prefer `data.color`); every other renderer resolves variants against the hardcoded maps».

| | Documento | Medido hoy |
|---|---|---|
| Renderers que leen el color derivado del autor | 2 | **9** |
| Renderers que leen `accentTextColor` | no lo menciona | **6** |

Los nueve: `renderCallout`, `renderCard`, `renderConceptGrid`, `renderDetails`, `renderHeader`,
`renderIconList`, `renderList`, `renderRule`, `renderTable`.
Los seis: `renderArithmetic`, `renderBadge`, `renderCard`, `renderConceptGrid`, `renderIconList`,
`renderRule`.

**El ticket dio las dos cifras y las dos son correctas.** La deriva la produjeron los runs de
esta semana, como decía.

Lo que sí sigue vigente de ese documento y **se usó**: la tabla de §6 (`:262-280`), cuya fila
`HUMAN_QA_DEFERRED_OWN_TICKET_REQUIRED` (`:276`) incluye a `visual` y pide **packet completo**.
Es lo que se preparó.

### 10B — `.aiw/state/component_status.json` — **cinco filas desfasadas, no tres**

El ticket nombraba tres. Se cruzó **cada una de las dieciséis filas** contra el status de su run
de revalidación en el canónico.

| Componente | Dice la proyección | Su run en el canónico | |
|---|---|---|---|
| «Nota desplegable» `details` | `HUMAN_QA_FAILED_REPAIR_REQUIRED_WITH_OLDER_NOT_STARTED_CONTEXT` | `RUN-JAME-WEB-DETAILS-REPAIR-001` (32) **completed** | desfasada — *nombrada en el ticket* |
| «Regla matemática» `rule` | `HUMAN_QA_FAILED_REPAIR_REQUIRED_FOR_RULE_COMPONENT_…` | `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` (35) **completed** | desfasada — *nombrada en el ticket* |
| «Factorización» `arithmetic` | `HUMAN_QA_DEFERRED_OWN_TICKET_REQUIRED` | `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` (33) **completed** | desfasada — *nombrada en el ticket* |
| `narrative` | `HUMAN_QA_FAILED_REPAIR_REQUIRED` | `RUN-JAME-WEB-NARRATIVE-REPAIR-001` (24) **completed** | **desfasada — NO nombrada en el ticket** |
| `callout` | `HUMAN_QA_FAILED_REPAIR_REQUIRED` | `RUN-JAME-WEB-CALLOUT-REPAIR-001` (31) **completed** | **desfasada — NO nombrada en el ticket** |

**Precisión sobre las dos nuevas.** Para `details`, `rule` y `arithmetic` el ticket afirma un PASS
explícito del operador y este run lo da por bueno. Para `narrative` y `callout` lo medido es más
débil y se declara como tal: **su run de reparación figura `completed` en el canónico mientras la
proyección sigue diciendo que fallaron la QA humana y requieren reparación.** Los packets de
ambos existen (`docs/_historical_run_record/RUN-JAME-WEB-{NARRATIVE,CALLOUT}-REPAIR-001-OPERATOR-QA-PACKET.md`)
pero **no registran veredicto** — por diseño, los veredictos vuelven al operador. **No se encontró
en el repo un registro independiente del PASS**, así que lo que se afirma aquí es la
contradicción con el canónico, no el veredicto.

Las filas de `iconList`, `card` y `video` (`EXPLICIT_HUMAN_PASS_PRESERVED`) **sí concuerdan**;
aparecieron como falsos positivos de un primer barrido automático y se descartaron a mano.

La fila de `visual` —`HUMAN_QA_DEFERRED_OWN_TICKET_REQUIRED`— **es correcta hoy** y es la que
este run consumió para elegir el tipo de packet.

**Ninguna de las cinco se corrigió.** El documento se declara `projection_only: true` /
`source_of_truth: false`, y hay un run enrutado.

---

## 11. Estado declarado (ronda 1)

Este run **declara** que su cierre depende del veredicto del operador sobre los 16 checks, y
**muy en particular** de los checks 2 y 3, que le enseñan un defecto real que el taller decidió
no reparar por estar dentro de la guarda de SVG.

El taller **no toca** el status del run, `.project/`, git ni el orden de la cola. **Cierra la
cabina.**

Enrutamiento sugerido, para que el operador lo decida:

1. **Un run para 4B y 4C** — las dos reparaciones baratas, ambas confinadas a `renderVisual.js`.
2. **Un run para 4A** — alinear el motor con el parser de lista blanca; cruza `safeSvg.js`,
   pieza compartida, y probablemente afecta a más de un componente.
3. **El sistema de color** (§2) y el **identificador** (§5), según lo que digan los checks 10, 11
   y 12.

---
---

# RONDA 2 — Las dos reparaciones autorizadas

## 12. Veredicto consumido y qué se reparó

**Veredicto de QA humana del operador sobre los cinco de parada de la ronda 1:** fixture C en
**caja vacía**; fixtures D y E **rechazados con mensaje de validación**. Con eso autorizó **dos
reparaciones**, las dos pedidas por él. La auditoría de la ronda 1 **se conserva entera**.

### 12A · El escaneo de protocolos, acotado y no debilitado

**Archivo:** `src/builders/web/partials/renderVisual.js`, solo `isSafeCompiledSvg`.
El renderer pasa de **77 a 84 líneas**; la guarda, de `:3-11` a `:3-17`.

**Qué cambió, exactamente una cosa.** El escaneo de protocolos corría sobre `value` —el documento
completo, contenido de texto incluido—. Ahora corre sobre `markupOnly`: la concatenación de los
tokens `<…>` del documento, con el `xmlns` canónico exento como ya estaba.

**Qué NO cambió, y es lo que impide que esto afloje nada:**

- El ancla `^<svg\b…</svg>$` — intacta, sobre el documento completo.
- La lista negra de etiquetas (`script`, `iframe`, `object`, `embed`, `foreignObject`, `html`,
  `body`, `head`, `div`, `span`, `img`, `image`, `video`, `audio`, `canvas`, `link`, `meta`,
  `style`) — **intacta, sobre el documento completo**.
- La regex de manejadores `\son[a-zA-Z]+\s*=` — **intacta, sobre el documento completo**.
- La lista de protocolos en sí — **idéntica**. Solo cambió *dónde* se aplica.

**Por qué el texto puede dejar de escanearse:** un protocolo en contenido de texto es prosa
inerte. La única forma de ejecutarlo sería `<script>`, que ya está prohibido como etiqueta.

### 12B · `visual` como hijo de «Dos columnas» — las cuatro capas medidas

| Capa | Archivo | Cambio | Notas de la medida |
|---|---|---|---|
| Esquema | `compiler-api/schemas/draftSchema.js:964` | `WebVisualSchema.strict()` en la unión | La unión estaba en `:955-965`, **no en `:927-937`** como decía el ticket; esa es la línea del **otro** `draftSchema.js`. Medido antes de escribir. |
| Esquema | `editor-ui/src/schemas/draftSchema.js:936` | idem | Aquí sí, `:927-937`. |
| Editor — menú | `WebBlockEditor.jsx:273` | `{ kind: 'visual', label: 'Recurso visual' }` | Rótulo exacto de `blockCatalog.js:67`. Noveno del menú. |
| Editor — campos | `WebBlockEditor.jsx:2103-2111` | rama que reutiliza `VisualFields` | **Respuesta a la pregunta del ticket: reutiliza, no necesita rama propia.** Hay precedente exacto: `iconList` reutiliza `IconListFields` (`:1973`) y `table` reutiliza `TableRowsFields` (`:2093`). Los cinco campos son los mismos dentro y fuera de columna. |
| Compilador | `compiler.js:1303` | **ninguno** | `case 'visual'` llama a `buildVisualOutput(block)` **sin usar `context`**, así que `isColumnsChild: true` es un no-op para él. **Verificado, no asumido.** |
| Renderer | `renderColumns.js:23`, `:82-83` | `require` + `case 'visual'` | El `switch` pasa de **trece a catorce** tipos. |

**Una capa que el ticket no listaba y sin la cual B no funciona.** El menú llama a
`appendChild(kind)` → `createDefaultWebColumnChild(kind)` (`blockFactory.js:271`), que devuelve
`null` para tipos desconocidos. **Sin un `case 'visual'` ahí, el botón nuevo no hace nada.**
Se añadió (`blockFactory.js:338-347`). **Es un desbordamiento de alcance y se declara como tal**:
`blockFactory.js` no figura en el Scope del ticket. El cambio es aditivo, confinado a `visual`, y
es la fábrica que el propio menú de hijos invoca.

**Criterio 8 — nada más ganó acceso.** La unión tenía nueve miembros y ahora tiene diez. **No
hubo que mover ni reordenar ningún miembro existente.** `split` sigue en la unión y sigue fuera
del menú, exactamente como estaba.

**El ancho por defecto NO se reinterpretó.** El hijo se siembra con `width: '80%'`, el mismo que
el bloque de nivel superior, **a propósito**, para que el operador vea el caso real (§12E).

## 12C · Verificación de la reparación A — batería completa, por el camino real

Medido con `normalizeSafeSvg` **y después** el renderer, no llamando al renderer a pelo.

| Grupo | Antes | Después |
|---|---|---|
| **Los 7 casos de ataque exigidos** (`<script>`, `on*`, `javascript:`, `data:text/html`, URL externa, `<foreignObject>`, + SVG legítimo de control) | 6 rechazados + control aceptado | **idéntico: 6 rechazados + control aceptado** |
| **Los casos del defecto** (`http://`, `//`, `url(`, `ftp:` en `<text>`) | 4 descartados en silencio | **4 se pintan** |
| **Divergencia A** (motor acepta / esquema rechaza) | **21** | **21 — sin cambio, ni una más** |
| **Divergencia B/C** (esquema acepta / motor descarta) | **4** | **0** |

**Comprobación antirregresión adicional, 11 vectores de protocolo en valor de atributo:**
`javascript:`, `vbscript:`, `data:text/html`, `https:`, `//` protocol-relative, `url(`, `file:`,
`blob:`, `ftp:`, `aria-label` con URL, y un valor que esconde un `>` para partir el token.
**Los once siguen rechazados.** El acotado no abrió ninguna vía por atributo.

## 12D · El `default` de `renderColumns` — medido, declarado, NO reparado

`renderColumns.js:83` hace `return item.content || JSON.stringify(item)`.

**Verificado en banco** con un hijo de tipo desconocido: la página del alumno recibe
`{"type":"conceptGrid","title":"Desconocido","items":[{"term":"x"}],"textScale":1}` como texto
visible. **Es peor que desaparecer**: filtra la forma interna del bloque al lector.

**No reparado**, por instrucción explícita. **Enrutado.** Coste estimado **bajo**: devolver
cadena vacía, o un marcador de error acotado como el que ya usa `renderColumns` cuando faltan
datos (`:88`). Riesgo de la reparación: si algún consumidor depende hoy de la rama
`item.content`, cambiarla a vacío lo rompería — hay que medirlo en su propio run.

## 12E · Criterio 7 — el ancho dentro de columna, medido y NO decidido

Medido con un `visual` de `width: '80%'` dentro de una columna:

- El motor emite `max-width: 80%` sobre el contenedor del dibujo. Dentro de una columna eso es
  **80% del ancho de la columna, no de la página**: el porcentaje se anida.
- El bloque además arrastra su espaciado de nivel superior: `margin-bottom: 40px` en la sección
  (`renderVisual.js:39`) y `margin-top: 40px` en el título (`:46`), **sumados** al
  `gap: calc(1rem * var(--local-scale))` que la pila de columna ya aplica (`renderColumns.js:46`).

**No se decidió nada.** Es decisión visual del operador y va al **check 20** del packet, con las
dos salidas posibles apuntadas —cambiar el defecto del hijo, o reinterpretar el ancho dentro de
columna— porque **son runs distintos con coste distinto**.

## 12F · Pruebas: dos tocadas, ninguna aflojada

**436/436 antes. Una sola se puso roja.** Clasificación antes de tocarla, como pedía el criterio 9:

**1. `webVisualSvgSafety.test.mjs` — «visual remains rejected inside columns contract».**
**Es de conducta**, y hay que decirlo claro. Fijaba exactamente el contrato que el operador
revirtió; el propio ticket lo anticipa («el check 13 lo daba por conducta contratada; su veredicto
la cambia»). **No es daño colateral: es la conducta autorizada.** No se pudo hacer B sin tocarla.
Reescrita en dos pruebas que fijan la conducta **nueva** y no aflojan:
- `visual is accepted as a columns child and compiles inside the slot` — además de aceptar,
  **comprueba que el hijo sobrevive la compilación**, que su `svg` es el normalizado, que
  conserva `width`, y que no se filtra ningún `"kind":` a la salida.
- `an unsafe visual child is still rejected inside columns` — **nueva, no existía**: recorre los
  **15 payloads inseguros** ya definidos en el archivo y exige que los 15 sigan rechazados
  **dentro de columna**, más un campo de expansión (`rawHtml`). **Cierra el lado peligroso, que
  la prueba original no cubría.**

**2. `webColumnsChildExpansionSafety.test.mjs` — «columns reject unsupported child kinds».**
**Es de forma, y se quedó verde por el motivo equivocado**: su payload era
`{kind:'visual', title, content}`, que sigue fallando por no traer `svg` y por `content` bajo
`.strict()`. Pero seguía listando `visual` como «top-level-only-by-design», que ya es falso.
Actualizada sin aflojar: `visual` sale de la lista y **entra una comprobación explícita de que un
`visual` malformado sigue sin pasar**, en esquema y en importación.

**Resultado: 437/437.** El neto +1 es la prueba partida en dos. **Cero pruebas eliminadas, cero
aflojadas.** Lint limpio. Build limpio.

## 12G · Corpus, re-medido contra el código nuevo

**Sigue en cero:** 10 borradores escaneados, **0 bloques `visual`**. **Ninguna lección existente
cambia de aspecto** por estas dos reparaciones. La fixture del sandbox de Core
(`test_multimedia.js:15-25`) pasa las dos guardas antes y después, sin diferencia.

## 12H · Qué sigue abierto de la ronda 1

| Hallazgo ronda 1 | Estado tras la ronda 2 |
|---|---|
| §4B — el motor descarta SVG legítimo con URL en el texto | **CERRADO** por 12A |
| §4A — 21 divergencias de la vía Core-directa | **ABIERTO.** Sin tocar, sigue en 21. Enrutado: el motor debería usar el parser de lista blanca, y eso cruza `safeSvg.js`. **Coste alto.** |
| §4C — `title`/`caption` sin escapar en el motor | **ABIERTO.** No entraba en este ticket. Coste **bajo**, precedente exacto en `renderVideo.js:9`, `:103`, `:107`. |
| §5 — identificador aleatorio | **ABIERTO.** Sin tocar. |
| §2 — `background` como hex suelto y colores fijos | **ABIERTO.** Espera veredicto estético (checks 10, 11, 16). |
| §6 — campos sin control en el editor | **Sin hallazgo**, y sigue sin haberlo: el hijo de columna reutiliza los mismos cinco controles. |
| **Nuevo** — `default` de `renderColumns` vuelca JSON crudo | **ABIERTO**, declarado en 12D, enrutado. |

## 12I · Archivos tocados en la ronda 2

| Archivo | Alcance |
|---|---|
| `src/builders/web/partials/renderVisual.js` | solo `isSafeCompiledSvg` |
| `src/builders/web/renderColumns.js` | solo el `require` y el `case` nuevo |
| `tools/author-lite/compiler-api/schemas/draftSchema.js` | solo `WebColumnsChildSchema` |
| `tools/author-lite/editor-ui/src/schemas/draftSchema.js` | solo `WebColumnsChildSchema` |
| `.../components/web/WebBlockEditor.jsx` | solo `COLUMN_CHILD_OPTIONS` y la rama de `ColumnChildFields` |
| `.../utils/blockFactory.js` | **fuera del Scope declarado**, ver 12B |
| `.../tests/webVisualSvgSafety.test.mjs` | conducta revertida, ver 12F |
| `.../tests/webColumnsChildExpansionSafety.test.mjs` | forma, ver 12F |

`compiler.js` **no se tocó**: se midió y no lo necesitaba.

El taller **no toca** el status del run, `.project/`, git ni el orden de la cola. **Cierra la
cabina.**
