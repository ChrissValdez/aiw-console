# VEREDICTO — `#163`: la marca que pasó todas las pruebas y no se veía

> Registro escrito por la cabina el **2026-08-29**. Recoge el veredicto del operador
> **Christopher Valdez Cantu**, las dos rondas del run, y **cuatro sondas ciegas de la cabina**.

---

## EL VEREDICTO — VERBATIM

Ronda 2, tras ejecutar la QA:

> **«excelente, jalo muy bien»**

Ronda 1, tras ejecutar la QA — y es la mitad que enseña:

> **«que marca? no aparece ninguna marca / si funciona bien el como se encoge / si se agranda
> demas se encoge para caber / solo que cuando se encoge no aparece ningun mensaje donde se
> supne que aparece»**

### ⚠ El veredicto de la ronda 2 es global, no por paso

La cabina pidió tres líneas literales y el operador aprobó en bloque. El **paso 2** —dos
bloques, comprobando que la marca señala el bloque y paso correctos— **estaba dentro de lo que
aprobó, pero no se confirmó por separado**.

Se declara así y no se infla. El operador ha reportado fallos con precisión toda la serie —en la
ronda 1 de este mismo run dijo *«no aparece ninguna marca»*—, así que su aprobación se toma como
buena. **Si la correlación fallara más adelante, es run nuevo y el defecto es de C2.**

### Decisión tomada bajo D-071

El operador no contestó a la única decisión pendiente: si el **salto de 16 px** de la caja se
conserva. **Se conserva.** El movimiento es una tercera señal, gratis, y esta ronda existió
porque algo no se notaba; ensanchar los 21 mandos para no mover uno sería pagar en la moneda
equivocada. **Revertible reservando el hueco siempre, y es una línea.**

---

## ⚠ LA LECCIÓN, Y VA PRIMERA

> **LA RONDA 1 PASÓ TODAS SUS PRUEBAS Y ERA INVISIBLE.**

13/13 en su red, suite completa verde, lint y build limpios. Y el operador abrió el editor y no
vio nada. **Un verde no dice nada sobre una superficie que solo el ojo juzga.**

### Y lo que salvó el diagnóstico fue algo que nadie pidió

El taller decidió **declarar la marca en el DOM** (`data-size-stepper-encogio`) además de
pintarla. Con eso, una sonda de una línea en la consola del operador:

```js
document.querySelectorAll('[data-size-stepper-encogio]').length   →   1
```

separó **«no se emite»** de **«no se ve»** en diez segundos. **Sin ese atributo, el diagnóstico
habría sido una discusión sobre colores.**

**REGLA QUE SALE: toda marca visual que la cabina no pueda ver se declara también en el DOM.**

### Y ese `1` valió más que la suite entera

Probó **la cadena completa en vivo** —compilador, cruce de origen, receptor y formulario— contra
la aplicación real y el contenido real del operador. **C2 y el transporte quedaron verificados
ahí**, no en un DOM falso. Ninguna prueba del taller podía demostrar eso.

---

## LAS DECISIONES DEL RUN

| | decisión | por qué |
|---|---|---|
| **M1** | marca propia, **no** un error | **Un tamaño que encogió no es un error del autor.** Meterlo por el canal de error le dice que hizo algo mal, y no lo hizo |
| **C2** | identidad desde el **compilador** | C1 era un tercer espejo: si diverge, **la marca señala el paso equivocado en silencio** |
| **T1+T2** | relleno, anillo de 2 px **y un icono** | El color solo es la señal más débil: se pierde de reojo, desaparece para quien no distingue violeta de gris, y **no llega a lector de pantalla**. El icono añade **forma** |
| **Nombre accesible** | **sí**, provisional | No es texto en pantalla. El **texto visible** sigue siendo del operador |
| **Censo** | se arregla aquí | Afirmaba 20 **y pasaba 31/31**. El disco tenía 21 |
| **El salto de 16 px** | se conserva (D-071) | El movimiento es una tercera señal, gratis |

**T3 —añadir texto— no entró.** El operador escribió él mismo el texto de la cinta de `#157`
**después de verla**, y ese orden ha funcionado dos veces.

### La parada del ancho, y por qué su salida fue mejor que las dos opciones

El campo **ya se desborda hoy**: el valor más largo de la escala pide ~57 px en 39. Meter el
icono en el reparto actual lo habría dejado en ~23. La caja crece **16 px exactos y solo
marcada**:

```
sin marca:  108 − (24+24+20+1)     = 39 px de campo
con marca:  124 − (16+24+24+20+1)  = 39 px de campo
```

**El peldaño no pierde un píxel.**

---

## ⚠ CUATRO SONDAS CIEGAS DE LA CABINA — todas cazadas

| lo que publicó | lo medido | la sonda |
|---|---|---|
| «solo el paso enfocado usa el techo del autor» | **falso** — todos los pasos | Miró `fitFocus` y **no miró quién construye las escenas**. Era la condición de parada que ella misma escribió dentro del run |
| «`renderLayout` solo lo usa `buildSingleWebLesson.js`» | **son tres** | Buscó en `compiler-api/` y el fichero estaba en `compiler-api/services/` |
| «3 fixtures fijan el `id` acuñado» | **cero** | Casaba nombres de **clase** (`j-stack-sidebar`) con el patrón del id |
| «`Minimize2` no existe en `lucide-react`» | **existe** | Miraba una ruta que no era — y **la delató su propio control positivo**: dijo que tampoco existía `RotateCcw`, que el fichero importa desde antes |

**Las tres últimas las cazó el control positivo o la verificación. La primera la cazó el
taller.** Y la primera es la que más costó: viajó al texto del run, al cierre de `#158`, al
registro y a un mensaje de commit, y se corrigió **hacia adelante** en los cuatro.

---

## CONDUCTA DEL TALLER QUE CONVIENE REPETIR

- **Declaró tres cosas que podía haber callado**: que tocó una línea del despacho que el ticket
  prohibía, que el `id` acuñado se mueve, y que sin texto la marca no se explica sola.
- **Descubrió el movimiento del `id` con una guarda suya fallando**, no revisando.
- **Revirtió un renombrado propio** porque las guardas de la ronda 1 fijan el literal, y no quiso
  romper una prueba que mide algo que no ha cambiado.
- **Puso primero, y no en una nota al pie, lo que no pudo verificar**: que ahora sí se viera.
  Con el argumento correcto — la ronda 1 pasó todo y era invisible.
- **Declaró una elección estética como estética**: eligió `Minimize2` sobre `Shrink` por
  legibilidad y no por semántica, y dijo que `Shrink` nombra mejor lo que pasa.

---

## VERIFICADO POR LA CABINA CONTRA DISCO

- Red del run **18/18** · censo **31/31** · derivación de escenas **19/19**.
- **Cero árboles movidos**, medido **sin** correr la prueba lenta: los **66** ficheros de
  `fixtures` salen sin modificar en `git status`. Guarda más fuerte que el test, porque no hay
  nada que pueda hacerlo fallar.
- Aritmética del ancho: **39 px** de campo en los dos estados.
- **La suite completa (2 198) es cifra del taller: excede el tope de la cabina y no se re-corrió.**

---

## FUENTES

- `QA/temp/RUN-CANTU-EDITOR-SIZE-SHRINK-IS-DECLARED-001/` — `PARADA-EL-BOOLEANO-SI-EXISTE-Y-LA-MARCA-NO.md`, `REPORTE.md`, `REPORTE-RONDA-2.md`
- `closeout_result` de `RUN-CANTU-EDITOR-SIZE-SHRINK-IS-DECLARED-001` en `.aiw/roadmap/roadmap.json`
- Commits `f89af9f8` · `0250d694` · `3039bcfb` · `08724ef4`
