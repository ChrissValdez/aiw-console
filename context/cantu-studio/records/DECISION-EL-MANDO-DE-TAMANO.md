# DECISIÓN DE ARQUITECTURA — el mando de tamaño de todo el proyecto

> Tomada por **Christopher Valdez Cantu** el **2026-08-24**, tras una consulta de diseño de
> cuatro turnos. Se guarda como veredicto porque **cambia el tipo de un dato en 25 campos**
> y la superficie de autoría de 17 mandos.

---

## LO QUE PIDIÓ, VERBATIM

> Creo que deberiamos tratar de tener algo como el A- A+ reset (...) pero para cada
> compoentne, en vez de listar, mediano, grande, extra grande (...) porque no es problema
> cuando es uno por componente pero aqui por ejemplo que quiero un boton por enunciado,
> por formula, por nota

> realmente lo que quiero es que sea algo que estorbe lo menos posible (...) quiero que sea
> compacto para poder ponerlo en multiples lados sin volver el formulario excesivo pero al
> mismo tiempo en algun lado tiene que poderse ver el tamaño escogido

> en realdiad tener algo como A- Mediano A+ y ahi en vez de imprimir Mediano imprimir 1.45
> rem por ejemplo, y poder yo manualmente poner un tamaño manual si no me gusta uno de los
> tamaños base, digamos 5 rem o 0.5 rem

Y la corrección que reencuadró todo:

> solo recuerda que eso de que mi escenario es fijo aplica a slide, no a web

Aprobación final: **«deacuerdo me gusta / adelante»**.

---

## EL HALLAZGO QUE JUSTIFICA EL CAMBIO

**LOS CUATRO PELDAÑOS SON UN INVENTO DEL EDITOR. EL MOTOR NUNCA LOS TUVO.**

Medido el 2026-08-24:

| | |
|---|---|
| lo que acepta el motor | `data.problemFontSize \|\| '1.65rem'` — **cualquier cadena** |
| lo que escribe el corpus | `1.2 · 1.3 · 1.4 · 1.45 · 1.5 · 1.65 rem` — **nueve valores** |
| los cuatro peldaños | `1.375 · 1.65 · 1.98 · 2.42 rem` — **coincide UNO** |

El operador ya autoraba con valores libres y el motor los pintaba. **Los peldaños llegaron
después y cerraron una puerta que estaba abierta.** Esto explica el dolor de toda la
semana: «los seis tamaños del historial no caben en cuatro peldaños» — no caben porque se
escribieron antes de que los peldaños existieran.

> **No se está añadiendo libertad: se está devolviendo la que el editor quitó.**

> ⚠ **ATENCIÓN — LA SECCIÓN QUE SIGUE CONTIENE UN DATO FALSO DE LA CABINA.**
> No se borra, porque la casa corrige hacia adelante y no reescribe. **La corrección está
> al final del documento, en «LA PREMISA DE LOS DOS CARRILES ERA FALSA».** Léela antes de
> actuar sobre nada de esta sección.

## LA CORRECCIÓN DEL OPERADOR, Y ES LA QUE DECIDE LA UNIDAD

La cabina recomendó enseñar **píxeles** argumentando que el escenario es fijo. **El
operador corrigió que eso solo vale para diapositiva.** Medido a raíz de su corrección:

| | Web | Diapositiva |
|---|---|---|
| qué guarda | `textScale`, un **MULTIPLICADOR** | `textSize`, un **TAMAÑO ABSOLUTO** |
| rango | acotado **0.75 – 1.25** | cuatro peldaños |
| el motor hace | `--local-scale: 1.15` × la variable base | `font-size: 1.65rem` directo |

**Los dos carriles no guardan la misma clase de número, y los dos montan los mismos cuatro
rótulos encima.** Un mando que enseñe píxeles sería verdad en diapositiva y **falso en
Web**, donde un mismo `1.15` da 17px en un sitio y 23px en otro.

## LO DECIDIDO

**Un solo mando compacto, y la unidad dice lo que el dato ES en cada carril:**

    EN DIAPOSITIVA              EN WEB
    ┌──────────────┐            ┌──────────────┐
    │ −  26 px   + │            │ −  110 %   + │
    └──────────────┘            └──────────────┘
    absoluto, editable          relativo, dentro
    y libre                     de su tope 75–125 %

- **~110 px de ancho**: caben cuatro en una fila, que es el requisito que lo motivó todo.
- **El valor que enseña es EL QUE SE PINTA, no el que se escribió.** Si el autoajuste lo
  encoge, se ve encogido. Un mando que dice un número que la pantalla no cumple es
  exactamente la clase de defecto que el operador lleva toda la sesión vetando.
- **Los cuatro peldaños NO desaparecen: pasan a ser las paradas del `−` y del `+`.** Se
  llega a ellos rápido y se puede salir a mano.
- **La escritura libre se abre SOLO en diapositiva.** En Web no cabe: su contrato está
  acotado a ±25% a propósito, y eso no lo inventa este run.
- **Se conserva un `↺` pequeño.** El operador quería quitarlo; la cabina pidió dejarlo y
  aceptó. La razón no es estética: toda la doctrina del proyecto es que **«Mediano» vale lo
  que la superficie pinta hoy**, así que sin vuelta al ancla nadie sabe cuál era el valor
  bueno.

## EL COSTE, DECLARADO

**25 campos del esquema** usan hoy el enum de cuatro nombres, y **17 mandos** están
montados en **9 formularios**. Pero los 17 salen de **UNA pieza compartida**: cambiarla los
cambia todos a la vez.

## EL ORDEN, Y ES LA REGLA DE LA CASA

**Este run va ANTES que los mandos nuevos de «Procedimiento matemático».** Si primero se
montan tres desplegables y luego se cambia la pieza, el trabajo se hace dos veces. *La
pieza compartida se arregla antes que quienes la usan.*

---

# LA PREMISA DE LOS DOS CARRILES ERA FALSA — corrección del 2026-08-24

> **Se corrige hacia adelante. El texto de arriba se queda como estaba**, con su aviso
> delante, porque borrarlo dejaría circulando la versión falsa sin rastro de que lo fue.

## QUÉ DECÍA MAL, Y QUÉ DICE EL DISCO

Arriba se afirma que **Web guarda un MULTIPLICADOR y diapositiva un TAMAÑO ABSOLUTO**.
**Es falso.** Verificado por la cabina el 2026-08-24, después de que el taller parara sin
escribir un solo fichero:

| | qué escribe el desplegable de cuatro peldaños | cómo lo resuelve el motor |
|---|---|---|
| Diapositiva | `textSize` — enum de cuatro | `tokens.js` → rem absoluto |
| **Web** | **`list.textSize` — enum de cuatro** | **`renderList.js:19` → rem absoluto** |

`TEXT_SIZE_STYLES` de `renderList.js` declara rem absolutos por peldaño:
`small { title: '1.25rem', body: '0.98rem' }` · `medium { title: '1.5rem' }` · etc.
**No hay multiplicador por ninguna parte.**

`textScale` (0.75–1.25) **sí existe**, pero vive **solo en `SplitBlockShapeSchema`**, tiene
mando propio —un campo numérico, no un desplegable— y ese esquema **no declara `textSize`**.

> **LOS DOS CARRILES GUARDAN LA MISMA CLASE DE NÚMERO donde este run actúa.**

## CÓMO SE EQUIVOCÓ LA CABINA

Midió `textScale` en `renderTable.js` del carril Web y **generalizó que el mando de tamaño
escribía multiplicadores**, sin comprobar nunca **qué campo escribe el desplegable**. Es la
forma exacta del error de `variantMap`: encontró UNA cosa y dio por hecho que era LA cosa.

**Agravante:** el operador la corrigió a medias sin saberlo —«lo del escenario fijo aplica a
slide, no a web», que era cierto— y la cabina, en vez de volver a medir el campo, construyó
encima **una segunda capa igual de falsa**: la de enseñar porcentaje en Web.

## LAS CIFRAS QUE TAMBIÉN ESTABAN MAL

| | decía la cabina | dice el disco |
|---|---|---|
| mandos de cuatro peldaños | 17 en 9 ficheros | **18 en 5 ficheros** |
| piezas compartidas | «UNA» | **DOS**, más un desplegable en línea que ninguna alcanza |
| valores distintos del corpus | «NUEVE» | **SEIS** |

El decimoctavo recorre `TEXT_SIZE_OPTIONS` a mano en `WebBlockEditor.jsx:2385`: **cambiar
la pieza no lo cambia**. Y el «nueve» salió de contar líneas de la propia sonda en vez de
valores distintos.

## LO QUE SE DECIDE EN CONSECUENCIA — operador, 2026-08-24

> **«adelante con tus recomendaciones»**

**1 · LA UNIDAD ES `rem`, Y ES LA MISMA EN LOS DOS CARRILES.**

    −  1.65 rem  +   ↺

La razón que decide: **es lo que el operador ya escribe**. Su corpus está lleno de rem
puestos a mano, y al pedir el mando dijo literalmente *«digamos 5 rem o 0.5 rem»*.
Descartados **píxeles** —mentirían en Web, donde el `rem` depende del contenedor y del
lector— y **porcentaje** —es derivado: si se retocan los peldaños, los porcentajes se
mueven solos—.

**2 · «ENSEÑAR EL VALOR PINTADO» SALE DE `#136` Y VA A RUN PROPIO.**

No es una funcionalidad: **es un puente que no existe**. El editor y la previa viven en
puertos distintos sin comunicación, y el valor solo existe dentro de la previa en tiempo de
ejecución. Medido por el taller: una celda pide ~39px y la pantalla pinta **13,42px**.
Construir ese puente es tocar el núcleo.

## Y UN AVISO QUE EL TICKET NO PREVIÓ

Abrir la escritura libre **exige valla propia en el esquema**. Medido con estilos
computados: `0rem` da texto invisible sin avisar, y `abc` o `1.65` sin unidad **heredan del
padre** en vez de caer al respaldo — el `|| '1.65rem'` solo atrapa lo vacío.
