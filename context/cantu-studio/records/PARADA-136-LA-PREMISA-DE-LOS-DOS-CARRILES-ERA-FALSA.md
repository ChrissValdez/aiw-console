# PARADA DE `#136` — la premisa central del ticket era falsa, y era de la cabina

> Recogido el **2026-08-24**. El taller **paró antes de escribir un solo fichero**, con tres
> motivos independientes. La cabina verificó los tres contra disco. **Los tres se
> sostienen.**

---

## LA PREMISA QUE SE CAE, Y ES LA QUE JUSTIFICABA LA MITAD DEL DISEÑO

El ticket afirmaba, y la decisión de arquitectura del operador lo recogió:

> «WEB guarda `textScale`, un MULTIPLICADOR acotado a 0.75–1.25; DIAPOSITIVA guarda un
> TAMAÑO ABSOLUTO. Los dos carriles no guardan la misma clase de número.»

**FALSO.** Verificado por la cabina el 2026-08-24:

| | qué escribe el desplegable de cuatro peldaños | cómo lo resuelve el motor |
|---|---|---|
| Diapositiva | `textSize` — enum de cuatro | `tokens.js` → rem absoluto |
| **Web** | **`list.textSize` — enum de cuatro** | **`renderList.js` → rem absoluto** |

`renderList.js:19` declara `TEXT_SIZE_STYLES` con **rem absolutos por peldaño**
—`small: { title: '1.25rem', body: '0.98rem' }`, `medium: { title: '1.5rem' }`…—. **No es
un multiplicador.**

Y `textScale` (0.75–1.25) **existe**, pero vive **solo en `SplitBlockShapeSchema`**, tiene
**mando propio** —un `<input type="number">`, no un desplegable— y `SplitBlockShapeSchema`
**no declara `textSize`** (comprobado: cero apariciones).

> **LOS DOS CARRILES SÍ GUARDAN LA MISMA CLASE DE NÚMERO donde este run actúa.**

## CÓMO SE EQUIVOCÓ LA CABINA, Y ES SU PATRÓN

Midió `textScale` en `renderTable.js` del carril Web —`const textScale = data.textScale ||
1.0`— y **generalizó que el mando de tamaño de Web escribía multiplicadores**. Nunca
comprobó **qué campo escribe el desplegable**.

> **Es exactamente la forma del error de `variantMap`:** encontró UNA cosa y dio por hecho
> que era LA cosa. Octava vez en esta familia de runs.

Y hay un agravante: el operador **la corrigió a medias sin saberlo**. Dijo *«recuerda que
eso de que mi escenario es fijo aplica a slide, no a web»* —que es cierto y pertinente— y
la cabina, en vez de volver a medir el campo, **construyó encima de su premisa falsa una
segunda capa igual de falsa**: la de enseñar porcentaje en Web.

## LAS OTRAS DOS PARADAS, TAMBIÉN VERIFICADAS

**§4 — el valor pintado no se puede leer sin abrir un canal nuevo.** El taller lo condujo:
una celda apretada pide `xlarge` (~39px) y la pantalla pinta **13,42px**, con
`data-geometry-fit: 0.342`. Ese número vive **solo en el DOM del documento de previa**,
escrito en tiempo de ejecución. Y la previa es **cross-origin**: editor en Vite 5173,
previa en compiler-api 3000, sin proxy. Además `stackSlide` ni siquiera declara atributo:
escribe `style.fontSize` directo.
**El §4 del propio ticket mandaba parar exactamente aquí. La guarda funcionó.**

**§10 — no salen de UNA pieza.** Censo del taller contra el de la cabina:

| censo | cabina | disco |
|---|---|---|
| mandos de cuatro peldaños | 17 en 9 ficheros | **18 en 5 ficheros** |
| piezas compartidas | «UNA» | **DOS**, más uno suelto |
| valores distintos del corpus | «NUEVE» | **SEIS** |

El decimoctavo es un desplegable **en línea** que recorre `TEXT_SIZE_OPTIONS` a mano
(`WebBlockEditor.jsx:2385`): **cambiar la pieza no lo cambia**.

Y el «nueve» fue otro fallo de recuento de la cabina: **contó líneas de su propia sonda, no
valores distintos**. La unión real es `1.2 · 1.3 · 1.4 · 1.45 · 1.5 · 1.65` = SEIS. Novena
vez.

## LO QUE EL TALLER MIDIÓ DE PASO, Y VALE ORO

**El motor con valores absurdos**, conducido con estilos computados:

| valor | computado | qué pasa |
|---|---|---|
| `0` / `0rem` | 0px | texto invisible, sin aviso |
| `-2rem`, `abc`, `1.65` sin unidad | 24px | **hereda del padre**, NO cae al respaldo |
| `9999rem` | 8000px | desborda el escenario |

El respaldo `|| '1.65rem'` **solo atrapa lo falsy**. Abrir escritura libre **exige valla
propia en el esquema**, y eso el ticket no lo previó.

**Y un hallazgo lateral que explica un pendiente viejo:** los cinco fallos de la suite
tienen **una causa única** — el canónico tiene una dependencia huérfana,
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` depende de
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, **que no existe**. Llevaba semanas contado como
«cinco previos» sin causa nombrada.

## LO QUE NO SE CONDUJO, Y SE DECLARA

El ancho real del mando, el `+` apagado en el tope y los 18 consumidores. Exigen levantar
el editor, y levantarlo pide `.claude/launch.json`, que `CLAUDE.md` y `AGENTS.md` le
prohíben tocar al taller. **No se dan por buenos.**

## LO QUE DECIDE EL OPERADOR

1. **Qué unidad enseña el mando**, ahora que los dos carriles son la misma clase.
2. **Si «enseñar el valor pintado» entra en este run** o va a run propio con el canal como
   entregable.
