# VEREDICTO — `#134` «Make the author palette win over the engine fixed colour tables»

> Dado por **Christopher Valdez Cantu** el **2026-08-26**, sobre la QA visual de la enmienda
> D-061 tras su segunda ronda. Se guarda VERBATIM, con sus palabras y sin resumir.

---

## EL VEREDICTO, VERBATIM

> *«jala y me gusta, solo que quiero lo mismo en anatomia de formula*
>
> *el texto del rotulo no que tenga color automatico sino que sea por default blanco con la*
> *opcion de personalizado igual que aqui»*

**Es una APROBACIÓN con una petición SEPARADA.** Lo aprobado es «Procedimiento matemático»: sus
dos mandos, el título negro por defecto, el número blanco fijo y el paso de resultado cayendo
solo en «Personalizado» con su verde. Lo pedido es **otro componente**, y por decisión suya del
mismo día va a **run propio**, no a una tercera enmienda de `#134`.

## LO QUE LA QA EJERCITÓ

Los siete pasos del guion, sobre el payload derivado de `blockFactory`:

1. «Color del título» ofrece sólo **Negro · Personalizado**; «Automático» no existe.
2. El título del paso se ve **negro**, no gris.
3. «Color del número de paso» ofrece sólo **Blanco · Personalizado**.
4. El número se ve **blanco** sobre cualquier token de su paleta.
5. El paso de resultado salta solo a **«Personalizado»** con el **verde** ya puesto.

**Ninguno volvió `mal`.**

## LA DECISIÓN DE ENCUADRE, TOMADA EL MISMO DÍA

La cabina le dibujó tres opciones con su coste medido y **eligió B: run propio**.

**Razón que pesó, y estaba medida antes de preguntarle:** lo de «Anatomía de fórmula» **no es
copiar el mando**. `renderConceptCard.js:72` guarda una **tabla privada de seis colores cuyos
hexes son los de ANTES de la migración** —`def` en `#B48EAD` contra el `#9B6FA5` migrado, y así
los seis—. El propio fichero declara esa asimetría y dice que el lote 2 no la tocó a propósito.
Así que ahí hay un canal que abrir **y** una tabla que decidir: es una segunda migración, no un
mando repetido.

## LO QUE QUEDA DECLARADO Y NO REPARADO, con su aprobación

- **`res`** (`#87A96B`) se queda en 2,04:1 con blanco. Aprobado explícitamente: darle tinta
  obligaría a escribir un hex nuevo en la tabla que este run vino a retirar.
- **`P4` del procedimiento** se retiró como afirmación de contraste — opción **A** del operador,
  el mismo día— y se sustituyó por guardas que afirman **la decisión**. Su coste se le dijo
  antes: a partir de ahora **nada avisará** si un token futuro deja el número ilegible; la
  guarda es su ojo. Miró su paleta entera antes de decidirlo.
- **La consolidación de los dos hexes del verde** en `tokens.js` queda nombrada como trabajo de
  `#136`, y no se hizo aquí a propósito: escribir en ese fichero antes de que `#136` decida su
  destino habría fabricado trabajo que `#136` tendría que deshacer.

Criterio de borrado: lo sustituye un veredicto posterior del operador sobre la misma superficie.
