# Veredicto de QA del #255 — pasa, y el número del paso no coincide con su etiqueta

> Run `RUN-CANTU-STEP-NOTES-AS-PIECES-CONTRACT-001` (#255). La QA es la de 3 pasos que la cabina entregó con la forma
> fija «archivo, pasos, veredictos», sobre el borrador `qa_cabina/qa_2026_10_11/notas_hechas_de_piezas_el_contrato`.

## Las palabras del operador — LITERALES

```
algo raro paso con este draft

aparecE:;
Borrador del #255: el ejemplo guiado de L01 escrito con piezas, y lo que la forma de siempre no podía escribir.


pero en el studio no se ve el componente de texto donde se escribio esto:

otro error
la etiuqeta y el numero de paso de procedimiento matematico no coincided
esto pasa porqeu marca como paso 1 el paso 0

mejro que aparezca paso (y lo que aprece en la etiqueta ) 
por default empeiza en 0 
ahora a grandes rasgos jala bien los 3 pasos si
```

## Lectura de la cabina

- **Pasos 1, 2 y 3: pasan** («a grandes rasgos jala bien los 3 pasos si»).
- **Preguntas 4 y 5** (el párrafo gris y centrado de «Ver cálculo» y la raya punteada) **sin contestar**. Quedan
  abiertas; si el operador dice que no le valen, el cambio va hacia adelante.
- **«Borrador del #255: …» no es un bloque.** Es el **subtítulo de la lección** (`lesson.subtitle`), que se escribe en
  la barra de arriba del editor, campo «Subtítulo» (`LessonContextBar.jsx`). No es un defecto del #255. Si el operador
  no lo encuentra ahí, es un hallazgo de esa barra.
- **El número del paso: defecto del FORMULARIO, no del contrato.**
  - El formulario rotula «Paso {índice + 1}» (`WebBlockEditor.jsx`), y la vista previa numera desde 0, con la
    etiqueta como pista del #239.
  - El operador pide que el formulario diga «Paso» seguido de lo que dice la etiqueta, y que sin etiqueta empiece
    en 0.
  - Cae sobre el formulario del #256, cuya QA todavía no se ha hecho: va como enmienda D-061 del #256, pedida por
    escrito aquí.
