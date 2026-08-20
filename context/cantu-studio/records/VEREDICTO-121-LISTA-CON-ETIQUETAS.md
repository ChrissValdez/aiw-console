# VEREDICTO 121 — «Lista con etiquetas» habilitada, en CINCO rondas

> Run: `RUN-CANTU-SLIDE-ICONLIST-LIFT-AND-IMPLEMENT-001` · `queue_order` 121 al escribir.
> Veredictos del operador **Christopher Valdez Cantu**, todos del **2026-08-18**, dados EN
> CANTU STUDIO, en su máquina, con el componente delante.
> Transcritos por la cabina **VERBATIM**.

---

## SUS PALABRAS, RONDA A RONDA

**Ronda 1 — habilitar.** No hubo veredicto propio: pasó directo a reportar defectos, que es lo
que se buscaba al habilitarlo.

**Ronda 2 — lo que vio al insertarlo por primera vez:**

```
prikemro el tamaño  solo acepta la lista no el titulo de la lista, vamos a arreglar esto

Ademas el tamaño esta mal y tiene varios errores
primero
si escribo una etiqueta con mas letras, no se ajusta el tamaño de la etiqueta uy se ve
apretado

ademas, la escala de tamaño no me gusta
grande deberia ser mediano

es decir, que todos los tamaños deverian ser un escalon mas grande y como siempre dejarlo
en default

importante lo del ajuste de tamaño de la etiqueta si una etiqueta digamos tiene 5 letras
Y la siguiente 2
las dos deberian tener el mismo tamaño en el que quepa 5 letras
es decir toma el tamaño de la etiqueta mayor y todos los pone ese tamaño
```

**Ronda 3 — la descripción:**

```
otro detalle, la etiquet y el titulo son obligatorios pero la descricpion es opcional
```

**Ronda 4 — el rótulo y la etiqueta que no crecía:**

```
prefiero que se llame

Descripción (opcional)

todo lo demas pass
jala como deberia, excepto una cosa, el tamaño de la letra no afecta el tamaño de la etiqueta
y si deberia, si aumento el tamaño de la nota, entonces deberia aumetnar e ltamaño de la
etiquta tambien
```

**Ronda 5 — su corrección sobre sí mismo:**

```
Deberia decir nadamas Descripcion, no Descripcion opcional, ahi fue mi error, sino todos
los campos opcionales tendria que venir esa palabra opcional
y en realidad es el signo de * para los obligatorios y nada para los opcionales
```

**Cierre:**

```
pass dame el siguiente ticket
```

---

## LO QUE ESTE RUN DEMUESTRA, Y ES LA LECCIÓN QUE SE LLEVA

**CINCO RONDAS, Y LAS CINCO SALIERON DE QUE POR FIN PODÍA VERLO.** El componente llevaba
contenido desde antes de `#116`, que le dio su escala de texto **a ciegas**. En cuanto se
habilitó, el operador encontró en minutos: que el control no alcanzaba al título, que la
etiqueta se recortaba, que la escala estaba mal calibrada, que la descripción no debía ser
obligatoria y que la etiqueta no crecía con el texto.

**NINGUNA de esas cinco cosas era visible sin poder insertar el componente.** Es la prueba
empírica de la regla que él mismo enunció en `#120`: *no se trabaja sobre un componente que el
autor no puede insertar*.

**Y el corolario, que también queda probado:** iterar la interfaz con él mirando fue **barato**.
Cinco rondas sobre una superficie ya habilitada costaron menos que una sola deuda aplazada.

---

## LO QUE ENTREGÓ, POR RONDA

| Ronda | Qué |
|---|---|
| 1 | Levantada la compuerta de `SLIDE_ITEM_TYPE_OPTIONS`; la segunda —`SLIDE_GRID_COMPONENT_FITNESS`— **no era la que bloqueaba**, medido, y se dejó intacta. Colocación del control encabezando la colección. La lista de excepciones del contrato llegó a **cero** |
| 2 | El control alcanza el título de la lista **y** el de cada ítem. La etiqueta deja de recortarse. Todas las etiquetas de una lista miden lo de la más larga. Escala re-anclada en 1.5rem |
| 3 | `text` pasa a opcional en los dos gemelos; `badge` y `title` siguen obligatorios, con guarda. Los dos motores pintan limpio sin descripción |
| 4 | La letra de la etiqueta y su caja crecen con el peldaño, por proporción, no por escalera propia |
| 5 | El rótulo queda en «Descripción» |

---

## LAS DECISIONES DEL OPERADOR QUE ESTE RUN FIJA

1. **EL CONTROL DE UNA COLECCIÓN VA ENCABEZÁNDOLA** (decidido en `#118`, montado aquí).
2. **EL ANCLA DE ESTA SUPERFICIE SE MUEVE A 1.5rem.** Deroga, solo aquí, su propia regla del
   2026-08-17 «Mediano significa lo que ya ves». **La deroga él, que es quien la puso**, y el
   código lo dice: la historia anterior no se borró, se corrigió hacia adelante.
3. **LA DESCRIPCIÓN ES OPCIONAL, TAMBIÉN EN WEB.** Eligió relajar el esquema compartido sobre
   partirlo en dos. Es una relajación: ningún borrador dejó de validar, medido sobre el corpus.
4. **EL ASTERISCO MARCA LOS OBLIGATORIOS; LOS OPCIONALES NO LLEVAN NADA.** Enunciada al
   corregirse a sí mismo. **Es la de más alcance de las cuatro** y no es de este componente.

---

## LO QUE LA CABINA HIZO MAL, Y SE PUBLICA IGUAL DE FUERTE

**AFIRMÓ QUE EL DESBORDE DE CUATRO FILAS LLEVABA «TRES MEDICIONES SEGUIDAS EMPEORANDO». ERA
FALSO.** Lo dedujo por acumulación en vez de medirlo. Lo real: a tamaño por defecto sigue
costando **280 px**, igual que tras la ronda 2 — ni la 3 ni la 4 lo movieron. Lo que sí empeora
es **si el autor sube el peldaño**: 309 px en Grande, 395 en Extra grande.

**El taller necesitó cuatro escenas nuevas para verlo**: las que había usaban listas sin peldaño
y habrían contestado «no empeora», cierto solo para el defecto. Es la sonda que no distingue,
otra vez, y esta vez la sembró el ticket.

---

## LO QUE EL TALLER CAZÓ CONTRA SÍ MISMO, Y ES POR QUÉ ESTE RUN AGUANTA

- **Una sospecha suya se cayó al medir**: creyó que Web pintaba una caja de línea entera por un
  contenedor con espacios; mide **0**. Lo que sobraba era el margen del rótulo colgando de un
  párrafo inexistente — **4,80 px** en diapositiva, **2,00** en Web. No se ve leyendo el marcado.
- **Dos sondas suyas se pusieron rojas contra él** y las dos veces tenía razón el disco:
  preguntaba a un esquema que ignora Web a propósito, y confundía las tres colecciones que se
  llaman `items`.
- **Una sonda contó «2 listas con `level`»** y pareció desmentir a la ronda 2. Mezclaba
  carriles: separando por ruta, **cero** en diapositiva. La ronda 2 tenía razón.
- **Un dedup con estructura compartida entre ficheros se saltaba objetos**, y lo cazó **su
  propio censo** de `#116`.
- **Una mutación salía roja sin probar nada**: devolvía el rótulo al valor viejo, así que
  saltaba el aserto anterior y el nuevo nunca se ejecutaba. La cambió por colar «(opcional)» en
  la ayuda del campo — que además es la forma más probable de que la palabra vuelva sin que
  nadie lo note.
- **Una mutación no se pudo aplicar y la sonda lo dijo** en vez de fingir un rojo.

---

## ABIERTO, SUYO, Y NOMBRADO CINCO VECES

- **EL DESBORDE EN REJILLA DE CUATRO FILAS.** La Lista cuesta 280 px al defecto y la banda da
  185,7. **No cabe ninguna.** Va a afectar a los nueve componentes que quedan por habilitar, no
  solo a este. **La cabina recomienda run propio y NO lo ha abierto.**
- **LOS ONCE RÓTULOS con «(opcional)»** que contradicen su convención — 12 medidos, uno
  retirado aquí. Cruzan a Web. Recomendación: después de habilitar.
- **«Extra grande» contra «muy grande»**, que sigue sin dueño.
- **Los rieles (`level`)**: cero listas de diapositiva los usan hoy, así que su interacción con
  la caja variable de la etiqueta es teórica y quedó declarada con números.
