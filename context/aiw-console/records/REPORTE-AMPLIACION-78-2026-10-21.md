# Reporte del taller — ampliación del `#78` bajo D-061 (Project Portfolio)

Run `#78` `RUN-CONSOLE-UI-POLISH-001`, 2026-10-21. Ampliación pedida por el operador en
`context/aiw-console/records/VEREDICTO-78-QA-2026-10-21.md`. **Sin commitear.**

## Guarda y punto de partida

- `roadmap/roadmap.json` → `objectives[1].phases[17].runs[20]`: `queue_order` 78, `run_id`
  `RUN-CONSOLE-UI-POLISH-001`, `status` `active`; el último párrafo del `full_description` empieza
  «SCOPE AMENDED 2026-10-21 BY THE OPERATOR, in writing, under D-061 …» y dice «REMOVE two things».
  Coincide.
- `git status --porcelain` vacío al empezar. `git rev-parse HEAD` → `d7c18abe…` (= `d7c18ab`, como
  dijo la cabina).

## Qué se quitó del render (y qué se borró por quedarse sin uso)

| Elemento | Dónde | Cómo |
|---|---|---|
| Lista «Objectives» de la tarjeta | `project-shell.js` `portfolioOkCard` | se quita el bloque `.portfolio-objectives` y su `objectiveRows` |
| Panel «Awaiting a verdict» | `index.html` (`#shell-verdicts`) y `project-shell.js` `renderShellChrome` | se quitan el contenedor y la llamada que lo llenaba |

Borrado por quedarse sin uso (confirmado con `git grep`, 0 resultados fuera de `*.md`,
`.project/` y `roadmap/`): `fetchReportsIndexEntry`, `shellState.reportIndexes` y su `await` en
`shellBoot` (el Portfolio ya no pide `/projects/<key>/.project/reports_index.json` al arrancar; la
vista de proyecto sigue cargando el suyo, `project-console.js:24` y `:5679`); las reglas
`.portfolio-verdicts:empty`, `.portfolio-objectives`, `.portfolio-objective-row` (la original y la
del bloque `#78`), `.portfolio-objective-row:last-child`, `.portfolio-objective-title`,
`.portfolio-objective-status-none`.

**Se quedan, porque algo los usa** (sólo tests, ya ninguna página):
`verdictPanelHtml`, `projectsWithReportsDir`, `reportsIndexUrlForKey` (`project-shell.js`);
`pendingVerdictAcrossProjects`, `pendingVerdictPanelHtml` (`run-report-surface.js`); los estilos
`.rrs-verdict-panel/-title/-subtitle/-rows/-row/-project/-count/-note`. Borrar
`pendingVerdictAcrossProjects` obligaría a editar `tests/run-report-surface.test.mjs:219`, que
afirma el conteo y no la presencia en el Portfolio: eso es condición de parada, así que no se hizo.
Sus comentarios se corrigieron para no afirmar que el Portfolio los pinta.

Modelo de datos intacto: `snapshotSummary().objectives` se sigue calculando (lo fijan
`tests/shell-model.test.mjs:137` y `tests/shell-two-real-projects.test.mjs:97`). `.project/` sin tocar.

## Dónde sigue accesible lo que mostraban (medido en la consola real, 8797)

- **Objetivos de un proyecto** → pestaña **Roadmap** → segmento **«Roadmap»** (su contador es el
  número de objetivos: 2 / 8 / 5 / 1 / 6 / 9, los mismos que filas tenía cada tarjeta). Una tarjeta
  por objetivo con su título; los 31 títulos coinciden. **Lo que no sigue en pantalla:** la palabra
  de estado derivada que la tarjeta ponía junto a cada objetivo (COMPLETED / ACTIVE / PLANNED / —).
  La tarjeta del objetivo en Roadmap muestra Runs / Completed / Active / Blocked y Progress %, no esa
  palabra; tampoco aparece en Overview ni en Status (buscados los títulos: ausentes).
- **Veredicto pendiente de un run** → detalle del run → sección **«Run report»** → píldora
  **«no verdict yet»** (o «a verdict is filed beside it»), con el botón «Open the run report».
  Medido en Cantu Quizzes Latex, Roadmap → Run Queue → grupo «History 100» → run #2
  (`RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001`). Por la D-075 la sección sólo existe donde el proyecto
  tiene `reports/` (hoy, sólo ese). **Lo que no sigue en pantalla:** el conteo agregado («1 across 1
  project», «1 of 1 awaiting a verdict»); no existe en otra superficie.

## El repulido (sólo CSS, en el bloque `[#78]` de `project-console.css`)

Medido tras quitar los dos elementos, a 1440: 193 / 193 / 193 / 235 / 214 / 193 px. Lo que mandaba
era la frase de «Current status» en la columna más estrecha (≈300 px). Cuatro reglas:

1. `.portfolio-board` pasa a rejilla de una columna con `grid-auto-rows: 1fr`: toda tarjeta toma la
   altura de la más alta.
2. Columnas a `minmax(200px, .65fr) minmax(460px, 1.25fr) minmax(300px, 1.1fr)`: el ancho va de la
   columna central (ya sin lista) a la del estado; 460 px = 4 celdas de 96 px + huecos + relleno.
3. `.portfolio-roadmap { margin-top: auto }`: la franja Roadmap acaba en la línea de «Open Project».
4. Bajo 1300 px, `grid-template-rows: auto 1fr` (y `auto auto 1fr` bajo 900): el sobrante va a la
   fila del estado y la línea entre filas cae igual en todas (178 px a 1024).

Alturas de las seis tarjetas (px):

| Ancho | Antes | Después |
|---|---|---|
| 1440 | 289 / 508 / 399 / 252 / 435 / 557 | 214 × 6 |
| 1024 | 403 / 623 / 513 / 388 / 571 / 672 | 315 × 6 |
| 1920 · 1366 · 1301 · 800 | — | 193 · 214 · 214 · 460, iguales en cada ancho; 4 celdas en una fila desde 1301; sin scroll horizontal a 800 |

Salvedad: con alturas iguales, si un día un proyecto trae un «Current status» largo (o cae al
`project_summary` por no tener uno), todas las tarjetas crecen con él. Hoy el más largo ocupa 3
líneas a 1440.

## Tests

Búsqueda: `git grep` de `pendingVerdict|verdictPanelHtml|projectsWithReportsDir|Awaiting a verdict|
portfolio-objective|shell-verdicts|portfolioBoardHtml|summary.objectives` en `tests/`.

| Test | Qué afirma | ¿Cambia? |
|---|---|---|
| `run-report-surface.test.mjs:255` (la `:260` de la cabina) | el contenido del constructor del panel | No: el constructor sigue y la aserción pasa. **Contradice a la cabina:** no afirma que el panel esté en el Portfolio |
| `run-report-surface.test.mjs:272` | el constructor vacío no pinta nada | No |
| `run-report-surface.test.mjs:281` | la costura del shell devuelve el panel del montaje | No (pasa); su título dice «the Portfolio asks the mount to count», ahora falso |
| `run-html-reports.test.mjs:227` (F.3) | el filtro D-075 y la costura | No (pasa); su título dice «the Portfolio counts verdicts…», ahora falso |
| `shell-model.test.mjs:137`, `shell-two-real-projects.test.mjs:97` | `summary.objectives` (modelo) | No |

Ningún test lee `#shell-verdicts`, `.portfolio-objective*` ni pinta `portfolioBoardHtml`.
**Tests cambiados: 0.**

Suite (`node --test` en el repo): antes **982 / 982 / 0**, después **982 / 982 / 0**. Mismo total:
no se añadió, quitó ni editó ningún test. Salidas en `suite-antes.txt` y `suite-despues.txt`.

## Textos que ahora dicen algo falso (fuera de mi alcance; para la cabina)

- `docs/CONTRATO-REPORTE-HTML-DE-CADA-HILO-v1.md:138`: «su panel «Awaiting a verdict» sólo aparecen
  donde…» — ya no aparece en ningún sitio.
- Títulos de `tests/run-report-surface.test.mjs:281` (y el comentario `:277-280`, «The Portfolio
  draws the panel») y de `tests/run-html-reports.test.mjs:227` (F.3).
- Los records fechados (`SUPERFICIE-DE-REPORTES-EN-LA-CONSOLA.md`, `GUIA-RECORRIDO-77…`) son
  mediciones de su día: no se tocan.

## Estado final

`git status --porcelain`:

```
 M project-console/assets/project-console.css
 M project-console/assets/project-shell.js
 M project-console/assets/run-report-surface.css
 M project-console/index.html
```

`git diff --stat`: 4 ficheros, +55 / −79. HEAD sigue en `d7c18ab`. Nada commiteado, ningún botón
que escribe pulsado. Servidores 8797 y 8798 apagados. Fuera del repo se añadieron dos entradas
(`aiw-console-78-real`, `aiw-console-78-multi`) a `AIW_Workspace\.claude\launch.json`.

Reproducir capturas: con la consola en el 8797 y `PC_PORT=8798 PC_REGISTRY=tests/fixtures/multi/projects.json`
en el 8798, `node herramientas\shot.mjs herramientas\plan.json <carpeta>`; la página:
`node herramientas\build-comparison.mjs herramientas\notes.json comparacion-portfolio.html`.
