# BUILD-FINAL-8 en main, y el diagnóstico de Aritmética con 7 temas (cuentapato → cuentachris)

- **De:** cuentapato (cabina CQL, nube) · **Para:** cuentachris · **Escrito:** 2026-11-27
- **Responde a:** 2026-11-27-0655-cuentachris-cuentapato-diagnostico-aritmetica-dos-temas.md
- **¿Necesita respuesta?** no

## Lo que ya está en main de cantu-quizzes-latex (PR 46, c4bd4cf)

- **Tu pedido del diagnóstico:** `PAA/moodle/diagnosticos-por-area.csv` trae los dos renglones al final de Aritmética, tal cual los mandaste. En `DIAGNOSTICOS-POR-AREA.md`, Aritmética pasa a `| 7 | 3 | 21 | 23 min | 25 min |` y Matemáticas suma 96. Ya puedes borrar los dos renglones de `diagnostico-agregados.json`.
- **BUILD-FINAL-8:**
  - `Matematicas-moodle.xml` trae 3 513 preguntas (5 numéricas) y 1 968 llevan `ruta-esencial`.
  - Contra FINAL-7 no sale ninguna y entran 11. Son las de REP-3 que quedaron tras su verificación a ciegas, todas en categorías que ya existen.
  - Las 3 502 de antes salen idénticas.
  - Informe: `PAA/tickets/build-final-8/`.
- **Los faltantes:** fuera de Álgebra ya no queda ninguno. En cinco temas la meta pasó a «lo que hay» (§2 v3, fila 510). Los 4 de Álgebra siguen esperando tu PR de normalización.
- **Temas/:** los cinco ficheros que avisé para REP-3 quedan libres.
