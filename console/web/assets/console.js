// Consola global — prototipo (renderer)
// ---------------------------------------------------------------------------
// PRIMER CONSUMIDOR REAL de roadmap_tree_v1. Lee el archivo CRUDO y directo
// (roadmap/roadmap.json de aiw-console) y lo renderiza en tres vistas read-only.
//
// Camino de datos (deliberado):
//   - NO usa el proyector, NO usa .project/, NO usa snapshot. Lee roadmap_tree_v1
//     tal cual está en disco. Si el archivo cambia, la pantalla cambia.
//
// Identidad-neutral: este archivo NO hornea ningún nombre de proyecto
//   ("JAME"/"CANTU"/…). Todo lo identitario que aparezca en pantalla viene del
//   archivo de datos (títulos, run_id), nunca del código.
//
// Read-only estricto: no hay ninguna ruta de escritura, ni fetch con método
//   distinto de GET, ni mutación de datos del repo.
// ---------------------------------------------------------------------------

"use strict";

// Ruta única del dato. La sirve el servidor local leyendo roadmap/roadmap.json
// crudo (ver console/serve.mjs). Un solo literal, en un solo lugar (disciplina
// de "ruta base como constante", CONTRATO §1.a).
const ROADMAP_URL = "/data/roadmap.json";

// El identificador de modelo que este consumidor entiende. Se compara para
// AVISAR, no para ramificar comportamiento ni para rechazar: el prototipo
// renderiza lo que haya y anota si el schema no es el esperado.
const EXPECTED_SCHEMA = "roadmap_tree_v1";

// ------- Vocabularios (CONTRATO §11) ---------------------------------------
// Status de RUN — cuatro tokens, tal como viven en el archivo (§11.a).
const RUN_STATUS = {
  planned: { label: "Planned", badge: "badge-gray" },
  active: { label: "Active", badge: "badge-blue" },
  blocked: { label: "Blocked", badge: "badge-red" },
  completed: { label: "Completed", badge: "badge-green" }
};

// Status DERIVADO de objetivo/fase — cinco tokens (§11.b). No existen en el
// archivo: son el resultado de la función de derivación (§12), calculado al leer.
const DERIVED_STATUS = {
  planned: { label: "Planned", badge: "badge-gray" },
  in_progress: { label: "In progress", badge: "badge-amber" },
  active: { label: "Active", badge: "badge-blue" },
  blocked: { label: "Blocked", badge: "badge-red" },
  completed: { label: "Completed", badge: "badge-green" }
};

// ------- Función de derivación (CONTRATO §12.a) ----------------------------
// Toma una colección de runs (los de un objetivo = unión de sus fases, o los de
// una fase) y devuelve el token derivado. Precedencia estricta: gana la primera
// regla que aplique.
//   1. active       — algún run active
//   2. blocked      — ningún active y algún blocked
//   3. completed    — todos completed, y hay al menos uno
//   4. in_progress  — algún completed, pero no todos
//   5. planned      — ningún run ha salido de planned
// Dominio: 0 runs = MALFORMADO (§12.b) → se devuelve null (indefinido), no un token.
function deriveStatus(runs) {
  if (!Array.isArray(runs) || runs.length === 0) return null; // §12.b malformado
  const statuses = runs.map((r) => r && r.status);
  if (statuses.some((s) => s === "active")) return "active";
  if (statuses.some((s) => s === "blocked")) return "blocked";
  if (statuses.every((s) => s === "completed")) return "completed";
  if (statuses.some((s) => s === "completed")) return "in_progress";
  return "planned";
}

// Todos los runs de un objetivo = unión de los runs de todas sus fases, en un
// solo paso (§12: la función toma runs, no derivados intermedios).
function objectiveRuns(objective) {
  const out = [];
  for (const phase of objective.phases || []) {
    for (const run of phase.runs || []) out.push(run);
  }
  return out;
}

// ------- Utilidades de DOM (escape-first, sin innerHTML de datos crudos) ----
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = String(text);
  return node;
}

function badge(label, badgeClass) {
  return el("span", "badge " + badgeClass, label);
}

// Badge de status de run a partir del token del archivo. Un token fuera del
// vocabulario se muestra tal cual (no se inventa ni se oculta): el prototipo
// hace visible el dato, incluso si es inesperado.
function runStatusBadge(status) {
  const spec = RUN_STATUS[status];
  return spec ? badge(spec.label, spec.badge) : badge(String(status ?? "—"), "badge-outline");
}

function derivedStatusBadge(token) {
  if (token == null) return badge("Malformado (0 runs)", "badge-red");
  const spec = DERIVED_STATUS[token];
  return spec ? badge(spec.label, spec.badge) : badge(String(token), "badge-outline");
}

// ------- Estado en memoria (solo lectura) ----------------------------------
const state = {
  roadmap: null,
  runsById: new Map(), // run_id -> { run, objective, phase }
  runsByOrder: [] // ordenado por queue_order
};

// Indexa todo el árbol una vez, para el detalle de run y la cola.
function indexRoadmap(roadmap) {
  state.runsById.clear();
  const all = [];
  for (const objective of roadmap.objectives || []) {
    for (const phase of objective.phases || []) {
      for (const run of phase.runs || []) {
        state.runsById.set(run.run_id, { run, objective, phase });
        all.push({ run, objective, phase });
      }
    }
  }
  all.sort((a, b) => (a.run.queue_order ?? 0) - (b.run.queue_order ?? 0));
  state.runsByOrder = all;
}

// ------- Cabecera / marca (desde el dato) ----------------------------------
function renderBrand(roadmap) {
  const title = document.getElementById("brand-title");
  const sub = document.getElementById("brand-sub");
  // roadmap.title y roadmap.roadmap_id vienen del archivo — identidad del dato,
  // no del código.
  title.textContent = roadmap.title || "Consola global";
  const objectives = (roadmap.objectives || []).length;
  const runs = state.runsByOrder.length;
  sub.textContent = `${roadmap.roadmap_id || "roadmap"} · ${objectives} objetivos · ${runs} runs · ${
    roadmap.schema_version || "sin schema_version"
  }`;
}

// Leyenda de los cinco tokens derivados de objetivo/fase.
function renderLegend() {
  const box = document.getElementById("roadmap-legend");
  box.textContent = "";
  const label = el("span", "legend-label", "Estado derivado:");
  box.appendChild(label);
  for (const token of ["planned", "in_progress", "active", "blocked", "completed"]) {
    box.appendChild(derivedStatusBadge(token));
  }
}

// ------- VISTA 1 — árbol objetivo → fase → run -----------------------------
function renderTree(roadmap) {
  const container = document.getElementById("roadmap-tree");
  container.textContent = "";

  for (const objective of roadmap.objectives || []) {
    const runs = objectiveRuns(objective);
    const card = el("div", "objective-card");

    // Encabezado de objetivo con status DERIVADO (no almacenado).
    const head = el("div", "objective-header");
    const headMain = el("div", "objective-header-main");
    headMain.appendChild(el("span", "objective-id mono", objective.objective_id));
    headMain.appendChild(el("h2", "objective-title", objective.title));
    head.appendChild(headMain);

    const headMeta = el("div", "objective-header-meta");
    headMeta.appendChild(derivedStatusBadge(deriveStatus(runs)));
    headMeta.appendChild(el("span", "objective-count", `${runs.length} runs`));
    head.appendChild(headMeta);
    card.appendChild(head);

    // Fases.
    for (const phase of objective.phases || []) {
      const phaseRuns = phase.runs || [];
      const group = el("div", "phase-group");

      const phaseHead = el("div", "phase-header");
      const phaseMain = el("div", "phase-header-main");
      phaseMain.appendChild(el("span", "phase-id mono", phase.phase_id));
      phaseMain.appendChild(el("span", "phase-title", phase.title));
      phaseHead.appendChild(phaseMain);
      const phaseMeta = el("div", "phase-header-meta");
      // Misma función de derivación, aplicada a los runs de la fase (§13).
      phaseMeta.appendChild(derivedStatusBadge(deriveStatus(phaseRuns)));
      phaseHead.appendChild(phaseMeta);
      group.appendChild(phaseHead);

      const list = el("div", "run-list");
      // Dentro de la fase, orden por queue_order para lectura estable.
      const ordered = phaseRuns.slice().sort((a, b) => (a.queue_order ?? 0) - (b.queue_order ?? 0));
      for (const run of ordered) list.appendChild(runRow(run));
      group.appendChild(list);
      card.appendChild(group);
    }

    container.appendChild(card);
  }
}

// Fila de run (abre el detalle). Botón real → accesible y read-only.
function runRow(run) {
  const row = el("button", "run-row");
  row.type = "button";
  row.addEventListener("click", () => openRunDetail(run.run_id));

  const left = el("div", "run-row-left");
  left.appendChild(el("span", "run-order", "#" + (run.queue_order ?? "—")));
  const body = el("div", "run-row-body");
  body.appendChild(el("span", "run-row-title", run.title));
  if (run.summary) body.appendChild(el("span", "run-row-summary", run.summary));
  left.appendChild(body);
  row.appendChild(left);

  const right = el("div", "run-row-right");
  right.appendChild(runStatusBadge(run.status));
  row.appendChild(right);
  return row;
}

// ------- VISTA 3 — cola por queue_order global -----------------------------
function renderQueue() {
  const list = document.getElementById("queue-list");
  const summary = document.getElementById("queue-summary");
  list.textContent = "";
  summary.textContent = "";

  // Resumen: conteo por status de run + rango de queue_order observado.
  const counts = { planned: 0, active: 0, blocked: 0, completed: 0, otros: 0 };
  for (const { run } of state.runsByOrder) {
    if (counts[run.status] === undefined) counts.otros += 1;
    else counts[run.status] += 1;
  }
  const orders = state.runsByOrder.map((r) => r.run.queue_order).filter((n) => typeof n === "number");
  const min = orders.length ? Math.min(...orders) : "—";
  const max = orders.length ? Math.max(...orders) : "—";

  const strip = el("div", "summary-strip");
  strip.appendChild(chip(`queue_order ${min}..${max}`));
  strip.appendChild(chip(`${state.runsByOrder.length} runs`));
  strip.appendChild(chip(`${counts.active} active`));
  strip.appendChild(chip(`${counts.blocked} blocked`));
  strip.appendChild(chip(`${counts.completed} completed`));
  strip.appendChild(chip(`${counts.planned} planned`));
  if (counts.otros) strip.appendChild(chip(`${counts.otros} otros`));
  // Aviso de densidad: ¿es 1..N contigua y única? (propiedad medida, no norma —
  // el prototipo lo reporta, no lo exige.)
  const dense = isContiguousUnique(orders);
  strip.appendChild(
    dense.ok
      ? chip("orden contiguo y único ✓", "chip-ok")
      : chip(`orden: ${dense.note}`, "chip-warn")
  );
  summary.appendChild(strip);

  for (const { run, objective, phase } of state.runsByOrder) {
    const item = el("button", "queue-item");
    item.type = "button";
    item.addEventListener("click", () => openRunDetail(run.run_id));

    item.appendChild(el("span", "queue-order-badge", run.queue_order ?? "—"));

    const info = el("div", "queue-info");
    info.appendChild(el("span", "queue-title", run.title));
    const meta = el("div", "queue-meta");
    meta.appendChild(el("span", "queue-ctx mono", `${objective.objective_id} · ${phase.phase_id}`));
    if (Array.isArray(run.depends_on) && run.depends_on.length) {
      meta.appendChild(el("span", "queue-dep", `depende de ${run.depends_on.length}`));
    }
    info.appendChild(meta);
    item.appendChild(info);

    const right = el("div", "queue-right");
    right.appendChild(runStatusBadge(run.status));
    item.appendChild(right);

    list.appendChild(item);
  }
}

function chip(text, extra) {
  return el("span", "chip" + (extra ? " " + extra : ""), text);
}

function isContiguousUnique(orders) {
  if (!orders.length) return { ok: false, note: "sin queue_order" };
  const sorted = orders.slice().sort((a, b) => a - b);
  const unique = new Set(sorted);
  if (unique.size !== sorted.length) return { ok: false, note: "hay repetidos" };
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] !== sorted[0] + i) return { ok: false, note: "hay huecos" };
  }
  return { ok: true };
}

// ------- VISTA 2 — detalle de run (drawer compartido) ----------------------
function drawerRow(label, valueNode) {
  const row = el("div", "detail-row");
  row.appendChild(el("div", "detail-label", label));
  const val = el("div", "detail-value");
  if (valueNode instanceof Node) val.appendChild(valueNode);
  else val.textContent = valueNode == null || valueNode === "" ? "—" : String(valueNode);
  row.appendChild(val);
  return row;
}

function openRunDetail(runId) {
  const entry = state.runsById.get(runId);
  const drawer = document.getElementById("run-drawer");
  const overlay = document.getElementById("drawer-overlay");
  const title = document.getElementById("drawer-title");
  const idEl = document.getElementById("drawer-id");
  const bodyEl = document.getElementById("drawer-body");
  bodyEl.textContent = "";

  if (!entry) {
    title.textContent = "Run no encontrado";
    idEl.textContent = runId;
  } else {
    const { run, objective, phase } = entry;
    title.textContent = run.title;
    idEl.textContent = run.run_id;

    // Ubicación en el árbol.
    const loc = el("div", "detail-section");
    loc.appendChild(el("div", "detail-section-title", "Ubicación"));
    loc.appendChild(
      drawerRow("Objetivo", `${objective.objective_id} — ${objective.title}`)
    );
    loc.appendChild(drawerRow("Fase", `${phase.phase_id} — ${phase.title}`));
    bodyEl.appendChild(loc);

    // Campos requeridos por el criterio de aceptación:
    // status, queue_order, depends_on, closeout_result, summary, full_description.
    const meta = el("div", "detail-section");
    meta.appendChild(el("div", "detail-section-title", "Estado"));
    meta.appendChild(drawerRow("Status", runStatusBadge(run.status)));
    meta.appendChild(drawerRow("Queue order", run.queue_order));

    // depends_on: lista de run_id; cada uno navegable si existe en el árbol.
    const dep = el("div", "detail-value-list");
    if (Array.isArray(run.depends_on) && run.depends_on.length) {
      for (const depId of run.depends_on) {
        const known = state.runsById.has(depId);
        if (known) {
          const b = el("button", "dep-link mono", depId);
          b.type = "button";
          b.addEventListener("click", () => openRunDetail(depId));
          dep.appendChild(b);
        } else {
          // Referencia que no resuelve localmente: puede ser una dependencia
          // que cruza proyectos (CONTRATO §10.d), no necesariamente colgante.
          // El prototipo la muestra y lo anota, sin inventar.
          const span = el("span", "dep-external mono", depId + " (externa / fuera de este roadmap)");
          dep.appendChild(span);
        }
      }
    } else {
      dep.textContent = "— sin dependencias";
    }
    const depRow = el("div", "detail-row");
    depRow.appendChild(el("div", "detail-label", "Depends on"));
    depRow.appendChild(dep);
    meta.appendChild(depRow);

    // closeout_result: OPCIONAL (§14). String libre, sin enum. Se muestra crudo.
    meta.appendChild(
      drawerRow(
        "Closeout result",
        run.closeout_result != null ? run.closeout_result : "— (no presente)"
      )
    );
    bodyEl.appendChild(meta);

    // Descripciones.
    const desc = el("div", "detail-section");
    desc.appendChild(el("div", "detail-section-title", "Descripción"));
    const sum = el("div", "detail-prose");
    sum.appendChild(el("div", "detail-label", "Summary"));
    sum.appendChild(el("p", null, run.summary || "—"));
    desc.appendChild(sum);
    const full = el("div", "detail-prose");
    full.appendChild(el("div", "detail-label", "Full description"));
    full.appendChild(el("p", null, run.full_description || "—"));
    desc.appendChild(full);
    bodyEl.appendChild(desc);

    // progress: OPCIONAL (§15) — presente en 1 de N runs. Se muestra si existe;
    // su ausencia es lo normal y no se inventa nada.
    if (Array.isArray(run.progress) && run.progress.length) {
      const prog = el("div", "detail-section");
      prog.appendChild(el("div", "detail-section-title", `Progress (${run.progress.length} entradas)`));
      const table = el("div", "progress-table");
      for (const p of run.progress) {
        const line = el("div", "progress-line");
        line.appendChild(el("span", "progress-cell mono", `ciclo ${p.cycle ?? "—"}`));
        line.appendChild(el("span", "progress-cell", p.stage ?? "—"));
        line.appendChild(el("span", "progress-cell", `intento ${p.attempt ?? "—"}`));
        line.appendChild(el("span", "progress-cell", p.state ?? "—"));
        line.appendChild(el("span", "progress-cell progress-result", p.result ?? "—"));
        table.appendChild(line);
      }
      prog.appendChild(table);
      bodyEl.appendChild(prog);
    }
  }

  overlay.classList.add("open");
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeRunDetail() {
  document.getElementById("drawer-overlay").classList.remove("open");
  const drawer = document.getElementById("run-drawer");
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

// ------- Navegación de vistas ----------------------------------------------
function switchView(view) {
  for (const tab of document.querySelectorAll(".tab")) {
    tab.classList.toggle("active", tab.dataset.view === view);
  }
  for (const section of document.querySelectorAll(".view")) {
    section.classList.toggle("active", section.id === "view-" + view);
  }
}

// ------- Validación mínima / aviso -----------------------------------------
// El prototipo NO rechaza el archivo: renderiza lo que haya y ANOTA lo que no
// cuadre. Ejercita el formato como consumidor real; las carencias van al veredicto.
function noticesFor(roadmap) {
  const notes = [];
  if (roadmap.schema_version !== EXPECTED_SCHEMA) {
    notes.push(
      `schema_version es "${roadmap.schema_version}", se esperaba "${EXPECTED_SCHEMA}". Se renderiza igual.`
    );
  }
  // Objetivo/fase con 0 runs = malformado (§12.b). Se anota, no se oculta.
  for (const obj of roadmap.objectives || []) {
    if (!objectiveRuns(obj).length) notes.push(`Objetivo ${obj.objective_id} sin runs (malformado, §12.b).`);
    for (const ph of obj.phases || []) {
      if (!(ph.runs || []).length) notes.push(`Fase ${ph.phase_id} sin runs (malformado, §12.b).`);
    }
  }
  return notes;
}

function showNotice(html) {
  const box = document.getElementById("load-notice");
  box.textContent = "";
  if (typeof html === "string") box.textContent = html;
  else if (Array.isArray(html)) {
    for (const line of html) box.appendChild(el("div", "notice-line", line));
  }
  box.hidden = false;
}

// ------- Arranque ----------------------------------------------------------
async function init() {
  document.getElementById("drawer-close").addEventListener("click", closeRunDetail);
  document.getElementById("drawer-overlay").addEventListener("click", closeRunDetail);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeRunDetail();
  });
  for (const tab of document.querySelectorAll(".tab")) {
    tab.addEventListener("click", () => switchView(tab.dataset.view));
  }

  let roadmap;
  try {
    const res = await fetch(ROADMAP_URL, { method: "GET", cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} al leer ${ROADMAP_URL}`);
    roadmap = await res.json();
  } catch (err) {
    showNotice(
      `No se pudo leer el roadmap (${ROADMAP_URL}). Levanta el servidor con "node console/serve.mjs". Detalle: ${err.message}`
    );
    return;
  }

  state.roadmap = roadmap;
  indexRoadmap(roadmap);
  renderBrand(roadmap);
  renderLegend();
  renderTree(roadmap);
  renderQueue();

  const notes = noticesFor(roadmap);
  if (notes.length) showNotice(notes);
}

document.addEventListener("DOMContentLoaded", init);
