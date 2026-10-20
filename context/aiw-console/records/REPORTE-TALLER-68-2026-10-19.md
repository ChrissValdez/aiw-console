# Reporte del taller del `#68` — transcrito verbatim

Run: `#68` `RUN-CONSOLE-CLASSIFICATION-CLASS-RELATION-CONTRACT-001` «Work class and run relation
enter the classification — the contract». El operador lo pegó en la cabina el 2026-10-19. Se
transcribe **verbatim**, sin sustituirlo; lo que la cabina mide sobre él va aparte, al final.

## El reporte del taller

```text
Retomo el #68 con A, B1 (más la condición del #37), `UX_DESIGN` y la marca que no se mueve. Primero vuelvo a comprobar la guarda y el estado del disco, y reviso los dos puntos que faltan: el validador que corre tras cada escritura y los pins del emisor.

La ruta de escritura del servidor usa el mismo `checkInvariants` global y no hay recorrido genérico de claves en la consola. Voy a escribir primero los tests en un fichero nuevo.

Tests escritos (un fichero nuevo, sin tocar otros tests). Los corro ANTES del cambio para contar los rojos.

Encontré que V.2, W.4 y W.6 pasaban vacíamente (comparaciones triviales o sin verificar la escritura real de la clave). Voy a endurecerlos antes de implementar, para que el conteo de fallos sea honesto.

Antes del cambio: 34 tests nuevos, con 29 en rojo y 5 en verde (los verdes verifican que nada inventado, derivado o con «undefined» se haya roto). Ahora implemento, empezando por el vocabulario en `classification.mjs`.

Ahora el motor: import y re-export del vocabulario, la clave en `RUN_OPTIONAL_FIELDS` y `setClassification`.

Ahora `setClassification`: la opción `workClass` y la regla de la marca.

Ahora el relevo en `roadmap-plan.mjs`.

El código ya pasa 33 de 34; solo falta V.4, que depende de la doctrina. Muevo los dos pins de versión del #43 (con nota, como hizo su tercera comisión) y luego escribo la doctrina.

Sigo ahora con la doctrina: añadiré la enmienda fechada al final de la §4, la nota al final de la §7 y las nuevas secciones §9–§12 tras la §8, sin incluir cifras de estado tal como lo exige el documento.

Finales de línea LF en todo el fichero, como en HEAD. Añado las secciones §9–§12 al final.

Tests relacionados: 168, 167 pass, y el único fallo es el conocido `:93`. La doctrina queda en **+219 / −0** (`git diff --numstat`): ni una línea publicada se tocó. Corro la suite completa.

Aparece un fallo nuevo: `tests/registry-digest.test.mjs:645`. Antes de decidir si es mío, lo investigo.

A las 18:07 apareció un nuevo proyecto `phd-p2-experiment` (commit `21850d3`) que exige que todo canónico registrado tenga runs. Voy a revisar el canónico de ese proyecto.

Confirmado: el canónico de `phd-p2-experiment` tiene 0 runs y 0 objetivos, así que ese fallo existe con o sin mi cambio. Por último, vuelvo a medir los canónicos reales con el motor ya cambiado.

Los seis canónicos reales (incluyendo `phd-p2-experiment`) pasan sin errores con el motor nuevo y ninguno usa `work_class`, y la prueba en memoria del #73 confirma que su `classified_at` no se altera al asignarle la clase. Actualizo la memoria con esto y cierro.

El #68 está hecho con tus elecciones (A, B1 más la condición del #37, `UX_DESIGN` y la marca que no se mueve). Sin commit y sin cambiar el status del run: eso queda para la cabina. El canónico tiene el mismo md5 que antes de empezar.

## 1. Ficheros tocados

| fichero | + / − |
|---|---|
| `context/CLASIFICACION-DE-RUNS.md` | +219 / −0 |
| `tools/roadmap/roadmap-core.mjs` | +45 / −12 |
| `tools/classification/classification.mjs` | +31 / −5 |
| `tools/projector/project.mjs` | +11 / −1 |
| `tools/roadmap/roadmap-plan.mjs` | +5 / −0 |
| `tests/classification-work-class.test.mjs` | nuevo, 378 líneas |
| `tests/classification-care-budget.test.mjs` | +4 / −2 |
| `tests/classification-transport-and-console.test.mjs` | +4 / −2 |

Lo que cambió en el código:
- **La clave:** `work_class`, opcional, con `FUNCTIONALITY` · `DOCUMENTATION` · `RESEARCH` · `UX_DESIGN` · `CONTENT`. Se serializa justo antes de `correctness_model`.
- **El rechazo:** un valor fuera de la lista se rechaza con el valor nombrado, por ejemplo: `work_class must be one of … got "FUNCTIONAL"`.
- **`set-classification`:** recibe `workClass` por el mismo camino que las demás claves; `null` o `""` la borran entera.
- **La marca:** `classified_at` solo cambia si la llamada escribió un campo de §1. Escribir o borrar solo la clase no la toca.
- **Un decisión de diseño:** `work_class` no entra en `CLASSIFICATION_STORED_FIELDS`, porque el panel lateral de la consola recorre esa lista y pintaría una fila «undefined». Va en `CLASSIFICATION_VOCABULARIES` y en una lista nueva, `CLASSIFICATION_RUN_FIELDS`.
- **El transporte:** la clave viaja tal cual con el run, y el envelope declara su vocabulario como `run.work_class`. El emisor sube a la versión `0.13.0`.

## 2. Doctrina nueva (todo añadido, nada borrado)

- **Enmienda fechada al final de la §4:** el proyecto abre o cierra la puerta a AIW; dentro de un proyecto abierto deciden la clase, el `correctness_model` y la relación. El cierre se sigue derivando solo de la §2.
- **Nota al final de la §7:** el hueco queda cerrado para el eje de la clase; para los campos de §1 sigue abierto.
- **§9 La clase de trabajo:** los cinco valores con qué es cada uno y cómo se revisa; la clase es del trabajo, no del tema; la regla (C) y lo que no decide; que la clase no mueve la marca ni crea combinaciones ilegales; y que el motor local de `cantu-studio` la rechaza hasta que su hilo la tolere.
- **§10 La relación, derivada:** cadena, mismo carril declarado o independiente. Fija la regla «dos runs del mismo carril no corren a la vez», solo para carriles declarados, y la condición del #37 sobre superficies de escritura disjuntas. Nombra el lote como la rama compartida: existe en el motor y ningún proyecto lo usa.
- **§11 Qué combinación va a qué vehículo:** una tabla de seis filas, conforme a D-074, que se lee en orden.
- **§12 Procedencia:** incluye tu elección literal.

## 3. Tests

- **34 nuevos, 29 en rojo antes del cambio.** Los 5 verdes protegen lo que no debía cambiar.
- Tres tests pasaban antes sin probar nada y los endurecí antes de implementar: V.2 comparaba `undefined === undefined`, y W.4 y W.6 no comprobaban que la clave llegara a escribirse.
- **Ajusté dos tests del #43:** el pin de versión `0.12.0` → `0.13.0` en `classification-care-budget.test.mjs:323` y `classification-transport-and-console.test.mjs:149`.

## 4. Suite completa

| | tests | pass | fail |
|---|---|---|---|
| antes | 893 | 892 | 1 |
| después | 927 | 925 | 2 |

- El fallo de `roadmap-engine.test.mjs:93` (finales de línea) es el conocido.
- **`registry-digest.test.mjs:645` es nuevo pero ajeno.** A las 18:07, después de mi medición base, la cabina registró `phd-p2-experiment` (commit `21850d3`). Su canónico tiene 0 runs y ese test exige al menos uno. No lo toqué.
- Salidas: `scratchpad/suite-antes-68.txt` y `scratchpad/suite-despues-68-implementado.txt`, en el scratchpad de esta sesión.

## 5. Piloto (propuesta, no escrita en el canónico)

| # | clase | razón |
|---|---|---|
| 68 | `DOCUMENTATION` | lo que decide es leer la doctrina; el código lo cubren los tests (caso tenso) |
| 69 | `UX_DESIGN` | etiquetas definidas en rondas con el operador |
| 70 | `FUNCTIONALITY` | lo central es el enlace al HTML y el camino del veredicto |
| 71 | `UX_DESIGN` | vista de la consola cerrada con QA visual en rondas; trata de contenido pero no es `CONTENT` (caso tenso) |
| 72 | `FUNCTIONALITY` | verificación de paridad que repara código, aunque se revisa a ojo (caso tenso) |
| 73 | `UX_DESIGN` | revisión de uso, superficie por superficie |
| 74 | `FUNCTIONALITY` | mueve el canónico y comprueba las rutas de escritura |
| 75 | `FUNCTIONALITY` | retira herramientas y borra `.aiw` |
| 76 | `DOCUMENTATION` | cinco textos falsos |
| 77 | `FUNCTIONALITY` | cuatro operaciones sobre el mismo core del CLI |
| 78 | `RESEARCH` | su producto son hallazgos que se vuelven runs |

Calibración declarada según la §6 (runs cerrados):
- **#48** `FUNCTIONALITY`
- **#39** `DOCUMENTATION`
- **#10** `RESEARCH`
- **#38** `UX_DESIGN`
- **#2** `DOCUMENTATION`: es el caso que obliga a usar `UX_DESIGN` y no un «design» a secas, porque es diseño de un esquema.

**Veredicto sobre el contrato:**
- **Clase sin calibrar:** este roadmap no tiene ni un run de `CONTENT`, así que no hay cinco cerrados de clases distintas.
- **Runs que no supe clasificar limpio:** #68, #71 y #72.
- **Valores:** ninguno sobra. La verificación/QA y la planificación aparecieron como posibles clases, pero se absorben sin forzar: clasifiqué esos runs por el trabajo que verifican.
- **Dónde no alcanza la regla (C):** cuando dos revisiones pesan igual, «la que decide» no elige sola. La §9.2 lo declara como hueco en vez de inventar una regla.

## 6. Lo que no pude verificar

- La consola en el navegador: no pinta la clase (eso es del #69). Solo hay un test que comprueba que no sale «undefined».
- Ningún hilo de `cantu-studio` ha tolerado la clave. Mientras no lo haga, escribirla en un run suyo pone en rojo su validador.
- Si los 25 runs `active` de `cantu-lessons` están corriendo o esperando revisión: el status no lo distingue.
```

## Lo que la cabina mide sobre el reporte — 2026-10-19 20:39–20:45 CST

1. **El diff cuadra con el reporte**, fichero por fichero. La doctrina: +219 / −0, nada publicado
   tocado. El canónico intacto (md5 `de6db2bc`).
2. **Suite corrida por la cabina en tres tandas: 927 tests, 925 pass, 2 fail**, los mismos dos del
   taller: el conocido de finales de línea y `registry-digest.test.mjs:645`.
3. **El segundo fallo es ajeno al run y su origen está medido:** el commit `21850d3` (2026-10-19 18:08
   CST) registra `phd-p2-experiment` en `project-console/projects.json`, escrito desde el hilo del
   Paper 2, y ese canónico no tiene runs. El commit dice que corrió tres ficheros de tests, no la
   suite. **Este repo lo escribe ahora un quinto hilo.**
4. **⚠ Las decisiones que el taller dice haber recibido NO están en disco.** El reporte arranca con
   «Retomo el #68 con A, B1 (más la condición del #37), `UX_DESIGN` y la marca que no se mueve»: el
   taller paró, preguntó y el operador contestó **en la sesión del taller**. La cabina no tiene esas
   palabras. Difieren de lo que la cabina propuso en el ticket en dos puntos: `UX_DESIGN` en vez de
   `DESIGN`, y que escribir sólo la clase **no mueve** `classified_at`. Se le pide al operador el
   texto de la parada y su respuesta para guardarlo verbatim.
5. **La última decisión numerada ya no es la D-076:** el hilo de `cantu-studio` escribió la D-079
   (commit `bdd7629`). El número de la decisión que cierre el `#68` se mide en el momento.
