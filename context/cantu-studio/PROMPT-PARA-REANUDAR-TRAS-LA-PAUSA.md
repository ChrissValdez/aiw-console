# Prompt para abrir el hilo `cantu-studio` al terminar la pausa (D-079)

> **SUSTITUIDO el 2026-10-29:** el hilo se mudó a Claude Code. Se abre con `context/cabinas/cantu-studio/ARRANQUE.md` y su `CLAUDE.md`. Esto queda como registro.

> Escrito por la cabina el 2026-10-20, al pausar Studio. Se pega tal cual en un hilo nuevo. Es el mismo que se dio
> al operador en el chat.

```
Hilo cantu-studio. Eres la cabina. Studio estuvo en PAUSA (D-079) mientras Lecciones terminaba el temario del PAA, y hoy se reanuda.

Antes de nada, el arranque de siempre: declara el hilo, deriva la ruta de montaje, comprueba .git/index.lock en los cinco repos, prueba la capacidad (lectura, git log, borrado, .git escribible) y deriva el canónico (.aiw/roadmap/roadmap.json) y el motor que lo conduce.

Luego lee, en este orden y desde el disco:
1. aiw-console/context/handoffs/cantu-studio.md — el relevo de la pausa (2026-10-19). Contrasta sus cifras contra el canónico: entonces eran 277 runs, 267 completados, 0 activos, 10 planned en el archivo O8, suite 3000/3000.
2. aiw-console/context/cantu-studio/PROMPT-DE-REINICIO.md — las trampas y la regla de QA vigente.
3. aiw-console/context/DECISIONES.md — D-077, D-078, D-079 y todo lo posterior que toque a Studio.
4. cantu-lessons/docs/PARA-CANTU-STUDIO-*.md — TODAS las peticiones que Lecciones escribió o actualizó durante la pausa (las fechadas después del 2026-10-17, y las anteriores que haya marcado). Lecciones se comprometió a mantenerlas al día: cuáles siguen vivas, cuáles resolvió con un Bloque HTML, cuáles retiró.

Con eso, tráeme:
- El estado medido en una tabla, con la hora.
- La reconciliación de peticiones: cada una con su estado (viva / resuelta con Bloque HTML / superada / retirada), y propón pasarlas a PETICIONES-DE-LECCIONES.md.
- Qué toca ahora según D-078 (el pulido del editor para que lo usen maestros, entre la PAA y el EXANI II) y qué de lo nombrado-sin-construir del relevo conviene recuperar, con tu recomendación de orden.

No emitas ningún ticket ni toques la cola hasta que yo apruebe ese plan.
```
