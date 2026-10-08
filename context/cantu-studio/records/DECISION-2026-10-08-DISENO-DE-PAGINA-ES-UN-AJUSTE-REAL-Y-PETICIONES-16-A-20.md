# Decisión · 2026-10-08 · «Diseño de página» es un ajuste real, y entran las peticiones 16 a 20 de Lecciones

**Hilo:** `cantu-studio`.

## La decisión, verbatim

> estoy deacuerdo  procede

**Contesta a la línea que propuso la cabina:**
`nombre: Diseño de página · ajuste real global: sí · Tarjeta (A): ok / lo que viste · Tarjeta decisiones: sí, Lecciones, nada · 16-20: sí`.
Es acuerdo sobre opciones que dibujó la cabina (trampa H). **La QA de la parte A (la Tarjeta) no la contesta:** el
`#228` sigue abierto y esperando su QA. Tampoco contesta la QA del panel (`#224`).

## Lo que acepta

1. **El control se llama «Diseño de página».**
2. **Es un ajuste real y global del editor**, como la paleta: se guarda y lo usan la vista previa, «Expandir»,
   «Abrir vista» y «Generar Web». Moodle no. Va en dos runs nuevos, contrato e interfaz:
   - `RUN-CANTU-PAGE-DESIGN-CONTRACT-001`, carril de lo publicado;
   - `RUN-CANTU-PAGE-DESIGN-EDITOR-001`, carril del editor, que lleva las correcciones de su QA del control
     (`VEREDICTO-225-QA-RONDA-1-EL-CONTROL-DEL-AIRE.md`).

   Absorben `RUN-CANTU-LESSON-PAGE-BREATHING-ROOM-001` y `RUN-CANTU-THEME-BADGE-BESIDE-THE-TITLE-001`, que se cierran
   como absorbidos. `RUN-CANTU-PREVIEW-PAGE-TRYOUT-CONTROLS-001` se cierra con su QA ejecutada: sus correcciones pasan
   al run de interfaz, y su código es la base.
3. **Las tres decisiones de la Tarjeta:**
   - sí al campo «texto después del recuadro»;
   - que Lecciones escriba la insignia como fórmula, `\(2n\)`;
   - nada en Slide por ahora.
4. **Peticiones 16 a 20 de Lecciones** (`cantu-lessons/docs/PARA-CANTU-STUDIO-2026-10-07.md`):
   - **16 y 18:** «Para saber más» lleva cuatro piezas (párrafo, fórmula centrada, «Recurso visual» y «Bloque HTML»).
     El caso real es el de la v3.29. Se enmiendan sus runs, y el ADR-007 pasa a ronda 2.
   - **17:** «Regla matemática» con ancho ajustado. Dos runs nuevos, después de la «Tabla».
   - **19:** «El porqué» se retira. «Lo que te llevas» espera al final de su fase.
   - **20:** la lección declara la paleta activa como variables CSS, en Web y en Moodle. Un run nuevo en el carril
     de lo publicado.
