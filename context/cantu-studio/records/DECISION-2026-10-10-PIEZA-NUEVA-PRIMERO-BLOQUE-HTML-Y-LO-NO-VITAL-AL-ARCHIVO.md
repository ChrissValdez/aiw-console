# Decisión del operador, 2026-10-10 — una pieza nueva sale primero como «Bloque HTML», y lo no vital se archiva

> Hilo `cantu-studio`. Escrito por la cabina el 2026-10-10 (UTC 2026-10-11 00:4x), mientras corría
> `RUN-CANTU-EDITOR-PREVIEW-NAMES-THE-FAILING-FIELD-001`.

## Lo que el operador planteó — RESUMEN NO LITERAL

**Aviso:** el mensaje original del operador **no se conserva literal**: se perdió al compactarse la conversación de la
cabina. Lo que sigue es el resumen de la cabina, no sus palabras. Lo literal es el bloque siguiente.

- Pausó Lecciones hasta que Studio se pusiera al día, y lo revisa para reanudar.
- Quiere que Studio quede sin trabajo pendiente, para que una petición nueva de Lecciones se haga rápido.
- Lo vital eran los componentes base de mucha repetición: «Para saber más», los arreglos del procedimiento, el
  «Bloque HTML» que sigue la paleta y A+/A-, y los márgenes. **No está seguro de que los márgenes hayan quedado bien.**
- Lo no vital (arreglos pequeños de botones, historial de versiones, componentes no clave) queda **archivado**: baja
  prioridad, se trabaja en tiempo muerto, y **sube rápido si Lecciones lo pide**.
- Su flujo: una petición de componente nuevo se resuelve primero con un «Bloque HTML» aprobado, para que la lección
  se termine sola; el componente se construye después sin bloquear, y la lección puede migrar luego con el mismo aspecto.

## Sus respuestas — LITERALES (componente de preguntas, 2026-10-10)

| pregunta de la cabina | respuesta del operador |
|---|---|
| ¿Cómo archivamos los 10 runs no vitales? | «Fase «Archivo» al final (Recommended)» |
| La migración de las 10 lecciones viejas (#255), ¿vital o archivo? | «Archivo (Recommended)» |
| ¿Qué hacemos con los márgenes? | «Verla en mi teléfono (Recommended)» |
| ¿Escribo tu flujo (pieza nueva → «Bloque HTML» primero) como decisión y aviso a Lessons? | «Sí, escríbelo y avisa (Recommended)» |

## Lo que queda decidido

1. **Pieza nueva → primero «Bloque HTML».** Lecciones la resuelve con un «Bloque HTML» que sigue
   `context/cantu-studio/REGLA-DEL-BLOQUE-HTML-PALETA-Y-TAMANO.md`, el operador lo aprueba en pantalla, y la lección
   se termina así. El componente se pide igual y entra al archivo; si se construye, migrar la lección es opcional y
   debe verse igual que el bloque aprobado.
2. **Fase «Archivo — no vital» al final de la cola.** Entran los 10 runs abiertos que no son vitales (medidos a las
   00:40 UTC): `RUN-CANTU-CALCULATION-CONTRACT-001`, `RUN-CANTU-HANDWRITTEN-LESSONS-MIGRATION-001`,
   `RUN-CANTU-BASIC-MATH-EXPLANATION-CONTRACT-001`, `RUN-CANTU-BASIC-MATH-EXPLANATION-EDITOR-001`,
   `RUN-CANTU-TAKEAWAY-CONTRACT-001`, `RUN-CANTU-TAKEAWAY-EDITOR-001`, `RUN-JAME-PRODUCTION-EXPORT-FLOW-001`,
   `RUN-JAME-HOSTING-DEPLOYMENT-PLAN-001`, `RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001` y
   `RUN-CANTU-EDITOR-HISTORY-SYSTEM-001`. Cada uno lleva *«no vital: sube si Lecciones lo pide»*. **Se ejecuta cuando
   vuelva el taller en curso**: la cola no se mueve con un encargo en vuelo.
3. **La migración de las lecciones viejas va al archivo.** Coste aceptado: hasta que suba, el editor no abre las 2
   lecciones publicadas ni las 8 de staging escritas a mano.
4. **Márgenes:** se verifican en el teléfono real del operador, sobre L01, con una página privada que publica la cabina.
   Hasta hoy solo se habían aprobado con capturas de un móvil emulado.
5. **Vital, y lo único que queda:** `RUN-CANTU-EDITOR-PREVIEW-NAMES-THE-FAILING-FIELD-001` (corriendo) y
   `RUN-CANTU-PREVIEW-PANEL-OPENS-AT-ITS-WIDTH-001` (espera la QA del operador).
