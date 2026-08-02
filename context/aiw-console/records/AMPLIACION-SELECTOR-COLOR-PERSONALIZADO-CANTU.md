# Ampliación del selector de color personalizado — `cantu-studio`, `queue_order` 19

**Proyecto:** cantu-studio (bloque B) · aiw-console (bloque A)
**Fecha:** 2026-08-02
**Naturaleza:** medición en disco de solo lectura sobre `cantu-studio`, más una entrada
nueva en `DECISIONES.md`. **No se implementó nada en `cantu-studio` y no se modificó
ningún archivo de ese repo.**
**Archivos escritos:** `context/DECISIONES.md` (entrada `D-061`, append puro) y este record.

---

## ⛔ PARADA — se dispara B2

**El criterio B2 es compuerta y se cumple su condición de parada.** Medido: los roles
derivados —`surface`, `border`, `text`— **no llegan hoy a la salida en ningún componente
Web**. Solo llega el acento. Conforme a B2 y a B13, este encargo **no enmienda el
`full_description` (B3), no implementa (B5), no escribe tests nuevos (B7) y no produce el
packet de re-QA (B8)**. Entrega la medición del universo (B1), la medición de la compuerta
(B2), el informe de opciones con coste medido y recomendación explícita **sin decidir**, la
medición de drafts (B6), la salida del validador (B10) y esta declaración (B11, B12).

La petición 2 del operador —*«Un hex personalizado genera sus roles derivados —fondo suave,
borde, texto— con la función de derivación que YA EXISTE»*— **no es alcanzable dentro de
este alcance**: la función existe y funciona, pero ningún compilador ni renderer transporta
su resultado más allá del acento. Llevar los cuatro roles hasta el render es decisión del
operador, no del taller.

---

## 1. Identidad del run, derivada del canónico

| Campo | Valor derivado |
|---|---|
| `queue_order` | 19 |
| `run_id` | `RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` |
| `title` | `Carry the author palette through the compiler and the Web engine` |
| Objetivo / fase contenedora | `O5` / `O5.P5` |
| `status` | `active` |
| `depends_on` | `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001`, `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001` |

**El título casa verbatim con el criterio del objetivo.** El run **no** tiene campo `phase`
propio: la fase es la del contenedor (`O5.P5`), dato que importa porque B3 prohíbe tocarla.
Totales del canónico verificados: **66 runs**, `queue_order` **1..66 denso**, sin huecos ni
duplicados. Fuente: `projects/cantu-studio/.aiw/roadmap/roadmap.json`.

---

## 2. B1 — El universo medido, antes de tocar nada

Diecisiete componentes Web, derivados de `blockCatalog.js` (ids `web-*`). **La cabina tiene
dos mediciones previas que no coinciden; esta tabla sale del disco.**

Abreviaturas: **CC** = control compartido (`ColorTokenOrCustomField` / `VariantSelect`);
**propio** = control escrito en el propio componente; **crudo** = `input type="color"`
directo; **fija** = lista cerrada en el editor.

| # | Componente | ¿Superficie de color author-facing? | Control (archivo:línea) | ¿Custom hoy? Colocaciones | ¿Conjunto cerrado en compilador? | ¿El compilador resuelve color hoy? |
|---|---|---|---|---|---|---|
| 1 | `header` | Sí, `variant` | CC · `WebBlockEditor.jsx:116` (montaje `:3912`), columna `:1777` | **Sí — 2 de 2** | No | Sí, siempre · `compiler.js:1091` (`resolveVariantAccentColor`) |
| 2 | `card` | Sí, `color` + `colorToken` | **Propio + crudo** · `WebBlockEditor.jsx:903`, `input` en `:974`; montaje `:3931` y columna `:1905` | **Sí — 2 de 2** | No | Sí, siempre · `compiler.js:150` (`resolveCardColor`) |
| 3 | `callout` | Sí, `variant` | CC **sin** `allowCustom` · `:3946`; columna `:1841` | No — 0 de 2 | No | **Solo si es id de la paleta** · `compiler.js:1103` |
| 4 | `narrative` | **No** (solo `mode`) | — · `:3954`, columna `:1918` | — | No | No emite color · `compiler.js:1115` |
| 5 | `list` | Sí, `variant` | CC **con** `allowCustom` · `:3971`; columna `:1807` | **Sí — 2 de 2** | No | Sí, siempre · `compiler.js:1137` |
| 6 | `rule` | Sí, `variant` | CC **sin** `allowCustom` · `:4032`; columna `:1877` | No — 0 de 2 | No | **Solo si es id de la paleta** · `compiler.js:375` |
| 7 | `details` | Sí, `items[].variant` | CC **sin** `allowCustom` · `:2435` | No — 0 de 1 | No | **Solo si es id de la paleta** · `compiler.js:392` |
| 8 | `arithmetic` | **No** | `ArithmeticFields` no recibe `colorPalette` · `:4067` | — | No | No resuelve color · `compiler.js:774` |
| 9 | `timeline` | Solo `detailsVariant` («Tipo detalle») | **Fija** · `:3795`, opciones `TIMELINE_DETAIL_VARIANT_OPTIONS` | No — 0 de 1 | **Sí** · `compiler.js:55` `{def,ctx,wrn,success}`, guarda `:1010` | No resuelve color; emite el token · `compiler.js:1063` |
| 10 | `hierarchy` | Sí, `nodes[].color` | **Propio + crudo** · `WebBlockEditor.jsx:3395`, `input` en `:3442` | **Sí — 1 de 1** | No | Pasa el hex tal cual · `compiler.js:889`, `:924` |
| 11 | `conceptGrid` | Sí, `items[].variant` | CC **sin** `allowCustom` · `:2581` | No — 0 de 1 | No | **Solo si es id de la paleta** · `compiler.js:408` |
| 12 | `split` | Sí, `variant` | **Fija** · `:1683`, `SPLIT_VARIANT_OPTIONS` `:354` | No — 0 de 1 | **Sí** · `compiler.js:66` `{ctx,focus,wrn}`, guarda `:604` | No resuelve color; emite el token · `compiler.js:676` |
| 13a | `table` — selector principal | Sí, `variant` | CC **sin** `allowCustom` · `:3070`; columna `:1966` | No — 0 de 2 | No | **Solo si es id de la paleta** · `compiler.js:540` |
| 13b | `table` — **badge de fila** | Sí, `rows[].value.badge.variant` | **Fija** · `:2996`, `TABLE_BADGE_VARIANT_OPTIONS` `:334` | No — 0 de 2 | **Sí** · `compiler.js:502` (`normalizeTableBadgeVariant` contra `VARIANT_VALUES`, 9 ids, + `TABLE_BADGE_VARIANT_MAP`) | Emite el token normalizado · `compiler.js:529` |
| 14 | `columns` | **No** (contenedor) | `WebColumnsEditor` `:1992` no monta control propio | — | No | No emite color; propaga contexto · `compiler.js:1143` |
| 15 | `iconList` | Sí, `items[].color` | **Propio + crudo** · `IconListFields.jsx:26` | **Sí — 2 de 2** (`:4015`, columna `:1869`) | No | Pasa el hex tal cual · `compiler.js:288` |
| 16 | `visual` | Sí, pero es **fondo libre**, no selector de paleta | **Crudo** · `VisualFields.jsx:32` sobre `background` | Sí (es un picker suelto) — 1 de 1 | No | Pasa `background` tal cual · `compiler.js:298` |
| 17 | `video` | **No** | `VideoFields.jsx` sin campo de color | — | No | No emite color · `compiler.js:303` |

**Colocaciones.** `ColumnChildFields` (`WebBlockEditor.jsx:1751`) admite **nueve** kinds como
hijos de columnas: `header`, `list`, `callout`, `iconList`, `rule`, `card`, `narrative`,
`split`, `table`. Los ocho restantes tienen **una sola colocación** por construcción, no por
omisión: `details`, `conceptGrid`, `arithmetic`, `timeline`, `hierarchy`, `visual`, `video`,
`columns`.

### Qué entra y qué no, según esta tabla

**Ya habilitados con el control compartido, no se tocan (2):** `header`, `list` — ambos en
sus 2 colocaciones.

**Sin superficie de color, fuera por no tenerla (4):** `narrative`, `arithmetic`, `video`,
`columns`. Dárselas es capacidad nueva y asunto de su propio run.

**Fuera por conjunto cerrado dentro del compilador (3 superficies, no 3 componentes):** la
variante de `split`, la `detailsVariant` de `timeline`, y el **badge** de `table`. Los
habilita el run de compuertas de variante, hoy `queue_order` 29. **La frontera es por
superficie:** `table` está **dentro** por su selector principal y **fuera** por su badge.

**Candidatos del alcance ampliado (8 superficies):**

| Superficie | Trabajo que pedía el ticket | Obstáculo medido |
|---|---|---|
| `callout` (2 colocaciones) | encender `allowCustom` | el hex se descarta en el compilador |
| `rule` (2) | encender `allowCustom` | ídem |
| `details` (1) | encender `allowCustom` | ídem |
| `conceptGrid` (1) | encender `allowCustom` | ídem |
| `table`, selector principal (2) | encender `allowCustom` | ídem |
| `card` (2) | reemplazar control crudo por el compartido | almacena en **dos** campos (`color` + `colorToken`); normalizar cambia la forma de almacenamiento |
| `hierarchy` (1) | reemplazar control crudo | almacena hex directo, sin token |
| `iconList` (2) | reemplazar control crudo | almacena hex directo, sin token |
| `visual` (1) | *(reemplazo del control crudo)* | **no es un selector de paleta**: es un fondo libre. Normalizarlo le daría semántica de token que hoy no tiene |

---

## 3. B2 — La compuerta, medida

### 3.1 La función de derivación existe y funciona

`deriveColorRolesFromAccent` está en
`tools/author-lite/editor-ui/src/features/editor/constants/colorSystem.js:373-385`, tiene
tests, y `resolveAuthorColorToken` ya la usa para un hex sin token (`:797`). Medido en vivo:

```
deriveColorRolesFromAccent("#FF007F")
  = {"accent":"#FF007F","surface":"#FFEBF5","border":"#FFA6D2","text":"#1E293B"}
```

**No hace falta escribir ninguna derivación nueva.** El problema no es producir los roles.

### 3.2 Los roles derivados NO llegan a la salida

Compilando un hex personalizado por cada componente y renderizando con el motor Web real:

| Componente | ¿El compilador emite `color`? | ¿`color` == el hex? | ¿emite `surface`? | ¿emite `border`? | ¿el HTML pinta el hex? | ¿el HTML pinta `#FFEBF5` (surface derivado)? |
|---|---|---|---|---|---|---|
| `header` | sí | **sí** | no | no | **SÍ** | no |
| `list` | sí | **sí** | no | no | **SÍ** | no |
| `card` | sí | **sí** | no | no | **SÍ** | no |
| `iconList` | sí | **sí** | no | no | **SÍ** | no |
| `hierarchy` | sí | **sí** | no | no | **SÍ** | no |
| `callout` | **no** | no | no | no | **NO** | no |
| `rule` | **no** | no | no | no | **NO** | no |
| `details` | **no** | no | no | no | **NO** | no |
| `conceptGrid` | **no** | no | no | no | **NO** | no |
| `table` | **no** | no | no | no | **NO** | no |

**Cero `surface` y cero `border` en la salida compilada de los diez.** Cero apariciones del
`surface` derivado en el HTML de los diez. El comentario del propio repo ya lo dice, y es de
disco: `renderCallout.js:38` — *«El fondo sigue saliendo del mapa: la paleta solo emite
accent.»*

Verificación directa sobre `callout` con el hex `#FF007F`: el HTML sale con
`background-color: #F2F6FA` y `border-left: 4px solid #5E81AC`, que es el azul `ctx` del
mapa fijo. **Ni el acento llega.**

### 3.3 Segundo hallazgo, que el ticket no anticipaba

Los cinco componentes del patrón de regresión —`callout`, `rule`, `details`, `conceptGrid`,
`table`— **sí resuelven un token de la paleta activa** (medido contra una paleta alterna con
`accent` `#123ABC`: los cinco emiten el acento correcto). Lo que descartan es
**exclusivamente el hex personalizado**, porque `resolvePaletteAccentColorIfDefined`
(`compiler.js:184-191`) solo emite cuando el valor resuelto conserva su propio id:

```js
return token.id === variantId ? token.accent : undefined;
```

Un `#RRGGBB` resuelve al pseudo-token `custom`, cuyo id no es el valor entrante, luego no
emite. **Encender `allowCustom` en esos cinco hoy produciría un control que le miente al
autor** — exactamente el modo de fallo que `VariantSelect.jsx:121-123` dice evitar: *«ofrecerle
al autor un color que la salida no pinta sería mentirle»*.

### 3.4 El dato que abarata la opción grande

El mapa fijo del motor y la paleta por defecto del editor **coinciden en todo**:

```
9/9 accents idénticos, 9/9 surfaces idénticos
def #B48EAD/#F9F5F8 · ctx #5E81AC/#F2F6FA · ex #88C0D0/#F0F6F4 · focus #C2B280/#F9F8F6
str #D6CFC2/#FDFBF5 · res #A3BE8C/#F4F8F4 · wrn #D08770/#FCF7F5 · err #BF616A/#FCF5F5
meta #4C566A/#F4F6F8
```

Y `createAuthorColorToken` (`colorSystem.js:445-447`) **prefiere el rol autorado sobre el
derivado** (`normalizeRoleHex(token?.surface, roles.surface)`). Consecuencia medida:
`getAuthorColorRoles('ctx').surface` devuelve `#F2F6FA`, el autorado, **no** el derivado
`#F2F5F8`. Es decir: si el compilador emitiera `token.surface`, la paleta por defecto
renderizaría **idéntico a hoy**. Solo un hex personalizado, que no tiene rol autorado, caería
al derivado.

---

## 4. Informe de opciones — coste medido y recomendación, sin decidir

### Opción A — Solo el acento (paridad con lo que hoy hacen los tokens)

Encender el control compartido en las ocho superficies candidatas, reemplazar los tres
controles crudos, y hacer que un hex personalizado llegue **como acento** en los cinco del
patrón de regresión.

- **Coste:** 1 punto en el compilador (`resolvePaletteAccentColorIfDefined`,
  `compiler.js:184-191`) + 8 superficies de editor + tests.
- **Cero cambios en el motor Web.**
- **Qué entrega:** el picker en todos, y el color elegido pintado como acento.
- **Qué NO entrega:** el punto 2 del operador. El fondo suave y el borde seguirían saliendo
  del mapa fijo — igual de incompletos que hoy para un token, pero **más visiblemente
  incoherentes** para un hex lejano de la paleta: un rosa `#FF007F` con fondo azul `#F2F6FA`.
- **Riesgo:** entrega un control que cumple la letra de la petición 1 y falla la 2, y la
  incoherencia la descubriría la re-QA.

### Opción B — Llevar los cuatro roles hasta el render

El compilador emite `surface`, `border` y `text` junto al acento; cada renderer los prefiere
sobre su mapa fijo.

- **Coste medido en el compilador:** las 3 funciones de resolución (`resolveCardColor`
  `:150`, `resolveVariantAccentColor` `:174`, `resolvePaletteAccentColorIfDefined` `:184`)
  pasan de devolver `.accent` a devolver el objeto de roles, más **10 puntos de emisión**
  (`:316`, `:344`, `:367`, `:375`, `:392`, `:408`, `:540`, `:1091`, `:1103`, `:1137`).
- **Coste medido en el motor Web:** **13 puntos de lectura del mapa fijo repartidos en 7
  archivos** — `renderCallout.js` (5), `renderCard.js` (2), `renderRule.js` (2),
  `renderList.js` (1), `renderDetails.js` (1), `renderConceptGrid.js` (1), `renderTable.js`
  (1). `renderHeader.js`, `renderIconList.js` y `renderHierarchy.js` **no cuestan nada**: ya
  solo usan el acento.
- **Riesgo de regresión visual: CERO, medido.** 9/9 accents y 9/9 surfaces coinciden entre la
  paleta por defecto y el mapa fijo (§3.4), y los **10 drafts del repo no contienen ni un solo
  hex literal** (§5). Nada de lo que existe hoy cambiaría de color.
- **Qué entrega:** exactamente lo que el operador pidió, y de paso cierra el patrón de
  regresión que el contrato de color §8 nombra.
- **Lo que arrastra:** el motor Slide tiene su propio mapa fijo y **queda fuera** por B13; hay
  que declararlo para que el objetivo Slide no lo herede en silencio, que es justamente lo que
  el `full_description` actual del run ya hace.

### Opción C — A dentro de este run, B como run propio del motor

Este run entrega el picker con acento correcto en todas las superficies; un run nuevo del
carril del motor lleva los cuatro roles al render.

- **Coste:** el de A, más un run nuevo.
- **Riesgo:** deja en producción, durante el intervalo, un picker cuyo fondo no acompaña al
  acento; y **obliga a re-verificar dos veces la misma superficie**, que es exactamente el
  desperdicio que la política de `D-061` existe para no comprar.

### Recomendación explícita del taller — **Opción B**

Es la única que entrega la petición 2, su riesgo de regresión está **medido en cero**, y su
coste real —13 puntos de lectura en 7 renderers— es menor de lo que la frase «llevar los
cuatro roles hasta el render» sugiere, porque los tres renderers ya reconciliados no cuestan
nada. Además cierra en el mismo movimiento el patrón de regresión de §8 del contrato de color,
que hoy está abierto para cinco componentes.

**Esta es una recomendación, no una decisión. El taller no la ejecuta.** Si el operador la
acepta, la ampliación del `queue_order` 19 pasa a incluir el motor Web, y hay que comprobar
antes que eso no obliga a cambiar `title`, `objective` ni `phase` — el título actual,
*Carry the author palette through the compiler and the Web engine*, **ya nombra el motor
Web**, así que la identidad del run probablemente aguanta; pero esa comprobación es del
encargo que ejecute, no de éste.

---

## 5. B6 — Drafts medidos

Los **10** drafts de `src/content/author_lite/drafts/`:

| Draft | `variant` en uso | `colorToken` | Hex literales |
|---|---|---|---|
| `matematicas/algebra/test2.json` | `ctx`, `wrn` | ninguno | **NINGUNO** |
| `matematicas/algebra/test3.json` | `def` | ninguno | **NINGUNO** |
| `matematicas/algebra/test5.json` | `wrn`, `ctx` | ninguno | **NINGUNO** |
| `qa/author_lite/qa_list_certification.json` | `def`, `ctx` | ninguno | **NINGUNO** |
| `qa/author_lite/qa_list_sandbox_reproduction.json` | `ctx` | ninguno | **NINGUNO** |
| `qa/author_lite_web_final_build_moodle_parity_fix/list_moodle_parity.json` | `ctx` | ninguno | **NINGUNO** |
| `qa/author_lite_web_final_build_mvp/list_mvp.json` | `ctx` | ninguno | **NINGUNO** |
| `qa/workspace_internal_mvp/caracteristicas_internal_qa.json` | `ctx` | ninguno | **NINGUNO** |
| `slide/test_slide/test_slide/test_slide.slide.draft.json` | `ctx` | ninguno | **NINGUNO** |
| `web/test_web/test_web/test_web.web.draft.json` | `ctx`, `wrn` | ninguno | **NINGUNO** |

**Ninguno cambia de color renderizado**, por la razón trivial de que no se cambió una sola
línea de código. Y **cero hex literales en los diez** es dato de calibración para la decisión
de arriba: ninguna de las tres opciones pone en riesgo un draft existente.

---

## 6. B10 — Validador

Ejecutado desde `projects/cantu-studio` por la vía que no escribe:

```bash
node tools/project-console/validate-project-console-state.mjs
```

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 66 runs; queue groups needs_human_decision=0 now=2 ready_next=13 later=33 history=18
Roadmap v3 active run derived stages: RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001=none RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 918 commits / 2 branches (2 visible, 0 backup hidden); current=main; run-associated=6; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**Total de runs real: 66. `history=18`.** El aviso no bloqueante de la dependencia externa es
el conocido: es legal y no es hallazgo.

---

## 7. B11 — La ampliación, declarada en la forma que exige `D-061`

**Alcance original del run.** Su `full_description` vigente declara la base medida —desde la
unificación del selector de color, el editor ofrece la paleta activa a componentes cuya salida
compilada lleva solo el id del token, y el motor Web lo resuelve contra un mapa fijo en
`src/builders/web/partials/commons.js`, de modo que un token que no sea clave de ese mapa cae
en silencio— y **dos rutas medidas entre las que el run decide e implementa una**: que el
compilador resuelva el acento para esos componentes, o que los renderers prefieran un color
compilado. Declara además que el run escribe los tests que hoy no existen, que reporta el
alcance de la ruta elegida, que **exige QA visual del operador** y que *«repair is authorised
only by that verdict»*; y fija tres fronteras: los conjuntos cerrados de variante del
compilador quedan fuera con run propio, el motor Slide lleva su propio mapa fijo y se nombra
para que el objetivo Slide no lo herede en silencio, y ninguna revalidación de componente
ocurre aquí.

**Qué reveló la QA humana.** El operador ejecutó la QA del run y devolvió
**`CHANGES_REQUIRED`**: los componentes que hoy solo ofrecen la lista de tokens **no ofrecen
color personalizado con picker**, y esa limitación existía porque un hex personalizado no
llegaba a la salida en los componentes que el compilador no resolvía — que es exactamente lo
que este run acaba de resolver.

**Qué se añadiría.** El control compartido con picker en las ocho superficies candidatas de
§2, en sus dos colocaciones cuando el componente viva también como hijo de columnas; los roles
derivados generados por la función existente; y el reemplazo de los tres controles crudos.

**Por qué no es un run nuevo.** Cae sobre la superficie que la QA ejercitó y sobre la pieza
cuya limitación este mismo run acaba de levantar; no obliga a cambiar `title`, `objective`
ni `phase`. Cumple las condiciones 1, 2 y 3 de `D-061`.

**Cómo se enmendó el texto del run: NO SE ENMENDÓ, y ésa es la consecuencia de la parada.**
La condición 4 de `D-061` exige que el texto del run se enmiende en el mismo encargo, para que
su descripción cubra lo que el run realmente hace. **Aquí no se puede cumplir todavía**: el
contenido de la enmienda depende de qué opción elija el operador en §4, y escribir una
enmienda que describa un alcance que el operador aún no ha fijado sería poner en el roadmap
una afirmación que el run no cumple — el modo de fallo que la propia condición 4 existe para
evitar. **La enmienda y la implementación van juntas, en el encargo que ejecute la decisión.**
Hasta entonces el `full_description` sigue siendo cierto: describe el alcance original, que
es el que el run entregó.

---

## 8. B9 — Lo que esta ampliación dejaría desactualizado, nombrado y no reparado

Carril `DOCUMENTATION`, con dueño. **No se tocan.**

1. **`docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` §5 —
   *«Applicability: color and math per component»***. Su tabla fija, por componente, la
   columna *Color surface today* y *Palette-resolves*. Bajo cualquiera de las tres opciones
   cambian al menos las filas `callout`, `rule`, `details`, `conceptGrid`, `table`,
   `iconList`, `hierarchy` y `card`. La propia sección declara que *«a divergence between
   this table and the live code is decided by the code»*, así que la tabla no miente
   mientras la divergencia se declare — pero queda desfasada.

2. **`docs/reference/REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` §5 — *«Web Engine fallback
   behavior»***. **Ya está desfasada hoy, antes de cualquier ampliación.** Afirma que
   *«Every other Web renderer resolves `variant` against the hardcoded maps… and never sees
   the active palette»*, y lo medido es que `renderCallout.js:39`, `renderRule.js:28`,
   `renderDetails.js:66`, `renderConceptGrid.js:59` y `renderTable.js:30` **sí leen
   `data.color`** y prefieren el acento compilado cuando llega. La lista de renderers
   reconciliados del primer punto —solo `renderHeader` y `renderList`— se quedó corta.

3. **`docs/reference/REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` §7 — *«The custom picker»***.
   Su regla *«Scope invariance: the same options appear top-level and inside `columns` in both
   slots»* pasaría de describir dos componentes a describir ocho superficies.

4. **`docs/reference/REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` §8 — *«The palette-regression
   pattern»***, subsección *Components carrying the pattern today*. La Opción B cerraría el
   patrón para los cinco componentes que nombra.

---

## 9. B12 — En qué status debe quedar el run, y qué falta

**El run sigue `active` y este encargo no lo cambia.** No se re-emitió `.project/`.

Para llegar a cierre falta, en este orden: (1) que el operador decida entre las opciones A, B
y C de §4; (2) el encargo que ejecute esa decisión, que enmienda el `full_description` **antes
de implementar** e implementa; (3) los tests del alcance nuevo; (4) el packet de re-QA que
cubra el alcance ampliado entero; (5) la re-QA humana del operador. **Lo cierra el operador
desde la consola global, que es el punto de serialización.**

---

## 10. Lo que este record NO hace

- **No enmienda el `full_description` del `queue_order` 19.** No se abrió el motor de
  `projects/aiw-console/tools/roadmap/`, ni en dry-run: no había qué escribir. El canónico de
  `cantu-studio` está intacto y su respaldo byte a byte quedó tomado antes de empezar, fuera
  de los dos repos.
- **No implementa nada.** Cero archivos de `cantu-studio` modificados. La sonda de medición
  vivió en `tools/author-lite/compiler-api/tests/` durante la ejecución y **se retiró**; el
  árbol de trabajo quedó como estaba.
- **No escribe tests nuevos ni corre `node --test`.** El alcance a cubrir no está fijado.
- **No produce el packet de re-QA** ni toca `.aiw/docs/docs_index.json`.
- **No toca** la Definition of Done, el contrato de color, `component_status.json`, los
  conjuntos cerrados del compilador ni el motor Slide.
- **No escribe ninguna función de derivación**: la que existe basta y está medida.
- **No aplica heurística de contraste** sobre los roles derivados. Que una combinación
  derivada resulte fea no es defecto: significa que ese color quiere configuración manual, y
  para eso está el editor de paletas.
- **No clasifica ningún run**, no inserta ni renumera, no re-emite `.project/`.
- **No ejecuta la política de `D-061`** en `aiw` ni en `aiw-console`: allí se registra, no se
  ejecuta.
- **Salvedad declarada:** se ejecutó `git status --porcelain`, de solo lectura, para confirmar
  que el árbol de `cantu-studio` quedaba limpio tras retirar la sonda. Devolvió vacío. El
  encargo declara git fuera de alcance; queda dicho en vez de callado, y no se repitió.

---

## 11. Procedencia

- Entrada del log: `context/DECISIONES.md`, **`D-061`** — *La ampliación del alcance de un run
  abierto se autoriza por veredicto de QA humana, y sólo con las cuatro condiciones*.
- Canónico medido: `projects/cantu-studio/.aiw/roadmap/roadmap.json`, 66 runs, `queue_order`
  1..66 denso.
- Contrato de color: `projects/cantu-studio/docs/reference/REFERENCE-COLOR-PALETTE-COMPATIBILITY.md`.
- Definition of Done: `projects/cantu-studio/docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md`.
- Records previos del mismo hilo: `ALTA-RUN-UNIFICACION-SELECTOR-COLOR-CANTU.md`,
  `CONTRATO-COLOR-Y-PALETA-CANTU.md`.
