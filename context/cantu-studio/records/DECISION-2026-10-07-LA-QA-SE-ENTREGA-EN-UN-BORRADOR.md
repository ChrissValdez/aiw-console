# Decisión · 2026-10-07 · La QA se entrega en un borrador ya montado, no en JSON para pegar

**Hilo:** `cantu-studio` · con `#224`, `#225` y `#228` esperando QA.

## Sus palabras, verbatim

> sabes porque estoy batallando tanto, lo acabo de entender
> Es porque todos los qA me pides que cada cosita las agregue manualmente con el insert json
>
> no puedes mejor crear un draft de Qa con todo eso ya insertado lo abro y ahi reviso si jalo o no
> Claro cuando quieras revisar como funciona el insertar json , si tiene bloqueos de algun formato invalido por ejemplo ahi si me tienes que dar para insertar, pero cuando no, evitalo
>
> intenta hacer el diseño de los QA lo mas facil para mi posible, porque quiero mucho tiempo en eso, y luego se atora toda la cola de trabajo

## La regla que queda

1. **Toda QA de pantalla llega como un borrador ya montado.** El operador lo abre desde «Explorar» y mira. El
   borrador vive en el espacio de borradores del editor (`src/content/studio/drafts/web/qa_cabina/...`). Lo prepara
   el taller o la cabina, y se valida con los esquemas reales antes de dárselo.
2. **«Insertar JSON» solo se le pide cuando lo que se prueba es el propio «Insertar JSON»**: sus bloqueos, sus
   mensajes de error o su puerta de formato.
3. **La QA se diseña para su tiempo:** pocos pasos, lo que se espera escrito antes, y una respuesta que cabe en
   una línea. Su tiempo es el cuello de botella de toda la cola.
4. **Desde ahora, los tickets lo piden:** el taller entrega su QA como borrador montado, con su ruta en Explorar.
5. **Los borradores de QA no se commitean.** La cabina los borra al cerrar el run, salvo que el operador quiera
   conservar alguno.

**Primer borrador así:** `src/content/studio/drafts/web/qa_cabina/qa_2026_10_07/tarjeta_y_aire.web.draft.json`
(la Tarjeta del `#228` y la página de medida del `#225`). Validado con `WebDraftSchema` y `WebPreviewDraftSchema`,
y renderizado con `previewRenderer` a las 23:5x UTC.
