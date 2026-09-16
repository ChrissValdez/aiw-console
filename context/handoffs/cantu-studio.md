# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina al cerrar la sesión del **2026-09-15/16**. **Sustituye al relevo del
> 2026-09-01**, cuyas cifras ya están obsoletas.
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el canónico al abrir. Gana el
> disco.**

---

## ⚠ LA LECCIÓN DE ESTA SESIÓN: OCHO CIFRAS CAYERON, Y EL PATRÓN CAMBIÓ

El relevo anterior cerró con dos guardas sobre **copiar cifras ajenas**. Esta sesión demuestra
que aquello era solo una cara: **cayeron OCHO, y las cuatro peores no eran copias de documentos
viejos.**

| lo que publicó la cabina | lo que era | la falta, y es nueva |
|---|---|---|
| «la Tarjeta «Código» pinta HTML crudo» | `compiler.js:635` ya lo escapaba **desde antes** | **heredó la conclusión de `#198` sin remedirla** y la escribió en el ticket de `#199` |
| «85 apariciones» de `jame-` | **85 LÍNEAS**; ocurrencias 92 | **midió con `grep -c`, que cuenta líneas, y lo rotuló «occurrences»**. Medición PROPIA y FRESCA, con el modo equivocado de la herramienta |
| «una regla real se recorta» | **nunca se recortaba** — el relleno del cuerpo se traga los 4,2 px y el borde está 88,2 px más afuera | **relevó una cifra de un informe RECIÉN ESCRITO, sin comprobarla, y se la puso al operador DELANTE MIENTRAS DECIDÍA** |
| «el hueco es la pista de la Regla» | la pista ya era exacta; el mando **no pinta rótulo ninguno** | **le dio al operador tres opciones con TRES MECANISMOS SUYOS dentro** y tomó su elección por una medición |
| «~2 115 ficheros en `QA/temp`» | git ve **291 entradas** | repetida toda la sesión sin remedir. **No se vuelve a decir hasta medirla** |
| «13 reglas del corpus» | correcto, pero contaba **instancias**: son **7 declaradas, 13 pintadas** | el sustantivo otra vez |
| «los 691,60 px del campo vecino» | **no es una constante** — depende del ancho de la columna de previa, que vive en `localStorage` | publicó como propiedad del montaje algo que era de **una configuración de pantalla** |
| «este commit trae la apertura y el cierre de `#199`» | traía **CUATRO runs** sin commitear | declaró de memoria un alcance **que se podía contar** |

**Ninguna la detectó la cabina sola.** Seis las desmintió el taller, una salió al ir a commitear
y una la cazó una guarda propia.

### LAS CUATRO GUARDAS NUEVAS, y están escritas en `PROMPT-DE-REINICIO.md` como (F), (G) y (H)

1. **(F) UN TICKET NO VIAJA EN EL MISMO MENSAJE QUE EL SCRIPT QUE CREA SU RUN.** Pasó DOS veces
   —la enmienda D-061 de `#194` y el `#200`— y las dos costó un encargo entero. El operador pega
   lo más pegable, y el ticket siempre lo es. **El ticket va en el turno SIGUIENTE, después de
   que el parte demuestre que el run existe.** Las dos veces la guarda de título del ticket
   convirtió el error en una parada barata: por eso esa cláusula es estructural y no higiene.
2. **(G) EL ALCANCE DE UN COMMIT SE CUENTA CONTRA HEAD, NO SE RECUERDA.** Todo script de commit
   del canónico deriva el delta con `git show HEAD:<ruta>` y **lo escribe en el mensaje**.
3. **(H) CUANDO EL OPERADOR ES EL INSTRUMENTO, PREGÚNTALE QUÉ VE, NO CUÁL DE TUS EXPLICACIONES
   LE ENCAJA.** Una sonda a la que le das tres hipótesis te devuelve una de las tres. **Un «sí»
   del operador a una opción que la cabina redactó NO es una medición: es un acuerdo sobre un
   relato.** Las opciones con mecanismo dentro solo valen cuando la cabina YA midió el mecanismo
   y pregunta por la PREFERENCIA.
4. **Y la que no tiene letra todavía: ANTES DE PUBLICAR UNA SONDA, COMPROBAR QUÉ UNIDAD
   DEVUELVE.** No si devuelve un número.

### La falta que no es de cifras, y es la más incómoda porque PASÓ DOS VECES

**La cabina anunció una decisión de diseño por escrito y codificó la contraria media hora
después.** Al abrir `#202` declaró que no daría commit de apertura porque el script de cierre
derivaría la forma —lógica que ya había construido y probado en `#201`— y luego escribió
`if (nuevos.length) parar()`. **La guarda la cazó.**

**Y VOLVIÓ A PASAR AL CERRAR LA SESIÓN**, con el `#203` y el mismo renglón exacto. O sea: la
cabina **construye la lógica de doble forma, la usa, y la siguiente vez la reescribe de cero
asumiendo una sola.** Dos veces en una sesión no es un descuido.

> **LA GUARDA QUE SALE, Y ES MECÁNICA: la comprobación de doble forma es la FORMA POR DEFECTO de
> todo script de commit del canónico, no una opción que se decide cada vez.** La apertura de un
> run **a menudo llega sin commitear** —pasó en `#201`, `#202` y `#203`— porque el cierre la
> absorbe por diseño. Un script que solo contempla «traigo el cierre» **está mal escrito de
> origen**.
>
> **Y el arreglo de verdad es dejar de escribirla a mano**: extraer el delta a un ayudante
> compartido en `_scratch\` que todos los guiones importen. Mientras se copie y pegue, se va a
> volver a olvidar — que es exactamente por qué este proyecto prefiere el mecanismo a la
> disciplina.

No fue un error de medición: fue una contradicción con lo dicho, y contra eso no vale medir
mejor — vale que la guarda exista.

---

## ESTADO DEL CANÓNICO — medido el 2026-09-16

| | |
|---|---|
| ruta | `projects/cantu-studio/.aiw/roadmap/roadmap.json` — **con `.aiw/`** |
| forma | `objectives[].phases[].runs[]`. **Leer `obj.runs` devuelve 0: es una sonda mal escrita** |
| md5 al cerrar | `9463f9a0e8e7bdba98c0e7e8a453f1fe` |
| runs | **209**, `queue_order` denso `1..209` |
| `completed` | **203** · `active` **1** · `planned` **5** |
| validador | **EXIT 0** con **217** `externalRunIds` reales, motor de `aiw-console` |
| ⚠ `checkInvariants` | **exige un `Set`**, no un array. Con un array la rama se salta en silencio y publica un verde falso |
| `.project/` | re-emitido por `serve.mjs` en cada escritura, 7 ficheros |

**El único run activo es `#208 RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001`**, y lleva activo
desde **antes** de esta sesión esperando revisión manual del operador. No se tocó.

---

## ⚠ LA CABINA NO TIENE SHELL, Y ESO DEFINE CÓMO SE TRABAJA

**Desde la actualización de Windows del 8 de septiembre, el workspace de bash está caído**
(`Plan9 share "c" which is not mounted`). Read, Write, Edit, Grep y Glob funcionan. **`git`,
`node`, las pruebas y la consola NO.**

**Consecuencia, y es la forma de trabajo de toda esta sesión:** cada operación se entrega como un
`.mjs` en `_scratch\` que el operador pega en PowerShell. Funciona bien y el patrón está maduro:

- **Dos pasadas**: sin bandera no escribe nada; con `--apply` escribe. **Y desde esta sesión,
  cualquier bandera que no sea exactamente `--apply` ABORTA** — un `--appply` con tres pes corrió
  como dry-run y la salida era indistinguible de la correcta.
- **Respaldo byte a byte** verificado por md5 antes de escribir.
- **Dry-run con el `remap` publicado**, sacado del dry-run y no razonado.
- **Verificación campo a campo** con la lista DECLARADA de qué debía cambiar.
- **Guardas que abortan ANTES de escribir**, y esta sesión pararon **siete veces**, todas con
  razón.

---

## LO QUE SE HIZO — `#196` a `#203`

Todos `completed`. El canónico llegó a esta sesión con **cuatro runs sin commitear** (`#196`
a `#199`): eso lo descubrió la guarda (G), no la cabina.

| run | qué dejó |
|---|---|
| `#199` **Declared HTML block** | La válvula de escape **con nombre** en Web: `tag` obligatorio, guarda de forma sin dependencias (`DOMParser` NO EXISTE EN NODE), y `data-html-block` que viaja al artefacto para que el censo funcione **sobre lo publicado** |
| `#200` **Slide HTML cell** | La misma válvula en diapositiva. **Abrió una puerta que el esquema cerraba a propósito**, y enmendó la frase que decía lo contrario |
| `#201` **Rename `jame-` → `cs-`** | Ocho identificadores, nueve ficheros, y una guarda que **deriva los dos lados del disco y exige igualdad de conjuntos** |
| `#202` **Rótulos de alcance** (3 rondas) | Siete tipos derivados del árbol zod, **tres pistas que mentían** corregidas, y nombre visible en los siete mandos de fila compartida del despachador |
| `#203` **Ancla de la Regla** (2 rondas) | «Mediano» pasa a valer lo que valía «Extra grande», y **la invariante de no regresión** con su guarda |

### Y el actor que nadie había nombrado, que es lo que más vale de `#203`

**`src/builders/slides/helpers/fitEngine.js`** encoge la celda en tiempo de ejecución según el
déficit vertical, con suelo. **Subir un tamaño NO es una promesa global: es por celda.** En una
rejilla densa se come casi toda el alza y llegó a **invertirla** —una celda salía más pequeña que
antes—.

**La regla que salió de ahí, y vale para cualquier cambio de tamaño futuro: PARA QUE ALGO PUEDA
VOLVER A LO DE AYER, TODO LO QUE SUBIÓ TIENE QUE PODER BAJAR.** De ahí que el armazón viaje en
línea y no en la hoja.

**La guarda `slideRuleLiftNoRegression.test.mjs` es la pieza que sobrevive**: sin ella, el
siguiente run que toque tamaños redescubre el `fitEngine` desde cero, exactamente como este.

---

## DECISIONES DEL OPERADOR — todas en `context/cantu-studio/records/`

| decisión | dónde |
|---|---|
| `<script>` fuera (un renglón reversible), `<iframe>` dentro nombrado como deuda | `DECISION-2026-09-15-EL-SCRIPT-SIGUE-FUERA-Y-EL-IFRAME-ENTRA-NOMBRADO.md` |
| El desborde **se queda visible** (opción A), y no costó código | `VEREDICTO-200-EL-DESBORDE-SE-QUEDA-VISIBLE-Y-LA-UNION-PLANA-NO-ATRIBUYE.md` |
| Prefijo `cs-`, el arnés de calibración entra, y la octava clase va dentro del run de Core | `DECISION-2026-09-15-EL-PREFIJO-ES-CS-Y-EL-ARNES-ENTRA.md` |
| La escalera de la Regla sube entera, aceptando perder el peldaño pequeño | en el `full_description` de `#203` |

---

## LA COLA, Y LO QUE ESPERA

**`#204` es el renombrado del `j-` de Core**, y es **el único de la cola que puede mover el
corpus sin que nadie lo haya pedido**. Lleva esperando desde agosto. **Dentro de su texto va
escrita una parada declarada**: `jame-inline-formula-field` (`InlineFormulaField.jsx:253`) es una
octava clase que el contrato no lista y **sin matcher CSS en ningún sitio** — y `j-` ES PREFIJO
DE `jame-`, así que un barrido la arrastra sin que nadie lo decida. Lo que ese run debe contestar
**no es cómo renombrarla sino si esa clase debe existir**.

### Deuda nombrada, con ubicación

| qué | dónde |
|---|---|
| **Cuatro mandos de tamaño sin rótulo**, fuera del despachador. Tres van SEGUIDOS en la Portada diciendo los tres «MEDIANO» | `SlideTitleSlideEditor.jsx:142`, `:163`, `:189` y `SlideStackEditor.jsx:1440` |
| **La unión plana de Web no atribuye**: seis tipos dan «Invalid input» pelado. Diapositiva usa `discriminatedUnion` y sí atribuye | `WebBlockSchema` |
| **Moodle: DESCONOCIDO DECLARADO por CUARTO run consecutivo.** La sonda está construida y su premisa verificada; falta una instancia | `QA/temp/RUN-CANTU-DECLARED-HTML-BLOCK-AND-CODE-ESCAPE-001/moodle-sonda.MOODLE.html` |
| **La QA de rótulos del `#202` NO se ejecutó**, y está declarada en su cierre con la superficie exacta | los seis mandos, si se entienden sin pasar el ratón |
| `QA/temp` sin commitear — **291 entradas según git**, cifra a remedir | triage, **no mover**: ≥40 documentos lo citan |
| `tools/roadmap/tests`: **11 de 173 en rojo**, preexistente, otro carril | no tocado |
| Lint: **2 errores + 1 aviso preexistentes** | `TextAreaField.jsx`, `SlideSplitFields.jsx` |

---

## LO QUE SE APRENDIÓ DEL TALLER, Y ES LO MEJOR DE LA SESIÓN

**Los cinco talleres contradijeron su propio encargo en un punto que lo sostenía, y las cinco
veces el disco les dio la razón.** No es ruido: es la separación adversaria funcionando.

Y dos que merecen quedar escritas:

- **Un taller retiró una opción ANTES de ofrecerla** porque medir demostró que destruía
  información —quitar el prefijo a secas habría fusionado dos atributos distintos en uno, en
  silencio—. Un ejecutor que hace eso está haciendo exactamente su trabajo.
- **Otro declaró que su propia pieza principal no hace nada.** El piso que construyó no llega a
  actuar sobre el corpus actual; lo que arregla los casos medidos es el armazón en línea. Podría
  no haberlo dicho y nadie lo habría notado. **Eso vale más que el piso.**

**La regla de la QA funcionó CINCO veces seguidas**: ningún taller escribió en el `5173` del
operador; todos levantaron ranura propia. Se paga desde que `#196` destruyó la Descripción de un
ítem suyo.
