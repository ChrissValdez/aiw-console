# PARADA de `#149` — la salida de diapositiva: cuatro decisiones, y DOS errores de la cabina

> `RUN-CANTU-SLIDE-BUILD-OUTPUT-PATH-001`, `active` desde el **2026-08-28**.
> El taller **paró y reportó sin escribir una línea de producción**, como el encargo mandaba.
> **⚠ NO DEJÓ FICHERO: todo su paquete vivía en el chat. Lo transcribe la cabina para que no
> muera ahí.**

---

## ⚠ LO PRIMERO: LA CABINA SE EQUIVOCÓ DOS VECES, Y UNA ES GRAVE

### Error 1 — `CertUtil`, y lo escribí DENTRO del texto de un run

Puse en el `full_description` de este run, como **coste que gobernaba una decisión del operador**:

> «Medido en otro run: ese camino usa `CertUtil -encode`, un binario de Windows.»

**ES FALSO EN ESTE REPO, y lo verifiqué con `git grep` tras la corrección del taller:**

    CertUtil en ficheros de código:                    CERO
    CertUtil en TODO el repo rastreado:  .aiw/roadmap/roadmap.json
                                         .project/roadmap.json
                                         .project/snapshot.json

**Es decir: la única aparición de `CertUtil` en todo el proyecto es la que escribí yo.** El
artefacto Moodle es `${MOODLE_LAYOUT_FIX}${bodyContent}` más un `writeFileSync`. **Sin
codificación, sin zip, sin binario externo.**

**Cómo se produjo:** lo heredé del relevo de la cabina, que lo daba por medido, **y lo propagué
al texto de un run sin comprobarlo contra este disco**. Es la segunda forma de fallar del manual
—afirmar un hecho citando un record— agravada porque **acabó dentro de un artefacto que un taller
obedece**.

**El taller dejó abierta la única puerta honesta:** si aquella medición apuntaba a **un flujo
manual del operador fuera del repo**, eso no se ve desde el disco. **Si es así, la decisión (b)
hay que revisarla.**

### Error 2 — «los 14 SLIDE los produce el pipeline, NO EL EDITOR»

**A medias.** **2 de los 14** nacen de módulos `.slides.js` que **escribió el editor** con
`POST /api/compile/slides`; `main.js` sólo los recoge. **El editor ya está a medio camino de
`dist/`: le falta el paso de disparo.**

---

## EL HALLAZGO QUE DECIDE EL TAMAÑO DEL RUN

> **Web tiene una función de construcción cerrada y compartida. Diapositiva no tiene ninguna.**

Verificado por la cabina: `buildSingleWebLesson.js` está **exportado y lo consumen los dos
lados** — `main.js` (4 referencias) y `server.js` (2). En el carril de diapositiva, `src/builders/slides/`
sólo tiene **`renderSlides.js`** —el motor, que sí se reutiliza— **y el ensamblador del documento
vive EN LÍNEA dentro del bucle de `main.js`. No es invocable desde ningún sitio.**

**Y mi frase «lo único que no tiene es el paso que escribe el fichero» era un matiz que cambia el
coste:** no falta un `writeFile`. **Falta el ensamblador como función.**

## LO DEMÁS QUE MIDIÓ, Y ACOTA

- **Un HTML por lección, no por diapositiva** — derivado: un solo `writeFileSync` por formato.
- **Sin recursos que copiar**: fuentes y KaTeX por CDN, CSS empotrado. Igual que Web.
- **Diapositiva ya tiene DOS cascarones** —el de construcción y el de la previa— y **ya divergen
  en cómo empaquetan el CSS**: uno hace `readdirSync().sort()`, el otro lo lleva **clavado a
  mano**. Hoy coinciden por casualidad; **el día que alguien añada una hoja, divergen en
  silencio.** Y reutilizar el de la previa le metería al autor **~1,9 KB de CSS de editor** y un
  script de estado en su fichero final.
- **`SlidesDraftSchema` es simétrico a `WebDraftSchema`.** Sin asimetría de validación.
- **En modo interno, `exportsLocalWeb` y `exportsMoodleWeb` son el MISMO directorio**: `dist/author_lite`.

---

## LAS CUATRO DECISIONES, CON SU COSTE MEDIDO

**(F) LA FORMA — y va delante, porque las otras tres cuelgan de ella**

| | qué | coste | riesgo |
|---|---|---|---|
| **F1** | extraer `buildSingleSlideLesson.js`, espejo del de Web, y que `main.js` lo consuma | ~90 líneas + rewire | **toca JAME Core** — `CLAUDE.md` regla 7 exige instrucción explícita — y debe salir **byte-idéntico** contra los 14 SLIDE y los 63 árboles fijados |
| **F2** | cascarón sólo dentro de `author-lite` | ~40 líneas | **crea un TERCER cascarón** e institucionaliza la divergencia que se acaba de medir |

**(a) DÓNDE VA EL FICHERO.** El sufijo `.SLIDE.html` **no es decisión: ya está derivado**.
**A1** carril propio (~12 líneas, simétrico a Web) · **A2** reusar el de Web (0 líneas, deja
SLIDE dentro de una carpeta llamada `web` en modo externo). **Colisión medida: no la hay.**

**(b) EL EMPAQUETADO MOODLE.** El artefacto Moodle es **un fragmento sin documento por
contrato** —sin `<head>` propio, para pegarse en una página que no controlamos—. **Una
diapositiva es lo contrario:** documento a pantalla completa con runtime que necesita su `<head>`.
**B1** no aplica (0) · **B2** diseñar un contrato de encapsulado **sin instancia de Moodle contra
la que medirlo**.

**(c) LOS BOTONES DE ABRIR LA SALIDA.** **La ranura ya existe y ya está reservada**:
`OutputBuildSummary` tiene `isSlideFlow` y el mensaje *«Los archivos de Slide aparecerán aquí
cuando estén disponibles.»* Faltan dos botones: **«Abrir HTML»** (~25 líneas, hoy 404) y
**«Mostrar en carpeta»**, que tiene **una trampa medida**: `resolveSafeBuildPath` sólo admite las
raíces de Web, así que con A1 en modo externo daría «Ruta fuera de exports». **Una línea, si se
sabe.**

---

## LO QUE EL TALLER NO PUDO VERIFICAR — y se conserva

1. **No ejecutó ninguna construcción real** — era condición de parada.
2. **No vio con sus ojos un artefacto producido por el botón de Web**: `dist/author_lite/` sólo
   contiene `generated/`. No pudo determinar si se limpió o si el «generar web sí jala» del
   operador ocurrió con el workspace en modo externo.
3. **La paridad byte a byte de F1 NO está medida.** Afirma que *debe* salir idéntica; **no ha
   comprobado que se pueda**, y eso sólo se mide construyendo.
4. **No corrió la suite** — por regla, con otro taller posible activo.
5. **Los 6 huérfanos de `dist/`: heredados, no re-medidos.**
6. **El comportamiento en Moodle real: no verificable desde aquí.**

## EL AVISO QUE ESTE RUN HEREDA Y NO ARREGLA

**En modo interno, cualquier salida de diapositiva que el editor escriba cae dentro de `dist/`**
—que es acumulativo, sin manifiesto y arrastra 6 huérfanos—. **Nombrado, no arreglado.**
