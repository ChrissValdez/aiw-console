# HANDOFF — hilo `cantu-lessons` (LECCIONES)

> **Primer relevo de este hilo.** Escrito por la cabina al cerrar la sesión del **2026-09-14/25**,
> antes de que el operador se mude de equipo.
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el disco al abrir. Gana el disco.**

---

## ⚠ LO PRIMERO: NO RECUERDES NADA, LEE EL ÍNDICE

Este hilo acumuló cinco rondas de variantes y ~25 reglas en once días, y **lo que más costó fue
perder cosas aprobadas**. Hay un fichero que es el índice de todo:

    projects/cantu-lessons/docs/CATALOGO-POR-CASILLA.md

Lleva **todas las rutas**, la tabla de estado por casilla, y una sección **«Lo que espera al
operador»** con las QA abiertas y las decisiones sin tomar. **Se lee antes que nada** y se
mantiene: el operador no reconstruye pendientes de memoria (regla 25).

---

## LA CABINA PUEDE MÁS DE LO QUE EL RELEVO VIEJO DE OTROS HILOS DICE

Medido en toda esta sesión: `device_bash` corre, `node` y `git` responden, se lee y escribe el
workspace, se commitea, se borra, y **se leen y ESCRIBEN `.docx` con `python-docx`**, que es como
se ejecutó el corte del temario.

- **El borrado caduca al reconectar el MCP.** Pasó dos veces: `rm` empieza a fallar con
  `Operation not permitted`. Se vuelve a pedir el permiso y sigue.
- **Git deja `tmp_obj_*` en `.git/objects` cuando el borrado está caído.** Se barren y se declara.
- **La cabina NO ve interfaces.** Todo juicio visual es del operador. Lo que sí hace es medir el
  HTML compilado y el SVG.

---

## EL ESQUELETO, QUE ES LO QUE CIERRA EL DISEÑO (regla 24)

    Apertura → Explicación del tema → Ejemplo guiado → Lo que te llevas → Una pregunta

**«Casilla»** es una ranura del esqueleto; **«sección»** es un `header` nivel 1. Una casilla puede
llevar varias secciones. **«Explicación del tema» es la única que varía de verdad** — las otras
cuatro se cierran una vez y se reutilizan.

**Tres son condicionales, con la condición MEDIDA sobre el canónico de Aritmética:**

| casilla | condición | cuántas la cumplen |
|---|---|---|
| Ejemplo guiado | se omite si la lección clasifica y nombra en vez de operar | **2 de 25** |
| Lo que te llevas | entra si hay algo que REUNIR | candidatas a omitirlo: L06 y L09 |
| Una pregunta | entra si el quiz está a **dos o más** lecciones | **9 de 25** |

---

## ESTADO, medido el 2026-09-25

### Los cinco repos: CERO commits sin publicar

El `push` del 21 subió todo. La mudanza no arrastra deuda. *(Quedan 2 commits de hoy por subir.)*

### El temario — CERRADO

- **Aritmética: 25 lecciones y 8 quizzes.** El corte de L01 se ejecutó el 19 y el operador lo
  aprobó el 20. Guarda de coherencia en **25/0 · 25/0**.
- **El `.docx` MANDA** (decisión del operador). El JSON se regenera de él con
  `temario/extraer_docx.py`, nunca al revés.
- Las otras cuatro áreas tienen canónico, **pero su guarda es una TAUTOLOGÍA**: en los ficheros
  derivados del `.md` los dos lados que compara salen del mismo dato. **Cinco verdes son uno y
  cuatro «no aplica».** Está escrito en la regla 23.

### La lección viva — `operar_con_signos`, 9 bloques, en el esqueleto

Casillas 1, 3 y 5 puestas; la 4 retirada por decisión del operador; **la 2 es lo que falta**.

### Pendiente de QA — y es lo primero que hay que retomar

    projects/cantu-lessons/drafts/web/_pendiente-qa/casilla-2-operar-con-signos/

Cinco versiones de «Explicación del tema» con su hoja de contactos y su packet. **Su LEEME trae
las dos paradas** que esperan decisión: la colisión V12/V13 sobre «Regla matemática», y que la V5
llegó a que las dos mitades de la lección son la misma idea.

### Bloqueado por V13, y NO se itera

Las casillas de cierre **C1 y C2** se rediseñaron cuatro veces y el operador las rechazó *«sin
poder evaluarlas»*: son réplicas a mano de la Tarjeta con riel lateral. **Una réplica se juzga
contra su original y pierde siempre.** Esperan a que Cantu Studio abra el interior de la Tarjeta.

### El cruce con `cantu-studio`

| run allí | qué es | estado el 2026-09-20 |
|---|---|---|
| `#214` | construir el bloque de procedimiento | planned |
| `#215` | ANALYSIS STOP — las cinco peticiones de componente | **planned** |

**El componente «Pregunta» está pedido y en cola.** Las peticiones están en
`docs/PETICION-DE-COMPONENTES.md` y `docs/PARA-CANTU-STUDIO-2026-09-19.md`.

**Petición nueva sin escribir todavía:** «Recta numérica con movimientos» — **37 lecciones de 800**
la necesitarían, y `visual` no sirve porque su validador exige `font-size` numérico y `fill`
literal, y **no admite `class`**: un dibujo ahí no puede seguir la paleta ni la escala.

---

## LAS CINCO LECCIONES QUE MÁS CARO COSTARON

1. **Una sonda que no puede ver lo que busca produce un VERDE.** Pasó cinco veces: un `grep` que
   no distingue código de comentario; un contador de filas que no veía las separadas por
   `\\[4pt]` y perdió el 17 %; un quiz fantasma que la guarda no podía ver; y la guarda de
   coherencia que compara un dato consigo mismo.
2. **Un control negativo prueba lo que MUTA, no lo que la guarda promete** (regla 23). Si se muta
   el artefacto derivado, no se ha probado nada sobre la fuente.
3. **No rediseñes lo que el motor ya tiene** (V13). Si su superficie de autor no llega, se pide
   la superficie.
4. **Un SVG con `viewBox` ESCALA su texto.** El gráfico de flechas declara 21/13/11 y pinta
   **30,1 / 18,7 / 15,8** — sus fórmulas salen más grandes que un título de sección. Y
   `getComputedStyle` devuelve la unidad DECLARADA en SVG, así que el banco de render no lo veía.
5. **Lo aprobado no se queda en `_scratch`.** `_scratch` y `_backups` viven fuera de todos los
   repos y **no viajan con `git push`**. Cuatro rondas se perdieron así.

---

## QUÉ HACER AL ABRIR

1. Leer `docs/CATALOGO-POR-CASILLA.md` entero.
2. Leer `docs/DISENO-DE-LECCIONES.md` — 25 reglas y 16 visuales, todas salidas de un fallo.
3. Contrastar contra disco: el canónico del temario, el estado de los cinco repos, y el roadmap
   de `cantu-studio` para ver si `#215` se movió.
4. Retomar por la **QA de las cinco versiones de la casilla 2**. Cerrarla cierra la lección.
