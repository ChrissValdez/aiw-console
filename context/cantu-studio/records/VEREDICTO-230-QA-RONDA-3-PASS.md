# Veredicto · `#230` RUN-CANTU-HTML-BLOCK-FOLLOWS-THE-PAGE-001 · QA de la ronda 3 · PASS

**2026-10-09.**

## Vehículo

Las capturas de antes y después de `operar_con_signos`, enviadas al chat por la cabina. Están en
`QA/temp/RUN-CANTU-HTML-BLOCK-FOLLOWS-THE-PAGE-001/capturas-ronda2/`:

- **la tabla de signos,** con la opción B, es byte a byte la misma imagen que antes, en WEB y en MOODLE. La cabina
  lo verificó por sha256: `b9c6cb93…` en WEB y `3501f668…` en MOODLE;
- **la franja de «Compruébalo tú»** pasa del azul claro al verde jade.

Los pasos 1 a 3 (paleta activa y A+/A-) ya estaban aprobados: `VEREDICTO-230-QA-RONDA-2-PASA-Y-VUELVE-A-LA-B.md`.

## La respuesta del operador, verbatim (componente de preguntas)

- **«#230, ronda 3 (opción B), operar_con_signos: la tabla queda igual que antes, con su verde y su rojo, y solo la franja de «Compruébalo tú» pasa a tu verde jade. ¿Lo apruebas?»**
  → «Sí, pasa (Recomendado)»

## Lo que nadie vio

- un Moodle real: su purificador de HTML y A+/A- por `postMessage`;
- `operar_con_signos` no se regeneró en `exports/`. Volver a publicarla es decisión del operador, aparte de este run.
