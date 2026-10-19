# Encuadre de la PARADA DE ANÁLISIS del `#68` — 2026-10-19

Run: `#68` `RUN-CONSOLE-CLASSIFICATION-CLASS-RELATION-CONTRACT-001` «Work class and run relation
enter the classification — the contract». Abierto `active` en `98adafb` **sin ticket**: su
`full_description` ordena medir el terreno y traer el encuadre al operador antes de escribirlo.

Medido por la cabina el 2026-10-19 entre las 17:25 y las 17:40 CST. **Es lectura de la cabina
sobre lo medido, no decisión.** Las decisiones las toma el operador; quedan al final como preguntas.

## 1. Lo que YA existe en el dato

| pieza | dónde | qué expresa | ¿se usa? |
|---|---|---|---|
| `depends_on` | todo run | el run 2 necesita al run 1 | sí, en los cinco proyectos |
| `lanes` + `lane` | D-051 (2026-07-27) | carriles para trabajar **en paralelo** lo que no depende; vocabulario declarado por proyecto; sin `lane` cae en el carril por defecto | `cantu-studio` (12 runs) y `aiw` (6 runs), los dos con carriles **DEVELOPMENT** y **DOCUMENTATION** |
| `barrier` | D-051 | punto de sincronía: retiene el arranque de lo que viene detrás | `aiw` (2), `cantu-quizzes-latex` (1) |
| `batches` + `batch` | D-030 (2026-07-20) y `#48` | runs que van a la **misma rama** y se aprueban o rechazan juntos; la rama vive en el lote | **ningún proyecto** |
| `correctness_model` | CLASIFICACIÓN §1 | cómo se decide que está bien (`SPECIFIED` · `JUDGED_ACCEPTS` · `JUDGED_DEFINES`) | sí |
| `work_type` | CLASIFICACIÓN §1 | qué tan **profundo** es el cambio (`COSMETIC` · `FUNCTIONAL` · `FOUNDATIONAL`) — no qué clase | sí |

Conteo de runs por canónico a las 17:30: `aiw-console` 78 · `cantu-studio` 276 ·
`cantu-quizzes-latex` 100 · `aiw` 46 · `cantu-lessons` 30. `cantu-lessons` no tiene ni un run
clasificado.

## 2. Lo que eso significa para el `#68`

**La premisa del run es MEDIO FALSA, y se dice igual de fuerte que si fuera entera.** El texto pide
«dos ejes nuevos». Medido:

- **La CLASE de trabajo SÍ falta.** No hay campo que diga funcionalidad / documentación /
  investigación / diseño / contenido. `work_type` mide profundidad, y por eso en CQL 56 de 100 runs
  de contenido salieron `FUNCTIONAL`.
  - **Matiz medido:** `cantu-studio` y `aiw` ya usan los CARRILES como clase de facto
    (DEVELOPMENT / DOCUMENTATION). Es una clase de dos valores metida en un mecanismo de paralelismo.
- **La RELACIÓN entre runs ya está casi entera en el dato:**
  - **cadena** → `depends_on`, existe;
  - **misma superficie, en serie** → mismo carril. D-051 creó los carriles para separar lo que va
    en paralelo; lo que comparte carril es, por construcción, lo que NO va en paralelo. Lo que no
    está escrito es la regla explícita: **dos runs del mismo carril no corren a la vez**;
  - **independiente, en paralelo** → carriles distintos, o sin aristas;
  - y **el lote** (`batch`, D-030) ya es la «rama compartida» que AIW necesita para encadenar
    trabajo (`#28` de `aiw`), aunque nadie lo use.

**Es el patrón de «capacidad en el motor, cerrada en el uso»:** el motor ya sabe expresar la
relación; lo que falta es escribir qué significa y usarlo.

## 3. Dos choques con la doctrina vigente

1. **CLASIFICACIÓN §4 dice que la delegabilidad se declara POR PROYECTO, no run por run.** El
   operador dijo el 2026-10-04 que un proyecto tiene **fases** donde AIW ayuda muchísimo y otras
   donde no (D-074). Eso es delegabilidad por clase y momento, dentro del proyecto. §4 se
   autodescribe como «la decisión de mayor alcance de todo el sistema»: tocarla pide palabra
   explícita.
2. **CLASIFICACIÓN §7, «runs mixtos», es un hueco declarado.** Un run que mezcla clases (código y su
   documentación, por ejemplo) necesita una regla para elegir su clase, y hoy no la hay.

## 4. Las decisiones que el operador tiene que tomar

Ver la conversación del 2026-10-19 para el texto con ejemplos. En corto:

- **A. La clase:** ¿campo nuevo, con vocabulario cerrado de cinco valores? Recomendación: sí.
- **B. La relación:** ¿campo nuevo, o escribir que se deriva de `depends_on` y carriles, más la regla
  «mismo carril = no a la vez»? Recomendación: derivarla, sin campo nuevo.
- **C. Los runs mixtos:** ¿qué clase lleva un run que mezcla? Recomendación: la que decide cómo se
  revisa.
- **D. La delegabilidad:** ¿sigue siendo sólo por proyecto, o el proyecto abre la puerta y dentro
  la clase decide? Recomendación: lo segundo.

Si el operador aprueba B, el `#68` queda con su identidad intacta —la relación sigue entrando en la
clasificación, como regla escrita— y el texto del run se enmienda para decirlo.
