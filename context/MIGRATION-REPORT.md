# MIGRATION-REPORT — Centralización del contexto de gobernanza en aiw-console

Fecha: 2026-07-23
Taller: Claude Code (sin git; solo sistema de archivos).
Origen: `aiw/` · Destino: `projects/aiw-console/context/aiw/`

---

## 1. Archivos mudados (copiar → verificar hash → borrar origen)

Los 6 archivos se copiaron, se verificó hash SHA-256 byte-idéntico entre origen
y destino, y solo entonces se borró el origen. Los 6 hashes coincidieron.

| Archivo (origen → destino)                                                                          | SHA-256 origen | SHA-256 destino | ¿Idéntico? | Origen borrado |
| --------------------------------------------------------------------------------------------------- | -------------- | --------------- | ---------- | -------------- |
| `aiw/DECISIONES.md` → `context/aiw/DECISIONES.md`                                                    | `1b049f2684ca916951779a0ae02fb6984445013cc5c395827511e8fdec457177` | `1b049f2684ca916951779a0ae02fb6984445013cc5c395827511e8fdec457177` | ✅ | ✅ |
| `aiw/ESTADO.md` → `context/aiw/ESTADO.md`                                                            | `a71c62310b2b6e50dd49ea0031cbf29b377ec4fdac9678188aef72a11a358db3` | `a71c62310b2b6e50dd49ea0031cbf29b377ec4fdac9678188aef72a11a358db3` | ✅ | ✅ |
| `aiw/AIW_CONTEXT.md` → `context/aiw/AIW_CONTEXT.md`                                                  | `6df79f0c36e3ba221d90af0af6533ae5f4282c2ba03fe67ecb18861cb0a5c642` | `6df79f0c36e3ba221d90af0af6533ae5f4282c2ba03fe67ecb18861cb0a5c642` | ✅ | ✅ |
| `aiw/roadmap_AIW_temp.md` → `context/aiw/roadmap_AIW_temp.md`                                        | `d6c832bca4f5c82f50435fadfd263666fd892055171c99640977962e5e9c5f84` | `d6c832bca4f5c82f50435fadfd263666fd892055171c99640977962e5e9c5f84` | ✅ | ✅ |
| `aiw/records/AUDIT-CONSOLE-O4-PHASE0.md` → `context/aiw/records/AUDIT-CONSOLE-O4-PHASE0.md`          | `cc5402f99c4d0571a0f7cc9791741e51f0b44e63b85331165d66bab6ac3cbd00` | `cc5402f99c4d0571a0f7cc9791741e51f0b44e63b85331165d66bab6ac3cbd00` | ✅ | ✅ |
| `aiw/records/HANDOFF-O4-TRAMO1.md` → `context/aiw/records/HANDOFF-O4-TRAMO1.md`                      | `345f2059610b5851487ed0202971a17b53e29ffb0391e48e33da9dcfbea64b22` | `345f2059610b5851487ed0202971a17b53e29ffb0391e48e33da9dcfbea64b22` | ✅ | ✅ |

`aiw/records/` quedó no vacío (conserva registros históricos) — el directorio no
se tocó. Puntero creado: `aiw/CONTEXTO.md`.

---

## 2. Referencias dentro de `aiw/` (excluyendo `logs/`, `node_modules/`, `.git/`)

### 2a. Actualizadas (reglas del agente / doc viva) — solo la ruta, no la prosa

Nueva ruta usada: `../projects/aiw-console/context/aiw/<archivo>` (relativa a la
raíz del repo `aiw`, que es el ancla natural cuando el agente lee estos archivos
desde dentro de `aiw`; consistente con el estilo de ruta explícita cross-repo ya
presente en `claude.md`).

| Archivo:línea | Referencia original | Nueva ruta |
| ------------- | ------------------- | ---------- |
| `aiw/claude.md:23` | `ESTADO.md` | `../projects/aiw-console/context/aiw/ESTADO.md` |
| `aiw/claude.md:24` | `DECISIONES.md` | `../projects/aiw-console/context/aiw/DECISIONES.md` |
| `aiw/claude.md:34` | `DECISIONES.md` | `../projects/aiw-console/context/aiw/DECISIONES.md` |
| `aiw/claude.md:35` | `ESTADO.md` | `../projects/aiw-console/context/aiw/ESTADO.md` |
| `aiw/CONSTITUCION.md:5` | `DECISIONES.md` | `../projects/aiw-console/context/aiw/DECISIONES.md` |
| `aiw/CONSTITUCION.md:30` | `DECISIONES.md` | `../projects/aiw-console/context/aiw/DECISIONES.md` |

Nota: `claude.md` es el archivo de reglas `CLAUDE.md` del repo (Windows es
insensible a mayúsculas). No se movió (prohibido); solo se editaron rutas dentro,
lo cual el encargo autoriza explícitamente para `CLAUDE.md`/`CONSTITUCION.md`.
Las líneas 26–27 de `claude.md` referencian `records/COSECHA.md` y
`records/HISTORIA.md`, que NO se mudaron y siguen en `aiw/records/`: no se tocaron.

### 2b. NO tocadas (registros históricos — describen el pasado, no se reescriben)

Motivo común: son registros de archivo (auditorías / crónica / cualificación).
Su texto documenta un estado pasado y no debe reescribirse.

| Archivo | Líneas con referencia | Motivo |
| ------- | --------------------- | ------ |
| `aiw/records/QUALIFICATION.md` | 103 | Registro histórico (cualificación). |
| `aiw/records/AUDITORIA_CONTEXTO.md` | 10, 11, 19, 63, 64, 65, 93, 275, 276, 292 | Auditoría read-only (histórico). |
| `aiw/records/CRONICA.md` | 4, 5, 24, 73, 92, 94, 96, 97 | Crónica (histórico). |
| `aiw/records/AUDITORIA_ESTADO.md` | 1, 27, 59, 60, 70, 75, 76, 77, 149, 151, 160, 165, 166, 167, 179, 194, 197, 214, 529, 605, 614, 615, 623, 662, 663 | Auditoría de estado read-only (histórico). |

`aiw/CONTEXTO.md` contiene rutas nuevas por diseño (es el puntero creado en este
encargo); no es una referencia rota.

Ninguna referencia rota quedó sin resolver ni sin reportar.

---

## 3. Inventario 5a — `.md` en la raíz de `aiw/` tras la mudanza

Todos leídos (no adivinados). Ninguno se movió; insumo para la 2ª ronda del operador.

| Archivo | Qué es (leído) | Clasificación |
| ------- | -------------- | ------------- |
| `aiw/claude.md` | Archivo de reglas `CLAUDE.md` de AIW v2: qué es el kernel, reglas no negociables, dónde vive cada cosa, modelo de trabajo taller/cabina. | **Contexto vivo de cabina** (reglas del agente). Protegido: no se mueve. |
| `aiw/CONSTITUCION.md` | Constitución de AIW v2: invariantes heredadas, piso de severidad del reviewer, anti-auto-hosting, presupuesto de complejidad, topología de seguridad. | **Contexto vivo de cabina** (reglas del agente). Protegido: no se mueve. |
| `aiw/DELEGACION.md` | Rúbrica de ruteo de trabajo (doctrina D-020): las tres ventanas (atendida/semi/desatendida), preguntas de ruteo, escalera de graduación, composición de cola nocturna. | **Contexto vivo de cabina** (doctrina operativa). |
| `aiw/CONTEXTO.md` | Puntero creado en este encargo: indica que el contexto de gobernanza se mudó a `projects/aiw-console/context/aiw/` y lista los 6 archivos con su ruta nueva. | **Contexto vivo** (puntero nuevo). |

Observación: no quedó ningún registro histórico en la raíz de `aiw/`; los
registros históricos viven bajo `aiw/records/`.

---

## 4. Inventario 5b — documentos de raíz de `cantu-studio` vs `docs_index.json`

Solo lectura. NADA en `cantu-studio` fue creado, modificado ni borrado.

Pregunta por archivo: ¿aparece su ruta en el array `docs[]` de
`projects/cantu-studio/.aiw/docs/docs_index.json` (140 entradas)?
`CANTU_STUDIO_CONTEXT.md` **no existe** en la raíz de `cantu-studio`.

| Documento de raíz | ¿En `docs[]`? | Cita (entrada con `path` exacto) |
| ----------------- | ------------- | -------------------------------- |
| `AGENTS.md` | **SÍ** | `"path": "AGENTS.md"`, `"title": "AGENTS Operating Governance"` |
| `CLAUDE.md` | **SÍ** | `"path": "CLAUDE.md"`, `"title": "CLAUDE Legacy Operating Guide"` |
| `README.md` | **SÍ** | `"path": "README.md"`, `"title": "Repository Root README"` (existe además `docs/decisions/README.md`, otra entrada) |
| `README_PHASE1.md` | **NO** | Sin entrada con `path === "README_PHASE1.md"` en `docs[]`. |

Consecuencia (para decidir después, no ahora): mudar `AGENTS.md`, `CLAUDE.md` o
`README.md` de `cantu-studio` pondría **rojo** el validador, porque su ruta está
listada en `docs_index.json` y el validador exige su existencia física en esa
ruta. `README_PHASE1.md` NO está listado, así que sería el único candidato de
raíz que podría mudarse sin romper el validador por esa causa. (Igualmente no se
movió nada: fuera de alcance.)

---

## 5. Paradas

Ninguna. Los 6 archivos existían en origen, los 6 hashes coincidieron, y no se
topó ninguna premisa falsa.

---

## Verificación de invariantes

- ✅ `context/README.md` creado con la advertencia del fork descartado (D-035).
- ✅ Los 6 archivos existen bajo `context/aiw/` con hash idéntico al original.
- ✅ Los 6 archivos ya NO existen en `aiw/`.
- ✅ `aiw/CONTEXTO.md` creado, apunta a la ubicación nueva y lista los 6.
- ✅ Ninguna referencia rota sin resolver ni sin reportar.
- ✅ NINGÚN archivo de `cantu-studio` creado, modificado ni borrado (solo lectura).
- ✅ `CLAUDE.md`/`claude.md`, `AGENTS.md`, `CONSTITUCION.md` intactos en su
  ubicación original (solo se editaron rutas internas donde el encargo lo autoriza).
- ✅ No se ejecutó git en ninguna forma.
