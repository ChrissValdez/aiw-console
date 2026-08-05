# MEDICIÓN — El repo `cantu-quizzes-latex`, tal como está

**Fecha:** 2026-08-04. **Tipo:** medición read-only fechada (D-042: no se reescribe).

**Qué mide:** qué forma tiene `projects/cantu-quizzes-latex` —repo recién creado por el
operador, con contenido real ya dentro— ANTES de emitirle un `.project/` o escribirle un
roadmap.

**Qué NO hace:** no escribe un solo byte en `cantu-quizzes-latex` (ni `.project/`, ni
`.gitignore`, ni scripts); no compila nada; no registra el proyecto
(`project-console/projects.json` no se tocó); no escribe roadmap, handoff ni entrada de
decisiones; no construye el comando de verificación; no corrió la suite. **Git se ejecutó
solo en modo lectura** (`rev-parse`, `remote -v`, `log`, `status`, `branch`, `ls-files`):
ninguna forma que escriba.

**Alcance de lectura:** `projects/cantu-quizzes-latex` (excluido `.git` para el
inventario de contenido; `.git` sí se consultó para tamaño y estado), más la medición
previa `context/aiw-console/records/MEDICION-ALTA-DE-PROYECTO-NUEVO.md`.

**Contexto que gobierna la lectura, declarado por el encargo:** son quizzes y exámenes
en LaTeX, **autocontenidos**. Nadie los compila desde fuera. **No se buscó ni se asumió
relación alguna con `cantu-studio` ni con `cantu-lessons`.** Verificado además por
medida: 0 ficheros del repo referencian nada fuera de su propia unidad (B.6.4).

**Método.** Toda cifra lleva su ruta o el comando que la produjo. Lo ejecutado fue
`find`, `grep`, `md5sum`, `wc`, `du`, `od`, `sed`, `awk` y `git` de solo lectura, más dos
sondeos de PATH (`command -v` en Bash y `Get-Command` en PowerShell). **Ninguno escribió
un byte en el repo medido.** El único archivo escrito por esta medición es este record.

**Relación con la medición previa.** `MEDICION-ALTA-DE-PROYECTO-NUEVO.md` (2026-08-04,
45 048 bytes) ya midió **qué exige el contrato**, **qué cuesta registrar** y **qué hace
falta para abrir hilo**. Aquí **no se repite nada de eso**: el bloque D se apoya en ella
y la cita por sección. Lo nuevo de este record es que el repo **ya existe** — aquella
medición lo dio por inexistente en su D.1, y esa afirmación **ha caducado**: ver A.0.

---

# BLOQUE A — Qué hay ahí

## A.0 El repo EXISTE. La medición previa queda superada en ese punto

`MEDICION-ALTA-DE-PROYECTO-NUEVO.md:576-594` (§D.1) declaró: «**No existe el directorio y
no existe el repositorio**… sigue sin rastro en disco a 2026-08-04».

**Eso ya no es cierto.** Medido:

```
ls -la projects/                     →  aiw-console  cantu-lessons  cantu-quizzes-latex  cantu-studio
ls -la projects/cantu-quizzes-latex/ →  .git/  .gitattributes  PAA/
```

El directorio se creó el **2026-08-04 a las 17:21** y el contenido se volcó a las **17:26**
(fechas de `git log`, A.3). La medición previa se escribió ese mismo día antes de esa hora.
**No es un error de aquella medición: es que el mundo cambió entre las dos.** Se anota
porque quien lea las dos seguidas encontrará la contradicción.

**No se corrige el record previo** (D-042: los records no se reescriben). Este lo sucede
en ese punto y solo en ese punto.

## A.1 Inventario del árbol

### A.1.1 Tamaño y recuento global

| Magnitud | Cifra | Unidad | Comando |
|---|---|---|---|
| Ficheros, excluido `.git` | **1 393** | ficheros | `find . -path ./.git -prune -o -type f -print \| wc -l` |
| Nodos de directorio, excluido `.git` | **98** | directorios (incluye la raíz `.`; 97 subdirectorios) | `find . -path ./.git -prune -o -type d -print \| wc -l` |
| Tamaño del contenido, excluido `.git` | **282 052 KiB** = **275,4 MiB** | KiB | `du -sk --exclude=.git .` |
| Tamaño de `.git` | **88 946 KiB** = **86,9 MiB** | KiB | `du -sk .git` |
| **Tamaño total en disco** | **370 998 KiB** = **362,3 MiB** | KiB | `du -sk .` |

### A.1.2 Carpetas de primer y segundo nivel

**Primer nivel: 2 entradas** (`find . -maxdepth 1 -mindepth 1 -not -path './.git'`):

```
./.gitattributes      (1 fichero, 66 bytes)
./PAA/                (1 directorio)
```

**Todo el contenido cuelga de `PAA/`.** No hay nada más en la raíz.

**Segundo nivel: 3 directorios** (`find . -maxdepth 2 -mindepth 2 -not -path './.git*'`):

```
./PAA/Banco de Preguntas/
./PAA/Examen Diagnostico/
./PAA/Examen Simulador/
```

**Tercer nivel** — se incluye porque es donde aparece la unidad real (B.5):

```
./PAA/Banco de Preguntas/Español/          ./PAA/Examen Diagnostico/Secciones/
./PAA/Banco de Preguntas/Matematicas/      ./PAA/Examen Diagnostico/components/
                                           ./PAA/Examen Diagnostico/img/
                                           ./PAA/Examen Diagnostico/logo/
                                           ./PAA/Examen Diagnostico/.ipynb_checkpoints/
                                           ./PAA/Examen Simulador/{Secciones,components,img,logo,.ipynb_checkpoints}/
```

### A.1.3 Ficheros por extensión

`find . -path ./.git -prune -o -type f -print | sed 's/.*\.//' | sort | uniq -c | sort -rn`

| Extensión | Ficheros | Qué es |
|---|---|---|
| `.png` | **726** | imágenes de los problemas y logos |
| `.tex` | **281** | fuentes LaTeX (4 maestros + 277 fragmentos) |
| `.txt` | **194** | material de trabajo de `WiziAcademy Problemas/` |
| `.ipynb` | **145** | cuadernos Jupyter de extracción/conversión |
| `.sty` | **8** | 2 paquetes propios × 4 copias |
| `.gz` | **6** | 4 `.synctex.gz` + 2 `.synctex(busy).gz` |
| `.xml` | **4** | export Moodle, 1 por unidad |
| `.xlsx` | **4** | hojas de cálculo dentro de `img/…/Done/` |
| `.pdf` | **4** | PDF compilado, 1 por unidad |
| `.aux` | **4** | artefacto de compilación |
| `.log` | **4** | artefacto de compilación |
| `.out` | **4** | artefacto de compilación (`hyperref`) |
| `.auxlock` | **4** | artefacto de compilación |
| `.cls` | **4** | 1 clase propia × 4 copias |
| *(sin extensión propia)* `.gitattributes` | **1** | único fichero de configuración |
| **TOTAL** | **1 393** | |

**Ruido de herramienta medido:** **120 ficheros** viven bajo `*/.ipynb_checkpoints/`
(1 `.tex`, 28 `.png`, 91 `.ipynb`), y **los 120 están rastreados por git**
(`git ls-files | grep -c 'ipynb_checkpoints'` = 120). Es el **8,6 %** de los ficheros del
repo. Todas las cifras de contenido de este record se dan **excluyendo checkpoints** y se
dice cuándo.

**Duplicación medida por contenido, no por nombre:**

| Clase | Total | Únicos por `md5sum` | Duplicados |
|---|---|---|---|
| `.tex` (sin checkpoints) | 280 | **280** | **0** |
| `.png` | 726 | **597** | **129** (17,8 %) |

Que los 280 `.tex` sean todos distintos es un hallazgo: **las cuatro unidades no son
copias unas de otras** pese a compartir nomenclatura de temas.

## A.2 Estado de git — lectura solamente

| Pregunta | Respuesta | Comando |
|---|---|---|
| ¿Es repositorio? | **Sí** | `git rev-parse --is-inside-work-tree` → `true` |
| ¿Tiene remoto? | **Sí, uno**: `origin` → `https://github.com/ChrissValdez/cantu-quizzes-latex.git` (fetch y push) | `git remote -v` |
| Rama actual | `main`; existe `remotes/origin/main` y `origin/HEAD → origin/main` | `git branch -a` |
| HEAD | `54ca7158468f1cb21b4fdb02ae6a5e4ed143d93e` | `git rev-parse HEAD` |
| ¿Árbol limpio? | **Sí. 0 entradas** | `git status --porcelain=v1 \| wc -l` → `0` |
| Ficheros rastreados | **1 393** — es decir, **todos** los del árbol (A.1.1) | `git ls-files \| wc -l` |
| Commits | **2** | `git log --oneline \| wc -l` |

Historial completo (`git log --format='%ad | %an | %s' --date=iso`):

```
2026-08-04 17:26:38 -0600 | Chriss Valdez | create repo with PAA content
2026-08-04 17:21:03 -0600 | Chriss Valdez | Initial commit
```

**Lectura:** el repo nació hoy, con **todo el contenido en un único commit**. No hay
historial de autoría del contenido: git no puede decir nada sobre cómo se construyeron los
quizzes, solo que llegaron juntos.

## A.3 Ficheros de configuración y metadatos que YA existen

Barrido dirigido (`find . -path ./.git -prune -o -name "<X>" -print` para cada nombre):

| Fichero buscado | ¿Existe? |
|---|---|
| `package.json` | **NO** |
| `Makefile` / `makefile` / `GNUmakefile` | **NO** |
| `latexmkrc` / `.latexmkrc` | **NO** |
| `.gitignore` | **NO** |
| `README` / `README.md` / `README.txt` | **NO** |
| `LICENSE` | **NO** |
| `justfile` / `Taskfile.yml` | **NO** |
| `.github/` | **NO** |
| `docs/` · `roadmap/` · `governance/` · `.aiw/` · `.project/` | **NO** (los cinco, comprobados con `[ -d … ]`) |
| **`.gitattributes`** | **SÍ — es el único** |

Contenido íntegro de `.gitattributes` (2 líneas, 66 bytes):

```
# Auto detect text files and perform LF normalization
* text=auto
```

**Cifra de cierre del bloque A: el repo tiene exactamente UN fichero de configuración, y
es el que GitHub crea por defecto.** No hay build, no hay documentación, no hay ignore, no
hay metadatos de proyecto.

---

# BLOQUE B — Cómo está organizado el contenido

## B.5 La estructura real, descrita sin proponer otra

### B.5.1 El eje de agrupación es **la unidad compilable**, no el tema

El árbol tiene tres niveles de agrupación anidados, y **el que manda es el segundo**:

```
PAA/                                   ← 1. la prueba (Prueba de Aptitud Académica)
├── Banco de Preguntas/
│   ├── Español/                       ← 2. UNIDAD  (tiene maestro, components, img, logo)
│   └── Matematicas/                   ← 2. UNIDAD
├── Examen Diagnostico/                ← 2. UNIDAD
└── Examen Simulador/                  ← 2. UNIDAD
```

**Hay 4 unidades, no 3.** `Banco de Preguntas/` **no es una unidad**: es un contenedor con
dos unidades dentro. La prueba de que la unidad está en ese nivel y no en otro es que
**exactamente en esos 4 directorios, y solo en ellos, hay un `.tex` con
`\documentclass`** (B.7.1).

### B.5.2 Las 4 unidades, con su forma real

Cada unidad tiene **la misma anatomía de 5 piezas**, con un solo nombre distinto:

| Pieza | `Español` | `Matematicas` | `Examen Diagnostico` | `Examen Simulador` |
|---|---|---|---|---|
| Maestro `.tex` | `Español.tex` | `Matematicas.tex` | `Examen_Diagnostico.tex` | `Examen_Simulador.tex` |
| Carpeta de fragmentos | `Temas/` | `Temas/` | **`Secciones/`** | **`Secciones/`** |
| Preámbulo compartido | `components/` | `components/` | `components/` | `components/` |
| Imágenes | `img/` | `img/` | `img/` | `img/` |
| Logo | `logo/` | `logo/` | `logo/` | `logo/` |
| Material de trabajo | `WiziAcademy Problemas/` | `WiziAcademy Problemas/` | — | — |

**La única divergencia estructural entre las 4 es el nombre de la carpeta de fragmentos:**
`Temas/` en los dos bancos, `Secciones/` en los dos exámenes. Es coherente con su función
(un banco se organiza por tema; un examen, por sección de prueba), pero es una divergencia
real que cualquier comando que recorra el repo tendrá que absorber.

### B.5.3 Dentro de la carpeta de fragmentos: dos convenciones de nombre distintas

**Bancos — prefijo numérico jerárquico + código de destreza + dificultad.** Ejemplos
reales:

```
PAA/Banco de Preguntas/Español/Temas/1. Lectura/1.1.1.LEC-CG-InfoExplicita-01_Facil.tex
PAA/Banco de Preguntas/Español/Temas/1. Lectura/1.1.2.LEC-CG-Inferencias-02_Medio.tex
PAA/Banco de Preguntas/Español/Temas/1. Lectura/1.2.1.LEC-AEL-ClasificacionTextos-03_Dificil.tex
PAA/Banco de Preguntas/Matematicas/Temas/5. Geometria/5.1.1. GEO-GP-Angulos-02_Medio.tex
```

El patrón es `<N.N.N>.<AREA>-<BLOQUE>-<Destreza>-<NN>_<Facil|Medio|Dificil>.tex`.
**La dificultad está en el nombre del fichero**, y con ella el fichero es la unidad de
dificultad: un mismo tema se parte en 3 ficheros (Fácil/Medio/Difícil).

**Exámenes — solo código de destreza, sin prefijo numérico ni dificultad.** Ejemplos
reales:

```
PAA/Examen Diagnostico/Secciones/3. Matemáticas/GEO-GA-Transformaciones.tex
PAA/Examen Diagnostico/Secciones/3. Matemáticas/ALG-EQD-EcuacionesCuadraticas.tex
PAA/Examen Simulador/Secciones/1. Lectura/LEC-AEL-Vocabulario.tex
```

Aquí **un fichero = una destreza completa**, con sus problemas de varias dificultades
dentro.

**Las carpetas de tema/sección llevan prefijo numérico con punto y espacio**, y ese es el
orden de lectura: `1. Lectura`, `2. Redaccion` / `2. Redacción`, `3. Matemáticas`,
`4. Estadistica`, `5. Geometria`.

**Aviso de portabilidad, medido en las rutas de arriba:** los nombres llevan **espacios**,
**puntos**, **tildes** (`Español`, `Matemáticas`, `Geometría`, `Análisis de Dato`) y
**variantes con y sin tilde para el mismo concepto** — `2. Redaccion` en el banco de
Español contra `2. Redacción` en los dos exámenes; `img/3. Matematicas/` sin tilde contra
`Secciones/3. Matemáticas/` con tilde **dentro de la misma unidad**. Un comando que
recorra el árbol tendrá que citar todas las rutas y no podrá suponer normalización.

### B.5.4 Distribución de fragmentos por carpeta

`find . -name '*.tex' | xargs dirname | sort | uniq -c | sort -rn` — las 13 carpetas con
fragmentos:

| Carpeta | `.tex` |
|---|---|
| `Banco de Preguntas/Matematicas/Temas/2. Algebra` | 42 |
| `Examen Diagnostico/Secciones/3. Matemáticas` | 41 |
| `Banco de Preguntas/Español/Temas/1. Lectura` | 36 |
| `Examen Simulador/Secciones/3. Matemáticas` | 26 |
| `Banco de Preguntas/Matematicas/Temas/3. Funciones` | 24 |
| `Banco de Preguntas/Matematicas/Temas/5. Geometria` | 21 |
| `Banco de Preguntas/Matematicas/Temas/1. Aritmetica` | 21 |
| `Banco de Preguntas/Matematicas/Temas/4. Estadistica` | 15 |
| `Banco de Preguntas/Español/Temas/2. Redaccion` | 15 |
| `Examen Diagnostico/Secciones/1. Lectura` | 12 |
| `Examen Simulador/Secciones/1. Lectura` | 11 |
| `Examen Simulador/Secciones/2. Redacción` | 5 |
| `Examen Diagnostico/Secciones/2. Redacción` | 5 |

Más 4 maestros (1 por unidad) y 1 `.tex` en `.ipynb_checkpoints`. **Total 281.**

### B.5.5 Tamaño por unidad

`du -sk` sobre cada unidad:

| Unidad | KiB | MiB | % del contenido |
|---|---|---|---|
| `Banco de Preguntas/Matematicas` | 214 371 | **209,3** | 76,0 % |
| `Examen Simulador` | 29 751 | **29,1** | 10,5 % |
| `Banco de Preguntas/Español` | 20 825 | **20,3** | 7,4 % |
| `Examen Diagnostico` | 17 096 | **16,7** | 6,1 % |

**El 76 % del repo es una sola unidad**, y lo es por sus imágenes: `img/5. Geometria` sola
tiene **218 `.png`** y `img/4. Estadistica` otros **85**.

### B.5.6 Lo que NO es LaTeX: `WiziAcademy Problemas/`

Presente solo en las dos unidades de `Banco de Preguntas/`. Contiene **194 `.txt`** y
**145 `.ipynb`** (A.1.3), organizados por etapa de un pipeline de extracción, con los
nombres de carpeta declarando la etapa:

```
Español/WiziAcademy Problemas/1. Extraidos Originales/
Español/WiziAcademy Problemas/2. Extraidos originales por partes/
Español/WiziAcademy Problemas/3. Extraidos-convertidos completos/
Español/WiziAcademy Problemas/4. Extraido-convertidos por partes/
Español/WiziAcademy Problemas/5. Finalizado/
Matematicas/WiziAcademy Problemas/{1. Aritmetica,2. Algebra,…}/{done,Done,Codigo,imgs,img}/
```

**Es material de proceso, no producto.** Ningún `.tex` del repo lo referencia
(0 apariciones de `WiziAcademy` en los `.tex`, implícito en B.6.4: 0 referencias fuera de
la unidad y `WiziAcademy Problemas/` no aparece en ninguna ruta de `\input` ni de
`\includegraphics`). Ocupa **339 ficheros** de los 1 393 (**24,3 %** del recuento).

## B.6 Piezas compartidas — medidas abriendo ficheros

### B.6.1 Qué hay: 3 piezas propias, replicadas 4 veces

`find . \( -name '*.cls' -o -name '*.sty' \) -print`:

| Pieza | Copias | Líneas por copia | Qué es |
|---|---|---|---|
| `components/aleph-notas.cls` | **4** | **428** | la clase de documento |
| `components/aleph-moodle.sty` | **4** | **296** | envoltorio del paquete CTAN `moodle` |
| `components/aleph-comandos.sty` | **4** | **275** | macros de autor |
| `logo/LogoEducaTalento.png` | **4** | — | logo institucional |

**Total: 12 ficheros de código LaTeX = 3 996 líneas, de las cuales 999 son únicas.**

### B.6.2 Las 4 copias son BYTE A BYTE IDÉNTICAS. Medido

`md5sum` sobre las 12 (comando y salida reales):

```
a8969c3b0922075a15c3f356479936d6  ×4   components/aleph-moodle.sty
de1b4964be2189f1e3655e11760d2778  ×4   components/aleph-notas.cls
f6140b02c52d3fbdea09d97a22fb0ac0  ×4   components/aleph-comandos.sty
```

**Un hash por nombre, cuatro rutas cada uno.** No hay deriva entre unidades hoy — pero
tampoco hay nada que la impida: son cuatro copias independientes en disco y en git.

### B.6.3 Un quiz **NO** las referencia. Las referencia el MAESTRO

Esta es la medida que el criterio pedía hacer abriendo ficheros, y el resultado invierte
lo que sugieren los nombres.

**El maestro carga las tres piezas.** `PAA/Examen Diagnostico/Examen_Diagnostico.tex:1-25`:

```latex
\documentclass[a4,11pt]{components/aleph-notas}
\usepackage{components/aleph-moodle}
\moodleregisternewcommands
\usepackage{components/aleph-comandos}
\usepackage{cancel}
...
\logodos[4.5cm]{logo/LogoEducaTalento}
```

**Los fragmentos no cargan nada.** Medido sobre los 277 fragmentos:

```
ficheros no-maestros que contienen \usepackage  →  0
```

**Un fragmento empieza directamente en contenido.** Primeras líneas reales de
`PAA/Banco de Preguntas/Español/Temas/1. Lectura/1.1.1.LEC-CG-InfoExplicita-01_Facil.tex`:

```latex
\section{Comprensión Lectora}
\begin{quiz}{Información Explícita y Factual - Fácil}
%% Código: LEC-CG-InfoExplicita-Facil-001
\begin{multi}[feedback={…}]{LEC-CG-InfoExplicita-Facil-001}
```

Sin `\documentclass`, sin preámbulo, sin `\begin{document}`.

### B.6.4 Autocontención: **sí, a nivel de UNIDAD; no, a nivel de fragmento**

Tres medidas lo fijan:

1. **Ningún fichero del repo referencia fuera de su unidad.** Fragmentos con `../` en una
   ruta: **0**. No hay aristas entre las 4 unidades, ni hacia fuera del repo.
2. **Las imágenes se referencian desde la raíz de la UNIDAD, no desde el fragmento.**
   Ejemplo real —
   `PAA/Examen Simulador/Secciones/3. Matemáticas/GEO-GP-Triangulos.tex:237`:

   ```latex
   \includegraphics[width=0.5\textwidth]{"img/3. Matematicas/5. Geometria/GEO-GP-Triangulos-Medio-007.png"}
   ```

   El fichero está en `Secciones/3. Matemáticas/`, pero la ruta arranca en `img/`, que
   cuelga de la raíz de la unidad. **Esa ruta solo resuelve si el directorio de trabajo es
   la unidad.** No hay `\graphicspath` que lo salve: `grep -F 'graphicspath'` sobre la
   `.cls` y los dos `.sty` → **0 coincidencias**.
3. **Las 508 referencias a imagen resuelven.** Resueltas una por una contra el disco desde
   la raíz de cada unidad:

   | Unidad | Referencias `\includegraphics` | No resuelven |
   |---|---|---|
   | `Banco de Preguntas/Español` | 50 | **0** |
   | `Banco de Preguntas/Matematicas` | 325 | **0** |
   | `Examen Diagnostico` | 78 | **0** |
   | `Examen Simulador` | 55 | **0** |
   | **TOTAL** | **508** | **0** |

**Veredicto medido:** la unidad autocontenida es la **carpeta de unidad** (`Español/`,
`Matematicas/`, `Examen Diagnostico/`, `Examen Simulador/`). Un fragmento suelto **no lo
es**: le faltan el preámbulo (que le da el maestro) y el directorio base (que le dan las
rutas relativas a la unidad).

### B.6.5 Qué exige el preámbulo del sistema TeX

`\RequirePackage` en `components/aleph-notas.cls`: **30 apariciones**. Las de la ruta
principal (`aleph-notas.cls:27-88`):

```
ifthen · iftex · inputenc[utf8] · fontenc[T1] · xcolor · amsmath,amsthm · enumitem
tcolorbox[many] · fontawesome · graphicx · titlesec · setspace · fancyhdr · titletoc
comment · float · geometry · tabularray · hyperref[colorlinks,allcolors=.,breaklinks]
```

Y por rama de fuente (`:97-119`): `mathpazo`, `fontspec`, `montserrat`, `eulervm`.

`components/aleph-moodle.sty:15-21` requiere además:

```
iftex · moodle[subsection] · enumitem · environ · xcolor
```

**`tabularray`, `fontawesome`, `montserrat`, `moodle` y `fontspec` no están en una
instalación mínima de TeX.** Se anota como insumo del bloque C, no como defecto.

## B.7 ¿Compilables individualmente o hay maestro?

### B.7.1 Hay maestro. Cuatro, uno por unidad

`grep -rl '\documentclass' --include='*.tex' .` → **4 ficheros, ni uno más**:

```
./PAA/Banco de Preguntas/Español/Español.tex
./PAA/Banco de Preguntas/Matematicas/Matematicas.tex
./PAA/Examen Diagnostico/Examen_Diagnostico.tex
./PAA/Examen Simulador/Examen_Simulador.tex
```

**281 − 4 = 277 ficheros `.tex` no tienen `\documentclass`.** No son compilables
individualmente tal como están: no son documentos, son fragmentos.

Tampoco hay mecanismo alternativo de inclusión: `\include{`, `\subfile{`, `\import{` e
`\InputIfFileExists` → **0 apariciones en los 4 maestros**. **El único mecanismo es
`\input`.**

Y solo 3 ficheros del repo contienen un `\input` activo, y los 3 son maestros
(`grep -rl '^[^%]*\input' --include='*.tex' .`): **no hay agregadores intermedios**. La
jerarquía es de exactamente dos niveles — maestro → fragmento.

### B.7.2 ⚠ Los maestros están **casi enteramente comentados**

Esta es la medida más consecuente del bloque B.

| Maestro | Líneas | `\input` **activos** | `\input` **comentados** |
|---|---|---|---|
| `Español.tex` | 202 | **0** | **52** |
| `Matematicas.tex` | 425 | **1** | **122** |
| `Examen_Diagnostico.tex` | 151 | **1** | **57** |
| `Examen_Simulador.tex` | 152 | **1** | **41** |
| **TOTAL** | 930 | **3** | **272** |

Los 3 `\input` activos, con su línea (`grep -rn '^[^%]*\input' --include='*.tex' .`):

```
Matematicas.tex:369        \input{Temas/5. Geometria/5.1.1. GEO-GP-Angulos-02_Medio.tex}
Examen_Diagnostico.tex:145 \input{Secciones/3. Matemáticas/GEO-GA-Transformaciones.tex}
Examen_Simulador.tex:43    \input{Secciones/1. Lectura/LEC-AEL-Vocabulario.tex}
```

Y así se ve el maestro por dentro (`Examen_Diagnostico.tex:44-57`, verbatim):

```latex
%\input{Secciones/1. Lectura/LEC-CG-Inferencias.tex}
%\input{Secciones/1. Lectura/LEC-CG-IdeaCentral.tex}
%\input{Secciones/1. Lectura/LEC-CG-InfoExplicita.tex}
...
```

**Lectura, sin interpretar de más:** el maestro **no es un índice del contenido de la
unidad**; es una **consola de trabajo** donde el autor descomenta la pieza que está
editando y compila solo esa. Es una forma de trabajo perfectamente coherente — y significa
que **el estado comprometido en git es el estado de la última sesión de edición**, no un
documento completo.

**Consecuencia dura, medida:** compilar `Español.tex` **hoy, tal como está en `main`**,
produce un PDF con **0 fragmentos** — solo el encabezado. Compilar los otros tres produce
un PDF con **1 fragmento cada uno**. **El repo, tal como está comprometido, no describe
ningún examen completo.**

### B.7.3 Los PDF comprometidos no corresponden a las fuentes comprometidas

Cruzando lo que cada `.log` dice haber leído contra los `\input` activos de hoy:

| Unidad | Fragmentos leídos según el `.log` | `\input` activos hoy | ¿Coincide? |
|---|---|---|---|
| `Matematicas` | `Temas/5. Geometria/5.1.1. GEO-GP-Angulos-02_Medio.tex` | 1 (el mismo) | **Sí** |
| `Examen Diagnostico` | `Secciones/3. Matemáticas/GEO-GA-Transformaciones.tex` | 1 (el mismo) | **Sí** |
| `Examen Simulador` | `Secciones/1. Lectura/LEC-AEL-Vocabulario.tex` | 1 (el mismo) | **Sí** |
| `Español` | `Temas/2. Redaccion/2.2.3.RED-RS-Particularizacion-01_Facil.tex`, `…-03_Dificil.tex` | **0** | **NO** |

`Español.pdf` tiene **39 páginas** (`Output written on Español.pdf (39 pages).`) y se
generó a partir de **2 fragmentos que hoy están comentados**. **El PDF comprometido es más
nuevo o más viejo que su fuente, pero no es su producto.**

## B.8 Cuántos quizzes hay — con la definición de «uno» declarada

El repo admite **tres unidades de cuenta legítimas** y dan tres números muy distintos. Se
dan las tres porque elegir una es decidir, y este ticket no decide.

### Definición 1 — «uno» = un documento compilable → **4**

Los 4 `.tex` con `\documentclass` (B.7.1). Es la unidad que un comando de compilación ve.

### Definición 2 — «uno» = un fichero-fragmento = un entorno `quiz` → **276**

Medido, y es una correspondencia **exacta**:

```
ficheros .tex sin \documentclass, sin checkpoints  = 276
\begin{quiz} en esos ficheros                      = 276
ficheros con un número de \begin{quiz} distinto de 1 = 0  (los únicos con 0 son los 4 maestros)
\section{ en todo el repo                          = 277  (276 + la copia en checkpoints)
```

**Cada fragmento contiene exactamente un `\begin{quiz}` y un `\section{`.** La
correspondencia fichero ↔ quiz es 1:1 sin excepción. Es la unidad más defendible.

### Definición 3 — «uno» = una pregunta de opción múltiple → **5 727**

`\begin{multi}` en los 276 fragmentos (sin checkpoints):

| Unidad | Fragmentos | Entornos `quiz` | Entornos `multi` |
|---|---|---|---|
| `Banco de Preguntas/Español` | 52 | 52 | **857** |
| `Banco de Preguntas/Matematicas` | 124 | 124 | **3 005** |
| `Examen Diagnostico` | 58 | 58 | **1 020** |
| `Examen Simulador` | 42 | 42 | **845** |
| **TOTAL** | **276** | **276** | **5 727** |

Distribución de preguntas por fragmento (n = 276): **mínimo 5, mediana 20, máximo 60**.

### Aviso sobre el `.tex` de `.ipynb_checkpoints`

`PAA/Examen Diagnostico/Secciones/3. Matemáticas/.ipynb_checkpoints/` contiene **1 `.tex`**
con **1 `\begin{quiz}` y 0 `\begin{multi}`**. Está **rastreado por git**. Cualquier
recuento que no excluya `.ipynb_checkpoints` dará **277** en vez de 276. Las cifras de
arriba lo excluyen.

### Nota sobre los XML de Moodle: **85 preguntas exportadas, contra 5 727 en fuente**

Los 4 `*-moodle.xml` comprometidos (875 KiB en total) contienen:

| Fichero | bytes | `<question type=` |
|---|---|---|
| `Examen Diagnostico/Examen_Diagnostico-moodle.xml` | 604 308 | 11 |
| `Banco de Preguntas/Español/Español-moodle.xml` | 127 623 | 22 |
| `Examen Simulador/Examen_Simulador-moodle.xml` | 100 619 | 21 |
| `Banco de Preguntas/Matematicas/Matematicas-moodle.xml` | 63 488 | 31 |
| **TOTAL** | **896 038** | **85** |

**85 de 5 727 (1,5 %).** Coherente con B.7.2: los XML son producto de las mismas
compilaciones parciales que los PDF. **No son un export del banco completo.**

---

# BLOQUE C — Cómo se verificaría

## C.9 ¿Existe hoy un comando que compile? — **NO. Ninguno**

Barrido completo, con las tres superficies donde podría estar:

| Dónde se buscó | Resultado |
|---|---|
| `package.json` (scripts npm) | **no existe el fichero** (A.3) |
| `Makefile` / `makefile` / `GNUmakefile` | **no existe** |
| `latexmkrc` / `.latexmkrc` | **no existe** |
| `justfile` / `Taskfile.yml` | **no existe** |
| `.github/` (CI) | **no existe** |
| `README` de cualquier forma | **no existe** — no hay documentación de ningún tipo |
| Cualquier `.sh`, `.cmd`, `.ps1`, `.bat` | **0 ficheros** en el árbol (A.1.3: ninguna de esas extensiones aparece) |

**No hay comando, no hay script, no hay documentación que explique cómo compilar.** El
único conocimiento de compilación que el repo transporta está en **comentarios dentro del
maestro** — `Examen_Diagnostico.tex:2-3`:

```latex
% Para obtener solo el pdf, compilar con pdfLaTeX.
% Para obtener el xml compilar con XeLaTeX.
```

Esas 2 líneas de comentario son, hoy, la totalidad de la documentación de build del repo.
Y están **replicadas en los 4 maestros**, no en un sitio común.

## C.10 Qué haría falta para un comando único verde/rojo — medido, NO construido

### C.10.1 Las herramientas **NO están instaladas en esta máquina**. Medido dos veces

Sondeo en Bash (`command -v`) y en PowerShell (`Get-Command`), **8 binarios**:

| Binario | Bash `command -v` | PowerShell `Get-Command` |
|---|---|---|
| `pdflatex` | NO ENCONTRADO | NO EN PATH |
| `xelatex` | NO ENCONTRADO | NO EN PATH |
| `lualatex` | NO ENCONTRADO | NO EN PATH |
| `latexmk` | NO ENCONTRADO | NO EN PATH |
| `tectonic` | NO ENCONTRADO | NO EN PATH |
| `tex` | NO ENCONTRADO | — |
| `kpsewhich` | NO ENCONTRADO | NO EN PATH |
| `miktex` / `miktex-console` | NO ENCONTRADO | NO EN PATH |

Y las **5 rutas de instalación típicas en Windows** (`Test-Path`), por si estuviera
instalado fuera del PATH:

```
C:\texlive                                  → no existe
C:\Program Files\MiKTeX                     → no existe
C:\Program Files (x86)\MiKTeX               → no existe
C:\Users\chris\AppData\Local\Programs\MiKTeX→ no existe
C:\Program Files\MiKTeX 2.9                 → no existe
```

**Veredicto: 0 de 8 binarios y 0 de 5 rutas. No hay ninguna distribución TeX en esta
máquina.** No es una suposición: son 13 comprobaciones.

Lo que **sí** está (mismo método):

| Binario | Ruta |
|---|---|
| `node` | `/c/Program Files/nodejs/node` |
| `npm` | `/c/Program Files/nodejs/npm` |
| `python` | `/c/Users/chris/AppData/Local/Microsoft/WindowsApps/python` |
| `make` | **NO ENCONTRADO** |

**Consecuencia inmediata: un comando de verificación que compile LaTeX no puede dar verde
hoy en esta máquina, y tampoco rojo — daría «binario no encontrado», que es una tercera
cosa.**

### C.10.2 Qué distribución exigiría el contenido, según lo que el preámbulo pide

De B.6.5, y contrastado con los `.log` comprometidos: los 4 documentos se compilaron con
**TeX Live 2025**. Los paquetes cargados incluyen `tabularray`, `fontawesome`,
`montserrat`, `moodle`, `fontspec`, `tcolorbox`, `eulervm`. **No es una instalación
mínima**: `moodle` y `tabularray` no vienen en `texlive-basic` ni en el `scheme-minimal`.
Orden de magnitud de una instalación que los cubra: **varios GiB**. **[NO MEDIDO]** la
cifra exacta — exigiría instalar, y este ticket no lo autoriza.

### C.10.3 Los dos motores no son intercambiables. Medido en los logs

Primera línea de cada `.log` comprometido:

| Unidad | Motor | Versión | Fecha de la compilación |
|---|---|---|---|
| `Español` | **XeTeX** | TeX Live 2025, format `xelatex 2025.8.6` | 12 NOV 2025 |
| `Examen Diagnostico` | **XeTeX** | TeX Live 2025, format `xelatex 2025.8.6` | 5 NOV 2025 |
| `Examen Simulador` | **XeTeX** | TeX Live 2025, format `xelatex 2025.8.6` | 4 NOV 2025 |
| `Matematicas` | **pdfTeX** | TeX Live 2025, format `pdflatex 2026.2.27` | 16 MAR 2026 |

**Las cuatro compilaciones son anteriores a la creación del repo (2026-08-04).** Llegaron
con el contenido. Y **no usan el mismo motor**: coherente con el comentario del maestro
(«pdf → pdfLaTeX; xml → XeLaTeX», C.9), lo que significa que **producir las dos salidas de
una unidad son dos pasadas con dos motores distintos**.

### C.10.4 ⚠ La compilación de `Matematicas` terminó con **46 errores** y aun así emitió PDF

`grep -c '^!'` sobre cada log:

| Log | Líneas de error (`^!`) | Páginas emitidas |
|---|---|---|
| `Español.log` | **0** | 39 |
| `Examen_Diagnostico.log` | **0** | 10 |
| `Examen_Simulador.log` | **0** | 31 |
| `Matematicas.log` | **46** | 27 (552 025 bytes) |

Los 46, agrupados (`grep '^!' … | sort | uniq -c | sort -rn`):

```
23  ! Package moodle Error: Base64 conversion failed.
23  ! Package moodle Error: reading 'img/5. Geometria/GEO-GP-Angulos-Medio-0NN.enc'
```

**Diagnóstico medido, no supuesto.** `Matematicas.log:3` dice **`restricted \write18
enabled`**; `Examen_Diagnostico.log:3` dice **`\write18 enabled`** (sin restringir). El
paquete `moodle` incrusta las imágenes en el XML convirtiéndolas a Base64 mediante una
llamada externa; en modo **restringido** esa llamada no se permite, la conversión falla, y
el `.enc` que debería haber producido no existe cuando intenta leerlo. **De ahí que
`Matematicas-moodle.xml` sea el más pequeño de los cuatro (63 488 bytes) pese a ser la
unidad más grande del repo** (B.5.5).

**Esto es información de diseño para el comando, no un defecto que este ticket arregle:**
cualquier comando que produzca el XML necesitará **shell-escape sin restringir**
(`-shell-escape`), con lo que eso implica de confianza en el árbol.

### C.10.5 Qué haría falta, enumerado como requisitos — **NO se construye**

Con lo medido en C.9 y C.10.1–4, un comando único verde/rojo sobre todo el repo necesita
resolver **seis** cosas, y **cinco de ellas son decisiones, no código**:

| # | Qué hace falta | Estado hoy | ¿Es decisión? |
|---|---|---|---|
| 1 | Una distribución TeX con los paquetes de B.6.5 | **ausente** (0 de 8 binarios, C.10.1) | Sí — cuál y quién la instala |
| 2 | Decidir **qué se compila**: ¿los 4 maestros tal como están (3 fragmentos en total), o los 276 fragmentos? | Sin decidir. Hoy los maestros están comentados (B.7.2) | **Sí — es la decisión central** |
| 3 | Un envoltorio por fragmento, **si** se elige compilarlos sueltos | No existe. Los fragmentos no tienen preámbulo ni base de rutas (B.6.4) | Consecuencia de #2 |
| 4 | Fijar el `cwd` en la raíz de cada unidad | Obligatorio: las rutas de imagen son relativas a la unidad (B.6.4) | No — es un hecho medido |
| 5 | Decidir si el verde exige también el XML | Si sí: `-shell-escape` sin restringir (C.10.4) | Sí |
| 6 | Un criterio de verde/rojo: ¿código de salida?, ¿`^!` = 0?, ¿PDF emitido? | Sin definir. `Matematicas` demuestra que **PDF emitido ≠ sin errores** (C.10.4) | **Sí** |

**Sobre el encaje con la forma del kernel:** `MEDICION-ALTA-DE-PROYECTO-NUEVO.md:600-641`
(§D.2) ya midió que `aiw/config.json` espera `verification` como **una sola cadena de
shell**, ejecutable desde `path` sin cwd propio, que señala por código de salida y termina
en 600 000 ms. **No se repite aquí.** Lo que este record añade es que el requisito 4 —cwd
por unidad— **choca** con «sin cwd propio»: la cadena tendrá que llevar el cambio de
directorio dentro, cuatro veces. Se anota como restricción medida, no como diseño.

**NO se construye el comando.** Es trabajo de otro run, y el requisito #2 es adjudicación
(ver PARADA, bloque F).

## C.11 Ficheros intermedios y cobertura del `.gitignore`

### C.11.1 Compilar ensucia el árbol. Ya está sucio, y está comprometido

Compilar un solo documento produce, según lo que hay en disco tras las compilaciones de
C.10.3, **6 artefactos por unidad**: `.aux`, `.auxlock`, `.log`, `.out`, `.pdf`,
`.synctex.gz`. Más `.synctex(busy).gz` cuando la compilación se interrumpe.

**Todos están rastreados por git.** `git -c core.quotepath=false ls-files` filtrado por
esas extensiones → **26 ficheros**:

| Extensión | Ficheros rastreados |
|---|---|
| `.aux` | 4 |
| `.auxlock` | 4 |
| `.log` | 4 |
| `.out` | 4 |
| `.pdf` | 4 |
| `.synctex.gz` | 4 |
| `.synctex(busy).gz` | **2** |
| **TOTAL** | **26** |

Peso: **2 330 KiB (2,28 MiB)** los 24 primeros (`du -ck`), más **129 953 bytes (127 KiB)**
los dos `synctex(busy)` → **≈ 2 457 KiB (2,4 MiB)**.

Los dos `(busy)` son los restos de una compilación interrumpida:

```
PAA/Examen Diagnostico/Examen_Diagnostico.synctex(busy).gz   83 560 bytes
PAA/Examen Simulador/Examen_Simulador.synctex(busy).gz       46 393 bytes
```

**Están comprometidos en `main`.** Un fichero `(busy)` es basura por definición: nunca
tuvo razón de existir más allá de la compilación que lo dejó a medias.

### C.11.2 El `.gitignore` no los cubre porque **no hay `.gitignore`**

`find . -name '.gitignore'` → **0 resultados** (A.3). No hay nada que cubrir ni cubrirlos.

**Efecto compuesto y medido:** el árbol está limpio (`git status` → 0 entradas, A.2)
**precisamente porque todo está rastreado**, incluidos los 26 artefactos y los 120 ficheros
de `.ipynb_checkpoints`. **La primera compilación que alguien haga volverá `git status`
ruidoso de inmediato**, y sin `.gitignore` no habrá forma de distinguir «cambié un quiz»
de «recompilé».

**No se escribe el `.gitignore`.** Está explícitamente fuera de alcance.

---

# BLOQUE D — Qué costaría incorporarlo

## D.12 Qué falta para registrarlo y emitir un `.project/` conforme

**Este apartado se apoya en `MEDICION-ALTA-DE-PROYECTO-NUEVO.md` y NO la repite.** Aquella
midió el contrato, el registro y los layouts; aquí solo se cruza aquel resultado con lo
medido en A–C.

### D.12.1 Lo exigido, según la medición previa

`MEDICION-ALTA-DE-PROYECTO-NUEVO.md:138-142` (§A.2) fijó el resultado en una frase: **lo
único verdaderamente exigido es un archivo en `roadmap/roadmap.json` (o
`.aiw/roadmap/roadmap.json`) que pase `hasRoadmapTreeShape`.** Todo lo demás —
`governance/`, `docs/docs_index.json`, `package.json`, `.aiw/`, `context/<proyecto>/`,
handoff, carriles, `care_budget` — es herencia, no requisito (§A.2, tabla de `:121-136`).

### D.12.2 Cruce contra lo que este repo tiene hoy

| Lo exigido / opcional | ¿Lo tiene `cantu-quizzes-latex`? | Medido en |
|---|---|---|
| **`roadmap/roadmap.json`** (**lo único exigido**) | **NO.** `roadmap/` no existe | A.3 |
| Entrada en `project-console/projects.json` | **NO.** El registro tiene 3 entradas (`aiw-console`, `cantu-studio`, `aiw`) y ninguna es esta | `cat project-console/projects.json` |
| `governance/*` (opcional) | NO | A.3 |
| `docs/docs_index.json` (opcional, curado) | NO | A.3 |
| `package.json` (opcional) | NO → `project_id` caería a `basename(root)` = `cantu-quizzes-latex` | A.3 + §D.3.2 previa |
| Repositorio git propio (opcional) | **SÍ**, con remoto y árbol limpio | A.2 |
| `.project/` | NO (aún no se ha emitido nada) | A.3 |

### D.12.3 Lo que falta, contado

**Falta exactamente UNA cosa en el repo y UNA en la consola:**

1. **En `cantu-quizzes-latex`:** el fichero `roadmap/roadmap.json`. **1 fichero, 1
   directorio nuevo.**
2. **En `aiw-console`:** **+1 entrada de 2 claves** en `project-console/projects.json`.
   Con `root` resuelto relativo a `project-console/` (§B.1 previa), el valor sería
   `"../../cantu-quizzes-latex"`, por analogía exacta con la entrada de `cantu-studio`
   que ya está ahí. La clave `cantu-quizzes-latex` **casa** el patrón exigido
   (§B.1 previa).

**Coste de código: 0 sitios. Coste de test: 0 sitios.** Ambos ya medidos y verificados por
barrido en §B.2 previa; no se re-verifican aquí.

### D.12.4 Lo que este repo aporta de nuevo respecto de aquella medición

Tres hechos que aquella no pudo medir porque el repo no existía:

- **Emitiría 6 artefactos, no 5.** §D.3.4 previa fijó que `git_history` exige repositorio
  propio; este repo lo tiene (A.2). **Con 2 commits, el historial emitido será mínimo pero
  no nulo.**
- **`project_id` será `cantu-quizzes-latex`.** Sin `package.json` (A.3), el emisor cae a
  `basename(root)` (§D.3.2 previa). El nombre del directorio ya está en la forma correcta:
  no hace falta `package.json`.
- **El layout que le corresponde es `repo_root`** (§B.1 previa) **en cuanto exista
  `roadmap/roadmap.json`.** Hoy no existe, así que `detectRootLayout` devolvería `null` y
  el proyecto, si se registrara ahora, aparecería en el menú marcado **`no snapshot`** y
  **no editable** (§B.3 y §B.4 previas). Registrar sin canónico es posible y no rompe
  nada; simplemente no sirve de nada todavía.

### D.12.5 La discrepancia §12.b/§13 sigue sin adjudicar, y ahora tiene destinatario

`MEDICION-ALTA-DE-PROYECTO-NUEVO.md:225-267` (§A.4) paró y reportó que el CONTRATO declara
malformada una fase con 0 runs mientras que `checkInvariants` la acepta con 0 errores, y
que la adjudicación es de cabina. Aquella medición razonó que el proyecto nuevo heredaría
una de las dos lecturas.

**Ese proyecto nuevo ya existe.** La adjudicación sigue pendiente y ahora tiene un
destinatario concreto: el primer `roadmap/roadmap.json` de este repo. **No se re-mide ni se
re-argumenta aquí**; se anota que la condición que aquella medición anticipó se ha
materializado.

## D.13 El escáner de docs solo recoge `.md`: efecto concreto

### D.13.1 La cifra

```
find . -iname '*.md' -not -path './.git/*' | wc -l   →   0
```

**Hay CERO ficheros `.md` en `cantu-quizzes-latex`.** No 3, no 1: **0**. Tampoco hay
`README` sin extensión (A.3).

### D.13.2 El efecto, con la línea del código

El filtro está en `tools/projector/project.mjs:1285`:

```js
} else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
```

(el mismo filtro aparece además en `:198` y `:288`).

`MEDICION-ALTA-DE-PROYECTO-NUEVO.md:669-695` (§D.3.3) ya midió la consecuencia sobre un
root sin `.md`: `scanDocsIndex` **devuelve un objeto igualmente**, así que
`.project/docs_index.json` **se emite con `docs: []`**, y la pestaña Docs sale **VACÍA, no
ausente** — la distinción que §19 del contrato exige mantener.

### D.13.3 Respuesta directa a la pregunta del criterio

**Sí: su índice de documentos saldría literalmente vacío.** `docs: []`, 0 entradas, sobre
un repo de **281 ficheros `.tex` y 1 393 ficheros en total**. La consola mostraría un
proyecto de 275,4 MiB de contenido con **cero documentos**.

Y no es un caso extremo del escáner: es lo que el escáner hace bien. El repo simplemente no
tiene ni un solo documento de la clase que el escáner reconoce.

**La salida ya está declarada y no cuesta una línea de código** (§D.3.3 previa): si el repo
cura su propio `docs/docs_index.json`, el emisor lo **transporta** en vez de escanear, y
**no filtra por extensión al transportar** — un índice curado puede listar `.tex`. La
decisión se toma por presencia del fichero, nunca por nombre de proyecto.

**[NO MEDIDO]**, y lo hereda de §F.4 previa: si el visor de la consola renderiza
legiblemente un cuerpo `.tex`. Aquella medición no pudo comprobarlo porque el repo no
existía; **ahora el repo existe, pero comprobarlo exigiría levantar la consola contra él y
emitirle un `.project/`, ambas cosas fuera del alcance de este ticket.** Queda como la
pregunta abierta más barata de contestar del expediente.

## D.14 Propuesta de objetivos y fases para su roadmap inicial — **no decide**

**Esto es una PROPUESTA. No decide nada, no escribe nada, y no lleva runs.** La cabina ha
adjudicado que un roadmap sin runs es válido, así que una salida de solo objetivos y fases
es legítima; se entrega en esa forma deliberadamente, porque **escribir runs exigiría
antes la adjudicación de C.10.5#2 y la de §A.4 previa**, y ninguna de las dos está tomada.

La propuesta se deriva **solo de la estructura medida en A–C**. Cada fase lleva la medida
que la motiva.

### Objetivo O1 — Que el repo se sostenga solo

*Motivo medido: 1 fichero de configuración en total (A.3), 0 documentación (C.9), 26
artefactos de compilación comprometidos (C.11.1) y 120 ficheros de `.ipynb_checkpoints`
rastreados (A.1.3).*

| Fase | Qué encierra | Medida que la motiva |
|---|---|---|
| **O1.P1 — Higiene del árbol** | Frontera entre fuente y producto: qué se rastrea y qué no | 26 artefactos + 120 checkpoints rastreados; 0 `.gitignore` (C.11) |
| **O1.P2 — Documentar cómo se compila** | Que el conocimiento de build salga de los comentarios del maestro | Las 2 líneas de `Examen_Diagnostico.tex:2-3` son hoy toda la doc (C.9) |
| **O1.P3 — Una sola copia de las piezas compartidas** | Decidir si las 4 copias idénticas siguen siendo 4 | 12 ficheros, 3 hashes, 999 líneas únicas de 3 996 (B.6.1–2) |

### Objetivo O2 — Que exista un verde/rojo

*Motivo medido: no hay comando (C.9) y no hay toolchain en la máquina (C.10.1).*

| Fase | Qué encierra | Medida que la motiva |
|---|---|---|
| **O2.P1 — Fijar qué significa «compila»** | La adjudicación de C.10.5#2 y #6 | Los maestros tienen 3 `\input` activos de 275 (B.7.2); `Matematicas` emitió PDF con 46 errores (C.10.4) |
| **O2.P2 — Toolchain reproducible** | Qué distribución, qué paquetes, dónde vive | 0 de 8 binarios, 0 de 5 rutas (C.10.1); `moodle`+`tabularray`+`montserrat` requeridos (B.6.5) |
| **O2.P3 — El comando** | Una cadena que devuelva verde o rojo sobre las 4 unidades | Restricción de cwd por unidad (B.6.4) contra «sin cwd» del kernel (§D.2 previa) |
| **O2.P4 — La rama XML** | Si el verde incluye el export Moodle | `-shell-escape` sin restringir (C.10.4); 85 preguntas exportadas de 5 727 (B.8) |

### Objetivo O3 — Que el contenido sea legible desde fuera

*Motivo medido: el repo emitiría `docs: []` (D.13) y sus PDF no corresponden a sus fuentes
(B.7.3).*

| Fase | Qué encierra | Medida que la motiva |
|---|---|---|
| **O3.P1 — Índice de documentos** | Curar `docs/docs_index.json` o aceptar la pestaña vacía | 0 `.md` sobre 1 393 ficheros (D.13.1) |
| **O3.P2 — Reconciliar producto y fuente** | Que un PDF comprometido sea el producto de su fuente | `Español.pdf` (39 págs.) salió de 2 fragmentos hoy comentados (B.7.3) |
| **O3.P3 — Inventario del banco** | Que el recuento de quizzes sea consultable, no calculado a mano | 3 definiciones legítimas de «un quiz» dan 4 / 276 / 5 727 (B.8) |

### Objetivo O4 — Alta en la consola

*Motivo medido: falta 1 fichero en el repo y 1 entrada en el registro (D.12.3).*

| Fase | Qué encierra | Medida que la motiva |
|---|---|---|
| **O4.P1 — Canónico mínimo** | El `roadmap/roadmap.json` que reclama el layout `repo_root` | Lo único exigido (§A.2 previa); hoy `roadmap/` no existe (A.3) |
| **O4.P2 — Registro y primera emisión** | +1 entrada de 2 claves; verificar los 6 artefactos | Emitirá 6, no 5, por tener git propio (D.12.4) |
| **O4.P3 — Hilo propio** | `context/cantu-quizzes-latex/` y su handoff inaugural | Enteramente convención (§C.3 previa); ningún validador lo exige |

**Sobre el orden:** O1.P1 y O4.P1 son independientes entre sí y de todo lo demás. **O2.P1
gobierna O2.P3 y O2.P4**, y **O2.P3 es prerrequisito del campo `verification` del kernel**
(§D.2 previa, Run 4). O3.P2 depende de O2.P1, porque «reconciliar producto y fuente» no
significa nada hasta que esté dicho qué es un producto válido.

**No se propone ningún run, ningún `run_id`, ningún `queue_order` y ningún
`depends_on`.** Escribirlos es la salida de otro encargo, y dos de sus insumos están
pendientes de adjudicación.

---

# BLOQUE E — Lo que NO se pudo medir, y por qué

1. **Si el repo compila hoy.** No hay toolchain en la máquina (C.10.1) y **compilar está
   fuera de alcance** por dejar ficheros. Todo lo que este record dice sobre compilación
   sale de los `.log` comprometidos, que son **evidencia de compilaciones ajenas, fechadas
   entre el 4 NOV 2025 y el 16 MAR 2026** — anteriores a la existencia del repo (A.2).
2. **Si los 276 fragmentos son individualmente compilables con un envoltorio.** Se midió
   que **no lo son tal cual** (0 `\documentclass`, 0 `\usepackage`, rutas relativas a la
   unidad — B.6.3–4). Comprobar que **con** envoltorio compilan exigiría escribir el
   envoltorio y compilar: las dos cosas están fuera de alcance.
3. **El tamaño exacto de la instalación TeX necesaria** (C.10.2). Exigiría instalarla.
4. **Si la consola renderiza legiblemente un cuerpo `.tex`** (D.13.3). Exigiría levantar la
   consola y emitir un `.project/`. Hereda el `[NO MEDIDO]` de §F.4 previa, ahora por otra
   razón: antes faltaba el repo, ahora sobra el alcance.
5. **Si los 46 errores de `Matematicas.log` desaparecen con `-shell-escape` sin
   restringir.** El diagnóstico de C.10.4 se apoya en la diferencia medida entre
   `restricted \write18 enabled` y `\write18 enabled` en las cabeceras de los dos logs;
   **confirmarlo exigiría recompilar**.
6. **El contenido pedagógico.** Este record mide forma, no calidad: no se juzgó ni un solo
   quiz.
7. **`cantu-studio` y `cantu-lessons`.** Fuera del alcance por diseño del encargo. **No se
   buscó relación alguna y no se afirma ninguna**; lo único que se midió es que **0
   ficheros de este repo referencian fuera de su propia unidad** (B.6.4), lo que es
   consistente con la ausencia de relación que el encargo declara, sin probarla desde el
   otro lado.
8. **La suite de `aiw-console` no se corrió.** Fuera de alcance.

---

# BLOQUE F — ⛔ PARADA Y REPORTE

El criterio 17 obliga a parar ante cualquier condición que fuerce una decisión que este
ticket no autoriza. **Hay una, y es la que gobierna todo el bloque C.**

## F.1 La condición: no está dicho qué significa «compila» en este repo

**No es una laguna de la medición: es una propiedad del repo.** Los 4 maestros tienen
**3 `\input` activos de 275** (B.7.2). El estado comprometido en `main` no es un documento
completo sino una sesión de edición congelada. **Por tanto, «compilar el repo» admite al
menos tres lecturas incompatibles, y ninguna es obviamente la correcta.**

Todo lo que el criterio 10 pide construir —y que este ticket correctamente prohíbe
construir— **depende de cuál se elija**. Se reportan las tres con su coste medido.

| Opción | Qué verificaría | Cobertura medida | Coste medido | Lo que deja fuera |
|---|---|---|---|---|
| **A — Compilar los 4 maestros tal como están** | Que el árbol comprometido produce sus 4 PDF | **3 fragmentos de 276** (1,1 %). `Español` compilaría **0** | El más barato: 4 invocaciones, 1 por unidad, cwd en la unidad. Sin ficheros nuevos en el repo | El 98,9 % del contenido. Un verde aquí **no dice nada** sobre los 273 fragmentos restantes |
| **B — Descomentar los 275 `\input` y compilar los 4 maestros** | Que cada unidad compila entera | **276 de 276** (100 %) | 4 invocaciones, pero **exige editar los 4 maestros** — y eso destruye la consola de trabajo del autor (B.7.2), que es una forma de trabajo deliberada | La granularidad: un fallo en 1 fragmento pone roja la unidad entera (hasta 124 fragmentos) sin decir cuál |
| **C — Envolver y compilar cada fragmento por separado** | Que cada quiz compila solo | **276 de 276** (100 %), con culpable identificado | **276 invocaciones** + un envoltorio que aporte preámbulo y fije el cwd en la unidad (B.6.4). Sin toolchain no hay cifra de duración; contra el techo de **600 000 ms** del kernel (§D.2 previa) es el riesgo real | La composición: no verifica que la unidad completa compile (choques de etiquetas, contadores) |

**Y una decisión anidada, independiente de las tres:** si el verde exige también el XML de
Moodle. Si sí, hace falta `-shell-escape` **sin restringir** (C.10.4) sobre un árbol de
1 393 ficheros. Si no, `Matematicas` habría dado **verde** en su última compilación real
pese a sus 46 errores (C.10.4) — porque emitió su PDF de 27 páginas igualmente.

## F.2 Recomendación explícita

**Recomiendo la opción C, con la A como escalón previo.**

Razones, todas apoyadas en medida de este record:

1. **C es la única que da un rojo accionable.** Con 276 fragmentos y una mediana de 20
   preguntas cada uno (B.8), un rojo de la opción B diría «Matemáticas está rota» sobre una
   unidad de 124 fragmentos. Eso no es un verde/rojo útil, es una alarma.
2. **C es la única que no toca el contenido.** B exige editar los 4 maestros y con ello
   destruir la consola de trabajo que el autor mantiene deliberadamente (B.7.2). C añade
   un envoltorio **fuera** de los maestros y los deja intactos.
3. **A es un buen escalón, no un destino.** Es lo único que se puede montar sin decidir
   nada más, y verifica que el preámbulo compartido carga y que las rutas de la unidad
   resuelven — que es exactamente lo que más se rompe. Pero su cobertura es **1,1 %**, y
   eso hay que decirlo cada vez que dé verde.
4. **Sobre el XML: recomiendo dejarlo fuera del verde inicial.** Exige `-shell-escape` sin
   restringir, y la única compilación real que lo intentó falló 46 veces (C.10.4). Meterlo
   en el primer comando es acoplar el verde del repo a un problema que aún no está
   diagnosticado del todo (E.5).

**Y una advertencia de secuencia, medida:** las tres opciones son **inejecutables hoy en
esta máquina**. 0 de 8 binarios TeX, 0 de 5 rutas de instalación (C.10.1). **La decisión de
F.1 puede tomarse ya; el comando no puede escribirse ni probarse hasta que O2.P2 exista.**

## F.3 Segunda parada, menor: 26 artefactos y 120 checkpoints comprometidos

**No bloquea nada** y por eso no se abre informe de opciones — pero obliga a una decisión
que este ticket tampoco autoriza (escribir en el repo está fuera de alcance).

Medido: **26 artefactos de compilación** (≈ 2,4 MiB) y **120 ficheros de
`.ipynb_checkpoints`** (8,6 % del recuento) están **rastreados en `main`**, entre ellos
**2 `.synctex(busy).gz`** que son restos de una compilación interrumpida (C.11.1). No hay
`.gitignore` (C.11.2).

**Consecuencia inmediata y medida:** el árbol está limpio hoy (`git status` → 0 entradas)
**solo porque todo está rastreado**. La primera compilación que alguien haga —incluida la
primera prueba de cualquiera de las tres opciones de F.1— **ensuciará `git status` de
inmediato** y mezclará «cambié un quiz» con «recompilé».

**Recomendación:** resolverlo **antes** de la primera compilación, no después. Es la fase
O1.P1 de la propuesta (D.14), y es la única de las trece que no depende de ninguna
adjudicación pendiente.

---

## Nota de método

No se escribió un solo byte en `projects/cantu-quizzes-latex`. No se compiló nada. No se
creó `.project/`, `.gitignore`, `roadmap/` ni script alguno. No se registró el proyecto:
`project-console/projects.json` se leyó y no se tocó. No se escribió roadmap, handoff ni
entrada de decisiones. Git se ejecutó **solo** en las formas que leen (`rev-parse`,
`remote -v`, `log`, `status`, `branch`, `ls-files`), en el repo medido y en ninguno más. No
se levantó la consola ni se corrió la suite. El único fichero escrito por esta medición es
este record.
