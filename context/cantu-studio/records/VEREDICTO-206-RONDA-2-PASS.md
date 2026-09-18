# VEREDICTO `#206` ronda 2 — pass

> Run: `#206` «Make the Moodle lesson output self-contained», `active`. Commit juzgado: `54d7b986`.
> Escrito por la cabina el 2026-09-18.

## Lo que dijo el operador, VERBATIM

> «pass»

Sobre el par de SU lección `Operar con signos` construida con el motor de la ronda 2, y con su
propio criterio: que la salida de Moodle no pierda formatos respecto a la de Web.

## Lo que la cabina midió antes de pedirlo, 04:01-04:03 UTC

Comparación selector a selector, desacotando el lado de Moodle, sobre los cuatro pares que dejó
el taller:

| lección | reglas que usa y perdía, ANTES | DESPUÉS |
|---|---|---|
| operaciones aritméticas | 1 | **0** |
| clasificación numérica | 2 | **0** |
| valor absoluto | 2 | **0** |
| showcase library | 1 | **0** |

Y la mitad que no se puede juzgar mirando: **CERO reglas de página** (`body`, `html`, `:root`) en
los cuatro artefactos de Moodle. Guarda nueva: 8 de 8, corrida por la cabina.

La lección del operador, construida con el motor de ahora desde una copia fuera de los repos
(borrador con huella `42bf0f2b…`, 02:43 UTC; `cantu-lessons` intacto en `168bc28`): **ninguna
regla que su marcado use le falta, y ninguna regla de página viaja.**

## Un error de medición de la cabina, declarado

La primera comparación de la cabina dio «siguen faltando reglas». Era su sonda: no quitaba el
acotado `:where(.cs-lesson-wrapper)` con que las reglas viajan ahora. Corregida, el resultado se
invirtió. **Estuvo a un paso de publicar un rojo falso** sobre trabajo correcto del taller.

## Superficie que nadie miró

Ninguno de los dos pasó por un Moodle real en esta ronda: el veredicto es sobre ficheros abiertos
en local, que es exactamente lo que el operador pidió. La subida a Moodle queda para cuando
publique.
