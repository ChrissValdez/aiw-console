# PARADA DE ANÁLISIS — `RUN-CANTU-EDITOR-JSON-IMPORT-SILENT-DROP-001`

> `queue_order` **140** al medirse · «Make the JSON import name what it drops instead of dropping
> it in silence»
> Celebrada por la CABINA el **2026-08-27**. El run sigue `planned` y **no se emitió encargo**.

---

## UN FALLO DE LA CABINA, ANTES DE NADA

**La cabina le recomendó al operador abrir `#140` sin haber leído su `full_description`.** El run
**lleva una parada de análisis dentro** y por tanto **no empieza con un ticket**. Se corrigió antes
de abrirlo, pero la recomendación salió mal dada. **Regla: leer el texto del run ANTES de
recomendarlo, no al ir a emitir el ticket.**

---

## LA PREGUNTA QUE EL RUN MANDA CONTESTAR

> *«¿la puerta debe RECHAZAR una clave desconocida, o ADMITIRLA Y NOMBRARLA como aviso?»*

Y manda **censar cuántos borradores arrastran claves desconocidas antes de proponer nada**, porque
rechazar puede romperlos.

---

## EL CENSO — Y LA RESPUESTA ES LIMPIA

**Método, y no es un `grep`:** pasar cada borrador por su esquema y comparar **entrada contra
salida**. Zod, al no ser estricto, **descarta** lo que no conoce; toda clave presente en la entrada
y ausente en la salida **es una clave que hoy se está borrando en silencio**. No depende de saber
qué claves existen: las descubre.

```
borradores censados: 11
borradores QUE ARRASTRAN al menos una clave desconocida: 0
claves descartadas en total: 0
```

**RECHAZAR NO ROMPE NINGÚN BORRADOR DEL CORPUS.** El riesgo que el run temía **no existe hoy** en
la carpeta de borradores.

### Pero `problem` sí existe — y no donde el run lo buscaba

El run cita `problem` de `stackSlide` como la clave muerta que Zod descarta a propósito. Medido:

- **en borradores (`.json`): 0 apariciones.**
- **en contenido ya construido (`.js`): 4 ficheros** — `sandbox/test_math_walkthrough.js`,
  `staging/Aritmetica/1_propiedades_numeros_slide.js`, `staging/…/L02_Web_Valor_Absoluto.js` y
  `staging/…/L02_S2_Web_ejemplo_guiado_web.js`.

**Eso parte la pregunta en dos, y es lo que más cambia el encuadre:** el contenido construido **no
pasa por la puerta del importador**. Endurecer esa puerta no lo toca. Endurecer **la de la previa**
sí podría, y **eso NO se ha medido**.

---

## UN FALLO DE SONDA PROPIO, PUBLICADO

La sonda que debía **reproducir el defecto** —una `card` con `accentColor` saliendo desnuda con
`ok:true`— **no lo consiguió**: ningún esquema exportado acepta un bloque suelto, porque los
bloques se validan **dentro** de un borrador. **La cabina NO ha reproducido el defecto en esta
parada.** Se sostiene sobre la medición de la cabina anterior **y sobre un hecho que no es una
medición: le costó dos rondas al propio operador el 2026-08-26.**

**El taller que tome este run debe reproducirlo primero**, con el bloque dentro de un borrador, y
reportarlo. **Si no lo reproduce, para.**

---

## LAS OPCIONES, CON SU COSTE MEDIDO

| | qué hace | borradores rotos | toca la previa |
|---|---|---|---|
| **A** | la puerta del **importador** RECHAZA la clave desconocida, nombrándola y diciendo la forma buena | **0, medido** | no |
| **B** | el importador ADMITE y **NOMBRA** lo que descartó | 0 por construcción | no |
| **C** | **las dos puertas** rechazan | 0 en borradores · **sin medir en la previa** | **sí — riesgo `problem`** |
| **D** | A en el importador + B en la previa | **0, medido** | sólo para avisar |

**Por qué A pesa más que B:** lo que este run repara no es una molestia de forma, es que
**«pasó la puerta» es la garantía sobre la que se apoya TODO el material de QA del proyecto**. Un
aviso se puede ignorar; **un rechazo convierte un verde falso en un rojo**, que es exactamente el
failure mode más caro que este proyecto tiene documentado.

**Por qué C no se recomienda hoy:** `problem` vive en cuatro ficheros de contenido construido y
**nadie ha medido si cruzan la puerta de la previa**. Elegir C sin esa medición es decidir sobre
un hueco.

---

## LO QUE ESTA PARADA NO DECIDE

- **Si la puerta de la previa debe endurecerse.** Falta medir si el contenido construido la cruza.
- **Qué se hace con `problem`.** Es una clave muerta declarada, y retirarla es otra conversación.
- **Nada de los esquemas.** Admitir las formas malas está fuera de alcance por el propio run: la
  forma buena es la que produce `blockFactory`.
