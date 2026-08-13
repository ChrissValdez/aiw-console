# Relevo — hilo `aiw-console`

**Fecha:** 2026-08-13 · **Sustituye** al relevo del 2026-08-08.
Aquella sesión cerró con **57 runs**; ésta cierra con **64** y con el subsistema de
reportes construido entero.

La sustancia va DENTRO. Los punteros a records son procedencia, no respuesta.

---

## 1. DÓNDE ESTAMOS

**NO hay ningún run `active`.**

`projects/aiw-console/roadmap/roadmap.json` · md5 **`c67234f1494af9f10a2f2f3c520a875e`**
**64 runs** · `completed 56 · planned 8` · densidad `1..64` · ids únicos · **0 CR**
`HEAD` = `origin/main` = **`2d7f7d2`** · cero candados en los cinco repos.

**Elegibles, medidos al cerrar. Vuelve a medirlos: cambian con cada cierre.**

| | run | qué es |
|---|---|---|
| **#57** | `RUN-CONSOLE-VERDICT-POST-001` | el endpoint que escribe `verdict.json` — cierra el subsistema |
| #58 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | QA de paridad; **una de las dos compuertas del cutover** |
| #60 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | saca el canónico de Cantu de la carpeta que el cutover borra |
| #62 | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` | cinco textos que describen este repo en falso |
| #63 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | las cuatro ops de contenedor en el frontend |
| #64 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | auditoría visual, deliberadamente la última |

Bloqueados: **#59** espera a #58; **#61** (el cutover) espera a #58, #59 y #60.

---

## 2. LO QUE ESTA SESIÓN ENTREGÓ — el subsistema de reportes, en seis runs

Un **reporte de run** es lo que un ejecutor emite para que un humano juzgue su trabajo:
qué cambió, por qué, qué no pudo verificar, qué decidió por su cuenta. Su contrato lo
escribe `cantu-quizzes-latex`; **el sobre, el renderizador y la consola son de este hilo.**

| | run | qué dejó |
|---|---|---|
| **#51** | Reports index | `.project/reports_index.json`, el **séptimo artefacto** |
| **#52** | One renderer | `run-report-renderer.js`, 1 049 líneas **vanilla y ciego al dominio** |
| **#53** | Reports surface | del detalle del run a su reporte, y de vuelta |
| **#54** | Verdict model | dos tokens en el ítem, tres en el run, `this_run` y la guarda |
| **#55** | QA repairs | los cinco hallazgos del operador · `done with deviations` |
| **#56** | Preview sandbox | el marco pasa a origen opaco |

**El séptimo artefacto costó DOS paradas medidas del taller.** El pin de `.project/`
estaba en **ocho** sitios ejecutables, no en tres ni en cuatro como dijeron dos tickets
míos seguidos. Y el hallazgo que lo justifica todo: **`emitted-artifacts-declaration.test.mjs:149`
siguió VERDE con siete artefactos vivos** — lee fixtures congelados el 2026-07-30 que nada
regenera, así que **nunca cubrió lo que dos tickets creyeron.** La aserción viva que existe
hoy no restituye una garantía: la crea por primera vez.

### El renderizador es ciego al dominio, y hay guarda mecánica

Un mismo código pinta reportes de cinco proyectos. **Cero ramas por nombre de proyecto y
cero ramas por `type` de ítem: se pinta por PRESENCIA DE CAMPOS.** Lo prueba una suite de
**94 tokens vetados**, y esa guarda **mordió a su propio autor dos veces** — cazó palabras
en los comentarios de quien la escribió. Una guarda que solo atrapa a otros no está probada.

### El modelo de veredicto, y de dónde salió

Lo pidió el operador usando la superficie: una sola lista servía dos preguntas distintas.

    verdict      APPROVED · CHANGES_REQUIRED · BLOCKED   (los de aiw/kernel.mjs:213)
                 el ÍTEM toma solo los dos primeros
    disposition  this_run · new_run · operator_fixed · discard
    stopped      DERIVADO, nunca elegido

**`BLOCKED` sobra en el ítem por construcción:** que algo detenga todo lo declara el emisor
con `stop: true` y la consecuencia se deriva.
**`this_run` era la disposición que faltaba:** las tres anteriores mandaban el arreglo
fuera, así que aprobar el run siempre era coherente y la contradicción no tenía nombre.
**La guarda:** un run puede ser `APPROVED` con ítems en `CHANGES_REQUIRED` **solo si cada
uno lleva disposición y ninguna es `this_run`**. Es guarda, **no agregación**: el veredicto
del run nunca se calcula desde los ítems.

**Y encaja sin traducir con el `closeout_result` de este roadmap:** todo aprobado es `done`;
corregido hacia adelante es `done with deviations`; un arreglo debido aquí y el run no cierra.

### El sandbox — medido sirviendo, no leyendo

El marco de previsualización era un `iframe` **del mismo origen y sin `sandbox`**, con
**cero CSP y cero X-Frame-Options**, y **el origen es la ÚNICA guarda** de las tres rutas
que escriben (`roadmap/edit`, `history/sync`, `project/emit`). Un HTML emitido por
cualquier proyecto habría tenido el DOM de la consola —incluida la firma tecleada— y acceso
de escritura.

**Cerrado con `sandbox` de conjunto VACÍO.** La medición que lo decide: **`Origin: null`
devuelve 403 en las tres rutas**, así que la guarda existente ya rechaza el origen opaco
sin tocarla. **CSP y X-Frame-Options se midieron, están a cero, y son OTRO run** — atacan
quién enmarca a la consola, no lo que el marco hace hacia dentro.

---

## 3. ⚠⚠ LA LECCIÓN DE MÉTODO DE ESTA SESIÓN: `grep` NO ES UNA MEDICIÓN

**Cinco veces esta sesión un `grep` mío iba a producir un hallazgo falso.** Cinco:

1. «Los 2,8 MB del prototipo son la fuente» — **eran React**; la fuente ocupa 8 KB.
2. «`type: creation` no está tratado» — **sí lo estaba**; el renderizador no ramifica por tipo.
3. «El prototipo no lleva los cuatro casos» — **los llevaba**; el dato va gzip+base64 en un bundle.
4. Medí **el fichero equivocado**: había dos con nombre parecido en `uploads`.
5. «Ramifica por `kind`» — era `step.kind`, un objeto **interno de la vista** con nombre que colisiona.

**Y una sexta, de conteo:** cité **32** ids `QZ-C-*` del perfil de CQL; son **29**, porque
mi patrón atrapaba comodines de prosa. CQL había publicado **30** sin derivarlo de ningún
sitio, que es peor.

**Las reglas que salen, y son operativas:**

- **Antes de publicar el resultado de un `grep`, preguntarse si el patrón puede VER lo que
  busca.** Datos comprimidos, nombres que colisionan, ficheros homónimos: en los tres el
  cero significa «no lo vi», no «no está».
- **Una cifra viaja con el comando que la produce.** CQL lo hizo bien al final: su perfil
  lleva el inventario y el `grep -oP` que lo cuenta.
- **El método del taller es mejor que el mío y hay que copiarlo:** en vez de barrer ficheros
  buscando sitios, **copió el repo, implementó el cambio y corrió la suite entera**. Eso es
  exhaustivo por construcción. Un `grep` no lo es nunca.

### Corolario: el TICKET no debe enumerar inventarios

Dos tickets míos declararon el inventario de sitios del pin —tres, luego cuatro— y **eran
ocho**. El tercero dejó de enumerar y **ordenó el método**: implementa en una copia, corre
la suite, y **la suite es el inventario**. Salió a la primera.

**Y la condición de parada cambió con él:** «apareció un sitio nuevo» dejó de ser motivo de
parada —es el trabajo— y pasó a serlo **«una decisión cambiaría lo que el sistema PROMETE»**.

---

## 4. LA QA HUMANA PAGÓ, y es el argumento más fuerte que tenemos

**El operador recorrió veinte pasos y encontró CINCO defectos con la suite en verde
—643 de 644— mientras los cinco estaban presentes.** Ninguno salió de un test.

1. Un bloque pintado dos veces y sin plegar.
2. **La clave del JSON usada como etiqueta.** Leyó «No cambió: statement» y **preguntó qué
   era**. Yo medí dos sitios y avisé de que podían no ser todos: **eran doce.**
3. Un ítem `info` —definido como «no requiere acción»— **pedía veredicto y consumía un paso**.
4. **El reporte afirma que la retroalimentación no cambió y nunca la enseña.**
5. La previsualización **nunca se había visto pintar nada**; solo existía la rama «missing».

**El 5 escondía dos cosas peores:** los assets del `#55` **nunca pintaron** —el `src` usaba
la ruta pelada y daba 404, así que el paso de QA pasó por accidente— y encenderlo destapó el
agujero de seguridad del §2.

**Regla que queda:** cuando un paso de QA pase, comprobar que pasó **por la razón correcta**.

---

## 5. LO QUE ESTÁ ABIERTO CON CQL — tres cosas del EMISOR

Nosotros no podemos repararlas: el renderizador pinta lo que llega, y hacerle inventar
una traducción sería que aprendiera su dominio.

- **`unchanged` mezcla identificadores con prosa.** `["statement","options","feedback"]`
  junto a `["valores de todas las opciones"]`.
- **La prosa de un ítem repite el rótulo que la vista pone.** «Si se rechaza» dos veces.
- **`subject.feedback` no existe.** Cero de nueve ítems; dos lo nombran en su `unchanged`.
  **Comprobado: pintarlo no exige nada más que mostrar un campo presente.**

**Enmiendas pedidas a su contrato:** el §7 sigue diciendo `ok | no | duda`; falta
`mechanical` en el §1; y el tipo `info` debe declarar `requires_verdict: false`.
**Todo enviado el 2026-08-13.**

**Y les debemos el documento del sobre.** Es nuestro, sigue pendiente, y la condición que
pusimos ya se cumple: la superficie existe y se ha usado. Va después del `#57`.

---

## 6. LA MÁQUINA, GIT Y LOS CANDADOS — sin cambios, y siguen mordiendo

**Modo COWORK CONECTADO.** La ruta de montaje **se deriva cada sesión**. Los cinco repos
clonados. **La escritura del canónico por el motor está probada**: esta sesión la usó
más de quince veces.

**El CRLF está resuelto y la regla vieja sigue muerta:** `aiw-console` tiene
`.gitattributes` idéntico al de los tres repos hermanos, el árbol en LF, y **la cabina y el
operador leen el mismo número**. `aiw` sigue siendo el único de los cinco sin
`.gitattributes` — **es de su hilo**.

**Los candados siguen apareciendo, y hay que comprobarlos EN EL TURNO que entrega el
bloque**, con `find`, nunca corriendo git. Esta sesión apareció uno en `cantu-studio` a
mitad de trabajo; **es de otro hilo y no se toca**.

**GitHub Desktop sondea el repo y toma el candado.** El bloque lo cierra antes de correr.

**Un índice con `stat` viejo NO se arregla refrescando: se reconstruye con
`git read-tree HEAD`.** Probado sobre copias: `--refresh` y `--really-refresh` no bastan.

---

## 7. DEFECTOS DE MÉTODO DE LA CABINA, además de los `grep`

1. **Le di el ticket del `#54` y el aviso de «no lo pegues» en el mismo mensaje**, con el
   aviso debajo. El taller lo ejecutó estando `planned`, y **el roadmap afirmó algo falso
   durante un día**. El aviso va ANTES del ticket, o el ticket no se emite.
2. **Escribí una guarda de árbol limpio sobre un árbol que yo mismo acababa de ensuciar**,
   sin exceptuarme. Regla: **una guarda se evalúa sobre los ficheros EN ALCANCE.**
3. **Puse una cifra propia envejecida en un criterio de aceptación** —«339 modificados»—
   después de escribir el canónico tres veces yo mismo.
4. **Mandé al operador a una ronda de diseño que ya estaba hecha**, por el error 3 de la §3.

**Y la separación adversaria pagó en los seis runs.** El taller contradijo a la cabina en
cada uno y **acertó siempre**: los ocho sitios del pin, los doce rótulos, la duplicación en
el fichero que yo no miré, el `Origin: null` que decidió el sandbox, y que los assets del
`#55` nunca habían pintado.

---

## 8. LO QUE QUEDA ABIERTO, CON SU CONDICIÓN DE CIERRE

**El `#57`, el endpoint del veredicto.** Cierra el subsistema. Hoy el botón dice «Write
verdict.json» **y lo que hace es descargar** — desde esa pantalla el verbo miente.

**CSP y X-Frame-Options.** Medidos a cero, declarados como otro run.

**El volumen real.** El fixture versionado del caso de desarrollo trae **4 ítems**; el de
volumen, 28. El techo medido está en **~700 ítems**.

**Un `.gitattributes` para `aiw`** — el último de los cinco. **De su hilo.**

**El documento del sobre** — §5.

**Unificar `setDeps`, el rename de `depends_on`, `V3_BATCHABLE_OPS`** — siguen esperando la
ventana de «tres roadmaps en reposo».

**Los 9 runs terminales sin `closeout_result`** — no se rellenan.

---

## 9. RECORDS DE ESTA SESIÓN

```
context/aiw-console/records/
  INDICE-DE-REPORTES-PARADA-O4-P17.md              (1ª parada del taller)
  INDICE-DE-REPORTES-SEGUNDA-PARADA-O4-P17.md      (2ª parada: son ocho sitios)
  INDICE-DE-REPORTES-RESOLUCION-O4-P17.md
  RENDERIZADOR-UNICO-DE-REPORTES.md                (§F: siete consejos al segundo)
  SUPERFICIE-DE-REPORTES-EN-LA-CONSOLA.md          (§J: el packet de 16 pasos)
  MODELO-DE-VEREDICTO-DOS-EN-EL-ITEM-TRES-EN-EL-RUN.md
  REPARACIONES-QA-DEL-REPORTE-CINCO-HALLAZGOS-DEL-OPERADOR.md
  SANDBOX-DEL-MARCO-DE-PREVISUALIZACION.md
```

Y la especificación de la interfaz, versionada: `design/run-review-prototype.html`.
**Es React y esta consola es vanilla sin paso de build: es especificación de aspecto y
conducta, NO código que portar.** Su línea 389 son 2,6 MB de bundle comprimido: **no se lee.**
