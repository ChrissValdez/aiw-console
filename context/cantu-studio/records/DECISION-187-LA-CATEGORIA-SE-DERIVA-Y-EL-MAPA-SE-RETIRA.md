# DECISIÓN DEL OPERADOR — la categoría se deriva del índice y el mapa paralelo se retira

**Fecha: 2026-09-05** · **Run:** `RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001` (`#187`, `active`)
**Hallazgo que la motiva:** `HALLAZGO-EL-BLUEPRINT-NO-APARECE-EN-SU-PROPIA-VISTA-DE-DOCS.md`,
commit `fb246b30`

---

## Lo que dijo, VERBATIM

```
a
```

Opción **A** de dos dibujadas: **derivar la categoría del subdirectorio canónico del índice y
retirar el mapa**, en vez de parchear sus 15 rutas obsoletas.

---

## Qué se le presentó

| | |
|---|---|
| entradas en el mapa de categorías | 39 |
| apuntando a rutas que el índice ya no registra | **15** |
| documentos que caen hoy al cubo «sin categorizar» | **27 de 50** |

Las 15 con el mismo defecto: el documento se movió a un subdirectorio y el mapa se quedó con la
ruta plana. **Entre ellas, el Blueprint de documentación, el modelo canónico y el contrato de
paquetes** — los tres que este mismo run manda leer como lectura obligada.

**(A)** derivar del subdirectorio: medido 1:1 sin un solo choque, y no por criterio del taller
sino por la tabla «Canonical location» del §2 del modelo canónico.
**(B)** parchear las 15 y añadir las que faltan: 27 líneas, cero riesgo, **pero deja el mapa
paralelo vivo** y el próximo documento que se mueva vuelve a caer al cubo en silencio.

---

## El argumento que decidió

**Un mapa paralelo que no incluye la norma que lo gobierna no está desactualizado: está sin
mantener.** Y el taller midió el otro lado del mismo hecho: hay documentos que **nunca tuvieron
entrada**, no que la perdieran. El mapa no envejece — es que no se escribe.

**B lo revive. A lo retira.**

Es el mismo patrón que esta sesión ha aplicado cinco veces seguidas en la cadena de las fórmulas:
**una fuente, no una lista paralela que alguien tiene que acordarse de actualizar.**

---

## El fleco, declarado antes de decidir

`docs/project-console/` no tiene categoría en el Blueprint. **Se queda en el cubo**, que es lo
honesto: inventarle una categoría sería decidir por el Blueprint desde un run que no lo gobierna.

---

## Lo que la decisión NO cambia

Los otros dos huecos del run siguen como estaban y **no paraban**:

- **La autoridad existe** y es el campo `canonicality`, verificado por la cabina en **las 153
  entradas** del índice. Se pinta en `renderDocMetadataDetails`, que hoy muestra cuatro campos y
  no éste.
- **El contrato de paquetes no es prosa muerta**: los 17 paquetes lo cumplen al pie de la letra.
  Lo que no existe es esquema de máquina, y el propio contrato lo declara trabajo futuro.

**El taller paró entero y no entregó el hueco 1 a propósito**, porque los tres se cruzan en el
mismo panel de metadatos y en la misma costura directorio→clase. Hacer uno antes de decidir el
otro habría sido escribir esa costura dos veces. Fue la decisión correcta y la cabina la respalda.
