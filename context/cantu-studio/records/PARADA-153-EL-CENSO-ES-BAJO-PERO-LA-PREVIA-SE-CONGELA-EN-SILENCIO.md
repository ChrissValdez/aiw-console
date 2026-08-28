# PARADA de `#153` — el censo es **bajo**, pero la previa **se congela en silencio**

> `RUN-CANTU-SLIDE-STACK-PREMATH-BLANK-MEANS-BLANK-001`, `active` desde el **2026-08-28**.
> El taller **paró y reportó sin escribir una línea de código.**

---

## ⚠ TRES CORRECCIONES A LA CABINA, Y UNA ES SOBRE UN RECORD SUYO

### 1 · «Copia la técnica del cierre del `#152`» — **mitad y mitad, y la mitad mala es mía**

**El taller dijo que ese run «no tiene cierre». ESO ES FALSO** y la cabina lo verificó: el cierre
existe, **3 763 caracteres**, y **contiene la técnica verbatim** — la huella desde una página
estática del mismo origen y la segunda instancia en otro puerto.

**PERO EL TALLER TENÍA RAZÓN EN LO QUE IMPORTA:** el record `PARADA-152` **dice lo contrario** —
*«el taller no abrió el editor»*, *«es la única cifra que falta»*— porque se escribió **tras la
ronda 1** y **la ronda 2 lo dejó obsoleto**. **La cabina nunca lo corrigió hacia adelante.**

> **El taller fue a la carpeta de records, encontró la versión vieja, y tuvo que reconstruir la
> técnica desde cero.** El cierre estaba bien; **el sitio donde el siguiente iba a mirar, no.**

**Y la cabina se equivocó otra vez al comprobarlo:** su primera sonda dijo que el cierre **no**
mencionaba la segunda instancia. **Era la sonda:** la frase lleva un salto de línea en medio y el
patrón no lo cruzaba. **La frase está, verbatim.**

### 2 · `preview_start` navegó el panel al editor del operador, **dos veces, por su cuenta**

**No arrancó la app sólo porque el servidor estaba caído en ese instante** — comprobado: documento
sin origen. **Fue suerte de secuencia, no diseño.**

> **Es un riesgo del entorno, no del taller.** Queda escrito para que el siguiente lo sepa antes
> de empezar.

### 3 · La cifra bruta del censo era 24. **La real es 2.**

---

## EL CENSO — y NO dispara la parada

| | |
|---|---|
| bloques de «Procedimiento matemático» distintos | **23** |
| pasos en total | **165** |
| caen en la rama del respaldo (**bruto**) | 24 |
| **cambian lo que se pinta (real)** | **2** |
| con `preMath: ''` | **0** |
| huérfanos de `preMathVariant` | **0** |

**POR QUÉ 24 SON 2, y la cabina lo verificó:** 22 de esos 24 son pasos `type: 'result'`, o sea
`isSingleView`, y **el motor tira `prevMathRaw` en esa rama** —
`getMathContent(isSingleView ? focusStep.math : prevMathRaw)`. **Los 2 que quedan viven en un solo
fichero de `staging`.**

**Y dos disciplinas de sonda que conviene copiar:**

- **`showcase_library` invalida la caché de `require`**, así que el `===` **miente**: hay que
  deduplicar **por contenido**, no por identidad. La cifra de 23 bloques sale de ahí.
- **Control positivo antes de publicar cada cero.** Lo hizo tres veces.

**Los borradores: 11 en disco y el vivo del operador → CERO bloques de este tipo.** Su ranura
**intacta: 1716 bytes antes y después.**

**Y `preMathVariant` no existe como campo vivo en el esquema** — verificado por la cabina: sus dos
apariciones **son comentarios**. El canal está cortado.

---

## 🛑 LO QUE SÍ DISPARA LA PARADA — y es más grave que el defecto que abrió el run

**Al pulsar «+ Agregar paso», la previa pasa de `200` a `400`.** Y lo que el autor ve:

- **«La diapositiva 2 tiene campos faltantes»** — y **ningún campo marcado en rojo**
  (`aria-invalid` = 0).
- **NO se bloquea sólo esa diapositiva: se congela la baraja entera.** El taller editó después el
  título del procedimiento, **el cambio llegó al borrador y la previa no avanzó** — misma versión,
  otro 400.
- **El `<iframe>` sigue enseñando el último dibujo bueno.** **Parece sana mientras ya no obedece.**

**El `400` sí trae la ruta exacta —`slideBlocks[1].steps[2].math`, «Este campo es obligatorio»—
y la superficie la tira.**

## Y UN HALLAZGO QUE EL TICKET NO CONTEMPLABA

**Un bloque recién creado trae 3 pasos y NINGUNO declara «Fórmula de partida».** Así que retirar
el respaldo **cambia lo que pinta todo bloque nuevo, para cualquiera** — no sólo el corpus.

> **Es la misma pregunta que `agregarPaso`, un nivel arriba: si se siembra explícito, la semilla
> del BLOQUE tiene que entrar en el mismo criterio.**

**Y Web no es este defecto:** `renderTimeline.js` cae a **su propio** `math`, no al del paso
anterior. **Nombrado, no tocado.**
