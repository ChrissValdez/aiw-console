# Decisión del operador — Cantu Studio se pausa mientras Lecciones termina el material del PAA

## Las palabras del operador — LITERALES

```
explicame el estado de cantu studio y que falta a grandes rasgos en el roadmap

porque te digo algo, tecnicamente quiero darle pausa a cantu studio en lo que termino de desarrollar cantu lessons para que sobre todo el material del PAA termine de desarrollar cantu studio pero antes de pausar temporalmente este proyecto quiero acbar los pendientes urgentes y digamos dejarlo en un estado estable,
```

Tras la propuesta de la cabina (tres puntos: un run para la roja H-1; la regla de la pausa; borrar lo no versionado
de `QA/temp/`), y tras confirmar con una página del Moodle real que usa MathJax 3.2.2 (ver
`MEDICION-2026-10-19-EL-MOODLE-REAL-USA-MATHJAX-3.2.2.md`):

```
procede con tus reocmiendaciones
```

## Lo que queda decidido

1. **Antes de pausar:** un run pequeño para dejar la suite en verde (la roja H-1, «los cinco `path` son idénticos
   en los DOS gemelos»), y el relevo del hilo reescrito con el estado de la pausa.
2. **Durante la pausa:**
   - Studio **no abre trabajo nuevo**.
   - Lo nuevo que pida Lecciones se resuelve con un **Bloque HTML**, y la petición queda anotada en
     `PETICIONES-DE-LECCIONES.md` como **«para después de la pausa»**.
   - **Solo se atiende un fallo que rompa una lección ya publicada.**
3. **`QA/temp/` de `cantu-studio`:** se borra lo no versionado (capturas, HTML, copias de antes). Lo versionado se
   queda.
4. **Se retoma** cuando Lecciones termine el material del PAA (D-078 sigue: el pulido grande del editor va entre la
   PAA y el EXANI II).

---

## Precisión del operador, 2026-10-20 — LITERAL

```
solo para dejarlo listo le aviso a CL que pondremos en pausa CS hata terminar el temario de CL
pero que sigua actualizando las peticiones para que cuando llegue el momento de reaundarlo este actualizado
```

### Lo que precisa

- **La pausa dura hasta que Lecciones termine el temario.**
- **Durante la pausa nadie atiende las peticiones en este hilo:** la cabina de Studio no está abierta. **Lecciones las
  mantiene al día ella misma** en sus `docs/PARA-CANTU-STUDIO-*.md`: escribe las nuevas y marca las que ya no hagan
  falta (resueltas con un Bloque HTML, superadas, o retiradas).
- **Al reanudar, la cabina lee todas esas peticiones del disco** y las pasa a `PETICIONES-DE-LECCIONES.md`.
  Sustituye a lo que el punto 2 de arriba decía sobre «se anota en PETICIONES»: no se anota durante la pausa, se
  reconcilia al volver.
