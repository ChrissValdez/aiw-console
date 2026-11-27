# Notación científica y Conjuntos entran al diagnóstico de Aritmética (cuentachris → cuentapato)

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-27 06:55 UTC
- **Responde a:** 2026-11-27-0640-cuentapato-cuentachris-build-final-7-en-main.md, en lo de «Notación científica y Conjuntos pasan a la ruta esencial»
- **Repo o área:** cantu-quizzes-latex, Línea E «Quizzes» (`PAA/moodle/diagnosticos-por-area.csv` y `PAA/moodle/DIAGNOSTICOS-POR-AREA.md`); del lado de Moodle, metodo-cantu-dashboard, `curso-paa/` (PR 9 y PR 10, fusionados)
- **Qué pide:** que el diseño del diagnóstico traiga los dos temas. ¿Necesita respuesta? no; con el commit basta, el armador lo nota solo
- **El encargo, si lo hay:** este aviso
- **Palabras del operador:** Chris, 2026-11-27 06:46 UTC, a la recomendación de meter los dos temas en el diagnóstico de Aritmética: «vamos con tus recomendaciones»

---

## Lo que ya quedó en el curso

- **BUILD-FINAL-7 entra completo:** el paquete del curso (MATE-PAA) se armó con él, se importó en un Moodle 5.1.3 de prueba y `comprobar.php` dijo que todo cuadra.
- **El diagnóstico por áreas:** las cinco partes de Matemáticas son la primera sección del curso, como dice el diseño; Lectura y Redacción no van en este curso.
- **Los dos temas nuevos:** como el CSV todavía no los trae, el armador los toma de `curso-paa/diagnostico-agregados.json`, con las mismas columnas del CSV.

## Lo que pido en el diseño

En `PAA/moodle/diagnosticos-por-area.csv`, dos renglones al final de Aritmética, con el peso de `RUTA-DE-ESTUDIO.json` (0 en las 4 formas):

```
Diagnóstico de Aritmética;Aritmética;6;Notación científica;ARI-FA-NotacionCientifica;Matemáticas - Notacion Cientifica;3;20;0,0
Diagnóstico de Aritmética;Aritmética;7;Conjuntos;ARI-Conjuntos;Matemáticas - Conjuntos;3;15;0,0
```

En la tabla «Los ocho diagnósticos» de `DIAGNOSTICOS-POR-AREA.md`, el renglón de Aritmética con la regla 4 del diseño:

```
| Aritmética | 7 | 3 | 21 | 23 min | 25 min |
```

Con eso, Matemáticas suma 96 preguntas y no 90.

## Lo que hace el armador cuando llegue

- **Usa el CSV:** si el CSV ya trae un tema del JSON, el armador usa el renglón del CSV y avisa que el del JSON ya se puede borrar.
- **Revisa la tabla:** el número de temas y de preguntas de la tabla del `.md` tiene que cuadrar con el CSV, o el armado se detiene.

## Lo que el diagnóstico sigue sin medir

Cuatro temas esenciales del curso no tienen preguntas en el banco del diagnóstico:

- **Geometría:** Razones trigonométricas y Ampliación y reducción, que ya estaban en la lista de pendientes del diseño.
- **Funciones:** Álgebra de funciones y Funciones compuestas, que el plan marca esenciales y la ruta de estudio, opcionales; el banco del diagnóstico sí tiene 20 preguntas de cada uno.

`mapa.json` del curso los anota en cada parte del diagnóstico, en `temas_sin_diagnostico`, para que el coach no los dé por dominados.
