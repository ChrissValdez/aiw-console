# Retiro del icono derivado del color — «Nota desplegable» (`details`) — `cantu-studio`, `queue_order` 32

> Encargo de taller sobre `RUN-JAME-WEB-DETAILS-REPAIR-001`, título `Audit and implement the Details component`, `status` `active`.
> **Ningún status se cambió.** `.project/` no se re-emitió. **Git no se ejecutó.** Ningún run se insertó, movió ni renumeró. **Ningún borrador se editó.**
> Tercer record sobre este componente: `REVALIDACION-COMPONENTE-NOTA-DESPLEGABLE-CANTU.md` fue la auditoría, `REPARACION-SELECTOR-DE-ICONO-NOTA-DESPLEGABLE-CANTU.md` la reparación, y este es el retiro que cierra el modelo.

**Titular:** el operador **eliminó un estado en vez de añadir una afordancia**. Su veredicto de QA anuló una parada del taller y **redujo** el alcance: donde el encargo pedía tres estados y una interfaz nueva para navegarlos, quedaron dos estados y **menos** código del que había.

---

## 1. Qué reveló la QA humana

El check 25 del packet de la ronda 2 declaraba un límite conocido: elegir **«Sin icono»** en el control no quitaba el icono, sino que devolvía el detalle al icono derivado del token de color. El check 26 declaraba su otra cara: un detalle sin icono elegido se rotulaba «Sin icono» en el control mientras la pantalla mostraba uno.

El operador ejecutó los dos, los confirmó, y respondió:

> «no quiero volver a modo automatico del icono derivado del color, si no escojo icono entonces no aparece icono; ese modo automatico es precisamente el error»

**Eso reclasificó el estado.** El icono derivado del color no era compatibilidad que hubiera que conservar: era la modalidad vieja, el defecto que la QA de la ronda 1 había registrado en sus checks 6 y 7. Conservarlo como respaldo silencioso era conservar el defecto en un rincón.

---

## 2. Por qué el control necesitaba tres estados, y por qué dejó de necesitarlos

El taller había parado el turno anterior con una pregunta de forma de interfaz. La cadena del razonamiento era:

1. `IconPicker` tiene **dos** estados: un icono elegido, o vacío. Su `handleSelect` (`IconPicker.jsx:90`) traduce «Sin icono» a vacío.
2. En «Tarjeta» vacío **significa** «sin icono», y es correcto.
3. En «Nota desplegable», mientras existió la derivación, vacío significaba **«deriva el icono del color»**. Dos significados no caben en un estado.
4. Por tanto el componente necesitaba **tres** estados, y el tercero —volver a «Automático»— exigía una afordancia que no existía: la lista del desplegable la construye `getCardIconOptions`, que devuelve exactamente **37** entradas y ninguna emite el estado vacío una vez que «Sin icono» pasara a escribir `'none'`.
5. El taller presentó cuatro formas posibles con su coste y **paró**, porque el encargo le prohibía elegir la forma de la interfaz.

**El operador no eligió ninguna de las cuatro. Eliminó el paso 3.** Sin derivación, vacío vuelve a significar «sin icono», igual que en «Tarjeta», y el problema desaparece en vez de resolverse.

**Consecuencia medible: `IconPicker.jsx` y `IconSelectField` no se tocaron.** El encargo anterior pedía una prop nueva en cada uno; no hizo falta ninguna. Las dos conductas que la ronda 2 documentó como defectuosas son ahora las correctas:

| Punto | Qué hace | Por qué ahora es correcto |
|---|---|---|
| `IconPicker.jsx:90` | Al elegir «Sin icono» escribe el campo vacío | Vacío **es** «sin icono». La distinción que lo rompía ya no existe |
| `WebBlockEditor.jsx:899` | Con el campo vacío rotula «Sin icono» | Dice la verdad: ese detalle no lleva icono |

---

## 3. Por qué esta ampliación no era un run nuevo

**Cae sobre la pieza cuya limitación este mismo run levantó.** La derivación por color en `renderDetails.js` la introdujo la ronda 2 de este run, en `resolveItemIcon`, como rama de compatibilidad. La ronda 3 la retira. Es la misma función, escrita por el mismo run, corregida por el veredicto de la QA que el propio run encargó.

Y el `full_description` del canónico lo cubre literalmente: *«Repair only what the audit and human visual QA show to be a real defect»*. La QA humana señaló este comportamiento como defecto. Repararlo es la instrucción, no una ampliación.

**Además el alcance se redujo**, que es lo contrario de lo que suele justificar un run nuevo:

| | Encargo anterior (retirado) | Lo que se hizo |
|---|---|---|
| Archivos de código | 2 (`IconPicker.jsx`, `WebBlockEditor.jsx`) | 2 (`renderDetails.js`, `compiler.js`) |
| Props nuevas | 2, con valor por defecto retrocompatible | **0** |
| Afordancia de interfaz nueva | 1, forma por decidir | **0** |
| Estados del control | 3 | **2** |
| Líneas netas | más | **menos** |

---

## 4. Qué se cambió

**Dos archivos de código.**

### 4.1 `src/builders/web/partials/renderDetails.js`

`resolveItemIcon` (**32-36**) pierde la rama de derivación y queda con la misma forma que `getIconSvg` de `renderCard.js:23-26`:

```js
const resolveItemIcon = (item) => {
    if (!item.icon || item.icon === 'none') return '';

    return Commons.ICONS[item.icon] || '';
};
```

El comentario de cabecera (**23-31**) se reescribió: describía la conducta contraria. El punto de uso (**82**) pierde el segundo argumento.

**`roleConfig` se queda.** Sigue en uso en **78** para `paletteConfig`, del que sale `mainColor`. Lo único que desapareció es la lectura de `roleConfig.icon`. **El filete y el tinte del icono siguen tomando el token de color**, así que el check 1 de parada del packet de la ronda 2 sigue vigente.

**`Commons.VARIANTS` no se tocó.** Conserva sus **13** claves —`def, ctx, ex, meta, focus, str, res, success, wrn, warning, err, error, code`— y todas mantienen su campo `icon`. «Nota desplegable» solo dejó de leerlo.

### 4.2 `tools/author-lite/compiler-api/services/compiler.js`

**Decisión del criterio 5: colapsar, no conservar la distinción.**

La ronda 2 había hecho que `'none'` sobreviviera al compilador precisamente porque entonces significaba algo distinto de ausente. Ya no. Las dos salidas se midieron:

| Opción | Qué diría el código |
|---|---|
| **Conservar** la distinción | Emitiría un campo `icon: 'none'` que el renderizador ya no distingue de su ausencia. El objeto compilado afirmaría una diferencia **sin ninguna consecuencia aguas abajo**. El código mentiría, y el comentario que lo justificaba —«`'none'` tiene que sobrevivir»— sería falso |
| **Colapsar**, como «Tarjeta» | Ausente y `'none'` producen un objeto **byte a byte idéntico**. El renderizador recibe una sola forma. El código dice lo que hace |

**Se colapsó.** `buildDetailsIconOutput` (**437-441**) queda:

```js
const buildDetailsIconOutput = (icon) => {
  assertKnownDetailsIcon(icon);

  return icon && icon !== 'none' ? { icon } : {};
};
```

**`assertKnownDetailsIcon` (427-431) se conserva íntegro**, que era la restricción dura: es lo único que rechaza un identificador inexistente, y el check 28 depende de ello. Verificado: un `icon` inventado sigue lanzando `[Compiler] Icono de details no permitido: no_existe.`

**No hizo falta tocar nada de «Tarjeta».** `buildCardIconBadgeOutput` y `assertKnownCardIcon` son funciones aparte; el colapso ocurre en la de `details` y su mensaje sigue nombrando al componente correcto.

---

## 5. Los 10 detalles que pierden icono

**Remedido contra el código nuevo, no heredado de rondas anteriores.**

| Medida | Valor | Unidad |
|---|---|---|
| Archivos `.json` escaneados | **26** | archivos |
| Bloques `kind: "details"` | **4** | bloques |
| Ítems de detalle | **10** | ítems |
| Ítems **sin** campo `icon` | **10** | ítems |
| Ítems **con** campo `icon` | **0** | ítems |
| Ítems que **pierden** su icono | **10 de 10** | ítems |
| Bloques que siguen validando | **4 de 4** | bloques |

**Los tres archivos afectados:**

- `cantu-lessons/drafts/web/sandbox_reproductions/bounded/sandbox_theory.web.draft.json` — 1 bloque, 4 ítems
- `cantu-lessons/drafts/web/sandbox_reproductions/bounded/sandbox_theory_bounded.web.draft.json` — 1 bloque, 4 ítems
- `cantu-lessons/drafts/web/test_web/test_web/test_web.web.draft.json` — 2 bloques, 2 ítems

Los tres son borradores de sandbox y prueba, no contenido de autor. **El operador decidió con el número delante.** **No se editó ninguno**: el encargo lo puso fuera de alcance explícitamente, y escribirles un `icon` para conservarles el aspecto habría sido justo lo contrario de lo que el veredicto pedía.

Como **0** ítems del corpus traen `icon`, no hay nada que comparar en la otra dirección: ningún detalle guardado cambia de icono, solo lo pierden los que lo derivaban.

---

## 6. Cómo se demostró que «Tarjeta» no cambia

No por afirmación. Contra la **línea base capturada antes de tocar nada** en el turno anterior, exigiendo igualdad de cadena:

| Caso | Resultado |
|---|---|
| `card` con `icon` ausente | **Idéntico** byte a byte |
| `card` con `icon: 'none'` | **Idéntico** byte a byte, y sigue descartando el `'none'` |
| `card` con `icon: 'star'` | **Idéntico** byte a byte, conserva `"icon":"star"` |
| Huella de la lista de opciones | **37** entradas, **orden exacto idéntico** |
| Pruebas de `compiler-api/tests` | **436 de 436** pasan, **0** modificadas |
| `npm run lint` en `editor-ui` | limpio |

---

## 7. Verificación de la reparación

| Comprobación | Resultado |
|---|---|
| Ausente y `'none'` dan el **mismo objeto compilado** | **10 de 10** casos: los 9 tokens semánticos (`def, ctx, ex, meta, focus, str, res, wrn, err`) más un hex personalizado |
| Ausente y `'none'` dan el **mismo HTML** | **10 de 10** casos |
| Ninguno de los dos pinta icono | **10 de 10** casos |
| Sin icono: `<div>` vacío residual | **ninguno**; el primer hijo del contenedor flex es el `<span>` del texto |
| Sin icono: chevron | **intacto**; queda **1** `<svg>` en la barra, el del chevron |
| Con icono: barra completa | **2** `<svg>`, el del icono y el del chevron |
| Filete por token de color | `def #B48EAD`, `ctx #5E81AC`, `wrn #D08770`, `res #A3BE8C`, hex `#FF007F` — **sin cambios** |
| Icono elegido toma el tinte del color | sí, `#D08770` con `wrn` |
| `renderDetails` lee `roleConfig.icon` | **no**, retirado |
| `renderDetails` usa `roleConfig` para el color | **sí**, se deja |
| Identificador inexistente | **rechazado** en el esquema y en el compilador |
| `icon: 'none'` en el esquema | **aceptado**, sigue siendo un valor válido del enum |

---

## 8. Estado en que queda `#32`

- **`status` sigue `active`.** Lo cierra la cabina desde la consola.
- **La mitad *icon selector* del defecto registrado queda cerrada.** Ya no hay esquina pendiente: los checks 25 y 26 de la ronda 2, que se declaraban como límites conocidos, **se resuelven** en la ronda 3.
- **El packet de la ronda 3 tiene 10 checks**: el **19** con la expectativa invertida y declarada como tal; el **25** y el **26** reescritos para pasar; los **6, 7, 23, 24** como regresión del icono independiente del color; el **28** como regresión de la guarda del identificador; el **31** nuevo, de hueco muerto; y el **32** nuevo, de que «Tarjeta» no cambió.
- **Sigue enrutado y sin tocar**, igual que tras la ronda 2: la mitad *naming* con el nombre de fábrica «Detalles»; los **7** esquemas Web sin `.strict()`; el `case 'details'` muerto del motor de diapositivas; y la decisión *group-vs-single*, abierta desde la ronda 1.
