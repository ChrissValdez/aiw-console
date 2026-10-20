# context/ — Contexto de gobernanza de la cabina

Esta carpeta es el **único canal de contexto** de la cabina (el Project de
Claude). Vive en `aiw-console` porque es el único repo sincronizable como
knowledge del Project (D-037).

Todo lo que la cabina lee entra por aquí, vía **editar → commit → push → sync**.
Prohibido subir archivos sueltos al knowledge del Project: crean una segunda
copia que deriva contra el repo.

## Estos archivos son CANÓNICOS, no copias

Fueron **mudados**, no copiados. No existen en otro repo. En `aiw` queda un
puntero (`aiw/CONTEXTO.md`) hacia aquí.

## ⚠️ Este repo contiene un FORK DESCARTADO de la consola

`aiw-console` contiene varios árboles de consola, y solo uno es el que este
repo arranca:

- `project-console/` — la consola multiproyecto: la que levanta
  `start-console.ps1` (`node project-console/serve.mjs`) y la única con registro
  de proyectos (`project-console/projects.json`).
- `docs/project-console/` — el **fork de la consola de Cantu descartado por
  D-035**. Ese código **NO es la consola viva**.
- `console/` — el prototipo de la consola global, retirado por D-048; queda como
  historia.

La consola local de Cantu sigue en su repo (`projects/cantu-studio`) hasta el
corte (`RUN-CONSOLE-CORTE-RETIRO-LOCAL-001`), que es también cuando D-035 manda
borrar el fork.

Ninguna sesión debe leer el fork creyendo que es la consola actual, ni citar su
fuente como estado presente. Permanece en el árbol solo hasta su corte formal.

## Estructura y taxonomía (D-038)

```text
context/
  README.md              este archivo
  DECISIONES.md          log del SISTEMA — transversal, append-only
  *.md                   otros documentos transversales: no son de un solo proyecto
  handoffs/              relevos de sesión — EFÍMEROS, uno por hilo
  <proyecto>/            la carpeta de un proyecto: su contexto permanente
```

Qué proyectos tienen carpeta aquí, y qué documentos hay en la raíz, lo dice la
propia carpeta: este árbol da la forma, no la lista.

**La regla que ordena todo:** contexto de proyecto es **permanente** y va en la
carpeta del proyecto; relevo de sesión es **efímero** y va en `handoffs/`. Ante
la duda: ¿esto seguirá siendo cierto dentro de un mes? Si sí, es contexto. Si
no, es relevo.

### `DECISIONES.md` es del SISTEMA, no de AIW

Vive en la raíz de `context/` a propósito. Su contenido reciente es transversal
—topología del workspace, el fork de la consola, la carpeta de contrato de
Cantu, esta misma mudanza— y casi nada es del kernel. Estaba en `aiw/` por
herencia, y eso confundía porque **`aiw` nombra dos cosas**: el SISTEMA (nivel
raíz del workspace, D-031) y el kernel como proyecto. Aquí significa siempre lo
segundo.

### `handoffs/` — uno por hilo, siempre sobrescrito

```text
handoffs/<hilo>.md    el relevo de un hilo; el fichero lleva el nombre del hilo
```

Qué hilos tienen relevo lo dice la carpeta `handoffs/`, no este README.

Un archivo por conversación en curso. **Se sobrescribe, nunca se acumula**: no
hay sufijos de tramo ni de fecha, así que nunca hay ambigüedad sobre cuál es el
vigente. Git conserva las versiones anteriores si hicieran falta.

Al abrir un hilo, se lee su handoff. Al cerrarlo, se reescribe. Un handoff que
describe un estado ya superado es ruido, y peor: es estado que se pudre en un
repo canónico.

Un handoff **no es un record**. Un record (un audit, un diagnóstico) mide un
estado real con evidencia citada y sigue valiendo como prueba; un handoff es
empaquetado de conveniencia para cruzar una frontera de sesión y muere al ser
leído.

### Las carpetas de proyecto

Cada una contiene lo permanente que ese proyecto tenga: su estado, su doctrina
propia, sus `records/`. El roadmap de un proyecto no vive aquí: es el
canónico de su propio repo.

- `aiw/` — `ESTADO.md`, `AIW_CONTEXT.md`, `roadmap_AIW_temp.md` (RETIRADO: lo
  dice su cabecera; el canónico es `aiw/roadmap/roadmap.json`),
  `DELEGACION.md`, `records/`
- `aiw-console/` — `records/` (el audit Phase 0 de O4). Su roadmap no vive en
  esta carpeta: es el canónico del repo, `roadmap/roadmap.json`.
- `cantu-studio/` — `CANTU_STUDIO_CONTEXT.md`

## Lo que NO se muda aquí, y por qué

`CLAUDE.md`, `AGENTS.md` y `CONSTITUCION.md` de cualquier repo son las reglas que
el agente lee **del repo donde trabaja**; si se van, el taller pierde sus reglas
al operar ahí. Además, los de `cantu-studio` están listados en su
`.aiw/docs/docs_index.json`, cuyo validador exige su existencia física en esa
ruta: moverlos lo pondría rojo.
