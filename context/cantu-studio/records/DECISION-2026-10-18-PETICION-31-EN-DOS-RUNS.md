# Decisión del operador — la petición 31 va en dos runs, en paralelo

> Petición 31 de Lecciones (`cantu-lessons/docs/PARA-CANTU-STUDIO-2026-10-17.md`, commit e73ac3f): cuatro componentes
> que en pantallas angostas se desplazan o cortan, más permitir `\allowbreak`.

## Las palabras del operador — LITERALES

A la pregunta de la cabina («¿dos runs, A con su propia QA y B en lote, en paralelo, o uno solo?»):

```
que recomiendas
```

Tras la recomendación de la cabina (dos runs, A y B, en paralelo):

```
procede tu recomendacion
```

## Lo que queda decidido

- **A · «Diagrama jerárquico»** (partes 1 y 2 de la petición): un run propio, **con su propia QA**, porque lleva
  decisiones visuales (sangría por nivel, cuándo pasa a la forma de celular, cómo se encogen sus fórmulas).
- **B · los tres arreglos pequeños** (partes 3, 4 y 5): la caja de la fórmula del «Procedimiento matemático», la
  «Lista con etiquetas» y `\allowbreak`. Un run, **con una QA en lote**.
- **En paralelo:** sus superficies de escritura no se tocan (A: `renderHierarchy.js`; B: `renderTimeline.js`,
  `renderIconList.js` y la lista de comandos admitidos).
- Las QA se piden igual una a la vez.
