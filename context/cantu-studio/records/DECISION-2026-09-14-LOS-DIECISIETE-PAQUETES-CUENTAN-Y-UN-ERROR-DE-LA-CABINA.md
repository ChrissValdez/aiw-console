# DECISIÓN DEL OPERADOR — los diecisiete paquetes cuentan · y un error de la cabina en el mismo turno

**Fecha: 2026-09-14** · **Origen:** las siete dudas del hilo de LECCIONES, contestadas por el hilo
`cantu-studio`
**Entregable:** `cantu-lessons/RESPUESTAS-DE-CANTU-STUDIO-2026-09-14.md`
**Sin commitear:** el shell de la cabina está caído (ver §0 del entregable y la sección final)

---

## Lo que dijo, VERBATIM

```
La regla «AIW no usa componentes no documentados en docs/components/*.md»:
¿la satisfacen los 17 paquetes de cantu-studio, o solo cuentan los de cantu-lessons?
  -> «Cuentan los 17 de cantu-studio (recomendada)»

El desplegable del editor dice Morado, Cian y Champagne donde la paleta activa pinta
malva, verde jade y coral. ¿Qué hago con eso?
  -> «Lo verifico en pantalla y luego decides (recomendada)»
```

**La segunda pregunta no debió hacerse.** Ver abajo.

---

## 1 · La decisión que desbloquea el hilo de lecciones

`cantu-lessons/docs/AIW_AUTHORING_CONTRACTS.md:20` dice *«AIW no usa componentes no documentados
en `docs/components/*.md`»*, y `cantu-lessons/docs/components/` solo tiene `README.md` y
`lista.md`. Por la letra, **el hilo de lecciones podía usar un solo componente**.

Medido: **`cantu-studio/docs/components/web/` tiene DIECISIETE paquetes** — verificado por Glob
directo, no por la cuenta de un subagente. Y el propio `cantu-lessons/docs/DOCUMENTATION_MAP.md:52`
pone **`cantu-studio` en el primer escalón de autoridad**, con `docs/components/*.md` en el
tercero. Además `cantu-lessons/docs/README.md:40` dice que esa carpeta *«contendrá»* documentación
por componente — **futuro que nunca se cumplió**.

**Decisión: cuentan los diecisiete.** De uno a diecisiete componentes disponibles.

**Y queda un fleco declarado:** la equivalencia no está escrita en la norma que lleva la regla.
Vive en el entregable y en este record. **Un acuerdo que no está en la norma es el que la siguiente
sesión no encuentra**, y escribirlo en `AIW_AUTHORING_CONTRACTS.md` es trabajo del hilo de
LECCIONES, con ticket, porque su contrato sujeta `docs/` a eso.

---

## 2 · ⚠ UN ERROR DE LA CABINA, Y ES SU PATRÓN DOMINANTE OTRA VEZ

La cabina publicó como **«defecto vivo»**, con triángulo de aviso, que el desplegable de variantes
del editor **miente en tres de nueve**: que rotula `def` «Morado», `ex` «Cian» y `str` «Champagne»
mientras la paleta activa `metodo_cantu_2` pinta malva, verde jade y coral.

**Era falso. Y no por poco: al revés.**

`VARIANT_OPTIONS` **no rotula la paleta. Rotula la tabla `VARIANTS` del motor de diapositiva**
(`cantu-studio/src/builders/slides/helpers/commons.js:71-81`), y contra esa tabla las tres
etiquetas son **exactas**: `def` es `#9B6FA5`, morado; `ex` lleva borde `#6EB4C7`, cian; `str`
lleva `#C9BFAE`, champagne.

**Y el defecto que la cabina creyó descubrir existió de verdad — y ya estaba arreglado.** Está
escrito en el sitio donde vivía (`…/components/web/WebBlockEditor.jsx:12-15`):

> *«`VARIANT_OPTIONS` ya no se importa: su único consumidor en este archivo era la lista de
> diecinueve opciones del badge de fila de «Tabla», retirada… **Los rótulos de color salen ahora de
> la paleta activa, no de una lista congelada.**»*

Alguien lo encontró antes, lo retiró del carril Web —que es donde la paleta manda— y dejó la razón
escrita. Lo que sobrevive en Slide es correcto y su porqué también está escrito
(`editorOptions.js:616-618`).

### Cómo se produjo, y es lo que hay que aprender

**El subagente que lo midió hizo su trabajo bien.** Entregó el cruce **marcado como deducción
propia** y con la frase *«no he verificado esto en pantalla, solo cruzando los tres ficheros»*.

**La cabina cogió esa deducción marcada, le quitó la marca, le puso un triángulo de aviso y la
publicó como hallazgo.** Es la quinta forma de fallar con una variante nueva: no midió con la
herramienta equivocada — **ascendió de rango una medición ajena que venía etiquetada como
provisional**.

**Y le llevó al operador una pregunta construida sobre ella**, que se contestó. Verificar en
pantalla algo que el código desmiente habría costado tiempo suyo para confirmar un no-defecto.

**La guarda:** *una deducción marcada por quien la hizo no cambia de rango al citarla. Si la cabina
quiere publicarla como hallazgo, la verifica ella; si no, la publica con su marca puesta.*

**La corrección va dentro del entregable**, al lado de donde estaba el error y con la misma
fuerza. No se borra: una afirmación falsa borrada en silencio sigue circulando en la cabeza de
quien la leyó.

---

## 3 · El estado del montaje, que condiciona todo lo demás

**El shell de la cabina no llega al disco**, medido dos veces el 2026-09-14 con el mismo error:
`Plan9 share "c" which is not mounted`, atribuido a una actualización de Windows del 8 de
septiembre.

| | |
|---|---|
| leer y escribir ficheros | **funciona** |
| `git`, `node`, tests, consola de roadmap | **no funciona** |
| **Claude Code (el taller)** | **NO afectado**, lo dice el propio mensaje |

**Consecuencias declaradas:**

- **Nada de este turno está commiteado**: ni el entregable, ni este record. Los tiene que commitear
  el taller o Chris.
- **El reparto «solo la cabina commitea» queda invertido mientras dure la avería**, y es decisión
  de Chris aceptarlo.
- **El hilo de lecciones no podía commitear por esto mismo.** No era git, ni un permiso, ni el
  lock: no hay disco montado, y ninguna forma alternativa de commitear lo arregla.
- **Todas las mediciones de este turno son lectura de fuente**, no comportamiento observado. Están
  marcadas como tales en el §8 del entregable.
