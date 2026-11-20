# HANDOFF — hilo `metodo-cantu-dashboard` (DASHBOARD)

> **Primer relevo.** Lo escribió la cabina DASHBOARD el **2026-11-19 a las 18:56** (`date`), en la laptop
> (`LAPTOP-PF6SOUAS`, cuenta suplementaria), al abrir el hilo. El contrato es `context/cabinas/dashboard/CLAUDE.md`.
>
> - **DASHBOARD nunca toca lo de LECCIONES**, y nunca trabaja a la vez que LANDING en el mismo repo.
> - **Todo lo de aquí está medido y lleva fecha. Contrástalo con el disco al abrir: gana el disco.**

## Dónde estamos

- **Hilo recién abierto.** No hay repo todavía: `projects/metodo-cantu-dashboard` **no existe** (medido 18:55). Es la
  propuesta por omisión del operador; se crea con su «adelante».
- **Escrito en `aiw-console`:** este relevo y el contrato `context/cabinas/dashboard/CLAUDE.md`.
- **Al abrir (18:52–18:55):**
  - `aiw-console`: `pull` limpio, de `e08aa2a` a `ed00507` (tres commits de LECCIONES, `ramas-integradas.txt`).
  - `metodo-cantu-landing`: el primer `pull` falló (`fatal: fetch-pack: invalid index-pack output`); el reintento con
    `fetch` + `merge --ff-only` lo llevó de `a38a4d4` a `aa0fe02` (64 commits). Árbol limpio. Solo lectura.
  - Sin `.git/index.lock` en los dos.

## ⏳ En espera del operador

Las preguntas mínimas para arrancar (en el chat del 19-nov, 18:56):
1. **Qué ve el alumno al entrar**, y qué es lo primero que debe poder hacer.
2. **Qué datos hay hoy en Moodle:** cursos (¿uno por materia?), avance, calificaciones, diagnósticos (¿cuestionarios de
   Moodle?), simuladores.
3. **Referencias o capturas:** de su Moodle actual (sin `sesskey` ni datos reales en el repo) o de tableros que le gusten.
4. Su «adelante» a la tabla de primeros pasos.

## Lo que sigue, en orden (propuesto, sin aprobar)

1. Sus respuestas a `veredictos/`, tal cual.
2. Crear `projects/metodo-cantu-dashboard` (git local) con `index.html` de entrada, `datos/` de ejemplo ficticios y el
   prototipo.
3. Prototipo navegable v1, en HTML estático con datos de ejemplo, respetando las reglas de Moodle (sin corchetes,
   `!important`, sin `<svg>` suelto, JS solo como mejora) y Español / Matemáticas separados.
4. Capturas a pantalla completa (escritorio y celular), commit y push, y aviso.
5. Después, y como paso aparte: dónde se monta en Moodle y de dónde salen los datos reales.

## Hallazgos sobre otros hilos (se nombran, no se corrigen)

- **El relevo de LANDING está atrasado respecto a su repo:** dice `a38a4d4` y «vuelve a la PC» (19-nov, 02:58), y
  `origin/main` de `metodo-cantu-landing` está en `aa0fe02`, 64 commits después (rondas hasta AH/AI). Es de LANDING.
