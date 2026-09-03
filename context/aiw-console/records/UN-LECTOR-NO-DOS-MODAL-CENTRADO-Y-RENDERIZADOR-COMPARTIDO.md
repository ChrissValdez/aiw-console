# `#63` `RUN-CONSOLE-DOC-READER-MODAL-001` — un lector, no dos

**Medición fechada: 2026-09-02** · encargo de taller, entregado **sin commitear** (git es del
operador). Guarda de aborto verificada contra `roadmap/roadmap.json`: `queue_order: 63` →
`RUN-CONSOLE-DOC-READER-MODAL-001`, `status: "active"`.

**TRES RONDAS EN EL MISMO RUN.** La primera entregó la forma; el operador la abrió, la leyó y pidió
dos reparaciones el mismo día, y tres más después de leerlas. Las secciones **3.1**, **3.4** y **5**
llevan el estado **final**; la **§8** guarda la segunda ronda y la **§9** la tercera. Bases
verificadas antes de tocar nada en cada una: **783**, **795** y **800**.

```bash
cd projects/aiw-console && node -e "const r=require('./roadmap/roadmap.json');const runs=[];for(const o of r.objectives)for(const p of o.phases||[])for(const x of p.runs||[])runs.push(x);const x=runs.find(v=>v.queue_order===63);console.log(x.run_id,'|',x.status)"
# → RUN-CONSOLE-DOC-READER-MODAL-001 | active
```

El hallazgo que decide el método no es de estilo: **la consola YA leía documentos con un índice
a la izquierda** —su pestaña de Docs— y el `#62` construyó un **segundo** lector al lado sin
saberlo. El operador decidió que haya **uno**. Este run no re-estiliza el panel lateral: lo
**sustituye** por un modal centrado que reutiliza lo que la pestaña de Docs ya tiene.

---

## 1. GANA EL DISCO — las cifras del ticket, verificadas una a una

**Base de la suite:** el ticket dice 783/783/0. Verificada **antes** de tocar nada:

```bash
cd projects/aiw-console && node --test    # → tests 783 | pass 783 | fail 0
```

**Los cuatro patrones que el ticket dice que existen**, comprobados en el disco:

```bash
cd projects/aiw-console && grep -n "^\.edit-modal\|^\.edit-modal-overlay\|^\.drawer-overlay\|^\.docs-layout" project-console/assets/project-console.css
# → 1573:.docs-layout        2463:.drawer-overlay     2473:.drawer-overlay.open
# → 5532:.edit-modal-overlay 5539:.edit-modal         5558:.edit-modal.open
# → 5563:.edit-modal-body    6269:.docs-layout   ← el ticket no la nombra; ver §3.1
```

Los cuatro coinciden con lo medido por la cabina: `.edit-modal` centrado con
`min(1040px, 94vw)` y tope `92vh` en la capa 70, su velo en la 60; `.docs-layout` como rejilla
de `340px minmax(0, 1fr)`; `.drawer-overlay` como el velo ya en uso. **Ninguna cifra del ticket
resultó falsa** — pero la lista de la cabina estaba **incompleta**, y lo que faltaba cambió una
decisión de este run (§3.1).

**El género NO viaja como dato** (criterio 4 del ticket, verificado aquí y no creído):

```bash
cd projects/aiw-console && grep -n 'ia_bucket' tools/projector/project.mjs | grep directory
# → 1395:      transported.ia_bucket = directory === "." ? "root" : directory;
# → 1433:        ia_bucket: "curated grouping (…); else the document's directory",
# → 1480:        ia_bucket: directory === "." ? "root" : directory
node -e "const j=require('./tests/fixtures/doc-reader/.project/docs_index.json');console.log([...new Set(j.docs.map(d=>d.ia_bucket))])"
# → [ 'docs' ]
```

`ia_bucket` se **deriva** del directorio del documento; vale `docs` para los tres y no
distingue ninguno. Decidir que «Contrato» es una etiqueta **leyendo la palabra** sería
interpretación de dominio, y está prohibido. Queda pinchado por prueba con nombre.

---

## 2. LA PARADA QUE NO SE ACTIVÓ, y por qué — con la medición

El ticket para si reutilizar el renderizador o la disposición de la pestaña de Docs **exige
editar código compartido**. **No lo exige.** Medido cargando el script de la consola en un
contexto aislado, antes de escribir una línea:

```bash
cd projects/aiw-console && node --input-type=module -e "import vm from 'node:vm';import {readFileSync} from 'node:fs';const c={console,setTimeout,clearTimeout,document:{getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],addEventListener(){},readyState:'complete'},fetch:async()=>null,location:{href:'http://x/',search:'',hash:'',pathname:'/'},localStorage:{getItem:()=>null,setItem(){},removeItem(){}},navigator:{userAgent:'node'},history:{replaceState(){},pushState(){}},requestAnimationFrame:f=>setTimeout(f,0),URL,URLSearchParams};c.window=c;vm.createContext(c);vm.runInContext(readFileSync('project-console/assets/project-console.js','utf8'),c);console.log('renderDocBodyContent:',typeof c.renderDocBodyContent)"
# → renderDocBodyContent: function
```

`renderDocBodyContent` es una **declaración de nivel superior** del script de la consola, así
que en la página es un global de `window`. El lector lo **busca en el momento de la llamada**
—nunca al cargar, porque va con `defer` **antes** del script que lo declara— y lo llama. **Cero
bytes editados en `project-console.js` y en `project-console.css`.** No hubo bifurcación y no
hubo parada.

---

## 3. LO QUE SE HIZO

### 3.1 La forma: un modal centrado, compuesto de cuatro patrones y ningún quinto

`index.html` deja de montar un `<aside class="doc-side-reader" role="complementary">` pegado al
borde derecho y monta un `role="dialog" aria-modal="true"` con la geometría del modal de
edición y, dentro, la rejilla y las dos columnas de la pestaña de Docs **por clase**:

```
<div id="doc-side-reader-overlay" class="drawer-overlay dsr-overlay">     ← el velo de siempre
<aside id="doc-side-reader" class="dsr-modal" role="dialog" aria-modal>
  <div class="dsr-bar"> … nombre · etiqueta · ruta · «Read only» · Cerrar
  <div class="dsr-layout docs-layout">                                    ← la rejilla del tab
    <div id="doc-side-reader-index" class="docs-nav dsr-nav">             ← el índice, izquierda
      <div id="doc-side-reader-docs">        ← los documentos del proyecto, y NADA más (§9.2)
    <div id="doc-side-reader-scroll" class="docs-reader dsr-scroll">      ← el documento, derecha
      <div id="doc-side-reader-body" class="docs-reader-inner dsr-measure">   ← el tope de medida (§9.3)
```

**La hoja del lector no declara NADA para un selector compartido — ni siquiera para deshacer
algo.** Eso costó una medición, y la medición vale la pena guardarla porque **corrige un primer
borrador de este mismo run**.

La regla de la 1573 sí lleva cromo de página que un diálogo no puede usar —altura contra el
*viewport* y margen negativo—, así que la primera versión de esta hoja llevaba un bloque acotado
`.dsr-modal .docs-layout` que lo deshacía. **Ese bloque no cambiaba nada.** La pestaña de Docs
declara `.docs-layout` **dos veces**, y la segunda —nivel superior, misma especificidad, más
abajo en la cascada, escrita para el defecto del banner de la propia pestaña— ya pone
`height: auto`, `margin: 0`, `flex: 1 1 auto` y `min-height: 0`, que es exactamente lo que un
diálogo acotado en columna flexible necesita:

```bash
cd projects/aiw-console && node -e "const s=require('fs').readFileSync('project-console/assets/project-console.css','utf8');const r=[...s.matchAll(/(^|\n)\.docs-layout\s*\{([^}]*)\}/g)];console.log('reglas de nivel superior:',r.length);r.forEach((m,i)=>console.log('--- '+(i+1)+' ---'+m[2].replace(/\s+/g,' ')))"
# → reglas de nivel superior: 2
# → --- 1 --- display: grid; grid-template-columns: 340px minmax(0, 1fr); gap: 0; height: calc(100vh - 48px); margin: -28px -32px;
# → --- 2 --- flex: 1 1 auto; min-height: 0; height: auto; margin: 0;
```

Y es responsiva por su cuenta: a 1040 px estrecha el índice a 260 px, y a 720 px apila las dos
zonas. Así que **el bloque acotado se borró y el `@media` propio del lector también.** Una regla
que repite lo que la cascada ya dice es una segunda respuesta esperando a divergir de la primera
—el defecto de este run entero, un piso más abajo.

**El tamaño lo declara este lector y no el patrón** (revisado en la QA, §8): la geometría del
modal de edición es el **idiom**a —centrado, capa, colores, la forma `min(px, vw)`— pero sus
1040 px son para una columna de campos, no para un lector que gasta 340 en el índice. `.dsr-modal`
declara `min(1760px, 96vw)` × `94vh` **en su propia clase**; `.edit-modal` queda intacto.

Medido en el navegador real, con la consola servida en `127.0.0.1:8788`, **ya sin la anulación** y
con el tamaño de la QA:

| *viewport* | modal | columna del índice | columna de lectura | desborde |
|---|---|---|---|---|
| 1280 × 720 | **1229 × 677** en `x:26, y:22` — **centrado exacto** en ambos ejes; 1229 = 96 vw, 677 = 94 vh | 340 px, `overflow-y: auto` | **887 px** (texto 785) | ninguno |
| 1920 × 1080 | **1760** × 1015 — el tope muerde 83 px sobre los 1843 de 96 vw | 340 px | **1418 px** (texto 1316) | ninguno |
| 900 × 700 | 846 (94 vw, medida anterior) | **260 px** (punto de corte de la pestaña) | 584 px | ninguno |
| 700 × 700 | 658 (94 vw, medida anterior) | 656 px **arriba**, desplazador propio, 325 filas | 656 px **abajo**, desplazador propio | ninguno |

Velo en la capa 65 y modal en la 70, con el `.open` de siempre. La rejilla mide su alto del
diálogo y no del *viewport*, y margen 0, **sin una sola declaración de este lector**.

### 3.2 El índice ya no se pierde — y esto es el run entero

Las dos columnas tienen **desplazadores propios**, y la lista y las secciones son **dos bloques
que se escriben por separado**: la lista sólo se reescribe cuando **cambia**, porque volver a
asignarla reiniciaría el desplazamiento de la columna y le quitaría al operador su lugar en una
lista de cientos —el mismo defecto un piso más abajo.

Medido en el navegador, sobre el corpus real (325 documentos indexados), dejando el índice
desplazado en 900 px y pulsando **la última** entrada de secciones:

| después del salto | valor |
|---|---|
| documento | `scrollTop` 0 → **32 235 px** (saltó) |
| índice | `scrollTop` **900 → 900** (no se movió un píxel) |
| secciones en pantalla | 39, sin reescribir |
| documentos en pantalla | 325, sin reescribir |
| desplazamiento de la página | 0 |

### 3.3 Un renderizador, y se puede probar byte a byte

El cuerpo lo pinta `renderDocBodyContent`, el mismo punto de entrada con el que la pestaña de
Docs pinta su propio lector, dentro del mismo contenedor `.docs-body`. El índice de secciones se
**lee de vuelta de esa pintura**: se recorren los encabezados que el renderizador emitió y se les
estampa un id posicional al pasar. **Un solo análisis del documento**, así que el índice y el
cuerpo no pueden discrepar sobre cuál encabezado es cuál.

La prueba que ninguna bifurcación sobreviviría un asalto: se toma el documento pintado en el
lector, se le quitan los ids estampados, y lo que queda debe ser **idéntico** a lo que la
pestaña de Docs habría pintado del mismo archivo. Nueve encabezados, nueve estampas, ni una más.

Del `#62` desaparecen, no quedan dormidos: `dsrParseDocument`, `dsrInline` y toda la hoja de
tipografía de cuerpo que necesitaban —`.dsr-h` y sus seis niveles, `.dsr-code`, `.dsr-table*`,
`.dsr-document*`, `.dsr-link-text`—. La hoja pasa de 537 a 460 líneas **con** una cabecera nueva
más larga.

### 3.4 La fila del listado, partida sólo por posición

La fila imprimía título y ruta casi al mismo peso. Ahora el nombre se lee claramente más grande
que la ruta y **la versión se separa a la derecha de la fila**, con la **misma** píldora que la
cabecera ya lleva para la misma cola. El corte es el del `#62`, `dsrSplitTitle`: lo que sigue al
**último** separador, por dónde está y nunca por lo que dice, con su guarda de longitud intacta.
**La palabra inicial no se parte**: sería decidir un género leyéndolo, y el género no viaja como
dato (§1).

Medido en el navegador contra el índice real del emisor (`cantu-quizzes-latex`):

| nombre | versión | ruta |
|---|---|---|
| `Contrato — Reporte de cambios de un run` | `v1` | `docs/CONTRATO-REPORTE-DE-CAMBIOS-v1.md` |
| `Perfil de dominio — reportes de …` | `v1` | `docs/PERFIL-REPORTE-QUIZZES-v1.md` |
| `Rúbrica de niveles y de calidad — Banco de Preguntas PAA` | *(vacía, no pinta nada)* | `docs/RUBRICA-DE-NIVELES.md` |

Título 14 px contra ruta 11 px; la píldora termina en `x:427` y la fila en `x:440` —los 12 px de
relleno y el borde—, es decir **a la derecha de la fila**, como pidió el operador.

**La fila ya no es una tarjeta** (revisado en la QA, §8): el recuadro se fue y la fila **viste**
`docs-nav-item`, la clase del nav de la pestaña de Docs. Lo único que el nombre entregó es su
**color**, y entregarlo es lo que le permite tomar el tono del nav: apagado en reposo, claro bajo
el cursor y acento cuando es el documento abierto.

**Y la ruta ya no va debajo del nombre** (tercera ronda, §9.1): la fila es **título y etiqueta de
versión**, una línea, que es exactamente la forma que el nav ya dispone —de ahí que la fila hoy no
declare ni una propiedad propia—. La ruta no se perdió: vive en la cabecera del diálogo, bajo el
nombre del documento **abierto**, que es donde una ruta se lee para comprobar una cita. La tabla
de arriba conserva su valor como medición del **corte por posición**, que es lo que no cambió.

---

## 4. LO QUE LA REUTILIZACIÓN COSTÓ — y hay que decirlo, no esconderlo

El renderizador compartido acota los encabezados a `h2/h3/h4`
(`Math.min(nivel + 1, 4)`), de modo que **los niveles markdown 3, 4, 5 y 6 comparten el más
profundo**. La escala de seis niveles que el `#62` declaró en su QA se va con el segundo
renderizador que la sostenía: el cuerpo lee ahora 26 / 22 / 20 px sobre un cuerpo de 18 px —la
escala de la pestaña de Docs—, y el riel de secciones baja de seis niveles a tres.

Medido sobre los **481 documentos** que los tres índices de proyecto declaran:

```bash
cd .. && node -e "const fs=require('fs'),path=require('path');const roots=['projects/aiw-console','projects/cantu-quizzes-latex','projects/cantu-studio'];let t={},files=0;for(const r of roots){let j;try{j=JSON.parse(fs.readFileSync(path.join(r,'.project/docs_index.json'),'utf8'))}catch(e){continue}for(const d of (j.docs||[])){let raw;try{raw=fs.readFileSync(path.join(r,d.path),'utf8')}catch(e){continue}files++;let f='';for(const line of raw.split(/\r?\n/)){const s=line.trim();const fm=/^(\`\`\`+|~~~+)/.exec(s);if(f){if(fm&&s.startsWith(f))f='';continue}if(fm){f=fm[1];continue}const h=/^(#{1,6})\s+\S/.exec(s);if(h)t[h[1].length]=(t[h[1].length]||0)+1}}}console.log('archivos',files,'| por nivel',JSON.stringify(t))"
# → archivos 481 | por nivel {"1":648,"2":4623,"3":3397,"4":111,"5":6}
```

**8 785 encabezados en total; 117 en los niveles 4 a 6.** Ésos son los que pierden distinción
respecto del nivel 3. Recuperar los seis niveles exige **un segundo renderizador**, que es
exactamente el defecto que este run deshace, o subir el tope dentro de `renderDocMarkdownLite`,
que es la pestaña de Docs y **está fuera de alcance**. Se deja medido y **no se decide**.

---

## 5. LO QUE EL `#62` DECIDIÓ Y EL OPERADOR NO REABRIÓ — sigue en pie, cada cosa pinchada

| regla | dónde se prueba |
|---|---|
| resolución de sección por **cadena completa** (nunca prefijo, subcadena ni «lo más cercano») | `criterion 4: resolution is a WHOLE-string match` |
| citas en prosa **sin enlazar y diciéndolo** | `criterion 4: the renderer marks a citation that travels as DATA…` |
| **sólo lectura**: sin campo, sin formulario, sin ruta de escritura | `criterion 3: the reader is READ ONLY…` |
| un documento ilegible **nombra el archivo y el porqué** | `criterion 5: …declares WHICH file and WHY` |
| el reporte **no se mueve ni pierde el lugar** del operador | `criterion 1: …exactly where it was` |
| el velo es el del cajón, y **no se redefine** | `QA 3: the veil is the console's EXISTING overlay pattern` |
| la ceguera de dominio, mecánica, 175 agujas | `criterion 6: not one word of any fixture's domain…` |

Comprobado en el navegador tras la tercera ronda: una cita que **no** resuelve dice «The
citation's section could not be resolved, so the document opened at its beginning instead of
jumping to it.», nombra `6.4 y algo mas` **verbatim** y no salta (`scrollTop` 0).

**El aterrizaje cambió y la regla no.** Ya no cae sobre un índice de secciones —el operador lo
retiró sabiendo el precio (§9.2)— sino al principio del documento. Nombrar la sección que no pudo
resolver es la regla, y no se debilitó: sigue pinchada, y ahora la prueba también dice **dónde**
aterriza, para que ese aterrizaje sea una decisión escrita y no una regresión silenciosa.

---

## 6. LA SUITE

```bash
cd projects/aiw-console && node --test    # → tests 804 | pass 804 | fail 0
```

**804/804/0.** Tres rondas: **783 → 795** en la primera, **795 → 800** en la segunda (§8) y
**800 → 804** en la tercera (§9), cada base verificada en disco antes de tocar nada.

De la primera ronda, **doce pruebas nuevas** (+12 exactos en la suite entera): cuatro para el
modal centrado y el índice que no se pierde, cuatro para el renderizador único —incluida la
comparación **byte a byte** contra lo que la pestaña de Docs habría pintado, y la negativa a
hacerse uno propio cuando falta—, una para que el panel lateral **no** quede dormido, dos para la
jerarquía de la fila y su corte posicional, y una que prueba que **ni una** regla de tipografía
de cuerpo sobrevive en la hoja del lector. La prueba de la rejilla pincha además **las dos**
reglas `.docs-layout` de la pestaña, de modo que el día que la segunda desaparezca la suite dirá
que el diálogo ya necesita la suya.

`git status` acota el trabajo a los cuatro archivos del alcance:

```bash
cd projects/aiw-console && git status --porcelain
# →  M project-console/assets/doc-side-reader.css
# →  M project-console/assets/doc-side-reader.js
# →  M project-console/index.html
# →  M tests/doc-side-reader.test.mjs
```

Ni un byte en `serve.mjs`, en `project-console.js`, en `project-console.css`, en el roadmap ni
en `.project/`. **Sin commitear.**

---

## 7. LO QUE QUEDA PARA EL OPERADOR

1. **El veredicto visual es suyo.** Abrir una cita, leer la regla con el índice al lado, y
   decir si se lee.
2. **El tope de tres niveles** del §4: 117 encabezados de 8 785 pierden distinción. Subirlo es
   tocar la pestaña de Docs, que este encargo no puede rediseñar. Encuadrado, no decidido.
3. ~~**El ancho.**~~ **Resuelto en la QA** (§8): `min(1760px, 96vw)` × `94vh`, columna de lectura
   de 887 px a 1280 y 1418 px a 1920. El tope de 1760 es el único número elegido, y está
   justificado en la §8.
4. **El id del elemento** sigue siendo `doc-side-reader` y el archivo sigue llamándose
   `doc-side-reader.js`: renombrarlos toca `project-console.js`, fuera de alcance. Las clases y
   los comentarios sí dicen ya lo que la superficie es.

---

## 8. LA QA DEL OPERADOR — dos reparaciones, mismo run

**2026-09-02, después de leer la primera entrega.** Base verificada antes de tocar nada:

```bash
cd projects/aiw-console && node --test    # → tests 795 | pass 795 | fail 0
```

### 8.1 «Quedó muy chico el modal»

Palabras del operador: «quedó muy chico el modal, que consuma casi toda la página para que
aproveche bien el espacio». La §7.3 de este mismo record ya lo había encuadrado: el modal tomaba
`min(1040px, 94vw)` **porque era la medida que el diálogo de la consola ya tenía**, no porque se
hubiera elegido, y de esos 1040 px 340 son el índice.

Ahora **`.dsr-modal` declara su propio tamaño**, `min(1760px, 96vw)` × `94vh`, **en su propia
clase**. `.edit-modal` no se toca: el editor del cajón y otras superficies se dimensionan con él y
redimensionarlas no es asunto de este encargo. Lo que se sigue **componiendo** de ese patrón es el
idioma —el centrado por `translate`, la capa 70, los colores del panel, la sombra, y la propia
forma `min(px, vw)`—, y la prueba lee los dos valores del patrón para que una edición ajena falle
aquí.

**El tope de 1760 px es el único número elegido, y se justifica:** es el 96 vw de un *viewport* de
**1833 px**, así que en cualquier escritorio corriente hasta 1080p el diálogo es 96 vw puro y el
tope no se ve; sólo detiene el crecimiento en pantallas ultra anchas. Es generoso a propósito,
porque el operador ya decidió esta pregunta una vez en la propia pestaña de Docs, donde el panel
de lectura «starts against the navigation and fills the full remaining width (operator preference:
no wasted right margin)». Un ancho de lectura estrecho sería contradecirlo dos veces.

Medido en el navegador (§3.1 lleva la tabla completa):

| *viewport* | modal | columna de lectura | antes |
|---|---|---|---|
| 1280 × 720 | 1229 × 677 | **887 px** (texto 785) | 698 px |
| 1920 × 1080 | 1760 × 1015 | **1418 px** (texto 1316) | — |

### 8.2 «No se ve un menú limpio»

Palabras del operador: «esa parte, texto, recuadros y luego texto, no se ve un menú limpio». La
medición de la cabina de las 18:36, **verificada en disco y no creída**:

```bash
cd projects/aiw-console && sed -n '1597,1626p' project-console/assets/project-console.css
# → .docs-nav-item { … border: 0; border-left: 3px solid transparent; background: transparent; … padding: 8px 20px; }
# → .docs-nav-item:hover  { background: var(--bg-subtle); color: var(--text-primary); }
# → .docs-nav-item.active { border-left-color: var(--accent); background: var(--accent-bg); color: var(--accent); font-weight: 600; }
```

La fila del lector, en cambio, dibujaba una **tarjeta**: `border: 1px`, `background: var(--bg-subtle)`,
`border-radius: var(--radius-md)` y `margin-bottom: 6px` entre cada una. De ahí el sándwich —una
línea de prosa, una pila de recuadros, otra línea de prosa.

**La fila VISTE `docs-nav-item`** y esta hoja no declara nada para ella. El fondo transparente, el
borde ausente, la barra de 3 px, el *hover* y el estado activo llegan de la única regla que ya los
posee, así que no hay copia que pueda divergir. Antes de vestirla se verificó que ninguna consulta
compartida la alcanza:

```bash
cd projects/aiw-console && grep -n 'querySelectorAll(".docs-nav-item")' project-console/assets/project-console.js
# → 2556:  nav.querySelectorAll(".docs-nav-item").forEach((button) => {
# → 2558:      nav.querySelectorAll(".docs-nav-item").forEach((item) => item.classList.remove("active"));
```

Las dos están acotadas a `nav = byId("docs-nav-list")` —el elemento de la pestaña—, y las reglas
CSS 1680 y 1694 exigen un ancestro `.docs-nav-group-items` que estas filas no tienen. **Ninguna
condición de parada.** Comprobado en el navegador, la fila responde `matches('.docs-nav-item')` y
su relleno calculado es `8px 20px`, el de la pestaña y no el de las reglas de grupo.

Medido en el navegador, fila en reposo contra fila activa:

| | borde izquierdo | fondo | radio | borde | color del nombre |
|---|---|---|---|---|---|
| en reposo | 3 px **transparente** | **transparente** | **0** | **0** | `#aab8c5` (secundario) |
| activa | 3 px `#8f9aec` (`--accent`) | `rgba(91,105,188,.14)` (`--accent-bg`) | **0** | **0** | `#8f9aec` (acento) |

**El estado activo es nuevo** y es lo que faltaba para que el menú fuese un menú: el documento
abierto se marca con la palabra que esa regla ya usa, `active`. Se marca **al pulsar**, antes de
leer el archivo, y se marca también cuando el documento no se puede leer —es el que el operador
pidió—; una ruta fuera del índice no marca ninguna fila, porque ninguna la lleva.

Y marcarlo **no le quita el sitio al operador**. La lista ahora sí cambia entre un documento y el
siguiente, así que el desplazamiento de la columna se lee antes de escribir y se repone después.
Medido con 325 documentos y la columna a 1400 px: abrir otro documento dejó el desplazamiento en
**1400**, movió la marca a la fila nueva y mantuvo las 325 filas. La suite pincha además que hay
**una escritura por documento abierto, nunca dos**, y **ninguna** al reabrir el mismo.

### 8.3 El pan, degradado y no borrado

El recuento y la procedencia **conservan sus palabras** —«325 documents indexed by this project» y
«Listed by `.project/docs_index.json`, and nothing outside it can be opened here»— y pierden peso:
el recuento baja a 11,5 px como leyenda, y la procedencia a 11 px bajo una línea de pelo, al pie
del menú. Las dos toman el mismo inset de 20 px que las filas heredan del nav, y el riel de
secciones también, de modo que la columna se lee sobre **un solo borde izquierdo**. La lista en sí
no añade inset: las filas van de borde a borde para que la barra activa quede a ras, como en la
pestaña.

### 8.4 Lo que NO cambió

Verificado en el navegador después de las dos reparaciones: un renderizador
(`article.docs-body`, 39 encabezados estampados); el índice quieto en 900 px mientras el documento
saltaba a 26 397; la página sin moverse; una cita que resuelve y salta; una que no, que lo dice y
nombra `6.4 y algo mas` verbatim sin saltar; **cero** campos, formularios o áreas editables. El
tope de tres niveles del §4 queda **fuera de alcance** y sin decidir, como pide el encargo.

### 8.5 La suite y el alcance

```bash
cd projects/aiw-console && node --test    # → tests 800 | pass 800 | fail 0
```

**800/800/0**, base 795. **Cinco pruebas más**: la fila que viste el nav y no declara tarjeta
—leyendo de la regla compartida que no dibuja caja, y de la propia que sólo apila dos líneas—; el
estado activo en sus cinco casos; el pan degradado sin perder palabras ni la línea de pelo; la
jerarquía que sobrevive al cambio de estilo; y la escritura única por documento. Dos pruebas
existentes se reescribieron a la verdad nueva: la del tamaño del diálogo, que ahora pincha la
**separación** del patrón junto a lo que sigue componiendo de él, y la de la lista, que ahora
pincha lo que de verdad importa —que la columna no se mueve— en vez de que la lista no se toque.

La prueba del criterio 6 se endureció de paso: compara sobre la hoja **sin comentarios**, porque
«no declara nada compartido» es una afirmación sobre **reglas**, y este archivo nombra selectores
compartidos en prosa todo el tiempo para decir cuál viste y cuál no debe tocar. Con la hoja cruda,
la aserción habría prohibido la documentación en vez de la declaración.

```bash
cd projects/aiw-console && git status --porcelain
# →  M project-console/assets/doc-side-reader.css
# →  M project-console/assets/doc-side-reader.js
# →  M project-console/index.html
# →  M tests/doc-side-reader.test.mjs
```

`index.html` sólo lleva lo de la primera ronda: las filas las pinta el lector, así que las dos
reparaciones caben en su `.js` y su `.css`. Ni un byte en `serve.mjs`, `project-console.js`,
`project-console.css`, roadmap ni `.project/`. **Sin commitear.**

---

## 9. LA SEGUNDA QA DEL OPERADOR — tres reparaciones más, mismo run

**2026-09-02, después de leer la segunda entrega.** Base verificada antes de tocar nada:

```bash
cd projects/aiw-console && node --test    # → tests 800 | pass 800 | fail 0
```

### 9.1 La ruta sale de la fila

«que solo tenga titulo y nota, que no venga la ruta abajo del nombre». La fila es ahora **una
línea**: el nombre y, a su derecha, la etiqueta de versión. La ruta sigue **en la fila como dato**
—es el asa por la que viaja el clic, `data-dsr-doc`— pero ya no se imprime.

**No se perdió: se movió a donde una ruta se lee.** Es lo que hace comprobable una cita, así que
vive en la cabecera del diálogo, bajo el nombre del documento **abierto** — una ruta a la vista en
vez de 325.

Y con la segunda línea se fue lo último que la fila declaraba: al quedar en una sola línea, su
forma es **exactamente** la que `docs-nav-item` ya dispone (`display: flex`, centrado,
`justify-content: space-between`, `gap: 8px`), de modo que **la regla `.dsr-doc-row` se borró**.
La fila no declara ni una propiedad: cada píxel suyo es de la pestaña.

**Lo que la ruta costaba, medido:** era el desempate cuando dos documentos comparten título. Hoy
no desempata nada.

```bash
cd projects/aiw-console && node -e "const j=require('./.project/docs_index.json');const m={};for(const d of j.docs){const t=(d.title||d.path).trim();(m[t]=m[t]||[]).push(d.path)}const dup=Object.values(m).filter(v=>v.length>1);console.log('documentos',j.docs.length,'| titulos distintos',Object.keys(m).length,'| repetidos',dup.length)"
# → documentos 325 | titulos distintos 325 | repetidos 0
```

**Cero títulos repetidos en los 325 documentos**, así que quitarla no introduce ninguna
ambigüedad hoy. Si algún día dos documentos comparten título, la volverá a introducir; queda
dicho aquí y no decidido.

### 9.2 El riel de secciones se retira

«aqui estas manejando un sistema de documentos a la izquierda y secciones a la izquierda mas
abajo, no me gusta, quita las secciones». La columna izquierda lista **documentos y nada más**.

Se fue **entero y no dormido**: el constructor `dsrSectionIndexHtml`, el elemento
`#doc-side-reader-sections` de la página, el delegado que escuchaba `[data-dsr-section]` y las
reglas que lo pintaban —su caja, su título, sus ítems, su *hover* y sus tres niveles—. Los
encabezados **se siguen leyendo y estampando**: son contra lo que resuelve una cita, y el salto
no se tocó.

**EL PRECIO, QUE EL OPERADOR ACEPTÓ SABIÉNDOLO.** Las citas cuya sección no resuelve aterrizaban
sobre ese riel. Ahora aterrizan **al principio del documento**. Eso es comportamiento correcto y
no una regresión, y su prueba lo dice con esas palabras: sigue abriendo el documento, sigue
negándose a adivinar y sigue **nombrando la sección verbatim**. La frase en pantalla se corrigió
para que no mienta — «…so the document opened at its beginning instead of jumping to it».

Comprobado en el navegador: `#doc-side-reader-sections` **no existe**, hay **0** controles
`[data-dsr-section]` en todo el diálogo, y la columna izquierda tiene **un solo bloque** con sus
325 filas.

### 9.3 La medida de lectura — la hipótesis se verificó, y era cierta

La cabina propuso que las líneas corrían demasiado largas. **Medido antes de creerlo**, en el
navegador, sobre la columna del propio lector a *viewport* 1920:

| | ancho del texto | mediana CPL | P25 | P75 |
|---|---|---|---|---|
| **antes** | 1316 px | **137** | 123 | 147 |
| **después** | 640 px | **69** | 64 | 73 |

La banda cómoda para prosa continua es **45–75 caracteres**; 137 era casi el doble de su techo.
La causa era real y era la longitud: **no** el interlineado (30,6 px sobre 18 px, es decir 1,7,
generoso) ni el tamaño. Así que se capa la longitud y nada más.

**El número se eligió midiendo, no calculando.** Convertir un tope a caracteres a mano se
equivoca: aquí 1ch mide 9,70 px mientras el carácter medio de esta prosa mide 7,92 px, y esa
razón predecía 76 caracteres para un tope que renderiza 64. Se aplicaron cinco topes a un
documento real y se leyó el resultado:

| tope | ancho de prosa | mediana CPL | P75 CPL |
|---|---|---|---|
| sin tope | 1316 px | 137 | 147 |
| 62ch | 602 px | 64 | 68 |
| **66ch** | **640 px** | **69** | **73** ← elegido |
| 70ch | 679 px | 72 | 77 |
| 74ch | 718 px | 77 | 82 |

**66ch es el tope más ancho cuyo cuartil superior sigue dentro de la banda**, no sólo su mediana:
a 70ch los párrafos largos ya corren a 77. Elegir por la mediana sola habría dejado fuera una
cuarta parte de la lectura del operador.

**Capa la prosa y nada más.** Las tablas y el código también se midieron: no se leen en líneas
—las tablas se estiran a lo que se les dé y el bloque de código más ancho de ese documento mide
**9317 px** y ya desborda con su propio desplazador—, así que capearlos no compraría nada y
costaría desplazamiento horizontal en contenido que hoy cabe. Los bloques anchos siguen tomando
la columna entera (tabla 1314 px de un artículo de 1316), y el espacio que el operador pidió
aprovechar lo aprovecha exactamente el contenido que lo necesita.

Los **encabezados tampoco se capan, y eso es una medición y no un olvido**: **ninguno de los 39**
de ese documento envuelve ni siquiera a 1316 px, de modo que un tope sobre ellos no cambiaría
nada de lo que hay en pantalla.

**Y el tope es de este lector.** `.dsr-measure` sólo existe en el marcado de este diálogo, así que
la restricción no puede alcanzar la pestaña de Docs: sus 18 px de lectura y su escala de 26/22/20
siguen exactamente donde estaban, y su panel de lectura conserva `margin: 0` sin tope alguno. **La
condición de parada de esta reparación no se activó**: no hizo falta tocar `.docs-body` ni ninguna
regla compartida.

### 9.4 Lo que NO cambió

Verificado en el navegador después de las tres reparaciones: un renderizador (`article.docs-body`,
**39** encabezados estampados); el índice quieto en **900 px** mientras una cita resuelta llevaba
el documento a 17 855; una cita que no resuelve diciéndolo, nombrando `6.4 y algo mas` verbatim y
aterrizando en 0; **cero** campos, formularios o áreas editables; y la procedencia nombrando
`.project/docs_index.json` con su promesa.

### 9.5 La suite y el alcance

```bash
cd projects/aiw-console && node --test    # → tests 804 | pass 804 | fail 0
```

**804/804/0**, base 800. **Cuatro pruebas más** y **nueve reescritas** a la verdad nueva. De las
nuevas: la ruta que sale de la fila y la que se queda en la cabecera; el tope de medida con su
número medido; y que el tope alcanza la prosa y deja los bloques anchos. De las reescritas, la que
importa es la de la cita irresoluble: ahora pincha **dónde aterriza**, para que el aterrizaje al
principio del documento sea una decisión escrita y no una regresión que nadie note.

Dos pruebas pasaron de pinchar una presencia a pinchar una **ausencia** —el riel y la regla de la
fila—, porque en este run un resto dormido ya es el defecto conocido.

**Y el veto de dominio hizo su trabajo durante la ronda:** el primer intento citaba al operador
con la palabra «facilitar», que contiene la aguja `facil` del corpus de fixtures, y la suite
rechazó el archivo. La cita se cortó donde termina la instrucción y el resto se dijo en inglés.

```bash
cd projects/aiw-console && git status --porcelain
# →  M project-console/assets/doc-side-reader.css
# →  M project-console/assets/doc-side-reader.js
# →  M project-console/index.html
# →  M tests/doc-side-reader.test.mjs
```

Ni un byte en `serve.mjs`, `project-console.js`, `project-console.css`, roadmap ni `.project/`.
**Sin commitear.**
