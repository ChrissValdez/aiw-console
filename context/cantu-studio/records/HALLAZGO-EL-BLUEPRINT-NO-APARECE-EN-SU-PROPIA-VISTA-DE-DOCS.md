# HALLAZGO — la norma de documentación no aparece en la vista de documentación

**Fecha: 2026-09-05** · **Origen:** la parada de `RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001` (`#187`)
**Estado:** el run sigue `active`, esperando una decisión del operador

---

## Lo que el ticket pedía mirar, y lo que apareció

El texto del run nombraba **una** ruta obsoleta: el mapa de categorías busca
`docs/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md` mientras el índice lo registra en
`docs/governance/…`, con subdirectorio. La cabina lo verificó y lo dio por cierto.

El ticket añadió una cláusula: *«¿cuántas OTRAS entradas de ese mapa apuntan a rutas que el
índice ya no registra? Cénsalas y publícalo. Una sola arreglada deja el resto esperando a que
alguien las descubra de una en una, que es como se descubrió esta.»*

**El censo devolvió 15, y detrás había algo mayor.**

---

## Lo medido

| | |
|---|---|
| entradas en el mapa de categorías | **39** |
| de ellas, apuntando a rutas que el índice **no registra** | **15** |
| documentos que caen hoy al cubo «sin categorizar» | **27 de 50** *(cifra del taller)* |

**Todas las 15 tienen el mismo defecto**: el documento se movió de `docs/X.md` a
`docs/<subdirectorio>/X.md` y el mapa se quedó con la ruta plana.

Y entre las 15 están, medidas por la cabina: el **Blueprint de documentación**, el
**modelo canónico**, el **contrato de fuente única de paquetes**, `START-HERE`, las cinco
`ARCHITECTURE-*`, las tres `REFERENCE-*`, los dos `HOW-TO-*` y los dos `OPERATIONS-*`.

---

## ⚠ LO QUE ESTO SIGNIFICA, Y ES LO QUE DECIDE

**El Blueprint de documentación —la norma que gobierna cómo se escribe la documentación de este
proyecto— no aparece categorizado en la propia vista de Docs.** Ni el modelo canónico. Ni el
contrato de paquetes.

Los tres documentos que **este mismo run manda leer como lectura obligada** están en el cubo de
«sin categorizar».

**Un mapa paralelo que no incluye la norma que lo gobierna no es un mapa desactualizado: es un
mapa que nadie mantiene.** Y el taller midió el otro lado del mismo hecho: hay documentos que
**nunca tuvieron entrada**, no que la perdieran. El mapa no envejece — es que no se escribe.

---

## La alternativa, medida por el taller

Derivar la categoría del **subdirectorio canónico del índice** en vez de mantener el mapa. El
taller lo midió y **sale 1:1 sin un solo choque**, y no por criterio suyo sino por la tabla
«Canonical location» del §2 del modelo canónico:

```
architecture → ARCHITECTURE      decisions → DECISIONS       reference → REFERENCE
components   → COMPONENTS        how-to    → HOW-TO          operations → OPERATIONS
governance   → GOVERNANCE        docs_management → DOCS MANAGEMENT      start_here → START HERE
```

El único subdirectorio sin categoría de Blueprint es `docs/project-console/`, con dos propuestas.
La propuesta del taller —dejarlo en el cubo, porque el Blueprint no tiene esa categoría— es la
honesta.

`ia_bucket` **no sirve** como alternativa: 27 de 50 llevan el genérico `docs`, y el comentario
del propio código ya lo avisa.

---

## Los otros dos huecos NO paran, y quedan medidos

- **La autoridad existe.** El campo es `canonicality`, **presente en las 153 entradas del
  índice** — verificado por la cabina. No se deduce del nombre: `docs/archive/CANONICAL_SOURCES.md`
  lo declara, *«Canonicality is documentation authority only — never certification»*. El sitio de
  pintado es `renderDocMetadataDetails`, que hoy muestra cuatro campos y no éste.
- **El contrato de paquetes no es prosa muerta.** Los 17 paquetes lo cumplen al pie de la letra:
  8 de 8 secciones requeridas, en orden, con banner y tabla. Lo que no existe es esquema de
  máquina, y el propio contrato lo declara trabajo futuro.

**Por eso el taller paró entero y no entregó el hueco 1**: los tres se cruzan en el mismo panel
de metadatos y en la misma costura directorio→clase. Hacer uno antes de decidir el otro es
escribir esa costura dos veces.

---

## Un error de la cabina que el taller cazó

La cabina verificó la cifra del run —*«la cadena authority aparece exactamente una vez»*— con
`grep -i` y la dio por buena. **En minúsculas aparece CERO veces.** La única ocurrencia es
`AUTHORITY` en mayúsculas, y es **parte del nombre de un fichero dentro de una clave**, no una
clave ni un campo.

La cabina verificó **el conteo** y no **qué era lo contado**. Es su patrón dominante otra vez, en
la misma sesión en que lleva declarándolo cinco veces.

---

## Y una diferencia de sustantivo entre las dos mediciones, declarada

El taller cuenta **12** documentos que nunca tuvieron entrada; la sonda de la cabina cuenta
**33**. **No se contradicen: cuentan universos distintos.** La cabina barre todo lo que hay bajo
`docs/` sin archivar, incluidos `.json` y `.html` de la consola; el taller cuenta documentos de
prosa de la era nueva. Las dos son ciertas con su sustantivo puesto, y ninguna se publica sin él.
