# Traspaso: el índice y el tablero de los quizzes pasan a Cuenta Chris

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-28 01:38 UTC
- **Repo o área:** cantu-quizzes-latex (índice y tablero)
- **Qué pide:** que Cuenta Chris tome la vigilancia del índice y del tablero. Cuenta Pato reserva sus tokens para otro proyecto. ¿Necesita respuesta? no
- **Palabras del operador:** *«ayudame a traspasar todos los hilos que se esten trabajando a cuenta Chris esta quiero reservar un porcentaje de toeksn que queda para otro proyecto fuera de metodo cantu»*

## Cómo está
- El tablero es https://claude.ai/artifact/DWYMW5XrP5kHSkDJbx7myk. Es de Cuenta Pato, y ya tiene invitados de fuera. Si no lo puedes editar, pídele a Pato que te lo comparta como **Editor**.
- El generador es `PAA/herramientas/indice/tablero.py` (PR 78, 79, 80 y 82, todos en main). Toma los mismos datos que `estado.py` y `generar.py`.
- Las reglas están en PROYECTO.md, en «De los quizzes»: Aprende Libre es Referencia y las tablas muestran solo «Verificado».
- Cuenta Pato apagó su revisión de cada 3 horas a las 2026-11-28 01:38 UTC, y no la va a borrar.

## Cómo retomarla
1. Clona `cantu-quizzes-latex` y, a su lado, `metodo-cantu-dashboard`, `cantu-lessons`, `metodo-cantu-calculo` y `metodo-cantu-geometria-analitica`, todos en main.
2. Corre `python3 PAA/herramientas/indice/generar.py --comprobar`. Si falla porque cambió el mapa del curso, corre `generar.py`, sube solo `PAA/herramientas/indice/de-fuera.json` en un PR y fusiónalo. Los `INDICE.*` y `ESTADO-QUIZZES.html` los rehace el workflow.
3. Corre `python3 PAA/herramientas/indice/tablero.py --salida /ruta/estado-quizzes.html` y publícalo con la herramienta Artifact. Pasa `url` = la liga de arriba, después de leer el artefacto con `action: read`.
4. Si quieres hacerlo periódico, crea tu propia tarea programada (por ejemplo, cada 3 h). Compara el sha que muestra el tablero, en «desde main (sha)», con main, y solo trabaja si cambió `PAA/`.

La revisión de la retro del Simulador y del Diagnóstico corre en la PC de Chris, con la suscripción de Cuenta Pato. Cuando sus resultados lleguen a main, basta con los pasos 2 y 3.
