# Reporte del taller del `#74` — transcrito verbatim

Run: `#74` `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` «Repair the five texts that describe this repo
falsely». El operador lo pegó en la cabina el 2026-10-20. Se transcribe **verbatim**, sin
sustituirlo; lo que la cabina mide sobre él va aparte, al final.

## El reporte del taller

```text
Guarda cumplida (`run_id`, `title`, `status: active` coinciden). Corro la suite ANTES.

Línea base igual a la del #70: 982 / 981 pass / 1 fail (`roadmap-engine.test.mjs:93`). Ahora los cinco textos.

Verificando los textos 1 y 2 (hechos en disco medidos); ahora miro los textos 3 y 4 en `project-console/README.md`.

Texto 3: comprobando que el layout de `aiw` resuelve (lo que haría falso el paréntesis «today: aiw»).

Texto 5 y tests que pudieran leer estos textos:

Los cinco verificados; aplico las correcciones. Antes, una comprobación de `start-console.cmd` y de la carpeta `context/aiw/` (para el listado de otros textos).

LF puro en los tres. Aplico.

Quito la cifra «tres» (envejece el día del corte):

Correcciones aplicadas. Ahora verifico los tres candidatos de la cabina y los otros textos que encontré.

Candidatos verificados; barrido final de líneas para el reporte de otros textos falsos.

Suite DESPUÉS:

El hook pide compactar el índice de memoria; muevo la sección de Lecciones a su propio índice, como ya se hizo con los otros hilos.

# Run #74 `RUN-CONSOLE-STALE-TEXTS-REPAIR-001`: hecho, sin commitear

La guarda se cumplió: `queue_order` 74, el `run_id` y el `title` coinciden exactamente, y el `status` es `active`. Los cinco textos seguían siendo falsos y los corregí todos. La suite da lo mismo antes y después. Por el camino encontré once textos falsos más: están abajo, nombrados y sin tocar.

## 1. Los cinco textos

**(1) `context/README.md:80-81`: falso.** El repo tiene su propio canónico, `roadmap/roadmap.json`, y O4 vive en él.
- Antes: «Todavía sin roadmap propio: O4 vive hoy en el roadmap de AIW y migra aquí en el tramo 1.»
- Después (`:91-92`): «Su roadmap no vive en esta carpeta: es el canónico del repo, `roadmap/roadmap.json`.»

**(2) `context/README.md:18-20`: falso.** El aviso no dice cuál de los árboles es el fork. Medí qué hay en cada uno:
- `docs/project-console/` es el fork. El audit de D-035 lo llama `CON-PCJS`.
- `console/` es el prototipo, retirado por D-048.
- `project-console/` es la que arranca `start-console.ps1` y la única con `projects.json`.
- Antes: «la consola viva está en `projects/cantu-studio`».
- Después (`:18-31`): una lista de los árboles, sin cifra («varios»), con el papel de cada uno. Dice también que la consola local de Cantu sigue en su repo hasta el corte, `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001`. Ese run sigue `planned`. No hizo falta decidir cuál consola es «la oficial»: el texto solo dice cuál arranca este repo.

**(3) `project-console/README.md:124-125`: falso.** `detectRootLayout` resuelve un layout para los seis roots del registro; el de `aiw` es `repo_root`. O4.P6 está `completed`.
- Antes: «…refuses honestly where no layout claims a roadmap (today: `aiw`, until O4.P6).»
- Después (`:125-126`): se quitó el paréntesis. La negativa sigue siendo comportamiento real.

**(4) `project-console/README.md:64-76`: falso.** Aquí contradigo a la cabina: el registro real ya no declara tres proyectos, sino **seis** (`aiw-console`, `cantu-studio`, `cantu-quizzes-latex`, `cantu-lessons`, `aiw`, `phd-p2-experiment`).
- Antes: el JSON de dos entradas se presentaba como si fuera el contenido del fichero.
- Después (`:65-66`): «Its shape, as an illustrative excerpt (the list itself is the file):». El ejemplo es el mismo y no se cuenta nada.

**(5) `package.json:6`: falso.**
- Antes: «AIW project console — verbatim fork of the JAME project console (zero dependencies).»
- Después: «AIW project console — the multi-project console of the AIW workspace (zero dependencies).»
- Que no tiene dependencias lo comprobé: no hay campo `dependencies`.
- Ningún test lee esta descripción. Sí cambia el `mtime` de una fuente que registra `.project/snapshot.json`; la re-emisión es de la cabina.

## 2. Otros textos falsos (sin corregir)

**Los tres candidatos de la cabina, confirmados:**
- `start-console.ps1:10-12` y `:210` dicen «strictly READ-ONLY… has no edit endpoint» y «writes nothing». Además, `start-console.README.md:34-38` dice lo mismo. Pero `project-console/serve.mjs` acepta POST en cuatro rutas: `:466`, `:628`, `:790` y `:1060`.
- `project-console/assets/doc-side-reader.js` (con su `.css`): el nombre dice «side reader», pero su propio comentario de cabecera (`:2`) reconoce que el #63 lo rehízo como modal centrado. El comentario es correcto; lo que engaña es el nombre del fichero.
- `context/aiw-console/CONTRATO.md:713` («9 + estas 2») y también `:1228` («el run admite **11 claves**»): no cuadran con `RUN_OPTIONAL_FIELDS` (`tools/roadmap/roadmap-core.mjs:158-173`, 14 opcionales). En disco ya hay runs con los campos de clasificación y `external_effects`.

**Nuevos:**
- **`governance/no_claims.json:45`: este run lo vuelve falso.** Su `current_reason` dice «package.json still describes this repo that way». Desde la corrección (5) ya no es así. La afirmación prohibida sigue siendo válida; lo que caducó es su razón. Lo dejé así porque está fuera de alcance, pero conviene arreglarlo junto con este run.
- `project-console/serve.mjs:807`: «(today: the `aiw` kernel)». Es la misma premisa vencida del texto (3), pero en código.
- `project-console/README.md:123`: «the server gained the two routes above». Arriba hay cuatro rutas.
- `context/README.md:65` lista `handoffs/orquestacion.md`, que no existe. En `handoffs/` están `aiw`, `aiw-console`, `cantu-lessons`, `cantu-quizzes-latex` y `cantu-studio`.
- `context/README.md:86` dice que cada carpeta de proyecto contiene «su roadmap». No es así para `aiw-console`, y para `aiw` tampoco: el `roadmap_AIW_temp.md` de `:89` lleva la cabecera «RETIRADO» y el canónico es `aiw/roadmap/roadmap.json`.
- `context/README.md:39-46` (el árbol de estructura) no incluye `cantu-quizzes-latex/` ni los ficheros de la raíz. Es más incompleto que falso.

## 3. Suite

| | tests | pass | fail | fichero |
|---|---|---|---|---|
| Antes | 982 | 981 | 1 (`tests/roadmap-engine.test.mjs:93`, finales de línea) | `C:\Users\chris\AppData\Local\Temp\claude\C--Users-chris-Documents-AIW-Workspace\970c4d14-6821-4736-bdd0-712c82e07f88\scratchpad\suite-antes.txt` |
| Después | 982 | 981 | 1 (el mismo) | `C:\Users\chris\AppData\Local\Temp\claude\C--Users-chris-Documents-AIW-Workspace\970c4d14-6821-4736-bdd0-712c82e07f88\scratchpad\suite-despues.txt` |

No ajusté ningún test. Los tres ficheros siguen en LF puro.

## 4. Lo que no pude verificar

- **El botón de edición para `aiw`:** no lo vi en el navegador. Lo que verifiqué es la misma comprobación que usa el servidor, `detectRootLayout`, dentro de `resolveEditableProject`.
- **La consola local de Cantu:** no comprobé que todavía arranque. Solo que sus ficheros siguen en `projects/cantu-studio/docs/project-console/` y `tools/project-console/`.

No hice nada con git, no cambié el status del run ni re-emití `.project/`. Aparte: el hook de memoria pidió compactar el índice, así que pasé las 77 fichas de lecciones a `indice-cantu-lessons.md`.
```

## Lo que la cabina mide sobre el reporte — 2026-10-20 17:00–17:10 CST

1. **El diff cuadra con el reporte:** `context/README.md` +16/−5, `project-console/README.md` +3/−2,
   `package.json` +1/−1. Nada más en el árbol. Canónico intacto (md5 `a1e1b4ed`).
2. **La cabina NO corrió la suite completa esta vez**, y lo declara: el cambio es sólo de texto. Corrió
   los cinco ficheros de tests que citan `package.json` o un README: 49 tests, 49 pass. La suite
   completa la dio el taller, 982 / 981 / 1, igual antes y después.
3. **Verificada la frase nueva sobre D-035:** el texto nuevo dice que el fork se borra en el corte;
   D-035 (d) lo dice así. No es un texto falso nuevo.
4. **El taller contradice a la cabina con razón:** el registro tiene seis proyectos, no tres. El
   ticket repetía una cifra vieja.
5. **El taller encontró que el propio run vuelve falso `governance/no_claims.json:45`** y diez textos
   falsos más, todos nombrados y sin tocar.
6. **El «índice de memoria» que menciona** es la memoria de las sesiones de Claude Code, fuera del
   repo: el árbol no muestra ningún fichero suyo.
