# Prototipo de la consola global

Run `RUN-CONSOLE-PROTOTIPO-CONSOLA-001` · fase `O4.P10` · objetivo `O4` (Consola global).

Primer **consumidor real** de `roadmap_tree_v1`. Lee el `roadmap/roadmap.json` propio
de aiw-console **crudo y directo** y lo renderiza en tres vistas read-only. Sirve para
dos cosas a la vez: dar un resultado visible temprano, y **ejercitar el formato antes de
construir el emisor** (P2). El veredicto sobre el formato vive en
[`../context/aiw-console/records/VEREDICTO-ROADMAP-TREE-V1.md`](../context/aiw-console/records/VEREDICTO-ROADMAP-TREE-V1.md)
— ese documento es lo que aprueba la compuerta, no solo la pantalla.

## Cómo levantarlo (un comando, un puerto)

```bash
node console/serve.mjs
```

Abre `http://127.0.0.1:8790/web/index.html`. Puerto configurable con `CONSOLE_PORT`.
Sin dependencias (solo Node built-ins), sin `npm install`. Patrón análogo al de la
consola local de Cantu (`tools/project-console/serve-project-console.mjs`), recortado:
aquí el servidor **no** corre el proyector, **no** toca `.git`, **no** construye
snapshot y **no escribe nada** en disco.

## Camino de datos

```
roadmap/roadmap.json  ──(GET /data/roadmap.json, leído crudo en cada request)──▶  web/assets/console.js  ──▶  pantalla
```

- Lee `roadmap_tree_v1` **directo del archivo**. NO usa el proyector, NO usa `.project/`,
  NO usa snapshot — ésos son del emisor (P2) y del shell (P3). Cero datos maqueta: si el
  archivo cambia, la pantalla cambia.
- No depende de que exista Cantu Studio ni ningún otro repo. Renderiza aiw-console por
  sí solo, un solo proyecto.

## Las tres vistas (todas read-only)

1. **Roadmap** — árbol `objetivo → fase → run`. El status de objetivo y de fase se
   **deriva al leer** los `status` de los runs (función del CONTRATO §12); **no** se
   almacena en el archivo ni se inventa un token.
2. **Detalle de run** — superficie compartida (drawer) abierta desde cualquier run:
   `title`, `summary`, `full_description`, `status`, `queue_order`, `depends_on`
   (navegable), `closeout_result`, y `progress` cuando existe.
3. **Cola** — orden global por `queue_order` (1..N), atravesando todos los objetivos y
   fases.

## Identidad-neutral

Ningún nombre de proyecto (`JAME` / `CANTU` / ningún otro) va **horneado** en el código
ni en el CSS. Todo lo identitario que aparezca en pantalla —el título, los `run_id`—
viene del **archivo de datos**, no del render. El lenguaje visual (tokens de color,
tipografía, tabs, drawer, tarjetas) se toma **como referencia** de la consola local de
Cantu; el código de render es **nuevo**, escrito aquí (estrategia b): no se migra ni se
reusa el render de Cantu.

## Estructura de carpetas — FIJADA, la hereda el shell (P3)

Esta estructura es el entregable estructural del prototipo: es la que **heredará el
shell multi-proyecto** (`RUN-CONSOLE-SHELL-MULTIPROYECTO-001`). Es un **espejo de la
estructura probada de Cantu**, en **ruta nueva y limpia** de aiw-console — nunca la del
fork descartado por D-035 (`docs/project-console/`).

```
console/
├── README.md                     Esta nota: estructura fijada + porqués + cómo levantarlo.
├── serve.mjs                     Servidor local read-only (un comando, un puerto). Node
│                                 built-ins, GET/HEAD únicamente, cero escritura.
└── web/                          Todo lo que sirve al navegador (assets estáticos).
    ├── index.html                Cascarón: cabecera, tabs, contenedores, drawer. Sin
    │                             datos ni identidad horneada.
    └── assets/
        ├── console.css           Estilos nuevos en el lenguaje visual de Cantu.
        └── console.js            Renderer: lee roadmap_tree_v1, deriva status, pinta las
                                  tres vistas. Identidad-neutral, read-only.
```

### Por qué esta forma (y no otra)

- **Ruta nueva `console/`, no `docs/project-console/`.** El fork que vive en
  `docs/project-console/` quedó **descartado como base de UI por D-035**; partir de él
  está fuera de alcance. `console/` nace limpia y nombra lo que es —la consola— sin
  arrastrar la copia divergente y anterior al retiro del roadmap legacy que audita
  `AUDIT-CONSOLE-O4-PHASE0.md` (Bloque A).
- **`web/` separado de `serve.mjs`.** Espeja la separación probada de Cantu entre lo que
  el navegador consume (`docs/project-console/`) y la herramienta que lo sirve
  (`tools/project-console/`). El shell heredará esa frontera: los assets no saben del
  servidor y el servidor no hornea lógica de render.
- **Base de ruta como una sola constante.** `console.js` tiene el literal del dato
  (`/data/roadmap.json`) en **un** lugar, y `serve.mjs` deriva todas sus rutas de la
  ubicación del propio archivo. Es la disciplina de "ruta base como constante" del
  CONTRATO §1.a: mover la carpeta cuesta una línea, no cirugía.
- **El servidor no escribe.** Solo `GET`/`HEAD`; cualquier otro método responde `405`.
  Reforzar el read-only en el transporte, no solo en la intención, es lo que hace segura
  la herencia: el shell puede crecer sobre esto sin heredar una ruta de escritura.

## Fuera de alcance (lo aclara el encargo)

Multiproyecto, menú lateral y pantalla multi-proyecto (son el shell, P3); el proyector,
`.project/` y cualquier snapshot (emisor P2 y shell P3); leer otros repos como datos;
edición, endpoints de escritura, dry-run/confirm; migrar el render de Cantu; cambios a
O0, al roadmap, a `CONTRATO.md` o a cualquier record.
