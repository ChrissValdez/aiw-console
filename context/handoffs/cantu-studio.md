# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina el **2026-08-26**, al cerrar la sesión de `#142`.
> **Sustituye al relevo del 2026-08-22.**
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el canónico al abrir. Gana el
> disco.**

---

## ⚠ LO PRIMERO: DERIVA LA RUTA Y PRUEBA LA CAPACIDAD

La ruta de montaje **cambia entre sesiones**. No la heredes. Prueba que se lee el workspace, que
`git log` responde, **que el borrado está habilitado** y que `.git` es escribible.

**Comprueba `.git/index.lock` en los cinco repos con `ls`, nunca corriendo git.** En esta sesión
no apareció ninguno, en ninguna de las decenas de operaciones de git. Compruébalo igual.

### EL VEHÍCULO PARA ESCRIBIR EL CANÓNICO — medido el 2026-08-25

- Canónico: **`cantu-studio/.aiw/roadmap/roadmap.json`** (no `roadmap/roadmap.json`).
- Motor que lo conoce: **`aiw-console/tools/roadmap/roadmap-core.mjs`**, porque el canónico usa
  la clave `lane`. El de `cantu-studio` no la conoce.
- **Se escribe por la consola**, levantando `projects/aiw-console/project-console/serve.mjs` en un
  puerto libre y haciendo POST a
  `/projects/cantu-studio/__project-console/roadmap/edit`. Dry-run primero, luego apply con el
  baseline. `serve.mjs` re-emite `.project/` él solo.
- **Los nombres de los argumentos NO son los que parecen.** Medido a base de rechazos:
  - `set-status` → `{ run, status, closeoutResult }` — **`run`, no `runId`**.
  - `set-text` → `{ targetType, targetId, fullDescription }`.
  - `insert` → `{ runId, title, summary, fullDescription, before }`.
- **`checkInvariants` exige un `Set`, no un array**, y necesita los `externalRunIds` REALES.
  Con `externalRunIds: []` da **un rojo falso** de dependencia colgante. Se obtienen con
  `externalRunIdsFor('cantu-studio')` de `serve.mjs` — son **155**.

---

## ESTADO DEL CANÓNICO — medido el 2026-08-26 a las 03:07

```
total 160 · completed 139 · active 1 · planned 20
validador: EXIT 0 · history=139 · ready_next=20
densidad 1..N: true · ids únicos: true
```

- **Único run activo: `#134` «Make the author palette win over the engine fixed colour tables».**
- **Siguiente por cola: `#136` «Decide and migrate the tokens.js fallback, which both rails read».**

---

## LO QUE ESTA SESIÓN CERRÓ: `#142` «Expose the Jerarquia slide type»

`RUN-CANTU-SLIDE-HIERARCHY-TYPE-EXPOSE-001`, cerrado con **aprobación explícita del operador**,
verbatim en su `closeout_result` y en `records/VEREDICTO-142-JERARQUIA-Y-EL-DESBORDE.md`.

El tipo estaba **construido y era inalcanzable**: 328 líneas de motor, **cero** menciones en el
compilador, sin fichero de formulario. Ahora la cadena entera existe.

**Tres enmiendas D-061 encadenadas**, todas nacidas de la QA del propio operador:

| enmienda | qué cerró | opción elegida |
|---|---|---|
| la fórmula | el nodo pintaba LaTeX en crudo | **C** — envolver sólo si no hay delimitador ni HTML |
| el encaje | el árbol desbordaba la lámina | vía A sobre `fitEngine.js`, `transform` del escenario |
| el aire | rozaba el título y el borde | **B** — 80 px arriba, 40 abajo |

**Commits de la sesión, en orden:** `c0eb7254` (abre) · `3e855b38` (el tipo) · `22e0d0f5` +
`a5573ea9` (la fórmula) · `041b3f2e` + `fb77334c` (el encaje) · `5d8ea8e3` (el zoom) ·
`6e7de108` (el aire) · `b441d6b7` (cierre). Y en `aiw-console`: `9c008b0` (el veredicto).

### La causa raíz que costó tres rondas, y merece recordarse

El reproductor escala `#j-infinity-root` a la ventana — `scale(0.366667)` medido en el panel. El
ajustador **se comía ese zoom** creyendo que era el `scale` del autor: la letra le salía de 6,5 px,
bajo el suelo de 12, y concluía «esto ya nace en el suelo». No escalaba nunca. El operador lo
describió exacto: *«se ve igual siempre»*.

**La lección, y es general:** el taller verificaba en un **documento generado sin reproductor**, y
el operador miraba el **iframe del panel de previa**. Mismo código, vehículo distinto. **Cuando un
defecto sólo se ve en el vehículo del operador, hay que reproducirlo EN ESE VEHÍCULO antes de
tocar código.** La instrumentación previa —publicar si `data-geometry-fit` aparece y con qué
factor— separó «no llegó» de «llegó y midió mal» sin escribir una línea de motor.

---

## LO QUE QUEDA ABIERTO Y ES DEL OPERADOR

**De `#134`, que sigue activo:**

- **El re-fijado de los árboles del corpus.** **10 de 63 movidos**, y **la red de fixtures está
  roja por eso**. Es el único rojo de la suite y **espera autorización escrita**. Sin ella no se
  toca: es la regla de la casa.
- La QA de los pasos 2–7 de la migración de paleta, nunca ejecutada.

**De `#142`, nombrados en su `closeout_result` y sin dueño:**

- El glifo `Network` del mazo — inferencia del taller, vetable en una línea. Alternativa: `GitFork`.
- Exponer `hideHeader`, decisión de superficie.
- **`getMathContent` de «Procedimiento matemático» DOBLE-ENVUELVE** un math ya delimitado:
  `\[ x=1 \]` → `\[ \[ x=1 \] \]`. Alcanzable por «Insertar JSON»; **0 de 563** maths del corpus
  del stack lo pisan hoy. Latente y alcanzable.
- El esquema del nodo **no tiene `variant`**, así que el arreglo de precedencia de color de `#142`
  sólo alcanza al contenido manual, no al formulario.
- **La guarda de HTML del envoltorio es ciega en el canal del autor**: el compilador escapa el `&`,
  así que un `&nbsp;` escrito en el formulario llega como `&amp;nbsp;` y se envuelve igual.

**De antes:**

- La Portada: con el campo de color **vacío** (`""`, no ausente) el compilador emite `#4F75A8` en
  vez de dejar la clave fuera. Repinta de `#5E81AC` a `#4F75A8` sin que nadie lo pida, y son tan
  parecidos que no se nota. Causa: `block.accentColor !== undefined` es cierto para la cadena vacía.
- `.j-v14-badge` y `.j-anatomy-badge` **fuerzan blanco** desde la hoja: 1,2–1,35:1 con paleta clara.
- El desplegable de la Portada **miente** con el campo vacío: enseña «Azul acero» sobre un campo
  que no existe.
- Los tres hallazgos que `#135` dejó nombrados: una guarda que no puede ponerse roja, 34 copias
  locales de `soloCodigo`, y una guarda que sólo ve una forma de import.

---

## EL PATRÓN QUE MÁS RINDIÓ ESTA SESIÓN, y conviene repetirlo

**Dibujarle las opciones con su coste MEDIDO antes de pedirle que decida.** Se hizo tres veces —el
nombre del color de la Portada, la guarda de la fórmula, el aire del árbol— y las tres veces
eligió en una palabra: «C», «B», «B». Sin el coste delante, cada una habría sido una conversación.

**Y publicar el coste que la decisión paga.** El aire hace que la escena histórica del corpus
—que cabía por 2,7 px— deje de estar intacta. Se dijo antes de aplicarlo, no después.

---

## LO QUE ESTA CABINA HIZO MAL, para que el siguiente hilo no lo repita

**Cinco sondas falsas en una sola sesión, todas de la misma familia.** El patrón no distinguía
**comentario, CSS o cadena** de **código**, o el escape del shell se comía el regex:

1. «25 fórmulas peladas» → mezclaba los dos carriles.
2. «0 peladas» → el rebanado del fuente se saltó la escena de staging.
3. «21 peladas» → el escape de `node -e` rompió el patrón de delimitadores. **La cifra buena era 4.**
4. «el encabezado no va antes del escenario» → mi `indexOf` encontró la **regla CSS**, no el `<div>`.
5. «`fitEngine` en 3 fixtures» → eran el **script inline de stackSlide**, que lo nombra en un
   comentario. El taller decía 0 y tenía razón.

**La regla que sale de esto y que funciona: las sondas van en FICHERO, nunca en `node -e`.** El
shell se come los backslashes y el resultado es un número plausible y falso. El propio taller
aprendió lo mismo el mismo día.

**Y una sexta, de otra familia:** el validador dio **un rojo falso** por pasarle `externalRunIds: []`.
Failure mode 5 del manual —medir con la herramienta equivocada— y esta vez produjo un rojo, no un
verde. Ninguno llegó al disco, pero dos estuvieron a punto de reportarse como defecto del taller.

---

## LÍMITES DE LA CABINA RE-MEDIDOS EL 2026-08-26

- **Borrado, `add` y `commit`: funcionan.** Decenas de commits esta sesión, ningún lock.
- **`git push`: sigue sin ruta a GitHub.** Es del operador. **No se le recuerda.**
- **La suite completa NO cabe en una llamada.** 135 ficheros; hubo que partirla en **siete tandas**
  y aun así las tandas tardan distinto entre llamadas. `webCorpusFixtureNet` sola tarda ~160 s y
  algunas veces no termina.
- **`serverCleanMachineColorPaletteBootstrap` es FLAKY bajo paralelismo** en el entorno de la
  cabina: cinco rojas junto a otros 29 ficheros, 5 de 5 en verde sola. Levanta un servidor real y
  compite por recursos. **No es un defecto. Aíslala antes de clasificarla.**
- **Los procesos en segundo plano NO sobreviven entre llamadas de bash.** Un `nohup … &` se pierde,
  y su log también.

---

## LA INSTRUCCIÓN DEL OPERADOR AL CERRAR

Escrita por él, verbatim, en el veredicto de `#142`:

> cuando complemtemos y cerremos este run correctamente, pon un recordatorio de no abrir otro
> run, sino de hcaer el handsoff y abir una nueva sesion

**Este handoff es esa instrucción cumplida.** La sesión de `#142` termina aquí y **no se abrió
ningún run nuevo**. Lo que siga va en **sesión nueva**.
