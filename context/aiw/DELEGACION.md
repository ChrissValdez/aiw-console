# DELEGACION.md — Rúbrica de ruteo de trabajo (v1)
Doctrina D-020. Versión inicial deliberadamente laxa: se refina con la
práctica (§5). Cada error de ruteo es dato, no fracaso.

## 1. Las tres ventanas
ATENDIDA    continua      tú + Claude Design / Claude Code interactivo
SEMI        30min–2h      1–3 objetivos en cola; ntfy avisa; revisas al volver
DESATENDIDA noche         cola completa; ritual matinal de diffs

## 2. Las cuatro preguntas de ruteo (en orden; la primera que dispare, decide)
P1 ¿Requiere juicio que solo yo tengo (gusto, producto, UX copy,
   contexto no escrito)?  SÍ -> ATENDIDA, sin excepción.
P2 ¿Puedo escribir "done" verificable sin mí (criterios + tests o
   inspección objetiva)?  NO -> ATENDIDA, o reescribe el objetivo
   hasta que sea sí.
P3 ¿Este patrón ya funcionó antes en este proyecto?  NO -> SEMI
   (run de graduación, revisado el mismo día). Lo nuevo nunca debuta
   de noche.
P4 ¿El costo del fallo es solo una rama descartada (nada irreversible,
   nada security-crítico)?  NO -> ATENDIDA o SEMI.
P1 no + P2 sí + P3 sí + P4 sí -> DESATENDIDA.

## 3. Regla de tamaño
Objetivo desatendido ≤ ~1 hora humano-equivalente; más grande se parte.
Ventana semi: caben ~(ventana / 35 min) objetivos; 2 h ≈ 3 máx.

## 4. La escalera de graduación
ATENDIDA (estableces patrón) -> SEMI (1ª instancia delegada) ->
DESATENDIDA (el lote) -> ATENDIDA (feedback matinal + pulido).
Degradación: HUMAN_REVIEW por ambigüedad -> la clase sube un escalón;
3+ aprobados aburridos en semi -> baja a desatendida.

## 5. Mapa inicial
ATENDIDA: prototipado y dirección visual · roadmap inicial · arquitectura
· UX copy · pulido final · exploración · security-crítico · todo lo que
falle P2.
SEMI: primera instancia de patrón nuevo · bugs que quieres hoy ·
plumbing incierto · cadenas dependientes (run->review->merge->siguiente).
DESATENDIDA: lotes de patrón probado · alta fidelidad contra diseño
congelado · tests nuevos · docs drift · migraciones mecánicas ·
lint/typing · refactors con suite verde · boilerplate.

## 6. Composición de cola nocturna
Objetivos mutuamente independientes (cada run parte de la rama base).
Cadenas dependientes -> semi o noches sucesivas. Lo más importante
primero. No llenar una noche con una sola clase nueva.
