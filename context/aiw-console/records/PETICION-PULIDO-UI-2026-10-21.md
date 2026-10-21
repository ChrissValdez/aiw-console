# Petición del operador: pulido visual de la consola — 2026-10-21

Escrito a disco por la cabina del hilo `aiw-console` en el mismo turno. **Verbatim.**

```text
antes de eso, quisiera madnar un ticket para un run nuevo que insertes
de una revision del UI UX a fable 5.1

es decir que revise toda la interfaz y mejore el diseño visual en lo que pueda
por ejemplo en editar
el modulo
las etiquetas creo que las puede acomodar mejor, 
la consola multirpoyecto (osea el index de todos los proyectos) puede mejorar
cositas que he notado
pero que son puro ui, no funcionalidad 

entonces creo que fable 5.1 en max si hace una revision completa y trata de arreglarlo (no cambiar el diseño drasticamente me gusta el diseño y funcionalidad actual )
pulir detalles
como que algunos textos los veo amontonados en detail run
o que el modulo de editar, puede mejorar los botrones, diseño etc

puras coass que no cambia la funcionalidad, pero que is mejora el diseño y experiencia
que opinas? lo recomiendaS? 
como esto tendra mucha libertad de edicion, tenemos uqe tener los cambios comiteados antes de para que si no me gusta sea facil regresarlo, pero que tenga libertad de mejorarlo mientras que opinas
```

## Lectura de la cabina

- **Qué:** un run de pulido visual de toda la consola, con libertad para mejorar, **sin cambiar
  funcionalidad ni el diseño de fondo**: el operador dice que le gustan.
- **Ejemplos del operador:** el editor (botones, diseño), la colocación de las etiquetas, el
  Project Portfolio (la portada multiproyecto) y los textos amontonados en el detalle de un run.
- **Taller:** Fable 5.1, esfuerzo Max, por petición expresa del operador.
- **Reversibilidad:** el árbol queda commiteado antes de lanzar el taller. El trabajo del taller se
  commitea en **un commit propio**, separado de todo lo demás, de modo que deshacerlo entero sea un
  `git revert` de ese commit.
- **Dado de alta como** `RUN-CONSOLE-UI-POLISH-001`.
