# VEREDICTO — `#184` «Close the allowlist gaps…» · y el hallazgo del teclado

**Fecha: 2026-09-05** · **Run:** `RUN-CANTU-MATH-ALLOWLIST-ALIAS-GAP-001`
**Commit del trabajo:** `aa5e7bbb`

---

## El veredicto, VERBATIM

```
hice el QA pasa
pero tengo un problema

el teclado matematico inserta los simbolos de < y no me lo acepta

es decir, lo que acepta no coincide con lo que inserta el teclado matematico
Y tdoo lo del teclado matematico debe aceptarlo o corrije el formato en el que inserta los simbolos el teclado (no cambiar lo que inserta solo a un formato valido) o que acepte lo que ya inserta el teclado
```

**`pass` sobre `#184`**, QA de pantalla ejecutada con el paso 0 de cerrar y reabrir el lanzador.
**Y un hallazgo nuevo pegado al veredicto**, que no es de este run y abre otro.

---

## Lo que `#184` cierra

**Desde hoy se puede escribir una desigualdad estricta.** Hasta ahora no había forma: el carácter
crudo lo vetaba la seguridad y sus dos escapes LaTeX no estaban admitidos.

Verificado por la cabina cargando los dos módulos: `ALLOWED_LATEX_COMMANDS` **231 → 237**,
añadidos exactamente `ge`, `gt`, `le`, `lt`, `ne`, `xrightarrow`, quitados ninguno. Blocklist
27→27, entornos 12→12. El veto de los crudos **sigue**, medido en las dos direcciones. `src/content`
intacto. Suite del taller: 2347 → 2354.

**Y el mensaje del veto dejó de ser una prohibición sin salida:** ahora dice «usa `\lt` y `\gt`»
en el punto exacto donde el autor se entera.

---

## ⚠ EL HALLAZGO NUEVO, y es el MISMO PATRÓN por tercera vez

**Dos superficies validadas contra criterios distintos.** Ya pasó con importación contra edición,
y ahora con **el teclado matemático contra el sanitizador**.

La causa está en el propio historial: el run que validó el teclado se llama **«Validate virtual
keyboard KaTeX compatibility»** — lo validó **contra KaTeX**, no contra la allowlist. Y la
allowlist es **deliberadamente más estrecha que KaTeX**. Nadie contrastó nunca teclado ↔ allowlist.

### Medido por la cabina, y es COTA SUPERIOR, no cifra exacta

Extrayendo los valores `latex:` / `insert:` del bundle de MathLive 0.110.0 —el que el proyecto
declara— y pasándolos por `validateLatexPayload`:

| | |
|---|---|
| valores distintos que las teclas pueden insertar | **185** |
| valores que el sanitizador **RECHAZA** | **43** |
| comandos distintos que el teclado puede insertar | 128 |
| de ellos, **no admitidos** por la allowlist | **32** |
| de esos 32, en el **blocklist de seguridad** | **NINGUNO** |

**Por qué es cota superior y no cifra:** la extracción barre el bundle entero, y el proyecto
configura solo cuatro layouts —`numeric`, `symbols`, `alphabetic`, `greek`—. Algunos de los 43
pueden vivir en layouts que el proyecto no muestra. Y tres de los 43 fallan por `MALFORMED_LATEX`
y son **plantillas con marcadores** (`#0`, `#?`, `#@`), no LaTeX final. **El run tiene que medir
solo los cuatro layouts activos.**

**Ninguno de los 32 está en el blocklist**: no son peligrosos, simplemente **nunca se verificaron**.

Los `<` y `>` que el operador vio son **2 de los 43**. El resto son cosas como `\vert`, `\gets`,
`\lnot`, `\aleph`, `\smallint`, `\lbrack`.

---

## El encuadre del operador, y por qué hacen falta las dos vías

Sus palabras: *«corrige el formato en el que inserta los símbolos el teclado (no cambiar lo que
inserta solo a un formato válido) o que acepte lo que ya inserta»*. **No quiere perder símbolos**,
y eso descarta quitar teclas.

Pero las dos vías no son alternativas: **se reparten según el símbolo**, y el reparto lo decide
la medición.

| caso | vía |
|---|---|
| el símbolo YA tiene un equivalente admitido — `<` → `\lt`, `>` → `\gt` | **traducir la inserción**, sin tocar lo que el autor ve |
| el símbolo NO tiene equivalente — `\aleph`, `\hslash`, `\beth` | **verificar contra KaTeX y admitir**, como se hizo con `color` y con los seis alias |
| el símbolo no pasa KaTeX | ese sí sale del teclado, y se declara |

Traducir lo que no tiene destino es imposible; admitir lo que ya tiene equivalente ensancharía la
lista sin necesidad. Por eso el reparto, y no una sola vía.
