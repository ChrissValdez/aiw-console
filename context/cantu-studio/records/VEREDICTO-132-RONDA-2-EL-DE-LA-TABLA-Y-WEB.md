# VEREDICTO DE QA — `#132` «Tabla», ronda 2

> Recogido por la cabina el **2026-08-23**. El operador es Christopher Valdez Cantu.
> **Veredicto por captura y dictado. CUARTO turno consecutivo sin QA paso a paso** sobre
> esta superficie, y se declara.

---

## EL VEREDICTO, VERBATIM

> la tabla wb sigue teniendo
> con descripcion y sin descripcion
>
> ademas, en slide cuando oculto el panel, mira como no se distribuye bien el espacio de los comandos de etiquta
> deberia cuando expando leerse bien los 3
>
> Ademas..  jusot eso no queria que agregara un color extra,
> el color de "el de la tabla"
> es confuso de nuevo
> que automaticamente cuando agrego una fila escoga el de la tabla
> pero es o uno de la lista o el persoanlizado, no tiene que agregar uno que diga "el de la tabla"
>
> en el siguiente ticket arregla todo incluido el de web
> en el mismo ticket aunque no abramos el run del table web porque es un arreglo rapido

**Dos capturas:** la fila de Web con el desplegable «Con descripción» todavía puesto, y la
fila de diapositiva con `ETIQUETA` · `COLOR DE ETIQUETA` («El de la tabl», truncado) ·
`ESTILO` («Sólida»).

---

## LA INSTRUCCIÓN DE ALCANCE, Y CÓMO SE HONRA SIN MENTIR

El operador pide **un solo ticket que incluya Web**, y **explícitamente pide NO abrir el
run de la tabla de Web**. Se hace como dice.

> **Y se declara, aquí y en el `closeout`: la corrección de Web NO ES DE ESTE RUN.** El
> `run_id` dice `SLIDE-TABLE`. Viaja en este encargo por instrucción escrita del operador
> del 2026-08-23, para que ningún record futuro pueda leer que `#132` tocó Web por su
> cuenta. Se corrige hacia adelante, no se disimula.

---

## LO MEDIDO ANTES DE ESCRIBIR EL ENCARGO

### 1 · «El de la tabla» ES `emptyStateLabel`, Y NO ES DE «TABLA» SOLA

`emptyStateLabel` es una prop **opt-in y apagada por defecto** de la pieza compartida
`VariantSelect`. Medido: quien la enciende hoy es

| dónde | rótulo |
|---|---|
| `SlideTableFields.jsx:389` | **«El de la tabla»** |
| `WebBlockEditor.jsx:1330` | **«Automático»** |
| `WebBlockEditor.jsx:3391` | **«Automático»** |
| `WebBlockEditor.jsx:6246` | **«Automático»** |

> **La objeción del operador es que un desplegable de COLOR no debe tener una entrada que
> no es un color. Esa objeción se aplica palabra por palabra a los tres «Automático» de
> Web.** Y «Automático» es exactamente el rótulo que él ya mandó retirar DOS VECES del
> control de tamaño, con la queja citada en el propio código.
>
> **Se NOMBRA, no se abre.** Retirar «El de la tabla» de la llamada de «Tabla» es local y
> seguro. Tocar la prop en `VariantSelect` rompería cuatro llamadores. Y si los tres de Web
> deben caer, es decisión suya.

### 2 · LA SEMILLA PUEDE LEER EL COLOR, Y HAY QUE LEER EL CORRECTO

Medido en `SlideTableFields.jsx`:

- `colorDelBloque` (línea 156) — `useWatch` sobre `${itemName}.accentColor`. **El valor
  CRUDO: token de paleta o hex.**
- `acentoDeLaTabla` (línea 160) — **el hex ya RESUELTO**.
- `filaDeTablaNueva()` (línea 131) siembra hoy `badgeColor: ''`, y se llama en la línea 290
  donde **las dos variables ya están en alcance**.

> **La semilla tiene que llevar `colorDelBloque`, NO `acentoDeLaTabla`.** Sembrar el hex
> resuelto congela el color: si el autor cambia su paleta global, ese badge deja de
> seguirla. Es la forma exacta del defecto del tono que no coincide y del `fallbackId`,
> los dos ya abiertos.

**Y de paso cierra la trampa de la cadena vacía** para las filas de tabla: `badgeColor: ''`
deja de nacer.

### 3 · EL CASO QUE NADIE HA DECIDIDO: LA TABLA SIN COLOR

`accentColor` es **opcional**. Si el autor no ha elegido color de tabla, `colorDelBloque`
está vacío y **no hay nada que sembrar** — que es precisamente el agujero que la ronda 1
tapó inventando «El de la tabla».

**Retirar el rótulo sin resolver este caso devuelve el defecto original**, y hay que
decidirlo mirando, no en el taller.

---

## LO QUE SIGUE SIN RESPUESTA

1. **Los dos árboles del corpus** — la red sigue roja y **bloquea el cierre del run**.
2. **«Anatomía de fórmula»** — pedido cuatro veces; acumula tres carencias.
3. **La diapositiva «ANATOMÍA VISUAL»** del operador, que el taller dice haber restaurado
   verbatim y **que la cabina NO PUEDE VERIFICAR**: el buffer del editor no vive en el
   montaje. Marcado, no afirmado.
