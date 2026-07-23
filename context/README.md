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

`aiw-console` **también** contiene un fork de la consola de Cantu que fue
descartado por **D-035**. Ese código **NO es la consola viva** — la consola viva
está en `projects/cantu-studio`.

Ninguna sesión debe leer el fork creyendo que es la consola actual, ni citar su
fuente como estado presente. Permanece en el árbol solo hasta su corte formal.

## Estructura y taxonomía (D-038)

```text
context/
  README.md              este archivo
  DECISIONES.md          log del SISTEMA — transversal, append-only
  handoffs/              relevos de sesión — EFÍMEROS, uno por hilo
  aiw/                   el kernel como proyecto
  aiw-console/           la consola como proyecto
  cantu-studio/          Cantu Studio como proyecto
```

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
handoffs/orquestacion.md    hilo meta: topología, metodología, decisiones de sistema
handoffs/aiw.md             hilo del kernel
handoffs/aiw-console.md     hilo de la consola
handoffs/cantu-studio.md    hilo de Cantu Studio
```

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

Cada una contiene lo permanente de ese proyecto: su roadmap, su estado, su
doctrina propia y sus `records/`.

- `aiw/` — `ESTADO.md`, `AIW_CONTEXT.md`, `roadmap_AIW_temp.md`,
  `DELEGACION.md`, `records/`
- `aiw-console/` — `records/` (el audit Phase 0 de O4). Todavía sin roadmap
  propio: O4 vive hoy en el roadmap de AIW y migra aquí en el tramo 1.
- `cantu-studio/` — `CANTU_STUDIO_CONTEXT.md`

## Lo que NO se muda aquí, y por qué

`CLAUDE.md`, `AGENTS.md` y `CONSTITUCION.md` de cualquier repo son las reglas que
el agente lee **del repo donde trabaja**; si se van, el taller pierde sus reglas
al operar ahí. Además, los de `cantu-studio` están listados en su
`.aiw/docs/docs_index.json`, cuyo validador exige su existencia física en esa
ruta: moverlos lo pondría rojo.
