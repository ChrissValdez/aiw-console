# HANDOFF — `cantu-revisiones` (la galería de revisión de lecciones)

> Primer relevo. Lo escribió `cuentapato` el **2026-11-26, 04:40 UTC**, al soltar este repo junto con `cantu-lessons` para que lo
> tome `cuentachris` mientras dure el trabajo de la galería como artefacto. **Regresa a `cuentapato` al terminar.** Gana el disco.

## Dónde estamos

- **Main** en `2b81e073` (PR #1, «galería solo avisa»: ventana «Cambios detectados» con cuenta atrás de 10 s).
- **PR #2, abierto:** `prototipos/galeria-artefacto/`, el prototipo «revisar en la lección» de ARI-01, aprobado por Pato como
  primera versión. Solo agrega esa carpeta. Su `README.md` es el encargo: especificación, armado, trampas del artefacto y pendientes.
- **Artefactos** (de `cuentapato`, compartidos como Editor): prototipo https://claude.ai/artifact/DqZag4gc8rJp7rzJsuCHCQ; galería
  ARI-01..05 https://claude.ai/artifact/VPu5BwSchzVrzL6wb5BhBu (se recomendó compartirla también).
- **La ronda CR-LX3** sigue abierta en la galería local; la nube no la tocó.

## Lo que sigue (para `cuentachris`)

1. Aplicar el prototipo a la galería real, solo con 3 lecciones de Aritmética.
2. Analizar cómo mostrar los votos sistemáticos.
3. Después, la galería de Español con el mismo diseño.

## Al regresar a `cuentapato`

Todo artefacto nuevo compartido como Editor, todo subido a GitHub, los PR en el aviso de regreso y este relevo al día
(`mensajes/2026-11-26-0430-cuentapato-cuentachris-accesos-y-regreso.md`).

## Regreso a `cuentapato` (lo escribió `cuentachris`, 2026-11-26 08:15 UTC)

**Chris dio el visto bueno general a la galería y pidió que siga en `cuentapato`.** `cuentachris` suelta este repo y `cantu-lessons`.

- **Lo leído primero:** `prototipos/galeria-artefacto/galeria/TRASPASO.md` (dónde está todo, cómo está hoy, decisiones,
  pendientes y pruebas) y luego `galeria/METODO.md`.
- **Código:** rama `claude/project-thread-exqlbz`, **PR #3 en borrador**: https://github.com/ChrissValdez/cantu-revisiones/pull/3
  (base: la rama del PR #2, que sigue abierto). Todo está en GitHub; nada se quedó solo en disco. Último commit del 26-nov: `76f8f6c1` (v28).
- **Artefacto:** https://claude.ai/artifact/8tPUtu4Zia4N5t7PpnL7qZ, versión 28. Es de Cuenta Chris; Chris lo comparte contigo
  como **Editor** desde Compartir. La base del artefacto guarda votos, comentarios y estados de lección por persona.
- **La ronda CR-LX3** sigue abierta en la galería local; la nube no la tocó.
- **Pendiente:** ver «Pendiente» en `TRASPASO.md` (votos de sistema con historial, galería completa de Aritmética, traer las
  marcas de lección a la laptop).

## 2026-11-28 · cuentachris retoma la galería de mate (Línea B)

- **v78 publicada** (03:15 UTC) en https://claude.ai/artifact/8tPUtu4Zia4N5t7PpnL7qZ: solo cambia `web.js`. Arregla el
  comentario de Chris del 27-nov en ARI-06·S1: el paso a paso «¿Cómo se resta con decimales?» salía con los 8 pasos a la vez.
  Las variantes redactadas copiaban los mismos `name` e `id` de los radios de la sección real; ahora cada copia lleva los
  suyos (`aislarRadios`). Afecta a las 11 lecciones con paso a paso de radios. Recorrido de esas 11: 0 fallas.
  cantu-revisiones PR 32 (fusionado, 908ab7d).
- **Espera a Chris:** revisar la v77/v78; votar ALUMNO-PAA y las 55 recomendaciones; decidir si se hacen las 32 variantes
  «Los mismos pasos que la web». Siguen abiertas la ronda CR-LX3 (galería local) y la rama `cr-fig-04`.
