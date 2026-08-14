# `#57` `RUN-CONSOLE-VERDICT-POST-001` — cierre, con el veredicto del operador verbatim

**Cerrado el 2026-08-14** · `closeout_result: "done"`
**Commits del run:** `de94da9` (apertura) · `90c8bff` (el trabajo: 11 ficheros, +1 171 −72)

El endpoint que escribe `verdict.json` al lado del `report.json` que responde. Cierra la
parte de escritura del subsistema de reportes; **no lo cierra entero**, y el §4 dice qué
falta y por qué es otro run.

---

## 1. EL VEREDICTO DEL OPERADOR, VERBATIM

> «hice todo el QA todo jalo por lo que observe has una verificacion porque hice el
> veredicto de ese run para ver que tal jalaba, revisa que salio bien»

Sobre el paso 5, la guarda, que era el único criterio que la cabina **no podía verificar
del artefacto** porque el fichero firmado no deja marca de ella:

> «no me deja solo un comentario, me aparece:
> APPROVED is not available for the run: 1 fix is owed to this run itself.»

**Esa frase es la mitad fuerte de la guarda del `#54` —la de `this_run`— mordiendo por
primera vez delante de un humano.** Hasta este momento estaba probada por tests y no se
había visto ocurrir.

---

## 2. LA QA: seis pasos, todos pasados

El packet se entregó como documento desechable en `_scratch\`, y se borró al cerrar.

| paso | qué comprobaba | resultado |
|---|---|---|
| 1 | la puerta al reporte, tras re-emitir el índice de CQL | pasa |
| 2 | **el verbo**: `Write verdict.json` con icono de sello | pasa |
| 3 | el contador: 21 pasos, 11 firmables | pasa |
| 4 | el orden: R1 y R2 primero, el run al final | pasa |
| 5 | **la guarda**, con su mensaje verbatim arriba | pasa |
| 6 | la firma en blanco y la escritura | pasa |

**Verificado por la cabina contra el fichero escrito**, no contra el relato:
`verdict_by: "CVC"` tecleado y no incrustado · `stopped: false` **derivado** y correcto,
porque R1 y R2 son los dos ítems con parada y los dos quedaron `APPROVED` ·
`source_commit: 5fb98c4` **copiado del reporte**, no inventado, y ese commit existe en CQL ·
8 ítems + 2 decisiones + el run firmados, y los 10 que no piden veredicto presentes con
`verdict: null`.

---

## 3. DOS ERRORES DE LA CABINA EN ESTE RUN, corregidos en voz alta

**1. Publiqué «ocho pasos de veredicto». Son once.** Conté `items` y no le pregunté a la
vista. `rrSteps` cuenta además las dos autodecisiones del ejecutor y el run. El taller
tenía razón con sus 11; CQL también se equivocó con sus «10 pasos». **Regla que se
confirma: una cifra derivada se le pide a la herramienta que la deriva.**

**2. Publiqué dos veces que el árbol de `cantu-quizzes-latex` estaba limpio. No lo estaba.**
`git status --porcelain` sobre un repo de **327 MB** excede el tiempo, y **la tubería
convirtió el timeout en «cero modificados»**. Es la misma clase de falsedad que
`--ignore-cr-at-eol` canalizado. **Regla: en ese repo el status va ACOTADO a rutas
(`-- reports .project`), nunca completo.**

**Y un error del ticket, que cazó el taller:** ordené derivar la ruta del reporte de
`.project/reports_index.json` de CQL. **Ese fichero no existía**: su `.project/` era una
emisión vieja. Ganó el disco.

---

## 4. LO QUE LA QA DESCUBRIÓ Y ESTE RUN NO CIERRA — va al run siguiente

Los tres salieron de **usar la superficie**, no de una suite.

**a) La consola escribe el veredicto y NO LO LEE NUNCA.** No existe lector de
`verdict.json` en los tres ficheros de la superficie. Al reabrir, el formulario nace vacío
y el operador concluye que no se guardó. **Se había guardado las dos veces.**

**b) Firmar dos veces sobrescribe en silencio.** Sin aviso y sin historia. Esta vez no
costó nada porque los dos veredictos eran idénticos salvo la marca de tiempo. **La próxima
no tiene por qué.** La política que lo resuelve es la **D-066**.

**c) El recuento se lee mal y los bloqueadores no se pueden alcanzar.** Las filas pintan
`9 / 10` y `1 / 10` **con el mismo denominador**, y suman 10 de 10, no 20 — pero repetir el
denominador por fila lo hace parecer un total por fila. Y **ni la guarda ni el recuento
nombran a nadie**: `guardOwedHere` y `guardNoDisposition` sólo cuentan, así que saber que
falta uno obliga a buscarlo entre 21 tarjetas.

**El 10 frente al 11 es correcto y deliberado:** son once los pasos que se firman y diez
aquellos contra los que se mide al operador, porque el run no se cuenta a sí mismo y un
ítem que no pide veredicto no engorda el denominador. Su razón está escrita en el código.

**Petición literal del operador sobre (c):** *«me gustaría que si me lo listara con un
desplegable colapsable por si no lo quiero ver»*. La cabina añade, y es suya no del
operador: **listar resuelve saber cuál es y no resuelve llegar hasta él**; si cada nombre
salta a su tarjeta, el bloqueo se resuelve en un clic.

**Por qué no se enmienda este run:** su `run_id` es `RUN-CONSOLE-VERDICT-POST-001` y
**describe su alcance**. Una lectura de vuelta no cabe en un `POST`. Cuando el
identificador describe el alcance y el alcance cambia, el run se cierra y se abre otro.

---

## 5. HALLAZGOS AJENOS, nombrados y no corregidos

- **El veredicto de CQL no está versionado.** `verdict.json` está untracked y **no
  ignorado** —CQL no tiene `.gitignore`—. Junto a él, cuatro `.project/` modificados y
  `reports_index.json` nuevo. **Es su repo: lo commitea su hilo.**
- **`verdict_present: false` en el índice de CQL, y es correcto.** El índice se generó a
  las 03:56 UTC y la firma es de las 03:59. El proyector lo mide con `existsSync` **al
  emitir**, y promete exactamente eso: mide el disco, no abre el fichero. Una re-emisión lo
  refresca.
- **El `.project/` de CQL tiene CINCO artefactos**, no siete: faltan `guardrails.json` y
  `no_claims.json`. **Y el acuse de la consola dice «6».** Tres números que no coinciden:
  el acuse dice 6, el contrato promete 7, el disco tiene 5. Territorio de CQL y del `#62`.
- **`context/aiw/records/` sigue untracked en este repo.** Es del hilo `aiw`. No entra en
  ningún `add` de este hilo.

---

## 6. DEFECTOS QUE LA QA NO PODÍA VER, declarados igual

1. **El taller retiró el pin `C.3`** de `classification-care-budget.test.mjs`, que fijaba
   que el canónico no declara `care_budget`. **La cabina lo verificó y el retiro es
   honesto:** el canónico **sí** lo declara hoy —lo declaró el operador por la op
   sancionada—, así que el pin estaba rancio; lo invariante sigue fijado y la garantía de
   «ausente es válido» se mudó al fixture contiguo, que no puede envejecer cuando alguien
   configura.
2. **Modificó `tools/projector/project.mjs` y su packet no lo nombró.** Son nueve líneas
   que **exportan** tres constantes de ruta para que servidor y emisor no puedan discrepar
   sobre dónde vive un reporte. Sin cambio de conducta.
3. **Corrigió el comentario que atribuía este endpoint al `#55`**, que era falso.

---

## 7. LO QUE ESTE RUN NO HIZO, y sigue sin hacerse

No cierra runs, no commitea, no re-emite `.project/`, y **no valida el reporte contra su
contrato**. **CSP y X-Frame-Options** siguen medidos a cero: otro run.
