# VEREDICTO 129 — «Explicación guiada», y el nombre que ya existía

> Run: `RUN-CANTU-SLIDE-SPLIT-ADMIT-AND-IMPLEMENT-001` · `queue_order` 129.
> Operador **Christopher Valdez Cantu**, **2026-08-20**. Transcrito **VERBATIM**.

---

## SUS PALABRAS

**Sobre el nombre y el método:**

```
haber estamos entrandoe n componentes un poco mas dificiles
este de tarjeta de desglose, su equivalente en web creo que es explicaicon guiada, entonces
este deberia llamarse explicacion guiada.

y toma como referencia del compoente el de web
```

**Sobre las tres salidas dibujadas:**

```
C
```

---

## PARTE 1 — EL NOMBRE YA EXISTÍA, Y ESO CAMBIA LA REGLA

El taller propuso **«Tarjeta con desglose»** con un argumento bueno: durabilidad a seis meses,
descartando los nombres geométricos. **El operador lo corrigió señalando que su equivalente de
Web YA SE LLAMA «Explicación guiada»**, y la cabina lo verificó en `blockCatalog.js`, en los dos
sitios.

**La lección no es que el nombre fuera malo: es que INVENTABA UN NOMBRE PARA ALGO QUE YA TENÍA
UNO.** Antes de proponer un rótulo, se mira si el equivalente del otro carril ya lo tiene.

**Y el taller convirtió eso en mecanismo:** la guarda **no teclea el nombre, lo DERIVA del
catálogo de Web** y compara los dos carriles. Si Web renombra —**y ya lo hizo una vez, de
«Comparación guiada»**— la suite se pone roja en vez de dejarlos divergir en silencio.

---

## PARTE 2 — «WEB ES LA REFERENCIA» RESULTÓ SER UNA ORDEN CON ALCANCE

Se leyó como **«no divergir sin razón»**, no como «copiar», y el barrido dio:

**TRECE divergencias alineadas** — rótulo, orden de campos, «Etiqueta»→«Nombre»,
«Insignia»→«Número», «Pie»→«Conclusión», «Resultado»→«Resultado final», «Fila/Celda»→«Paso»,
«Celdas»→«Pasos», «Añadir»→«Agregar», placeholders, textos de arranque, semillas, y no poder
borrar el último ítem.

**Y DOS DE ELLAS NO ERAN SOLO DE WEB:**

- **el orden de los campos violaba también la regla de colocación de este propio carril**;
- **poder borrar el último ítem llevaba al autor a un borrador inválido POR UN CAMINO QUE EL
  EDITOR LE OFRECÍA.**

**CINCO quedaron nombradas y no tocadas**, incluida una en la que **Web se contradice a sí
misma**: su ayuda de «Descripción» nombra «método» cuando su propia nota dice que no debe. **El
taller copió la frase neutra y no tocó Web.**

---

## PARTE 3 — LA DECISIÓN, TOMADA SOBRE UN DIBUJO Y CON TRES SALIDAS

El taller midió lo necesario para que la elección fuera informada, en vez de presentar dos
opciones abstractas:

- **La cuarta combinación es VACÍA, NO ROTA.** La tarjeta se pinta entera; el cuerpo son
  **670,78 px de gris con cero elementos**. Sin errores, sin `undefined`.
- **Y se lleva la conclusión por delante**: el pie se emite dentro de la rama de filas.
- **No puede atravesar hoy el compilador de diapositiva.**
- **Respaldarla cuesta ONCE LÍNEAS**, un `else if`, **cero CSS nuevo**, y **las tres formas de
  hoy salen byte a byte idénticas**. Prototipado **fuera del repo**.

| | | |
|---|---|---|
| A | dos ejes como Web | le ofrece una combinación sin cuerpo |
| B | desplegable de tres | diverge donde él pidió no divergir |
| **C** | **dos ejes Y la rama** | **elegida — y era la recomendación de la cabina** |

**La razón que se le dio, y es la que hay que preservar: A y B le obligaban a elegir entre dos
cosas que quiere; la C se las da las dos por once líneas.**

---

## PARTE 4 — UN HALLAZGO DE MÉTODO DEL TALLER, DE LOS BUENOS

Su primera nota afirmaba que `.strict()` rechazaba los cuerpos vacíos. **Era falsa** —ningún
ítem de este carril es `.strict()`— y **lo destapó SU PROPIO ARNÉS DE MUTACIONES**: abrir un
cerrojo dejaba la guarda verde.

Lo real son **dos cerrojos independientes** y hay que abrir los dos. **Una guarda que pasa con
media premisa falsa es peor que no tenerla**, y el arnés existe exactamente para eso.

**Y de las siete guardas que salieron mal a la primera, las siete eran defectos de las guardas,
no del código** — una tautología que se comparaba consigo misma, un patrón que casaba con el
vecino, dos mutaciones que no aislaban nada.

---

## PARTE 5 — DÓNDE SE CIERRA Y QUÉ SE ABRE

**Se cierra con el desplegable de tres, que es lo seguro.** Los dos ejes y la cuarta forma van a
`RUN-CANTU-SLIDE-SPLIT-FOURTH-SHAPE-001`, **en ese orden — primero la rama, después los ejes**,
porque al revés se le ofrecería al autor una combinación que aún no pinta.

**La cabina decidió NO partirlo en dos runs y lo marcó como suyo y vetable.** La regla del
proyecto dice que el contrato va antes que la interfaz en dos runs, pero **aquí no aplica por
tamaño**: son once líneas ya prototipadas sobre un componente, no una pieza compartida con
varios consumidores, y partirlo daría un primer run cuya QA sería «no ha cambiado nada visible».

---

## ABIERTO Y NOMBRADO

- **EL RECORTE DE LA FILA 4 — y con él un agujero del motor de ajuste de `#127`.** El cuerpo se
  alinea abajo y lo que sobra **sale por el borde de arriba, que no es desplazable**: el déficit
  se reporta como **0** mientras se pierden **150–405 px**. **Es del mecanismo, no del
  componente.**
- Las cinco divergencias con Web no tocadas.
- Las tres clases de medida que no escalan.
