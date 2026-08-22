# VEREDICTO 130 — «Explicación guiada» en NUEVE rondas, y la lección más cara de la sesión

> Run: `RUN-CANTU-SLIDE-SPLIT-FOURTH-SHAPE-001` · `queue_order` 130.
> Operador **Christopher Valdez Cantu**, **2026-08-20**. Transcrito **VERBATIM**.

---

## SUS PALABRAS, RONDA A RONDA

**R2 — al probar los dos ejes:**

```
primer error, hay un erro con los modos
el con texto y formula

si no tengo lleno ambos fomrularios me marca error aunque tenga seleccionado con texto si no me
meto a formula y llleno todos los campos me marca error porque faltan campso

tambien falta poner el tipo de linea al final con formula de resultado final y aparte el
insertar formula
no pedirme que escriba manualmente en latex
```

**R3 — sobre las dos lecturas dibujadas:** `A`

**R5 — tras el arreglo del formulario:**

```
inserto explicacion guiada, en una slide libre
Y lo primero que me dice es:
No se pudo generar la vista previa Slide
Fallo de validación para Preview Real Slides  La diapositiva 2 tiene campos faltantes.
es dfeir sigue con el error de marcar error por default
```

**R6 — la pista que lo resolvió todo:**

```
me meti a checar cada campo
y en "con formulas" llene
Rótulo
y dejo de marcar el error
eso no significa que este bien eso para tener que llenarlo, solo lo menciono para identificar
el error

otra cosa
el rotulo esta demasiado pequeña el tamaño de letra, se ve pequeña comparado con la formula
[...] deberia de ser en vez de rotulo numero (del paso)
```

**R7 — sobre las dos decisiones:** `voy con ambas recomendaciones`

**R8 — el diagnóstico que desmintió a la cabina:**

```
esi reinicie el editor, de hecho en 1 columna con formula si se arreglo pero en 2 columnas con
formula no senarreglo
```

**R9 y cierre:**

```
mejoro, pero el numero se ve mal centrado, que el nuemro este en la esquina superior izquierda
en dos columnas
```

```
procede cuando este todo listo me generas el promtp de reinico
```

---

## LA LECCIÓN, Y ES DE LA CABINA

**CUATRO RONDAS ARREGLARON LA CAPA EQUIVOCADA PORQUE EL ENCUADRE DE LA CABINA APUNTABA AL
FORMULARIO.** Poda, `key`, `unregister`, lectura viva — **y todas aquellas reparaciones eran
correctas.** Eran insuficientes.

**EL ESQUEMA NO SE CUESTIONÓ HASTA QUE LA CABINA LO LLAMÓ DIRECTAMENTE**, en la ronda 5. Bastaron
tres llamadas para verlo.

**Y volvió a pasar una capa más abajo:** la ronda 5 arregló las **listas** vacías y no miró las
**cadenas** vacías, que tenían la trampa idéntica. Hizo falta que el operador dijera *«llené
Rótulo y dejó de marcar el error — eso no significa que esté bien»* para localizarla.

**La regla que sale de aquí:** cuando un defecto sobreviva a dos reparaciones correctas, **el
encuadre está mal, no la reparación**. Y la forma de salir es **llamar a la capa de abajo
directamente**, no afinar la de arriba.

---

## EL OTRO ERROR DE LA CABINA, Y ES DE MEDICIÓN

**RECOMENDÓ DERIVAR EL TAMAÑO DEL NÚMERO DE LA PROPORCIÓN DE LA LISTA.** Las dos proporciones
quedaron en 0,633 y eso era cierto — **pero comparaba un DISCO RELLENO de 28 px con un TEXTO
PELADO del mismo cuerpo.** Un disco se lee mucho más grande.

**Igualar el número no iguala lo que ve el ojo.** Es «medir con la herramienta equivocada y
publicar el resultado», que produce un verde y **un verde no se cuestiona**.

**La salida fue dejar de adivinar proporciones y REUTILIZAR LA MISMA PIEZA.** Y con ella la
escala vino gratis: el taller **desmintió además la premisa del ticket** —«el círculo mide 28 px
fijos y la lista no escala»— midiendo que **la lista sí escala** y que los 28 px son solo el
ancla.

---

## LO QUE EL TALLER HIZO Y HAY QUE SEGUIR EXIGIENDO

- **La QA humana desmintió a su sonda, y él lo había declarado antes:** sin efectos, midió el
  mecanismo y no la pantalla. **Cuando el operador probó, apareció lo que la sonda no veía.**
- **La causa real de la desincronización no estaba donde nadie miraba:** el despachador pasa un
  **snapshot congelado**, así que la clave del eje nunca cambiaba y **la reparación de la ronda 3
  nunca llegaba a dispararse**. Se resolvió **dentro del componente**, sin tocar el despachador
  que sirve a los ocho tipos.
- **Retiró DOS guardas en vez de reescribirlas para que pasaran**: *«lo que afirmaban ya no es lo
  que el componente hace»*.
- **Y retiró una defensa por honestidad** al medir que no se podía romper con una mutación. **Van
  cuatro defensas inalcanzables declaradas en esta cadena.**
- **Sus sondas se contradijeron con sus censos media docena de veces y ganó el censo siempre.**

---

## LAS DECISIONES DEL OPERADOR, TODAS SOBRE DIBUJOS

| | |
|---|---|
| **C** — dos ejes **y** la rama | sobre tres salidas; A y B le obligaban a elegir entre dos cosas que quiere |
| **A** — solo el insertor | la B pedía divergir de Web y tocar el contrato |
| **«Rótulo» fuera del formulario** | sin retirarlo del contrato |
| **Mover el ancla del número** | primera vez en la cadena que un ancla se mueve a petición |
| **El círculo como tratamiento** | dejar de igualar números y usar la misma pieza |

---

## VERIFICADO POR LA CABINA AL CIERRE

**Cero de 63 árboles movidos en el neto de las nueve rondas** —los dos que se movieron en la 7
volvieron en la 8—. **Web sin tocar en ningún momento.** **Ningún campo retirado de ningún
contrato.** Y los cuatro casos del esquema comportándose como se aprobó.

---

## ABIERTO, Y ESCRITO PARA SOBREVIVIR AL REINICIO

En `QA/temp/RUN-CANTU-SLIDE-SPLIT-FOURTH-SHAPE-001/PACKET-CIERRE.md`:

- **Los TRES componentes con la trampa de la cadena vacía** — `card.variant`,
  `callout.accentColor`, `rule.accentColor`.
- **La salida 2**: que la celda pinte número **y** rótulo, como Web.
- **El recorte de la fila 4 y el agujero del motor de ajuste**, con sus **150–405 px**.
- **Las seis divergencias con Web.**
- **Las cuatro defensas inalcanzables.**
