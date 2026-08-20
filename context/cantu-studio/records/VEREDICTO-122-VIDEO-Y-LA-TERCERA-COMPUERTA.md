# VEREDICTO 122 — «Video» habilitado · LA TERCERA COMPUERTA · y la geometría de celda decidida

> Run: `RUN-CANTU-SLIDE-VIDEO-LIFT-AND-IMPLEMENT-001` · `queue_order` 122.
> Veredicto del operador **Christopher Valdez Cantu**, **2026-08-18**, en Cantu Studio.
> Transcrito por la cabina **VERBATIM**.

---

## SUS PALABRAS, ÍNTEGRAS

```
el video en teoria jalo
pero... mira se apachurro raro
```

Y sobre el dibujo de las cuatro salidas:

```
vamos con tu recomendacion dame el ticket
```

Adjuntó una captura: una diapositiva de dos celdas, con una tarjeta que llena su celda de arriba
abajo y **el vídeo pequeño y centrado**, con hueco encima y debajo.

---

## PARTE 1 — EL RUN PASA

«Video» deja de estar contenido. Era **el segundo y último** componente bloqueado: los otros
ocho del plan no están bloqueados, están **sin admitir**, que es otro tipo de run.

---

## PARTE 2 — LAS COMPUERTAS ERAN TRES, NO DOS. ES LA APORTACIÓN MAYOR DEL RUN

| | Superficie | ¿bloqueaba? |
|---|---|---|
| **C1** | `SLIDE_ITEM_TYPE_OPTIONS` — el selector | **sí** |
| **C2** | `SLIDE_GRID_COMPONENT_FITNESS` — el mapa de aptitud | **no**, medido aquí y no heredado |
| **C3** | `containedSlideComponentTypes` — el importador de JSON | **sí** |

**La C3 no la nombraba el ticket.** La nombraba la nota del plan del **2026-08-17**, y el taller
la leyó. Sin ella, el componente habría quedado insertable a mano y **rechazado al importar**.

**Y ese es exactamente el estado en que `#121` dejó «Lista con etiquetas».** Ver Parte 4.

---

## PARTE 3 — LO QUE EL TALLER NO PUBLICÓ, Y ES POR QUÉ ESTE RUN VALE

Su primera sonda dijo **«8 de 8 inyectables»** por título y descripción. **No lo publicó.**
Llamaba al motor suelto, que **no es el camino del autor** — falta el compilador, que sí escapa.
La segunda versión preguntaba «¿aparece la cadena?», que da **siempre que sí** para texto sin
metacaracteres. **Se corrigió tres veces antes de dar una cifra.**

Resultado real: `embed/undefined` **0 de 15** alcanzable, inyección **0 de 8**. La frontera de
parada no se activó.

**Un «para y reporta» en falso habría costado un run entero.**

---

## PARTE 4 — UN DEFECTO DE LA CABINA SOBRE TRABAJO YA ENTREGADO

**`#121` dejó «Lista con etiquetas» A MEDIO HABILITAR.** Sigue en
`containedSlideComponentTypes`: **insertable desde el selector, rechazada por «Insertar JSON»**.

**El ticket de `#121` nombró DOS superficies de contención y son TRES.** La tercera estaba
escrita en la nota del plan **antes** de aquel run, y la cabina **no la leyó al redactar el
encargo**. No es del taller.

`#121` **no se reabre ni se reescribe su historia**. Se corrige hacia adelante:
**`RUN-CANTU-SLIDE-ICONLIST-JSON-IMPORT-GATE-001`**, insertado en `#123`, con guarda mecánica
para que **ningún tipo pueda volver a quedar habilitado en unas superficies y no en otras**.

---

## PARTE 5 — LA DECISIÓN DE GEOMETRÍA, TOMADA SOBRE UN DIBUJO

El operador vio **dos síntomas opuestos** del mismo agujero:

- **En celda alta**, el vídeo conserva su 16:9, se queda pequeño y **deja hueco** — su captura.
- **En fila baja**, lo contrario: **836 × 82,7 px**, o sea 10:1.

Nadie había decidido qué manda cuando la celda y el contenido no coinciden. Se le dibujaron
cuatro salidas sobre una celda con las proporciones de su propia captura:

| | | Resultado |
|---|---|---|
| **A** | mantener y centrar — lo de hoy | deja hueco |
| **B** | estirar | deforma |
| **C** | llenar y recortar | corta y tapa los controles |
| **D** | **la celda se ajusta al contenido** | **ELEGIDA** |

**Eligió la D**, que era también la recomendación explícita de la cabina. El razonamiento que se
le dio queda registrado porque es lo que hay que preservar: la A descuelga el componente respecto
a su vecino; la B **destroza un vídeo educativo**, donde el texto de la pizarra *es* el
contenido; la C se come contenido y tapa los controles.

**Va a `RUN-CANTU-SLIDE-CELL-GEOMETRY-FIT-001`, insertado DESPUÉS de los ocho componentes por
admitir.** La razón de esa posición es medida: hoy hay **dos** casos y cuando la cola llegue allí
habrá **diez**. Se decide una vez con todas las formas delante en lugar de ocho veces con una
cada vez.

**Y ese run lleva escrito lo que la D no resuelve sola:** el escenario tiene alto fijo, así que
qué pasa cuando dos componentes de la misma fila piden alturas distintas, o cuando lo que piden
suma más que el alto disponible, **son decisiones que ese run tiene que medir y, si resultan ser
suyas, dibujar y preguntar**.

---

## LO QUE SIGUE ABIERTO Y ES SUYO

- **Los once rótulos con «(opcional)»** que contradicen su convención.
- **«Extra grande» contra «muy grande»**, sin dueño.
