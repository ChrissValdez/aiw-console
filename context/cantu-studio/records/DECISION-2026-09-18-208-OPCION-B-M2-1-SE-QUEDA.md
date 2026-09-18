# #208 · El operador eligió B: M2.1 se queda, y el título gana un lápiz

**Fecha:** 2026-09-18 · **Run:** `#208` `RUN-CANTU-EDITOR-TITLE-SURFACE-AND-NEW-LESSON-GUARD-001`
«Give the lesson title a surface, and guard the first write» · **Estado:** `active`, entrega 2 pendiente.

---

## El veredicto del operador, verbatim

> B

Preguntado entre cuatro opciones: **A** revocar M2.1 y remontar `LessonContextBar`; **B** mantener
M2.1 y dar al título un lápiz propio en la barra de arriba que llame al renombrado que ya existe;
**C** no dar superficie; **D** dejar el lápiz de Explorar y solo hacerlo visible.

Escrito a `full_description` del `#208` el mismo día (md5 del canónico `d5564601…` → `4d058515…`,
único campo tocado, verificado campo a campo contra el respaldo).

---

## Por qué había que preguntarle, y no decidirlo la cabina

El taller de `#208` paró en la entrega 2 obedeciendo la orden del propio run, y la razón la dio el
historial:

| commit | fecha | autor | qué hizo |
|---|---|---|---|
| `5a3026fd` | 2026-05-20 | Christopher Valdez Cantu | quitó `LessonContextBar` y montó `LessonBreadcrumbBar` |
| `aea653ef` | 2026-06-11 | Christopher Valdez Cantu | quitó también el breadcrumb; el rastro pasó a `TopBar` |

El mensaje del commit decisivo:

    feat(author-lite): M2.1 separar archivo y metadata (NewLessonModal + breadcrumb read-only)

y su diff, verificado por la cabina contra disco el 2026-09-18:

    -import LessonContextBar from './components/layout/LessonContextBar';
    +import LessonBreadcrumbBar from './components/layout/LessonBreadcrumbBar';
    -      <LessonContextBar  register errors structure setValue ...
    +      <LessonBreadcrumbBar  lesson isDirty

En el mismo commit nacieron `NewLessonModal.jsx` y `slugify.js`. **La retirada era el contenido del
cambio, no un descuido.** La premisa del ticket de la cabina —«una pieza que nadie cableó»— era
falsa, y por eso la pregunta correcta no era «¿por qué no está montado?» sino «¿revocas M2.1?».

---

## La consecuencia que queda declarada, para que nadie la reabra

Con **B**, el renombrado sigue pasando por `handleRenameDraft`, que **comprueba el destino y se
niega si existe**. Por tanto **la parada 409 del `#207` es un seguro del servidor, no un flujo de
pantalla**: el cliente rechaza el choque antes de que el servidor pueda pararlo, y ningún ojo humano
la verá nunca desde el editor. Eso es diseño, no hueco. El cierre del `#207` ya declaró su QA de
pantalla no ejecutada; esta decisión dice por qué se queda así **de forma permanente**, y la QA del
`#208` se juzga sobre que renombrar sea alcanzable y honesto, no sobre llegar al 409.

---

## Tres errores de medición de este turno, dos míos

1. **El separador del ticket era falso.** Escribí «curso › tema › título»; `TopBar.jsx:372` y `:374`
   pintan `/`. Lo cazó el taller.
2. **Mi primera sonda del historial buscó en la ruta de hoy.** `tools/studio/...` no existía en mayo
   —el editor vivía en `tools/author-lite/...`—, así que mi `git show … -- <ruta>` devolvió **vacío**
   y estuve a punto de publicar que el taller se había inventado el commit. Con la ruta de la época,
   el hunk aparece entero. *Una sonda con el ámbito equivocado miente igual que una que no mide.*
3. **Un `grep -l` me dio `RightPanel.jsx` como montador de `LessonBreadcrumbBar`.** Fui a la línea:
   `RightPanel.jsx:76` es **un comentario**. El taller tenía razón —los dos componentes son código
   muerto— y mi sonda no distinguía código de comentario. Es el corolario que ya estaba escrito en
   las reglas, cometido otra vez.

---

## Lo que el taller sí entregó, y quedó commiteado

Entregas 1, 3, 4 y 5. La **regla del nacimiento**: una escritura declarada `action=create` solo puede
crear, la exclusión la hace `flag: 'wx'` (atómica, no un `fileExists` previo), el servidor devuelve
`relativePath` y el cliente lo **adopta**, de modo que desde la segunda escritura rige la guarda del
`#207`. Guarda nueva `newLessonBirthNeverOverwrites.test.mjs` (14 pruebas) y tres sabotajes vistos en
rojo con su mensaje. Tres guardas ajenas enmendadas, entre ellas el censo del `#207`, que ahora **se
deriva** en vez de escribirse a mano.

Un hallazgo del taller que corrigió su propia primera versión: aplicar la regla a *toda* escritura
sin origen habría parado en falso al **restaurar** un borrador, contra el fichero propio del
operador. Por eso `create` es una acción y no una bandera sobre `save`.

---

## Deuda nombrada y NO abierta aquí

En el servidor, compilar sigue sobrescribiendo cuando la petición no declara origen, y eso se alcanza
**tras restaurar** un borrador (`EditorPage.jsx:577` deja la ruta activa en `null`). Es el hermano
del hueco que este run cerró. Cerrarlo pide que la ranura local recuerde su ruta de origen: otra
pieza, otro run. Pendiente de posición en la cola.
