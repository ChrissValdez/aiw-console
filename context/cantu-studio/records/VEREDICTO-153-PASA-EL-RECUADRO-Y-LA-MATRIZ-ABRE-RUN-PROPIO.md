# VEREDICTO DE QA de `#153` — el recuadro PASA; el modo matriz abre run propio

> Dado por **Christopher Valdez Cantu** el **2026-08-28**, con **dos capturas** puestas lado a
> lado: el modo matriz de **Web** y el de **diapositiva**. **Verbatim.**

---

## VERBATIM

> **«jalo bien todo menos matriz»**
>
> **«mira lo que pone web y lo que pone slide»**
>
> **«no muestra todos los pasos y no deja poner descripcion de cada paso»**

Y sobre qué hacer con ello:

> **«si procede»** — sobre la recomendación de **cerrar el `#153` y abrir un run propio para el
> modo matriz**.

**LAS CAPTURAS:** en **Web**, tres pasos con **título y descripción** cada uno —«1. PRIMER PRIMO ·
El 2 no divide a 45.»— y la progresión de filas acumulando tachados. En **diapositiva**, cuatro
filas que repiten la misma y un panel derecho con **«PASO» y una raya vacía**.

---

## LO QUE PASÓ, Y ES LA IDENTIDAD DEL RUN

**Las cuatro colocaciones del recuadro funcionan y el operador las aprobó en pantalla.** Eso es
literalmente lo que el `run_id` nombra: *enseñar al motor a leer la colocación del recuadro*.

**Y lo hizo tras una ronda perdida que fue culpa de la cabina** —partir el alcance en dos— y otra
que probablemente midió contra un servidor de desarrollo viejo.

## LO QUE NO SE ENTREGÓ, Y SE DECLARA EN VEZ DE COLARSE

**La mitad de matriz.** Entró por ampliación bajo D-061 como *«copiar los menús de matriz de
Web»*, **y lo que falta no son menús.**

**MEDIDO POR LA CABINA EL 2026-08-28 — y es la razón de que sea un run y no un remate:**

    WEB    ArithmeticMatrixStepSchema:  label · nums · div · status · desc · finalResult
    SLIDE  SlideArithmeticStepSchema:   label · nums · div · status ·        finalResult
                                                                       ↑ NO EXISTE

- En Web, **`desc` es OBLIGATORIO** y el motor lo pinta como prosa del paso.
- En diapositiva **el campo no existe en el esquema**, y el motor **sólo interpola `step.label`**
  (`renderArithmetic.js:467`). Por eso se ve «PASO» y una raya vacía.

> **«No deja poner descripción» no es un fallo del formulario: es que el campo no existe en el
> carril.** Es la misma familia que `resultBox` antes de que él lo pidiera — **una capacidad que
> el motor de diapositiva no tiene** — y abrirla toca los tres sitios: esquema, motor y formulario.

**LA SEGUNDA MITAD NO SE DIAGNOSTICA:** que diapositiva repita fila donde Web progresa **no está
medido a fondo**, y no se publica una causa. **Lo mide el run nuevo.**

---

## POR QUÉ RUN PROPIO Y NO UNA TERCERA ENMIENDA

El `#153` ya se enmendó **dos veces**. Meter esto dentro sería **la tercera identidad distinta
bajo el mismo identificador**, y la regla de este proyecto es explícita: cuando el alcance cambia
así, **el run se cierra y se abre otro** — enmendar un `run_id` deja la identidad mintiendo en
todos los records futuros.

**Y el operador lo aprobó por escrito.**

## EL ORDEN — decisión de cabina bajo D-071, explicada

Entran **dos** runs por delante del `#149`, en este orden:

1. **La salida de diapositiva** — hoy «Generar Slide» no produce fichero y **no existe
   `/api/build/slides`**, mientras Web sí lo tiene. **Un carril sin salida vale menos que un
   carril con un componente a medias.**
2. **El modo matriz de diapositiva**, con Web como referencia cerrada.

**Es reversible: mover un run cuesta un `remap`.**
