# Reporte del taller del `#70` — Fase 2, transcrito verbatim

Run: `#70` `RUN-CONSOLE-THREAD-HTML-REPORTS-CONTRACT-001` «Each thread's HTML report: where it lives,
how the console links it, how the verdict comes back — the contract». El operador lo pegó en la
cabina el 2026-10-20. Se transcribe **verbatim**, sin sustituirlo; lo que la cabina mide sobre él va
aparte, al final. La propuesta de la Fase 1 la dejó el propio taller a disco, en
`PROPUESTA-FASE-1-70-REPORTES-HTML-DE-CADA-HILO-2026-10-19.md`.

## El reporte del taller

```text
Dejo fuera "Copiar ruta" de la v1, según lo decidido: basta con la ruta relativa ya visible bajo cada enlace, y revisaremos esto tras el piloto de CL. Registro esta decisión en el contrato.

La Fase 2 del `#70` está construida y sin commitear. Tu decisión de dejar «Copiar ruta» fuera de la v1 quedó citada verbatim en la §7 del contrato. Añadí a la §6 que el piloto diga si ese botón hace falta.

## 1. Lo que medí

**Fase 1** (rutas y cifras en `context/aiw-console/records/PROPUESTA-FASE-1-70-REPORTES-HTML-DE-CADA-HILO-2026-10-19.md`):
- **`docs/guiones/` de CL ya no existe:** se vació el 2026-10-13. Las páginas viven en `lecciones/<Lnn-slug>/`, y las genera `tools/revision`.
- **Sólo CL produce HTML por run:**
  - CQL tiene un único `report.json`;
  - Studio deja Markdown en `QA/temp/<run_id>/`;
  - `aiw` y `phd-p2-experiment` no tienen ningún HTML.

**Para la Fase 2:**
- **La línea base cambió desde el ticket:** hoy es **945 / 944 / 1**. El fallo de `registry-digest:645` desapareció porque `phd-p2-experiment` ya tiene runs. Queda sólo `roadmap-engine.test.mjs:93`.
- **La consola no conoce la ruta absoluta de un proyecto en disco.** Por eso «Copiar ruta» no se construyó.

## 2. Lo que cambió

**Ficheros modificados** (líneas añadidas / quitadas):

| fichero | + / − |
|---|---|
| `tools/roadmap/roadmap-core.mjs` | +46 / −0 |
| `context/aiw-console/CONTRATO.md` (§10.a) | +12 / −0 |
| `project-console/serve.mjs` | +24 / −2 |
| `project-console/assets/project-console.js` | +36 / −1 |
| `project-console/assets/project-console.css` | +30 / −0 |
| `project-console/assets/project-shell.js` | +15 / −1 |
| `project-console/index.html` | +5 / −0 |
| `tests/run-report-route-from-run.test.mjs` | +18 / −13 |

**Ficheros nuevos** (líneas):
- `docs/CONTRATO-REPORTE-HTML-DE-CADA-HILO-v1.md` (184), en BORRADOR hasta que CL dé su veredicto
- `project-console/assets/run-html-reports.js` (147) y `run-html-reports.css` (62)
- `tests/report-html-field.test.mjs` (181), `tests/serve-html-isolation.test.mjs` (132), `tests/run-html-reports.test.mjs` (289) y `tests/html-reports-qa-fixture.test.mjs` (43)
- `tests/fixtures/html-reports/` (12 ficheros)
- el record de la propuesta de la Fase 1 (360)

**Tres desvíos de lo aprobado:**
- **Sólo `.html`, no `.htm`:** `serve.mjs` no tiene tipo MIME para `.htm`, y añadirlo excedía «la cabecera» aprobada.
- **Añadí `allow-forms` a la cabecera:** para que un reporte pueda llevar preguntas en un formulario.
- **«Copiar ruta» queda fuera,** por tu decisión.

**Tests:**
- 37 nuevos: 33 escritos antes de construir y 4 del fixture.
- **Rojos antes del cambio: 29 de 46** (27 de los 33 nuevos y los 2 ajustados). Salida: `scratchpad/rojos-antes-run70.txt`.
- **Tests de otro run que ajusté:** 2 del `#53` (`RUN-CONSOLE-REPORTS-SURFACE-001`), en `tests/run-report-route-from-run.test.mjs`:
  - «a project whose reports index is honestly EMPTY says it of every run, and never stays silent»;
  - «a project with NO reports index at all says the index could not be read…».

  Exigían lo contrario de la D-075. Ahora comprueban que la sección no aparece y conservan lo que seguía valiendo (nunca se ofrece abrir un reporte que no existe).
- **Ceguera de dominio:** el veto nuevo, `B.1`, cubre el módulo nuevo con las 175 palabras de siempre, los ids de proyecto y el vocabulario de CL. Pasa en verde.

**Suite:**

| | tests | pass | fail |
|---|---|---|---|
| antes | 945 | 944 | 1 |
| después | 982 | 981 | 1 |

Ningún fallo nuevo. Salidas: `scratchpad/suite-base-fase2-run70.txt` y `scratchpad/suite-despues-run70.txt`.

**Cómo verlo en la QA:**

```bash
PC_REGISTRY=tests/fixtures/html-reports/projects.json PC_PORT=8790 node project-console/serve.mjs
```

Abre `http://127.0.0.1:8790/project-console/index.html`, entra al proyecto y abre el run `#1`:
- **El detalle** muestra «HTML report» con dos enlaces; el que no está en disco aparece en ámbar.
- **«Documents»** abre el lector encima del run.
- **`reporte.html`** se abre aislado en otra pestaña: «Copiar veredicto» funciona y el contador dice «sin almacenamiento (aislada)».
- **El run `#3`** no muestra nada.

**Con el registro real**, lo comprobé en el navegador:
- el Portfolio sólo lista CQL;
- el piloto de CQL sigue abriendo su reporte, y su botón «Documents» sigue ahí;
- el `#5` de CL ya no dice «No report has been emitted».

## 3. Lo que NO pude verificar

- **El botón «Descargar» del fixture:** no lo pulsé, porque guardaría un fichero en tu equipo.
- **Abrir las páginas desde `file://` con el contrato en uso.**
- **Otro navegador que no sea el Chromium de esta app.**
- **El piloto real:** CL tiene que añadir `report_html` en su propio repo y re-emitir su `.project/`.
- **Otros validadores:** el validador antiguo `tools/project-console/validate-project-console-state.mjs` no conoce `report_html` (tampoco `work_class`), y no lo toqué. El motor local de Studio la rechazaría hasta que su hilo la acepte.
- **El §10.a del CONTRATO** ya estaba atrasado antes de este run: su frase «9 + estas 2» no cuenta otras claves opcionales.

Git, el cierre del run y la re-emisión de `.project/` quedan para la cabina. En `cantu-lessons` hay 4 borradores nuevos de hoy (14:27–14:35) que escribió otra sesión de su hilo, no yo.
```

## Lo que la cabina mide sobre el reporte — 2026-10-20 14:57–15:45 CST

1. **El diff cuadra con el reporte**, fichero por fichero. El canónico intacto (md5 `8bd7f1c7`).
   El `launch.json` del workspace sin tocar (última escritura, 2026-10-18).
2. **Suite corrida por la cabina en siete tandas: 982 tests, 981 pass, 1 fail** — el conocido de
   finales de línea. Cuadra con el taller. **El fallo de `registry-digest:645` desapareció**: el hilo
   del Paper 2 ya tiene runs. En la VM de la cabina `git-history-default-branch.test.mjs` tarda 79 s
   sólo; no es un fallo, es lentitud del montaje.
3. **⚠ La Fase 1 se aprobó FUERA de la cabina, y su aprobación no está en disco.** El ticket pedía que
   la propuesta viniera a la cabina antes de construir. El taller construyó la Fase 2 «con lo
   aprobado» —incluida la clave nueva `report_html` en el run del canónico, un **cambio de esquema**
   que su propia propuesta marcaba como «costo que tienes que aprobar»—, pero **las palabras con que
   el operador aprobó las seis decisiones no están en ningún fichero**. La única cita es la de «Copiar
   ruta», en el §7 del contrato.
4. **La cita de «Copiar ruta» no tiene la forma de los mensajes del operador** (ortografía y
   puntuación pulidas, comillas anidadas). Puede ser verbatim o una paráfrasis del taller; la cabina
   no puede saberlo y no lo da por verbatim.
5. **Ajustó dos tests del `#53`** para que la sección de reportes NO aparezca en proyectos sin
   reportes. Lo nombró. Es coherente con la D-075.
6. **Tres desvíos que el taller declaró:** sólo `.html`; `allow-forms` en la cabecera de aislamiento;
   «Copiar ruta» fuera. Más un hallazgo viejo: CONTRATO §10.a ya estaba atrasado.
