# #209 · Pass de pantalla, y la parada vista con sus propias palabras

**Fecha:** 2026-09-19 · **Run:** `#209` `RUN-CANTU-EDITOR-RESTORED-DRAFT-REMEMBERS-ITS-SOURCE-001`
«A restored draft remembers where it came from» · **Cerrado** `active → completed`.

---

## El veredicto del operador, verbatim

> pass todo

Y, lo que vale más que el pass, **el texto exacto de la parada que vio en pantalla**, pegado por él:

> No se escribió nada. La lección abierta ("Las potencias", en qa209/pruebas/las_fracciones_v2.web.draft.json)
> produce por su título la ruta qa209/pruebas/las_potencias.web.draft.json, que ya pertenece a otra
> lección con ese mismo título. Escribir ahí la habría destruido. Cambia el título de una de las dos,
> o renombra el archivo, y vuelve a intentarlo.

**Ese mensaje es el del `#207`**, embarcado el 2026-09-18 y cerrado entonces declarando que **ningún ojo
humano lo había visto**. Lo nombra todo: de dónde viene, a dónde habría ido, qué habría pasado, y qué
hacer. Se ha visto porque el `#209` le devolvió al borrador recuperado la memoria de su fichero: sin
origen declarado, esa parada no dispara.

Los cinco pasos que ejecutó: el camino normal no se rompe ni se vuelve ruidoso; la parada salta sobre
el fichero desalineado; la víctima sigue entera con su `SOY LA VICTIMA`; renombrar con un nombre libre
**sí** funciona, así que la parada no es permanente; y los dos carriles no se mezclan.

---

## Lo que este run enseñó, y no es el arreglo

**El arreglo no era otra parada: era memoria.** La del `#207` ya existía y bastaba en cuanto el origen
viajara. Lo que faltaba era que la ranura local guardara la ruta junto al borrador. Cuando la solución
parece pedir una comprobación nueva, conviene preguntarse si lo que falta es un dato y no un guardia.

**La ronda 1 dejó la hoja de QA inejecutable**, y el motivo es el mismo que ya nos mordió dos veces:
mandaba «cambia el campo **Lección** de la barra», y ese campo no se monta desde M2.1. El taller lo
corrigió midiendo los doce caminos desde los componentes que sí se montan, y encontró que **el estado
peligroso se alcanza por uno solo**: abrir desde Explorar un fichero que ya venía desalineado. El
editor no lo fabrica, lo hereda.

**Y retiró un aviso propio que era ruido:** el «camino C» —teclear la metadata sobre un lienzo en
blanco— lo había medido montando estado a mano en un banco. Eso es un camino de código, no de pantalla.
Lo dijo con esas palabras.

**Hallazgo colateral:** `LessonBreadcrumbBar`, `EditorShell` y `ThreePaneLayout` tampoco los importa
nadie. Hay más código muerto del que creíamos. Nombrado, no abierto.

---

## Lo que la cabina puso, y por qué importa para la próxima QA

Los tres ficheros de prueba los escribió la cabina en `cantu-lessons/drafts/web/qa209/pruebas/`,
validados contra el `WebDraftSchema` real antes y después de escribirlos. La hoja del taller pedía al
operador copiar un JSON y editarlo en el Bloc de notas; eso es trabajo que la cabina puede hacer, y
cada instrucción que se delega pudiendo ejecutarse es tiempo del operador que se tira.

---

## Deuda que queda nombrada

- `arithmetic` de Slide sigue sin medir en las dos capas del censo del `#210` (1 de 13 tipos).
- Los tres componentes muertos de arriba.
- La deuda de UX del renombrado —`window.prompt` que propone el slug en vez de lo que enseña la
  barra— va al run de auditoría.
