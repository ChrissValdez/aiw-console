# Las dos decisiones que el `#199` dejó abiertas — y por qué las dos van en la misma dirección

**Fecha:** 2026-09-15 · **Run:** `RUN-CANTU-DECLARED-HTML-BLOCK-AND-CODE-ESCAPE-001` (`#199`)
**Quién decide:** el operador. **Quién recomienda:** la cabina. **Las dos recomendaciones fueron aceptadas.**

---

## Por qué existe este documento

El taller **midió** las dos y **no decidió ninguna**, que es lo correcto: nombró y paró. Si la
respuesta del operador se queda en el chat, dentro de tres meses el `false` de una constante y
la ausencia de un `sandbox=` son indistinguibles de un descuido — que es **exactamente el
argumento con el que nació este bloque**.

---

## Decisión 1 · `<script>` SIGUE FUERA

> **Palabras del operador:** «Sigue rechazado».

**Dónde vive:** `tools/studio/editor-ui/src/features/editor/utils/declaredHtmlShape.js:141`

```js
export const DECLARED_HTML_ALLOWS_SCRIPT = false;
```

**Y `script` sigue en `TEXTO_CRUDO` aunque hoy se rechace** (`:87`), a propósito: el día que se
levante, el recorrido del balanceador tiene que seguir siendo correcto. La reversión es de
verdad un renglón, no una reescritura.

### La asimetría que decide, y no es «seguridad» en abstracto

**Negarse es reversible; admitir no lo es.** Levantar la constante mañana no rompe nada. Pero
si se admite hoy y se retira dentro de tres meses, lo que hay que retirar no es una constante:
son los `<script>` ya escritos dentro de lecciones guardadas, que al retirar la puerta **dejan
de validar** y rompen borradores del operador. La decisión barata se toma cuando es barata.

### Lo que la mantiene sin coste

**Ningún prototipo de maquetación necesita `script`.** El caso que originó la válvula — «quiero
probar una tabla nueva antes de pedir un componente» — es marcado y estilo. La puerta que se
mantiene cerrada no está bloqueando el flujo que la justificó.

### La lectura del taller queda RATIFICADA por esta decisión

> Rechazar `<script>` y a la vez admitir `<div onclick="…">` sería un rechazo que **no rechaza
> nada** — son dos ortografías de lo mismo. Por eso la mitad de ejecución entra **entera**.

El taller la declaró diciendo que el operador **no la pidió con esas palabras**. Al mantener el
rechazo, el operador mantiene también la mitad entera. **Queda ratificada, no supuesta.**

### Lo que NO decide esta decisión

**No contesta la parada 3, y no finge contestarla.** Moodle sigue siendo **DESCONOCIDO
DECLARADO**, y lleva **dos runs** así — `#198` lo diseñó, `#199` lo construyó y verificó su
premisa, y ninguno de los dos pudo subirlo. Lo único afirmable hoy: el artefacto sale **sin
filtrar** por las dos salidas (0 divergencias de 5, `<iframe>` incluido).

La sonda existe y espera:

> `QA/temp/RUN-CANTU-DECLARED-HTML-BLOCK-AND-CODE-ESCAPE-001/moodle-sonda.MOODLE.html`
>
> Subirla y pulsar los botones de tamaño de texto.
> · Si el texto **cambia** → Moodle **no** sanea `<script>`.
> · Si **no cambia** → Moodle lo sanea, **y esa función lleva runs muerta**.
>
> **Hallazgo en los dos casos**, que es lo que la hace barata.

**El operador descartó abrir un run para esto ahora.** No es olvido: hace falta una instancia
suya, y no hay lección publicada. Queda como **deuda nombrada sin run**, y se cobra sola en
cuanto publique la primera.

---

## Decisión 2 · `<iframe>` ENTRA, NOMBRADO COMO DEUDA

> **Palabras del operador:** «Pasa tal cual, nombrado como deuda».

**Estado medido:** pasa la guarda de forma, no lo caza `containsUnsafeCodeText`, y llega
**entero** al `MOODLE.html`.

### La asimetría con `renderVideo`, que es real y se declara

`renderVideo` emite iframes **con `sandbox=` y `referrerpolicy=` acotados**. Este bloque **no
añade ninguno**. Los dos emiten iframes y **no se tratan igual**. Eso es una deuda con nombre,
no un empate.

### Por qué entra igual

**Poner `sandbox` sin `allow-scripts` mata exactamente lo que la válvula existe para permitir**
— GeoGebra, Desmos, un visor incrustado — y afinarlo permiso a permiso es **una decisión de
producto que nadie ha tomado**. Sería inventar un número, que es el error que el propio `#199`
se negó a cometer con el tope `.max(N)` del campo `html`.

### Y la diferencia con `script` que hace coherentes las dos decisiones

`<iframe>` **no ejecuta nada en el origen de la lección**: lo que corre dentro corre en el
origen del tercero. `<script>` corre **en el de la lección**. No son la misma cosa y por eso no
reciben la misma respuesta — la coherencia está en la frontera de origen, no en «etiquetas
peligrosas».

### Cuándo se vuelve a mirar

**Con Moodle medido**, en el mismo movimiento que `<script>`. Si Moodle sanea, las dos
decisiones cambian de terreno a la vez.

---

## Lo que queda escrito para poder revocar

| | hoy | dónde se revoca | coste de revocar |
|---|---|---|---|
| `<script>` | **fuera** | `DECLARED_HTML_ALLOWS_SCRIPT` | un renglón |
| event handlers, `javascript:`, `data:text/html` | **fuera** | `containsUnsafeCodeText` | guarda compartida — **no se toca sin run propio** |
| `<iframe>` | **dentro, sin `sandbox`** | no hay constante: haría falta añadir la regla | un run |
| tope de tamaño del campo `html` | **ninguno** | nadie lo ha decidido | — |

**Las tres ausencias de arriba están escritas CON SU RAZÓN.** Es la lección del `#197`: una
ausencia sin razón escrita y un olvido son indistinguibles.
