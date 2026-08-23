# VEREDICTO DE QA — `#132` «Tabla», ronda 0

> Recogido por la cabina el **2026-08-23**. El operador es Christopher Valdez Cantu.
> **Veredicto ENTREGADO CON CAPTURAS, no paso a paso.** No ejecutó los diez pasos del
> packet: miró el formulario, lo comparó con el de Web y dictó dos correcciones. Los
> pasos 1–10 del packet **quedan sin ejecutar y así se declara**.

---

## EL VEREDICTO, VERBATIM

> la primera imagen es el componente en slide
> y el segundo es en web
> en web estan mejor los comandos, desde el icono,
>
> ademas, no deberia tener un recuadro el agrupamiento defilas
> solo el recuadro de
> fila 1
> fila 2
> sino se ve mucho recuadro adentro de recuadro
>
> entonces... toma como referencia los comandos de web para hacer los comandos de slide en tabla

**Adjuntó DOS capturas:** el formulario de «Tabla» en diapositiva y el de «Tabla» en Web.
Las capturas no se guardan en el repositorio; lo que se leyó de ellas está transcrito
abajo, marcado como lectura de la cabina y no como palabra del operador.

---

## LO QUE LA CABINA LEYÓ EN LAS CAPTURAS — lectura, no veredicto

**Diapositiva:** `TÍTULO*` · `COLOR` («Azul acero», de su paleta configurada) · `SÍMBOLO`
con marcador «Pega aquí el código `<svg>…</svg>`» y la nota del subconjunto SVG seguro ·
recuadro `FILAS` que contiene un recuadro `FILA 1` · `CONCEPTO` / `DESCRIPCIÓN` /
`FÓRMULA` (texto pelado) / `RESULTADO` / `ETIQUETA`.

**Web:** `TITULO*` · `COLOR` («Azul acero») · `ICONO` con selector «-- Sin icono ·
Cambiar» · `FILA 1` **sin recuadro de grupo**, con un desplegable de forma «Con
descripción» y flechas de reordenar · `CONCEPTO` / `DESCRIPCION` · `FÓRMULA` **renderizada
en vivo** con botón «Σ Editar fórmula» y `<details>` «LaTeX textual avanzado» ·
`ETIQUETA` / `COLOR DE ETIQUETA` / `ESTILO` («Contorno»).

**«Azul acero» es un rótulo de su paleta configurada, que NO vive en el repositorio.** La
cabina no puede verificarlo y no lo afirma: solo consta que el desplegable leyó de su
paleta y no de la tabla privada del motor, que es lo que el run pretendía.

---

## LO QUE ESTE VEREDICTO DESTAPÓ, Y ES DE ENCUADRE

### 1 · EL FALLO DE ENCUADRE ES DE LA CABINA, Y SOBREVIVIÓ A UN TRABAJO CORRECTO

El ticket de la ronda 0, en su §6, mandó usar **la puerta de SVG en crudo** y en su §2
mandó **PARAR si el taller se veía abriendo el motor**. El taller obedeció las dos, y
obedecerlas fue lo que produjo el defecto.

**Medido el 2026-08-23:** `RUN-CANTU-SLIDE-ICON-MENU-001` construyó
`src/builders/slides/helpers/iconLibrary.js` —36 iconos, mismos ids y misma geometría que
Web, con `resolveSlideIcon`— **y retiró explícitamente el paso-a-través de SVG crudo**. Lo
usan `renderCard.js`, `renderCallout.js` y `renderIconList.js`.

> **`renderTable.js` es el ÚLTIMO paso-a-través de SVG crudo que queda en el motor de
> diapositiva.** Un run anterior ya mató ese patrón en todos sus hermanos, y el ticket de
> la cabina mandó reproducirlo.

Es la regla de la casa disparando: **si un defecto sobrevive a una reparación correcta, el
encuadre está mal — se llama a la capa de abajo.** Y es la §12 en su forma más pura: «lo
mismo, pero su run se lo dio». La cabina PREGUNTÓ la §12 y el taller la contestó sobre el
control de fórmula; **ninguno de los dos miró el icono.**

Y `symbol` **no lo escribe nadie en el corpus** — medido, cero apariciones. Retirarlo no
rompe contrato con ningún dato existente.

### 2 · EL RECUADRO DOBLE NO ES DE «TABLA»: SON DOS PATRONES VIVOS A LA VEZ

Medido el 2026-08-23 en los formularios de diapositiva:

| formulario | envoltorio de la colección |
|---|---|
| `SlideTableFields.jsx` | `rounded-xl border bg-zinc-50/60 p-3` con rótulo «Filas», **y dentro** `rounded-lg border bg-white/60 p-2` por fila |
| `SlideConceptGridFields.jsx` | **EXACTAMENTE EL MISMO DOBLE RECUADRO**, con rótulo «Terminos» |
| `SlideSplitFields.jsx` | `CabeceraDeColeccion` + `ItemDeColeccion` — **sin recuadro de grupo** |

**«Tabla» copió el patrón de `conceptGrid`. El que el operador pide es el de `split`, y
las dos piezas que hacen falta YA EXISTEN y ya son compartidas.**

> **Corolario, y hay que decírselo: si solo se arregla «Tabla», «Anatomía de fórmula» se
> queda con el doble recuadro y la divergencia se muda de sitio.** Es el mismo mecanismo
> que dejó a `conceptGrid` sin paleta global en `#131`.

### 3 · QUÉ DE WEB PUEDE HONRAR EL MOTOR DE DIAPOSITIVA — medido en `renderTable.js`

| control de Web | ¿lo honra el motor de diapositiva? |
|---|---|
| Icono de catálogo | **sí, vía `resolveSlideIcon`** — hay que abrir `renderTable`, como sus tres hermanos |
| Color de etiqueta por fila | **SÍ, YA HOY** — `m.badgeColor` existe y resuelve por el mapa de temas y luego crudo |
| Control de fórmula (Σ + LaTeX avanzado) | **sí** — es puro `editor-ui`, el motor no se entera |
| Desplegable de forma de fila | **sí** — `desc` ya es opcional; es azúcar de interfaz |
| **Estilo de etiqueta (Contorno / Sólido)** | **NO. No existe en el motor de diapositiva:** la etiqueta se pinta siempre sólida con color de fondo. Exponerlo sería decoración que miente |

---

## LO QUE QUEDA SIN MIRAR, Y SE DECLARA

**Los diez pasos del packet no se ejecutaron.** No hay BIEN/MAL/VETO de ninguno. En
particular quedan sin veredicto: el orden del selector (décimo y último), la cuarta fila
de la rejilla, la previa de las cuatro diapositivas, y el botón de borrar con una sola
fila.

**Y es el SEGUNDO cierre consecutivo sin QA paso a paso sobre esta superficie**, después
del veredicto global de `#131`. Se nombra para que el operador decida si acumula riesgo.

Siguen sin veredicto, y son de la ronda 0: el suelo de 12px que la etapa A del ajuste no
respeta, y la huella mínima que se midió y no se declaró.
