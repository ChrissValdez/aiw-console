# El reporte como cosa que se LEE — feedback del operador y lo que el disco dice

**2026-08-27**, durante la QA del `#61`. El operador pidió parar y definir la estructura antes
de seguir parcheando. **Sus palabras van VERBATIM.** Las mediciones de la cabina van marcadas
con su hora.

---

## 1. EL FEEDBACK, VERBATIM

**Sobre el resumen del emisor:**

> «El concepto me gusta, la presentacion no, ya te habia dado feedback al respecto abajo
> escondido no me gusta es lo primero que debo leer el resumen de que se hizo y porque y de
> forma amigable a la lectura, no es un metadato como los demas de abajo»

**Sobre metadatos, recuentos y compuerta:**

> «Eso puedo ser mas flexible con el formato porque no se lee en cada reporte, esta ahi por
> cuando se ocupe, haya registro y para el AI» · «tiene el mismo feedback que metadatos, no es
> algo que leere en cada reporte, pero si lo ocupo es bueno tenerlo ahi»

**Sobre los ítems:**

> «estoy deacuerdo, pero falta pulir el contenido» · sobre el `declared_gap` H1: «este de
> declared gap no lo entendi, esta redactado de una forma que no enteindo, que error fue, que
> desicion se tomo, o que necesita de mi, no me deja claro» · sobre `reclassification` y
> `correction`: «me queda claro porque muestra antes y despues y la correccion»

**Sobre las citas — la petición central:**

> «cita mucho cosas como "La §6.3 no pone techo de longitud y ordena listar" pero no tengo
> manera facil y accesible de abrir el archivo docs/RUBRICA-DE-NIVELES.md · §6.3 en la consola.
> me gustaria que justo donde dice: docs/RUBRICA-DE-NIVELES.md · §6.3 me abriera lateralmente
> el archivo en esa seccion para leerlo (no modificar solo leer)»

**Sobre la cobertura y lo que él imaginaba:**

> «yo lo que imaginaba era tener archivos de referencia y lista de criterios en un markdown, y
> que sean citados en la desicion y como dije hace un momento abribles. Asi puedo ver archivos
> de referencia (un archivo de referencia en este caso seria un problema con un feedback bien
> hecho y formato latex bien puesto, o una lista de problemas con el nivel PAA para saber como
> medir el nivel) y la lista de criterios es la lista de que revisar, como revisarlo, que pasa
> y que no pasa, etc»

**Y el lector lateral, global:**

> «globalmente tener un boton arriba para abrir estas cosas lateralmente sin cerrar el reporte,
> osea que consuma la mitad de la pagina el abrir uno de estos archivos asi cuando lo citan
> puedo facilmente abrirlo y ver que regla esta diciendo. porque sino de memoria tengo que
> recordar que es · §6.3 y muchas veces confio en esa desicion pero a veces son desiciones de
> hace semanas y no las recuerdo, y si estan mal no tengo forma de auditarlas o revisarlas (de
> forma amigable al menos)»

**El motivo, y es de auditoría, no de comodidad:** una cita que no se puede abrir **no se puede
auditar**. El operador está diciendo que hoy firma veredictos confiando en reglas que no
recuerda y no puede consultar sin salir de la pantalla.

---

## 2. LO QUE EL DISCO YA TIENE — medido el 2026-08-27 a las 21:05

**Cuatro de las cinco piezas ya existen. Lo que falta es la vista.**

| pieza | estado medido | comando |
|---|---|---|
| El servidor **sirve los `.md` del proyecto** | **200 OK**, `text/plain`, 13 755 bytes | `curl` a `/projects/cantu-quizzes-latex/docs/RUBRICA-DE-NIVELES.md` |
| La rúbrica **tiene encabezados anclables** | `## 6.` y `### 6.3 Retroalimentación` existen como títulos | `grep -E "^#{1,4} "` |
| La consola **ya carga un índice de documentos** | `docs_index.json` con **3** documentos, la rúbrica entre ellos | `.project/docs_index.json` del emisor |
| El reporte **ya lleva punteros ESTRUCTURADOS** | un ítem trae `authority: {source: "docs/RUBRICA-DE-NIVELES.md", section: "§2 … y §5"}` | claves del ítem `R1` |
| **La vista los convierte en enlace** | **NO existe** | — |

**Es el patrón que este proyecto ya ha medido cuatro veces: la capacidad está en el dato y
cerrada en la vista.** No se abre por cuenta de la cabina: se nombra.

### Pero hay DOS clases de cita, y no se arreglan igual

1. **Citas que VIAJAN COMO DATO** — el `authority` de un ítem, con `source` y `section`.
   **Éstas se pueden volver enlace hoy**, sin tocar el contrato ni el repo del emisor.
2. **Citas ENTERRADAS EN PROSA** — «La §6.3 exige decir cuál de las tres es…» dentro de un
   `why_not`. **Éstas NO.** Para enlazarlas habría que **parsear prosa buscando `§`**, que es
   exactamente el regex de dominio que la ceguera de esta consola veta, y que además fallaría
   en silencio.

**Y es el mismo defecto que ya se le señaló al emisor con `verification.command`:** un campo
que promete dato llevando prosa dentro. Ahora aparece por segunda vez, en otra forma. **Con
dos casos medidos, la pregunta de si es familia deja de ser una hipótesis.**

### Un matiz que también es del contrato

El `section` que hoy viaja es **`"§2 (el ancla como corpus de referencia) y §5"`** — dos
secciones y un comentario dentro de un campo. **Sirve para leerlo, no para saltar a él.** Un
ancla resoluble es una y sin adornos.

---

## 3. LO QUE ESTO PARTE EN TRES

**Sin decidir aquí. Se nombra para que el operador reparta.**

- **El LECTOR LATERAL** — botón global, media pantalla, sólo lectura, sin cerrar el reporte; y
  los `authority` que ya viajan como dato se vuelven enlaces. **Construible hoy, sin contrato.**
- **EL CONTRATO DE LA CITA** — que toda cita viaje como dato con un ancla resoluble, en vez de
  como `§` dentro de una frase. Toca el sobre —**congelado como v1, sólo se mueve por decisión
  numerada**— y toca al emisor, que tiene su propio hilo.
- **EL CATÁLOGO DE CRITERIOS** — la lista que el operador describe: «qué revisar, cómo
  revisarlo, qué pasa y qué no». Ya estaba encargado y sin abrir. **Es lo que pondría palabras
  detrás de los 29 códigos `QZ-C-*`**, que es la queja de fondo de la cobertura.

**Y una cuarta, que no es de la consola:** el ítem `declared_gap` no se entiende — «qué error
fue, qué decisión se tomó, o qué necesita de mí». **Eso lo escribe el emisor**, no lo pinta la
vista. Va a sus peticiones abiertas.

---

## 4. LO QUE EL OPERADOR YA RATIFICÓ, y conviene no perderlo

**El pliegue del `#61` acertó.** Verbatim: *«no se lee en cada reporte, está ahí por cuando se
ocupe»* — que es exactamente la frase que el taller escribió en el pliegue: «plegado porque
está para auditarse, no para juzgarse de un vistazo». **La dirección está aprobada; lo que no
basta es el alcance.**
