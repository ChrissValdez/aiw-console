# Veredicto de QA del #266 — pasa; y `\allowbreak` no entra

> Run `RUN-CANTU-NARROW-SCREEN-FIXES-PROCEDURE-TAGGED-LIST-ALLOWBREAK-001` (#266), petición 31 de Lecciones, partes 3,
> 4 y 5. QA de 3 pasos, con la forma fija, sobre
> `drafts/web/qa_cabina/qa_2026_10_18/tres_arreglos_para_pantallas_angostas` y las capturas del taller.

## Las palabras del operador — LITERALES

```
pass procede
```

## Lectura de la cabina

- **Pasos 1 a 3: pasan.** En el escritorio no cambia nada; a 320 px la caja de la fórmula de L06 ya no se desliza y
  la «Lista con etiquetas» de L04 ya no corta palabras (pasos 2 y 3 vistos en las capturas, no en un teléfono).
- **«procede»** responde a las dos preguntas que la cabina dejó fuera de la QA, en el mismo turno, con sus
  recomendaciones:
  1. **`\allowbreak` NO se admite.** MathJax 2 y 3 de Moodle no lo definen y lo pintan en rojo; MathLive también.
     Lecciones resuelve L05·EG en el borrador («Incorrecto: \(5\)» / «Correcto: \(500\)», con «disminuye» en la
     explicación), medido por el taller: L05 queda en 0 en Web y en Moodle M3. Si un día hacen falta muchas fórmulas
     largas en renglón, el camino entero es un run propio.
  2. **Los nodos del diagrama en un Moodle sin guiones** (no se abren: `onclick`, previo) **no abren run ahora**: el
     Moodle de este proyecto conserva los guiones. Queda nombrado; se saca si Lecciones lo ve.
