# Veredicto parcial de la revisión del lote (#254) — las notas del paso son demasiado rígidas

> Hilo `cantu-studio`. Run `RUN-CANTU-L01-FINAL-BATCH-REVIEW-001` (#254), en curso. Superficie: las notas «Ver cálculo» y
> «Error común» del «Procedimiento matemático» (`RUN-CANTU-MATH-PROCEDURE-STEP-NOTES-CONTRACT-001` y `-EDITOR-001`),
> vistas en el borrador `revision_final_de_l01`. El operador adjuntó dos capturas: un paso con dos notas (pestaña unida
> al panel) y un paso con una sola nota (botón separado del panel).

## Las palabras del operador — LITERALES

```
estoy revisando :

revision_final_de_l01.

se ve bien

un tema
tecnicamente jala lo de Error común y ver calculo
El tema es que agregaste limitantes al sistema 
es decir, lo que queria es que hubiera la opcion de tener doble nota detallada dentro de los pasos
las que normalmente se usaran es Ver cálculo y Error común 
en cualqueir orden podrian estar aunque normalmente estaran  en ese orden

el proberlma es que en el detalle ya esta limitaddo el fomrato de cada una
lo cual si es bueno. pero al mismo tiempo, es inflexible
si despues queiro hacer una explicacion con un procedimiento particularmente largo 
o con pasos particularmente largo no me deja hacerlo

sin mencionar uqe si quiero que dentro de ver calculco se tenga el fomrato de bloqeu matematico centrado (pero dentro del bloque matematico orientado a la izquierda) 
no esta esa opcion 
ademas no se porque en algunos casois se ve como p estaña abierta osea el boton y el contenido conectado como en la primera imagen y en otros separado 

que me recomiendas? 

una opcion es un bloque de codigo? 

o quizas si tener un formato estricto para ver calculo y para ver error comuin pero tener un tercer formato libre en el que se inserta un bloque de html dentro para pdoer ponerlo en el formato que quiera

lo que si es que no esta bien el formato taan estricto de ver caluclo y ver error comun

porqeu por ejempo en ver error comun eso de :
Incorrecto:
Correcto:

se ve bien de hecho me gusta bastante
pero no siempre aplica
a veces es un tipo textual, a veces es un texto y formula dentro dle texto
a veces, sera bloque de codigo como el que te mencione
texto lboque de codigo, texto

no lo se depende del caso
y tu ya definiste un formato estremadamente inflexible de como presentar la informacion dentro de la nota
```

## Lo que la cabina midió en disco antes de responder (2026-10-11, `draftSchema.js` de compiler-api)

- «Ver cálculo» (`calculationNote`) tiene tres campos fijos: `lines` (renglones de fórmula centrados, obligatorio),
  `remark` (prosa con fórmulas en línea, opcional) y `result` («Se obtiene:», obligatorio).
- «Error común» (`commonErrorNote`) tiene tres campos fijos, los tres obligatorios: `explanation`, `incorrect`
  y `correct`.
- La prosa de las notas rechaza el HTML y la fórmula en su propio renglón.
- Qué nota va a la izquierda lo fija el motor, no el autor.
- La nota de siempre (`details`) admite algo de HTML, pero no puede convivir en el mismo paso con las nuevas.
- **Hoy no hay ninguna salida libre dentro de las notas nuevas.**
- Pestaña unida o separada: con dos notas se dibujan como pestañas, unidas al panel. Con una sola, «como una nota de
  siempre», con el botón separado. Lo pedía el criterio del #239: «a step with one note and one with none look as today».

## Estado

La recomendación de la cabina va en la conversación. **La decisión del operador está pendiente** y se escribe aparte,
con sus palabras.

## Aclaración del operador — LITERAL

```
bloque de código me referia a bloque de HTML 
no a cosas distintas
lo que si me referia algo distinto es a bloque de formula

que igual que como esta en precedimiento matematica (en los pasos) 
tener 
Alineación de las fórmulas
las centradas y a la izquierda en bloque

siento que eso tambien aplica a las formulas dentro de detalle
```

**Medido por la cabina:** el mando ya existe. Se llama «Alineación de las fórmulas» y tiene dos opciones, «Centradas
(por defecto)» y «A la izquierda, en bloque». Su campo es `focusAlignment`, va por bloque y, si no está, se entiende
centrado. Lo usan hoy «Procedimiento matemático», «Explicación guiada» y la pila de diapositiva, y sus palabras están
en `editor-ui/src/features/editor/constants/alineacionDeFormulas.js`. Las aprobó el operador el 2026-09-21.
