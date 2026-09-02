# VEREDICTO Y DECISIÓN — `#179` «Integrate the Asset Registry into renderers»

**Fecha:** 2026-09-01 · **Run:** `RUN-JAME-RENDERER-ASSET-INTEGRATION-001`
**Commit del trabajo:** `1fde3d4e`

---

## Lo que dijo el operador, VERBATIM

```
pass 
vamos con turecomendacion
```

**`pass` GLOBAL, sin detalle por paso**, y aceptación de la recomendación **A** sobre la
decisión que subía.

---

## El alcance de este veredicto, y por primera vez en la cadena mejora

**Esta QA sí era de pantalla.** Se le pidieron cuatro pasos ejecutables —previa de una lección
con escena de procedimiento, desplegar y colapsar un paso, compilar a diapositiva, compilar a
web como control— y el paso 0 obligatorio de **cerrar y reabrir el lanzador**, porque el motor
se cachea por proceso y sin él habría medido el motor viejo.

**Rompe la racha de `#176` y `#178`**, que se aprobaron sobre resumen de la cabina porque no
producían nada mirable.

**Lo que NO consta:** si ejecutó cada uno de los cuatro pasos. Contestó `pass` global, que es
como decide, y así queda registrado: **aprobación del conjunto, sin detalle por paso.**

---

## ⚠ LA PREMISA FALSA DE LA CABINA, Y ES LA SEGUNDA DE ESTA CADENA

El ticket de `#179` daba por hecho que un fallo de declaración **para el build en el terminal**.
Con ese argumento exacto la cabina le vendió al operador la opción A de la Regla 5.6 en `#178`:

> *«A para el build en el terminal del operador, en compilación, antes de que el artefacto
> exista. Ninguna lección publicada se ve afectada.»*

**ES FALSO, y lo desmintió el taller midiendo.** En las siete puertas, `lanzo: false` **en las
siete**. Las dos que llevan el activo lo atrapan con `try/catch` **preexistentes** —
`renderSlideBody` en `buildSingleSlideLesson.js:177-183`, y el `catch` de la previa de
diapositivas — y pintan el mensaje **dentro del documento**. El artefacto sí se produce.

**Lo que sobrevive y lo que no:**

- **Sobrevive la decisión A**, y por su razón de fondo: el documento sale con
  `<pre>Error: [emitRegisteredAsset] INV-S2 · «slides/stack-procedure»: las ranuras no…</pre>`
  **donde iba la escena**, en vez de salir completo con una ranura vacía que en ejecución sería
  un `undefined` mudo. **Ruidoso contra silencioso** era el argumento verdadero.
- **No sobrevive el «cómo»**: no para en el terminal, queda escrito en la lección.

La cabina lo publicó al operador antes de pedirle el veredicto, con la misma fuerza con que
había afirmado lo contrario.

---

## La decisión: A — se deja como está

El operador eligió **no endurecer** los dos `try/catch`.

| | opción | por qué |
|---|---|---|
| **A** ✅ | dejarlo | el mensaje nombra la invariante y el activo y sustituye la escena entera: es imposible no verlo al mirar la lección |
| B | run para endurecerlos | toca dos superficies preexistentes ajenas a los activos; una lleva un comentario que prohíbe endurecerla *«porque cambiaría lo que el cascarón produce»*, la otra vive pegada a la exención recién protegida |

**Queda nombrado como superficie viva, sin run**, con su medición hecha.

---

## Lo verificado por la cabina, contra disco y contra los JSON del taller

- **Equivalencia:** 63 documentos antes y 63 después, **0 distintos**, **0 geometrías movidas**,
  `identicaByteAByte: true`, 3 llevan el activo.
- **Banco de sabotaje:** 18 planteados, **18 cazados**, 0 sin cazar, y el desglose por
  invariante suma 18.
- **`INV-5` sobre `previewRenderer.js`:** 4 documentos completos, 3 con pasada, 1 sin, con
  exención presente y **nombrando el retorno**. Coincide con lo medido en `#178`.
- **La exención sigue intacta:** `previewRenderer.js` no aparece modificado, y sus líneas
  320-322 se leen idénticas.
- **0 árboles movidos**, confirmado por ausencia en el status acotado.

**Declarado como del taller, no re-medido:** la suite, **2339 de 2339**. La cabina no puede
correrla; no le cabe en su tope de tiempo.

---

## Dos hallazgos del taller que conviene no perder

1. **El banco de sabotaje destapó un defecto REAL en `INV-3`**: se le pasaba la asignación
   guardada entera, y el operador `||` cortocircuita, así que **cualquier** cuerpo salía inerte.
   Corregido a evaluar el cuerpo. Una prueba que no puede fallar no prueba nada, y ésta lo
   descubrió de sí misma — el mismo patrón que en `#175`.
2. **Ante el único rojo de la suite no amplió la lista blanca de la guarda de `#173`**: quitó el
   acoplamiento, escribió un escáner local, y **reverificó banco y equivalencia después**.
