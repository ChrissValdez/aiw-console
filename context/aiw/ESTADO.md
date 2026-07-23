# ESTADO.md — actualizar al cierre de cada sesión

Fase: **MIGRACIÓN COMPLETADA** (O1 cerrado, D-031). La casa está en orden en
ambas máquinas. Lo SIGUIENTE es la **consola maestra** (O4), que es la condición
para trabajar los 3 proyectos en paralelo. Última actualización: 2026-07-22,
sesión larga de MIGRACIÓN + CONSOLA (a mano, NO run de AIW).

## Estructura vigente (VERIFICADA en disco, ambas máquinas)
```
Documents\AIW_Workspace\
├── aiw\                          v2 orquestador. El SISTEMA. main = origin.
├── _reference\                   (solo PC) 3 diagnósticos read-only preservados
└── projects\                     el PORTAFOLIO (ejecutable por el kernel)
    ├── aiw-console\              consola. main = origin. ENCIENDE (005 dentro).
    ├── cantu-studio\             ex JAME_System_Dual. main CONSOLIDADO.
    └── cantu-lessons\            ex JAME_Lessons. main = origin.
```
Ambos workspaces viejos DEMOLIDOS. GitHub Desktop al día en las dos máquinas.
En GitHub: `aiw`, `aiw-console`, `cantu-studio`, `cantu-lessons` (privados) y
`aiw-v1-legacy` (ARCHIVADO, read-only, sin copia local).

## Cerrado esta sesión (todo verificado, nada por reporte)
- Respaldos remotos de `aiw` y `aiw-console`: dejaron de existir en un solo disco.
- Workspace único armado y ambas máquinas alineadas (la laptop por clonación).
- Legacy v1: refugio de ~21k líneas (2 runs completos) a ramas `refuge/*` en
  origin → diagnóstico de identidad → retiro → archivado como `aiw-v1-legacy`.
- Cantu Studio y Lessons: mudados, RENOMBRADOS, docs/pack/rutas actualizadas,
  QA de operador pasado (launcher + lecciones Web y Slide).
- `main` de Cantu CONSOLIDADO (138 commits, fast-forward). Cae un prerequisito
  declarado para conectar AIW a Cantu.
- **Consola de AIW ENCIENDE**: 005 verificado (31 tests verdes) y mergeado
  (`29c9478`), `projects.config.json` corregido tras la mudanza.
- Cascarones limpiados y demolidos; 437 MB de historial obsoleto descartado.
- El repo `aiw` se sincroniza como knowledge del proyecto Claude (D-034).

## SIGUIENTE — Consola maestra (arrancar la próxima sesión por aquí)
Definición de "estable": renderiza los TRES proyectos, leyendo de sus propios
repos, roadmap + docs + status, READ-ONLY. Nada más.
1. **Audit / Phase 0** (read-only): qué hace la consola hoy vs qué necesita la
   maestra + los 3 acoplamientos a Cantu (anchors del validator sobre el fuente,
   endpoint de edición, regex `RUN-JAME-` del history builder). Sale un mapa.
2. **Contrato de normalización**: qué expone un proyecto y dónde. Aquí se
   resuelve de paso el desorden de contextos de AIW.
3. **Los 3 roadmaps al contrato** (AIW markdown→JSON v3; migrar los runs
   `RUN-CANTU-PROJECT-CONSOLE-*` del roadmap de Cantu al de la consola).
4. **La consola los lee** (pantalla multi-proyecto).
Más: context pack de la consola (reglas, no el plan) y el digest para la cabina.

## Deuda anotada (ninguna bloquea)
- Cantu: 3 JSON de estado/gobernanza STALE (`.aiw/guardrails/project_guardrails.json`,
  `docs/human/state/*.json`) — rutas muertas y marcan Lessons como no permitido;
  necesitan refresh por el proceso de estado, no búsqueda-y-reemplazo.
- Cantu: el Context Pack externo (v43) lo actualiza el operador; no está en repo.
- Cantu: rama `jame-parallel-audit-001` sigue viva (idéntica a main). Retirarla
  exige tocar `project-console.js`, que el validador asserta por substrings de
  texto fuente → run propio con Phase 0 contra el validador.
- Cantu: guard fantasma `AIW_MONITORED_CHECKOUT` en `workspaceStorage.js` apunta
  al checkout retirado (decisión del operador: dejarlo; inofensivo-muerto).
- Consola: 2 pulidos menores (banner "optional local state files", diseño
  desplazado). Se atienden en la fase de consola maestra.
- AIW: el roadmap sigue en markdown temporal; por eso AIW aún no se renderiza
  con datos v3 reales en la consola.

## Salud del kernel (NO re-verificada esta sesión — fue disco, no código)
kernel.mjs ~478/500 líneas; 49 tests, último verde 49/49 (D-024).

## Reinicio de conversación
Hito CUMPLIDO (migración completa) y aprobado por el operador. La próxima
conversación arranca limpia sobre la consola. Regla vigente: el operador decide
cuándo cerrar y reiniciar; la cabina no lo propone por su cuenta.
