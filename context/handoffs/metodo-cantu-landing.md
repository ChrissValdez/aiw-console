# HANDOFF — hilo `metodo-cantu-landing` (LANDING)

> **Segundo relevo.** Lo escribió la cabina LANDING en su primera sesión, el **2026-11-06 hacia las 05:15**, en la PC
> (`DESKTOP-525K0IS`). Sustituye al primero (el de la cabina de LECCIONES, 4-nov). Lo de antes está en el historial de
> git de este fichero.
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el disco al abrir. Gana el disco.** La cabina abre
> leyendo enteros `context/cabinas/landing/CLAUDE.md` (v0 con los puntos 8 a 10) y `context/cabinas/REGLAS-DE-CABINA.md`.

## Dónde estamos

- **En espera de nuevo feedback del dueño.** Sus palabras (6-nov): *«quedas en espera de neuvo feedback para generar
  nuevos prototipos»*. **No se genera ningún prototipo nuevo sin eso.**
- **El repo `metodo-cantu-landing`:** `main` = `origin/main`. Medir al abrir. Los últimos commits son la cancelación de E
  y este cierre. **El dueño también commitea él mismo** (`c0eb048`, «prototipos draft», 5-nov 12:37): mirar el
  `git log` antes de suponer qué falta publicar.
- **Las sesiones de prototipos están archivadas** (`proto-a`, `proto-b`, `proto-d` y `proto-e`), con el Remote Control
  apagado. Si hace falta una, se lanza otra nueva con su encargo.

## Lo que hay en el repo

| ruta | qué es |
|---|---|
| `secciones/`, `marco/`, `vista.html` | **su página original**, tal cual está en Moodle |
| `referencias/index.html` | seis referencias de la cabina: **no le gustó ninguna** |
| `referencias/oryzo.md`, `dala.md` | **las dos que sí le encantaron** (oryzo.ai y dala.craftedbygc.com, demos de estudios), medidas |
| `prototipos/index.html` | la entrada a los prototipos, a pantalla completa |
| `prototipos/CONTENIDO.md` | los textos, datos y mensajes de WhatsApp comunes a los prototipos, con el botón del express |
| `prototipos/A-lenguaje/` | el lenguaje de Oryzo y Dala en Moodle, sin 3D (61 KB) |
| `prototipos/B-3d/` | 3D con Three.js, página aparte fuera de Moodle (0,28 MB) |
| `prototipos/D-pulida/` | **la D académica que aprobó** («Sí, así»), en Moodle |
| `prototipos/E-recomendada/` | **borrador cancelado** (D + lo rescatado, con Fable); lo commiteó él en `c0eb048` |
| `prototipos/analisis-A-B.md` | A y B como landing: claridad y conversión |
| `prototipos/comparacion-cuatro.md` | la original, A, B y D: **la cabina recomienda la D como base** y qué rescatar de cada una |
| `prototipos/diagnostico-express.md` | la propuesta del diagnóstico express gratis |
| `encargos/PROTO-*.md` | los encargos de los talleres (`PROTO-E`, marcado como cancelado) |
| `veredictos/` | **sus palabras, tal cual**, una por mensaje; incluye lo que les escribió directo a las sesiones |
| `variantes/`, `propuesta-08/` | las rondas del 4-nov (NUBE-07A–D y NUBE-08), que fallaron |

## Lo que se sabe de su gusto (de `veredictos/`)

- **Su original le gusta,** pero *«siento que tiene mucho texto»*.
- **De la D le gustó el concepto:**
  - la portada como pregunta de examen;
  - poco texto;
  - «Más horas de estudio no sirven si estudias a ciegas»;
  - la ruta en cuatro pasos con apoyos visuales.
- **Tono académico, no «retro»:** aprobó la D académica (libro de texto y hoja de examen, serif de libro, cursiva al
  margen). Se le leyeron «videojuego» las sombras duras, la letra monoespaciada en mayúsculas, las tramas de puntos, los
  cantos 3D y los boletos troquelados.
- **Le encantaron Oryzo y Dala:** *«la animacion, la paleta de colores, todo»*. A y B *«se ven muy bien especialmente
  B»*.
- **Le cuesta escoger:** *«todas me gustaron de alguna manera»*.
- **No quiere:**
  - landings genéricas de escuela ni «modernas» de plantilla;
  - opciones por sección: una sola versión completa a pantalla completa;
  - comparadores que encojan.
- **El prototipo E** (la recomendación de la cabina hecha página, con Fable): *«no me estaba bustando el resultado»*. No
  dijo qué no le gustó: **preguntarlo con su próximo feedback.**

## Reglas que salieron en esta sesión (ya en el `CLAUDE.md`, puntos 8 a 10)

- **Todo lo que él revisa va al repo, con commit y push antes de avisarle. Nunca en `_scratch`.**
- **Nunca Fable:** *«consumio muchos tokens inecesariamente, no lo volvamos a hacer»*. Los talleres van con Opus y esfuerzo
  alto. También está en la memoria (`no-usar-fable`).
- **No se generan prototipos sin su nuevo feedback.**
- **Él a veces les escribe directo a las sesiones anidadas:** leer su transcripción y llevar sus palabras a
  `veredictos/`.

## Decisiones vigentes

- **El diagnóstico express gratis:** aprobado como idea; sus detalles están por definir.
  - **Por ahora, solo el botón** «Haz tu diagnóstico express gratis», en la portada y al final de la ruta, en A, B y D.
  - **DIAG** está definido una sola vez en cada prototipo (`armar.mjs` en A y D; `MC.DIAG` en `landing.html` de B) y
    lleva a WhatsApp con M6 mientras no exista el examen.
  - **El examen express no lo hace este hilo:** las preguntas saldrían del banco de `cantu-quizzes-latex`.
- **El dorado** es el color de la acción principal (hoy WhatsApp; mañana, el examen).
- **La recomendación de la cabina,** que él no ha confirmado (`comparacion-cuatro.md`):
  - la D como base, con lo rescatado de la original, de A y de B;
  - la B como segunda etapa, como página de campaña.

## Lo que falta y solo él tiene

- Quién da las clases y dónde (la zona del presencial).
- Dos o tres testimonios.
- Sus paquetes: nombre y qué incluye.
- Una fecha (el próximo grupo).
- Una foto real de sus materiales.
- Definir el diagnóstico express.

**Sin esto, ninguna versión convierte bien** (`analisis-A-B.md`). Se le ha pedido varias veces; no lo ha mandado.

## Para medir y capturar

- **Chrome:** `C:\Program Files\Google\Chrome\Application\chrome.exe`, con el `puppeteer-core` de
  `projects/cantu-lessons/tools/render/node_modules`, por `createRequire` y solo leyendo de ahí.
- **Para el 3D:** `--use-angle=swiftshader --enable-unsafe-swiftshader`.
- **La PC tiene apagado «Mostrar animaciones en Windows»:** Chrome lo trata como `prefers-reduced-motion` y las páginas
  se ven quietas. Al medir, emular `no-preference`; a él, decirle cómo verlo.
- **Mirar la hora con `date` antes de escribirla.** Dos commits de esta sesión llevan una hora equivocada: «01:52» fue
  ~01:30, y «02:15» fue ~08:05. Se corrigió en el relevo; los mensajes de commit quedan así.

## Abierto, para después

- **`_scratch/landing/`:** quedan `comparar/`, `ramas/` y `A-pulida-*` (21 MB) de la cabina de LECCIONES. Parecen copias de
  `variantes/`. No se borran sin su palabra.
- **SSH a su servidor de Moodle** desde la app, para trabajar código. Él dijo *«depsues trabajo en eso»*.
- **El `h1` oculto del tema** («Método Cantú»): quitarlo en los ajustes, no esconderlo.
