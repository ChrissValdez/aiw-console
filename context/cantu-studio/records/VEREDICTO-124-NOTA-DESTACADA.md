# VEREDICTO 124 — «Nota destacada» admitida, en CINCO rondas

> Run: `RUN-CANTU-SLIDE-CALLOUT-ADMIT-AND-IMPLEMENT-001` · `queue_order` 124.
> Veredictos del operador **Christopher Valdez Cantu**, **2026-08-18/19**, dados en Cantu
> Studio. Transcritos por la cabina **VERBATIM**.

---

## SUS PALABRAS, RONDA A RONDA

**Ronda 2** — tras el tamaño de texto:

```
varios errores
el tamaño del texto jala
pero...

no tiene el campo del icono para cambiar el icono ademas el icono no cambia de tamaño juntoc
on el texto deberia ese cambio de tamaño afectar el icono tambien

para que se vean del mismotamaño

ahora... los colores no es la paleta de colores de configuracion global con el color
personalizad oextra
```

**Ronda 3** — tras el icono y el color:

```
los iconos no me viene con la configuracion de iconos, con los simbolos, ademas, no deberia
ser variante y color
es unicamente color (que es lo mismo que la variante). El color no deberia tener "color de la
variante" esa opcion no existe
Es la lista de colores de configuracion global y personalizado

ademas, en contenido no tiene el salto de linea todo me lo hace en un parrafo
```

**Ronda 4** — con captura adjunta:

```
sigue sin jalar el salto de linea de la nota
admeas... el borde de la izquierda se ve muy pequeño, como que no escala con el tamaño de la
nota
```

**Ronda 5 — cierre:**

```
pas
```

---

## LO QUE PASA Y LO QUE QUEDA ABIERTO

**Los tres pasos de la ronda 5 pasan.** El componente queda admitido e implementado de extremo
a extremo: esquema en los dos gemelos, aptitud, compilador, selector, formulario, tamaño de
texto, icono del catálogo global, color de la paleta, y armazón que escala.

**UNA DECISIÓN SUYA QUEDA ABIERTA Y NO SE CIERRA POR SILENCIO.** Al salir «Variante» del
formulario en la ronda 4, el autor perdió la única forma de pedir una **nota sutil**. Se le
dibujó normal contra sutil y se le ofrecieron tres salidas, con la primera recomendada:

| | |
|---|---|
| **1** | que «Sutil» sea su propio control — **recomendada por la cabina** |
| 2 | que se pierda desde el editor |
| 3 | que el color personalizado la cubra — **medido que NO**: la sutileza es un tratamiento, no un color |

**Su «pas» cierra la QA, no la decisión.** La cabina **no la da por elegida**: comprometerle a
una ronda 6 sobre su silencio sería inventarle intención, y este proyecto ya registra dos casos
en que una elección quedó aceptada sin sus palabras. **Queda como decisión abierta, suya, y
cuesta un run pequeño cuando la quiera.**

**Hoy no está perdida:** `is-subtle` sigue en el esquema y en el motor, las 22 notas del corpus
la conservan, y sigue alcanzable por «Insertar JSON».

---

## LAS CINCO RONDAS, Y QUÉ ENSEÑAN

| Ronda | Qué |
|---|---|
| 1 | Admisión de extremo a extremo, **sin tocar el motor**. Huella mínima: cabe. Fila 4: entra con 62,5 px de sobra |
| 2 | Escala de texto propia, dos tablas —cabecera y cuerpo— ancladas en lo que pintaba |
| 3 | El icono escala por proporción medida; el color pasa a la paleta como `accentColor` |
| 4 | El icono pasa al **catálogo global** y «Variante» sale del formulario |
| 5 | El armazón —borde y relleno— escala; el redondeo no, por decisión declarada |

**LAS CUATRO ÚLTIMAS SALIERON DE QUE PODÍA VERLO.** Es el mismo patrón que `#121`: un
componente recién habilitado revela en minutos lo que ninguna medición previa vio. **Y las
cuatro son la misma clase de defecto: valores escritos a mano que no escalan** — el icono de
20 px, el borde de 4 px, el relleno de 16/20 px. La Lista pagó lo mismo con su píldora de 56 px.

---

## LO QUE EL TALLER CAZÓ CONTRA SÍ MISMO

- **Adoptar el catálogo de iconos movía los 63 árboles.** Medido clave a clave: 12 de 16
  idénticas, 2 de grosor, y **2 de dibujo** — `bulb` e `info`, que la tabla vieja aliasea al
  libro. **Y el corpus escribe `bulb` dos veces.** Solución: el motor consulta primero la tabla
  vieja, después el catálogo.
- **Emitir el acento como `color` resucitó un campo muerto.** `showcase_library.js` tenía un
  `color` sin uso desde antes; al empezar a leerlo, **la nota cambiaba de color sola**. Se emite
  `accentColor`. Lo destapó un árbol fijado, no una revisión.
- **Una guarda suya seguía verde con un hueco real:** si el borde en línea desaparecía, las dos
  reglas caían a 4 px y **seguían coincidiendo**. La igualdad sola no distinguía «se mueven
  juntas» de «no se mueve ninguna».
- **Cayó en la trampa de CRLF dentro de una guarda**, y en el `grep -r` con `node_modules` que
  su propio ticket nombraba.
- **Corrigió nueve pasos obsoletos de su packet** que habrían fabricado rojos falsos.

---

## ABIERTO, SUYO, Y NOMBRADO CON NÚMEROS

- **`is-subtle`** — la decisión de arriba.
- **44 MEDIDAS DE ARMAZÓN EN PÍXELES FIJOS** en los cinco componentes con escala: **Tarjeta 21**,
  Nota 11, Lista 7, Gráfico 4, Narrativa 1. **Indicio, no diagnóstico.**
- **Que `bulb` pinte un libro** es un defecto de la tabla vieja; repararlo mueve dos notas del
  sandbox.
- **Seis rótulos de icono y «Sutil»** siguen siendo propuesta del taller, no decisión suya.
- **El redondeo no escala**, por decisión declarada del taller y vetable en dos líneas.
- **`icon`: 16 claves para 6 dibujos** en la tabla vieja; el enum pasó a **48** sumando.
- **LOS SALTOS DE LÍNEA, REPORTADOS CUATRO VECES.** Son `RUN-CANTU-SLIDE-PROSE-LINE-BREAKS-001`
  y no se parchearon aquí a propósito: el defecto es de todo el carril, donde **un solo sitio**
  preserva saltos.
