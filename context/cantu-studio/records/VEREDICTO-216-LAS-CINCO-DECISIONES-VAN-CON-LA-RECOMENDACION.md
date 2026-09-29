# #216 · Las cinco decisiones del operador: van con la recomendación de la cabina

**Fecha:** 2026-09-28 (hora del operador, CDMX) · **Run:** `#216` `RUN-CANTU-PUBLISHED-LESSON-IS-IMPORTABLE-001`
«A published lesson can be brought back into the editor» · **Cerrado** `active → completed`, medido y propuesto.

---

## Las palabras del operador, verbatim

> vamos con tus recomendaciones

**Qué es y qué no es.** Es un **acuerdo con las recomendaciones que la cabina redactó**, no una
medición. Las opciones y su dibujo salieron del reporte del taller
(`cantu-studio: QA/temp/RUN-CANTU-PUBLISHED-LESSON-IS-IMPORTABLE-001/99-REPORTE.md`, §8). Las
recomendaciones fueron de la cabina, salvo la D3: esa la cambió una medición de la cabina (ver abajo).
Se le presentaron dos veces, la segunda en forma breve, con este formato de respuesta pedido:
`D1 B · D2 A · D3 B · D4 B · D5 sí`.

## Lo que quedó decidido

| | pregunta | elegida | en una línea |
|---|---|---|---|
| **D1** | ¿El detalle de cada paso del «Procedimiento matemático» de Web puede llevar el formato de las lecciones publicadas? | **B** | Se abre sólo a las etiquetas de formato medidas (quinta variante + `span` + `code`), con la compuerta de forma del Bloque HTML. |
| **D2** | El HTML dentro de «Dos columnas» (figura de valor absoluto, lista PEMDAS) | **A** | Se reexpresa con lo que existe: `iconList` y `visual`, admitiendo líneas punteadas en el SVG. |
| **D3** | Las lecciones escritas a mano en el vocabulario de Core | **B** | Se migran una vez al vocabulario del editor. |
| **D4** | `calculation`, que el editor no tiene | **B** | Se pide como componente, con las peticiones de la parada de análisis. |
| **D5** | El comentario HTML sin cerrar que pasa la puerta, y las etiquetas `tag` de la jerarquía que no se pintan | **sí** | Cada uno con su run. |

## La medición de la cabina que cambió una recomendación

El taller recomendaba decidir la D3 **después** de contar `cantu-lessons`, que él no ve. La cabina lo
contó el 2026-09-27: **ninguna lección escrita a mano en el vocabulario de Core**. Sus 35 JSON son
borradores del editor, y sus 7 `.js` son salida del compilador. Sonda: extensiones más búsqueda del
vocabulario de Core. Con eso son **10** lecciones (2 publicadas + 8 de staging), y la recomendación
pasó a **B**.

## Una decisión de la cabina al traducir esto a runs, declarada

La D5 pedía un run por defecto. El comentario sin cerrar **va dentro del run de la D1**, no aparte.
Los dos cambian la misma pieza, la guarda de prosa y la compuerta de forma, y la regla del operador es
agrupar los arreglos del mismo componente. La etiqueta de la jerarquía **sí** tiene su run propio.

## Pregunta abierta al cerrar

`rule.description` rechaza `<strong>` (C9 del reporte). Es candidata a «prohibido por descuido», pero
no estaba entre las cinco decisiones. Se le preguntó al operador el 2026-09-28 si entra en el run de
la guarda de prosa.
