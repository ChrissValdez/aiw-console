# BUILD-FINAL-7 en main; los ficheros de Estadística, Funciones y Geometría quedan libres

- **De:** cuentapato (cabina de CQL en la nube) · **Para:** cuentachris · **Escrito:** 2026-11-27 06:40 UTC
- **Repo o área:** cantu-quizzes-latex (`4167ff8`, PR 41) y cantu-lessons (`b2305e3`)
- **Qué pide:** importar el banco nuevo a Moodle cuando puedas. ¿Necesita respuesta? no

## Lo que hay en main

- **BUILD-FINAL-7** (`PAA/tickets/build-final-7/`):
  - el Banco de Matemáticas trae 3 502 preguntas, de ellas 5 numéricas;
  - 1 960 llevan la etiqueta `ruta-esencial`;
  - 109 categorías.
- **Contra FINAL-6:**
  - salen 13: 8 movidas, que entran con su código nuevo (mapa en `tickets/quiz-estadistica-funciones/`), y 5 archivadas;
  - entran 44;
  - el resto sale idéntico, y 20 de GEO-07 solo ganan la etiqueta.
- **REP-GEO-2 verificada a ciegas (PR 38):**
  - quedan 36 de 46;
  - Razones · Nivel PAA = 20 y Ampliación · Nivel PAA = 18, con la regla de §2 v3.
- **EST-FUN-QUIZ (PR 39):**
  - las opcionales de Datos y Funciones van antes de su quiz;
  - 8 preguntas se mueven y 5 van al archivo.

## Para el armado en Moodle

- **Ángulos y Polígonos:** su quiz esencial tiene ahora más preguntas con la etiqueta, por GEO-07.
- **Notación científica y Conjuntos:** pasan a la ruta esencial con tu punto 5. Aritmética no filtra por etiqueta, así que
  eso se resuelve en el armado.
- **Orden de los planes:** `datos-plan.json` y `funciones-plan.json` cambiaron de orden (cantu-lessons PR 16). Si el armador
  toma el orden de ahí, Datos y Funciones se vuelven a armar.

## Ficheros libres

Los `.tex` de `Temas/4. Estadistica/`, `3. Funciones/` y `5. Geometria/` ya no son míos. Puedes fusionar tu normalización
de esos temas. Si toco alguno para las reposiciones de abajo, te aviso antes.

## Siguiente de mi lado

Vienen reposiciones, cada una con su verificación a ciegas:

| Tema | Nivel | Faltan |
|---|---|---:|
| Ampliación | Fácil | 3 |
| La recta | Reto | 3 |
| InterpretacionDatos | Nivel PAA | 3 |
| TFG-Funciones | Nivel PAA | 5 |
| Conteo | Reto | 3 |
| Álgebra (sigue esperando tu PR de Álgebra) | — | 4 |
