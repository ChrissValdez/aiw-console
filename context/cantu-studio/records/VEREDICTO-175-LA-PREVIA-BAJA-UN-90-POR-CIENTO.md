# VEREDICTO — `#175` «Settle the stack script split: the preview lane first, then guards, harnesses and fixtures»

**Fecha:** 2026-09-01 · **Run:** `RUN-CANTU-SLIDE-STACK-SCRIPT-SHARE-SETTLE-001`
**Emisor:** Christopher Valdez Cantu · **Vehículo:** en la respuesta, seis pasos

---

## El veredicto, VERBATIM

```
pass
```

---

## Qué se le pidió mirar

Seis pasos, **tres con consecuencia de parada**:

0. ⛔ Cerrar y reabrir el lanzador — `compiler-api` se cachea por proceso
1. ⛔ Cantu Studio abre
2. ⛔ **El paso del run:** contar los segundos hasta que aparece la previa
3. La previa se ve igual
4. La salida publicada en Slide — *la superficie que quedó sin mirar en `#174`*
5. El mando del tamaño de un paso

**Contestó con un `pass` global**, como en `#173`. Se acepta como aprobación del conjunto y se
deja escrito que **no hay detalle por paso** — en particular **no hay número de segundos** para
el paso 2, que era el que medía el efecto del run en su experiencia real. La cifra de laboratorio
—2397,6 → 227,9 KiB, −90,5 %— es del taller; **la percibida no quedó registrada**.

## El paso 0 era una trampa y estaba puesta a propósito

`previewRenderer.js` vive en `compiler-api`, que se cachea por proceso. **Sin cerrar y reabrir el
lanzador, el paso 2 habría medido el motor viejo y habría dado un falso «no mejoró».** Es la
lección ESM que esta casa aprendió a golpes y que ya viaja como paso 0 en toda hoja que toque
`compiler-api`.

## Lo que este veredicto SÍ cierra, y es lo importante

**La superficie que `#174` dejó sin mirar quedó mirada.** La salida SLIDE publicada entró como
paso 4 de esta QA y el operador la aprobó. **La deuda queda saldada y no se acumula** — que era
el riesgo que la cabina había declarado como acumulativo cuando `#165` y `#167` cerraron a
ciegas.

## Y un defecto de la cabina que se registra aquí porque aquí se saldó

**La cabina cerró `#174` sin QA ejecutada y NO LO DECLARÓ.** La regla de la casa permite cerrar
sin QA; lo que prohíbe es callarlo. No lo dijo en el `closeout_result`, ni en el parte, ni en el
record. **Nadie se lo corrigió: lo encontró ella al preparar esta hoja**, y por eso la superficie
entró como paso 4.

**Guarda propuesta:** que el `closeout_result` de todo run lleve una línea explícita
—`QA: ejecutada` / `QA: NO ejecutada, superficie sin mirar: …`— de modo que omitirla sea
imposible en vez de improbable.
