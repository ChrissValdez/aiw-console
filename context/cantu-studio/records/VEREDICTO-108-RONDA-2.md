# VEREDICTO DEL OPERADOR — `#108` ronda 2

> **Recogido por la cabina el 2026-08-17.** El operador revisó el material de QA de la ronda 2
> —las ocho escenas de `narrativa-ronda2.html`— y lo aprobó, con **una petición de reordenación
> del formulario del editor**.

## SUS PALABRAS, VERBATIM

    jala bien solo quiero reacomodarlo porque los 3 tamaños estan hata abajo y quiero que este
    ]campo
    tamaño,
    campo
    Tamaño
    camo
    tamapo

    no campo, campo, campo
    tamaño, tamaño, tamaño

## QUÉ SIGNIFICA, Y NO SE INTERPRETA MÁS ALLÁ DE ESTO

**«Jala bien» es la aprobación de lo entregado en la ronda 2.** El operador no desmintió
ninguna de las ocho escenas, ni pidió recalibrar el espaciado, ni objetó ningún rótulo. **La
implementación de los puntos 1, 3 y 4 de la enmienda D-061 queda aceptada.**

**Lo que pide es de COLOCACIÓN, no de comportamiento.** Quiere que cada campo vaya seguido
inmediatamente de su control de tamaño —`campo, tamaño, campo, tamaño, campo, tamaño`— en
lugar de los tres campos juntos y los tres tamaños amontonados al final.

**LO QUE ESTE VEREDICTO NO DICE, y por eso no se da por dicho:** no dice si la convención es
sólo para Narrativa o para todo componente que tenga controles de tamaño. Esa pregunta se le
hizo por separado.

## LO MEDIDO POR LA CABINA AL RECIBIRLO — 2026-08-17

Medido en `SlideItemEditor.jsx` (281 líneas). **El orden que hoy se pinta en Narrativa es
exactamente el que él describe:**

| Orden actual | Línea | Dónde vive |
|---|---|---|
| Tipo de narrativa | ~150 | rama `narrative` |
| **Título** | 175 | rama `narrative` |
| **Texto** | 188 | rama `narrative` |
| Centrar verticalmente | 205 | rama `narrative` |
| **Tamaño del título** | 230 | rama `narrative`, al final |
| **Espaciado título–párrafo** | 241 | rama `narrative`, al final |
| **Tamaño del texto** | 259 | **LA COLA COMPARTIDA, fuera de la rama** |

**AQUÍ ESTÁ EL NUDO, Y ES LO ÚNICO QUE HACE ESTO NO TRIVIAL:** dos de los tres controles ya
viven dentro de la rama de narrativa y moverlos no afecta a nadie más. **El tercero no.**
«Tamaño del texto» lo pinta la cola compartida —`TIPOS_CON_TAMANO_DE_TEXTO = ['card',
'iconList', 'narrative']`— que sirve **también a Tarjeta y a Lista con etiquetas**.

Emparejar «Texto → Tamaño del texto» en Narrativa obliga a elegir entre:

- **sacar a narrativa de la cola compartida** y dejar a Tarjeta y Lista con etiquetas como
  están, lo que produce **dos convenciones de formulario conviviendo**; o
- **cambiar la convención para los tres**, que es más trabajo y toca superficie que esta QA
  **no** ejercitó.

**Y hay una razón de calendario para decidirlo ahora y no después:** por delante vienen siete
componentes más del plan de quince, y todos montarán formulario. La convención de colocación
es **una pieza compartida**, y arreglarla después obliga a rehacer los siete.

---

## LAS DOS DECISIONES DEL OPERADOR — 2026-08-17, mismo turno

Se le presentaron las dos preguntas con recomendación explícita. **Eligió así, y se guarda
igual que un veredicto porque es una decisión de diseño que de otro modo moriría en el chat.**

### 1 · ALCANCE — «Sólo Narrativa, y su propio run para el resto»

**No eligió ninguna de las dos opciones extremas.** Ni cambiar la convención de los tres
formularios dentro de este run —que habría metido en `#108` superficie que su QA no miró— ni
dejar dos convenciones conviviendo sin plan.

**Consecuencia, en dos partes:**

- **`#108` ronda 3** reordena **SÓLO Narrativa**, sacándola de la cola compartida. Tarjeta y
  Lista con etiquetas **no se tocan**.
- **Se abre un run propio** que unifique la convención en todos los formularios de
  diapositiva, **colocado por delante de los siete componentes que quedan**, para que la
  hereden en vez de acumular deuda.

**La cabina había recomendado la primera opción —la convención para todos de una vez— y el
operador eligió mejor:** su respuesta consigue el mismo resultado final sin ampliar `#108`
sobre superficie no revisada, y sin perder la convención por el camino.

### 2 · ORDEN DE LOS DOS CONTROLES QUE NO SON «campo + tamaño» — «Tipo arriba, casilla al final»

**«Tipo de narrativa» va primero**, porque cambia la variante entera y condiciona todo lo que
viene debajo. **«Centrar verticalmente» va al final**, porque es colocación y no contenido.
En medio quedan los tres pares `campo → tamaño` sin nada intercalado.

**EL ORDEN APROBADO, y es el contrato de la ronda 3:**

    1. Tipo de narrativa
    2. Título              → 3. Tamaño del título
    4. Espaciado título–párrafo   (pertenece al par del título)
    5. Texto               → 6. Tamaño del texto
    7. Centrar verticalmente

**El espaciado queda pegado al título y no al texto**, y esto es derivación de la cabina, no
palabra del operador: es el margen ENTRE los dos, y el control que ya vivía junto al tamaño
del título. **Si al verlo prefiere otra cosa, manda él.**
