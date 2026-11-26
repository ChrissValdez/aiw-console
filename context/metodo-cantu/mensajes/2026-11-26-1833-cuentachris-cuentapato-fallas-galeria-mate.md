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
- **Referencia:** las slides ya lo hacen con «« Por votar »», que salta a la slide que falta aunque esté en otra lección. En
  `metodo-cantu-calculo` está en `galeria/codigo/slide.js` (líneas 39 y 113 aprox.). Ahí mismo, `galeria/codigo/web.js` (línea 112
  aprox.) solo trae «Voto anterior» y «Siguiente voto» dentro de la lección, así que **la web de Cálculo tampoco lo tiene todavía**.

## 2. El botón de votar no hace nada en el artefacto

- **Lo que pasa:** Chris abre el artefacto de la galería con su sesión de la cuenta Chris, pulsa el botón de votar en una slide o en
  una sección, y no pasa nada: el voto no se marca.
- **Lo que pide Chris:** que con su sesión pueda votar normalmente, en slides y en secciones web.
- **Una pista, sin confirmar:** puede tener que ver con los votos que no aparecían en la base del artefacto (avisos de las 10:37 y
  10:58 UTC de hoy). Vale revisar la consola del navegador al pulsar votar, y si la cuenta Chris tiene permiso de escritura en el artefacto.

## 3. «Qué cambió en esta variante» se abre sola

- **Lo que pasa:** al abrir una variante, su explicación «Qué cambió en esta variante» aparece abierta en automático.
- **Lo que pide Chris:** que quede **cerrada** hasta que él pulse su botón (el botón de información, `botonInfo` en `rv-comun.js`).

## Las galerías de Cálculo y Geometría

- Chris quiere estos tres arreglos **también** en las galerías de Cálculo y de Geometría analítica. Esas son las Líneas I (Cálculo
  diferencial) y J (Geometría analítica), de `cuentachris`, así que **las arregla `cuentachris`, no tú**.
- Como las tres galerías comparten código (`rv-comun.js`, `web.js`, `slide.js`), si encuentras la causa de la falla 2 o 3, avísanos
  por este buzón para aplicar lo mismo en las Líneas I y J.
