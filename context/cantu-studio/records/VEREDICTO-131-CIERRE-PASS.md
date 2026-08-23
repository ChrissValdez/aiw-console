# VEREDICTO DE CIERRE — `#131` «Anatomía de fórmula»

> Veredicto del operador **Christopher Valdez Cantu**, 2026-08-22, sobre la QA de la ronda 1.
> Guardado **VERBATIM** antes de cerrar el run.

---

## SUS PALABRAS, SIN TOCAR

Primero:

> sigue sin aparecer el dropdown con los separadores de terminos

Y a continuación:

> se ve bien pass

Confirmó después, a pregunta de la cabina, que el «pass» cubre **los quince pasos**, no solo
el desplegable.

---

## LA FALSA ALARMA, Y POR QUÉ NO ERA UN FALLO

La cabina midió antes de tocar nada.
`SlideConceptGridFields.jsx:220` — CÓDIGO:

    {grupo.sign ? (
      <div className="my-2">
        <SignoDeConexion ... />

**El desplegable se monta ENTRE términos, no por término.** El primer grupo no tiene signo
delante, así que:

| celda | términos | desplegables visibles |
|---|---|---|
| «Monomio» | 1 | **cero** |
| «Trinomio» | 3 términos + 2 signos | dos |

Es **idéntico a Web** (`WebBlockEditor.jsx:3465-3473`, misma condición). No es un defecto y no
se reparó nada.

> **LO QUE SÍ FALLÓ FUE EL PACKET.** El paso 7 mandaba abrir «Trinomio» pero el paso 10 decía
> «mira la zona TERMINOS» sin advertir que **con un solo término no aparece ninguno**. El
> operador miró y no vio lo que el paso le prometía. **Un paso de QA que no dice cuándo el
> control NO debe aparecer fabrica un rojo.**

---

## LO QUE ESTE VEREDICTO NO CONTIENE, Y SE DECLARA

**Es un veredicto GLOBAL, no paso a paso.** No hay BIEN/MAL/VETO por número. La cabina lo
preguntó explícitamente antes de cerrar y el operador confirmó el alcance completo, pero
**ningún paso individual tiene veredicto escrito**.

Consecuencia declarada: si más adelante aparece un defecto en cualquiera de los quince
puntos, **no se puede afirmar que la QA lo cubrió y lo aprobó**. Se sabe que él lo miró; no
se sabe qué vio en cada uno.

---

## LO QUE LA CABINA LE PUSO DELANTE ANTES DE QUE MIRARA

1. **Los rótulos de color del packet no existen en el repo.** «Malva», «Azul acero», «Verde
   Jade», «Dorado Arena» — el código etiqueta «Morado», «Azul», «Dorado». Vienen de su
   paleta configurada, que no vive en el repositorio y **la cabina no puede verificar**. Se
   le dijo que del paso 8 lo que importa es que sea SU paleta y que no esté «Automático», no
   los nombres.
2. **El arreglo del `fallbackId` no tiene guarda**, y el packet no lo declaraba como hueco.
3. **El nombre acierta y el tono no**, para un item importado sin color elegido — declarado
   en el código, `SlideConceptGridFields.jsx:142-146`.
4. **El arnés sigue sin artefacto** —segunda ronda— y su script declara 47 mutaciones frente
   a las 46 del packet.
5. **Seis de los quince pasos no dicen qué significa que fallen**, y los defectos invisibles
   fueron detrás de los pasos, al revés que en la ronda 0.

---

## UNA CORRECCIÓN DE LA CABINA, PUBLICADA IGUAL DE FUERTE QUE EL ACIERTO

La cabina midió que los bloques `terms` del corpus eran **cuatro** y declaró que **«la lista
estaba completa»**. **Eran ocho.** `showcase_library.js` barre la carpeta con `readdirSync` y
hace `require` de cada hermano, agregándolos otra vez.

La conclusión aguantó —solo `+` y `-`, riesgo de corpus nulo— pero **el recuento era corto y
se publicó como cerrado**. Lo corrigió el taller, midiendo.

Y en la otra dirección, la cabina corrigió al taller: **no es un «re-export»**. Es un barrido
de directorio. No hay línea de re-export que buscar, y quien fuera a buscarla no la
encontraría.

> Es la quinta forma de fallar de «Papel ≠ disco», en su variante de sondas: **una lista
> truncada leída como completa.** Van tres casos en dos sesiones.
