# VEREDICTO — `#183` «Admit the color command into the math allowlist»

**Fecha: 2026-09-04** · **Run:** `RUN-CANTU-MATH-ALLOWLIST-COLOR-COMMAND-001`
**Commit del trabajo:** `11d743bf`

---

## El veredicto, VERBATIM

```
pass
```

**QA DE PANTALLA, ejecutada.** Tres pasos, con el paso 0 obligatorio de cerrar y reabrir el
lanzador porque el motor se cachea por proceso. `pass` global, sin detalle por paso — que es
como decide, y así queda registrado.

---

## Qué se probó, y con qué

El operador pidió un JSON para insertar y probarlo. La cabina **no lo tecleó**: derivó la forma
de `createDefaultStackSlideBlock` —la fábrica del propio repo, que el importador ya usa como
«la forma buena»— y **validó el candidato dos veces antes de entregarlo**:

1. Contra `DraftSchema.shape.slideBlocks.element`, el mismo esquema que corre al importar. **Validó.**
2. Contra `validateLatexPayload`, que es lo que corre **al editar**. **7 de 7 fórmulas OK**, con
   control negativo: `\dddot{x}` sí falla con `UNKNOWN_LATEX_COMMAND`, así que el validador
   estaba vivo y no diciendo que sí a todo.

El JSON llevaba **las dos formas** del corpus a propósito: `{\color{#X}{...}}` con grupo de
contenido, y `{\color{#X}-5}` sin él — que era el caso que estuvo a punto de quedarse fuera del
diseño.

---

## Lo que este run arregla, en las palabras del problema

El operador no podía editar sus propias fórmulas. Las abría, se veían bien, y al tocar cualquier
cosa saltaba *«La fórmula no es válida: el comando `\color` no está en la lista de comandos
permitidos»*. Reescribirla entera a mano parecía arreglarlo, y eso desconcertaba.

**Ya no salta.** Y la razón por la que reescribirla «funcionaba» era que la UI emite `\textcolor`,
no `\color`: nunca escribía la misma fórmula.

---

## Lo verificado por la cabina, cargando los dos módulos

| | antes | ahora |
|---|---|---|
| `ALLOWED_LATEX_COMMANDS` | 230 | **231** — añadido `color`, quitados ninguno |
| `BLOCKED_LATEX_COMMANDS` | 27 | **27** — sin tocar |
| `ALLOWED_LATEX_ENVIRONMENTS` | 12 | 12 |
| `SAFE_HEX_COLOR_PATTERN` | — | idéntico |

`colorbox` y `fcolorbox` siguen fuera. **`src/content` intacto**: las 27 apariciones siguen en
disco, que era la condición por la que el operador eligió esta opción y no convertir el contenido.

**Suite, del taller:** línea base **2339/2339** tomada *antes* de tocar nada, y **2347/2347**
después. El +8 es su fichero de pruebas nuevo.

---

## El hallazgo del taller que cambió el diseño

En el corpus, `\color` aparece **también sin grupo de contenido**. Exigirle dos argumentos como a
`\textcolor` **habría rechazado contenido ya publicado**. Por eso el límite quedó en **un grupo,
con el mismo hex seguro** que su hermano — ni más ancho ni más estrecho: KaTeX acepta
`\color{red}` y la allowlist no.

Y midió la pegajosidad ejecutando, que era el criterio 4: `\color{X} a b` tiñe las dos;
`{\color{X}{a}} b` solo la primera. **La contención de `color` no es suya, es del grupo que lo
envuelve**, y eso queda escrito en el código.

---

## Tres fallos de medición de la cabina en este run, los tres cazados antes de publicar

1. **Comparó el blocklist con `sed`, el `sed` reventó, y los dos md5 salieron `d41d8cd9…` — el
   md5 de la cadena vacía.** Concluyó «idéntico» comparando nada con nada. La conclusión resultó
   cierta por casualidad. **Tercera vez en la sesión** que un vacío se le lee como resultado.
2. **Una sonda dio `historyLimit` por obligatorio** porque solo miraba si `optional()` estaba en
   la misma línea, y el campo se define en varias. Lo desmintió validando contra el esquema real.
3. **Índices de `process.argv` mal puestos** en el script de validación, y luego **una función
   inexistente** (`sanitizeLatex` en vez de `validateLatexPayload`) que hizo «fallar» hasta a
   `\mathbf{-2}`. Esa se delató sola: cuando falla el control trivial, falla la sonda.

---

## Lo que sigue, y por qué en este orden

**`#184` `RUN-CANTU-JSON-IMPORT-MATH-VALIDATION-PARITY-001`.** Este run arregló el síntoma; aquel
arregla la clase. **El diagnóstico de fondo fue del operador, no de la cabina:** *«no está
sincronizado lo que acepta el editor con la revisión del json insertado»*. Medido: el esquema del
borrador tiene **once campos `math`** y alcanza la allowlist **en uno solo**; **tres** validan
solo que la cadena no esté vacía, y uno de esos tres es el paso del procedimiento.
