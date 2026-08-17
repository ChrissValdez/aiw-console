# VEREDICTO DEL OPERADOR — `#108` Narrativa, y un defecto de FUSIONAR

> **Recogido por la cabina el 2026-08-17.** El operador revisó Narrativa y encontró cuatro cosas
> del componente más una quinta que **no es de este run**.

## SUS PALABRAS, VERBATIM

    tengo varios feedabkcs de narrative

    primero deberia poder cambiar el tamaño del titulo y el tamaño del texto por separado
    deberia tener 4 tamaños como siempre
    chico, mediano, grande muy grande

    el texto si tiene ese control pero el titulo no
    el titulo tiene un "tipo de narrativa" con dos tamaños y nada amigables

    ademas el boton d ecnetrar verticalmente le doy click y no hace nada
    no se que probelma tiene

    ademas, no tengo control del espciado entre el titulo y el parrafo y eso me da algo de ruido quisiera tener un boton para controlar el spacing

    Y
     otro problmea que encontre, es el de fusionar

    para fusionar tengo que posicionar el componente que quiero expandir en la esquina superior isquierda de lo que voy a fusionar
    Y quisiera que si escogo un 3 cuadrantes a fusionar y solo existe un comopnente ahi independientemente de la posicion me los fucione y en ese nuevo espacio caiga el componente

    lo que no debe dejar es fusionar cuadrantes en los que exista mas de un componente adentro

    eso es lo que encontre en narrativa
    y el error que encontre de fusionar

---

## LO MEDIDO POR LA CABINA AL RECIBIRLO — y decide el encuadre

### 1 · Tamaño de título independiente — **EXIGE TOCAR EL MOTOR**

Medido en `src/builders/slides/components/renderNarrative.js`: **sólo el CUERPO lee `textSize`**
(`resolveSlideTextSize` → `font-size` inline). Los títulos son **CSS fijo** dentro del bloque de
estilos del componente: `.j-lead-title` a **2.8rem** y `.j-narrative-header` a **1.8rem**.

**No hay hueco de esquema que abrir: no existe la capacidad.** Darle cuatro tamaños al título
significa **cambiar el motor**.

### 2 · «Tipo de narrativa» no es un control de tamaño, y por eso no le resulta amigable

`narrativeType` **cambia la variante entera**: clases distintas, título distinto **y** tamaño de
cuerpo base distinto. El operador lo está leyendo como «el tamaño del título», que es lo que
parece en pantalla. **No es un defecto del run: es que el control que él quiere no existe y el
único parecido hace otra cosa.**

### 3 · El espaciado título↔párrafo — **TAMBIÉN ES DEL MOTOR**

Fijo en la hoja del componente: `margin: 0 0 1.5rem 0` en la variante `lead` y
`margin-bottom: 0.8rem` en la estándar. **Ningún campo lo alcanza.**

### 4 · «Centrar verticalmente» no hace nada — DEFECTO REAL, y la causa NO es la obvia

**La cabina se equivocó a mitad del diagnóstico y se corrige antes de publicarlo:** primero midió
que `getGridPositionStyles` sólo compone `grid-row`/`grid-column` y **concluyó que el motor tiraba
el dato**. **Es falso.** Medido después: el envoltorio de columna
(`renderColumnsSlide.js:208-210`) **sí** pinta `col.style` como `extraStyle`, y el compilador
(`compiler.js:2456`) **sí** emite `style: 'align-self: center;'` cuando `centerVertical` está
activo.

**Los dos extremos de la cadena funcionan, así que el fallo está en medio.** Hipótesis a medir
por el taller, **sin dar ninguna por buena**:

- que el **esquema no admita `centerVertical` en el ítem narrativa**, sólo en la tarjeta, y el
  dato no llegue nunca al compilado;
- que el editor lo escriba en una ruta que el compilador no lee;
- que llegue y se pinte, pero algo dentro del componente lo anule visualmente.

### 5 · FUSIONAR — **NO ES DE ESTE RUN Y NECESITA EL SUYO**

Dos peticiones distintas, y la segunda es una **restricción**, no una comodidad:

- **Hoy** hay que colocar el componente en la **esquina superior izquierda** del área a fusionar.
  Él quiere que, si en los cuadrantes elegidos hay **un solo componente**, se fusione
  **independientemente de dónde esté** y el componente caiga en el espacio nuevo.
- **Y que NO deje fusionar** cuadrantes que contengan **más de un componente**.

**Toca el contrato de rejilla y su fusión**, que los cinco runs anteriores declararon fuera de
alcance y de sólo lectura. **Run propio.**

---

## CONSECUENCIA PARA `#108`: NO SE CIERRA

**Tres de las cuatro peticiones de Narrativa exigen cambiar el motor**, que el plan de quince
runs declara **de sólo lectura** en su bloque de frontera compartido, con parada explícita.
**El run se queda `active`** y lo primero de la sesión siguiente es llevarle al operador la
decisión: abrir el motor para Narrativa —fuera del plan— o posponerlo.

**Lo entregado en la ronda 1 no está en cuestión** y el operador no lo desmintió: `narrativeType`
entra por contrato, con sus dos nombres y su red.
