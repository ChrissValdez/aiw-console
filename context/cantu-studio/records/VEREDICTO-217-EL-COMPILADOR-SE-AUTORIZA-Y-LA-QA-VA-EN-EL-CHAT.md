# #217 · Dos decisiones del operador: se autoriza el compilador, y la QA va siempre en el chat

**Fecha:** 2026-09-30 (UTC) · **Run:** `#217` `RUN-CANTU-WEB-PROSE-GATE-STEP-DETAILS-AND-UNCLOSED-COMMENT-001`
«Web step details and rule descriptions take the published format, and an unclosed comment stops passing the gate» · sigue `active`, esperando su QA.

---

## Las palabras del operador, verbatim

> haber dame los pas s de QA siemrpe que ocupesa
> y  vamos con tus recomendaciones

## 1 · Una regla de trabajo, permanente

**Los pasos de QA se le dan SIEMPRE en el chat, completos:** qué pegar, qué debe ver y cómo
contestar. No basta con señalarle una hoja en disco. La hoja puede existir como respaldo, pero el
vehículo es la respuesta.

Esto corrige la regla de las REGLAS DE CABINA que mandaba la QA larga a un documento navegable. Para
este operador, el documento no sustituye a los pasos en el chat.

## 2 · Lo que aceptó con «vamos con tus recomendaciones»

Es un **acuerdo con dos recomendaciones de la cabina**, no una medición:

- **D1 A.** Los dos renglones de sus detalles de paso y las negritas de su regla van a un **run nuevo
  que toca el esquema y el compilador juntos**. Esto es la **autorización explícita para tocar el
  compilador** que pide el `CLAUDE.md` del repo, y cubre solo esos dos campos:
  `timeline.details` y `rule.description` de Web.
- **D2 sí.** Que el taller guarde en su memoria que en este repo hay que medir también el compilador,
  no solo la puerta y el motor. Esa respuesta se da en la sesión del taller; aquí queda registrada.

## De dónde salió la decisión

El taller del `#217` paró los puntos 1 y 3: entre la puerta y el motor está la lista blanca propia del
compilador (`compiler.js:457`), que el `#216` no midió. La cabina lo había copiado al ticket sin medir
la cadena entera, y eso se declaró como error de la cabina. En la sesión del taller, el operador ya
había elegido «Solo el cambio 2»; esa frase viene del reporte del taller, §0.1, no de este chat.
