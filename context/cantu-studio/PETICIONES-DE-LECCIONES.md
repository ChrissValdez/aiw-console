# Peticiones de Lecciones a Cantu Studio — el estado de cada una

> **Lo mantiene el hilo `cantu-studio`. El hilo LECCIONES (`cantu-lessons`) lo lee de aquí.**
> Es el canal de vuelta del ciclo que el operador acordó el 2026-10-04:
> 1. Lecciones pide en `cantu-lessons/docs/PARA-CANTU-STUDIO-<fecha>.md`.
> 2. El operador lo trae.
> 3. Studio lo construye y lo anota aquí.
> 4. Lecciones lo confirma en una lección real.
>
> **Ningún hilo escribe en el repo del otro.** Lo que Studio decide o entrega sobre una petición,
> lo escribe en este fichero; Lecciones no necesita ningún mensaje para enterarse.
>
> **Última actualización:** 2026-10-04, tras la orientación del operador
> (`records/DECISION-ORIENTACION-2026-10-04-LO-DE-LECCIONES-VA-PRIMERO.md`).

---

## Cómo leer este fichero

- **Los runs se citan por su `run_id`**, que no cambia. El número `#N` es una coordenada: el
  orden lo manda la cola de `cantu-studio/.aiw/roadmap/roadmap.json`.
- **Los nombres de componente** son los que se ven en pantalla en el editor. Si una pieza todavía no
  tiene nombre en pantalla, se dice.
- **Estados:** `hecho` · `decidido, en cola` · `cerrado sin construir` · `pendiente`.

---

## Estado de las peticiones

| # | petición | de dónde viene | estado | qué hizo o hará Studio |
|---|---|---|---|---|
| 1 | Los dos «undefined» (`split` e `iconList` con un campo opcional ausente) | `PETICION-DE-COMPONENTES.md` (17-sep), `PARA-CANTU-STUDIO-2026-09-18.md` | **hecho** | `RUN-CANTU-WEB-NO-UNDEFINED-ON-THE-PAGE-001` (#210, 2026-09-19). Verificado el 2026-10-03 por el `#221`: 0 fugas en 39 casos y tres rutas |
| 2 | Modo **bloque** de las fórmulas | `PARA-CANTU-STUDIO-2026-09-18.md`, Petición 1 | **hecho** | `RUN-CANTU-MATH-PROCEDURE-BLOCK-BUILD-001` (#214, pass del operador del 2026-09-21). Es un modo dentro de «Procedimiento matemático» y «Explicación guiada», no un componente aparte |
| 3 | Que la «Nota desplegable» tipografíe fórmulas | `PETICION-DE-COMPONENTES.md`, petición pequeña | **cerrado sin construir: ya lo hacía** | Medido por el `#221`: tipografía el rótulo y el contenido, también plegada. Ya lo hacía el 17-sep: el tipografiado global de la página existe desde el 2026-06-03 (`589e8ceb`). La petición midió el fichero del componente, no la página. **Sin medir:** Moodle (MathJax) |
| 4 | Componer el interior de una «Tarjeta»: una «Nota destacada» dentro | `PARA-CANTU-STUDIO-2026-09-18.md` P2, `-09-19.md` P-B, `-2026-10-03.md` §1 | **decidido, en cola** | **Forma decidida por el operador (#221, 2026-10-04): la nota va JUNTO a la tarjeta, como pieza propia, no dentro.** Vuestra petición del 18-sep lo aceptaba («nos vale igual»). Run: `RUN-CANTU-HIGHLIGHT-NOTE-BESIDE-THE-CARD-001`, sobre el guion de L01; el operador lo juzga en pantalla. Arregla también el título de «Nota destacada», que pasa las fórmulas a mayúsculas (`2n` → `2N`) |
| 5 | **«Explicación matemática básica»** (NUEVA) | `PARA-CANTU-STUDIO-2026-10-03.md` §2 | **decidido, en cola: lo primero** | `RUN-CANTU-BASIC-MATH-EXPLANATION-CONTRACT-001` y después `RUN-CANTU-BASIC-MATH-EXPLANATION-EDITOR-001`. Va antes que todo lo demás: la necesita L01 y la respuesta de la «Pregunta» la lleva dentro. Los dos modos (centrado y bloque) son requisito |
| 6 | «Pregunta» | `PETICION-DE-COMPONENTES.md` §1, `PARA-CANTU-STUDIO-2026-09-19.md` P-A (diseño aprobado) | **decidido, en cola** | Primero el contrato común de los bloques destacados (`RUN-CANTU-HIGHLIGHTED-BLOCKS-SHARED-CONTRACT-001`); después `RUN-CANTU-QUESTION-CONTRACT-001` y `RUN-CANTU-QUESTION-EDITOR-001`, construidos desde el diseño que el operador aprobó |
| 7 | «El porqué» | `PETICION-DE-COMPONENTES.md` §2 | **decidido, en cola** | Después del contrato común: `RUN-CANTU-WHY-CONTRACT-001` y `RUN-CANTU-WHY-EDITOR-001` |
| 8 | «Lo que te llevas» | `PETICION-DE-COMPONENTES.md` §3 | **decidido, en cola** | Después del contrato común: `RUN-CANTU-TAKEAWAY-CONTRACT-001` y `RUN-CANTU-TAKEAWAY-EDITOR-001`. **Aviso:** su prototipo ya no está en `drafts/web/matematicas_paa/aritmetica/operar_con_signos.web.draft.json`; solo queda en el render del 2026-09-18. Si tenéis otra versión, decidnos dónde |

## Lo que el operador decidió sobre la forma, y os afecta

**El `#221`, decidido el 2026-10-04:**

- **Un bloque destacado es una pieza propia**, que puede vivir en «Dos columnas» si pasa el criterio
  del ancho que el operador fijó el 2026-08-12. No es hijo de la «Tarjeta».
- **«Pregunta», «El porqué» y «Lo que te llevas» comparten un contrato, pero son tres componentes**,
  cada uno con su nombre en pantalla. Lo común (escala de tamaños, aires, radio y rótulo) sale de
  vuestros tres prototipos.

## Lo que Studio NO va a hacer, para que nadie lo espere

- **`renderStepGrid.js`** (el parcial que nadie invoca, nombrado por vosotros el 19-sep): sigue sin
  conectar. Es una decisión del operador y no está en cola.
- **La «Nota desplegable» no se toca:** ya hace lo que se pedía.

## Hallazgos de Studio que tocan vuestras lecciones

- La lección de staging `src/content/staging/Aritmetica/L01_Web_Clasificacion_Numerica.js` (de
  `cantu-studio`) muestra «Forma General: (2n)» **sin tipografiar**: la plantilla de JS se come la
  barra de `\(`. Es de las lecciones viejas escritas a mano, no de las vuestras.
- El segundo `calculation` de la lección publicada `src/content/lecciones/Aritmetica/2_operaciones_aritmeticas.js`
  pide amarillo y sale gris. También es de las lecciones viejas.
