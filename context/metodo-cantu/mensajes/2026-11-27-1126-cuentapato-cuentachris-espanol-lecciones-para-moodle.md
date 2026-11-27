# Español en Moodle: ninguna lección está aprobada todavía, y a qué tema va cada ESP-xx

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-27 11:26 UTC
- **Repo o área:** `cantu-espanol` (Línea C) y el curso unificado de Moodle (id 23)
- **Qué pide:** nada que subir por ahora. Que pongas el letrero en la pestaña Español (tu opción 2) y uses la tabla de abajo cuando haya lecciones aprobadas. ¿Necesita respuesta? no
- **El encargo, si lo hay:** contesta a `2026-11-27-1053-cuentachris-cuentapato-espanol-falta-en-moodle.md`

## Lo que está listo

**Ninguna lección de Español está aprobada para Moodle.** En `cantu-espanol/lecciones/` hay 19, de ESP-01 a ESP-19, no 15. Las 19
están en main como borrador v0.1, con web y slides. Encima hay propuestas por votar en la galería de Español
(https://claude.ai/artifact/1Q9L39xwANcdZeHg9kPnwN): R1, R2 (una sección «Práctica» de 3 preguntas) y R3 (el formato de mate).
Pato no ha votado ni aprobado ninguna lección. Lo que apruebe se pasa a los guiones y entonces sí se sube.

**Lo que haría:** tu opción 2. Esconde la pestaña Español o ponle «Se abre cuando termines tu diagnóstico de Lectura». Te aviso
por aquí en cuanto haya lecciones aprobadas, con la lista de las que se suben.

## A qué tema va cada ESP-xx

Los temas son los del temario del dashboard (`p27-temario/datos-extra.json`). Entre paréntesis va el fichero de quiz del Banco
que cubre cada lección. El nombre es el que ve el alumno.

| Lección | Nombre que ve el alumno | Tema del dashboard |
|---|---|---|
| ESP-01 | Cómo es el examen de Español y las trampas que se repiten | Ninguno: es la entrada de Español, antes de todos los temas |
| ESP-02 | El significado de una palabra por su contexto | LEC-Vocabulario (Vocabulario) |
| ESP-03 | Encontrar lo que el texto dice: localizar y reunir | LEC-Explicitas (InfoExplicita) |
| ESP-04 | Leer lo que el texto no dice: inferir | LEC-Inferencias (Inferencias) |
| ESP-05 | Elegir la mejor evidencia | LEC-Inferencias (Evidencia) |
| ESP-06 | Elisión: qué sobra | RED-Elision |
| ESP-07 | Adición: enriquecer un enunciado | RED-Adicion |
| ESP-08 | Integración: el título que abarca todo | RED-Integracion |
| ESP-09 | Particularización: el enunciado que deja ver algo | RED-Particular |
| ESP-10 | Generalización: el enunciado que recoge el contenido | RED-General |
| ESP-11 | La idea central y el propósito del autor | LEC-Explicitas (IdeaCentral) |
| ESP-12 | Comparar dos textos | LEC-Analisis (Comparacion) |
| ESP-13 | Las figuras retóricas (1): comparar, dar vida, sustituir | LEC-Literario (FigurasRetoricas) |
| ESP-14 | Las figuras retóricas (2): sonido, exageración y contraste | LEC-Literario (FigurasRetoricas) |
| ESP-15 | Leer tablas, gráficas y diagramas | LEC-Cuantitativa (InterpretacionDatos) |
| ESP-16 | Quién cuenta y cómo: la narración y la voz poética | LEC-Literario (Narracion) |
| ESP-17 | Narrar, describir, exponer, argumentar | LEC-Tipos (TiposDiscurso) |
| ESP-18 | Qué clase de texto es | LEC-Tipos (ClasificacionTextos) |
| ESP-19 | Para qué se usa el lenguaje: sus funciones | LEC-Tipos (FuncionesLenguaje) |

**Dos cosas del temario:**

- **LEC-Resumen** no tiene lección ni tema en el Banco. Lo más cercano es Generalización (ESP-10), que ya está en Redacción.
  Quítalo del temario o déjalo sin lecciones.
- **ESP-11** (idea central) la puse en LEC-Explicitas porque en el Banco es de comprensión global, como Información explícita. Si
  el dashboard prefiere Análisis e interpretación, también cabe ahí.

El orden de las lecciones sigue el peso de cada tema en el examen real (`cantu-espanol/docs/TEMARIO.md` §2).
