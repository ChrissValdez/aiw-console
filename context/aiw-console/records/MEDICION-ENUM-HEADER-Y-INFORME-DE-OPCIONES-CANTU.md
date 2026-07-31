# Medición del enum de Header e informe de opciones

**Proyecto:** cantu-studio
**Run:** `RUN-JAME-WEB-HEADER-REVALIDATION-001` — `queue_order` 15, carril DEVELOPMENT
**Fecha:** 2026-07-30
**Tipo:** Segunda ronda de REPARACIÓN. **Terminó en PARADA por el criterio 5**: el arreglo
del síntoma 1 exige ampliar el enum `header.variant`, que es decisión del operador.
**Estado declarado del run:** `active` — no lo cierra este encargo.

**Resultado en una línea:** la hipótesis de la cabina es **correcta en el mecanismo** —es un
límite de schema, no del selector—, el diagnóstico del ticket es **medio falso** —los nueve
nombres sí salen de la paleta, ninguno es de una constante—, y el síntoma 2 está **invertido**:
Header sí sigue a la paleta y el componente de referencia del operador es el que deja de seguirla.

---

## 1. Guarda de identidad, antes de nada

Derivada del canónico por `queue_order`, no por nombre. Ruta recorrida en el JSON:
`objectives[2].phases[2].runs[0]` — objetivo «Cantu Studio Web Components» / fase
«Web Components - Basics».

| Campo | Valor leído verbatim del canónico |
|---|---|
| `run_id` | `RUN-JAME-WEB-HEADER-REVALIDATION-001` |
| `title` | `Audit and implement the Header component` |
| `status` | `active` |

Carril: el run **no lleva clave `lane`**; `lanes[]` declara `DEVELOPMENT` con `default: true`,
luego es DEVELOPMENT. `schema_version: jame.roadmap_v3.v0.2-progress`.

**La guarda pasa.** El título coincide exacto con el del encargo. Se sigue.

**Deriva del canónico desde el record anterior:** ninguna. md5 `1dfcf17eccb7ec79b0864f040a5714b9`,
el mismo valor con que cerró `REPARACION-SELECTOR-COLOR-HEADER-CANTU.md`, mtime 18:22:20 —
anterior a esta sesión. `queue_order` 14 sigue `completed`, 16 sigue `planned`.

---

## 2. LA TABLA QUE DECIDE — paleta activa contra el enum de `header.variant`

**Sección propia y visible, como pide el criterio 2.** Todo medido en disco en esta sesión.

### 2.1 Dónde vive la paleta del operador, y cómo se llegó a ella

El encargo dice `metadata/color-palettes/`. Esa ruta **no existe dentro del repo**:
`cantu-studio/src/content/author_lite/metadata/` está vacío. El servidor resuelve
`STORAGE.dirs.metadata` contra un workspace externo (`server.js:129`,
`workspaceStorage.js:113-151`), y el workspace real del operador es un **proyecto hermano**:

```
projects/cantu-lessons/metadata/color-palettes/
```

`index.json:3` → `"activeWebPaletteId": "metodo_cantu_2"`.
Paleta Web activa: `projects/cantu-lessons/metadata/color-palettes/web/metodo_cantu_2.json`,
nombre `Metodo_Cantu`, `updatedAt` 2026-07-31T02:05:03.

**Se declara porque cambia la respuesta:** el log `.qa-external.out.log` del compiler-api
apunta a `C:\Users\Chris\Documents\JAME_Parallel_Workspace\JAME_Lessons`, ruta que **ya no
existe en disco**. Es un log vencido; la paleta viva es la de `cantu-lessons`.

### 2.2 Qué tokens define hoy la paleta Web activa — **son ONCE, no nueve**

Ruta: `../cantu-lessons/metadata/color-palettes/web/metodo_cantu_2.json`.

| # | id | label | accent | Línea | ¿Dentro del enum `header.variant`? |
|---|---|---|---|---|---|
| 1 | `def` | Malva | `#C77DB4` | `:37-46` | **Sí** |
| 2 | `ctx` | Azul acero | `#5E81AC` | `:47-57` | **Sí** |
| 3 | `ex` | Verde Jade | `#4FB6A3` | `:58-68` | **Sí** |
| 4 | `focus` | Dorado Arena | `#C2B280` | `:69-79` | **Sí** |
| 5 | `str` | Coral cálido | `#F48C7A` | `:80-90` | **Sí** |
| 6 | `res` | **Verde** | `#A3BE8C` | `:91-101` | **Sí** |
| 7 | `wrn` | **Naranja** | `#D08770` | `:102-112` | **Sí** |
| 8 | `err` | **Rojo** | `#BF616A` | `:113-123` | **Sí** |
| 9 | `meta` | **Gris** | `#4C566A` | `:124-134` | **Sí** |
| 10 | `color_2` | Ámbar | `#F4B847` | `:135-145` | **NO** |
| 11 | `color` | Lavanda | `#9A8CFF` | `:146-156` | **NO** |

**Cuántos son: once.**

### 2.3 Qué nueve valores admite el enum `header.variant`

| Medición | Valor | Ruta y línea |
|---|---|---|
| Declaración del enum | `z.enum(['def','ctx','ex','focus','str','res','wrn','err','meta'])` | `editor-ui/src/schemas/draftSchema.js:22` |
| Gemelo idéntico | mismo literal, carácter por carácter | `compiler-api/schemas/draftSchema.js:22` |
| Dónde lo consume `header` | `variant: VariantEnum.optional()` | `editor-ui/…draftSchema.js:546` · `compiler-api/…draftSchema.js:559` |

**Nueve. Cerrado. Idéntico en los dos schemas.**

### 2.4 EL CRUCE

| Categoría | Cuántos | Cuáles |
|---|---|---|
| Tokens de la paleta **dentro** del enum | **9 de 11** | `def`, `ctx`, `ex`, `focus`, `str`, `res`, `wrn`, `err`, `meta` |
| Tokens de la paleta **fuera** del enum | **2 de 11** | **`color_2` (Ámbar, `#F4B847`)** y **`color` (Lavanda, `#9A8CFF`)** |
| Valores del enum que **no existen** en la paleta | **0 de 9** | ninguno |

### 2.5 Qué nueve opciones pinta hoy el desplegable, y de dónde sale cada label

Derivación medida ejecutando el código real (`getAuthorColorOptions` de `colorSystem.js:817`
filtrado como en `WebBlockEditor.jsx:85`):

| Orden | value | Label que ve el operador | **Origen del label** | ¿Coincide con la constante estática? |
|---|---|---|---|---|
| 1 | `def` | Malva | **paleta** `:38` | no (la constante dice «Morado») |
| 2 | `ctx` | Azul acero | **paleta** `:49` | no (dice «Azul») |
| 3 | `ex` | Verde Jade | **paleta** `:60` | no (dice «Cian») |
| 4 | `focus` | Dorado Arena | **paleta** `:71` | no (dice «Dorado») |
| 5 | `str` | Coral cálido | **paleta** `:82` | no (dice «Champagne») |
| 6 | `res` | Verde | **paleta** `:93` | **sí, por coincidencia** |
| 7 | `wrn` | Naranja | **paleta** `:104` | **sí, por coincidencia** |
| 8 | `err` | Rojo | **paleta** `:115` | **sí, por coincidencia** |
| 9 | `meta` | Gris | **paleta** `:126` | **sí, por coincidencia** |

Piezas: `getHeaderColorOptions` en `WebBlockEditor.jsx:83-88`, filtro en `:85`;
`HeaderColorSelect` en `:116-118`; sitio top-level `:3784`; rama de slot `:1731`.
Constante estática `VARIANT_OPTIONS` en `constants/editorOptions.js:3-13`.

### 2.6 QUÉ DICE ESTA TABLA SOBRE LA CAPTURA DEL OPERADOR

**Confirma una mitad del ticket y desmiente la otra.** Gana la medición.

| Afirmación del ticket | Veredicto medido |
|---|---|
| «no están todos los colores de su paleta» | **CIERTA.** Once definidos, nueve ofrecidos. Faltan **Ámbar** y **Lavanda** |
| «los que hay no son los correctos» | **FALSA.** Los **nueve** labels salen de la paleta. **Ninguno** viene de la constante |
| «cuatro con nombres genéricos —Verde, Naranja, Rojo, Gris—» | **FALSA como diagnóstico, cierta como transcripción.** Esos cuatro son los labels **propios de la paleta** para `res`/`wrn`/`err`/`meta`. Que coincidan carácter por carácter con la constante es casualidad, no herencia |
| Hipótesis de la cabina: «es un límite de schema, no del selector» | **CONFIRMADA.** Los dos tokens que faltan son exactamente los dos que caen fuera del enum |

**El desplegable ya está reparado y funcionando.** Lo que la captura muestra no es una lista
a medio arreglar: es la lista correcta de la paleta, recortada por el schema.

---

## 3. Criterio 3 — el contraste con el componente que sí funciona

El operador dice que «lista con etiquetas» se comporta bien. **Identificado:**
`blockCatalog.js:36-37` → `iconList`, `label: 'Lista con etiquetas'`. No es `list`.

| Pregunta del criterio | `card` | `iconList` | `header` |
|---|---|---|---|
| ¿Su campo de color tiene enum cerrado? | **No.** `colorToken: z.string().regex(COLOR_TOKEN_ID)` (`draftSchema.js:623`) + `color` hex (`:622`) | **No.** `color: z.string().regex(HEX_COLOR)` (`draftSchema.js:293`) | **Sí.** `variant: VariantEnum` — nueve cerrados |
| ¿Ofrece todos los tokens de la paleta? | **Sí, los 11**, sin filtro (`WebBlockEditor.jsx:878`) + `Personalizado` | **Sí, los 11**, sin filtro (`IconListFields.jsx:31`) + `Personalizado` | **No, 9 de 11** — filtro en `WebBlockEditor.jsx:85` |
| ¿Qué guarda? | token id **o** hex | **hex resuelto** | **token id** |
| ¿Cómo reacciona a un cambio de paleta en caliente? | ver §4.3 | ver §4.3 | ver §4.3 |

### 3.1 EL HALLAZGO CENTRAL DEL ENCARGO

**La diferencia es exactamente la que el criterio 3 anticipaba: ellos no tienen enum cerrado y
Header sí.**

`card` y `iconList` **no ofrecen más porque sean mejores**: ofrecen más porque su campo de
color no es un enum. `card` escribe en `colorToken`, un string con regex; `iconList` escribe un
hex. Ninguno de los dos puede rechazar un token nuevo de la paleta, porque ninguno de los dos
sabe qué tokens existen.

`header` escribe en `variant`, y `variant` es la **misma** clave que el compiler y el renderer
llevan usando desde antes del sistema de paletas. Ése es el único motivo del recorte.

**Corolario medido:** el arreglo del encargo anterior copió el patrón de `card` correctamente
en todo salvo en lo que no podía copiar — el campo destino. Su §4.1 ya lo había declarado, y
esta medición lo confirma con la paleta real en lugar de con una de prueba.

---

## 4. Criterio 4 — el síntoma 2, medido como defecto independiente

«No se actualiza al cambiar la paleta.» El criterio ofrece dos causas —reactividad o
consecuencia del enum— y manda distinguirlas **con evidencia**. La evidencia dice que **no es
ninguna de las dos**, y la tercera causa está medida abajo.

### 4.1 NO es reactividad — descartado con evidencia, no por razonamiento

**Prueba A — la cadena de props es la misma que la de `card`, sin memoización.**

| Eslabón | Ruta y línea | ¿Llega a `card`? | ¿Llega a `header`? |
|---|---|---|---|
| Origen del estado | `hooks/useAuthorColorPalette.js:33` — `palette` recomputado en cada render | — | — |
| Página | `EditorPage.jsx:146`, pasa en `:928` | sí | sí |
| Workspace | `CenterWorkspace.jsx:22`, pasa en `:116` | sí | sí |
| Editor de bloque | `WebBlockEditor.jsx:3724` | `:1143` → `CardColorField` | `:3784` → `HeaderColorSelect` |
| Derivación de opciones | dentro del cuerpo de render | `:878` `getAuthorColorOptions(palette)` | `:118` `getHeaderColorOptions(palette)` |

**Cero `React.memo` en `WebBlockEditor.jsx`, `WebFlowEditor.jsx` y `CenterWorkspace.jsx`**
(barrido hecho). Header y `card` cuelgan del mismo prop, en el mismo subárbol, del mismo estado.

**Prueba B — Header sí recomputa. Medido renombrando un token:**

| Acción sobre la paleta | Lista que pinta Header |
|---|---|
| base | `Malva ∣ Azul acero ∣ Verde Jade ∣ Dorado Arena ∣ Coral cálido ∣ Verde ∣ Naranja ∣ Rojo ∣ Gris` |
| renombrar `ctx` → «Azul RENOMBRADO» | `Malva ∣ **Azul RENOMBRADO** ∣ …` — **cambia** |
| mover solo el accent de `ctx` a `#00FF00` | **idéntica a la base** |

**Header recomputa.** Un renombrado se ve al instante. Lo que no se ve es un cambio de accent,
porque el desplegable de Header **no pinta color en ninguna parte**: su `<option>` renderiza
solo `{option.label}` (`WebBlockEditor.jsx:133`), aunque el objeto que recibe **sí trae el
accent** (`{value:'ctx', label:'Azul acero', accent:'#5E81AC', …}`).

### 4.2 Tampoco es consecuencia del enum

El enum explica los dos tokens que faltan (§2.4). **No explica** «no se actualiza»: los nueve
que sí están se actualizan igual que los de `card`.

### 4.3 LA CAUSA REAL, Y ESTÁ INVERTIDA RESPECTO AL TICKET

Medido sobre un valor ya autorado con el token `ctx`, cambiando el accent de `ctx` de
`#5E81AC` a `#00FF00`:

| | `iconList` («lista con etiquetas») | `header` |
|---|---|---|
| Qué tiene guardado | el hex `#5E81AC` | el id `ctx` |
| Desplegable **antes** del cambio | `ctx` | `Azul acero` |
| Desplegable **después** del cambio | **`Personalizado`** | `Azul acero` |
| Color compilado **después** | **`#5E81AC` — el viejo** | **`#00FF00` — el nuevo** |
| ¿Siguió a la paleta? | **NO** | **SÍ** |

`getPaletteIdFromHex` (`IconListFields.jsx:14-24`) mapea el hex guardado contra la paleta; si
el accent se movió, **ya no casa con ningún token y cae a `Personalizado`**, conservando el
color viejo.

**Conclusión medida, y contradice el enunciado del ticket:** lo que el operador leyó como
«iconList se actualiza y Header no» es **iconList rompiendo su vínculo con la paleta de forma
visible**, y **Header conservándolo en silencio**. Header es el que se comporta bien. El único
déficit real de Header es que **no enseña color**, así que hacer lo correcto no se nota.

### 4.4 Por qué NO se reparó nada aquí

- La rama «si es reactividad, repáralo» **no se dispara**: no es reactividad (§4.1).
- La causa que queda —el control no pinta color— **no es «no sigue a la paleta»**, es una
  carencia de affordance. Repararla es un cambio visible de la superficie de autoría que el
  encargo anterior ya declaró omitido a propósito (su §3.1), y que **el operador debe decidir
  junto con el enum**: si el enum pasa a derivarse de la paleta, el selector se reescribe entero
  y el swatch se pone en el mismo movimiento.
- El criterio 5 **ya paró el encargo** por el síntoma 1. Tocar código ahora produciría trabajo
  que la decisión pendiente puede invalidar.

Va como **opción C** del informe, recomendada y no ejecutada.

---

## 5. Criterio 5 — INFORME DE OPCIONES. PARADA DECLARADA

**El arreglo del síntoma 1 exige ampliar el enum `header.variant`. No se ejecutó.**

Los costes de abajo **no son estimaciones**: se midieron aplicando cada opción sobre el repo y
corriendo la suite entera, y **restaurando desde copia de seguridad con md5 verificado** después
de cada una (§9.2). Los cuatro archivos tocados en el experimento están hoy byte-idénticos.

### 5.0 El dato que ordena todas las opciones

**Los ids extra de la paleta los genera el propio operador, y son ilimitados.**
`createEmptyColorToken` (`colorSystem.js:765-766`) llama `createColorTokenId('color', …)`
(`:336-348`), que produce `color`, luego `color_2`, luego `color_3`… cada vez que el operador
pulsa «añadir token» en el editor de paletas (`ComponentGuide.jsx:1675`).

**Consecuencia: ningún enum fijo puede alcanzar nunca a la paleta.** Los dos tokens que hoy
faltan se llaman `color` y `color_2` porque el operador añadió dos. Un enum ampliado a once
volvería a fallar con el tercero.

### 5.1 Qué pasarían el compilador y el renderer — **ya lo aceptan, sin tocarlos**

Medido de punta a punta, saltándose el gate del schema:

| Capa | `ctx` | `color_2` (Ámbar) | `color` (Lavanda) |
|---|---|---|---|
| `WebDraftSchema.parse` | **ACEPTA** | **RECHAZA** «Invalid input» | **RECHAZA** «Invalid input» |
| Compiler → clave `color` | `#5E81AC` | **`#F4B847`** | **`#9A8CFF`** |
| Renderer → `border-left` | `4px solid #5E81AC` | **`4px solid #F4B847`** | **`4px solid #9A8CFF`** |

**El schema es el único gate.** `normalizeVariant` (`compiler.js:82-84`) es un passthrough con
default `ctx`; `resolveAuthorColorToken` resuelve cualquier id de la paleta y cae a `ctx` ante
uno desconocido; `renderHeader.js:49-52` prefiere siempre `data.color`, que el compiler siempre
emite. **Ni compilador ni renderer habría que tocarlos en ninguna opción.**

### 5.2 Las tres opciones, con su coste medido

| | **A — ampliar el enum a once** | **B — quitar el enum, patrón de `card`** | **C — swatch de color, sin tocar el schema** |
|---|---|---|---|
| Qué cambia | `z.enum([… ,'color','color_2'])` en los dos schemas **y** `VARIANT_OPTIONS` | `variant: z.string().regex(/^[a-z][a-z0-9_-]{1,31}$/)` en los dos schemas, y el filtro de `:85` desaparece | Nada del schema. Solo pintar el accent junto al `<select>` de Header |
| **Tests rotos, medido** | **3** — todos en `webHeaderColorPaletteAuthoringSurface.test.mjs` | **1** — `a palette token WebHeaderSchema cannot store is never offered` | **0** esperados; exigiría cobertura aditiva nueva |
| Cuáles | `Header color control offers the active palette tokens…`; `an unavailable palette falls back…`; `the repair does not migrate drafts…` | la única que existe para fijar el límite que se retira | — |
| **Drafts guardados con el enum viejo** | **cero riesgo** (§6) | **cero riesgo** (§6) | **cero riesgo** |
| Compilador / renderer | **no se tocan** (§5.1) | **no se tocan** (§5.1) | no se tocan |
| ¿Resuelve el síntoma 1? | **Solo hoy.** El próximo token del operador vuelve a quedar fuera (§5.0) | **Sí, y de forma permanente** | **No** |
| ¿Resuelve el síntoma 2? | no | no | **Sí** — hace visible el cambio de accent |
| Lo que se pierde | nada | **la validación cerrada**: un `variant` con typo deja de rechazarse al guardar y se resolvería a `ctx` en silencio | nada |

**Dato adicional medido:** ampliar **solo** los dos schemas, dejando `VARIANT_OPTIONS` en nueve,
da **302/302 EXIT 0** — pero es inerte: el filtro de `:85` sigue recortando la lista a nueve. La
ampliación del enum no sirve de nada sin ampliar también la constante del selector. **Los dos
sitios están acoplados por convención, no por código**, y eso es en sí un defecto latente.

### 5.3 La vía sin enum fijo que el criterio 5 pregunta — SÍ existe

**Sí: es la opción B, y es exactamente lo que `card` ya hace.** No hay que «derivar el enum de
la paleta» con maquinaria nueva — basta con dejar de tener enum, que es la forma en que el repo
ya resuelve este mismo problema en otro componente.

Su único coste real no es de tests ni de drafts: es que **`variant` deja de estar validado**. Un
draft importado a mano con `variant: 'azulito'` pasaría el schema y se renderizaría en `ctx`
sin avisar. Hoy se rechaza. `card` vive con esa misma laxitud desde siempre.

### 5.4 RECOMENDACIÓN — recomienda, no decide

1. **Opción B para el síntoma 1.** Es la única que sobrevive al siguiente token que añada el
   operador, cuesta **un** test —el que codifica justamente el límite que se retira— y alinea
   `header` con el patrón que `card` e `iconList` ya usan. La pérdida de validación cerrada se
   compensa con cobertura aditiva que fije el fallback a `ctx`.
2. **Opción C para el síntoma 2**, en el mismo movimiento. Sin ella, el operador seguirá sin ver
   que Header sigue a la paleta, porque **sí la sigue** y no se nota.
3. **Opción A, no.** Compra un arreglo con fecha de caducidad y deja el acoplamiento silencioso
   de §5.2 en pie.
4. **Aparte y con dueño distinto: `iconList` guarda hex y pierde el vínculo con la paleta**
   (§4.3). Es un defecto real, más grave que el de Header, y **no es de este run**.

**No se decidió nada.** Las tres opciones quedan sin ejecutar.

---

## 6. Criterio 8 — los drafts guardados siguen cargando, y no se migra nada

**Ningún draft se tocó.** Barridos **26** archivos JSON de los dos orígenes reales —el workspace
del operador (`projects/cantu-lessons/drafts/`) y los drafts internos del repo—, contra el
`WebDraftSchema` y el compiler de verdad. **Doce llevan bloques `header`**, 45 bloques en total.

| Medición | Resultado |
|---|---|
| Drafts con `header` que **cargan** | **11 de 12** |
| El que no carga | `sandbox_theory_complex.web.draft.json` — «Columnas Web v1 requiere exactamente 2 columnas». **Motivo ajeno a color y a `header`**; preexistente, no lo produce este encargo |
| Valor `variant` almacenado, en los 45 bloques | **solo `ctx` o ausente.** Ninguno usa los otros ocho valores del enum |
| Drafts que ganaron clave `color` | **cero.** La referencia sigue siendo referencia |
| Compilado bajo la paleta activa | los 45 → `ctx` = **`#5E81AC`**, el accent real de `Azul acero` |

**Se declara:** cargar un draft existente con Header funciona, el valor guardado es un token id
(o su ausencia, que resuelve al default), no se escribe ningún hex, y **no hay migración de
ninguna clase**.

**Dato que abarata las tres opciones:** como **ningún draft real usa un valor distinto de `ctx`**,
ampliar o retirar el enum **no puede romper ningún draft guardado**. El riesgo de migración
medido es **cero**, no «bajo».

---

## 7. Criterio 6 — ningún otro componente reparado; qué añade esta medición a la tabla

**No se tocó `VariantSelect.jsx` ni ninguno de los otros once.** Cero archivos de código
modificados en todo el encargo.

La tabla de doce-de-diecisiete del record anterior (§7 de `REPARACION-SELECTOR-COLOR-HEADER-CANTU.md`)
**sigue vigente y no se corrige**. Esta medición le añade **tres filas de información nueva**,
que se registran aquí y no se ejecutan:

| Añadido | Medición | Ruta y línea |
|---|---|---|
| **`iconList` recibe la paleta pero no la sigue** | Guarda hex, no token id. Al mover un accent, cae a `Personalizado` y conserva el color viejo. **Estar en la lista de «sí recibe la paleta» no equivale a seguirla** | `common/IconListFields.jsx:14-24`, `:31`, `:45` |
| **`card` ofrece los 11 tokens; `header`, 9** | El motivo es el enum, no el cableado | `WebBlockEditor.jsx:878` vs `:85` |
| **Acoplamiento latente enum ↔ constante** | `normalizeHeaderVariant` (`:75-77`) y el filtro (`:85`) validan contra `VARIANT_OPTIONS`, **no contra el enum del schema**. Hoy coinciden en nueve; nada lo garantiza | `WebBlockEditor.jsx:75-77`, `:85`; `editorOptions.js:3-13` |

---

## 8. Criterio 7 — lo que no se tocó

| Superficie | Estado |
|---|---|
| **Mojibake de los mensajes de schema** | **Intacto.** Sigue en `draftSchema.js:293`, `:547`, `:560` y decenas más, en los dos schemas |
| **«Full width» y «Col span»** | **Intactos.** Verificado de nuevo: el editor de Header ofrece cuatro controles y ninguno más |
| **`docs/components/web/HEADER.md`** | **Intacto**, md5 `90bb753cf028618ebf381cd9383f929b`. Es del run 16 |
| **`.aiw/docs/docs_index.json`** | **Intacto**, md5 `bc708a5847f66291ea1cd719eb6a0ecb` |
| **Los dos packets anteriores** | **Intactos**, md5 `1adf2a37…` y `806290576…`. Son evidencia de rondas ya ejecutadas |

**Material dejado preparado para el run 16, que este encargo no escribe:** el packet debe decir
que el desplegable ofrece **los tokens de la paleta activa acotados a los nueve del enum**, que
**un token que el operador añada a su paleta no aparecerá** —con la razón—, y que el valor
guardado sigue siendo el token id. Sigue pendiente todo lo de la §14 del record de medición y la
§10 del de reparación.

---

## 9. Criterios 9 y 11 — cifras medidas en esta sesión, ninguna heredada

### 9.1 Suite, lint y validador

| Métrica | Antes | Después |
|---|---|---|
| Suite `compiler-api` | **302/302**, EXIT 0 | **302/302**, EXIT 0 |
| `eslint` (editor-ui) | **EXIT 0** | **EXIT 0** |
| Validador (vía que no escribe) | **EXIT 0** | **EXIT 0** |
| **Objetivos / fases / runs** | **7 / 28 / 73** | **7 / 28 / 73** |
| **Component statuses** | **16** | **16** |
| `Docs indexed` | 149 | 149 |
| `Docs curated primary-visible` | 60 de 149 | 60 de 149 |
| Colas | `needs_human_decision=0 now=1 ready_next=20 later=37 history=15` | idéntico |
| Etapas del run activo | `RUN-JAME-WEB-HEADER-REVALIDATION-001=none` | idéntico |
| Avisos | **1 no bloqueante**, arista externa `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` | **el mismo, único** |

Comandos: `node --test "tools/author-lite/compiler-api/tests/*.test.mjs"`,
`npm --prefix tools/author-lite/editor-ui run lint`,
`node tools/project-console/validate-project-console-state.mjs`.
**No se corrió ninguna suite de `aiw-console`.**

**Sin cobertura nueva.** Este encargo no reparó, luego no añadió tests. **Ninguna aserción
existente se tocó ni se reescribió.** Los 302 son los mismos casos, verificados dos veces.

### 9.2 El experimento revertido — declarado entero

Para dar el **número** de tests rotos que el criterio 5 exige, en lugar de estimarlo, se aplicó
cada opción sobre el repo y se corrió la suite. **Cuatro archivos se modificaron temporalmente y
se restauraron desde copia de seguridad.** md5 antes y después:

| Archivo | md5 antes | md5 después | ¿Restaurado? |
|---|---|---|---|
| `editor-ui/src/schemas/draftSchema.js` | `79868230ab1c31a0adcb03fd88c00b12` | `79868230ab1c31a0adcb03fd88c00b12` | **Sí** |
| `compiler-api/schemas/draftSchema.js` | `9cfbe9ae6d9722b667657be30478e391` | `9cfbe9ae6d9722b667657be30478e391` | **Sí** |
| `…/constants/editorOptions.js` | `ae571c0c697ed41c884a85589ace7a69` | `ae571c0c697ed41c884a85589ace7a69` | **Sí** |
| `…/components/web/WebBlockEditor.jsx` | `984d5fe7e3e514f876bad0e9e2caf90f` | `984d5fe7e3e514f876bad0e9e2caf90f` | **Sí** |

**Su mtime sí se movió** (la restauración es una copia); **su contenido no**. Se declara porque
el barrido de mtime de §11 los devuelve y hay que saber por qué.

**Corrección honesta:** el primer intento de la opción B se parcheó con una expresión regular mal
escapada y **falló al cargar los 20 módulos de test**. Ese resultado era basura y **no se usó**.
Se rehízo con un parcheador en Node y dio la cifra real: **1 test roto**. La cifra de 20 archivos
en rojo no aparece en ninguna tabla de este record porque no medía nada.

---

## 10. Criterio 10 — la re-QA NO APLICA, y por qué

**No se escribió ningún packet de re-QA nuevo.**

El criterio 10 lo dice expresamente: «**Si el criterio 5 te hizo parar, la re-QA no aplica**:
entrega el informe de opciones y dilo». El criterio 5 paró este encargo. **Se dice.**

No habría nada que verificar: **este encargo no cambió ni una línea de código**. Una re-QA sobre
un repo byte-idéntico pediría al operador confirmar un cambio que no existe.

Los dos packets anteriores quedan **byte-idénticos** y se les cita como evidencia de las rondas
ya ejecutadas. No se editaron.

---

## 11. Criterio 15 — archivos escritos por este encargo, y ninguno más

Barrido de mtime de **todo el repo** de cantu-studio, no solo de los directorios esperados.

| # | Archivo | Acción |
|---|---|---|
| 1 | `../aiw-console/context/aiw-console/records/MEDICION-ENUM-HEADER-Y-INFORME-DE-OPCIONES-CANTU.md` | **Creado** — este record |

**Una sola fila.** Ningún archivo de código, schema, compiler, renderer, test, packet, índice ni
draft de cantu-studio fue modificado. Los archivos temporales de medición y las copias de
seguridad del experimento viven en el scratchpad de sesión, fuera de los dos repos.

El barrido devuelve además estas rutas, **ninguna mía en contenido**:

| Ruta | Por qué aparece |
|---|---|
| `.aiw/roadmap/roadmap.json`, `.aiw/docs/docs_index.json`, los seis de `.project/`, `docs/components/web/COLUMNS.md` | mtime **18:22:20 y anteriores** — la consola y el run 14, **antes de esta sesión**. md5 sin cambio |
| Los dos packets de Header | mtime de sesiones anteriores. md5 sin cambio |
| Los cuatro archivos de §9.2 | mtime movido por la **restauración** del experimento. **md5 idéntico al baseline** |

**Records existentes:** había **70** antes de éste. Éste es el **71**. **Sin colisión de nombre:**
ningún otro record contiene `ENUM`, `INFORME` ni `OPCIONES`; el único que contiene `PALETA` es
`CONTRATO-COLOR-Y-PALETA-CANTU.md`, de otro asunto y de otro nombre.

---

## 12. Criterio 16 — superficies disjuntas, md5 antes y después

| Ruta | md5 antes | md5 después | ¿Cambió? |
|---|---|---|---|
| cantu `.aiw/roadmap/roadmap.json` | `1dfcf17eccb7ec79b0864f040a5714b9` | `1dfcf17eccb7ec79b0864f040a5714b9` | **No** |
| cantu `.aiw/state/component_status.json` | `f591165bbf19862b04433129d9edf2cb` | `f591165bbf19862b04433129d9edf2cb` | **No** |
| cantu `.aiw/docs/docs_index.json` | `bc708a5847f66291ea1cd719eb6a0ecb` | `bc708a5847f66291ea1cd719eb6a0ecb` | **No** |
| cantu `docs/components/web/HEADER.md` | `90bb753cf028618ebf381cd9383f929b` | `90bb753cf028618ebf381cd9383f929b` | **No** |
| cantu packet de QA (ronda 1) | `1adf2a37eae904326ec2bcb15cf5eabd` | `1adf2a37eae904326ec2bcb15cf5eabd` | **No** |
| cantu packet de re-QA (ronda 2) | `806290576cc79c39994f5e7a630f7bc5` | `806290576cc79c39994f5e7a630f7bc5` | **No** |
| aiw-console `.aiw/roadmap/roadmap.json` | `08b9d813d6e3ee31aee464eb02294b61` | `08b9d813d6e3ee31aee464eb02294b61` | **No** |
| aiw-console `context/aiw-console/CONTRATO.md` | `f77ccec64d99f2048d4bde41638cb228` | `f77ccec64d99f2048d4bde41638cb228` | **No** |
| aiw-console `context/DECISIONES.md` | `0bdfe5a19ee0ce59b55526f2719a3088` | `0bdfe5a19ee0ce59b55526f2719a3088` | **No** |
| aiw-console `context/CLASIFICACION-DE-RUNS.md` | `3770e67255df2dce6ae1225367ebbcb4` | `3770e67255df2dce6ae1225367ebbcb4` | **No** |

**Nota honesta sobre `DECISIONES.md`:** su md5 es **distinto** del que registró el record de
reparación (`3f6bdf8816a0b43818519eb3582f6511`). **No fui yo** — nunca lo abrí para escribir; lo
tomé ya con este valor al empezar y lo dejé igual. Es el hilo paralelo trabajando sobre
`aiw-console`, exactamente como el criterio 16 advierte.

`roadmap/roadmap.json` de aiw-console, `context/aiw/`, `.project/` de aiw-console, handoffs,
tests y records existentes: **sin tocar**. **La paleta del operador en `cantu-lessons` se leyó y
no se escribió.**

### `.project/` de cantu-studio — criterio 14

**No se re-emitió.** Sus seis archivos tienen mtime **2026-07-30 18:22:20**, el mismo instante
atómico que `.aiw/roadmap/roadmap.json` — escritura de la consola al cerrar el run 14, **dos
horas antes de esta sesión**. Sus md5 difieren de los del record de medición por esa causa, no
por mí.

---

## 13. Criterio 13 — estado en que debe quedar el run

**`RUN-JAME-WEB-HEADER-REVALIDATION-001` debe quedar en `active`.**

Vocabulario del contrato, exclusivamente: `planned`, `active`, `blocked`, `completed`.

Razón: la medición está completa y el informe de opciones entregado, pero **el run espera una
decisión del operador sobre el enum**, no un impedimento. La cabina podría defender `blocked` —
el trabajo no avanza sin esa decisión—, y **se recomienda `active`** porque la vía normal es que
el operador lea el informe y elija, que es el curso previsto del run partido en tiempos, no un
bloqueo externo. Si el operador prefiere que la espera quede registrada como tal, `blocked` es
defendible; **la elección es suya y este encargo no la ejecuta.**

**No se tocó `status`, ni `progress`, ni `closeout_result` de ningún run.** El canónico está
byte-idéntico. El run 16 sigue `planned`.

---

## 14. Criterio 12 — cifras del ticket, verificadas y no creídas

| Cifra o afirmación del encargo | ¿Verificada? | Resultado |
|---|---|---|
| Suite **302** | sí, corriéndola dos veces | **cierta**, 302/302 EXIT 0 |
| **Component statuses: 16** | sí, dos veces | **cierta**, sin moverse |
| **Nueve opciones en el desplegable** | sí, ejecutando el código real | **cierta** |
| **Los nueve nombres de la captura** | sí, uno por uno | **ciertos los nueve**, transcritos bien |
| «cinco de la paleta y cuatro genéricos» | sí | **FALSA.** Los nueve son de la paleta (§2.5) |
| «no están todos los colores de su paleta» | sí | **CIERTA.** Faltan dos (§2.4) |
| «Header no se actualiza al cambiar la paleta» | sí | **FALSA en el mecanismo.** Header sí sigue la paleta; `iconList` es el que deja de seguirla (§4.3) |
| Hipótesis de la cabina: límite de schema | sí | **CONFIRMADA** (§2.6) |
| `card` e `iconList` sí reciben la paleta | sí | **cierta**, y ninguno tiene enum cerrado (§3) |
| `VariantSelect.jsx` compartido por seis | no re-medida — **no se tocó** | se hereda del record anterior, declarado como herencia |

---

## 15. No-claims de este record

- **No se reparó nada. Cero archivos de código, schema, compiler, renderer o test modificados**,
  aun habiendo medido tres defectos reales (§2.4, §4.3, §7).
- **No se amplió el enum `header.variant`** ni se tocó ningún schema. Las cuatro modificaciones
  temporales del experimento están restauradas y verificadas por md5 (§9.2).
- **No se tocó `VariantSelect.jsx`** ni ninguno de los otros once componentes sin paleta.
- **No se añadió el swatch de color** a Header. Es la opción C, recomendada y no ejecutada.
- **No se reparó `iconList`**, aunque su defecto medido es más grave que el de Header.
- **No se migró ningún draft** ni se reescribió ninguno. La paleta del operador se leyó, no se
  escribió.
- **No se editó el packet del componente** ni `.aiw/docs/docs_index.json`.
- **No se tocaron los dos packets anteriores.** Son evidencia de rondas ejecutadas.
- **No se escribió packet de re-QA**: el criterio 5 paró el encargo y el criterio 10 lo excluye.
- **No se tocó el mojibake**, ni «Full width», ni «Col span».
- **No se certifica nada.** Ningún status de componente cambió; su fuente sigue siendo la matriz.
- **No se editó el canónico**, ni status, ni orden de runs, ni `barrier`, ni la arista externa.
- **No se decide ninguna decisión abierta.** El informe de §5 **recomienda**; elegir es del
  operador.
- **No se ejecutó git en ninguna forma**, no se levantaron servidores, no se corrieron suites de
  `aiw-console`, y `.project/` no se re-emitió.
- **El run sigue abierto** hasta que el operador lo cierre desde la consola.
