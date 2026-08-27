# VEREDICTO DEL OPERADOR — el porte va en DOS runs, y se autoriza tocar Web

> Dado por **Christopher Valdez Cantu** el **2026-08-27**, sobre el encuadre que la cabina
> le puso delante con las cinco cosas apiladas juntas y sus fronteras medidas.
> **Se guarda verbatim, como se guarda cualquier veredicto.**

---

## VERBATIM

> **«vamos ocn tus reocmendaciones procede»**

---

## QUÉ APRUEBA, PUNTO POR PUNTO

La cabina le presentó **dos preguntas con recomendación explícita**. «Vamos con tus
recomendaciones» aprueba **las dos**, y quedan así:

### 1 · CÓMO SE PARTE EL PORTE — se aprueba la OPCIÓN B

**Dos runs, separando lo que toca Web de lo que no.**

| run | qué lleva | ¿toca Web? |
|---|---|---|
| **A** | 1 · la separación de la colección de términos · 2 · «Terminos» con las piezas de la casa · 3 · la tinta del número de paso | **no** |
| **B** | 4 · el color por factor (`counts[].color`) · 5 · las dos faltas de ortografía de la semilla | **sí** |

**Se descartaron:** la **A** —los cinco en un solo run, que metía dos decisiones distintas
del operador en el mismo turno— y la **C** —contrato antes que interfaz, tres runs, cara
cuando la dirección ya está dicha.

### 2 · TOCAR WEB — AUTORIZADO, Y ACOTADO

Se autoriza tocar `WebBlockEditor.jsx` **para dos cosas y sólo dos**:

- **exportar `HexOnlyColorField`** sin cambiar su comportamiento;
- **corregir dos cadenas de texto** de la semilla de Web: «Descomposicion» → «Descomposición»
  y «Agrupacion» → «Agrupación».

**Lo que esta autorización NO cubre:** repintar Web, tocar sus hexes vigentes, o cualquier
cambio de comportamiento del control exportado. **Sigue siendo la superficie mínima.**

---

## LO QUE SIGUE SIN DECIDIR, Y NO LO DECIDE ESTE VEREDICTO

**EL DESPLEGABLE DEL RECUADRO DEL RESULTADO (`resultBox`) QUEDA FUERA DE LOS DOS RUNS.**
Verificado contra disco el 2026-08-27: **cero apariciones en `src/builders/slides/`**, y el
esquema del compilador lo dice por escrito — *«`resultBox` NO ENTRA, EN NINGUNO DE LOS DOS
MODOS»*. **Traerlo no es portar un control: es abrir una capacidad que el motor de
diapositiva no tiene.** Es la cuarta vez del patrón «capacidad en un lado, cerrada en el
otro», y **se nombra sin abrirla**. Es decisión suya y todavía no la ha tomado.

---

## LA TENSIÓN DE IDENTIDAD, DECLARADA EN VEZ DE TAPADA

Los dos `run_id` describen **el trabajo**, no el inventario de puntos que llevan dentro. Es
deliberado: si el alcance cambiara, un id que enumerase «los cinco» obligaría a cerrar el run
y abrir otro. **Aun así, `…-PORT-WEB-COLOR-FIELD-…` sí describe alcance**, y si ese alcance
cambiase habría que cerrarlo y reabrirlo en vez de enmendarlo. **Queda dicho aquí para que no
sorprenda.**

---

## UN HALLAZGO DE LA MEDICIÓN QUE CAMBIA EL PUNTO 3 — Y ES DE PAPEL ≠ DISCO

El registro de `RUN-CANTU-SLIDE-CONCEPTGRID-BADGE-INK-AND-TABLE-001` dice, del punto 3:

> «La ranura hermana de «Procedimiento matemático» tiene la misma trampa que este run cerró:
> `badgeTextVariant: ''` → `#4F75A8`. **Medida y real.**»

**Medido contra disco el 2026-08-27, 17:45 CST, eso ya no se sostiene tal cual.** Los DOS
esquemas gemelos llevan hoy `blankToUndefined` sobre esa ranura:

    compiler-api/schemas/draftSchema.js:4260
      badgeTextVariant: z.preprocess(blankToUndefined, SlideStackAccentColorSchema.optional())
    editor-ui/src/schemas/draftSchema.js:3403
      badgeTextVariant: z.preprocess(blankToUndefined, SlideStackAccentColorSchema.optional())

Y el compilador entra por `step?.badgeTextVariant !== undefined` (`compiler.js:4185`), que con
`''` convertido a `undefined` **no llegaría a resolver el token**.

**LO QUE ESTO NO AUTORIZA A CONCLUIR.** Son DOS LÍNEAS DE ESQUEMA, no una medición de la
pantalla. **La superficie no está declarada, así que no es una verificación** — es
exactamente la lección que costó seis rondas el mismo día. Y queda vivo un camino que estas
líneas no cubren: **la puerta de la PREVIA (`SlidesPreviewDraftSchema`) sigue aceptando y
borrando en silencio**, y `#140` sólo cerró la del importador.

**CONSECUENCIA PARA EL RUN A:** el punto 3 **empieza midiendo sobre la superficie real, con lo
que crea el BOTÓN**, y sólo repara si el defecto sigue vivo. **Si está cerrado, se declara
cerrado y se dice desde cuándo** — no se repara algo que ya no falla, y no se apunta como
verde sin haberlo mirado.

---

## ORDEN EN LA COLA — decisión de la cabina bajo D-071, explicada al tomarla

Los dos runs se insertan **ANTES de `RUN-CANTU-EDITOR-SHOWS-THE-PAINTED-SIZE-001`**.

**Por qué, y es reversible:** ese run **lleva una parada de análisis dentro de su propio
texto** y es arquitectura —abrir un canal entre el editor y la previa que hoy es
cross-origin—; los dos del porte son formularios, más baratos, y uno de ellos corrige texto
que **se le pinta a un alumno**. Mover un run cuesta un `remap`, así que **si el operador lo
quiere al revés, se dice y se mueve.**
