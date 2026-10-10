# Veredicto · `#245` y `#246` · QA · PASS, y un run corto para el escape de «Para saber más»

**2026-10-10.**

Runs:

- `#245` RUN-CANTU-PAGE-DESIGN-SMALL-SCREENS-001 · ««Diseño de página» on small screens: the page gives the lesson its
  width back»
- `#246` RUN-CANTU-TABLE-FORM-WRITES-ONLY-THE-EDITED-ROW-001 · «The two-column «Tabla» form writes only the row being
  edited»

## Vehículo

- **`#245`:** capturas de un teléfono de 375 px, antes y después, enviadas al chat:
  - `cap.1-primera-pantalla`
  - `cap.3-tablas`
  - `cap.6-estrecha-primera-pantalla`

  No hubo pasos en el editor.
- **`#246`:** tres pasos en el editor sobre el borrador montado
  `qa_cabina/qa_2026_10_10/tabla_con_encabezados_el_contrato` (bloques 06 y 03), sin guardar.

## Corrección de la cabina, publicada al operador

El botón de A+ no causaba el desborde del móvil. La cabina lo había heredado del `#240` sin medirlo; el `#245` lo
midió por contrafáctico.

## Lo que la cabina no verificó, declarado al operador

La suite completa con los dos cambios juntos:

- cada taller corrió la suya mientras el otro trabajaba;
- las 4 rojas «ajenas» del `#246` eran del `#245` a medio camino, y el `#245` las dejó fijadas al terminar;
- en la máquina de la cabina la suite excede su tiempo.

## Las respuestas del operador, verbatim (componente de preguntas; las preguntas las redactó la cabina)

1. **«#245 · El móvil (banda 8 px, margen 16 px, a partir de 600 px o menos; la tabla de 3 columnas ya no se apila porque cabe): ¿lo apruebas?»**
   → «Sí, pasa (Recomendado)»
2. **«#246 · Los 3 pasos en el bloque 06 y el 03 (sin guardar): ¿cómo salió?»**
   → «Pasa»
   - La opción decía: «Cierro el #246; acepto que una tabla vieja pueda quedar mixta (hoy no hay ninguna publicada).»
3. **««Para saber más» abierto, con A+ tres veces, en un teléfono, se sale 29 px por el mismo escape que se arregló en la tabla. ¿Lo arreglamos?»**
   → «Sí, run corto (Recomendado)»
   - La opción decía: «Una línea en el «Bloque HTML» para que las fórmulas no se escapen de su caja; lo publicado se
     mueve solo ahí.»

## Lo que se sigue

- **El `#245` y el `#246` se cierran.**
- **Run nuevo y corto:** el `.katex-mathml` no se escapa de la caja del «Bloque HTML». Se inserta en la cola y se abre.
