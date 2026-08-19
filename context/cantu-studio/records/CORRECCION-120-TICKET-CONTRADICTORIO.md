# CORRECCIÓN — el ticket de `#120` se contradijo a sí mismo, y su premisa era falsa

> Escrito por la cabina el **2026-08-18**, tras la parada del taller de
> `RUN-CANTU-SLIDE-CARD-FIELD-SIZE-PAIRING-001` por las condiciones (f) y (g).
> **Se publica igual de fuerte que el error.** Corregirse en silencio dejaría circulando la
> versión falsa.

---

## EL ERROR, EN UNA LÍNEA

El ticket escribió en su **Out of scope**:

> *«MÉTRICA Y CITA (la forma "N campos → un control"). La regla ya dice cómo se colocan, pero
> NINGÚN RUN LAS TIENE ASIGNADAS. Nombrado, no programado, y no entra.»*

**«Métrica» y «Cita» NO SON COMPONENTES APARTE. SON DOS DE LAS CUATRO FAMILIAS DE LA TARJETA**,
que es justo lo que este run tiene encargado.

**Verificado por la cabina contra el esquema, hoy:**

- Los tipos de ítem de diapositiva son **cuatro**: `card`, `narrative`, `iconList`, `visual`.
  **No existe un tipo `metric` ni un tipo `quote`.**
- `metric`, `code` y `persona` son valores de `cardType` — **familias de la Tarjeta**
  (`SPECIAL_CARD_TYPES`, `draftSchema.js:1083`).

Así que la frase «ningún run las tiene asignadas» **es falsa contra el disco**: las tiene
asignadas **este** run, y desde su título — *«Pair **every** Tarjeta field…»*.

---

## POR QUÉ ES UNA CONTRADICCIÓN Y NO SOLO UN DATO MAL

El mismo ticket decía, en tres sitios, lo contrario de esa línea:

| Dónde | Qué decía |
|---|---|
| Objective | «en sus **CUATRO FAMILIAS**» |
| Criterio 1 | «**LAS CUATRO FAMILIAS** de la Tarjeta quedan emparejadas» |
| `full_description` del run | «El formulario de la Tarjeta, **sus cuatro familias**» |
| **Out of scope** | **«Métrica y Cita … no entra»** |

Y el disco añadía una cuarta voz: `REFERENCE-SLIDE-EDITOR-SIZE-CONTROL-PLACEMENT.md`, línea 55,
dice de la forma (b) —Métrica y Cita— **«Se monta en `#120`»**. La escribió `#119` y la cabina
la había leído.

**Las tres rutas posibles rompían algo**, y el taller lo demostró midiendo en vez de razonando:

- No tocarlas → **las cuatro familias pierden su control**, porque la cola compartida es el
  único sitio que lo pinta. Eso es una retirada, que el propio Scope prohibía.
- Tocarlas → viola el Out of scope.
- Cola parcial → incumple los criterios 2 y 3.

**El taller renderizó el formulario de verdad para demostrarlo**, porque el control lo pinta
**otro fichero** y leer un solo fuente no lo habría visto.

---

## DE DÓNDE VINO, Y ES LO ÚTIL

**De una tabla que escribió la propia cabina en el turno anterior.** En el esquema dibujado para
el operador puso una fila: *«Métrica y Cita — tienen varios campos y un control … ningún run los
tiene asignados todavía»*. **Nunca lo verificó contra el esquema.** Al turno siguiente lo copió
al ticket como si fuera medición.

**Es la cuarta forma de fallar de «papel ≠ disco»: citar una medición PROPIA que envejeció —o
que nunca existió— dentro de la misma sesión.** Y es también el patrón de fallo dominante de
esta cabina: **quinto ticket que se contradice a sí mismo**, y el quinto que caza el taller.

**La distinción que faltaba, y es de nombres:** «Métrica» y «Cita» nombran a la vez una
**familia de la Tarjeta** y una **forma de la regla**. La cabina las leyó como componentes
independientes. Cuando un mismo rótulo designa dos cosas de niveles distintos, **el ticket tiene
que decir cuál de las dos**.

---

## LO QUE SE CORRIGE, Y CÓMO

**Se retira la línea del Out of scope. Las CUATRO familias entran.** No es ampliar el alcance:
es devolver el ticket a lo que el run, su título y la regla ya decían. **D-061 no aplica**
porque no hay ampliación — hay una restricción falsa que se quita.

**Marcado como inferencia de la cabina y VETABLE:** si el operador quiere que Métrica y Cita
salgan de este run, sale también la Tarjeta entera, porque las cuatro comparten la única cola
que pinta el control. Es una línea suya y el ticket se rehace.

---

## LO QUE EL TALLER ENTREGÓ IGUAL, Y ERA LO PEDIDO

**EL VEREDICTO SOBRE LA REGLA, QUE ES SU SEGUNDO ESTRENO Y EL PRIMERO FUERA DEL PILOTO:
AGUANTA.** Sirve para las cuatro familias sin forzarla — «Código» es forma (a); «Estándar»,
«Métrica» y «Cita» son forma (b).

**Dos hallazgos menores sobre la regla misma:**

1. **La regla OMITE «Estándar»** de sus ejemplos de forma (b), aunque lo es: su control
   dimensiona título **y** contenido. Es un ejemplo incompleto, no una regla mal escrita.
2. **«Cita» ya cumple por accidente.** De las cuatro, solo se moverían tres.

**Y un rojo falso que el taller cazó ANTES de publicarlo**, que es exactamente lo que el ticket
le pedía: su primera sonda dijo «3 controles sin rótulo de autor». Eran artefacto — había
sustituido `VariantSelect` e `IconPicker` por marcadores, y esos pintan su rótulo por dentro.
Renderizó los reales: **cero sin rótulo**. **No le inventó nombre a ninguno**, que es la regla
que se rompió una vez y el operador desmintió las cuatro invenciones.
