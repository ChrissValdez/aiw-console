# DECISIÓN DEL OPERADOR — `#113`, qué hacer con la descripción del gráfico

> **Recogida por la cabina el 2026-08-17**, tras la parada 1 de la ronda 1 de
> `RUN-CANTU-SLIDE-VISUAL-DROP-CAPTION-AND-SIZE-TITLE-001`. **La parada era la esperada y se
> disparó como estaba escrito.**

## LO QUE LA RONDA 1 ENCONTRÓ, Y CAMBIÓ LA PREGUNTA

**El censo no fue cero: 5 ítems llevan descripción** — y se hizo **cargando los módulos y
recorriendo el objeto**, no con expresión regular. La razón está medida y es exactamente por lo
que la cabina se negó a dar su propio número: en `test_multimedia.js` el gráfico entra por
`{ type: 'visual', ...DATA_SVG }` y el `caption` vive **40 líneas más arriba**. **Ninguna
expresión regular sobre el literal del ítem lo habría visto.**

**Y LO QUE EL TICKET DE LA CABINA NO VIO, que es lo que de verdad cambió la decisión:** las
piezas **no son de diapositiva**.

| Pieza | ¿Sólo diapositiva? |
|---|---|
| `visualShape` en los dos gemelos | **NO** — lo consumen el esquema de diapositiva **y el de Web** |
| `buildVisualOutput` en el compilador | **NO** — lo llaman la rama de Web y la de rejilla |
| `VisualFields.jsx` | **NO** — su propia cabecera dice *«(Web y Slide)»* |
| **La fábrica** — quinta puerta que nadie había nombrado | siembra el campo en cada bloque nuevo, en los dos flujos |

**Verificado por la cabina antes de aceptarlo.** Y una colisión que el ticket describió de menos:
`caption` **es el mismo nombre de campo** en `visualShape` y en `videoShape`, en el mismo bloque
del fichero — y **hay 5 ítems `video` en el corpus, los 5 con descripción**. Una retirada por
nombre de campo se los lleva todos.

## SUS PALABRAS Y SU ELECCIÓN

Se le presentaron **cuatro** caminos: la vía nueva que propuso la cabina, y las tres que había
traído el taller.

**Eligió: dejar de pintarla en diapositiva, sin tocar el esquema.**

- El motor de diapositiva **deja de emitir** el párrafo.
- El formulario de diapositiva **deja de ofrecer** el campo.
- **El esquema NO se toca.** Cero contrato roto, cero borradores invalidados, **Web intacto**.
- **Recupera los 55,7 px de dibujo** igual que la retirada dura.

## POR QUÉ ESA Y NO LAS OTRAS — el razonamiento se guarda, no sólo el resultado

**Contra partir las tres piezas en dos:** su queja era **de mantenimiento** — *«es una lata
darle mantenimiento»*. **Partir en dos algo que hoy es una sola pieza crea exactamente el tipo
de coste del que se estaba quejando**, sólo que en otro sitio.

**Contra llevárselo también en Web:** su razón era de diapositiva sin decirlo. Estaba trabajando
en el editor de diapositiva, y **su alternativa —la Narrativa— es un componente de diapositiva,
no de Web**. Decidir por Web con eso habría sido extrapolar.

**Contra admitirla sin pintarla en los dos flujos:** deja un campo que el autor **puede escribir
y que no se ve en ninguna parte**, que es peor que uno que no existe.

**LO QUE LA VÍA ELEGIDA CUESTA, Y SE DICE:** deja **un campo muerto en el esquema de
diapositiva**. Es deuda, aunque sea barata, y este proyecto ya arrastra varias. **Se acepta a
sabiendas.**

**Y LO QUE FALTA VERIFICAR ANTES DE ESCRIBIR:** que el montaje del campo **se puede acotar por
flujo limpiamente**. `VisualFields` es compartido, pero lo montan por separado el editor de
diapositiva y el de Web. **Si no se puede acotar sin partir el componente, esta vía se cae y hay
que volver a preguntar.**

## LA MITAD QUE NO ESTABA BLOQUEADA

**El tamaño del título está medido y listo**, y no depende de nada de lo anterior:

- El título del gráfico pinta hoy **`1.8rem`** — verificado —, la misma base que el encabezado
  de la Narrativa.
- Molde de `tokens.js`, razones `0,8333 · 1 · 1,2 · 1,4667`: **1.5 · 1.8 · 2.16 · 2.64 rem**.
- **Mediano = exactamente lo que se pinta hoy**, así que el campo es aditivo.
- Da los mismos cuatro números que la escala del encabezado de Narrativa: **coincidencia
  declarada, no derivación**. Son familias distintas y mover una no debe mover la otra.

**`tokens.js` tiene hoy 11 resolvedores**, no los ocho que recordaba el ticket. **La cifra
envejeció, como el propio ticket avisaba que podía pasar.**

## DOS COSAS QUE SALEN DE AQUÍ Y NO SE CIERRAN

**1 · El desglose del `#112` estaba mal.** El comentario de `renderVisual.js` dice «título 38,8
+ separación 16 + relleno 64 + pie 43,2 ≈ 162». Medido con Chrome, motor real y fuentes
cargadas: **título 48, separación 16, relleno 64, borde 2, pie 48 = 178**. **La conclusión del
`#112` era correcta —el dibujo se acota a 0— pero su desglose no.** Eran cifras derivadas, no
medidas. **El comentario miente y se corrige en este run.**

**2 · Los dos gráficos del corpus con descripción cambian de tamaño pintado**, aunque no estén
apretados: el componente encoge **67,2 px** al perder el párrafo y sus márgenes. **No es
regresión: es la consecuencia pedida.** Va en la QA.

## EL RÓTULO DEL CUARTO PELDAÑO SIGUE SIENDO SUYO

`«Extra grande»` en la lista compartida contra **«muy grande»**, que el operador ha escrito
**dos veces**. No se toca aquí: la lista la comparten Slide y Web y una prueba la fija verbatim.
