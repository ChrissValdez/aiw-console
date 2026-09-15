# El prefijo es `cs-`, y el arnés de calibración entra

**Fecha:** 2026-09-15 · **Run:** `RUN-CANTU-RUNTIME-JAME-CLASS-RENAME-001` (`#201`)

> ⚠ **ESTAS DECISIONES SE TOMARON DENTRO DE LA SESIÓN DEL TALLER, NO POR LA CABINA.** Lo que
> sigue está **transcrito de lo que el taller reportó**, no de las palabras literales del
> operador, que la cabina no vio. **Si el operador las escribió de otro modo, manda su versión
> y este documento se corrige hacia adelante.**

---

## Por qué existe este documento

El contrato paró al taller **dos veces**, y las dos paradas eran correctas:
`REFERENCE-NAMING-DISPOSITION-AND-EXCLUSION.md` clasifica estos identificadores como
**RUNTIME / lockstep** (entradas 19 y 20) y dice **con qué** se mueven — pero **no dice a qué
nombre**. Su §7 lo declara sin ambigüedad: *«It decides nothing… It renames nothing and
authorizes no rename.»*

**Un contrato que congela la disposición y no el destino es exactamente un contrato bien
escrito**, no uno incompleto: separa «qué se mueve junto» de «cómo se llama», y la segunda es
una decisión de producto. Pero significa que **elegir el nombre no es ejecución, es decisión**,
y una decisión que solo vive en el chat de una sesión de taller está perdida.

---

## Decisión 1 · el prefijo destino es **`cs-`**

`jame-smart-formula-*` → `cs-smart-formula-*`, y `data-jame-active-layout` →
`data-cs-active-layout`. Ocho identificadores en total: siete clases y un atributo.

### La opción que el taller DESCARTÓ antes de preguntar, y por qué importa

**«Quitar el prefijo a secas» no era una opción neutra, y casi lo parecía.**
`data-active-layout` **sin prefijo YA EXISTE y está vivo** — lo emite
`SmartFormulaField.jsx:561` y lo casa `index.css:183`, y es un atributo **distinto** del que se
estaba renombrando. Quitar el prefijo habría **fusionado dos atributos en uno**, en silencio, y
sin que ninguna prueba lo notara.

**El taller lo midió y lo excluyó de las opciones ANTES de presentarlas.** Eso es exactamente
lo que debe hacer un ejecutor: una opción que destruye información no se ofrece como si fuera
una más. La guarda nueva fija que sigan siendo dos.

---

## Decisión 2 · los dos ficheros del arnés de calibración **ENTRAN**

`editor-ui/src/experiments/mathlive-keyboard-calibration/calibration.js` y
`editor-ui/mathlive-keyboard-calibration.html`. **El texto original del run, de 2026-08-01, no
los menciona en absoluto** — los encontró la remedición de la cabina del 2026-09-15.

### Lo que el taller midió antes de que la pregunta se pudiera contestar

| | |
|---|---|
| el `.html` | **autocontenido**: copia inline del CSS en un `<style>`, no enlaza `src/index.css`, no entra al build, no se lintea. Renombrar dentro **pinta idéntico antes y después** |
| el `.js` | sus 3 apariciones están **todas dentro de cadenas de CSS emitido** — el bloque que el autor copia y pega en `index.css`. **Nunca** hace `querySelector` ni `classList` con esos nombres |

**Así que renombrar no cambia lo que el arnés HACE. Cambia el texto que IMPRIME.**

### Y el argumento que decidió, que es el del propósito y no el del riesgo

La cabecera del arnés dice que **refleja el alcance y los selectores de producción**. Dejarlo
fuera no lo rompía — **lo convertía en un espejo que ya no refleja**, emitiendo CSS copiable
con selectores que no casan con nada. Un arnés que miente es peor que un arnés que no está,
porque sigue pareciendo utilizable.

**Lo que NO entró, y está bien que no entrara:** los 35 `--jame-*` de ese mismo `.html` son la
**entrada 22 del contrato**, aislada y distinta. Siguen intactos. Que dos cosas vivan en el
mismo fichero no las hace el mismo cambio.

---

## Lo que queda nombrado y NO se tocó

**`jame-inline-formula-field`** — `InlineFormulaField.jsx:253`. Una **octava** clase `jame-`
que el contrato **no lista en ninguna entrada** y que **no tiene matcher CSS en ningún sitio**.
El taller la dejó fuera con la razón correcta: no se deriva de la hoja de estilos, que era el
mecanismo del run.

> ⚠ **PERO EL RUN SIGUIENTE LA VA A ENCONTRAR, Y NO POR CASUALIDAD: `j-` ES PREFIJO DE
> `jame-`.** Un barrido del espacio de nombres `j-` de Core la arrastra sin que nadie lo
> decida.

### Decisión 3 · el operador la resuelve DENTRO del `#202`, sin run propio

**Decidido el 2026-09-15.** No se le abre run: es **un identificador, en un fichero, que hoy no
pinta nada** — un run entero cuesta más de lo que resuelve. Entra en el `full_description` del
run del `j-` de Core como **parada declarada**, apendizada por la cabina al abrirlo, con el
mismo mecanismo que se usó aquí.

**Lo que ese run tiene que contestar antes de barrer no es «cómo se renombra» sino si esa clase
debe existir.** Una clase que se aplica en el JSX y no la casa ningún CSS es, casi siempre, un
resto: alguien la quitó de la hoja y no del marcado, o la puso previendo un estilo que nunca se
escribió. Renombrarla la conservaría por inercia, y un barrido automático haría justo eso.

**Y va escrita en el run, no en una nota:** la diferencia es que un texto en el canónico lo lee
el taller al arrancar, y una nota depende de que alguien se acuerde. Esa distinción ya costó un
encargo en esta misma sesión.

---

## Y una cifra de la cabina que el taller tumbó

La cabina publicó **«85 apariciones»** en la remedición que apendizó al run. Eran **85
LÍNEAS**. Las ocurrencias reales son **92**, y la aritmética del taller cuadra al dígito:
1+23+9+12+3+5+5+1+26 = 85 líneas.

**La causa: `grep -c` cuenta líneas y la cabina lo rotuló «occurrences».** No fue una cifra
heredada ni copiada de una referencia caducada — fue **una medición propia y fresca, hecha con
el modo equivocado de la herramienta y publicada con la etiqueta de otra cosa**. Es la séptima
cifra de esta sesión que no sobrevive a la remedición y la primera que no vino de nadie más.

**La regla, y ya estaba escrita para otras herramientas:** antes de publicar el resultado de
una sonda, comprobar **qué unidad devuelve**, no solo si devuelve un número.
