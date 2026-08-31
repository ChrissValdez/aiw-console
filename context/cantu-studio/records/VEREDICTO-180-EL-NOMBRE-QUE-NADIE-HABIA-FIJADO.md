# `#180` — el renombrado interno, y el cero que nadie había nombrado

**Cerrado el 2026-08-30 con QA visual humana aprobada.** Veredicto del operador Christopher
Valdez Cantu, **verbatim: «pass»**, sobre los cinco pasos numerados.

```
tools/author-lite/         ──►  tools/studio/
src/content/author_lite/   ──►  src/content/studio/
```

---

## El run se abrió sobre un cero

Su propio texto mandaba renombrar *«following the frozen disposition map»*, y **el mapa no
nombraba destino.** La fila 8 declaraba `RENAMABLE PATH`, la coupling más alta del repo y
cómo hacerlo — pero no a qué. Tampoco lo daban la decisión de congelación, ni el `#74` que
difirió el renombrado, ni la decisión de nombres del 2026-07-11, que **excluyó expresamente
los identificadores físicos**.

**El taller paró y reportó, y tenía razón.** Control positivo de la cabina: el mapa tiene 3
líneas con flecha y el documento de referencia 0 porque usa tabla. **La sonda no estaba
ciega; el dato no estaba.**

El nombre lo decidió el operador sobre opciones dibujadas y medidas, y **quedó escrito
dentro del `full_description`** para que no dependiera de la memoria de la cabina. El
razonamiento completo está en `DECISION-NOMBRE-DESTINO-DEL-RENOMBRADO.md`.

---

## Dos paradas, y las dos correctas

La segunda fue **física**: `mv` falló con `Device or resource busy` porque la sesión del
editor del operador corría desde dentro del árbol a mover.

**El taller no mató esos procesos.** El encargo prohibía tocar la ranura de 5173, y además
los procesos de Windows viven fuera del montaje. Escenificó todo, no ejecutó nada, y lo
devolvió con la evidencia. **Cero ficheros del repo tocados en ese intento**: el árbol dio
5 líneas, todas sin versionar.

---

## El ancla creció dos veces sobre lo que el canónico decía

| fuente | sitios |
|---|---|
| el texto del run | **1** |
| el taller, primera medición | **6 en 3 ficheros** de `tools/dev` — incluidas las dos formas con separador de Windows en `dev-common.ps1`, que una sonda escrita solo con `/` no ve |
| el taller, al escenificar | **10 en 5 ficheros** — añadiendo `.claude/launch.json:7` y tres entradas de `settings.local.json` |

**La cifra del «un sitio» era de la cabina, heredada del texto del run sin medirla.** La de
los árboles, que el ticket **sí** puso a medir explícitamente, salió correcta a la primera.
Esa es exactamente la diferencia entre las dos, y por eso queda escrita.

---

## El defecto que justificaba el criterio 7, y salió

`generate_prompt_context.js` construía la ruta **con el prefijo en variable** —
`path.join(CONTENT_DIR, 'author_lite')` — invisible a la vez para los patrones anclados a
ruta **y** para la sonda del cero. Avisó «Todavía no existe /src/content/studio» en la
primera regeneración. Corregido, regenerado con 0 marcadores y 0 rutas viejas, y **barrida
de token suelto añadida** para probar que no hay más formas de esa clase.

---

## Qué queda en pie — verificado por la cabina contra disco

- Los dos orígenes ya no existen y los dos destinos sí.
- **432 ficheros en el commit, de los cuales git detectó 423 como renombrados al 100 %**, así
  que el historial de cada fichero sobrevive al cambio.
- **El cerrojo enmendado en nombre y en assert.** Su título decía «el directorio no se
  renombra en este run» y habría seguido mintiendo dentro del run que lo renombra.
- **66 árboles fijados**: 37 con el segmento `src__content__studio__`, **cero** con el viejo,
  y control positivo hecho. Los **15 supervivientes** con `author_lite` **no son ruta**: son
  nombres de borrador del autor —`qa__author_lite__qa_list_certification` y hermanos— y se
  quedan a propósito.
- Los cuatro `.md` de raíz cambian **referencias de ruta y comandos, no prosa**, así que no
  es la barrida que las exclusiones de la Sección 5 prohíben.

**Cifras del taller, no re-corridas por la cabina:** suite 2227/2227/0 desde `tools/studio`
tratando «0 tests» como fallo · 63/63 huellas sha256 idénticas · anexa de roadmap 168/173
con los mismos 5 fallos preexistentes sin arreglar · anexa de dev 7/7 · 505 reemplazos en
144 ficheros con `guardFailures` vacío. **La suite completa excede el tope de tiempo de la
cabina.**

---

## ⚠ Una afirmación falsa de la cabina, publicada igual de fuerte que el hallazgo

Le dijo al taller que `.claude/settings.local.json` estaba **ignorado** por git y que ni él
ni `launch.json` aparecerían en ningún diff.

**Es falso.** `settings.local.json` está **versionado** y entró en el commit.

**El error:** leer su ausencia de un `git status` como «ignorado» cuando solo significaba
«sin modificar» — **una sonda que no distingue las dos cosas, publicando la más fuerte**. Es
la misma clase que las ocho anteriores de esta serie.

Sin daño: el fichero está correcto en disco y el taller además lo verificó por lectura, como
el encargo mandaba. **De `launch.json` sí era cierto**, y por eso sigue sin versionar y fuera
del commit.

---

## Lo que queda vivo y no se hizo aquí

- **`dist/author_lite`** en `workspaceStorage.js:124` con sus dos asserts, y `dist/` estanco
  con huérfanos `dist/author_lite*` hasta el próximo build. Es superficie de **build**, no de
  código fuente, y su decisión es del operador.
- **El nombre de paquete npm `jame-author-lite-root`**, excluido por cosmético — y que **sin
  embargo el operador ve en su terminal cada vez que lanza**. «Seguro» no resultó ser lo
  mismo que «cierto».
- **Cuatro paquetes sin versionar en `QA/temp/`**, tres de runs anteriores, que ni se
  versionan ni se tiran.

**COMMITS:** `55b12c29` (el renombrado entero) · `daed27f2` (el nombre destino entrando en el
texto del run).
