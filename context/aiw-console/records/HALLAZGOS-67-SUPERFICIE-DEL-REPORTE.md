# Hallazgos del operador sobre la superficie del reporte — semilla del `#67`

> **DECISIÓN DEL OPERADOR, 2026-08-27 · el `#67` NO se adelanta.** Verbatim:
>
> > «no lo abras, ese run es cuando acabemos los arreglos pendientes, doy una revisada
> > general y te traigo una lista completa de feedback»
>
> La cabina había preparado el dry-run del movimiento —`#67` de la 67 a la 61, con siete runs
> desplazados— y **no se aplicó: no se escribió un solo byte en el canónico.** El `#67` se
> queda el último, que es donde su propio texto dice que debe estar y por la razón que el
> operador escribió el 2026-08-01: abre trabajo en vez de cerrarlo.
>
> **Estos hallazgos siguen vivos y esperando aquí.** No mueren por no abrirse el run: son la
> materia de esa revisión general.

**Abierto el 2026-08-27.** Recogidos durante la QA del `#60`. **Las palabras del operador van
VERBATIM.** Lo que la cabina midió va aparte y marcado.

---

## H-01 · El resumen del emisor queda enterrado en el navegador

**El operador, verbatim (2026-08-27):**

> «no me gustó el diseño de resumen del emisor, está abajo escondido. Me gustaría tenerlo en
> el navegador principal — en este ejemplo son 11 decisiones y 21 secciones que el navegador
> me pone; la primera que sea el resumen del emisor, y que sea escrito de forma más amigable
> encima. Digamos como escribe "decisiones a ratificar", pero resumen y hasta arriba.»

**Medición de la cabina, 2026-08-27 19:30**, en
`project-console/assets/run-report-renderer.js` (líneas 1385-1397):

El raíl se construye en dos tramos. Primero **los pasos** —agrupados, con sus contadores— y
**después** una lista de enlaces a secciones. Dentro de esa segunda lista, «Resumen del
emisor» **sí es el primero**. Pero la lista entera va detrás de todos los pasos, así que en un
reporte con 11 decisiones y 18 ítems queda al fondo.

**O sea: la percepción del operador es exacta y la causa está en el orden de construcción, no
en un fallo de pintado.**

**Lo que pide, en dos partes que conviene no mezclar:**

1. **Posición** — el resumen del emisor arriba del todo del navegador, por encima de los pasos.
2. **Voz** — escrito «de forma más amigable», con el registro que ya usa «decisiones a
   ratificar».

**No es defecto del `#60`:** ese run construyó el resumen y lo colgó del raíl con la regla de
bloque que le tocaba. Dónde empieza el raíl es anterior a él.

**Sin decidir aquí.** La 1 es barata y la 2 toca el vocabulario de la vista, que es
territorio de nombres en pantalla. Cada una puede acabar siendo su propio run, que es el
modelo que el `#67` ya declara.

---

## H-02 · La sección de cobertura es ilegible para el juicio humano

**El operador, verbatim (2026-08-27), tras leer la sección entera:**

> «es demasiada información y no muy amigable ni en una estructura que se me haga legible
> para mí. Si es info para el AI está bien, pero si es para mi juicio está muy denso.»

**Por qué este hallazgo pesa más que un detalle de estilo:** la sección existe **para que un
humano juzgue**. Si el humano no puede leerla, la sección no cumple su función aunque cada
dato que pinta sea correcto — y **todos lo son**: la QA del `#60` la aprobó paso a paso
(B3-B6) **con esta misma pantalla delante**. Es el caso limpio de algo **correcto e
inservible**, y sólo lo puede detectar el ojo del operador.

**Lo que la cabina observa en el volcado que el operador pegó** —y se marca como observación
sobre TEXTO PEGADO, no sobre la pantalla, que la cabina no ve—:

- Los tres cajones y las citas de cabecera **se suceden sin jerarquía visible**: 13 ids
  cumplidos, 6 grupos de declarados con sus párrafos de motivo, la regla del silencio, 3 citas
  con su evidencia cruda y el bloque entero de cifras del perfil, **todo en un mismo nivel**.
- Aparecen **volcados crudos**: un objeto JSON de recuentos y un array vacío `[]`.
- Una lista de 9 ids `P90-*` **aparece dos veces**.
- Algunos motivos son párrafos largos que compiten en peso con los ids que califican.

**Pendiente de confirmar por el operador, y no se afirma:** si los ids salen **pegados** a su
evidencia en pantalla (`QZ-C-ANCHORR1R2`) o si eso lo produjo el copiar y pegar. Son dos
defectos distintos y de coste muy distinto.

**Sin decidir aquí.** Es candidato a run propio, y probablemente el de más valor de los que
salgan del `#67`.

---

## H-03 · Los ids que la vista usa por dentro no existen en pantalla

**Cómo apareció:** la cabina mandó al operador buscar el ítem **`C1`**. Medido el 2026-08-27 a
las 19:41: **`C1` no aparece en ninguna parte de la pantalla.** El índice nombra los ítems por
su pregunta —`Facil-012`— y el `item_id` se queda dentro del dato.

**El fallo de instrucción es de la cabina**, y viola una regla que este proyecto ya tiene
escrita: al operador se le nombran las cosas como las ve en pantalla. Queda dicho.

**Pero hay un lado que sí es de la vista, y es el hallazgo:** la sección de cobertura **está
construida sobre esos ids**. `QZ-C-DISTR` se pinta «apoyado en `I1`», y el operador **no tiene
desde dónde saber qué es `I1`** — ni en esa sección ni en el índice. Lo mismo con `R1`, `R2`,
`C3`, `H1`.

**Consecuencia medida:** la evidencia que la cobertura ofrece **no es navegable para un
humano**. Es coherente con H-02 y probablemente la misma reparación: la cita tendría que
llevar al ítem, o nombrarlo como el índice lo nombra.

**Sin decidir aquí.**
