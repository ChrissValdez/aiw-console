# DECISIÓN DEL OPERADOR — hoy no se puede escribir «menor que», y se arregla antes de cerrar la puerta

**Fecha: 2026-09-05** · **Origen:** la parada de `RUN-CANTU-JSON-IMPORT-MATH-VALIDATION-PARITY-001`
**Commit de la evidencia:** `76498b2e`

---

## Lo que dijo, VERBATIM

```
vamos con tu recomendacion
```

Aceptó la opción **A** —ampliar la allowlist con los alias que faltan— **y** incluir `preMath`
en el alcance del run de paridad cuando se reanude.

---

## EL HALLAZGO, y vale más que el run que lo destapó

**Hoy no se puede escribir una desigualdad estricta en ninguna fórmula del sistema.** Medido y
reproducido por la cabina:

```
x < 5      ANGLE_BRACKET_PAYLOAD    veto de seguridad, para que no entre HTML
x \lt 5    UNKNOWN_LATEX_COMMAND    no está en la allowlist
x \gt 5    UNKNOWN_LATEX_COMMAND    tampoco
```

**No hay tercera vía.** Y no es una rareza del corpus: **afecta a la puerta de EDICIÓN**, o sea a
cualquiera que escriba una fórmula a mano, no solo al que importa JSON.

Y el patrón que lo explica: la allowlist admite `geq`, `leq` y `neq` **pero no `ge`, `le` ni
`ne`**, que son **el mismo símbolo**. Admitir uno y no el otro no es una decisión de seguridad;
es un hueco.

---

## Por qué el orden es este y no otro

El run de paridad **paró por su propia condición 1**: cerrar la puerta de importación primero
habría empezado a rechazar tres piezas que el corpus ya contiene y que hoy entran sin protesta —
`\ge` en una regla de diapositiva, `\xrightarrow` en el fixture canónico de split, y `<` / `>`
crudos en una tabla del sandbox.

**Esa parada fue el resultado correcto**, y es la segunda de esta cadena que rinde más que el
entregable que sustituye. El ticket lo decía: una puerta que empieza rechazando lo que el corpus
ya contiene es peor que el hueco que arregla.

---

## Por qué A y no B

**B —convertir el contenido— no cierra el problema.** `\ge` → `\geq` es mecánico, pero **la tabla
no tiene salida**: los `<` `>` crudos están vetados por seguridad y sus alias LaTeX tampoco están
admitidos. Sin ampliar, esa pieza **no se puede escribir de ninguna forma**.

**Con A queda un fleco declarado:** los `<` `>` **crudos** de esa tabla seguirán vetados — ese
veto es de seguridad y no se toca —, así que esa pieza habrá que reescribirla a `\lt` / `\gt`.
Una pieza, dos fórmulas. El operador lo sabe.

Y el precedente está fresco: `#183` acaba de admitir `color` bajo el criterio de que KaTeX 0.16.9
lo parsee y lo dibuje. El taller ya midió que **KaTeX dibuja los ocho casos**, incluidos los
crudos.

---

## Dos cifras de la cabina que el taller corrigió

1. **«La allowlist se alcanza en la familia rule, línea 355».** La alcanzan **dos** campos, y los
   dos son `rule` de **web**. La regla de **diapositiva** también se llama `rule` y **no llega**:
   usa `SlideRuleMathSchema`, que solo comprueba no-vacío y delimitadores. La frase sobreestimaba
   la cobertura.
2. **Los campos de fórmula no son once: son DOCE.** Falta `preMath`, línea 3425, declarado
   `z.string().optional()` — **validación cero** — y editado por el mismo modal que sí aplica la
   allowlist. El ticket no lo previó. **Entra en el alcance** por decisión del operador, y el
   texto del run se enmendó en la misma escritura.

---

## Lo que queda encolado

| | |
|---|---|
| `RUN-CANTU-MATH-ALLOWLIST-ALIAS-GAP-001` | admitir `ge`, `le`, `ne`, `lt`, `gt`, `xrightarrow`. **Abierto** |
| `RUN-CANTU-JSON-IMPORT-MATH-VALIDATION-PARITY-001` | se reanuda después, ya con doce campos y con `preMath` dentro. Depende del anterior |

**Tres runs en `active` a la vez**, y es deliberado: el de alias lo trabaja un taller; el de
paridad está abierto y **esperando su precondición**, con su medición ya hecha y commiteada; y la
auditoría de UX la hace el operador a mano. Las tres superficies son disjuntas.
