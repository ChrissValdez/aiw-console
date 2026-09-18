# VEREDICTO `#206` ronda 1 — pass sobre la lección real del operador

> Run: `#206` «Make the Moodle lesson output self-contained»
> (`RUN-CANTU-MOODLE-OUTPUT-SELF-CONTAINED-001`), `active`. Commit juzgado: `dede888f`.
> Escrito por la cabina el 2026-09-18.

## El criterio lo puso el operador, y corrigió el de la cabina

La cabina le ofreció juzgar los dos artefactos de la lección de prueba del taller. Él lo rechazó,
VERBATIM:

> «para el pass tengo que ver que jale con mi leccion
> no se trata de si la leccion se ve bien sino que pierde formatos cuando genera la version moodle»

**Tenía razón y es mejor criterio:** la pregunta no es si una lección de laboratorio se ve bonita,
sino si la salida de Moodle PIERDE algo respecto a la de Web sobre contenido real.

## Lo que la cabina generó y midió, 2026-09-18 02:08-02:11 UTC

Construyó su lección en curso **`Operar con signos`** a los dos formatos, con el motor ya
arreglado, desde una copia fuera de los repos:

- Origen: `cantu-lessons/drafts/web/matematicas_paa/aritmetica/operar_con_signos.web.draft.json`,
  sha256 `f5fcf400…`, mtime 02:06 UTC. **Copiado, no tocado:** `cantu-lessons` siguió en `168bc28`
  y el borrador conservó su huella. El hilo de LECCIONES lo había escrito dos minutos antes.
- Salidas en `cantu-studio/QA/temp/RUN-CANTU-MOODLE-OUTPUT-SELF-CONTAINED-001/`:
  `OPERADOR-operar_con_signos.MOODLE.html` y `.WEB.html`.

| | propiedades usadas | definidas | sin definir |
|---|---|---|---|
| su lección → Moodle | 24 | 26 | **0** |
| su lección → Web | 27 | 60 | 0 |

**Comparación regla a regla**, extrayendo todo el CSS de los dos (hoja en base64 y bloques
`<style>`): Web 143 selectores, Moodle 132. Las 11 ausentes son tres de página entera —`body`,
`:root`, `.cs-container`, que no deben ir en un fragmento— y ocho de componentes que **esa
lección no usa** (cero apariciones en su marcado): cajas anidadas, cajas blancas punteada y
sólida, rejilla limpia y columnas. **En Moodle no sobra ninguna regla.**

## El veredicto, VERBATIM

> «si se ve bien el .moodle
> ahora si procede»

**QA: EJECUTADA sobre la lección real**, con el criterio del operador, y pasada. Sin detalle por
paso.

## Y el hueco que la comparación destapó, que es lo que «procede» autoriza

Las reglas GLOBALES —`src/design/web/atoms.css`— **no viajan al artefacto de Moodle**. Lo que
viaja son los estilos que cada componente emite consigo mismo, más la base de variables que
añadió la ronda 1. Hoy no le afecta porque su lección no usa esos componentes; **el día que use
columnas, la maqueta se descuadra en Moodle y no en Web**.

Es la otra mitad del mismo defecto: faltaban las variables, y faltan unas reglas. **El operador
autorizó la segunda ronda** con ese «ahora sí procede», sobre la misma superficie que la QA acaba
de ejercitar (D-061).
