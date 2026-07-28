# PORTABILIDAD DE LA EVIDENCIA DE AIW — TRES DE CUATRO ADJUDICACIONES

**Fecha:** 2026-07-28 · **Naturaleza:** EJECUCIÓN + MEDICIÓN del run
`RUN-AIW-EVIDENCE-PORTABILITY-001` (`O2.P1`, `queue_order` 12), **primer barrier
global** del roadmap de AIW. **No commitea, no toca el emisor, no toca el
proyector, no ejecuta ningún otro run, no cambia el status de ninguno.** ·
**Máquina:** PC (Windows 10, `C:\Users\chris\Documents\AIW_Workspace\`) ·
**`aiw` HEAD `3d78d7e` · `aiw-console` HEAD `287bf6f`** (los dos sin cambio: no se
commiteó nada).

## Qué hizo este encargo

Ejecutó **tres de las cuatro adjudicaciones de [[D-053]]**, que es exactamente lo
que este barrier abarca:

1. **`aiw/logs/` SE VERSIONA** — retirada la línea 4 del `.gitignore` de `aiw`.
   **58 archivos** pasan de invisibles a trackeables, **101.845 bytes**.
2. **`aiw/.aiw/` SIGUE DE MÁQUINA** — su ignore no se tocó; se verificó que sigue
   capturando, y se inventarió su contenido. **No se borró nada.**
3. **Los dos audit reports MUDAN** de `_reference/audits/` a
   `projects/aiw-console/context/aiw/`, **copiados** con md5 verificado y
   **originales intactos**.

**La cuarta —`git_history.json` de máquina en todo emisor— queda deliberadamente
pendiente.** Ver bloque 5. **Este barrier cierra con tres de cuatro, y eso se
dice.**

**El resultado central, en una línea: los dos incidentes que sostienen la cadena
probatoria de `CONST §4` ya están dentro de git.** `logs/INCIDENT-2026-07-11.md`
(9.187 bytes) y el forense completo de `logs/000-sandbox/` (6 archivos, 3.295
bytes) devuelven hoy **exit 1** de `git check-ignore`: ya no los captura ninguna
regla.

## Por qué esto es barrier y no higiene

Transcrito de `D-053` y del `full_description` del run: `CONST:30` exige un
incidente documentado con sus cuatro campos antes de todo mecanismo nuevo, y **los
dos incidentes reales que existían hoy vivían en archivos gitignoreados**. Todo run
posterior de este roadmap que añada mecanismo tiene que citar un incidente; si los
incidentes no podían viajar, tampoco podía viajar la justificación. La cadena
probatoria de la constitución dependía de una sola máquina.

**Este run NO añade mecanismo bajo `CONST §4`.** [[D-055]] excluye explícitamente,
y por escrito, «ediciones de `.gitignore`» y los papeles del alcance de
«mecanismo» —que es «código o paso nuevo en `aiw`: kernel, cola, lanzadores,
guards»—. No hace falta incidente propio ni criterio de borrado.

## Abreviaturas de cita

| Abreviatura | Archivo |
|---|---|
| `AUDIT` | `context/aiw-console/records/AUDIT-CONTENIDO-AIW.md` |
| `EMISION` | `context/aiw-console/records/EMISION-PROJECT-AIW.md` |
| `MEDICION` | `context/aiw-console/records/MEDICION-ESTADO-DE-AIW.md` |
| `AUD-K` | `_reference/audits/Audit_Report_AIW_Kernel_v1.md` |
| `AUD-C` | `_reference/audits/Audit_Report_Contexto_Metodologia_v1.md` |

**Todo lo de los bloques 1–7 está medido de primera mano en este encargo** salvo
donde se cite `AUDIT`/`EMISION`/`MEDICION`, que son de segunda mano. `AUD-K` y
`AUD-C` se abrieron **de primera mano** para leer sus cabeceras (bloque 4.2). Lo
inferido va **[INFERENCIA]**; lo no comprobado, **[NO VERIFICADO]**.

---

# 1. Frontera de entrada — coincidió, por eso el encargo siguió

El criterio 1 era condición de parada. **Coincidió exacto.**

| Medida | Exigido | Medido | ¿Coincide? |
|---|---|---|---|
| `aiw` HEAD | `3d78d7e` | `3d78d7e64ef1de1de9b366f7ed461ae45ceafcb2` | **Sí** |
| Archivos sin trackear | exactamente 2 | 2 | **Sí** |
| — cuáles | `.project/docs_index.json`, `.project/git_history.json` | idénticos | **Sí** |
| Archivos modificados | 0 | 0 | **Sí** |

Comandos: `git rev-parse HEAD` y `git status --porcelain`, los dos de lectura.

**`aiw-console` a la entrada:** HEAD `287bf6f8d5d76f3a6c7e93c56f1e94782e9ee1d3`,
**árbol limpio** — cero modificados, cero sin trackear.

---

# 2. Adjudicación 1 — `aiw/logs/` SE VERSIONA

## 2.1 La edición, y por qué el criterio pedía diff y no vista

**El `.gitignore` de `aiw` tenía finales de línea mixtos, y eso importaba.** Medido
con `od -c` antes de tocar nada: las líneas 1–6 terminan en **LF** (`\n`) y la
línea 7 (`.aiw/`) termina en **CRLF** (`\r\n`). El archivo pesaba **59 bytes**, md5
`ad4b16673be2aff541e19a5d4b9f7499`.

```
sandbox/\n  locks/\n  node_modules/\n  logs/\n  jame_snapshot/\n  \n  .aiw/\r\n
```

Una reescritura ingenua del archivo habría **normalizado ese CRLF** y cambiado un
byte que nadie mandó cambiar. Por eso la edición se hizo por **empalme de bytes**,
no reescribiendo: se conservaron los offsets 0–29 y 36–58, retirando exactamente
los **6 bytes** de `logs/\n` (offsets 30–35).

**La prueba, y es la fuerte.** Reinsertando `logs/\n` en el offset 30 del resultado
se reproduce el original **bit a bit**: `cmp` da idéntico y el md5 vuelve a
`ad4b16673be2aff541e19a5d4b9f7499`. Es decir: **el único delta son esos 6 bytes**.
Las otras seis líneas quedaron byte-idénticas, incluido el CRLF de `.aiw/` y la
línea 6 en blanco.

| | Antes | Después |
|---|---|---|
| Bytes | 59 | **53** |
| Líneas | 7 | **6** |
| md5 | `ad4b1667…` | `—` (el archivo está modificado, sin commitear) |
| CRLF de `.aiw/` | presente | **presente, intacto** |

`git diff .gitignore` confirma una sola supresión, con las otras seis líneas como
contexto sin tocar:

```
@@ -1,7 +1,6 @@
 sandbox/
 locks/
 node_modules/
-logs/
 jame_snapshot/
 
 .aiw/
```

**Las seis reglas restantes siguen capturando**, probado una a una con
`git check-ignore -v`: `sandbox/000-sandbox.md` → `:1`; `locks/probe` → `:2`;
`node_modules/probe` → `:3`; `jame_snapshot/probe` → `:4`;
`.aiw/project_console.snapshot.json` → `:6`.

## 2.2 Consecuencia que conviene nombrar: las citas por número de línea se corrieron

Retirar la línea 4 **desplaza en uno el número de todas las de abajo**. Las reglas
son byte-idénticas; sus coordenadas no.

| Regla | Línea antes | Línea ahora |
|---|---:|---:|
| `sandbox/` | 1 | 1 |
| `locks/` | 2 | 2 |
| `node_modules/` | 3 | 3 |
| `logs/` | 4 | **retirada** |
| `jame_snapshot/` | 5 | **4** |
| (en blanco) | 6 | **5** |
| `.aiw/` | 7 | **6** |

**Efecto en el corpus ya escrito:** `AUDIT §6.5` cita `aiw/.gitignore:4` para
`logs/`, `EMISION §6.3` cita `aiw/.gitignore:4` y `aiw/.gitignore:1`, y `D-053`
habla de «líneas 4 y 7». Después de esta edición, `aiw/.gitignore:4` apunta a
`jame_snapshot/` y `:7` no existe. **No se corrige ningún record por esto** —son
registro de lo que era cierto cuando se midió—, pero queda dicho para que nadie
relea esas citas como si siguieran vivas.

## 2.3 Qué se hizo visible — el entregable de valor

**58 archivos** bajo `logs/`, **101.845 bytes**, en 9 carpetas de run más 2
archivos sueltos. Medido después de la edición con
`git ls-files --others --exclude-standard logs/` → **58**; y
`git ls-files --others --ignored --exclude-standard logs/` → **0**: no queda ni uno
ignorado.

| Carpeta | Archivos | Bytes |
|---|---:|---:|
| `logs/000-sandbox/` | 6 | 3.295 |
| `logs/001-console-projector/` | 6 | 7.675 |
| `logs/002-canonical-path-and-autoproject/` | 7 | 8.711 |
| `logs/002-canonical-path-and-autoproject-orphan-20260711/` | 2 | 2.179 |
| `logs/003-roadmap-emitter/` | 7 | 10.526 |
| `logs/003b-startup-projection-all-views/` | 7 | 9.370 |
| `logs/004-snapshot-enrichment/` | 7 | 11.376 |
| `logs/005-roadmap-contract-fix/` | 7 | 18.276 |
| `logs/006-roadmap-delivery-path/` | 7 | 10.683 |
| `logs/DIAG-roadmap-invalid.md` | 1 | 10.567 |
| `logs/INCIDENT-2026-07-11.md` | 1 | 9.187 |
| **TOTAL** | **58** | **101.845** |

La lista completa, ruta por ruta y byte por byte:

```
   460  logs/000-sandbox/objective.md
   228  logs/000-sandbox/preflight.txt
  1105  logs/000-sandbox/round1_executor.md
   604  logs/000-sandbox/round1_reviewer.md
   264  logs/000-sandbox/round1_tests.txt
   634  logs/000-sandbox/summary.md
   773  logs/001-console-projector/objective.md
   325  logs/001-console-projector/preflight.txt
  3301  logs/001-console-projector/round1_executor.md
  1434  logs/001-console-projector/round1_reviewer.md
   728  logs/001-console-projector/round1_tests.txt
  1114  logs/001-console-projector/summary.md
   561  logs/002-canonical-path-and-autoproject/STAGE.txt
  1450  logs/002-canonical-path-and-autoproject/objective.md
   729  logs/002-canonical-path-and-autoproject/preflight.txt
  2346  logs/002-canonical-path-and-autoproject/round1_executor.md
  1486  logs/002-canonical-path-and-autoproject/round1_reviewer.md
  1267  logs/002-canonical-path-and-autoproject/round1_tests.txt
   872  logs/002-canonical-path-and-autoproject/summary.md
  1450  logs/002-canonical-path-and-autoproject-orphan-20260711/objective.md
   729  logs/002-canonical-path-and-autoproject-orphan-20260711/preflight.txt
   561  logs/003-roadmap-emitter/STAGE.txt
  1352  logs/003-roadmap-emitter/objective.md
   729  logs/003-roadmap-emitter/preflight.txt
  3372  logs/003-roadmap-emitter/round1_executor.md
  2157  logs/003-roadmap-emitter/round1_reviewer.md
  1385  logs/003-roadmap-emitter/round1_tests.txt
   970  logs/003-roadmap-emitter/summary.md
   708  logs/003b-startup-projection-all-views/STAGE.txt
  1048  logs/003b-startup-projection-all-views/objective.md
  1924  logs/003b-startup-projection-all-views/preflight.txt
  1710  logs/003b-startup-projection-all-views/round1_executor.md
  1194  logs/003b-startup-projection-all-views/round1_reviewer.md
  2019  logs/003b-startup-projection-all-views/round1_tests.txt
   767  logs/003b-startup-projection-all-views/summary.md
   561  logs/004-snapshot-enrichment/STAGE.txt
  1248  logs/004-snapshot-enrichment/objective.md
  1931  logs/004-snapshot-enrichment/preflight.txt
  2714  logs/004-snapshot-enrichment/round1_executor.md
  1850  logs/004-snapshot-enrichment/round1_reviewer.md
  2209  logs/004-snapshot-enrichment/round1_tests.txt
   863  logs/004-snapshot-enrichment/summary.md
   708  logs/005-roadmap-contract-fix/STAGE.txt
  4923  logs/005-roadmap-contract-fix/objective.md
  2411  logs/005-roadmap-contract-fix/preflight.txt
  2872  logs/005-roadmap-contract-fix/round1_executor.md
  3368  logs/005-roadmap-contract-fix/round1_reviewer.md
  2896  logs/005-roadmap-contract-fix/round1_tests.txt
  1098  logs/005-roadmap-contract-fix/summary.md
   561  logs/006-roadmap-delivery-path/STAGE.txt
  1164  logs/006-roadmap-delivery-path/objective.md
  2298  logs/006-roadmap-delivery-path/preflight.txt
  2121  logs/006-roadmap-delivery-path/round1_executor.md
  1368  logs/006-roadmap-delivery-path/round1_reviewer.md
  2409  logs/006-roadmap-delivery-path/round1_tests.txt
   762  logs/006-roadmap-delivery-path/summary.md
 10567  logs/DIAG-roadmap-invalid.md
  9187  logs/INCIDENT-2026-07-11.md
```

## 2.4 Son 58, no 35 — y la diferencia no es una discrepancia

`EMISION §6.3` listó **35** rutas bajo `logs/` como gitignoreadas. **Las dos cifras
son correctas y miden cosas distintas.** Medido aquí por extensión:

| Extensión | Archivos |
|---|---:|
| `.md` | **35** |
| `.txt` | **23** |
| otras | 0 |
| **Total** | **58** |

Los 35 `.md` son exactamente los de `EMISION §6.3`: aquel conteo salió del escaneo
del `docs_index`, que **solo mira documentos**. Los 23 `.txt` —9 `preflight.txt`,
8 `round1_tests.txt`, 6 `STAGE.txt`— nunca estuvieron en esa lista porque el
emisor no los considera documentación. **Lo que se hace visible en git son los 58**,
porque `git check-ignore` no distingue extensión.

**Los 23 `.txt` no son relleno:** `STAGE.txt` es precisamente el heartbeat que
`INCIDENT-2026-07-11.md` documenta como reparación M3, y los `preflight.txt` son
los que fecharon el forense de `000-sandbox` por mtime (`AUDIT §6.1`).

## 2.5 Los dos incidentes que motivan el barrier — confirmados fuera del ignore

Es el punto por el que este run es barrier. **Los dos devuelven exit 1 de
`git check-ignore -v`**, que es la manera de decir «ninguna regla lo captura»:

| Archivo | Antes | Ahora |
|---|---|---|
| `logs/INCIDENT-2026-07-11.md` (9.187 bytes) | `.gitignore:4:logs/` | **exit 1 — no ignorado** |
| `logs/000-sandbox/summary.md` (634 bytes) | `.gitignore:4:logs/` | **exit 1 — no ignorado** |

**El forense de `000-sandbox` viaja completo**, no solo su `summary.md`. Los seis
archivos de la carpeta, comprobados uno a uno, dan todos trackeable:
`objective.md`, `preflight.txt`, `round1_executor.md`, `round1_reviewer.md`,
`round1_tests.txt`, `summary.md`. Y con ellos la carpeta huérfana que el `INCIDENT`
dejó —`002-canonical-path-and-autoproject-orphan-20260711/`, sus 2 archivos—,
que es evidencia del mismo suceso.

**Se versiona la contradicción viva, a propósito.** `000-sandbox` sigue afirmando
`APPROVED` en la carpeta mientras el archivado afirma `ERROR` (`AUDIT §6.1`), y los
**8 `summary.md`** —contados: 8— siguen citando rutas del workspace demolido.
`D-053` aceptó ese costo por escrito: es registro histórico inmutable, y esconder
una contradicción no es repararla. **No se editó ni un byte de `logs/`.**

---

# 3. Adjudicación 2 — `aiw/.aiw/` SIGUE DE MÁQUINA

Su ignore **no se tocó**. Verificado con `git check-ignore -v` después de la
edición:

```
.gitignore:6:.aiw/	.aiw/
.gitignore:6:.aiw/	.aiw/project_console.snapshot.json
```

Sigue capturando. Lo que cambió es el número de línea que reporta —**`:6`, antes
`:7`**—, por el corrimiento del bloque 2.2. **La regla es byte-idéntica.**

**Qué contiene hoy, inventariado:** un solo archivo.

| Archivo | Bytes | mtime |
|---|---:|---|
| `.aiw/project_console.snapshot.json` | 2.727 | `2026-07-10 23:41` |

Cero subcarpetas. **Coincide con lo que `D-053` describe**: «un snapshot stale en la
ruta pre-002». Su mtime del **2026-07-10** es anterior al run 002 y al incidente del
2026-07-11, lo que es consistente con que sea residuo. Bajo [[D-052]] nada canónico
aterriza ahí jamás: el canónico va a `roadmap/` y lo emitido a `.project/`.

**No se borró nada.** `D-053` no mandó borrarlo, solo dejarlo de máquina; su
higiene es de un encargo posterior.

---

# 4. Adjudicación 3 — los dos audit reports MUDAN

## 4.1 La copia, con md5 verificado

**Origen localizado** en `_reference/audits/`, donde `AUDIT §5` lo dejó.
`AIW_Workspace/` no es repo y `_reference/` no está dentro de ninguno: hasta hoy
los dos existían **solo en esta máquina**.

**Destino:** `projects/aiw-console/context/aiw/` **ya existía** —contiene
`AIW_CONTEXT.md`, `DELEGACION.md`, `ESTADO.md` y `roadmap_AIW_temp.md`— y **no hay
colisión de nombres**: ningún archivo previo se llama `Audit_Report*`. Es la casa
del contexto de gobernanza de AIW mudado por [[D-037]].

| | `Audit_Report_AIW_Kernel_v1.md` | `Audit_Report_Contexto_Metodologia_v1.md` |
|---|---|---|
| Bytes | 17.732 | 27.430 |
| md5 origen | `293c87b4ab558bf8781f53bf33b99464` | `f6de49966f5a81b5662ca02c0e3e32e5` |
| md5 destino | `293c87b4ab558bf8781f53bf33b99464` | `f6de49966f5a81b5662ca02c0e3e32e5` |
| **¿Idénticos?** | **Sí** (`cmp` byte a byte) | **Sí** (`cmp` byte a byte) |

Los dos tamaños coinciden con los que `AUDIT §5` midió el 2026-07-28.

## 4.2 Los originales NO se borraron — y quién los retira

**Siguen en disco, intactos**, verificado tras la copia:

```
C:\Users\chris\Documents\AIW_Workspace\_reference\audits\Audit_Report_AIW_Kernel_v1.md
C:\Users\chris\Documents\AIW_Workspace\_reference\audits\Audit_Report_Contexto_Metodologia_v1.md
```

**Están fuera de todo repo: un borrado ahí no tiene deshacer.** Por eso se copió y
no se movió. **El operador los retira cuando la copia esté commiteada**, no antes.
Sobre el resto de `_reference/` no se decide ni se mide nada, igual que en `D-053`.

## 4.3 Frescura de cada audit report — medida, no actualizada

`AUD-K` declara en su cabecera (leída de primera mano, `AUD-K:7`) el commit
`ca3087d8c2686c8250f512838b36ce6cd590800a`. **Ese ya no es el HEAD de `aiw`**: hoy
es `3d78d7e`. Medida la distancia:

| Medida | Valor |
|---|---|
| Commits entre `ca3087d8` y `3d78d7e` | **2** |
| — cuáles | `77b7ad5` (canónico de AIW: 6 objetivos, 29 fases, 42 runs) y `3d78d7e` (primera emisión del `.project/`) |
| Archivos cambiados | **3**, todos nuevos: `roadmap/roadmap.json`, `.project/roadmap.json`, `.project/snapshot.json` |
| Líneas | **+2.056, −0** |
| Archivos `.mjs` cambiados | **0** |
| Archivos `.md` cambiados | **0** |

**Veredicto para `AUD-K`: stale solo en la cabecera, NO en el cuerpo.** `AUD-K`
audita el kernel `.mjs` y **ningún `.mjs` cambió** en esos dos commits —tampoco
ningún `.md`—, así que sus citas `archivo:línea` siguen cayendo donde dicen. Dato
que lo corrobora: `kernel.mjs` mide hoy **478 líneas**, exactamente las 478 de
«478/500» que `D-055` registra como holgura del techo. Lo que caducó es el campo
«último commit» de su cabecera, que ahora es `HEAD~2`.

**Veredicto para `AUD-C`: stale de forma sustantiva, y en más de una fila.**
`AUD-C` audita documentación, contexto y metodología de cuatro repos.

- **Fila `aiw/`** (declara `ca3087d`): los dos commits nuevos **añadieron
  `roadmap/roadmap.json`**, el canónico de AIW — material que cae de lleno dentro
  de su alcance declarado («documentación, contexto, roadmaps y metodología»).
  Cuando `AUD-C` midió, ese archivo **no existía**. La fila describe un repo sin
  roadmap canónico; hoy lo tiene.
- **Fila `projects/aiw-console/`** (declara `e50a3a3`): **medido aquí**,
  `e50a3a3` es ancestro estricto del HEAD actual `287bf6f`, con **35 commits** de
  por medio. Está stale, y además `AUD-C:20-25` ya advertía que ese repo solo
  recibió inventario superficial. **Esto convierte en medición lo que `AUDIT §5`
  dejó como [INFERENCIA]** («es con casi total seguridad un HEAD viejo»).
- **Filas `cantu-studio` y `cantu-lessons`:** **[NO VERIFICADO]**. No se midieron:
  `cantu-studio` no se toca en este encargo por mandato explícito, y `cantu-lessons`
  queda fuera de alcance.

**No se actualizó ningún audit report.** Se midieron y se copiaron tal cual, con
md5 idéntico. Corregir sus cabeceras sería reescribir un documento fechado, que es
otro acto.

---

# 5. Adjudicación 4 — `git_history.json`: NO se tocó, y por qué

**La cuarta adjudicación de `D-053` queda pendiente, deliberadamente.** No es un
descuido ni un bloqueo: es secuenciación.

**Qué pide:** `.project/git_history.json` de máquina **en todo emisor**, y el resto
del `.project/` de AIW versionado. Su razón, transcrita de `D-053`, es estructural:
«el commit que lo actualiza lo desactualiza», porque el artefacto describe N commits
y su commit es el N+1; y es el único artefacto cuya fuente (`.git`) ya viaja con
todo clon.

**Por qué no se ejecuta aquí.** `D-053` la declara **transversal** por escrito: no
alcanza solo a `aiw`, sino también a `aiw-console` —donde hoy está versionado— y a
`cantu-studio`. Ejecutarla exige **escribir en el proyector de `aiw-console`, que
`cantu-studio` también usa**, y ese hilo está abierto. Un cambio ahí ahora tocaría
trabajo en curso de otro carril.

**Se ejecuta después, en serie, con el hilo de `cantu-studio` avisado.** `D-053` ya
partió su ejecución por hilo justamente así.

**Estado medido de `git_history.json` en `aiw` a esta hora:** sigue **sin trackear**,
12.971 bytes, mtime `2026-07-28 15:00:31` — anterior a este encargo, que corrió
desde las ~17:40. **No se le tocó un byte.**

**Este barrier cierra con tres de cuatro.** Lo que sí queda hecho es lo que la
cadena probatoria necesitaba: los incidentes ya viajan.

---

# 6. No se emitió ni se re-emitió ningún `.project/` — y la razón importa

**No se corrió el proyector.** Y conviene registrar por qué, porque el problema
**cambia de forma, no desaparece**:

Con `logs/` versionado, un `docs_index` re-escaneado **dejaría de tener 35 punteros
muertos** —las 35 rutas `.md` que `EMISION §6.3` listó como no viajables—. Pero a
cambio metería **35 resúmenes de run en la vista de Docs como si fueran
documentación**. Cambiar 35 punteros rotos por 35 entradas de ruido no es una
mejora: es el mismo defecto con otro signo.

**Quien lo desbloquea es `O2.P5(b)`, el índice curado**, no este run. Hasta
entonces, `.project/docs_index.json` sigue sin trackear y sin regenerar, tal como
`EMISION §9.3` recomendó.

---

# 7. Frontera de salida — medida

## 7.1 `aiw`

| Medida | Exigido | Medido | ¿Coincide? |
|---|---|---|---|
| Modificados | 1 (`.gitignore`) | **1** — ` M .gitignore` | **Sí** |
| Borrados | 0 | **0** | **Sí** |
| Sin trackear (expandido, `-uall`) | los 2 de antes + los de `logs/` | **60** = 58 de `logs/` + 2 de `.project/` | **Sí** |
| `roadmap/roadmap.json` | intacto | `git diff --stat -- roadmap/` → **vacío** | **Sí** |
| `.project/` trackeado | intacto | `git diff --stat -- .project/` → **vacío** | **Sí** |
| HEAD | sin cambio | `3d78d7e` | **Sí** |

`git diff --stat` completo del repo, que es la prueba de que no se tocó nada más:

```
 .gitignore | 1 -
 1 file changed, 1 deletion(-)
```

**Un solo archivo, una sola línea, una supresión.**

`git status --porcelain` colapsa `logs/` en una entrada (`?? logs/`); con `-uall`
se expanden los 58. Los 4 archivos de `.project/` siguen en disco: `roadmap.json`
(98.935 bytes) y `snapshot.json` (103.283) trackeados y sin modificar,
`docs_index.json` (27.399) y `git_history.json` (12.971) sin trackear.

**Nota sobre un warning de git.** `git diff` emite «in the working copy of
'.gitignore', LF will be replaced by CRLF the next time Git touches it». Es
**condición preexistente**, no algo que introduzca esta edición: `core.autocrlf`
está en `true` en este repo, y el blob de HEAD ya tenía las 7 líneas en LF mientras
el archivo en disco tenía la última en CRLF —desajuste que git venía normalizando
en silencio, razón por la cual `.gitignore` figuraba como **no modificado** en la
frontera de entrada—. La edición por bytes preserva el disco tal cual estaba; el
warning habría salido igual.

## 7.2 `aiw-console`

| Medida | Medido |
|---|---|
| Modificados (trackeados) | **0** — `git diff --stat` vacío |
| Borrados | **0** |
| Sin trackear | **3**: los 2 audit reports + este record |
| HEAD | `287bf6f`, sin cambio |

Los tres archivos nuevos, que son toda la escritura de este encargo en este repo:

```
context/aiw/Audit_Report_AIW_Kernel_v1.md                       17.732 bytes
context/aiw/Audit_Report_Contexto_Metodologia_v1.md             27.430 bytes
context/aiw-console/records/PORTABILIDAD-EVIDENCIA-AIW.md       (este archivo)
```

## 7.3 `cantu-studio`

**No se tocó en ningún byte.** No se leyó, no se midió, no se corrió git sobre él.

---

# Lo que este encargo NO hace

**No commitea.** El operador es el único que ejecuta git de escritura. Git se usó
aquí **solo en lectura**: `status`, `rev-parse`, `diff --stat`, `check-ignore`,
`ls-files`, `log`, `rev-list`, `merge-base`.

No toca el emisor ni el proyector. **No toca `git_history.json`** — la cuarta
adjudicación queda pendiente (bloque 5). No borra los originales de
`_reference/audits/` ni decide nada sobre el resto de `_reference/`. No borra ni
mueve nada de `aiw/.aiw/` ni de `aiw/logs/`; el contenido de `logs/` se versiona
**tal como está**, con sus 8 `summary.md` de rutas demolidas y la contradicción
viva de `000-sandbox`.

No emite ni re-emite ningún `.project/`. No ejecuta ningún otro run del roadmap: no
crea `governance/` (`O2.P4`), no cura el `docs_index` (`O2.P5`), no repara los seis
tickets (`O2.P2`). **No cambia el status de ningún run ni toca
`roadmap/roadmap.json`** — el operador cierra el run desde la consola. No escribe
ninguna entrada de `DECISIONES.md`. No levanta la consola, el proyector ni el
validador, y no corre ninguna suite: que los 49 tests de AIW estén verdes sigue
**[NO VERIFICADO]**.

No actualiza ningún audit report: su frescura se **mide** (bloque 4.3), no se
repara. No corrige las citas por número de línea que el corrimiento del `.gitignore`
dejó desfasadas (bloque 2.2).
