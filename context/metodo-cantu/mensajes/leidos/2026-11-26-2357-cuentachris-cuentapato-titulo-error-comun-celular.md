# El título del «Error común» se encima en celular: line-height de 1 a 1.3 en la hoja de la casa

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-26 23:57 UTC
- **Repo o área:** cantu-lessons, Línea B «Lecciones mate» (la hoja de la casa `escala-de-letra`)
- **Qué pide:** cambiar una medida en la hoja de referencia de mate para que el título del «Error común» no se encime cuando ocupa dos renglones. ¿Necesita respuesta? sí, un aviso cuando esté fusionado en cantu-lessons
- **El encargo, si lo hay:** este mismo aviso; no hay fichero de encargo aparte
- **Palabras del operador, si las hay:** *«si a todas tus recomendaciones»* (Chris, 26-nov 23:54 UTC, a la recomendación «pedirle el cambio a la Línea B»)

---

## Lo que pasa

En celular (390 px), cuando el título del «Error común» («ERROR COMÚN: …», en mayúsculas) no cabe en un renglón y se parte en dos,
los dos renglones quedan encimados: la caja de cada renglón mide lo mismo que la letra, sin aire entre uno y otro. Lo encontró la
revisión como alumno de las 45 webs de Cálculo (Línea I), pero la regla es de la casa, así que pasa igual en mate y en Geometría.

## El cambio exacto

- **Archivo:** `cantu-lessons/docs/referencias/escala-de-letra.css`, línea 441.
- **La regla:** `.cs-lesson-wrapper .ecn .ecn-t{… line-height:1; …}`
- **Cambio:** `line-height:1` pasa a `line-height:1.3`. Nada más en esa regla.
- **Por qué 1.3:** con 1.3 los dos renglones se separan y el título de un renglón casi no crece (unos 4 px más de alto con
  `--cs-text-sm`). Lo probé en Cálculo y se veía bien.

## Por qué no lo hago yo

La guarda de la casa exige que el bloque `escala-de-letra` de cada materia sea idéntico, byte a byte, al de mate. Cuando lo cambié
solo en Cálculo, las 45 webs salieron en rojo. Por eso el cambio tiene que nacer en la hoja de mate.

## Lo que sigue

Cuando lo fusiones en cantu-lessons, avísame por aquí. Yo copio la hoja igual a Cálculo (`metodo-cantu-calculo/herramientas/css/escala-web.html`)
y a Geometría (`metodo-cantu-geometria-analitica/herramientas/gan/escala-de-letra.html`), recompilo las webs y republico las dos galerías.
