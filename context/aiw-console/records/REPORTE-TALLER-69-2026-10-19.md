# Reporte del taller del `#69` — transcrito verbatim

Run: `#69` `RUN-CONSOLE-CLASSIFICATION-CLASS-RELATION-UI-001` «The console shows work class and run
relation». El operador lo pegó en la cabina el 2026-10-19. Se transcribe **verbatim**, sin
sustituirlo; lo que la cabina mide sobre él va aparte, al final.

## El reporte del taller

```text
La guarda pasa (run #69, título y `active` coinciden). Ahora leo la D-075, la D-080 y las §9–§11.

Ahora mido la suite base antes de tocar nada (salida a fichero).

Línea base confirmada: **927 / 925 / 2**, los dos fallos conocidos. Paso a medir qué pinta la consola hoy.

Midiendo qué proyectos declaran carriles y lotes, para saber dónde se ve la relación hoy.

Sigo midiendo: el patrón de filtros (carril y lote) existe y es copiable; ahora miro la consola en vivo para ver la relación en fila y detalle.

Abriendo `aiw-console` en mi instancia local (puerto 8869) para medir filas y detalle.

Midiendo el detalle del run y la vista con carriles (proyecto `aiw`) antes de decidir qué falta.

Leyendo el CSS de las etiquetas existentes (carril, barrera, severidad) para que la de clase hable el mismo idioma visual.

Mido el arnés de pruebas de la consola y los tests del selector de lotes, para copiar su patrón en los tests nuevos.

Tengo la medición. Antes de tocar código capturo un *golden* del render actual (fixture de carriles, sin `work_class`) para probar después que un run sin clase sale byte a byte igual.

Golden capturado y determinista (dos capturas idénticas). Ahora escribo los tests nuevos antes de tocar el renderer.

Ahora el fichero de tests nuevo.

18 tests nuevos: **14 en rojo antes**, 4 verdes (las guardas de ausencia y de relación, que deben pasar antes y después). Reviso que los rojos fallen por la razón correcta.

Los tests en rojo fallan por el motivo correcto (falta la función, la tabla o el selector). Antes de implementar, voy a revisar el CSS de la barra de herramientas, ya que el selector de lote nunca se ha probado con datos reales.

Implemento. Primero la tabla de etiquetas y los helpers junto a los demás de clasificación.

Ahora la etiqueta en `v3RunRowTags`.

Ahora la sección de clasificación del detalle.

Ahora el filtro: predicado, composición, selector, nota de vacío y reinicio por proyecto.

Ahora el CSS de la etiqueta, junto al bloque de clasificación del #43.

18/18 en verde. Corro la suite completa (salida a fichero).

Suite: **927/925/2 → 945/943/2**, mismos dos fallos conocidos, ningún test de otro run ajustado. Paso a verlo en la consola.

Las etiquetas y el selector se ven en la fila. Abro el detalle de #69 (sólo clase) y #72 (clase + riesgo).

Noto que la fila «Work class» usa un estilo de píldora inconsistente con las demás filas almacenadas; la ajusto a texto plano (etiqueta + token) para igualarla.

Ajusto mis propios tests nuevos (W.10, W.11, W.12) a la fila en texto plano; ninguno de otro run.

Ahora mido el riesgo de la barra: el #O4.P14 midió que a 1280 px con carriles la fila ya está llena (963 de 962). Simulo `aiw` (con carriles) con clases inyectadas en memoria.

Confirmé que con carriles y clase a 1280px la barra se desborda (1119 de 962px), cortando «Re-emit .project/» y «Edit roadmap»; aunque hoy ningún proyecto real lo activa, ocurrirá cuando `aiw` o `cantu-studio` clasifiquen. Voy a añadir una regla compacta para cuando haya dos o más selectores y volver a medir.

Cabe: 962 de 962 con los dos selectores; con un solo selector la fila no cambia (352 px el de carril, igual que antes). Captura del estado compacto simulado:

La barra cabe. Pruebo ahora la interacción real del filtro en `aiw-console` y que el selector desaparezca al cambiar a un proyecto sin clases.

El filtro funciona en el DOM real (UX design → #69, #71, #73 en las dos vistas; el selector desaparece en `cantu-lessons` y se reinicia al volver). Reviso errores de consola y la vista del árbol.

Muchos 404: compruebo que son las sondas de ficheros opcionales de siempre y no algo mío, y que no hay excepciones JS.

Los 404 son las sondas de fuentes opcionales de siempre (ledgers, state…); ninguna excepción JS. Captura del árbol Roadmap:

Bien en el árbol también. Como cambié JS y CSS después de la última corrida, repito la suite completa.

Suite final: **945 / 943 / 2**, los mismos dos fallos. Cuento las líneas por fichero con `git diff` (sólo lectura).

Compruebo de paso el diálogo de configuración (#67), que lista los runs vivos sin clasificar, para saber qué verá el operador sobre los runs que sólo llevan clase.

El diálogo lista correctamente #69–#71 como «Unclassified live runs» según §9.3, pero omite indicar que llevan clase, como exige la segunda mitad de ese apartado. Lo del #67 queda fuera de alcance, así que lo anoto como propuesta y cierro para limpiar.

Paro mi instancia del puerto 8869 (la del operador en 8788 sirve los mismos ficheros del disco).

Guardo la ficha de memoria del run.

Run #69 hecho, sin commit. La guarda pasó: `RUN-CONSOLE-CLASSIFICATION-CLASS-RELATION-UI-001`, título exacto, `active`. No le pregunté nada al operador, así que no hay palabras suyas que citar. No toqué el contrato del #68 ni hizo falta inventar ningún dato, así que no se cumplió ninguna condición de parada.

### 1. Ficheros tocados
| fichero | + | − |
|---|---|---|
| [project-console.js](project-console/assets/project-console.js) | 180 | 6 |
| [project-console.css](project-console/assets/project-console.css) | 40 | 0 |
| [tests/console-work-class-ui.test.mjs](tests/console-work-class-ui.test.mjs) (nuevo) | 363 | — |
| [tests/fixtures/work-class-ui/class-less-render.golden.json](tests/fixtures/work-class-ui/class-less-render.golden.json) (nuevo) | 104 | — |

`index.html` no hizo falta. El hueco del selector lo crea el renderer, igual que el del lote.

### 2. Etiquetas
| valor | etiqueta |
|---|---|
| `FUNCTIONALITY` | Functionality |
| `DOCUMENTATION` | Documentation |
| `RESEARCH` | Research |
| `UX_DESIGN` | UX design |
| `CONTENT` | Content |

- **Por qué estas:** son los nombres que la §9 da a cada clase, en el idioma de la consola. Así no dicen nada que el valor no diga, y siguen siendo verdad mientras el vocabulario lo sea.
- **Lo que descarté:**
  - «Docs», porque choca con la pestaña Docs.
  - «Code», porque dice menos que *functionality*.
  - «Design» a secas, porque la §9 le pone el UX a propósito.
- **Sin color:** el color de la fila es de la severidad (#47).
- **Al pasar el ratón** se ve el token guardado y que es «the kind of work, not what it is about».
- **Un run sin clase no muestra nada.** Da igual cómo le falte (sin clave, `null`, `""` o algo que no es texto). Un test lo compara byte a byte contra un render capturado *antes* de tocar el código.
- **En el detalle va en texto plano**, «Functionality» seguido del token. Primero la puse como píldora, pero dentro de la sección Classification las píldoras son los valores *derivados*. Lo vi en la captura y lo cambié.
- **Un run que sólo tiene clase** (del #68 al #71) muestra la clase y dice «No risk classification yet… no severity and no closure mode». Ya no dice «Not classified yet».

### 3. La relación: la medí y no añadí nada
- **«Este run espera a aquél» ya se lee.** La fila de Run Queue dice «Waiting on #70 …» (o «#72 +2 more») y el detalle lista cada dependencia con su estado.
- **«Mismo carril, uno tras otro» también.** La etiqueta `DEVELOPMENT-21` va en las dos filas, el filtro de carril numera dentro del carril y el detalle tiene la celda Lane. Sólo aparece en proyectos que declaran carriles (`aiw` y `cantu-studio`), que es justo donde la §10.1 obliga.
- **Lo que no se muestra, y no se debe mostrar:**
  - «Paralelo», porque la §10.2 exige superficies de escritura disjuntas y eso no está en el dato.
  - Un aviso de «dos activos en el mismo carril», porque la §10.1 dice que `status` no distingue «corriendo» de «esperando revisión».
- **Propuesta, sin construir:** la arista inversa en el detalle, «quién espera a este run». Unas 25 líneas.

**El filtro por clase sí lo construí.** Copié el selector de lote. Sólo aparece si algún run tiene clase, sólo ofrece las clases presentes, se combina con carril y lote, y se reinicia al cambiar de proyecto.

**Ojo, aquí contradigo a la cabina:** reutilizar el patrón no salió gratis. A 1280 px, con carriles y clase a la vez, la barra se desbordaba 157 px y se comía «Re-emit .project/» y «Edit roadmap». Lo medí simulando clases en memoria en `aiw`. Añadí una regla compacta (`:has()`) que sólo se activa con dos o más selectores. El selector de lote (#48) tenía el mismo desborde latente y la regla lo cubre también.

### 4. Tests
- 18 nuevos, **14 en rojo antes** del cambio.
- Los 4 verdes son guardas que deben pasar antes y después: el golden de un proyecto sin clase, la ausencia, el selector vacío y que no se pinte ninguna relación.
- **No ajusté ningún test de otro run.** Sí ajusté tres de los míos (W.10, W.11 y W.12) cuando pasé la fila del detalle a texto plano.

### 5. Suite completa
- **Antes:** 927 / 925 pass / 2 fail, en `suite-antes.txt`.
- **Después:** 945 / 943 pass / 2 fail, en `suite-despues.txt`.
- Los dos fallos son los conocidos: `roadmap-engine.test.mjs:93` y `registry-digest.test.mjs:645`.
- Los ficheros están en `C:\Users\chris\AppData\Local\Temp\claude\C--Users-chris-Documents-AIW-Workspace\21ac8560-f0b1-4e86-80a6-62319ca81b69\scratchpad\`.

### 6. Cómo verlo en la QA
Proyecto **AIW Console** → Roadmap.
- **Run Queue:** etiquetas en #69 a #78, junto a MAJOR/SEMI_ATTENDED en #72 a #78.
- **Subvista Roadmap:** las mismas, en «The cutover to a single console».
- **Selector «Class»:** UX design → #69, #71, #73.
- **Detalle de #69:** sólo clase.
- **Detalle de #72:** clase más los campos de riesgo.
- **Cantu Lessons:** sin selector y sin etiquetas.

### 7. Lo que no pude verificar
- **El juicio visual.** Tamaño, mayúsculas frente a los tokens vecinos, la píldora sin fondo y si el filtro se gana su sitio son del operador.
- **Carriles con clase en datos reales.** Ningún proyecto con carriles tiene clases todavía, así que la regla compacta sólo está medida en simulación y a 1280/1440 px. No la probé en anchos menores.
- **La creación y el borrado del hueco del selector** sólo se prueban en el navegador. El arnés de tests siempre devuelve un elemento.
- **Fuera de alcance, propuesto:** el diálogo de configuración (#67) lista #69 a #71 como sin clasificar, pero no dice que llevan clase, como pide la segunda mitad de la §9.3.

Cerré mi instancia del 8869. La del operador en el 8788 sirve los mismos ficheros: basta recargar.
```

## Lo que la cabina mide sobre el reporte — 2026-10-19 21:48–21:55 CST

1. **El diff cuadra con el reporte:** `project-console.js` +180/−6, `project-console.css` +40/−0, un
   test nuevo y su golden. Sin caracteres de control. Canónico intacto (md5 `8b5667a0`). El
   `launch.json` del workspace no se tocó (última escritura, 2026-10-18).
2. **Suite corrida por la cabina en tres tandas: 945 tests, 943 pass, 2 fail** — los dos conocidos.
   Cuadra con el taller.
3. **Ningún test de otro run ajustado**, y el taller no le preguntó nada al operador: no hay
   decisiones fuera de disco esta vez.
4. **Una contradicción del taller a la cabina, con medición:** el ticket decía que reutilizar el
   selector «cuesta poco», y a 1280 px con carriles y clase la barra se desbordaba 157 px. El taller
   lo arregló con una regla compacta y señaló que el selector de lote del `#48` tenía el mismo
   desborde latente. **Medido sólo en simulación**: ningún proyecto con carriles tiene clases todavía.
5. **Dos propuestas sin construir:** la arista inversa en el detalle («quién espera a este run») y
   que el diálogo del `#67` diga que los runs #69–#71 llevan clase aunque no tengan clasificación de
   riesgo (la segunda mitad de CLASIFICACIÓN §9.3).
