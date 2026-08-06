# Análisis de solo lectura — formato, invariantes y piloto editorial
**Repo:** `cantu-quizzes-latex` · **Fecha de medición:** 2026-08-06 · **Modo:** solo lectura

Este documento es un insumo. No decide nada. No se modificó, creó ni borró ningún
fichero de `cantu-quizzes-latex`; no se compiló nada; no se ejecutó ningún comando
git que escriba. El único fichero escrito es este record.

---

## 0. Resumen ejecutivo

**El formato es uniforme y un procedimiento único SÍ sirve para los 274 ficheros.**
La DSL está definida en tres componentes byte-idénticos en las cuatro unidades, la
convención de nombres se cumple al 100 %, y el 99,84 % de las preguntas son
estructuralmente idénticas. No se dispara el "para al terminar B".

**Pero las cifras de la cabina no cuadran con el disco en cinco de los nueve puntos.**
La diferencia no es de redondeo: en B5 la cabina midió 10 códigos repetidos y el disco
dice 30, y esos 30 revelan que un fichero completo del Banco es una copia de otro con
el título cambiado. En B7 la cabina reportó fallos de imagen y el disco dice cero.

**Los hallazgos que importan, en orden:**

| # | Hallazgo | Alcance |
|---|---|---|
| 1 | 3 ficheros no compilan: `\end{multicols}`, `\end{m}`, `\end{multia}` en vez de `\end{multi}` | 9 entornos sin cerrar |
| 2 | `4.2.2. EST-TCP-Probabilidad-02_Medio.tex` es copia de `4.2.1. EST-TCP-Conteo-02_Medio.tex` con solo el título cambiado — el Banco no tiene ni una sola pregunta de probabilidad de nivel medio | 30 preguntas |
| 3 | La respuesta correcta está en la posición 3 el 43 % de las veces y en la posición 1 solo el 7,6 %, con `shuffle=false` forzado en el paquete | 4 689 preguntas |
| 4 | `GEO-GP-Triangulo-` (singular) en 45 preguntas del Banco donde el resto del repo usa `GEO-GP-Triangulos-` | 45 preguntas |
| 5 | Los cuatro ficheros maestros tienen el 100 % de sus `\input` comentados: hoy el repo no produce nada al compilarse | 4 ficheros |

**Sobre el procedimiento (Parte C):** el fichero piloto es el **más pequeño del repo**
(9 preguntas frente a una mediana de 20 y un máximo de 60). Extrapolar el coste del
lote a partir de él subestima por un factor de ~2,3. Detalle y cifras en C3.

---

# PARTE A — El mapa del formato

## A1. La DSL

### Ubicación e identidad

Cada una de las cuatro unidades tiene su propio `components/` con tres ficheros.
Verificado por MD5: **las 12 copias son byte-idénticas**.

| Fichero | MD5 | Bytes |
|---|---|---|
| `aleph-comandos.sty` | `f6140b02c52d3fbdea09d97a22fb0ac0` | 8 263 |
| `aleph-moodle.sty` | `a8969c3b0922075a15c3f356479936d6` | 7 843 |
| `aleph-notas.cls` | `de1b4964be2189f1e3655e11760d2778` | 14 918 |

Las cuatro unidades son:
`PAA/Banco de Preguntas/Español`, `PAA/Banco de Preguntas/Matematicas`,
`PAA/Examen Diagnostico`, `PAA/Examen Simulador`.

> **Nota de ruta:** el ticket escribe `Espanol`; en disco es `Español` con eñe.
> Todas las rutas de este documento usan la forma real del disco.

### `aleph-notas.cls` — la clase de documento

Deriva de `article`. No sabe nada de quizzes: define la **página**, no la pregunta.

- **Opciones:** `10pt|11pt|12pt`; tamaños `amplio|compacto|a4|a5` (por defecto
  `compacto,10pt`); interruptores `comentarios` y `codigo` que activan o excluyen
  entornos homónimos.
- **Expone:** `\institucion`, `\autor[corto]{largo}`, `\carrera`, `\asignatura`,
  `\tema[corto]{largo}`, `\fecha`, `\logouno[ancho]{ruta}`, `\logodos[ancho]{ruta}`,
  `\encabezado`, `\fuente{mathpazo|montserrat}`, `\interlineado`.
- **Entornos de teoría:** `ejem`, `obs`, `prop`, `cor`, `lem`, `ejer`, `teo`, `defi`,
  `axioma`, `advertencia`, `comentarios`, `codigo`.
- **Nota:** carga `graphicx`; es el origen de `\includegraphics` (B7).

Ninguno de los entornos de teoría aparece en el árbol de contenido. La clase está
sobredimensionada para el uso que se le da.

### `aleph-comandos.sty` — la biblioteca matemática

Puro azúcar de notación. Conjuntos (`\N \Z \Q \R \C \K`), operadores
(`\dom \rec \img \rg \Var \mcd \mcm`…), delimitadores de intervalo
(`\open \close \openl \openr`), sucesiones, abreviaturas lógicas
(`\Imp \Dimp \ssi`), y comandos desplegados (`\dlim \dsum \dint`).

Dos redefiniciones globales con efecto de largo alcance:
`\renewcommand{\l}{\left}` y `\renewcommand{\r}{\right}` — capturan dos comandos de
una letra de LaTeX. También `\renewcommand{\sin}{\sen}` y `\renewcommand{\emptyset}{\varnothing}`.

### `aleph-moodle.sty` — **este es el corazón de la DSL**

Cabecera: `v15.2 - Corrige duplicidad de feedback`, fechada 2025/07/22.
Envuelve el paquete `moodle` cargado con la opción `[subsection]` y **redefine**
cuatro de sus entornos: `quiz`, `multi`, `numerical`, `shortanswer`, `essay`.

En el árbol de contenido solo se usan `quiz` y `multi`. Recuento de tokens
`\begin{...}`+`\end{...}` en todo `PAA/`:

```
16832 itemize     554 quiz        8 tabular
11445 multi        14 cases       7 multia   <- typo
 1014 center       14 pmatrix     2 Itemize  <- typo
  666 enumerate     8 document    1 multicols <- typo
                                  1 m         <- typo
```

`numerical`, `shortanswer` y `essay` están definidos pero **nunca se usan**.

---

### El contrato de `\begin{quiz}`

```latex
\renewenvironment{quiz}[2][]{ ... }
```

**Firma:** `\begin{quiz}[<claves moodle>]{<categoría>} ... \end{quiz}`

- **Argumento 1 (opcional):** claves del paquete `moodle`, pasadas a `\setkeys{moodle}`.
  **Uso real en el repo: 0 de 274.** Nadie lo usa nunca.
- **Argumento 2 (obligatorio):** el nombre de la categoría. Se pasa a `\setcategory`,
  que (a) escribe `<category>` en el XML de Moodle y (b) emite un `\subsection{...}`
  (o `\section` si estuviera activa la opción `section`) y abre un `enumerate`.
- El entorno también define `\setsubcategory{...}` para anidar categorías.
  **Uso real: 0.**

**Uso real medido:** exactamente **un** `\begin{quiz}` por fichero de contenido,
274 de 274, siempre con solo el argumento obligatorio. 236 títulos distintos; los
38 repetidos son los pares Diagnóstico/Simulador que comparten tema.

---

### El contrato de `\begin{multi}` — el que importa

```latex
\RenewEnviron{multi}[2][]{ ... }
```

**Firma:** `\begin{multi}[<opciones>]{<ID>} <cuerpo> \end{multi}`

**Argumento 1 — opcional, `[...]`.** Se expande dentro de:

```latex
\setkeys{moodle}{shuffle=false,#1,questionname={#2}}
```

Dos consecuencias que no son obvias:

1. **`shuffle=false` está forzado por el paquete**, no por el contenido. Las opciones
   salen siempre en el orden en que están escritas, tanto en PDF como en el XML. Esto
   convierte la posición de `\item*` en un dato con significado didáctico
   (ver B-extra D2, donde resulta estar muy sesgada).
2. `#1` se expande **después** de `shuffle=false`, así que un ítem podría
   reactivar el barajado. Ninguno lo hace.

La única clave usada en el repo es `feedback={...}`. Medición sobre las 5 713
preguntas de contenido:

```
feedback  : 5713 (100 %)
```

Ninguna otra clave (`grade`, `penalty`, `tags`, `idnumber`…) aparece jamás.

**Argumento 2 — obligatorio, `{...}`.** Es el **ID de la pregunta**, y se convierte en
`questionname` de Moodle. No es un título legible: es el código
(`LEC-AEL-FuncionesLenguaje-Dificil-009`). Se escribe en dos estilos, ambos válidos:

```latex
{%
    LEC-CG-Inferencias-Facil-001
}
```
```latex
{GEO-GP-Triangulos-Facil-005}
```

**Cuerpo.** Todo lo que va entre el `{ID}` y el `\end{multi}`:

- El **enunciado**, que es todo el texto hasta el primer `\item` de nivel superior.
  Incluye instrucciones, pasaje numerado, imágenes y la pregunta.
- Las **opciones**, introducidas por `\item` (distractora) o `\item*` (clave).

**El asterisco es toda la clave de respuesta.** No hay campo `answer=`, ni índice, ni
letra. `\item*` marca la correcta; `\item` marca las demás. Por eso un `\item` que
pierde su asterisco no produce error de compilación, produce una pregunta sin respuesta
correcta — y por eso B3 es un invariante que hay que comprobar explícitamente.

**Ojo con el conteo:** `\item` es también el comando de `itemize`, y las
retroalimentaciones están llenas de `\begin{itemize}...\item...\end{itemize}`.
Cualquier contador de opciones debe llevar profundidad de anidamiento. La
retroalimentación va en el argumento *opcional*, así que queda fuera del cuerpo
automáticamente; pero también hay `itemize` dentro del cuerpo en algunos ítems.

**Doble salida.** El entorno hace dos cosas con el mismo material:

- **XML de Moodle** (compilando con XeLaTeX): `\questiontext`, `writemultiquestion`,
  y `loopthroughitemswithcommand{savemultianswer}`. El `feedback` se guarda como
  `generalfeedback`.
- **PDF** (compilando con pdfLaTeX): imprime el enunciado, las opciones, y luego —
  si `\miFeedbackGuardado` no está vacío y no se pasó `handout` — un `\fbox` azul
  rotulado **"Retroalimentación:"**.

El comentario de cabecera del maestro lo confirma:
`% Para obtener solo el pdf, compilar con pdfLaTeX. Para obtener el xml compilar con XeLaTeX.`

---

### Los ficheros maestros — hallazgo estructural

Cada unidad tiene un maestro con `\documentclass[a4,11pt]{components/aleph-notas}`,
los metadatos (`\institucion{Educa Talento}`, `\asignatura{Preparacion para el examen PAA}`),
y una lista de `\input`. **Todos los `\input` están comentados salvo uno por fichero:**

| Maestro | `\input` totales | activos | comentados |
|---|---|---|---|
| `Banco de Preguntas/Español/Español.tex` | 52 | **0** | 52 |
| `Banco de Preguntas/Matematicas/Matematicas.tex` | 123 | 1 | 122 |
| `Examen Diagnostico/Examen_Diagnostico.tex` | 58 | 1 | 57 |
| `Examen Simulador/Examen_Simulador.tex` | 42 | 1 | 41 |

Los tres activos son:

```
Matematicas.tex:369  \input{Temas/5. Geometria/5.1.1. GEO-GP-Angulos-02_Medio.tex}
Examen_Diagnostico.tex:145  \input{Secciones/3. Matemáticas/GEO-GA-Transformaciones.tex}
Examen_Simulador.tex:43  \input{Secciones/1. Lectura/LEC-AEL-Vocabulario.tex}
```

Esto es el patrón normal de trabajo (se descomenta un fichero, se compila, se vuelve a
comentar), pero significa que **el estado actual del repo no es compilable a nada útil**:
`Español.tex` produciría un PDF con encabezado y cero preguntas. Además, los defectos de
sintaxis del punto B3 están hoy *latentes* precisamente porque esos ficheros no se
incluyen; se manifestarán la primera vez que alguien los descomente.

## A2. La convención de nombres de fichero

**Hay dos convenciones, y son distintas.** Ambas se cumplen al 100 %.

### Banco de Preguntas — 174 ficheros, 174 conformes

```
1.1.2.LEC-CG-Inferencias-01_Facil.tex
└─┬─┘ └┬┘ └┬┘ └────┬────┘ └┬┘ └─┬──┘
  │    │   │       │       │    └── DIFICULTAD, texto: Facil | Medio | Dificil
  │    │   │       │       └─────── ORDINAL de dificultad: 01 | 02 | 03
  │    │   │       └─────────────── TEMA, CamelCase sin espacios
  │    │   └─────────────────────── SUBÁREA: CG, AEL, HA, MT, RS, FA, PI, EXP, EQD, RA, FF, TFG, OF, SP, ED, TCP, GP, GA, GS
  │    └─────────────────────────── ÁREA: LEC | RED | ARI | ALG | FUN | EST | GEO
  └──────────────────────────────── NUMERACIÓN jerárquica del temario (capítulo.sección.subsección)
```

**El ordinal y la dificultad son redundantes y están perfectamente correlacionados:**
`01→Facil` (58 ficheros), `02→Medio` (58), `03→Dificil` (58). Sin una sola excepción.

**Variante sin subárea:** 6 ficheros omiten el segmento de subárea porque el área no la
tiene subdividida — `1.2.ARI-TeoriaNumeros-{01,02,03}_*.tex` y
`1.5.ARI-Conjuntos-{01,02,03}_*.tex`. Es una variante legítima, no un defecto.

**Espaciado:** los ficheros de Matemáticas de Álgebra en adelante llevan un espacio tras
el punto de numeración (`2.1.1. ALG-...`), los de Español y Aritmética no
(`1.1.2.LEC-...`). Cosmético, sin efecto.

### Exámenes — 100 ficheros, 100 conformes

```
LEC-AEL-FuncionesLenguaje.tex        GEO-GP-Triangulos.tex        MIX-PAA.tex
└┬┘ └┬┘ └───────┬────────┘
 │   │          └── TEMA
 │   └───────────── SUBÁREA (opcional, mismo vocabulario)
 └───────────────── ÁREA
```

**Sin numeración jerárquica, sin ordinal, sin dificultad.** El fichero de examen agrupa
todas las preguntas de un tema con independencia de su nivel. La jerarquía la aporta la
carpeta (`Secciones/1. Lectura/`, `2. Redacción/`, `3. Matemáticas/`).

Un solo nombre no encaja en la pauta área-subárea: `MIX-PAA.tex` (Simulador). Es
deliberado: es la sección de simulacro mixto y sus 30 preguntas no existen en el Banco.

### Coherencia nombre ↔ código interno

| Comprobación | Consistentes | Inconsistentes |
|---|---|---|
| Dificultad del nombre = dificultad del código | **3 848 / 3 848** | 0 |
| Tema del nombre = prefijo del código | 3 773 | **75** |

Las 75 inconsistencias están en exactamente tres ficheros y son los defectos 2 y 4
del resumen ejecutivo:

```
4.2.2. EST-TCP-Probabilidad-02_Medio.tex  -> 30 preguntas con código EST-TCP-Conteo-*
5.1.2. GEO-GP-Triangulos-02_Medio.tex     -> 30 preguntas con código GEO-GP-Triangulo-* (singular)
5.1.2. GEO-GP-Triangulos-03_Dificil.tex   -> 15 preguntas con código GEO-GP-Triangulo-* (singular)
```

## A3. Los comentarios de cabecera

### Anatomía

Bloque de tres líneas inmediatamente antes de cada `\begin{multi}`:

```latex
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% Problema: 1
%% Subtema: Ideas Implícitas e Inferencias
%% Código: LEC-CG-Inferencias-Facil-001
\begin{multi}[%
```

- **`%% Problema:`** — ordinal dentro del fichero, base 1.
- **`%% Subtema:`** — etiqueta legible, con acentos y espacios. Suele coincidir con
  la parte final del título del `quiz`.
- **`%% Código:`** — repite literalmente el ID que va en el argumento obligatorio.

**El orden de los tres campos varía.** En Español y Aritmética es
`Problema / Subtema / Código`; en Geometría es `Problema / Código / Subtema`. Un lector
mecánico debe buscar por etiqueta, no por posición.

Campos adicionales, todos raros:

```
5720 %% Código:            28 %% URL Problema:       7 %% Subtopic:  (test.tex, en inglés)
5719 %% Problema:          28 %% URL Explicación:    7 %% Problem:
5710 %% Subtema:                                     7 %% Code:
                                                     3 %% CATEGORY:
                                                     1 %% Categoria:
```

`%% URL Problema:` y `%% URL Explicación:` aparecen 28 veces cada uno y están **siempre
vacíos**. Los campos en inglés son exclusivos de `Español/Temas/test.tex`.

### ¿Son fiables como metadato?

**Sí, con una salvedad.** Contra las 5 713 preguntas de contenido:

| Campo | Apariciones | Δ vs. 5 713 |
|---|---|---|
| `%% Código:` | 5 715 | +2 |
| `%% Problema:` | 5 714 | +1 |
| `%% Subtema:` | 5 705 | −8 |

Las desviaciones se concentran en cuatro ficheros, y **tres de ellas son consecuencia de
los defectos de sintaxis de B3, no defectos de comentario**:

```
1.2.6.LEC-AEL-FuncionesLenguaje-03_Dificil.tex  multi=9  Problema=10 Subtema=10 Codigo=10
5.1.2. GEO-GP-Triangulos-01_Facil.tex           multi=14 Problema=15 Subtema=15 Codigo=15
```

En ambos hay 10 y 15 preguntas *declaradas por comentario*; el parser solo reconoce 9 y
14 porque un `\end{multi}` está mal escrito. **Los comentarios de cabecera son aquí más
fiables que la sintaxis LaTeX** — y sirven como detector independiente del defecto.

Las dos desviaciones restantes son errores de comentario genuinos:

```
1.1.2.ARI-FA-Operaciones-01_Facil.tex   multi=15 Problema=15 Subtema=5  Codigo=15   -> faltan 10 %% Subtema:
5.2.2. GEO-GA-Recta-03_Dificil.tex      multi=15 Problema=14 Subtema=15 Codigo=15   -> falta 1 %% Problema:
```

**Conclusión operativa:** `%% Código:` es fiable como metadato (99,96 % de cobertura, y
las desviaciones son explicables). Pero **es una duplicación del argumento obligatorio**,
así que puede desincronizarse en silencio. Cualquier proceso que lo use debería
verificar primero que ambos coinciden; hoy coinciden en todos los casos comprobados.

---

# PARTE B — Los invariantes mecánicos

**Método.** Analizador propio en Node.js (`parse.js`, `envcheck.js`, `img.js`) que
recorre los 281 `.tex` bajo `PAA/`, elimina comentarios TeX respetando `\%`, y lee los
argumentos de `multi` con emparejamiento de llaves y corchetes (los `[` dentro de `{}`
no cierran el argumento opcional). Los `\item` se cuentan solo a profundidad de
anidamiento 0. Todos los ficheros son UTF-8 válido y sin BOM (verificado con `iconv`).

**Dos poblaciones, declaradas explícitamente en cada punto:**

- **Tokens en disco** — lo que produce un `grep` sobre el texto.
- **Preguntas bien formadas** — entornos `multi` que abren y cierran correctamente.

La distinción no es académica: **difieren en 9**, y esos 9 son el hallazgo n.º 1.

---

## B1. Total de preguntas `\begin{multi}`

> Cabina midió: **5727**

**El disco confirma 5 727 — como recuento de tokens.** Pero ese no es el número de
preguntas.

| Medida | Valor |
|---|---|
| Tokens `\begin{multi}` en disco (todos los `.tex`) | **5 727** |
| Tokens `\end{multi}` en disco | **5 718** |
| **Diferencia — entornos que no cierran** | **9** |
| Entornos `multi` bien formados | 5 718 |
| Menos `Matematicas/Temas/test.tex` (5) | |
| **Preguntas de contenido bien formadas** | **5 713** |

Ningún `\begin{multi}` está comentado, así que no hay preguntas "desactivadas".

**Reparto por unidad (preguntas de contenido):**

| Unidad | Preguntas |
|---|---|
| Banco de Preguntas / Matematicas | 2 999 |
| Examen Diagnostico | 1 020 |
| Banco de Preguntas / Español | 849 |
| Examen Simulador | 845 |
| **Total** | **5 713** |

Los 14 tokens restantes están en los dos `test.tex` (5 en Matemáticas, bien formados;
7 en Español, ninguno bien formado).

**Recomendación:** usar **5 713** como denominador de cualquier métrica de contenido.
5 727 solo es correcto para "cuántas veces aparece la cadena".

## B2. Preguntas sin feedback

> Cabina midió: **0**

**Confirmado: 0 en contenido.** Las 5 713 preguntas de contenido tienen
`feedback={...}` no vacío. Cobertura del 100 %.

Existe exactamente una excepción en todo el árbol, y está fuera de contenido:

```
Banco de Preguntas/Matematicas/Temas/test.tex:94   (sin argumento opcional)
```

Este es el invariante más sano del repo.

## B3. Preguntas cuyo número de `\item*` ≠ 1

> Cabina midió: **2 reales** (`LEC-AEL-FuncionesLenguaje-Dificil-009` y
> `GEO-GP-Triangulos-Facil-005`), más varias en `test.tex`.

**Los dos códigos son correctos. La interpretación no.**

No son preguntas con dos respuestas correctas. Son **errores de sintaxis LaTeX**: el
`\end{multi}` está mal escrito, así que el analizador ve dos preguntas fusionadas en un
solo entorno, con 8 opciones y 2 asteriscos. El síntoma "`\item*` ≠ 1" es un efecto
secundario del defecto real.

### Lista completa — TODOS los entornos mal cerrados del repo

Comprobación de balance de entornos sobre los 281 ficheros. **9 problemas, cero falsos
positivos, cero balances rotos de otro tipo.**

| # | Ruta | Línea | Defecto | Código afectado |
|---|---|---|---|---|
| 1 | `PAA/Banco de Preguntas/Español/Temas/1. Lectura/1.2.6.LEC-AEL-FuncionesLenguaje-03_Dificil.tex` | 671 | `\begin{multi}` (603) cerrado por **`\end{multicols}`** | `LEC-AEL-FuncionesLenguaje-Dificil-009` |
| 2 | `PAA/Banco de Preguntas/Matematicas/Temas/5. Geometria/5.1.2. GEO-GP-Triangulos-01_Facil.tex` | 122 | `\begin{multi}` (105) cerrado por **`\end{m}`** | `GEO-GP-Triangulos-Facil-005` |
| 3 | `PAA/Banco de Preguntas/Español/Temas/test.tex` | 37 | `\begin{multi}` (17) cerrado por `\end{multia}` | `LU-FW-Prepositions-FND-001` |
| 4 | idem | 68 | `\begin{multi}` (48) cerrado por `\end{multia}` | — |
| 5 | idem | 95 | `\begin{multi}` (75) cerrado por `\end{multia}` | — |
| 6 | idem | 126 | `\begin{multi}` (106) cerrado por `\end{multia}` | — |
| 7 | idem | 153 | `\begin{multi}` (133) cerrado por `\end{multia}` | — |
| 8 | idem | 180 | `\begin{multi}` (160) cerrado por `\end{multia}` | — |
| 9 | idem | 207 | `\begin{multi}` (187) cerrado por `\end{multia}` | — |

**En contenido real: 2. En `test.tex`: 7.**

`multicols`, `m` y `multia` no están definidos en ninguna parte, y no hay ningún
`\begin{multicols}` en el repo. Son erratas puras.

**Consecuencia, y es más grave que "una pregunta mala":** LaTeX aborta con
`\begin{multi} on input line 603 ended by \end{multicols}`. **El fichero entero deja de
producirse, no solo la pregunta afectada.** El fichero 1 tiene 10 preguntas; las 10 se
pierden. El fichero 2 tiene 15; se pierden las 15. Hoy nadie lo nota porque los `\input`
correspondientes están comentados (ver A1).

**Un defecto emparentado, balanceado y por tanto invisible a esta comprobación:**

```
2.3.3. ALG-RA-VelocidadDistancia-02_Medio.tex:464  \begin{Itemize}
2.3.3. ALG-RA-VelocidadDistancia-02_Medio.tex:471  \end{Itemize}
```

`Itemize` con mayúscula no existe. El par está balanceado, así que un comprobador de
balance no lo ve; LaTeX sí fallará (`Environment Itemize undefined`). Esto marca el
límite de la comprobación de B3: **hace falta además una lista blanca de nombres de
entorno permitidos.**

## B4. Distribución del número de opciones

> Cabina midió: 4696 con 4, 1021 con 5, 1 con 3, 1 con 0.

**El disco no confirma esas cifras.** No hay ninguna pregunta con 0 opciones. La
diferencia se explica por el método: si se trocea el fichero en los `\begin{multi}` sin
exigir un `\end{multi}` que empareje, las dos preguntas fusionadas de B3 se parten en
puntos arbitrarios y aparecen fragmentos con recuentos espurios.

**Distribución sobre las 5 713 preguntas de contenido bien formadas:**

| Opciones | Preguntas | % |
|---|---|---|
| 3 | **1** | 0,02 % |
| 4 | 4 689 | 82,08 % |
| 5 | 1 021 | 17,87 % |
| 8 | **2** | 0,04 % |

Los dos casos de "8 opciones" son los entornos fusionados de B3 (4+4). **No son
preguntas con 8 opciones; son dos preguntas cada uno.** Descontándolos, el reparto real
sobre 5 715 preguntas es 4 689 de cuatro, 1 021 de cinco, 1 de tres, y 4 más de cuatro
escondidas en los entornos rotos.

### Casos sospechosos — los `< 4`

**Exactamente uno en todo el repo:**

```
PAA/Banco de Preguntas/Matematicas/Temas/2. Algebra/2.2.2. ALG-EQD-Desigualdades-03_Dificil.tex:14
  código: ALG-EQD-Desigualdades-Dificil-001
  3 opciones, 1 correcta
```

Es la primera pregunta de su fichero. Merece revisión humana: o le falta una
distractora, o es deliberada.

### Sobre las de 5 opciones — no las clasifico como defecto

Tal como pide el ticket. Pero el reparto **no es aleatorio, es estructural**:

| Unidad | 3 | 4 | 5 |
|---|---|---|---|
| Banco / Español | — | 848 | — |
| Banco / Matematicas | 1 | 2 996 | 1 |
| **Examen Diagnostico** | — | — | **1 020** |
| Examen Simulador | — | 845 | — |

**El Examen Diagnóstico usa 5 opciones en el 100 % de sus preguntas y el resto del repo
usa 4 en el 99,96 %.** No es una mezcla: es una decisión de diseño por unidad. La única
pregunta de 5 opciones fuera del Diagnóstico está en Matemáticas y es la anomalía real
de esta categoría, no las 1 020.

Esto convierte la norma en algo adjudicable con una pregunta concreta al operador:
*¿el Diagnóstico debe tener 5 y todo lo demás 4?* Si la respuesta es sí, el invariante
comprobable es por unidad, no global, y solo hay 2 excepciones en 5 713.

## B5. Códigos repetidos dentro de una misma unidad

> Cabina midió: **10** (`EST-TCP-Conteo-Medio-021..030`).

**El disco dice 30, y los 30 cuentan la misma historia.**

| Medida | Valor |
|---|---|
| Códigos distintos duplicados dentro de su unidad | **30** |
| Ocurrencias extra (n−1 sumado) | 30 |
| Duplicados dentro de un mismo fichero | **0** |
| Unidades afectadas | 1 (Banco / Matematicas) |

Los 30 son `EST-TCP-Conteo-Medio-001` … `EST-TCP-Conteo-Medio-030`, cada uno exactamente
dos veces, en estos dos ficheros:

```
PAA/Banco de Preguntas/Matematicas/Temas/4. Estadistica/4.2.1. EST-TCP-Conteo-02_Medio.tex
PAA/Banco de Preguntas/Matematicas/Temas/4. Estadistica/4.2.2. EST-TCP-Probabilidad-02_Medio.tex
```

### La causa raíz

`diff` entre ambos ficheros: **19 líneas de diferencia sobre ~800**. Las diferencias
sustantivas son dos:

```diff
2c2
< \section{Estadisticas - Técnicas de Conteo}
---
> \section{Estadisticas - Probabilidad}
8c8
< \begin{quiz}{Técnicas de Conteo - Medio}
---
> \begin{quiz}{Probabilidad - Medio}
```

El resto son un `\end{multi}` con distinta indentación y dos líneas de comentario
decorativo.

**`4.2.2. EST-TCP-Probabilidad-02_Medio.tex` es una copia de
`4.2.1. EST-TCP-Conteo-02_Medio.tex` a la que solo se le cambiaron el título de sección y
el título del quiz.** Sus 30 preguntas son preguntas de conteo, con códigos de conteo,
bajo una etiqueta de probabilidad.

**Consecuencia:** el Banco de Preguntas **no contiene ni una sola pregunta de
probabilidad de nivel medio**. Confirmado por el censo de familias:

```
EST-TCP-Conteo-Medio          banco=60   <- 30 reales + 30 duplicadas
EST-TCP-Probabilidad-Medio    banco= 0   <- exam=40
EST-TCP-Probabilidad-Facil    banco=15
EST-TCP-Probabilidad-Dificil  banco=15
```

Este es el hallazgo con mayor coste editorial del análisis: no es una etiqueta mal
puesta, es un hueco de 30 preguntas en el temario.

### Distinción con el reuso Banco → Examen

> Cabina midió el reuso en 1099 y NO es defecto. Confirmado como no-defecto.

**El disco mide 1 744 instancias de reuso** (preguntas de examen cuyo código existe en el
Banco), sobre 1 865 instancias de examen totales. Es decir, el 93,5 % de las preguntas de
examen provienen del Banco. Eso es el diseño funcionando.

La discrepancia con 1 099 es probablemente de unidad de cuenta: 1 099 se acerca a los
códigos *distintos* reutilizados, no a las instancias. Códigos distintos en examen:
1 160, de los cuales 1 069 existen en el Banco.

Nótese además que la misma pregunta aparece en Diagnóstico **y** Simulador con el mismo
código; eso son dos unidades distintas y por tanto no es duplicado intra-unidad.

## B6. Códigos presentes solo en un Examen y ausentes del Banco

> Cabina midió: **90**

**El disco dice 91 códigos distintos, en 121 instancias.**

| Medida | Valor |
|---|---|
| Códigos distintos en el Banco | 3 818 |
| Códigos distintos en los Exámenes | 1 160 |
| **Códigos distintos solo-examen** | **91** |
| Instancias de pregunta que los llevan | 121 |

**Los 91, agrupados por causa:**

**(a) 30 códigos — sección de simulacro sin contraparte en el Banco. No es defecto.**
```
MIX-PAA-Medio-001 … MIX-PAA-Medio-030
  Examen Simulador/Secciones/3. Matemáticas/MIX-PAA.tex
```

**(b) 30 códigos — el Banco se queda corto en numeración. Probablemente no es defecto.**
```
LEC-HA-Comparacion-Medio-031 … LEC-HA-Comparacion-Medio-060
  Examen Simulador/Secciones/1. Lectura/LEC-HA-Comparacion.tex
```
El Banco tiene `LEC-HA-Comparacion-Medio-001..030`. El Simulador extiende la serie hasta
060 con 30 preguntas que solo viven en el examen.

**(c) 20 códigos — consecuencia directa de B5. SÍ es defecto.**
```
EST-TCP-Probabilidad-Medio-001 … EST-TCP-Probabilidad-Medio-020
  Examen Diagnostico/Secciones/3. Matemáticas/EST-TCP-Probabilidad.tex
  Examen Simulador/Secciones/3. Matemáticas/EST-TCP-Probabilidad.tex
```
Estos códigos "faltan" en el Banco porque el fichero del Banco que debía contenerlos fue
sobrescrito por la copia de Conteo. **B6(c) y B5 son el mismo defecto visto desde los dos
lados.**

**(d) 10 códigos — errata singular/plural. SÍ es defecto.**
```
GEO-GP-Triangulos-Medio-001 … GEO-GP-Triangulos-Medio-010
  Examen Diagnostico/Secciones/3. Matemáticas/GEO-GP-Triangulos.tex
  Examen Simulador/Secciones/3. Matemáticas/GEO-GP-Triangulos.tex
```
El contenido sí existe en el Banco, pero codificado como **`GEO-GP-Triangulo-Medio-*`**,
en singular:

```
5.1.2. GEO-GP-Triangulos-01_Facil.tex    -> GEO-GP-Triangulos-Facil-*   (plural, correcto)
5.1.2. GEO-GP-Triangulos-02_Medio.tex    -> GEO-GP-Triangulo-Medio-*    (SINGULAR)
5.1.2. GEO-GP-Triangulos-03_Dificil.tex  -> GEO-GP-Triangulo-Dificil-*  (SINGULAR)
```

45 preguntas del Banco llevan el prefijo equivocado. La trazabilidad Banco↔Examen está
rota para toda la familia de triángulos por una `s`.

**(e) 1 código — guion perdido. SÍ es defecto.**
```
EST-TCP-ConteoMedio-019     <- debería ser EST-TCP-Conteo-Medio-019
  Examen Diagnostico/Secciones/3. Matemáticas/EST-TCP-Conteo.tex:568
```

### Anomalías de forma de código, aparte de las anteriores

Códigos que no siguen la pauta `<AREA>[-<SUB>]-<Tema>-<Dificultad>-<NNN>`:

```
ALG-EXP-Polinomios-Medio-021-R                 2.1.3. ALG-EXP-Polinomios-02_Medio.tex:545
EST-ED-TendenciaCentral-Dificil-003-CORREGIDO  4.1.3. EST-ED-TendenciaCentral-03_Dificil.tex:61
GEO-GA-Recta-Medio-14                          5.2.2. GEO-GA-Recta-02_Medio.tex:389
GEO-GA-Recta-Medio-16                          5.2.2. GEO-GA-Recta-02_Medio.tex:455
GEO-GA-Recta-Medio-23                          5.2.2. GEO-GA-Recta-02_Medio.tex:661
```

Los tres de `GEO-GA-Recta` usan dos dígitos donde sus 27 vecinos usan tres; los sufijos
`-R` y `-CORREGIDO` son rastros de edición que quedaron dentro del identificador estable.

## B7. Referencias `\includegraphics` que no resuelven

> Cabina midió: fallos.

**El disco dice: 0 fallos. Ninguna referencia rota.**

| Medida | Valor |
|---|---|
| Llamadas `\includegraphics` | **508** |
| Pares (unidad, destino) distintos | 503 |
| **No resueltas, con cwd en la raíz de cada unidad** | **0** |

| Unidad | Llamadas | Fallos |
|---|---|---|
| Banco / Español | 50 | 0 |
| Banco / Matematicas | 325 | 0 |
| Examen Diagnostico | 78 | 0 |
| Examen Simulador | 55 | 0 |

**Aviso metodológico que probablemente explica la discrepancia con la cabina.**
486 de las 508 rutas van entre comillas dobles dentro de las llaves:

```latex
\includegraphics[width=0.5\textwidth]{"img/1. Lectura/LEC-HA-InterpretacionDatos-Facil-001.png"}
```

Es el idioma de `graphicx` para rutas con espacios — y todas las carpetas de imagen
llevan espacios (`img/1. Lectura/`). **Un comprobador que no despoje las comillas
reporta 486 fallos falsos.** Mi primera versión hizo exactamente eso. Las 22 rutas
restantes van sin comillas y también resuelven.

507 de 508 resuelven con la extensión literal escrita; 1 resuelve añadiendo `.png`.

**Extra — imágenes huérfanas.** Ficheros bajo `img/` que ninguna llamada referencia:

| Unidad | Ficheros en `img/` | Sin referenciar | de ellos en `.ipynb_checkpoints` |
|---|---|---|---|
| Banco / Español | 53 | 3 | 2 |
| Banco / Matematicas | 482 | 162 | 45 |
| Examen Diagnostico | 108 | 30 | 20 |
| Examen Simulador | 216 | 161 | 52 |

356 imágenes sin uso, 119 de ellas artefactos de Jupyter. No rompe nada; es peso muerto.

## B8. Ortografía y gramática en español

> El ticket pide usar una herramienta, declararla, y declarar su tasa de falsos
> positivos observada en una muestra.

### Herramienta usada, y por qué esta

**No hay `hunspell` ni `aspell` en la máquina.** Instalarlos habría tocado el entorno del
operador, lo que el ticket excluye. Alternativas y su coste al final de esta sección.

**Herramienta empleada: la API de corrección ortográfica de Windows
(`ISpellChecker`, CLSID `7AB36653-1796-484B-BDFA-E74F1DB7C1DC`), diccionario `es-MX`**,
que ya está instalado en la máquina (`%APPDATA%\Microsoft\Spelling\es-MX`, idioma de
usuario `es-MX`). Se invoca vía interop de .NET desde PowerShell. **No instala nada, no
toca el repo, no sale a la red.**

**Corpus.** Extractor propio que aísla, por pregunta, el enunciado, cada opción y la
retroalimentación; elimina matemáticas (`$…$`, `\(…\)`, `\[…\]`, `tabular`, `pmatrix`,
`cases`, `array`, `center`), desenvuelve `\textbf{…}`/`\textit{…}`/`\underline{…}` sin
insertar espacio, y descarta el resto de comandos.

```
segmentos      : 35 306   (5 713 enunciados · 23 880 opciones · 5 713 retroalimentaciones)
tokens de palabra : 1 178 937
tipos distintos   :    37 097
```

Se comprobó **cada tipo distinto una sola vez** (37 097 llamadas, 13 s).

### Resultado bruto

```
tipos marcados : 863  (2,3 % del vocabulario)
tokens marcados: 2 835 (0,24 % del texto)
```

**863 < 500 no se cumple a nivel de tipos, pero tras triaje los hallazgos reales son
~24. No se dispara el "para si B8 produce más de 500 hallazgos".**

### Tasa de falsos positivos — medida, no estimada

Muestra determinista y reproducible: los 863 tipos ordenados alfabéticamente (locale
`es`), tomando 1 de cada 14 → **62 palabras**. Juzgadas una a una en contexto.

**Verdaderos positivos en la muestra: 0 de 62. Tasa de falsos positivos observada: 100 %
(IC 95 % para la precisión: 0 %–4,7 %).**

Composición de la muestra: 24 nombres propios o inventados (`Kaelen`, `Cyrulnik`,
`AquaPura`, `L'Anse`, `Encyclopédie`), 14 palabras inglesas o francesas en cita
(`abstract`, `highly`, `terroir`, `brut`), 11 tecnicismos válidos (`fotobionte`,
`cripsis`, `biomímesis`, `superenfriamiento`), 6 latinismos y binomios (`familiaris`,
`notatum`, `Talionis`), 5 abreviaturas cuyo punto elimina mi tokenizador (`Ec`, `etc`,
`prom`), 2 artefactos de mi propio extractor.

**Precisión global estimada sobre el conjunto completo: ~2,8 %** (24 verdaderos de 863).

Se probó un segundo filtro —solo minúsculas, con sugerencia del diccionario a distancia
de edición ≤ 2— que reduce de 863 a 354 tipos pero **no mejora la precisión de forma
útil**: los préstamos también tienen vecinos cercanos (`terroir`→`terror`,
`espresso`→`expreso`, `piazza`→`pieza`).

### Hallazgos agrupados por tipo

**Grupo 1 — erratas mecanográficas inequívocas (13 tipos, 14 apariciones).**
Todas verificadas en contexto. Estas son accionables tal cual.

| Forma | Debería ser | Ruta |
|---|---|---|
| `jeroglífBicos` | jeroglíficos | `Examen Diagnostico/Secciones/1. Lectura/LEC-CG-IdeaCentral.tex:1489` |
| `esrtategia` | estrategia | `Examen Simulador/Secciones/1. Lectura/LEC-HA-InterpretacionDatos.tex:13` |
| `despilfaro` | despilfarro | `Examen Simulador/Secciones/1. Lectura/LEC-AEL-ClasificacionTextos.tex:258` |
| `minicuiso` | minucioso | `Examen Diagnostico/Secciones/1. Lectura/LEC-CG-InfoExplicita.tex:171` |
| `parecibi` | parecía | `Examen Diagnostico/Secciones/1. Lectura/LEC-AEL-FigurasRetoricas.tex:673` |
| `exhausteda` | exhausta | `Examen Diagnostico/Secciones/1. Lectura/LEC-AEL-FigurasRetoricas.tex:12` |
| `sepulral` ×2 | sepulcral | `Banco/Español/…/1.2.3.LEC-AEL-Narracion-02_Medio.tex:663` |
| `apretavan` | apretaban | `Banco/Español/…/2.2.3.RED-RS-Particularizacion-02_Medio.tex:1838` |
| `recuerdando` | recordando | `Banco/Matematicas/…/2.2.4. ALG-EQD-EcuacionesCuadraticas-01_Facil.tex:13` |
| `itáliza` | itálica | `Banco/Español/…/1.3.1.LEC-HA-Comparacion-01_Facil.tex:398` |
| `peyrativa` | peyorativa | `Banco/Español/…/2.1.2.RED-MT-Elision-02_Medio.tex:2123` **(está en una opción)** |
| `creativdad` | creatividad | `Banco/Español/…/2.2.3.RED-RS-Particularizacion-01_Facil.tex:709` |
| `posuerra` | posguerra | `Examen Simulador/Secciones/1. Lectura/LEC-HA-Comparacion.tex:5010` |
| `destrezza` | destreza | `Examen Simulador/Secciones/1. Lectura/LEC-CG-Evidencia.tex:675` |
| `immortal` | inmortal | `Banco/Español/…/1.2.2.LEC-AEL-TiposDiscurso-02_Medio.tex:1243` |

**Grupo 2 — acentuación (2 tipos, 4 apariciones).**

| Forma | Debería ser | Dónde |
|---|---|---|
| `caracter` ×3 | carácter | `Examen Diagnostico/…/EST-TCP-Probabilidad.tex:568` y otros |
| `coloquelos` | colóquelos | `Banco/Español/…/1.1.3.LEC-CG-IdeaCentral-01_Facil.tex:113` |

**Grupo 3 — ortografía de prefijos: falta la duplicación de la `r` (2 tipos, 3 apariciones).**

```
autoreparación  -> autorreparación    Examen Simulador/Secciones/1. Lectura/LEC-CG-IdeaCentral.tex:899
autorepararse   -> autorrepararse     idem
```

**Grupo 4 — anglicismos y formas no normativas (3 tipos, ~32 apariciones). Discutible;
decisión editorial, no error mecánico.**

```
equilateral ×3           -> equilátero (la forma española)
intersecta / intersectan ×20 -> interseca / intersecan (conjugación de "intersecar")
omitible ×9              -> omisible (la forma del DLE)
```

**Grupo 5 — palabra rota o incoherente (2 apariciones). Requiere ojo humano.**

```
"El pueblo deumbría se acurrucaba…"   Banco/Español/…/2.2.3.RED-RS-Particularizacion-02_Medio.tex:537
"la visión es limitada o inúti-"      Banco/Español/…/1.1.1.LEC-CG-InfoExplicita-02_Medio.tex:2302
```

**Total accionable: ~24 tipos, ~53 apariciones, sobre 1,18 M de palabras.** La densidad
de errata es baja: aproximadamente **1 por cada 22 000 palabras**.

### Gramática y tipografía — lo que un diccionario no ve

Reglas propias de alta precisión sobre los 35 306 segmentos:

| Regla | Segmentos afectados | Valoración |
|---|---|---|
| `?` sin su `¿` de apertura | **66** (68 signos) | Real. 49 en retroalimentación, 14 en enunciado, 3 en opciones |
| `!` sin su `¡` de apertura | **3** | Real, pero incluye factoriales matemáticos |
| Comillas rectas en número impar | **3** | Real |
| Palabra duplicada consecutiva | **37 brutos** | ~21 reales (`de de` ×21, `el el` ×3, `en en`, `ni ni`); el resto legítimos (`waru waru`, `ABBA ABBA`, `CDE CDE`) |
| Espacio antes de puntuación | 5 215 brutos | **Descartada — artefacto de mi extractor**, no del repo |
| Minúscula tras punto | 166 brutos | **Descartada — artefacto de eliminar matemáticas** |

Totales del corpus: 4 950 signos `?` frente a 4 883 `¿`. El déficit de 67 es real y es
el hallazgo tipográfico más extendido.

### Lo que NO cubre esta medición — declarado

- **Nada de gramática de verdad**: concordancia, régimen preposicional, dequeísmo,
  tiempos verbales. `ISpellChecker` es léxico, palabra a palabra.
- **Errores de palabra real**: `haber`/`a ver`, `sino`/`si no`, `hay`/`ahí`,
  `solo`/`sólo`, `él`/`el`. Todas son palabras válidas; el diccionario nunca las marca.
  **Este es probablemente el hueco más grande.**
- **Recall desconocido.** He medido la precisión, no la exhaustividad.

### Alternativas si se quiere cobertura real, con su coste

| Opción | Coste | Toca el entorno |
|---|---|---|
| `hunspell` + `es_MX.dic` | ~5 MB, instalación en la máquina | **Sí** |
| LanguageTool local (Java, gramática de verdad) | ~250 MB + JRE; ~10-20 min sobre este corpus | **Sí** |
| LanguageTool en la nube | Envía 1,18 M de palabras a un tercero | No, pero **publica el contenido** |
| Seguir con `ISpellChecker` + reglas propias | 0 | **No** |

**Recomendación:** para una pasada única de limpieza, LanguageTool local en una máquina
desechable, sobre una copia del corpus extraído (no sobre el repo). Para un invariante
permanente, ninguna de las cuatro: la precisión del 2,8 % hace que la ortografía no
sirva como puerta automática. Ver B10.

## B9. Ficheros que no son contenido dentro del árbol de contenido

> Cabina vio 2 (`Español/Temas/test.tex`, `Matematicas/Temas/test.tex`).

**Los 2 son correctos, pero hay bastante más. No existe `.gitignore` en el repo, y todo
esto está versionado.**

**(a) Los dos `test.tex` — confirmados.**
```
PAA/Banco de Preguntas/Español/Temas/test.tex        211 líneas, 7 multi, TODOS rotos, contenido en INGLÉS
PAA/Banco de Preguntas/Matematicas/Temas/test.tex    122 líneas,  5 multi, 1 sin feedback
```
El de Español es un banco de inglés (`LU-FW-Prepositions-FND-001`, `%% Problem:`,
`%% Subtopic:`) con cabeceras en inglés — es material de otra asignatura.

**(b) Un tercer `.tex` que la cabina no vio, y este sí está entre el contenido:**
```
PAA/Examen Diagnostico/Secciones/3. Matemáticas/.ipynb_checkpoints/GEO-GP-Angulos-checkpoint.tex
```
Vive dentro de `Secciones/`, junto a los ficheros reales. Es un checkpoint de Jupyter.

**(c) 20 directorios `.ipynb_checkpoints` con 120 ficheros** (91 `.ipynb`, 28 `.png`,
1 `.tex`), repartidos por las cuatro unidades, incluidos `img/` y las raíces de unidad.

**(d) Artefactos de compilación de LaTeX, versionados:**
```
Examen Diagnostico/Examen_Diagnostico.{aux,auxlock,log,out,pdf,synctex.gz}
Examen Diagnostico/Examen_Diagnostico-moodle.xml
Examen Simulador/Examen_Simulador.{aux,auxlock,log,out,pdf,synctex.gz}
Examen Simulador/Examen_Simulador-moodle.xml
(y los equivalentes en las dos unidades del Banco)
```
**Estos son los 4 ficheros que `git status` muestra modificados** bajo `PAA/`
(`-moodle.xml`, `.log`, `.pdf`, `.synctex.gz` del Diagnóstico) — el rastro de la última
compilación. Nota de reconciliación: `git status` muestra 8 modificados en total; los
otros 4 están bajo `.project/` y son derivación de la consola, no del árbol de contenido.

**(e) Material de origen dentro del árbol:**
```
145 .ipynb    (91 en checkpoints, 54 activos)
194 .txt      en "WiziAcademy Problemas/"
  4 .xlsx
```
`WiziAcademy Problemas/` tiene su propia estructura de proceso
(`1. Extraidos Originales`, `2. Extraidos originales por partes`,
`3. Extraidos-convertidos completos`, `4. Extraido-convertidos por partes`,
`5. Finalizado`). Es el taller de producción, no el producto.

Ningún `.ipynb` está mezclado dentro de `Temas/` o `Secciones/` (verificado: 0).
La separación es razonable salvo por el checkpoint del punto (b).

---

## B-extra. Tres invariantes que el ticket no pidió y que aparecieron solos

Los incluyo porque dos de ellos pesan más que varios de los pedidos.

### D1 — La retroalimentación nombra una letra de opción que nadie imprime

Dos retroalimentaciones abren con "La respuesta correcta es la C" / "la A". Pero
`multi` no rotula las opciones con letras: en PDF salen numeradas por `enumitem`, y en
Moodle el rotulado lo pone Moodle. **La referencia no resuelve a nada.**

```
Banco/Español/…/1.2.6.LEC-AEL-FuncionesLenguaje-03_Dificil.tex:318  LEC-AEL-FuncionesLenguaje-Dificil-005  "es la C"
Banco/Español/…/1.2.6.LEC-AEL-FuncionesLenguaje-03_Dificil.tex:457  LEC-AEL-FuncionesLenguaje-Dificil-007  "es la A"
```

Barrido sobre las 5 713: **solo 2 casos, ambos en el fichero piloto.** Defecto local, no
sistémico. Comprobable con una sola expresión regular.

### D2 — La posición de la respuesta correcta está fuertemente sesgada

Sobre las **4 689 preguntas de 4 opciones** de contenido, con `shuffle=false` forzado por
el paquete:

| Posición del `\item*` | Preguntas | % | Esperado si fuera uniforme |
|---|---|---|---|
| 1.ª | 358 | **7,6 %** | 25 % |
| 2.ª | 1 595 | 34,0 % | 25 % |
| 3.ª | **2 017** | **43,0 %** | 25 % |
| 4.ª | 719 | 15,3 % | 25 % |

**Un estudiante que marque siempre la tercera opción acierta el 43 % de las preguntas de
cuatro opciones sin leer nada.** El azar da 25 %. Como las opciones no se barajan, el
sesgo llega intacto al alumno, tanto en PDF como en el XML exportado.

Es el hallazgo de calidad de contenido con mayor impacto medible del análisis, es
completamente mecánico, y ningún punto del ticket lo pedía.

### D3 — Las citas de línea en la retroalimentación

Las retroalimentaciones citan el pasaje con la forma `"texto" (línea N)`. Como los
pasajes llevan números de línea explícitos (`01.`, `02.`…), **esto es verificable
automáticamente**.

```
ficheros con pasaje numerado : 84
citas comprobadas            : 1 763
resuelven a la línea citada  : 1 340 (76,0 %)
no resuelven                 : 423
  de ellas, halladas en otra línea numerada (desfase confirmado) : 27
```

Desfases confirmados: `{+1: 10, −1: 7, +23: 2, +4, +8, +10, +11, +15, −3, −9, −23}`.

**Advertencia honesta sobre este comprobador: su precisión es baja (~6 %).** De las 423
no resueltas, solo 27 son errores confirmados. Las demás son limitaciones de mi
emparejador: las citas usan elisiones (`"murió en relativa... pobreza"`), llevan
`\textbf{}` dentro, y sobre todo **la cita a menudo cruza el salto de línea numerado**
(se cita la línea 31 pero el fragmento empieza en la 30). Ensanchar la ventana a
línea ± 1 recuperaría la mayor parte. Es mecanizable, pero no con la implementación que
he escrito en esta sesión.

---

## B10. Propuesta de comando de verificación

> **Esto es una propuesta. No se ha implementado ni instalado nada.**

### Forma

Presupuesto: campo `verification` del kernel, **una sola cadena**, timeout **600 000 ms**
(confirmado en `aiw/config.json`: `"timeouts_ms": { ..., "verification": 600000 }`).

`node` está disponible en la máquina y no requiere instalación. La forma propuesta es un
único `node -e` que hace **un solo recorrido** del árbol y comprueba las tres cosas:

```bash
node -e "const f=require('fs'),p=require('path'),R='PAA',E=[];const W=(d,o=[])=>{for(const e of f.readdirSync(d,{withFileTypes:1}))e.isDirectory()?W(p.join(d,e.name),o):e.name.endsWith('.tex')&&o.push(p.join(d,e.name));return o};const C=s=>{let o='';for(let i=0;i<s.length;i++){if(s[i]=='\\\\'){o+=s[i]+(s[i+1]||'');i++}else if(s[i]=='%'){while(i<s.length&&s[i]!='\\n')i++;o+='\\n'}else o+=s[i]}return o};const U=[['PAA/Banco de Preguntas/Español'],['PAA/Banco de Preguntas/Matematicas'],['PAA/Examen Diagnostico'],['PAA/Examen Simulador']];const seen={};for(const[u]of U){for(const F of W(u)){if(/test\\.tex\$|ipynb_check/.test(F))continue;const s=C(f.readFileSync(F,'utf8')),st=[];let L=1;for(const m of s.matchAll(/\\\\(begin|end)\\s*\\{([^}]*)\\}/g)){const n=m[2],ln=s.slice(0,m.index).split('\\n').length;if(m[1]=='begin')st.push([n,ln]);else{const t=st.pop();if(!t||t[0]!=n)E.push(F+':'+ln+' B3 \\\\begin{'+(t?t[0]:'?')+'} cerrado por \\\\end{'+n+'}')}}st.forEach(t=>E.push(F+':'+t[1]+' B3 \\\\begin{'+t[0]+'} sin cerrar'));for(const m of s.matchAll(/\\\\begin\\{multi\\}[\\s\\S]*?\\{\\s*([A-Za-z0-9_.-]+)\\s*\\}/g)){const k=u+'|'+m[1];if(seen[k])E.push(F+' B5 codigo repetido en la unidad: '+m[1]);else seen[k]=1}for(const m of s.matchAll(/\\\\includegraphics\\s*(?:\\[[^\\]]*\\])?\\s*\\{([^}]*)\\}/g)){let t=m[1].trim().replace(/^\\\"|\\\"\$/g,'');if(!['','.png','.pdf','.jpg'].some(x=>f.existsSync(p.resolve(u,t+x))))E.push(F+' B7 imagen no resuelve: '+t)}}}if(E.length){console.error(E.slice(0,50).join('\\n'));console.error('TOTAL '+E.length);process.exit(1)}console.log('B3/B5/B7 OK')"
```

Elementos no negociables de esa cadena, cada uno por una razón medida en este análisis:

1. **`.replace(/^"|"$/g,'')` en la ruta de imagen** — sin esto, B7 reporta **486 falsos
   positivos** (§ B7).
2. **Pila de nombres de entorno**, no un contador — `\end{multicols}` y `\end{m}` cuentan
   como cierres para un contador ingenuo y el defecto pasa (§ B3).
3. **Exclusión explícita de `test.tex` y `.ipynb_checkpoints`** — si no, los 7 entornos
   rotos de `test.tex` mantienen el comando en rojo para siempre y deja de significar
   nada.
4. **Unicidad de código con clave `unidad|código`**, nunca global — el reuso
   Banco→Examen son 1 744 instancias legítimas y las convertiría todas en fallo (§ B5).
5. **cwd en la raíz de cada unidad** para resolver imágenes, no en la raíz del repo.

### Tiempo de ejecución estimado

Medido sobre esta máquina, con los comprobadores ya escritos, sobre el corpus real
(281 ficheros, **12,9 MB** de `.tex`):

| Script | Trabajo | Tiempo |
|---|---|---|
| `envcheck.js` | balance de entornos (B3) | 1 063 ms (1 049 / 1 065 / 1 073 en tres pasadas) |
| `img.js` | resolución de imágenes (B7) | 547 ms |
| `parse.js` | análisis completo de `multi` (B5) | 866 ms |

**Estimación para el comando combinado en un solo recorrido: 1,2 – 1,5 s**, incluyendo
~100 ms de arranque de Node. Con caché de disco frío, ≤ 4 s.

**Uso del presupuesto: ~0,25 % de los 600 000 ms.** Sobra margen por un factor de ~400.
La verificación no es el cuello de botella y no hay que optimizarla.

### Qué NO puede ir en esa cadena, y por qué

| Invariante | Por qué no |
|---|---|
| **B8 ortografía** | Precisión medida del **2,8 %**. 863 marcas para ~24 errores reales. Una puerta con 97 % de falsos positivos se desactiva en una semana. Además depende de una API COM de Windows con diccionario específico de la máquina: no es portable ni reproducible en CI. |
| **B4 opciones ≠ 4** | **La norma no está adjudicada.** El Diagnóstico usa 5 en el 100 % de sus preguntas por diseño. Hasta que el operador decida, un comprobador global fallaría con 1 021 falsos positivos. *Sí es implementable en cuanto se decida*, como regla por unidad: entonces el número de fallos reales es 2. |
| **B6 códigos solo-examen** | 91 códigos, de los cuales 60 son legítimos (`MIX-PAA`, extensión de `LEC-HA-Comparacion`) y 31 son defectos. Sin una lista blanca acordada no se puede distinguir. Implementable con la lista; sin ella, no. |
| **B9 ficheros no-contenido** | Es una decisión de higiene del repo (`.gitignore`), no un invariante de contenido. Y el árbol *ya* tiene 4 artefactos modificados que el operador conserva a propósito como evidencia: un comprobador estaría en rojo por diseño. |
| **D3 citas de línea** | Mecanizable en principio y valioso, pero mi implementación tiene ~6 % de precisión por las citas que cruzan el salto de línea. Necesita una ventana de ±1 y tratamiento de elisiones antes de poder gatear nada. |
| **Todo lo de la Parte C** | Corrección factual, plausibilidad de distractoras, calidad de la retroalimentación, correspondencia con la dificultad declarada. Requiere juicio. |
| **`\begin{Itemize}`** | Balanceado, así que la pila no lo ve. Necesita añadir una **lista blanca de nombres de entorno** (`multi, quiz, itemize, enumerate, center, tabular, cases, pmatrix, document`) — recomiendo incluirla; el coste es una línea y captura toda la familia de erratas de nombre. |

### Dos invariantes más que sí caben y recomiendo añadir

Ambos son baratos, deterministas y hoy están limpios, así que entrarían en verde:

- **B2 (feedback presente)** — hoy 5 713/5 713. Cero falsos positivos, protege el activo
  más sano del repo.
- **Nombre de fichero ↔ código** — hoy 3 848/3 848 en dificultad y 3 773/3 848 en tema.
  Habría que corregir antes los 75 casos de § A2, pero después es un invariante fuerte
  que habría atrapado tanto el defecto de Probabilidad como el de Triangulo(s) el día que
  se introdujeron.

---

# PARTE C — El piloto editorial

**Fichero:**
`PAA/Banco de Preguntas/Español/Temas/1. Lectura/1.2.6.LEC-AEL-FuncionesLenguaje-03_Dificil.tex`
(743 líneas, 45 267 bytes, **10 preguntas declaradas / 9 entornos bien formados**).

Tema: las funciones del lenguaje de Jakobson. Cada ítem presenta un pasaje con líneas
numeradas y pregunta qué función predomina.

**Reparto de claves declaradas:** expresiva ×3 (Q1, Q5-apoyo, Q10), apelativa ×2 (Q2, Q9),
metalingüística ×2 (Q4, Q8), poética ×1 (Q3), fática ×1 (Q6), referencial+poética ×1 (Q7).

## C1. Evaluación pregunta por pregunta

### Q1 — `LEC-AEL-FuncionesLenguaje-Dificil-001` · clave: expresiva (pos. 3)

- **Clave correcta.** Meditación en primera persona sobre el solipsismo, saturada de
  subjetividad. La expresiva es defendible sin discusión.
- **Distractoras:** apelativa y referencial funcionan bien (la referencial lleva "de
  manera objetiva", que el texto contradice). La metalingüística —"se centra en definir
  el concepto de solipsismo"— es el buen distractor: el texto *nombra* el solipsismo pero
  no lo define.
- **Problema de fondo: falta la poética entre las opciones**, y el pasaje está lleno de
  lenguaje figurado ("como la humedad que precede a la tormenta", "prisionero en el
  teatro de mi mente", "un cristal a punto de estallar"). Su ausencia evita que haya dos
  respuestas defendibles, pero **a costa de no examinar la discriminación difícil**.
  Compárese con Q3, cuya clave *es* poética sobre un texto igual de metafórico: el
  fichero usa el mismo tipo de evidencia para claves distintas sin dar nunca la regla.
- **Retroalimentación:** buena. Explica el porqué, cita cuatro pasajes con número de
  línea, y **descarta explícitamente** metalingüística y apelativa. No descarta la
  referencial.
- **Error de cita (confirmado):** dice `"un solipsismo no elegido" (línea 10)`; está en
  la **línea 09**. Verificado contra el pasaje.
- **Dificultad:** media. El enunciado señala "Considerando el tono y el enfoque", lo que
  ya orienta hacia la expresiva.

### Q2 — `…-Dificil-002` · clave: apelativa (pos. 1)

- **Clave correcta.** Texto sobre obsolescencia programada con imperativos explícitos:
  "Exijan su derecho a reparar" (l. 28), "Apoyen…" (l. 29), "Eduquémonos…" (l. 30).
- **Buen diseño de enunciado:** "A pesar de que el texto presenta datos históricos y
  económicos…" neutraliza de antemano la referencial, dejando el duelo real entre
  apelativa y expresiva. Los imperativos lo resuelven.
- **Distractoras:** la expresiva ("el autor manifiesta su indignación personal") **es
  genuinamente defendible** —el texto usa "práctica perversa", "esclavos de un ciclo"—
  y es lo que hace que el ítem valga. La poética es descartable sin leer.
- **Retroalimentación:** la mejor del fichero en cuanto a evidencia. Cinco citas, todas
  con número de línea, **todas verificadas correctas**. Pero **no refuta la expresiva**,
  que es justo la que lo necesitaba.
- **Dificultad:** apropiada. **El mejor ítem del fichero junto con Q9.**

### Q3 — `…-Dificil-003` · clave: poética (pos. 4)

- **Clave correcta.** La memoria descrita mediante metáforas encadenadas.
- **Rompe el formato del fichero:** las opciones son palabras sueltas —"Apelativa /
  Expresiva / Referencial / Poética"— sin cláusula justificativa. Q4 hace lo mismo; los
  otros siete ítems llevan justificación. **Dos formatos de ítem dentro de un mismo quiz.**
- **Efecto:** sin justificaciones no hay nada que sopesar, así que el ítem es
  notablemente **más fácil** que sus vecinos. No corresponde a `_Dificil`.
- **La expresiva es defendible** (es una meditación lírica), pero el enunciado —"a través
  de un lenguaje figurado y metafórico. Esta elección estilística"— apunta con tanta
  fuerza a la poética que se resuelve.
- **Retroalimentación:** correcta, cuatro metáforas citadas con línea, todas verificadas.
  No refuta ninguna distractora — con opciones desnudas, no puede.

### Q4 — `…-Dificil-004` · clave: metalingüística (pos. 2) — **ÍTEM PROBLEMÁTICO**

- **La clave es discutible.** El pasaje explica la falacia *ad hominem*: la define, la
  esquematiza y la clasifica. Pero en el marco de Jakobson la función metalingüística es
  el lenguaje que habla **del código**. Aquí el objeto es un concepto de **lógica y
  retórica**, no la lengua. Un texto expositivo que explica un concepto es, en la lectura
  estándar, **referencial** — y la referencial es la opción (a).
- **La propia retroalimentación se delata:** *"Al usar la lengua para definir y explicar
  una parte de la propia lengua (en este caso, de la retórica)"*. Ese paréntesis admite
  que el objeto es la retórica, no la lengua.
- **Hay un pasaje genuinamente metalingüístico** —línea 31: «El verbo "falaz", del latín
  *fallax*, significa "mentiroso"»— pero es **una frase de 35 líneas**.
- **Veredicto: dos respuestas defendibles a la vez.** Un estudiante fuerte que responda
  "referencial" tiene argumento.
- **Además, error factual dentro del pasaje:** la línea 31 dice **«El verbo "falaz"»**.
  **"Falaz" es un adjetivo, no un verbo.** En un ítem de examen de español cuyo tema es
  precisamente la precisión terminológica, es un fallo grave.
- **Error de cita (confirmado):** dice `"ad hominem abusivo" (línea 22)`; está en la
  **línea 21**.
- Opciones desnudas otra vez.

### Q5 — `…-Dificil-005` · clave: expresiva como apoyo de la apelativa (pos. 3)

- **Clave correcta y enunciado bien construido:** declara que la apelativa domina y
  pregunta en qué otra función se apoya. Es la forma correcta de examinar la combinación
  de funciones.
- **Defecto D1: la retroalimentación abre con "La respuesta correcta es la C."** El
  entorno `multi` no rotula opciones con letras. La referencia no resuelve a nada — ni en
  PDF ni en Moodle, donde además el orden lo controla la plataforma.
- **Distractoras débiles: tres de cuatro se caen sin leer el pasaje.** La referencial dice
  "al presentar datos objetivos" cuando el discurso rechaza explícitamente las cifras
  ("Nos hablarán de las cifras"); la metalingüística dice "al definir los conceptos de
  libertad y progreso" y nunca los define; la fática habla de verificar el canal en un
  discurso ante una multitud. **El ítem se resuelve por eliminación sin leer.**
- **Retroalimentación:** excelente en evidencia — cuatro citas, todas verificadas.
- **Dificultad: no corresponde a `_Dificil`.** El enunciado es sofisticado; el ítem, no.

### Q6 — `…-Dificil-006` · clave: fática (pos. 4)

- **Clave correcta e inequívoca.** Diálogo de radio con "¿Copiado?", "¿Me recibes?",
  "Cambio".
- **Distractoras:** la apelativa ("los personajes se dan órdenes constantemente") es
  cierta en el texto —"Mantén la posición", "No cortes", "Sigue hablando"— y es un buen
  contendiente. El enunciado la desactiva al enmarcar "confirmar el contacto y mantener el
  canal abierto".
- **Retroalimentación:** la más rigurosa del fichero. **Verifiqué las siete citas de línea
  una por una: las siete son correctas.**
- **Dificultad: baja.** Es el ejemplo de manual de función fática. Un alumno que sepa qué
  es la fática acierta en tres segundos.

### Q7 — `…-Dificil-007` · clave: referencial + poética (pos. 1)

- **Clave correcta.** Texto divulgativo sobre bioluminiscencia que alterna dato químico
  (luciferina/luciferasa) y metáfora ("la poesía del océano profundo").
- **Buena distractora:** "Expresiva y referencial" es contendiente real. Se resuelve
  porque la expresiva se centra en el emisor y aquí no hay un "yo".
- Las otras dos ("apelativa y expresiva", "metalingüística y fática") se descartan sin leer.
- **Defecto D1 otra vez: "La respuesta correcta es la A."**
- **Retroalimentación:** sólida, separa bien las dos funciones. Citas verificadas correctas.

### Q8 — `…-Dificil-008` · clave: metalingüística (pos. 2) — **ÍTEM PROBLEMÁTICO**

- **Misma clasificación discutible que Q4, y aquí es más grave.** El pasaje es crítica
  literaria sobre una novela. El objeto de análisis es **un texto**, no el código. La
  retroalimentación vuelve a matizar entre paréntesis: *"un lenguaje que habla sobre el
  lenguaje (en este caso, el literario)"*.
- **La referencial se neutraliza con una premisa falsa, no con un argumento.** La opción
  (c) dice "Referencial, ya que **simplemente narra el argumento de la novela**". El texto
  no narra el argumento en ningún momento. **La distractora se descarta porque su
  justificación es falsa, no porque la referencial sea mala respuesta.** Es un atajo de
  redacción: esconde la ambigüedad real detrás de un hombre de paja.
- La opción (d) sí está bien blindada, con el "solo" haciendo el trabajo: "Expresiva,
  debido a que **solo** comunica la opinión personal del crítico".
- **Retroalimentación:** correcta y bien citada (tres referencias, verificadas).
- **Problema de conjunto:** Q4 y Q8 clavan "metalingüística" sobre textos expositivos;
  Q3 clava "poética" y Q1 "expresiva" sobre textos comparablemente figurados. **El fichero
  no enuncia en ningún sitio la teoría implícita que hace consistentes esas cuatro
  decisiones.** Un alumno no puede derivar la regla.

### Q9 — `…-Dificil-009` · clave: apelativa (pos. 3) — **EL MEJOR ÍTEM, Y EL ROTO**

- **Clave correcta y el ítem mejor construido del fichero.** Publirreportaje disfrazado de
  informe dermatológico: 27 líneas de registro técnico ("barrera cutánea", "pérdida
  transepidérmica", "estudios clínicos") y luego 7 líneas de imperativos ("Descubra…",
  "No espere más…", "Adquiera…", "Obtenga…").
- **Distractora excelente:** "Referencial, ya que su objetivo principal es educar al
  consumidor sobre dermatología" es **plenamente defendible durante las primeras 27
  líneas** y solo se derrumba al llegar al cierre. Eso es exactamente lo que debe hacer
  un ítem difícil.
- **Retroalimentación:** la mejor del fichero. Nombra la estrategia (disfraz referencial),
  distingue medio de fin, y cita los imperativos.
- **Errata factual menor en el pasaje:** línea 20 dice **"un PH neutro"**; debe ser
  **"pH"**. El corrector ortográfico no la marca (la trata como sigla).
- **Y este es el ítem que rompe el fichero.** Ver C2.

### Q10 — `…-Dificil-010` · clave: expresiva (pos. 4)

- **Clave correcta.** Monólogo interior nocturno, flujo de conciencia.
- **Problema real: la poética es defendible, y la retroalimentación arma al enemigo.**
  La opción (c) dice "Poética, debido a que el foco principal está en la creación de
  metáforas" — y el recurso central del pasaje **es** una metáfora extendida (el semáforo
  en ámbar, líneas 15-20). La retroalimentación cita *"la metáfora del semáforo para
  describir su espera (líneas 17-19)"* **como evidencia a favor de la expresiva**. Está
  usando el rasgo poético del texto para probar que no es poético.
- **Distractoras restantes:** la apelativa ("intenta convencerse a sí mismo de actuar") es
  delgada pero no absurda ("Debería intentar dormir", "Tal vez debería llamar"); la
  referencial es descartable.
- **Retroalimentación:** buena en evidencia (cuatro citas, todas verificadas correctas) y
  **descarta explícitamente apelativa y referencial. No descarta la poética** — la única
  que lo necesitaba.
- **Dificultad:** apropiada, y por la razón equivocada: es difícil porque el ítem es
  ambiguo, no porque la discriminación sea fina.

### Síntesis transversal del fichero

| Dimensión | Resultado |
|---|---|
| Claves factualmente correctas | 8 de 10 (Q4 y Q8 discutibles) |
| Ítems con dos respuestas defendibles | **3** (Q4, Q8, Q10) |
| Ítems resolubles por eliminación sin leer el pasaje | **2** (Q5, Q7) |
| Retroalimentación que explica el porqué, no repite la respuesta | **10 de 10** |
| Retroalimentación que cita evidencia del pasaje | **10 de 10** |
| Retroalimentación que refuta las distractoras | **4 de 10** (Q1, Q2 parcial, Q6, Q10 parcial) |
| Precisión de las citas de línea | 33 de 35 verificadas correctas (**94 %**) |
| Correspondencia con `_Dificil` | **4 de 10** claramente sí (Q2, Q4, Q9, Q10); 4 claramente no (Q3, Q5, Q6, Q7) |
| Errores factuales dentro del pasaje | **2** (Q4 "el verbo falaz"; Q9 "PH") |
| Formato de opciones consistente | **No** — 2 ítems con opciones desnudas, 8 con justificación |

**El patrón más informativo:** la retroalimentación es fuerte donde es fácil (explicar por
qué la correcta es correcta: 10/10) y débil donde importa (explicar por qué las
distractoras no lo son: 4/10). Y en los tres ítems con ambigüedad real, la
retroalimentación **nunca** aborda la distractora ambigua.

## C2. El defecto que la cabina ya midió

**Lo encontré.** No hizo falta que se me dijera cuál era; salió de B3 y lo confirmé
leyendo el fichero.

**Línea 671:**

```latex
    \item* Apelativa, debido a que usa la apariencia de un informe para persuadir…
    \item Poética, puesto que se enfoca en la belleza de la descripción del producto.
\end{multicols}          <-- debería ser \end{multi}
```

El entorno `multi` de la pregunta 9, abierto en la línea 603, se cierra con
`\end{multicols}`.

**Verificaciones:**
- No existe ningún `\begin{multicols}` en todo el repo. Es una errata, no un entorno mal
  anidado.
- Recuento en el fichero: 10 `\begin{multi}`, 9 `\end{multi}`. Cuadra.
- El bloque de comentarios sí declara las 10 preguntas
  (`%% Código:` ×10), lo que confirma que la intención era 10.

**Consecuencias, en orden de gravedad:**

1. **El fichero no compila.** LaTeX aborta con
   `\begin{multi} on input line 603 ended by \end{multicols}`. **Se pierden las 10
   preguntas, no solo la novena.**
2. Bajo recuperación de errores, la pregunta 10 queda anidada dentro de la 9: un solo
   entorno con 8 opciones y 2 `\item*`. Ese es exactamente el síntoma que B3 detecta.
3. El `\end{quiz}` de la línea 741 cierra contra una pila desequilibrada.
4. Hoy está latente: el `\input` correspondiente en `Español.tex` está comentado, como
   los otros 51.

**El defecto gemelo**, en el otro fichero de B3:

```
5.1.2. GEO-GP-Triangulos-01_Facil.tex:122    \end{m}    <-- debería ser \end{multi}
```

**Nota metodológica que vale la pena registrar:** la comprobación de "`\item*` ≠ 1" no
detecta preguntas con dos respuestas correctas — en este repo detecta **erratas en el
nombre del entorno de cierre**. Los dos casos que encontró la cabina son ambos de esa
clase. Un invariante que se creía semántico resultó ser sintáctico, y por eso B10 debe
implementarse con una **pila de nombres de entorno** y no con un contador de asteriscos.

## C3. Veredicto sobre el procedimiento

Pesa igual que C1, así que va sin suavizar.

### Qué paso NO fue ejecutable tal como estaba escrito

**1. Las cifras de la Parte B no eran verificables, eran refutables — y el ticket
acertó al decirlo.** Cinco de nueve no cuadran: B4 (1 con 0 opciones: no existe),
B5 (10 vs 30), B6 (90 vs 91), B7 (fallos vs cero), y B1 solo cuadra si se acuerda que
"pregunta" significa "token en disco". Casi todo el tiempo de la Parte B se fue en
**reconciliar por qué** difieren, no en medir. Eso resultó ser lo más productivo del
encargo —así se encontró el fichero duplicado— pero no es lo que el ticket describía.

**2. "Con la cwd en la raíz de cada unidad" (B7) es ambiguo en un punto decisivo.** No
dice qué hacer con las comillas de `{"img/1. Lectura/…"}`. La diferencia entre
interpretarlas y no interpretarlas es **0 fallos frente a 486**. Yo mismo obtuve 486 en
la primera pasada. Es casi seguro el origen de la discrepancia con la cabina.

**3. B8 pedía "una herramienta" sin decir cuál, en una máquina sin ninguna.** No hay
`hunspell` ni `aspell`, y el ticket prohíbe instalar. Tuve que descubrir que el
diccionario `es-MX` de Windows estaba disponible y escribir interop COM para llegar a él.
Eso son ~25 minutos que el ticket no presupuestaba, y el resultado tiene un 2,8 % de
precisión: **una herramienta que técnicamente cumple el encargo y prácticamente no sirve
como puerta.**

**4. "No auditar más de UN quiz" chocó con "reporta si el formato no es uniforme".** Para
saber si un procedimiento sirve para 274 ficheros hay que mirar más de uno. Lo resolví
midiendo mecánicamente sobre los 274 los defectos que encontré leyendo el piloto (los
D1/D2/D3 de B-extra). Esa vuelta —del hallazgo cualitativo al barrido cuantitativo— es
lo que hace útil un piloto, y el ticket no la contemplaba.

**5. `%% Código:` no está en posición fija.** El ticket describe el bloque como
`%% Problema:, %% Subtema:, %% Codigo:` en ese orden. En Geometría el orden es
`Problema / Código / Subtema`. Un extractor posicional falla en toda la unidad.

### Qué criterio tuve que inventar porque el ticket no lo daba

| Criterio | Lo que decidí | Por qué importa |
|---|---|---|
| **Qué es "una pregunta"** | Entorno `multi` bien formado, no token `\begin{multi}` | Es la diferencia entre 5 713 y 5 727, y determina todos los denominadores |
| **Qué es "contenido"** | Los 274 `.tex` con ≥1 `multi`, excluyendo maestros, `test.tex` y checkpoints | El ticket dice "276"; el censo da 274 (281 − 4 maestros − 2 `test.tex` − 1 checkpoint) |
| **Qué es "una unidad"** para B5 | Las 4 carpetas con su propio `components/` | El ticket lo presupone sin definirlo; Diagnóstico y Simulador comparten códigos y eso NO debe ser defecto |
| **"Descartable sin leer"** (C1) | La justificación de la opción contradice un hecho verificable del pasaje, o describe un rasgo ausente | El ticket usa la frase sin definirla y es la mitad del juicio de plausibilidad |
| **"Dos defendibles a la vez"** | Un lector experto puede construir un argumento no trivial para ambas | Sin esto, "difícil" y "ambiguo" son indistinguibles |
| **Qué es un error ortográfico** | Solo formas no atribuibles a nombre propio, préstamo marcado, tecnicismo válido o artefacto de extracción | Sin este filtro, B8 son 863 hallazgos; con él, 24 |
| **Correspondencia con `_Dificil`** | Comparación relativa **dentro del fichero**, no contra un baremo | No existe rúbrica de dificultad en el repo. Es el criterio más frágil que usé y el que más se beneficiaría de que el operador lo fijara |

Ese último merece énfasis: **el repo no define en ninguna parte qué hace difícil a una
pregunta.** Emití juicios de dificultad contra un estándar que me inventé. Otro revisor
—u otra pasada mía— daría otro reparto. **Sin una rúbrica escrita, ese criterio de C1 no
es reproducible y no debería lotearse.**

### Cuánto costó, y cuánto costarían los 274

**Coste real de esta sesión**, por fases:

| Fase | Coste |
|---|---|
| Orientación y lectura de la DSL (Parte A) | ~15 min |
| Escribir y depurar los analizadores | ~25 min |
| Parte B, B1–B7 y B9 (incluida la reconciliación con la cabina) | ~30 min |
| B8: descubrir el diccionario, interop COM, corpus, triaje | ~35 min |
| **Parte C sobre UN fichero** | **~30 min** |
| B-extra (D1/D2/D3, barridos derivados del piloto) | ~15 min |
| Redacción del record | ~25 min |

**El coste de la Parte A + los analizadores es de una sola vez: ~40 min, ya pagados.**
Lo que escala es la Parte C.

**Y aquí está el dato que invalida la extrapolación ingenua:**

```
preguntas por fichero de contenido (n=274):
  min = 9    p25 = 15    mediana = 20    p75 = 25    p90 = 30    max = 60
  media = 20,9

fichero piloto: 9 preguntas  ->  PERCENTIL 0
```

**El fichero del piloto es el más pequeño del repositorio.** No es representativo; es el
extremo. La mediana tiene 20 preguntas, el máximo tiene 60.

Ajustando por preguntas, y suponiendo que el coste escala linealmente con el número de
ítems (~3 min de lectura y juicio por pregunta, medido: 30 min / 10 ítems):

| Base | Cálculo | Total |
|---|---|---|
| Ingenua (274 × 30 min) | asume 9 preguntas/fichero | **137 h** |
| **Ajustada (5 713 × 3 min)** | por pregunta real | **~286 h** |
| Ajustada, con sobrecoste por fichero (+5 min ×274) | contexto, pasaje compartido, redacción | **~309 h** |

**Extrapolar desde el piloto subestima el lote en un factor de ~2,3.** Y ~300 h de juicio
editorial sostenido es del orden de **dos meses-persona**. A eso hay que añadir que el
juicio de dificultad no es reproducible sin rúbrica (arriba), así que parte de esas 300 h
produciría resultados que otro revisor no confirmaría.

### Qué es mecanizable y qué exige juicio humano

**Mecanizable hoy, con lo ya escrito y medido en esta sesión:**

| Comprobación | Estado | Coste |
|---|---|---|
| Balance y nombres de entorno (B3 + `Itemize`) | Listo, 0 falsos positivos | ~1,1 s |
| Códigos duplicados por unidad (B5) | Listo, 0 falsos positivos | incluido |
| Resolución de imágenes (B7) | Listo, 0 falsos positivos **con el despojo de comillas** | ~0,5 s |
| Presencia de feedback (B2) | Trivial, hoy 100 % | incluido |
| Recuento de opciones (B4) | Trivial; **falta adjudicar la norma** | incluido |
| Nombre de fichero ↔ código | Listo; hoy 75 fallos reales | incluido |
| **Posición de la clave (D2)** | Listo. **Hallazgo mayor: 43 % en la 3.ª posición** | incluido |
| Referencia a letra de opción (D1) | Una regex; 2 casos | incluido |

**Mecanizable con más trabajo:**

- **Citas de línea (D3).** Precisión actual ~6 %; con ventana ±1 y tratamiento de
  elisiones subiría mucho. Es el candidato con mejor relación valor/esfuerzo que queda:
  cubre por completo la dimensión "¿cita evidencia del pasaje?" de C1.
- **"La retroalimentación refuta las distractoras".** Aproximable contando cuántas de las
  opciones no marcadas aparecen mencionadas en el texto del feedback. Daría un indicador
  ordinal útil (en el piloto: 4 de 10) sin entender nada.
- **Ortografía.** Mecanizable pero con precisión del 2,8 %; útil como informe para revisión
  humana, inútil como puerta.

**Exige juicio humano, sin atajo:**

- **Corrección factual del pasaje y de la clave.** Ni "el verbo *falaz*" ni "PH neutro" son
  detectables mecánicamente. El primero requiere saber gramática española; el segundo,
  convención química.
- **¿Hay dos respuestas defendibles?** Es el núcleo del asunto y requiere construir el
  argumento contrario. Los tres casos del piloto (Q4, Q8, Q10) exigieron conocer a
  Jakobson lo bastante para ver que la retroalimentación se estaba matizando a sí misma.
- **¿Es descartable sin leer?** Requiere leer el pasaje y la opción y juzgar si la
  justificación es falsable desde el texto.
- **Correspondencia con la dificultad declarada.** **Y hoy ni siquiera es juicio humano
  reproducible, porque no hay rúbrica.**
- **Coherencia teórica entre ítems.** Que Q4 y Q8 clasifiquen igual dos textos distintos,
  y que esa clasificación choque con la de Q1 y Q3, solo se ve leyendo los cuatro juntos.

### Recomendación

**Separar el lote en dos encargos distintos, porque tienen economías incompatibles.**

**Encargo 1 — barrido mecánico, sobre los 274, coste ~2 s de máquina.**
Los ocho invariantes de la tabla "mecanizable hoy", más D3 arreglado. Devuelve una lista
finita y accionable: 9 entornos rotos, 30 códigos duplicados, 75 desajustes
nombre↔código, 2 referencias a letra, 1 pregunta de 3 opciones, y el sesgo de posición de
clave. **Todo esto es corregible sin juicio editorial y sin leer una sola pregunta.**

**Encargo 2 — auditoría editorial, y no sobre los 274.**
Antes de lotear nada, hacen falta dos cosas que hoy no existen:
1. **Una rúbrica escrita de dificultad**, o el criterio no es reproducible.
2. **Una decisión sobre la teoría de las funciones del lenguaje** (y equivalentes en los
   demás temas), o los ítems como Q4 y Q8 se seguirán produciendo.

Con eso resuelto, priorizar por señal mecánica en vez de barrer: **empezar por las
preguntas cuya clave está en la 3.ª posición**, por las de 5 opciones fuera del
Diagnóstico, y por los ficheros con citas de línea que no resuelven. Eso concentra el
juicio humano donde hay indicio previo de problema, en lugar de repartir ~300 h de forma
uniforme sobre un corpus cuya retroalimentación, según el piloto, ya es buena 10 veces
de 10 en lo que más cuesta escribir.

---

## Apéndice — reconciliación con las mediciones de la cabina

| Punto | Cabina | Disco | ¿Coincide? | Explicación |
|---|---|---|---|---|
| B1 | 5727 | 5 727 tokens / **5 713 preguntas** | Parcial | 9 entornos no cierran; 5 en `test.tex` |
| B2 | 0 | **0** | ✅ | — |
| B3 | 2 reales + varias en test | **2 reales + 7 en test** | ✅ | Códigos correctos; son erratas de `\end{}`, no doble clave |
| B4 | 4696/4, 1021/5, 1/3, 1/0 | **4 689/4, 1 021/5, 1/3, 2/8** | ❌ | No hay ninguna de 0 opciones; las de "8" son pares fusionados |
| B5 | 10 | **30** | ❌ | Fichero completo duplicado, no 10 códigos sueltos |
| B5 reuso | 1099 | **1 744 instancias / 1 069 códigos** | Parcial | Discrepancia de unidad de cuenta |
| B6 | 90 | **91 códigos / 121 instancias** | ❌ (por 1) | — |
| B7 | fallos | **508 llamadas, 0 fallos** | ❌ | Rutas entre comillas: 486 falsos positivos si no se despojan |
| B9 | 2 | **2 `test.tex` + 1 checkpoint `.tex` + 120 ficheros en `.ipynb_checkpoints` + artefactos de build** | Parcial | — |
| Ficheros modificados | 4 | **4 en `PAA/`** (+4 en `.project/`) | ✅ | Los 4 de `PAA/` son artefactos de compilación del Diagnóstico |

**El disco manda sobre el ticket, como pedía el encargo. Los desacuerdos de B5 y B7 son
los que más información aportan: uno destapó un hueco de 30 preguntas en el temario, el
otro es un falso positivo que habría contaminado cualquier comprobador automático.**
