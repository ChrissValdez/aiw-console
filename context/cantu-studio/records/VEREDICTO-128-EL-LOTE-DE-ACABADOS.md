# VEREDICTO 128 — el lote de acabados, y la prueba que congelaba el defecto

> Run: `RUN-CANTU-SLIDE-EDITOR-FINISHING-BATCH-001` · `queue_order` 128.
> Operador **Christopher Valdez Cantu**, **2026-08-20**. Transcrito **VERBATIM**.

---

## SUS PALABRAS

**Ronda 1:**

```
primero que nada el interrumpeto encendido lo quiero como default
Se ve mejor el interruptor encendido en nota destacada en slide

segunndo si se ve cengtrado la regla matematica aunuqe el titulo de la regla se ve pequeño,
pero aqui es porque no teng el control de tamaño de letra me imagino que en studio se veria
bien

Entonces ok a todo procedamos
si pude insertarl el json
```

**Ronda 2:**

```
ok, pass
```

---

## PARTE 1 — EL LOTE FUNCIONÓ, Y ERA UN EXPERIMENTO

Seis acabados sueltos agrupados en un run, aprobado por el operador sobre la propuesta de la
cabina —que recomendó dejar fuera el séptimo, el vídeo, por ser decisión de diseño y no
acabado—. **Los seis se entregaron; ninguno se cayó.**

**El entregable que más valió no fue ningún arreglo, sino el triaje de las 44 medidas de
armazón**, y su primera línea es contraintuitiva: **el censo no puede medir su propio arreglo.**
Cuenta declaraciones en píxeles, y el arreglo correcto **no las quita** —deja el píxel como
ancla de «ausente» y añade el derivado en línea—. **Después del run el censo sigue diciendo 44.**

| | |
|---|---|
| 5 | ya derivadas antes |
| 2 | pasan a derivarse aquí |
| **21** | **se quedan en píxeles, con motivo** — incluido **un falso positivo del censo** |
| 16 | proporción del texto, nombradas y NO tocadas — 12 de ellas de la Tarjeta |

**De las 44, 26 no eran un defecto.** Y dos grupos de la Tarjeta **son quejas suyas ya
reportadas en la Nota** —el icono que no crece, el borde que no escala—, sin reparar allí.

---

## PARTE 2 — DOS CIFRAS DE LA CABINA ERAN CORTAS, Y GANÓ EL DISCO

- **Los rótulos con «(opcional)» eran TRECE, no once.** Faltaban un cuarto «Descripción» y un
  «Rótulo» de Web. **Se retiraron los trece.**
- **Las semillas de la Nota son TRES, no dos** — y **la de diapositiva no traía `wrn`** sino
  `meta`, puesto por `#124` para que valiera lo mismo que el respaldo. Las dos de `wrn` son **las
  dos de Web**. Por eso se pudo tocar la de diapositiva sola.

**Las otras tres cifras fechadas —44 medidas, tres pistas, dos `bulb`— aguantaron exactas.**

---

## PARTE 3 — UN HALLAZGO QUE LA LISTA DE LA CABINA NO PREVEÍA

**Centrar el título de la Regla MUEVE UN ÁRBOL.** El ticket declaró que los únicos que debían
moverse eran los de `bulb` y los del armazón; **faltó el que toca el motor por HOJA DE ESTILO**.
Centrar *es* cambiar lo que se pinta, y el bloque de estilo viaja verbatim en el marcado.

**El taller lo reportó y no paró**, y acertó: parar el acabado 1 habría sido no entregar lo que
el operador pidió con sus palabras.

---

## PARTE 4 — LA PRUEBA QUE CONGELABA EL DEFECTO, ENCONTRADA Y DESACTIVADA

La ronda 2 pedía que la Nota naciera con «Sutil» encendido. Al implementarlo, el taller encontró
que **una guarda de `#124` exigía literalmente `semilla.variant === 'meta'`**.

**Era lo único que impedía lo que el operador pedía**, y es **exactamente el patrón que este
proyecto tiene escrito como su lección más cara**: *el defecto vive en el valor por defecto, y
una prueba lo congela*. Ocurrió con «Automático», que el operador tuvo que pedir dos veces.

Ahora esa guarda exige que la semilla **declare** su variante, no cuál. **Y la separación la
vigila una guarda nueva que se pone ROJA cuando alguien mueve el RESPALDO DEL MOTOR creyendo que
mueve la SEMILLA** — que es el error caro, y se vio rojo en el arnés con ese nombre.

**La medición que hizo esto barato:** 51 notas en el corpus, **cero sin `variant`**. Ninguna
depende del defecto, así que cambiarlo no pudo mover ninguna. **63/63 árboles intactos en la
ronda 2** es la prueba de que no se tocó el respaldo.

---

## LO QUE QUEDA ABIERTO, NOMBRADO Y NO DECIDIDO

- **Al nacer sutil, la nota nace SIN ICONO.** Antes heredaba el cubo de `meta`. **El taller no lo
  compensó sembrando uno**, y acertó: sería decidir por él un dibujo que no pidió. El operador
  lo vio en la QA y pasó.
- **Las semillas de Web siguen en `wrn`.** Nadie ha pedido cambiarlas.
- **`variant` ya carga dos trabajos** en diapositiva desde que dejó de nombrar un color.
- **Las 16 medidas de armazón** que el triaje nombró y no tocó, 12 de ellas de la Tarjeta.
- **El vídeo en su celda**, que sigue siendo decisión de diseño suya.

---

## UNA COSA QUE NO ERA UN DEFECTO, Y SE DEJÓ ESCRITO

El operador dijo que **el título de la Regla se ve pequeño**, y **él mismo apuntó la causa**:
«aquí es porque no tengo el control de tamaño de letra». **La página de QA es un render estático
sin editor; en Cantu Studio ese control SÍ existe**, lo montó `#126`. Se escribió dentro del run
para que nadie lo persiga como defecto.
