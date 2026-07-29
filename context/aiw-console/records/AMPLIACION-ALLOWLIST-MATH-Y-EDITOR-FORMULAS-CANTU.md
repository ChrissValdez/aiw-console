# Ampliación de la allowlist de math y reparación del editor de fórmulas (cantu-studio)

- **Run:** `RUN-CANTU-MATH-ALLOWLIST-EXPANSION-AND-FORMULA-EDITOR-001` (queue_order 11, carril DEVELOPMENT, objetivo O5, fase O5.P1)
- **Fecha:** 2026-07-29
- **Guarda del canónico:** el `run_id` se derivó del canónico por `queue_order` 11 y el título coincide verbatim: «Expand the math allowlist and repair the formula editor surface». La guarda NO saltó. `title`, `summary` y `full_description` leídos verbatim de `.aiw/roadmap/roadmap.json` antes de tocar nada.
- **Roadmap renumerado, medido:** 7 objetivos / 28 fases / **73 runs** (cifra del validador, no del ticket).

## (A) Allowlist de `rule.math`: cifras reales

Runtime verificado: **KaTeX 0.16.9**, fijado en `src/builders/web/buildSingleWebLesson.js` línea 4 (CDN jsdelivr). Cada candidato se verificó programáticamente contra `katex@0.16.9` instalado ex profeso fuera del repo (`renderToString` con `throwOnError: true`, muestra mínima con argumentos obligatorios llenos).

| Métrica | Valor medido |
|---|---|
| Candidatos comando distintos del ticket (dedup; `\mathrm`, `\mathbb`, `\text`, `\delta`, etc. aparecían en varios grupos) | **216** |
| Ya estaban en la allowlist | **24** |
| Colisiones con el blocklist | **0** |
| Rechazados por KaTeX 0.16.9 | **1** — `\dddot` («Undefined control sequence»); se reporta y NO se admite |
| Admitidos nuevos | **191** |
| Allowlist de comandos | **39 → 230** |
| Candidatos entorno | 12 (9 ya estaban) |
| Entornos admitidos nuevos | **3** — `smallmatrix`, `array`, `split` (los tres renderizan en KaTeX 0.16.9) |
| Allowlist de entornos | **9 → 12** |

**Escapes de un carácter** (`\,` `\:` `\;` `\!` `\\` `\{` `\}` `\|`): no son comandos alfabéticos, el extractor del sanitizador no los ve y **ya los aceptaba el validador hoy** — verificado empíricamente. No requieren entrada en la allowlist. Peculiaridad vigente declarada: `\{` y `\}` cuentan para el balance de llaves, así que solo pasan en pares.

**Blocklist: NO se relajó.** Sigue con sus **27** entradas intactas (cifra medida en `constants.js`; nota: `REFERENCE-MATH-FORMULA-COMPATIBILITY.md` §3 dice «Blocked outright, 25» pero su propia lista enumera 27 — cifra errónea preexistente, reportada, no editada). Verificado post-cambio: los 19 payloads adversariales del ticket (`\def` `\newcommand` `\renewcommand` `\let` `\gdef` `\global` `\expandafter` `\csname`+`\endcsname` `\noexpand` `\makeatletter` `\input` `\include` `\includegraphics` `\href` `\url` `\htmlClass` `\htmlId` `\htmlStyle` `\htmlData`) siguen rechazados por `BLOCKED_LATEX_COMMAND` o por la allowlist cerrada (`UNKNOWN_LATEX_COMMAND`), y ninguno compila.

**Reglas estructurales: NO se relajaron.** `ANGLE_BRACKET_PAYLOAD` (`<` `>` pelados siguen rechazados — conducta vigente, declarada, no cambiada), balance de llaves/paréntesis/corchetes, `\left`/`\right` emparejados, grupos de `\frac`/`\sqrt`, tope de 1024 caracteres, 12 líneas máximo, entornos balanceados y emparejados: todo verificado vigente post-cambio.

**Fórmula de aceptación del operador:** verificada de punta a punta —
`normalizeRuleMathValue` ACEPTA → `WebDraftSchema` ACEPTA → `compileDraftToJameData` la emite **verbatim** → `renderRule.js` la envuelve en `\[ \]` → KaTeX 0.16.9 la **renderiza** desde el math extraído del HTML (mismo método del run del teclado, §3 del boundary).

## (B) Mensaje de rechazo del LaTeX textual avanzado

- **Antes (medido):** «LaTeX textual avanzado inválido. El valor seguro anterior se conserva.» — sin nombrar comando, causa ni posición.
- **Después:** «LaTeX textual avanzado inválido: `<causa>`. El valor seguro anterior se conserva.» donde la causa nombra el comando y su razón, con posición cuando el error la trae. Ejemplos reales medidos:
  - `\notacommand{x}` → «…inválido: el comando \notacommand no está en la lista de comandos permitidos (posición 1). El valor seguro…»
  - `\def\x{y}` → «…inválido: el comando \def está bloqueado por seguridad (posición 1) (+1 más). …»
  - `\frac{1}` → «…inválido: \frac requiere 2 grupo(s) entre llaves. …»
  - `\begin{center}…` → «…inválido: el entorno "center" no está permitido (+1 más). …»
- Implementado en el helper compartido `smartFormulaValidationMessages.js` (nuevo, en `math-authoring/smartFormulaField/`), consumido por `WebBlockEditor.jsx`. Idioma: español, el idioma medido de la UI.
- **La conducta «el valor seguro anterior se conserva» NO cambió** (medida como protección real; se conserva).
- El modal del editor visual conserva su mensaje corto «La fórmula no es válida.» — está fijado por dos tests guarda (`mathAuthoringSmartFormulaField.test.mjs:475`, `webRuleSmartFormulaFieldRulePilot.test.mjs:293`) y el modal es el caso explícito de «si funciona bien, no lo toques». El helper queda disponible si un run futuro decide adoptarlo ahí.

## (C) Superficie del editor de fórmulas: medición y cambios

**Medido antes de tocar:**

| Elemento | Estado medido |
|---|---|
| Botón «Editar fórmula» / «Insertar fórmula» | `bg-indigo-600 px-4 py-2 text-sm font-bold rounded-lg hover:bg-indigo-700` — ya habla el lenguaje primario del editor (`ComponentGuide.jsx:1960`, `DesignSystemSettingsModal.jsx:242`), pero sin `shadow-sm` que sus pares sí llevan |
| Textarea LaTeX avanzado, nivel superior | `font-mono text-sm min-h-20`, foco indigo, sin `leading-relaxed` ni `placeholder-zinc-400` |
| Textarea LaTeX avanzado, dentro de columnas | `COLUMN_TEXTAREA_CLASS` — tipografía **proporcional** (perdía `font-mono`), `min-h-28 leading-relaxed` |
| Modal de edición (SmartFormulaModal) | El operador reporta que «jala excelente» — medido y **no tocado** |

**Cambios aplicados, uno a uno (los tres en `WebBlockEditor.jsx`):**

1. Botón «Editar fórmula»: se añadió `shadow-sm`. Razón: paridad con los otros botones primarios indigo del editor; ningún otro cambio al botón.
2. Textarea avanzado en columnas: `${COLUMN_TEXTAREA_CLASS} font-mono` (solo en el campo de fórmula; `COLUMN_TEXTAREA_CLASS` global no se tocó porque lo comparten otros componentes). Razón: el LaTeX se edita en monoespaciada en ambos contextos; era el «detalle de tamaño/tipo de letra» medible.
3. Textarea avanzado a nivel superior: se añadieron `leading-relaxed` y `placeholder-zinc-400`. Razón: paridad con los inputs de columna para LaTeX multilínea; tamaño se mantiene `text-sm` (14px), consistente con todos los inputs del editor.

**No tocado (frontera dura):** «Placement avanzado», «Col span» y el resto del editor de bloques de Rule; el layout del teclado, la altura del cajón y la curación de menú (línea base con test guarda, verificado en verde); el Formula Inserter; el modal.

## Hallazgo del normalizador closed-loop (criterio 11) — reporte, no decisión

`smartFormulaCommandNormalizer.js` mapea `\exponentialE → {e}` e `\imaginaryI → {i}` (itálicas). El run anterior declaró la itálica como el precio de no tener `\mathrm`; **ese precio ya no existe**: `\mathrm` está admitido y `\mathrm{e}` valida y compila (verificado en el test aditivo). **Recomendación:** remapear a `\mathrm{e}` / `\mathrm{i}` para recuperar la fidelidad del glifo recto que la tecla muestra; los drafts guardados con `{e}`/`{i}` siguen válidos (sin migración). **No se cambió** porque cambia lo que el autor ve en el output — la decisión es del operador.

## Artefacto de frontera actualizado

`docs/reference/REFERENCE-VIRTUAL-KEYBOARD-CAPABILITY-BOUNDARY.md` (único documento de otro run que este encargo edita, porque describe la allowlist que cambió):

- **Antes:** SUPPORTED 25 / POLICY 38 / CAPABILITY 3. **Después:** SUPPORTED **59** / POLICY **4** / CAPABILITY 3 (sin cambio).
- 34 de los 38 POLICY se reclasificaron a SUPPORTED. Siguen POLICY 4: `\larr` `\lrArr` `\vert` `\Vert` — KaTeX los dibuja pero no eran candidatos del operador; declarados, no admitidos, sin tomar posición.
- Nota tipográfica de §6 actualizada (la premisa «\mathrm no está en la allowlist» quedó falsa) y no-claims ajustado. Banner con nota de actualización y antes/después. ASCII puro verificado (0 caracteres no-ASCII).

**Reporte sin edición:** `REFERENCE-MATH-FORMULA-COMPATIBILITY.md` queda desactualizado en su §3 — dice «39 comandos» y «9 entornos» y enumera la lista vieja; además su cifra «Blocked outright, 25» ya era errónea al escribirse (lista 27). Per criterio 13, **se reporta y no se edita**; corresponde a su propio run.

## Tests y lint

- Suite completa de `compiler-api`: **274/274 en verde**, incluidas las cuatro guardas (`mathAuthoringSmartFormulaField`, `mathAuthoringFoundation`, `webArithmeticFactorizationSafety`, `mathAuthoringVirtualKeyboardKatexCompatibility`) leídas antes de tocar.
- Cobertura **aditiva** nueva: `tools/author-lite/compiler-api/tests/mathAuthoringAllowlistExpansion.test.mjs` (9 tests): tamaños medidos y blocklist congelado por contenido; muestra representativa de admitidos valida y compila; fórmula del operador verbatim; 19 adversariales siguen rechazados y no compilan; estructurales vigentes; `\dddot` fuera; mensajes (B) nombran comando/causa/posición; cableado del helper y conservación del valor seguro; monoespaciada en ambos contextos.
- `eslint` (editor-ui): **EXIT 0**.
- No se corrió ninguna suite de `aiw-console`.

## Validador e índice

- `node tools/project-console/validate-project-console-state.mjs` (vía de solo lectura): **EXIT 0 antes y después**. Component statuses: **16** sin moverse. Docs indexed: **147** antes y después. Único aviso: el no bloqueante de la arista externa (`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`), intacto.
- `.aiw/docs/docs_index.json` — edición quirúrgica de **una sola entrada** (la del boundary): `last_update_source`, `freshness` (`produced_2026-07-28 → updated_2026-07-29`, vocabulario existente) y cifras de `notes`. Protocolo cumplido: respaldo fuera del repo (scratchpad, md5 verificado idéntico), roundtrip byte-exacto verificado ANTES de tocar (CRLF), reemplazo crudo sin reserializar, diff a nivel de entradas = **1 entrada cambiada, campos raíz idénticos, 147 entradas antes y después**, escaneo no-ASCII antes y después (1 em-dash U+2014 preexistente en una entrada ajena, línea 1022, idéntico en el respaldo — declarado, no tocado).
- md5 `docs_index.json`: `dac76d5d73283f6b3924fd825e796edd` → `dbe003bb01bdbe7100bc56958d847738`.

## Superficies protegidas y `.project/`

- **`.project/` NO se re-emitió y no se movió:** los seis archivos conservan md5 y mtime `2026-07-29 00:16:30` idénticos antes y después (docs_index `3ace29ad…`, git_history `9e246f56…`, guardrails `eb2b5e9b…`, no_claims `7b2616c5…`, roadmap `3371fd28…`, snapshot `fd37ccdc…`).
- **Superficies del hilo paralelo intactas**, md5 antes = después: `aiw-console/roadmap/roadmap.json` `f299d968fdf781bf31863d696bd9610e`; `aiw-console/context/DECISIONES.md` `3f6bdf8816a0b43818519eb3582f6511`; `aiw-console/context/aiw-console/CONTRATO.md` `f77ccec64d99f2048d4bde41638cb228`. No se tocaron `context/aiw/`, handoffs, tests ni records existentes.
- Sin git, sin servidores, sin suites de aiw-console.

## Status declarado (no aplicado)

El run queda en **`active`** con la QA humana preparada y detenida. Ningún `status`, `progress` ni `closeout_result` fue tocado. Al aprobar la QA, el cierre a `completed` lo ejecuta el operador desde la consola global. No se certifica nada (GOVERNANCE-AUTHORITY-AND-NO-CLAIMS §2-§3; `certified` como etiqueta primaria está deprecado per JAME_HUMAN_GATE_POLICY_LITE §9 y §15).

## Archivos escritos por este encargo, y ninguno más

| # | Archivo (ruta repo-relativa) | Acción |
|---|---|---|
| 1 | `cantu-studio/tools/author-lite/editor-ui/src/features/math-authoring/constants.js` | Editado — allowlist 39→230, entornos 9→12, comentario de verificación |
| 2 | `cantu-studio/tools/author-lite/editor-ui/src/features/math-authoring/smartFormulaField/smartFormulaValidationMessages.js` | Nuevo — helper de mensajes (B) |
| 3 | `cantu-studio/tools/author-lite/editor-ui/src/features/math-authoring/smartFormulaField/index.js` | Editado — export del helper |
| 4 | `cantu-studio/tools/author-lite/editor-ui/src/features/editor/components/web/WebBlockEditor.jsx` | Editado — mensaje (B) + 3 cambios (C) |
| 5 | `cantu-studio/tools/author-lite/compiler-api/tests/mathAuthoringAllowlistExpansion.test.mjs` | Nuevo — cobertura aditiva |
| 6 | `cantu-studio/docs/reference/REFERENCE-VIRTUAL-KEYBOARD-CAPABILITY-BOUNDARY.md` | Editado — reclasificación con antes/después |
| 7 | `cantu-studio/.aiw/docs/docs_index.json` | Editado — quirúrgico, 1 entrada |
| 8 | `aiw-console/context/aiw-console/records/AMPLIACION-ALLOWLIST-MATH-Y-EDITOR-FORMULAS-CANTU.md` | Nuevo — este record |

Scripts de verificación y respaldo del índice viven fuera del repo, en el scratchpad de la sesión. Records existentes antes de este: **58**; con este: **59**. Sin colisión de nombre.

## QA humana — preparada y detenida (formato DoD §6, máx. 10)

**Run:** `RUN-CANTU-MATH-ALLOWLIST-EXPANSION-AND-FORMULA-EDITOR-001` · **Superficie:** editor de fórmulas del bloque `rule` (Author Lite Web). **Carga:** arranca el editor (`npm --prefix tools/author-lite run dev`), crea o abre un draft Web y agrega un bloque **rule**. Ninguna comprobación pide comparar contra un estado anterior. Los veredictos vuelven al operador y por sí mismos no cambian ningún status.

| # | Qué hacer | Qué debe pasar | Veredicto |
|---|---|---|---|
| 1 | En el bloque rule, abre «LaTeX textual avanzado» y pega: `\oint_{\partial \Omega} \mathbf{B} \cdot d\mathbf{l} = \iint_{\Omega} (\nabla \times \mathbf{B}) \cdot d\mathbf{S} = \int_\Omega \left( \sum_{i=1}^{3} \partial_i B^i + \Gamma^{\alpha}_{\beta\alpha} T^{\beta} \right) dV` | La vista previa muestra la fórmula dibujada como matemáticas (integrales, nabla, negritas), sin texto LaTeX crudo y sin mensaje de rechazo | |
| 2 | En el mismo campo, borra todo y escribe `\notacommand{x}` | Aparece un mensaje ámbar que nombra `\notacommand`, dice que no está en la lista de comandos permitidos, y la fórmula anterior se conserva | |
| 3 | Escribe `\def\x{y}` | El mensaje nombra `\def` y dice «bloqueado por seguridad»; nada se guarda | |
| 4 | Escribe `\frac{1}` | El mensaje dice que `\frac` requiere 2 grupos entre llaves | |
| 5 | Escribe `a < b` | El mensaje dice que los símbolos `<` y `>` sueltos no están permitidos | |
| 6 | Pega `\begin{pmatrix} a & b \\ c & d \end{pmatrix}` | La matriz valida y se previsualiza dibujada entre paréntesis | |
| 7 | Pulsa «Editar fórmula», y en el teclado matemático abre la pestaña `greek` y pulsa la tecla χ (chi); confirma | La letra χ entra en la fórmula, el modal confirma sin error y la vista previa la muestra | |
| 8 | En el modal, abre y cierra el teclado matemático y agrega/elimina una línea | El modal funciona con fluidez: teclado abre y cierra, líneas se agregan y eliminan, confirmar guarda | |
| 9 | Crea un bloque **columns**, mete un bloque rule en un slot y abre su «LaTeX textual avanzado» | El texto del campo se ve en letra monoespaciada (como el campo de nivel superior) | |
| 10 | Genera la lección (Compile Web) con el bloque rule del punto 1 y abre el HTML con internet | La fórmula aparece renderizada por KaTeX en la página final, no como texto fuente | |

## Cierre

Producto de este encargo: un record (este archivo). Cifras de este record: medidas en la sesión, no heredadas del ticket. La certificación no se reclama; la QA queda en manos del operador.
