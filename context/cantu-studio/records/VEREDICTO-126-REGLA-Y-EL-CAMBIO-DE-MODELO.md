# VEREDICTO 126 — «Regla matemática» admitida · Y EL OPERADOR CAMBIA EL MODELO DE TAMAÑO

> Run: `RUN-CANTU-SLIDE-RULE-ADMIT-AND-IMPLEMENT-001` · `queue_order` 126.
> Operador **Christopher Valdez Cantu**, **2026-08-20**. Transcrito **VERBATIM**.

---

## SUS PALABRAS, ÍNTEGRAS

Al ver una Regla cortada por abajo en la fila 3, con captura adjunta:

```
varios problemas primero, el tamaño del del texto, esta pequeño, el extra grande se ve apenas
y bien

Ademas... mira como se corta abajo, que recomendacion me das, una es que se ajsute el tamñao
en base espacio disponible, el otro es que se definac on el tamañonadamas y basta con
ajsutarlo

recomiendo que el tamaño se escale por si mismo en base al grid

si no cabe en el esapcio se encoge el tamaño de letra, pero si cabe que sea el tamaño maximo
disponible como escalar
```

Y tras el dibujo de las tres salidas:

```
B, acepto tu recomendaicon
```

---

## PARTE 1 — EL CRITERIO 8 FUNCIONÓ, Y ERA EL EXPERIMENTO DEL RUN

`#124` necesitó **cinco rondas**, y las cuatro últimas fueron **la misma clase de defecto**. El
ticket de este run metió un criterio nuevo que obligaba a resolver las cinco de una vez.
**Funcionó a la primera:**

| | |
|---|---|
| **Tamaño** | anclas medidas en navegador: 16 / 38,4 / 20,8 px. «Mediano» exacto |
| **Armazón** | escala; redondeo, filos de pelo y sombra **declarados como no escalables** y vetables |
| **Color** | paleta global vía `accentColor`. **Dos roles, no cinco** — este motor pinta dos superficies |
| **Saltos de línea** | ya heredados de `#125`, verificados en navegador |
| **Icono** | **«no aplica», MEDIDO**: `renderRule` no dibuja ninguno en ninguna rama |

**Y `variant` salió del formulario sin coste**, porque aquí gobierna solo dos colores.

**Si esto se sostiene, las cinco admisiones que quedan cuestan una ronda en lugar de cinco.**

---

## PARTE 2 — DOS VECES GANÓ EL DISCO AL PAPEL

- **La entrada del plan dice «1 slide, 6 items».** Cierto **como material de QA**; el corpus
  tiene **13 ítems en 3 diapositivas**.
- **No se declara huella mínima, y la razón es del mecanismo:** sobre 100 escenas el ancho nunca
  falla y con tramo de dos filas cabe siempre, así que declarar `{rows: 2}` **habría rechazado
  la propia diapositiva del corpus**, que cabe con 97 px de sobra.

---

## PARTE 3 — `description` OBLIGATORIA: QUÉ ES Y QUÉ NO

**No es reparar el defecto incondicional del motor** —que sigue sin tocarse y nombrado— sino
**cerrar la puerta del esquema**, por la misma razón medida que en la Nota destacada: el motor lo
interpola sin condición, así que sin el campo **la diapositiva pinta la palabra `undefined`**.

**Coste medido:** un ítem de staging sin `description` deja de entrar verbatim por «Insertar
JSON». **Ese ítem hoy pinta `undefined`.**

**La cabina lo recomendó y el operador aceptó la recomendación.** Queda registrado como
**aceptado POR RECOMENDACIÓN y no con sus palabras**, y es barato de revertir.

---

## PARTE 4 — EL CAMBIO DE MODELO, Y ES LO MÁS IMPORTANTE DEL TURNO

**El operador propuso que el tamaño se escale solo según el hueco.** La cabina le nombró la
consecuencia que no se ve: **son DOS ideas separables**, y la segunda —«que use el máximo
disponible»— **haría que la celda decidiera el tamaño y el peldaño dejara de decidirlo**, lo que
vaciaría de sentido las tablas ancladas y su propia regla «Mediano es lo que ya ves». **Y sería
lo más parecido al «Automático» que él mismo pidió quitar dos veces.**

Se le dibujaron tres salidas y **eligió la B**, que era también la recomendación de la cabina:

> **EL PELDAÑO PASA A SER EL TECHO.** Si cabe, se pinta el peldaño. Si no cabe, el texto baja
> hasta caber. **Y nunca sube por encima del peldaño.**

**ESTO SUSTITUYE SU PROPIA DECISIÓN «D» DEL 2026-08-18** —la celda se ajusta al contenido—, que
era el modelo contrario. El texto de `RUN-CANTU-SLIDE-CELL-GEOMETRY-FIT-001` **no se borra**:
explica de dónde viene el run y qué se midió, pero **ya no manda**.

---

## PARTE 5 — LA CABINA CAMBIÓ SU PROPIA RECOMENDACIÓN, Y LO DIJO

Dos turnos antes había recomendado **no adelantar** la geometría, para decidirla con diez casos
de evidencia en vez de dos. **Ahora recomendó lo contrario y explicó por qué:**

**Lo que cambió no es la cantidad de evidencia, sino el modelo.** Cada componente que se admita
de aquí en adelante se calibraría contra un modelo **que está a punto de cambiar**, y habría que
recalibrarlos todos.

**El run de geometría pasa de `#133` a `#127`.** `move` con `remap` publicado: **7 runs
desplazados**.

**Y por lo mismo NO se recalibró el texto de la Regla**, que es lo primero que el operador
reportó: si el peldaño pasa a ser un techo, esa calibración se rehace.

---

## CERRADO SIN EJECUTAR LA QA PASO A PASO, Y SE DECLARA

El operador autorizó el cierre para adelantar la geometría. **Los cinco pasos de QA no se
ejecutaron uno a uno.** Es legítimo —el defecto que vio no es de este run— pero **no es legítimo
callarlo**: la superficie que queda sin mirar paso a paso es **el formulario de este
componente**.

**Es el segundo cierre de esta cadena sin QA completa**, tras `#119`.
