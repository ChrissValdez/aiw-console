# VEREDICTO DE QA de `#153` — **FAIL** — tres defectos, y las cuatro colocaciones vuelven

> Dado por **Christopher Valdez Cantu** el **2026-08-27**. **Verbatim.**
> **ES LA NOTA QUE PIDIÓ DEJAR** antes de irse a correr: *«deja la nota de todas estas correcciones
> para cuando acabemos el siguiente run»*. **El `#153` NO se cierra y queda `active`.**

---

## VERBATIM

> **«si aparecen esas dos opciones pero deberian ser 4 igual que en web / faltan dos / faltan
> antes de = y las dos mitades»**
>
> **«ademas sin recuadro no jala porque le pico a sin recuadro y sigue apareciendo el recuadro /
> osea que no jala igual que en web»**
>
> **«ademas si pongo modo matriz sigue imprimiendo modo factorizacion»**
>
> **«y de nuevo basate en los comandos y diseño del componente en web para crearlo aca / no se ve
> igual los menus de matriz que en web»**
>
> **«Y en web los puli bastante en su momento por eso que los tome de referencia»**

---

## 1 · LA PARTICIÓN EN DOS FUE UN ERROR, Y ERA MÍO

La cabina recomendó partir el alcance —`after` y `none` ahora, `before` y `both` nombradas y sin
abrir— **y el operador aceptó esa recomendación**. Al verlo en pantalla la rechaza: **quiere las
cuatro, como en Web.**

**El coste medido sigue siendo cierto** —`before` y `both` exigen partir `lead` y `eq` en el
`parseResult` de diapositiva y chocan con la palanca `menor: 10/13` del autoajuste—. **Lo que
estaba mal era la conclusión, no la medición:** se leyó ese coste como razón para no hacerlo,
cuando el operador lo que quiere es **paridad con Web**, y la paridad no admite media tabla.

**Consecuencia para el run:** vuelve a las cuatro colocaciones. **El enum de dos valores del
esquema, el desplegable de dos opciones y el conjunto cerrado del motor —que hoy hace caer
`before` y `both` en `after`— TODOS tienen que abrirse.** Es un cambio de alcance y lo pide él por
escrito, así que la enmienda del texto del run va con el ticket de corrección.

## 2 · «SIN RECUADRO» NO APAGA EL RECUADRO — DEFECTO REAL

**Y es el defecto que este proyecto ya sabe cómo se produce:** se midió en el HTML y no en la
pantalla. El taller reportó que `none` cambia una línea —`j-res-box` → `j-res-pre`— y **es cierto
en el marcado**. En pantalla, el recuadro sigue.

**Lo que la cabina midió el 2026-08-27, y NO alcanza para diagnosticar:**

- `mitadDelPie(texto, enRecuadro)` elige la clase correctamente (`renderArithmetic.js:261`).
- El CSS de `.j-res-pre` **no lleva borde ni fondo** (`:201`); el de `.j-res-box` sí (`:202-208`).
- **Así que la clase, si llega, apaga el recuadro.** El fallo está **entre el control y `data`**.

**NO SE PUBLICA UN DIAGNÓSTICO.** El run de corrección **mide sobre la superficie real, con lo que
crea el botón**, y sólo entonces dice dónde se pierde.

## 3 · EL MODO MATRIZ SIGUE PINTANDO FACTORIZACIÓN

**Medido: el motor SÍ ramifica.** `renderArithmetic.js:335` entra por `data.mode === 'factorization'`
y `:369` por `data.mode === 'matrix'`. Y el formulario lee el modo (`SlideArithmeticFields.jsx:568`).
**Así que las dos puntas existen y algo se pierde en medio.**

**⚠ Y HAY UNA PISTA QUE CONECTA ESTE DEFECTO CON EL ANTERIOR, y va como HIPÓTESIS, no como
hallazgo:** la resolución de la colocación está condicionada al modo —
`data.mode === 'factorization' ? … : undefined` (`:318`)—. **Si `data.mode` no llegara como el
autor lo eligió, los dos síntomas saldrían del mismo sitio.** **Se mide, no se concluye.**

**Y NO SE SABE SI ES REGRESIÓN DE ESTE RUN.** Nada de lo que tocó el `#153` escribe `mode`.
**Puede ser anterior.** El run de corrección lo comprueba contra el commit previo antes de tocar
nada.

## 4 · LOS MENÚS DE MATRIZ NO SE VEN COMO LOS DE WEB

> **«en web los pulí bastante en su momento, por eso los tomé de referencia»**

**Es la misma dirección de toda esta tanda** —«los campos de Web están pulidos, hay que
traerlos»— aplicada ahora al **modo matriz**, que hasta hoy nadie había mirado. **El run de
corrección toma el formulario de matriz de Web como referencia, campo a campo y control a
control**, igual que se hizo con los rótulos.

---

## LO QUE SE HACE Y LO QUE NO — instrucción suya, literal

> **«no mandes ticket de correccion del actual hasta que vuelva»**
> **«el actual no lo cierres, deja ambos active»**

- **El `#153` se queda `active`.** No se cierra con FAIL ni se enmienda su texto todavía.
- **NO se emite el ticket de corrección.** Espera a que vuelva.
- **Se abre el siguiente run en paralelo**, y esta nota es lo que él pidió que quedara escrito.

**LA COMPROBACIÓN QUE AUTORIZA EL PARALELO, Y SE HACE MIDIENDO:** dos carriles sólo son paralelos
si sus superficies de escritura son disjuntas. El `#153` escribe motor de diapositiva, esquemas,
formulario y pruebas; el run que se abre **es de MEDICIÓN y sólo escribe en `QA/temp/`**. **Son
disjuntas.** Y la escritura de la cabina en el canónico toca únicamente el registro del run nuevo:
**se verifica campo a campo que ningún campo del `#153` se mueve.**
