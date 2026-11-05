# HANDOFF — hilo `metodo-cantu-landing` (LANDING)

> **Primer relevo de este hilo.** Lo escribió la cabina de LECCIONES el **2026-11-04, cerca de las 23:50**, en la PC
> (`DESKTOP-525K0IS`), al abrir el hilo propio que pidió el operador. Hasta hoy, la landing se trabajó dentro del hilo de
> LECCIONES.
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el disco al abrir. Gana el disco.**
>
> **La cabina abre leyendo enteros** `context/cabinas/landing/CLAUDE.md` y `context/cabinas/REGLAS-DE-CABINA.md`.

## Al día, 2026-11-05 cerca de las 00:15 (la primera sesión de la cabina LANDING)

- **Las referencias están entregadas:** `referencias/index.html` en `metodo-cantu-landing` `334e4ad`, ya en `origin/main`.
  Se revisaron 38 sitios y las plantillas de educación de Framer y Webflow; quedan seis, cada una para una parte de la
  página: Brilliant y Fiveable (la portada), Shape Up (la ruta en cuatro pasos), Tally (el tono y las notas a mano),
  El Moro (la identidad) y la plantilla «Profe» de Framer (USD 39, para los paquetes; no se compra).
- **Se le pidieron** (`CLAUDE.md`, «La primera sesión», puntos 3 y 4): qué le gusta y qué no de cada referencia, y sus
  paquetes (nombre y qué incluye cada uno). **En espera de su respuesta.** Lo que diga va a `veredictos/` tal cual, antes de
  construir la versión única (punto 5).
- La copia con las capturas dentro, para verla en otro aparato, está en
  `_scratch/landing/referencias/entrega/referencias-landing.html` (fuera del repo; se rehace desde `referencias/`).
- Las capturas se tomaron con el Chrome de la PC y el `puppeteer-core` del banco de `cantu-lessons` (solo se lee de ahí).

El resto de este relevo es el que escribió la cabina de LECCIONES: sigue vigente.

## Dónde estamos

- **El repo:** `metodo-cantu-landing`, `main` en `032791f` (23:44), igual a `origin/main`. *(Al 5-nov 00:15: `334e4ad`.)*
- **Lo que hay:**
  - el código de hoy (`secciones/`), el marco (`marco/`) y la vista (`vista.html`);
  - las cuatro variantes A a D (`variantes/`);
  - NUBE-08 (`propuesta-08/`);
  - los encargos NUBE-06 (sustituido), 07A a 07D y 08;
  - los dos veredictos (`veredictos/`).
- **Ninguna versión le ha gustado más que la suya.** El siguiente paso es buscar referencias antes de construir
  (`CLAUDE.md`, «La primera sesión», punto 3).

## La historia, en corto

1. **NUBE-07A a D (la nube, 4-nov, 22:00 a 23:00):** cuatro landings completas con libertad: pulida, con movimiento, en 3D y
   con otra historia.
   - *«ninguna me gusto mas que la actual · Senti que empeoraron mi landing page actual en vez de mejorarla»*.
   - Causa, según la cabina: cambiaron su identidad (letra, colores, fotos, textos y orden) y los dos skills de diseño
     empujan a eso.
2. **NUBE-08 (la nube, 23:10 a 23:35):** la de hoy con la identidad bloqueada, en dos formas por sección: «hoy, corregida» y
   «con lo de la D».
   - *«la hoy correjida la veo practicamente identica a la original … y la con D se ve horrible … fue un fracaso este
     concepto»*.
   - Tampoco quiere elegir por sección.
3. **Después vio la D original completa** y dijo, en detalle, qué le gustó. Está tal cual en
   `veredictos/2026-11-04-ronda-2.md`.

## Lo que le gustó, y lo que no

- **Sí, de la D, el concepto:**
  - la portada como pregunta de examen de opción múltiple (*«seve muy original»*);
  - poco texto (*«no se ocupa leer tanto»*);
  - el mensaje «Más horas de estudio no sirven si estudias a ciegas»;
  - «Tu ruta en cuatro pasos», con sus apoyos visuales;
  - que *«no se sintio una landing page generica»*.
- **No, de la D:**
  - el diseño visual: la letra y los detalles de color;
  - las fotos en duotono (*«en tono feo»*);
  - «Así se vive una semana» tal cual, porque vende paquetes distintos. El concepto se puede pulir.
- **De su original:** le gusta, pero *«siento que tiene mucho texto»*.
- **De las otras variantes (A, B y C):** nada que haya mencionado a favor.

## Lo que la cabina de LECCIONES le propuso (sin aprobar todavía)

- **Una sola página con el concepto de la D y un diseño visual nuevo y pulido.** Cada sección, con una sola idea en 2 o 3
  renglones:
  1. la pregunta de examen 1, con su promesa y el botón de WhatsApp;
  2. «Más horas de estudio…»;
  3. la ruta en cuatro pasos;
  4. «Elige cómo prepararte», con sus paquetes;
  5. las preguntas frecuentes, cortas;
  6. la pregunta 2, «¿Qué necesitas?», con respuestas que abren WhatsApp.
- **El diseño visual no se adivina:** primero sus referencias o una lámina de estilo. Él respondió con la búsqueda de
  referencias.
- **Falta que mande sus paquetes:** el nombre y qué incluye cada uno.

## Lo que ya sirve y está sin usar

- **`propuesta-08/hoy-corregida/`:** sus bloques de hoy, iguales a la vista, sin sus defectos. La cabina de LECCIONES lo midió
  a 390 px el 4-nov a las 23:35:
  - la página ya no se mueve de lado (hoy se ensancha a 446–459 px);
  - el título de la sección 2 cabe y se ve la foto de la portada;
  - el acordeón muestra su «+» / «−»;
  - dice «Mantienes» y no «Mantienen»;
  - las fotos pasan de 2,75 MB a 264 KB;
  - no depende de Unsplash ni de Wikimedia.

  Se le recomendó pegarlos ya, mientras se diseña lo nuevo. Él no lo ha decidido.
- **Lo que las cuatro variantes coinciden en que falta** es contenido, no diseño:
  - testimonios reales, con nombre y permiso;
  - fotos propias del salón o de una clase;
  - precios u horarios, o decir que van por WhatsApp;
  - la dirección del presencial.

## Abierto, para después

- **Conectar la cabina a su servidor de Moodle por SSH** desde la app, para trabajar código (el plugin del tutor, el tema).
  Él dijo *«depsues trabajo en eso»*. Lo que hay que pedirle: qué trabajar primero y si tiene sitio de prueba. Va en la
  carpeta del plugin, no en la raíz (`config.php` trae la contraseña de la base de datos).
- **Los créditos:**
  - el de cortesía de la nube venció el 5-nov a la 1:59;
  - los USD 200 al mes de API (plan Ultra) no cubren sesiones interactivas de Claude Code. Él dice que ya se le acabaron;
    queda para después.
- **El `h1` oculto del tema** («Método Cantú» en la franja de título): revisar si cuenta para el SEO.
