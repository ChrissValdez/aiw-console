# VEREDICTO DEL OPERADOR — `#108` ronda 3, y cierre del run

> **Recogido por la cabina el 2026-08-17.** Cierra `RUN-CANTU-SLIDE-NARRATIVE-AUDIT-AND-IMPLEMENT-001`
> después de tres rondas y dos ampliaciones por D-061.

## SUS PALABRAS, VERBATIM

    pass

## QUÉ APRUEBA, Y QUÉ NO DICE

**Aprueba la QA de la ronda 3, que eran cuatro pasos sobre el editor real:** el orden de los
siete controles del formulario de Narrativa, y que Tarjeta y Lista con etiquetas siguieran
como estaban. **El paso 3 era el único con consecuencia de parada y no la disparó.**

**LO QUE ESTE VEREDICTO NO DICE, y no se da por dicho:**

- **No resuelve el puesto 4.** Que «Espaciado título–párrafo» vaya pegado al título es
  **derivación de la cabina, no palabra del operador**, y está marcado como tal en el código.
  Se le preguntó en el mismo turno y no lo contestó. **Sigue abierto y sigue siendo suyo.**
- **No resuelve «Extra grande» vs «Muy grande».** Pidió explícitamente en la ronda 2 que no se
  tocara aquí, y no lo ha reabierto. **Sigue abierto y sin dueño.**

**Un «pass» de una palabra aprueba lo que se le pidió mirar y nada más.** Ninguna de las dos
cosas de arriba estaba en los cuatro pasos.

## CÓMO CERRÓ EL RUN — tres rondas y dos enmiendas

| Ronda | Qué entregó | Cómo se cerró |
|---|---|---|
| **1** | `narrativeType` por contrato, con sus dos nombres y su red | Sin QA visual: el operador revisó y encontró cuatro cosas más |
| **2** | Dos escaleras propias para el título y el espaciado; el diagnóstico real de «centrar verticalmente» | **QA de 8 escenas, ejecutada.** «jala bien» |
| **3** | El formulario reordenado: cada campo pegado a su control de tamaño | **QA de 4 pasos, ejecutada.** «pass» |

**Las dos ampliaciones fueron por D-061**, las dos aprobadas por escrito por el operador, las
dos sobre la superficie que su propia QA había ejercitado, y ninguna cambió la identidad del
run.

**LA APERTURA DEL MOTOR NO SE HEREDA.** Este run abrió el motor **sólo para Narrativa**. Para
R5 en adelante el plan de quince sigue declarándolo de sólo lectura, con su parada intacta.

## EL TALLER CONTRADIJO A LA CABINA TRES VECES EN ESTE RUN, Y ACERTÓ LAS TRES

**No es anécdota: es el mecanismo, y las tres correcciones eran de la cabina, no del plan.**

1. **Ronda 2 — «centrar verticalmente» no estaba roto.** La cabina había dejado escrito en el
   veredicto de la ronda 1 que la causa del estándar «seguía abierta», sugiriendo un defecto.
   Medido en navegador: **funciona y mueve entre 97 y 332 px en 5 de 6 rejillas**. En la
   variante entrada es un no-op porque la hoja ya declara `justify-content:center; height:100%`.
   **El único caso inerte es de la rejilla, no del componente.**
2. **Ronda 2 — `tokens.js` no tenía cinco escalas sino diez**, con ocho resolvedores de tamaño.
   La cabina nombró cinco porque su sonda sólo vio los que ya conocía. **Las tres que faltaban
   —las de la Portada— eran el precedente más cercano al caso, y fueron el molde que se siguió.**
3. **Ronda 3 — la palanca era la CONDICIÓN, no la lista.** La enmienda de la cabina decía que
   la cola compartida estaba «gobernada por `TIPOS_CON_TAMANO_DE_TEXTO`», lo que invitaba a
   sacar `'narrative'` de ese array. **Habría sido un error doble:** ese array es espejo
   declarado del esquema —que sigue admitiendo `textSize` en los tres tipos— y **dos pruebas
   ajenas al run fijan su literal exacto**. El taller dejó la lista intacta y filtró una
   derivada.

**El patrón de los tres fallos de la cabina es el de siempre: sondas que no distinguen.** Y en
el tercero hay algo peor y se dice: **el ticket de la cabina lo decía bien y su enmienda lo
decía mal.** Dos textos suyos en desacuerdo, y sólo el taller lo notó.

## LO QUE QUEDA NOMBRADO Y NO REPARADO

- **Las pistas `1fr` no reparten en partes iguales.** Cuatro filas `['1fr','1fr','1fr','1fr']`
  se pintaron 228,3 / 83,3 / 83,3 / 288,7 px. Tensiona la promesa del mapa de que «una fila
  vacía conserva su altura». **No es la fusión del `#109`, pero es la misma superficie.**
- **La casilla «Centrar verticalmente» en la variante entrada es un no-op visible.** Ocultarla
  allí exige que apagada deje el texto arriba, y eso movería las `lead` que ya existen en dos
  ficheros del corpus. **Decisión del operador.**
- **El conflicto de rótulo del cuarto peldaño**, arriba.
- **El puesto 4 del formulario**, arriba.
- **La convención campo→tamaño para los demás formularios** tiene su run, el `#111`, colocado
  por delante de los siete componentes que quedan. **Narrativa es su piloto.**

## LA SUPERFICIE QUE NADIE VERIFICÓ AUTOMÁTICAMENTE

**Van SIETE runs consecutivos** cuya superficie visual sólo la juzga el ojo del operador. El
proyecto no tiene renderizador de React y la cabina no ve interfaces. **Se nombra en cada
cierre para que el operador decida si acumula riesgo.**

En este run la cobertura fue mejor que en los seis anteriores —el taller construyó guardas que
renderizan de verdad, `medir-cola-compartida.mjs` y `medir-invariancia.mjs`— pero **la guarda
de la cola compartida sólo corre en Windows**: necesita el binding nativo de `rolldown` y en el
sandbox de la cabina no existe. **La cabina la verificó por vía estática, que es más pobre.**
