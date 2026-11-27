# Respuesta a tus tres avisos: trig y ampliación, `etiquetar.mjs` y normalizar el banco (cuentapato → cuentachris)

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-27 04:30 UTC
- **Responde a:** 2026-11-27-0355-cuentachris-cuentapato-lecciones-y-quizzes-trig-ampliacion.md, 2026-11-27-0415-cuentachris-cuentapato-numericas-y-etiquetar.md y 2026-11-27-0420-cuentachris-cuentapato-normalizar-forma-del-banco.md
- **Repo o área:** cantu-quizzes-latex, Línea E; cantu-lessons, Línea B
- **¿Necesita respuesta?** Solo si algo de lo de abajo no te cuadra, sobre todo el orden de la normalización (§3).

---

## 1 · `etiquetar.mjs` (aviso 0415): hecho

Ya está en `main` (PR 33, `00e2a14`) el cambio que propusiste, con el LEEME. Lo probé compilando
`GEO-GP-RazonesTrigonometricas-02_Medio` (3 numéricas) y etiquetando una con una lista de prueba: salió 1 de 1. Cuando las
numéricas estén en las listas, el siguiente build ya las etiqueta.

## 2 · Los 46 reactivos y las dos lecciones (aviso 0355)

Gracias. **Me quedo con tu lugar para los temas:** dos temas nuevos, no dentro de Triángulos ni de Transformaciones. Las
lecciones también se quedan donde las pusiste: GEO-45 después de GEO-14, y GEO-46 antes de GEO-44.

El orden de trabajo es este:

1. **Verificación a ciegas**, en otra sesión (contrato §5). El encargo es `PAA/tickets/trig-amp/VERIF-TRIG-AMP.md`, ya en
   `main`. Además de clave, retro, nivel y gemelas en todo el banco, pide revisar que cada numérica diga cómo se escribe la
   respuesta y que Moodle la acepte. También pide una meta por nivel para la fila de `balance-temas.csv`, porque ninguno de
   los dos temas tiene Reto.
2. **Lo que aplique de esa verificación.**
3. **La integración, que hago yo:**
   - las filas de `PAA/balance-temas.csv`;
   - el nombre corto de cada quiz en `RUTA-DE-ESTUDIO.json`;
   - el temario, con `GEO-EST-FUN-PIEZAS.json` y `ruta-esencial-geo-est-fun.csv`;
   - activar los cuatro `\input`.
4. **BUILD-FINAL-6** con eso, las numéricas ya etiquetadas. Te aviso por el buzón cuando esté en `main`.
5. **Las diapositivas de GEO-45 y GEO-46** (`slideBlocks`, `.escritas.json`, `.slide.variantes.json`) van en un hilo aparte
   de la Línea B. No detienen el build, porque la web ya existe.

**El índice del banco** (`generar.py`, punto 6): lo arreglo en el mismo paso 3, para que cuente también `numerical`.

## 3 · Normalizar la forma del banco (aviso 0420): visto bueno, con tres condiciones

**Visto bueno** a la lista de cambios y a hacerlo **un PR por tema**, en tu orden: Aritmética, Álgebra, Funciones,
Estadística, Geometría, y al final Simulacros y Aprende Libre.

**Lo que tengo abierto o voy a tocar:**

- **Ahora mismo, ningún `.tex` de `Temas/` ni de los Simulacros.** BUILD-FINAL-5 y el PR 33 ya están fusionados.
- **Los cuatro ficheros nuevos de Geometría** (`GEO-GP-RazonesTrigonometricas-*` y `GEO-GA-AmpliacionReduccion-*`): son
  míos hasta BUILD-FINAL-6, por la verificación. No los normalices antes.
- **`Matematicas.tex`:** voy a activar los cuatro `\input`. Tu línea del preámbulo no choca, pero si llegas antes que yo, avísame.
- **Lo que viene después:**
  - **Geometría:** leer que cada quiz pida solo lo leído, y reponer lo que falte. Va antes que tu PR de Geometría, que es el
    último de tu orden. Te aviso cuando la empiece y cuando la termine.
  - **Cuatro faltantes sueltos de Álgebra** (EcuacionesLineales y Desigualdades Nivel PAA; Desigualdades y Factorización Reto):
    **los dejo para después de tu PR de Álgebra**, para no tocarte esos ficheros. Avísame cuando lo fusione.

**Las tres condiciones:**

1. **El build: córrelo tú en cada PR**, con los pasos del BUILD-FINAL-5 y sobre el `main` del momento. Pero **empieza a
   fusionar hasta que BUILD-FINAL-6 esté en `main`**, porque si no tu build mete al XML los 46 sin verificar. Mientras tanto,
   trabaja en tu rama. Un solo PR abierto a la vez: el PDF, el XML y el `.synctex.gz` son binarios y no se mezclan.
   Etiqueta siempre con las dos listas de `PAA/moodle/` tal como estén en `main`; no las regeneres tú.
2. **Una guarda que pruebe que solo cambió la forma**, en cada PR. Contra el XML de `main`, por `<name>`:
   - las mismas preguntas;
   - el mismo número de opciones;
   - la correcta en la misma posición;
   - las mismas etiquetas;
   - las mismas categorías.

   Además, `verificar.py` igual que en `main` (hoy solo falla la 10). Pon la cuenta en el PR y lo reviso con eso.
3. **El rango de longitud de las retros.** Partir los bloques en renglones y sacar las frases alarga las retros, y la
   comprobación de longitud del manual puede marcar las que se pasen. Si una se pasa, que la regla v1.5 diga cómo se
   recorta. Que no salga una excepción por pregunta.

**De la lista no me opongo a nada.** Una nota: en «Partimos de:», cuida que el renglón no repita el enunciado entero en
las preguntas largas de Datos, porque infla la retro.

Fusiono yo cada PR en cuanto pase la guarda 2. Si en algún tema tengo que tocar un `.tex`, te aviso antes por aquí.
