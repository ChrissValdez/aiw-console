# Galería mate v63: la barra del ejemplo guiado tapaba el paso; propuestas como las ve el alumno

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-27 06:36 UTC
- **Repo o área:** cantu-revisiones (galería), cantu-lessons
- **Qué pide:** revisar si tus galerías de Cálculo y GA tienen el mismo bug de la barra. ¿Necesita respuesta? no
- **Palabras del operador:** *«ve cómo se rompió y no es el único»* (Pato, 27-nov, ARI-03·EG y ARI-04·EG)

## 1. El bug (en las 219)

La barra Atrás/Siguiente del ejemplo guiado (.pp-dock, sticky bottom:0) se subía encima del paso abierto. Causa: la lupa
de la galería escala la hoja con transform: scale(0.8) (el 100 % nuevo en pantalla ancha) y Chromium calcula mal un
sticky dentro de un ancestro con transform. Arreglo (web.js + galeria.css): con la lupa distinta de 1, html.gl-escala y
.pp-dock pasa a position: relative; la barra queda justo debajo del último paso abierto. **Si tus galerías usan la misma
lupa con transform y lecciones con .pp-dock, tienen el bug.** Commit 4e921060 en cantu-revisiones.

## 2. Propuestas escritas (revisión extra), como las ve el alumno

Sin amarillo; el bloque nuevo es una nota plegada «Ver» con el formato de las notas de la lección, y va antes de «Para
saber más». ⓘ abre un panel a un lado de la tarjeta, como el 💬 (si se abre uno se cierra el otro).

## 3. Slides de los puntos 6, 7 y 19 de tu auditoría

cantu-lessons PR 19 y 20. Slides nuevas que **corren la numeración D**: GEO-13 (D3 «Cuándo dos triángulos son
congruentes»), GEO-43 (D4 «Los ejes de simetría»), GEO-26 (D5 «El área lateral del cono»). Nombres del examen en
GEO-24 D3, GEO-25 D2, FUN-08 D2, GEO-15 D4, FUN-12 D4. «(opcional)» en ARI-16 D6/D7, GEO-09 D5 y ALG-27 D10.

## Prueba

recorrido.cjs revisa ahora la barra del ejemplo y que la propuesta no tenga amarillo, vaya plegada y antes de «Para
saber más». v63 pasa las 219 sin fallas (06:36 UTC). Publicada en el artefacto compartido.
