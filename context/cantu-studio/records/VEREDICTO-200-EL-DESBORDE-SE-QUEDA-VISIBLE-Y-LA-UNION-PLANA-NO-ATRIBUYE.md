# El desborde se queda visible, y la unión plana de Web no atribuye

**Fecha:** 2026-09-15 · **Run:** `RUN-CANTU-SLIDE-DECLARED-HTML-CELL-001` (`#200`)
**Veredicto del operador:** suyo. **Los dos hallazgos:** del taller, verificados por la cabina.

---

## 1 · EL VEREDICTO — opción **A**, sin regla de desborde

> **Palabras del operador:** «A · HOY, sin regla de desborde».

El taller dibujó cuatro opciones sobre la misma tabla en una celda, con una celda vecina al
lado para que se viera si se le viene encima, **sin tocar el motor**: las cuatro se pintan
desde `QA/temp/RUN-CANTU-SLIDE-DECLARED-HTML-CELL-001/generar-qa-desborde.mjs`, y borrar ese
fichero no deja nada. Esa es la propiedad que hizo la pregunta barata.

| | qué hacía | |
|---|---|---|
| **A** | el envoltorio tal cual sale del motor, sin regla | **ELEGIDA — y es lo que el run ya publica** |
| B | `overflow: hidden` en la celda | descartada |
| C | `overflow: auto` — scroll dentro de la celda | descartada |
| D | el par de Web copiado: `overflow-x: auto` + margen inferior 24px | dibujada para verse, no para proponerse |

### El principio, que es el que sobrevive al caso concreto

**Todo este carril existe para que el fallo NO SEA SILENCIOSO.** `#198` midió que la
construcción **no puede tronar** —0 de 40 etapas lanzan, ni con 5 000 `div` anidados— y que lo
que sí pasa es peor: reporta éxito y la página sale rota sin que nadie se entere. Un `<table>`
sin cerrar se traga treinta elementos, la diapositiva siguiente incluida.

**B habría reintroducido ese modo de fallo dentro de la celda**, y por la puerta de delante:
truncar en silencio es producir una página que parece correcta y no lo es.

**C lo convierte en un fallo que solo el autor puede descubrir**, y esa es la parte que no es
obvia: una diapositiva proyectada **no se puede rolar**. Lo que quede debajo del corte no
existe para quien la mira. Un scroll que solo funciona en el editor es una red que no está ahí
cuando hace falta.

### Y lo que esta elección AHORRA, que cuenta como resultado

**Cero cambios en el motor.** El veredicto confirma lo que el run ya emitía, así que no se
escribe una regla nueva, no se mueve ningún píxel del corpus, y no hay nada que revertir si
mañana cambia de opinión. **Una decisión que no cuesta código es la más barata de revocar.**

---

## 2 · HALLAZGO — la unión plana de Web NO ATRIBUYE, y esa era la causa real

**La hipótesis de la cabina era falsa, y el ticket la dejó sin diagnosticar a propósito.** La
cabina supuso que el `«Invalid input»` del `#199` venía de que `tag` no llevaba mensaje de
campo obligatorio, como sí lo lleva `html`. **No era eso.**

**La causa medida:** `WebBlockSchema` es una `z.union` **plana**. Cuando ningún miembro encaja,
zod reporta un error **de nivel de unión**, sin ruta de campo — de ahí el `Invalid input` pelado.
Faltando la clave `tag`, el miembro `htmlBlock` **no encajaba**, así que nunca llegaba a hablar.

**El arreglo, y por eso funciona** (`draftSchema.js:2218-2231`, gemelo en `editor-ui`): `tag` y
`html` pasan a `.optional()` **a nivel de tipo**, de modo que el miembro **encaja
estructuralmente** aunque falte la clave, y la obligatoriedad se enforce en
`refineWebHtmlBlock` como issue `custom` con su ruta. Medido en los dos gemelos:

```
SIN la clave tag   ->  custom | webBlocks.0.tag  | "Este campo es obligatorio"
SIN la clave html  ->  custom | webBlocks.0.html | "Este campo es obligatorio"
```

### La deuda que queda, y tiene nombre limpio

**El arreglo es local al bloque, no a la clase.** Medido con la sonda del propio taller:

| | qué dice al faltarle su campo obligatorio |
|---|---|
| `htmlBlock` | **atribuye** — `custom` con ruta |
| `header`, `narrative`, `callout`, `list`, `table`, `video` | `invalid_union` · **`Invalid input`** pelado |
| `tag` que es un **número** | `invalid_union` · `Invalid input` — un desajuste de TIPO no se puede diferir a un refine |

**Y el carril de diapositiva no tiene el problema:** usa `z.discriminatedUnion` y atribuye por
`type` de serie, incluido el mensaje que enumera los tipos válidos. **Web unión plana, diapositiva
discriminada.** Esa asimetría es la deuda, y no se toca aquí: cambiar la unión de Web a
discriminada es un run propio con su propia QA.

---

## 3 · HALLAZGO MENOR — una sonda que se lee al revés

`medir-costura-y-censo.mjs` imprime **presencia** (`tiene()` devuelve `SI` si el HTML contiene
la cadena) pero rotula sus renglones **en negativo**: «...y **NO** emite atributo de censo»,
«el crudo **NO** se pinta», «`html` vacío **no** cae al crudo». Los tres contestan `no`, y los
tres `no` significan **correcto**.

**Por qué se anota y no se deja pasar:** una sonda cuyas respuestas correctas se leen como
fallos produce la misma clase de falsedad que un verde falso, solo que en la otra dirección —
y este proyecto ya tiene medido que **un verde no se cuestiona**. Aquí paró a la cabina un
turno entero antes de poder cerrar. La regla que sale: **el rótulo de una sonda se redacta en
la misma polaridad que su medición.**

---

## 4 · LO QUE ESTE RUN NO DEJÓ, y se declara

**No escribió informe.** `#198` y `#199` dejaron el suyo y esos documentos son la mitad del
valor de un run: son donde viven las autocorrecciones. Aquí no hay.

**Lo que sí quedó, y es lo que permitió cerrar igual:** siete sondas en disco, **re-ejecutables**,
que la cabina volvió a correr para reconstituir el packet midiendo en vez de recordando — y las
cuatro páginas de la QA visual. El `closeout_result` transcribe las autocorrecciones que el
taller narró **marcadas como transcripción de su registro, no como medición de la cabina**.

**La distinción importa y por eso está escrita:** una medición propia y una transcripción de lo
que otro dijo no tienen el mismo rango, y confundirlas es exactamente cómo la cabina promovió
una deducción marcada a hallazgo en el `#195`.
