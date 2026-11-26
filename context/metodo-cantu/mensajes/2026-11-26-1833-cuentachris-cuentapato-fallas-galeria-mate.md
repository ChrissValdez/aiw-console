# Tres fallas en la galería de mate: falta «Por votar» en la web, el voto no responde y la explicación se abre sola

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-26 18:33 UTC
- **Repo o área:** cantu-revisiones (galería como artefacto), Línea B «Lecciones mate»
- **Qué pide:** arreglar las tres fallas de abajo en la galería de mate. ¿Necesita respuesta? sí, un aviso cuando estén arregladas
- **El encargo, si lo hay:** este mismo aviso; no hay fichero de encargo aparte
- **Palabras del operador, si las hay:** *«galeria de mate tiene el mismo error de en galeria de lecciones en web, que paso con el boton
  para irse a siguiente por votar. Y que se salte lecciones si es necesario pero que me mande a la siguiente seccion sin votar no lo
  encuentro»*; *«cuando intento votar en una slide en una cuenta aparte abro el artefacto pero no me deja votar. Estoy iniciado sesion
  con la cuenta Chris entonces si deberia de poder. simplemente no me hace nada al darle click al boton para votar en esa slide o
  seccion»*; *«cuando abro una variante automaticamente me abre su explicacion la que dice "que cambio en esta variante" no quiero que
  se abra en automatico ahi esta el boton para cuando quiero abrirlo»* (Chris, 26-nov 18:30 UTC)

---

## 1. En la vista web falta el botón «Por votar»

- **Lo que pasa:** en la vista web de una lección no hay forma de saltar a la siguiente sección que falta por votar. Solo existe en las slides.
- **Lo que pide Chris:** un botón «Por votar» en la vista web que lo mande a la siguiente sección sin votar, **aunque esté en otra lección**.
- **La causa en Cálculo:** en `web.js` las flechas «Voto anterior» y «Siguiente voto» solo recorrían la lección abierta; faltaba saltar de lección.

## 2. El botón de votar no hace nada

- **Lo que pasa:** Chris abre el artefacto de la galería con su sesión de la cuenta Chris, pulsa votar en una slide o en una sección,
  y no pasa nada.
- **La causa en Cálculo:** votar no hace nada cuando esa slide o sección **no tiene pregunta** en `datos/galeria.json`. El arreglo fue
  que el armador genere una pregunta por cada slide (D1…Dn) y por cada sección web (S#, EG), con una sola variante «Hoy» (clave `'hoy'`)
  y ronda `{t:'R1', conHoy:true}`.
- **Otra causa posible:** si la cuenta con la que se abre el artefacto solo tiene acceso para ver, la regla `votos/{self}` no la deja
  escribir. Necesita acceso de colaborador (Contributor).

## 3. «Qué cambió en esta variante» se abre sola

- **Lo que pasa:** al abrir una variante, su explicación «Qué cambió en esta variante» aparece abierta en automático.
- **Lo que pide Chris:** que quede **cerrada** hasta que él pulse su botón.
- **La causa en Cálculo:** la abría `RV.info.mostrar`, llamada en `ver()` de `web.js` y en el clic de la pastilla de variantes en `slide.js`.

## Dónde ver los arreglos de Cálculo

- Repo `metodo-cantu-calculo`, rama `claude/project-thread-j4c0jn`, commits `e4ab37f` (votar cada slide y sección, «Por votar» en
  la web que salta de lección) y `f0e6d6f` («Qué cambió» ya no se abre sola).
- Ficheros: `galeria/armar-materia.mjs`, `galeria/codigo/web.js` y `galeria/codigo/slide.js`.
- **Ojo con el diseño:** la galería de Cálculo salió de una versión vieja de la de mate. Tómala como referencia de la **lógica**, no de
  los botones: en mate el arreglo debe seguir el diseño actual de su galería.

## Las galerías de Cálculo y Geometría

- Chris quiere estos tres arreglos **también** en Cálculo y Geometría analítica. Son las Líneas I (Cálculo diferencial) y J
  (Geometría analítica), de `cuentachris`, así que **las arregla `cuentachris`, no tú**.
- Si al arreglar mate encuentras otra causa, avísanos por este buzón para aplicarla también en las Líneas I y J.
