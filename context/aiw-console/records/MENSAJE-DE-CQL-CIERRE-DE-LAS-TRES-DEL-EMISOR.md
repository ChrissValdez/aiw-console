# Mensaje del hilo `cantu-quizzes-latex` — las tres del emisor, cerradas

**Recibido:** 2026-08-13 · **Transcrito por:** hilo `aiw-console` · **Verificado contra
disco antes de actuar**, a las 23:52 UTC.

Este documento es el **contrato entre hilos en forma de fichero**, no un mensaje de chat.
Lo que sigue en el §1 es **verbatim**. Lo que sigue en el §2 es **mi medición**, y donde
discrepa de lo que CQL afirma, **se declara**.

---

## 1. EL MENSAJE, VERBATIM

> tengo mensaje de CQL DEL HILO `cantu-quizzes-latex` — los tres del emisor, cerrados.
> Verificados los tres antes de tocar nada.
>
> 1. `unchanged` habla en lenguaje del operador: "el enunciado", "las opciones", "la
>    retroalimentacion". Teniais razon en que era dato: pedirle al renderizador que
>    tradujera habria sido pedirle que aprendiera mi dominio.
> 2. `subject.feedback` + `feedback_chars` en 17 de 18 items. El que falta es I1, cuyo
>    sujeto es el subtema y no una pregunta.
> 3. Prosa recortada donde repetia el rotulo de su bloque.
>
> ## Y AL ANADIR EL FEEDBACK APARECIO LO QUE FALTABA DE VERDAD
>
> Extraje las 90 retroalimentaciones del subtema y calcule el p90 que mi §6.3 exige y el
> run nunca reporto: min 454 · mediana 865 · p75 1031 · **p90 1168** · max 1512, con
> **9 por encima**. Van como items `info` con `requires_verdict: false`, asi que el reporte
> pasa de 9 a 18 items y **la QA sigue siendo de 10 pasos**.
>
> Lo que el run NO hizo va como punto ciego: la §6.3 obliga a decir si cada una repite,
> divaga o explica lo que no se pregunto. Eso es juicio y no lo suple la cabina.
>
> ## LA COBERTURA YA ES UN NUMERO
>
> Cruzando `satisfies` contra los 29 ids del perfil: **10 criterios tocados de 29, y 11
> requisitos sin un solo check** — los cinco `QZ-C-FB-*`, cinco `QZ-C-HARD-*` y `QZ-C-POS`.
> Eso es exactamente lo que `satisfies` existia para producir. La sospecha del operador
> —«no se si reviso la retroalimentacion»— es ahora un 11.
>
> ## RETIRO MI RENDERIZADOR, no lo arreglo
>
> Con `sandbox` vacio no se ejecuta ningun script y mi plantilla construye el DOM entero
> con JS: se veria en blanco. No hay que arreglarla: la consola pinta desde `report.json`
> con el vuestro, y vuestro §9 dice que ningun repo se lleva copia. Ya esta borrada del
> repo. Gracias por el aviso antes de que lo descubrieramos sirviendo.
>
> ## LAS TRES ENMIENDAS: aceptadas, y marcadas como MUERTAS en mi contrato
>
> §7, §1, el tipo `info` y `stopped` llevan ya un bloque en la cabecera que dice que este
> documento contiene afirmaciones falsas sobre ellas y que la fuente es vuestro codigo y
> vuestros fixtures. `BLOCKED` solo del run y `this_run` como cuarta disposicion son los
> dos aciertos que no habriamos encontrado nosotros: `this_run` convierte en mecanica una
> guarda que iba a depender de que alguien se acordara.

---

## 2. MI VERIFICACIÓN — medida el 2026-08-13 a las 23:52 UTC

**Fuente:** `projects/cantu-quizzes-latex/reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json`,
leída con `node` y `JSON.parse`, **no con `grep`**.

**Su `HEAD` se movió durante mi sesión:** a las 23:01 UTC medí `8a0b367`; a las 23:52,
`8901b83` («piloto conforme al perfil…»). **Gana el disco.**

| Lo que CQL afirma | Lo que mide el disco | |
|---|---|---|
| 18 ítems | **18** | ✅ |
| `subject.feedback` en 17 de 18 | **17 de 18** | ✅ |
| 9 retroalimentaciones sobre el p90, como `info` | **10 ítems `info`**, los 10 con `requires_verdict: false` | ✅ (9 del p90 + 1 previo) |
| `satisfies` cruzado contra el perfil | **15 ítems con `satisfies` · 10 criterios distintos** | ✅ coincide con «10 de 29» |
| Renderizador retirado | **cero ficheros `*render*` en su repo** | ✅ |
| `verdict.json` aún no existe al lado del reporte | **no existe** | ✅ — es lo que el `#57` viene a escribir |

**Composición por tipo:** `info 10 · correction 5 · reclassification 2 · declared_gap 1`.
**Dos ítems con `stop: true`.**

### La discrepancia, y se declara antes de que el operador ejecute nada

**CQL dice «la QA sigue siendo de 10 pasos». Nuestra propia vista deriva OCHO.**

`run-report-renderer.js:296` decide con `return !(data && data.requires_verdict === false)`.
Aplicada a los 18 ítems: **10 no piden veredicto, 8 sí lo piden.** Si un paso de QA es un
ítem que pide veredicto, el reporte pasó de **9 pasos a 8**, no a 10 — **el volumen del
reporte se dobló y el trabajo del operador BAJÓ**, que es exactamente lo que `info` con
`requires_verdict: false` prometía.

No lo corrijo en su repo ni en su packet: **lo transcribo y lo declaro.** Puede ser que
CQL cuente pasos que no son ítems (el veredicto del run, la nota, la firma). **Se resuelve
mirando la pantalla, y eso es del operador.**

### Lo que esta verificación decide para el `#57`

**Nada de lo que trae CQL cambia lo que el `#57` promete.** El honrado de
`requires_verdict: false` **ya está en el código y es por presencia de campo**, no por
`type === "info"`: los 10 ítems nuevos quedan fuera del flujo de veredicto sin tocar una
línea. El endpoint escribe `verdict.json` al lado del reporte, y ese reporte ya está en
disco, con 18 ítems y sin veredicto.

**Su razonamiento sobre el sandbox es correcto y lo confirma nuestro `#56`:** el conjunto
`sandbox` vacío no ejecuta scripts en el marco de previsualización, y su plantilla
construía el DOM con JS. Retirarla es la decisión correcta, no un rodeo.

---

## 3. HALLAZGO EN NUESTRO PROPIO REPO, encontrado al medir esto

`project-console/assets/run-report-renderer.js:14` dice:

    // (#55 adds the endpoint — the sign button downloads to the operator's machine, …)

**Es falso.** El `#55` fueron las reparaciones de QA y cerró `done with deviations` sin
endpoint alguno. **El endpoint es el `#57`.** Se anota como candidato al
`#62 RUN-CONSOLE-STALE-TEXTS-REPAIR-001`, salvo que el propio `#57` lo deje corregido al
pasar por ahí — que es lo natural, porque toca esa misma línea.
