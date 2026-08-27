# DECISIÓN DEL OPERADOR — `RUN-CANTU-TOKENS-JS-SHARED-FALLBACK-CROSSES-RAILS-001`

> Tomada por **Christopher Valdez Cantu** el **2026-08-27**, al cerrarse la parada de análisis.
> Registro de la parada: `PARADA-RUN-CANTU-TOKENS-JS-SHARED-FALLBACK-CROSSES-RAILS-001.md`.

---

## LO QUE DIJO, VERBATIM

> **«vamos con C»**

Y antes, sobre el orden de la sesión:

> **«procedamos con tu recomendacion»**

---

## QUÉ ES «C»

De las cuatro opciones que la cabina le dibujó con su coste medido:

> **C — retirar la tabla de color de `tokens.js`; cada carril lee el respaldo de SU `commons.js`.**
> Mueve **27 superficies** de diapositiva y **0** de Web. **No rompe `C1` ni `C1-bis`.**
> **No requiere juicio visual.**

Las descartadas, y por qué se descartaron con lo medido delante:

- **A** — convergir los nueve `.main` a los valores de diapositiva. **Rompe `C1` y `C1-bis`**, las
  dos guardas que el lote 0 de `#134` escribió a propósito, y **repinta 14 superficies del carril
  Web**, que ninguna decisión registrada del operador ha pedido.
- **B** — partir `tokens.js` en dos tablas. Mismo coste en superficies que C, pero **deja tres
  respaldos donde C deja dos**.
- **D** — no tocar nada. Deja el cruce de carril vivo, y `#139` se lo encuentra otra vez.

---

## LAS RAZONES QUE SE LE DIERON, Y SON LAS QUE SOSTIENEN LA ELECCIÓN

1. **C es la única que QUITA una tabla en vez de añadir criterio.** Hoy hay tres respaldos y
   `tokens.js` es el único que cruza de carril; retirarlo deja dos, cada uno en su lado.
2. **El destino ya existe.** `web/partials/commons.js` tiene su tabla completa (`PALETTE` +
   `VARIANTS` por nombre de color). No hay que inventar valores nuevos.
3. **`renderTable.js` tiene UNA sola ranura de color**, que es exactamente para lo que
   `commons.resolveVariantAccent` existe.
4. **Cero superficies de Web se mueven**, así que no hay que pedirle un veredicto visual sobre un
   carril que no pidió tocar.

---

## LO QUE ESTA DECISIÓN **NO** DECIDE, Y QUEDA DICHO PARA QUE NADIE LO LEA DE MÁS

- **No decide qué pasa con las 32 copias privadas de la tabla vieja** escritas a mano en el motor
  —145 apariciones en código—. Es un hallazgo nombrado, no abierto.
- **No decide `.bg` ni `label` de `tokens.js`.** Medido: `.bg` no se renderiza nunca, en ninguno de
  los dos carriles. Retirar el color arrastra esas claves por construcción, pero **nadie las mira**.
- **No cierra el compromiso pendiente de `#134`** —los dos hexes del verde del paso de resultado—.
  Medido en la parada: `renderStackSlide.js` **no lee `tokens.js`**, sus dos verdes son literales
  escritos a mano, y **ese trabajo no depende de este run**.
- **No cambia quién resuelve el color.** El motor sigue recibiendo hexes ya hechos del compilador y
  sigue sin conocer la paleta. Esta decisión mueve **de dónde sale el RESPALDO**, no quién manda.

---

## LO SIGUIENTE

**D-070:** el ticket de este run va en **sesión nueva**. La parada queda cerrada y su nota dentro
del `full_description` del run **se transforma, no se borra**: pasa a declarar que la parada se
celebró, cuándo, qué midió y qué eligió el operador.

El run sigue **`planned`**. **No se abrió, no se emitió encargo, y el canónico sólo cambia en el
`full_description` de este run.**
