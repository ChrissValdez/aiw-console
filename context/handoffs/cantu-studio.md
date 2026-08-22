# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina el **2026-08-20**, al cerrar la sesión que llevó `#116` → `#130`.
> **Sustituye al relevo del 2026-08-18.**
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el canónico al abrir. Gana el
> disco.**

---

## ⚠ LO PRIMERO: DERIVA LA RUTA Y PRUEBA LA CAPACIDAD

La ruta de montaje **cambia entre sesiones**. No la heredes. Prueba que se lee el workspace, que
`git log` responde, **que el borrado está habilitado** y que `.git` es escribible.

**Comprueba `.git/index.lock` en los cinco repos con `ls`, nunca corriendo git.** Esta sesión
apareció **uno** en `cantu-quizzes-latex` sin que la cabina tocara ese repo. Lo borró y lo
declaró. **Compruébalo igual: no es teórico.**

### LOS LÍMITES DE LA CABINA, RE-MEDIDOS EL 2026-08-20

1. **EL TOPE POR LLAMADA SON ~178 SEGUNDOS.** Esta sesión lo tocó **cuatro veces**: la suite
   completa ya **NO CABE** en una llamada, y un `grep -r` sin excluir `node_modules` se lo come
   entero. **Las mediciones lentas van solas, y la suite completa la mide el taller.**
2. **`--test-concurrency=1` NO ES OPCIONAL.**
3. **EL BORRADO SE PIDE Y FUNCIONA.** Es por carpeta y persiste.
4. **`/tmp` NO ES ESCRIBIBLE.** Los auxiliares van a `_scratch/`.
5. **LOS MENSAJES DE COMMIT VAN POR FICHERO, NUNCA POR LÍNEA DE SHELL.** Pasó **DOS VECES** esta
   sesión: unas comillas invertidas se comieron una palabra. Las dos se enmendaron porque no
   estaban publicadas.
6. **NUEVO — LOS SCRIPTS AUXILIARES VAN POR FICHERO, NO POR HEREDOC.** Un heredoc con backticks
   o `${}` se rompe o se ejecuta. Pasó varias veces, a la cabina y al taller.

---

## ⚠⚠ LO QUE MÁS TE VA A DOLER SI NO LO LEES: LOS TRES FALLOS DE COMMIT

**TRES COMMITS DE ESTA SESIÓN SALIERON INCOMPLETOS**, y uno **dejó la rama sin compilar**:

| | qué faltó | consecuencia |
|---|---|---|
| `#126` | `SlideRuleMathField.jsx` | **un `import` a un módulo inexistente** |
| `#128` | `SlideSizeSelect.jsx` | un comentario mintiendo en el commit |
| `#129` | una guarda de Web | un recuento desactualizado |

**La causa fue siempre la misma:** `git add -u` sobre directorios, o una lista por nombre
**tecleada de memoria**. `-u` **solo escenifica modificaciones de ficheros ya seguidos: los
nuevos no los ve**.

**LA REGLA CORREGIDA, Y ES LO QUE HAY QUE HACER:**

    FILES=$(git --no-optional-locks status --porcelain | grep -vE "\.aiw/|\.project/" | awk '{print $NF}')
    echo "$FILES" | xargs git --no-optional-locks add

**La lista por nombre se DERIVA del `git status`, no se teclea.** Y los tres se detectaron
**midiendo el `git status` del run siguiente**, no revisando: **esa medición al abrir cada
entrega se ha pagado tres veces sola.**

---

## ⚠⚠ LA VÍA DE ESCRITURA DEL CANÓNICO ES LA CONSOLA

    cd projects/aiw-console
    PC_PORT=<libre> node project-console/serve.mjs > /dev/null 2>&1 &
    POST http://127.0.0.1:<puerto>/projects/cantu-studio/__project-console/roadmap/edit
      { op, args:{...}, apply:false }                    # dry-run -> remap + baseline
      { op, args:{...}, apply:true, baseline }           # compare-and-swap

**Levanta el servidor y haz el POST en la misma llamada.** `serve.mjs` re-emite los 7 artefactos
de `.project/` él solo.

**Nombres de argumento verificados:** `set-status` → `run`, `status`, `closeoutResult` ·
`set-text` → `targetType:"run"`, `targetId`, `fullDescription` · `insert` → `runId`, `title`,
`summary`, `fullDescription` + `before`/`after` · `move` → `run` + `toOrder`.

**El canónico es `.aiw/roadmap/roadmap.json`** — con `.aiw/`. Forma `objectives[].phases[].runs[]`.

---

## LAS SEIS REGLAS DE OPERACIÓN DEL OPERADOR — permanentes

**Todas tienen la MISMA FORMA: retiran de la respuesta trabajo que la cabina le pasaba a él.**

1. **NO SE LE RECUERDA EL PUSH.** Nunca.
2. **TODA PETICIÓN DE REVISIÓN VA EN LISTA NUMERADA DE PASOS CORTOS.** Uno por línea.
3. **NO SE LE RECOMIENDA MODELO NI ESFUERZO EN LA MISMA SESIÓN. PERO LA SESIÓN SE DECLARA
   SIEMPRE.**
4. **EL TICKET NO SE ANUNCIA: SE ENTREGA.**
5. **NUEVA (2026-08-18) — UN RUN NUEVO SE LANZA EN SESIÓN NUEVA; LAS RONDAS DE CORRECCIÓN, NO.**
   **El corte es el `run_id`, no el tamaño.** En sesión nueva SÍ van modelo y esfuerzo, porque
   ahí los elige. La cabina había degradado esto a decir «misma sesión» por costumbre.
   → `records/REGLA-SESION-NUEVA-POR-RUN-NUEVO.md`
6. **NUEVA (2026-08-18) — EL MATERIAL DE QA LO PRODUCE LA CABINA Y LO PRUEBA CONTRA LA PUERTA
   REAL.** Sus palabras: *«dame el json para los test no solo me digas que lo invente»*. Un
   material sin probar puede fabricar un rojo falso.

### Y DOS REGLAS DE FORMATO Y DE CIERRE (2026-08-20)

7. **UN TICKET NO PUEDE LLEVAR UNA VALLA DE CÓDIGO DENTRO DE OTRA.** La valla interior CIERRA la
   exterior y el operador ve el ticket cortado. **Pasó varias veces.** Salidas: **indentar con
   cuatro espacios**, o valla exterior de **cuatro** tildes. Y **releer el ticket entero buscando
   triples antes de enviarlo**.
   → `records/REGLA-FORMATO-Y-CIERRE-DE-SESION.md`
8. **AL CERRAR UN RUN CORRECTAMENTE, SI HAY SESIÓN LARGA DETRÁS, TOCA RELEVO**: handoff, prompt
   de reinicio, commits — y el operador reinicia.

---

## QUÉ SIGUE — lo primero al abrir

**CERO RUNS ACTIVOS al cerrar.** El siguiente es **`#131`**,
`RUN-CANTU-SLIDE-CONCEPTGRID-ADMIT-AND-IMPLEMENT-001` — «conceptGrid como componente de celda».
**Llega SIN NOMBRE DE AUTOR**, igual que llegó `split`.

**Contrasta contra el canónico al abrir. Al cerrar esta sesión: 153 runs, 131 completados,
densidad `1..153`, cero activos.**

**Quedan CUATRO componentes por admitir** —conceptGrid, Tabla, Cálculo aritmético— **y DOS tipos
de diapositiva por exponer** —Procedimiento matemático y Jerarquía.

---

## LO QUE ESTA SESIÓN CONSTRUYÓ, Y GOBIERNA TODO LO QUE VIENE

### 1 · EL PELDAÑO ES EL TECHO

**Decisión del operador del 2026-08-20, que SUSTITUYÓ a su propia decisión anterior.** Si cabe,
se pinta el peldaño; si no, **el texto baja hasta caber**; **y nunca sube por encima** —así
«Automático» no vuelve por la puerta de atrás—. **Suelo: 12 px. El aviso al autor pasa callado.**

**Y el acierto no es el algoritmo, es dónde vive:** `fitEngine.js` se inyecta desde **los dos
cascarones del documento** y **jamás desde `renderSlides()`**, que es lo que los 63 árboles
capturan byte a byte. Por eso encoge en pantalla **sin mover un solo árbol**.

**Agujero conocido:** no ve los recortes de contenido alineado abajo. El déficit se reporta como
**0** mientras se pierden **150–405 px**.

### 2 · EL CRITERIO DE LAS CINCO COSAS — hizo que una admisión costara UNA ronda en vez de cinco

Todo componente que se admita responde de una vez por: **tamaño anclado**, **armazón que
escala**, **color de la paleta global**, **icono del catálogo global**, y **saltos de línea**.
Y si alguna no aplica, **se declara midiendo** —la Regla declaró «icono: no aplica» tras medir
que no dibuja ninguno.

### 3 · LO QUE SE APLICA SIN VOLVER A PREGUNTAR

- **«Mediano» vale lo que la superficie pinta hoy** — salvo donde él mueva el ancla, y entonces
  se declara quién lo movió.
- **El color sale de la paleta global**, no de tablas fijas del motor.
- **Los rótulos los pone él.** Y **antes de proponer uno, se mira si el equivalente de Web ya lo
  tiene**: `split` se llamó «Tarjeta con desglose» hasta que él señaló que Web ya lo llamaba
  **«Explicación guiada»**.
- **El asterisco marca los obligatorios; los opcionales no llevan nada.**
- **Retirar del FORMULARIO no es retirar del CONTRATO.**

---

## LAS DOS LECCIONES CARAS DE ESTA SESIÓN, Y LAS DOS SON DE LA CABINA

### A · EL ENCUADRE EQUIVOCADO SOBREVIVE A REPARACIONES CORRECTAS

`#130` necesitó **NUEVE rondas**. **Cuatro arreglaron la capa equivocada** porque el encuadre de
la cabina apuntaba al formulario — y **todas aquellas reparaciones eran correctas**. El esquema
no se cuestionó **hasta que la cabina lo llamó directamente**, y bastaron **tres llamadas**.

**Y volvió a pasar una capa más abajo:** se arreglaron las **listas** vacías y no se miraron las
**cadenas** vacías, que tenían la trampa idéntica.

> **REGLA: cuando un defecto sobreviva a DOS reparaciones correctas, el encuadre está mal, no la
> reparación. Y la salida es llamar a la capa de abajo DIRECTAMENTE, no afinar la de arriba.**

### B · MEDIR CON LA HERRAMIENTA EQUIVOCADA PRODUCE UN VERDE

La cabina recomendó igualar el tamaño del número **comparando un DISCO RELLENO con un TEXTO
PELADO**. Las proporciones quedaron iguales y **lo que se ve, no**.

> **REGLA: un tamaño percibido no es un tamaño de fuente. Compara TRATAMIENTOS, no números.**

---

## LO QUE HAY QUE SEGUIR EXIGIENDO AL TALLER, PORQUE RINDE

- **EL ARNÉS DE MUTACIÓN.** Esta sesión desmintió **premisas de guardas** —un `.strict()` que no
  existía—, cazó **guardas verdes con huecos reales**, y **retiró cuatro defensas inalcanzables**
  en vez de fingirlas.
- **CONDUCIR, NO LEER.** El formulario se conduce **en navegador con efectos**; el CSS heredado
  miente; un párrafo vacío no se ve en el marcado.
- **QUE LA SONDA SE CONTRADIGA CON EL CENSO Y GANE EL CENSO.** Pasó una docena de veces.
- **DECLARAR QUÉ PRUEBA CADA GUARDA: el mecanismo o la pantalla.** Lo aprendimos cuando la QA
  humana desmintió a una sonda sin efectos.
- **RETIRAR UNA GUARDA EN VEZ DE REESCRIBIRLA PARA QUE PASE**, cuando lo que afirmaba ya no es
  lo que el componente hace.

---

## LA SUITE

    node --test --test-concurrency=1 "tools/author-lite/compiler-api/tests/*.test.mjs" \
      "tools/dev/tests/*.test.mjs" "tools/roadmap/tests/*.test.mjs"

**Al cerrar: `1852 · 1847 pasan · 5 fallan`.** Los cinco son previos, todos en
`tools/roadmap/tests/`, por una **dependencia huérfana del canónico** —
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` → un run que no existe— más
`clearProgress` y el centinela `C5`. **Ninguno se toca.**

**LA CABINA NO PUEDE MEDIRLA: excede su tope por llamada.** Mide subconjuntos y declara que la
cifra completa es del taller.

---

## ABIERTO Y SIN DUEÑO — todo nombrado, nada reparado

- **EL RECORTE DE LA FILA 4 Y EL AGUJERO DEL MOTOR DE AJUSTE**, con sus 150–405 px. **Es del
  mecanismo, no de un componente.**
- **EL VÍDEO EN SU CELDA:** franjas 16:9, huella mínima o recorte. **Un vídeo no encoge de letra.**
- **TRES COMPONENTES CON LA TRAMPA DE LA CADENA VACÍA:** `card.variant`, `callout.accentColor`,
  `rule.accentColor`.
- **LAS 16 MEDIDAS DE ARMAZÓN** en píxeles fijos que el triaje nombró, **12 de ellas de la
  Tarjeta**.
- **QUE LA CELDA DE «Explicación guiada» PINTE NÚMERO Y RÓTULO** como Web.
- **LAS SEIS DIVERGENCIAS CON WEB** de ese mismo componente.
- **LAS CUATRO DEFENSAS INALCANZABLES** declaradas.
- **QUE LA PROSA DE DIAPOSITIVA NO RECHACE HTML** —el esquema lo acepta; el compilador escapa por
  el camino del autor.
- **`bulb` ya no pinta un libro**, pero **un comentario falso quedó en los dos gemelos** del
  esquema.
- **«Extra grande» contra «muy grande»**, que sigue siendo suyo.
- **`CLAUDE.md` describe un árbol `docs/author-lite/` que NO EXISTE.**

---

## LA SUPERFICIE QUE SOLO JUZGA SU OJO

**El proyecto no tiene renderizador de React y la cabina no ve interfaces.** Esta sesión lo
demostró de la forma más cara posible: **la QA humana desmintió a una sonda que el propio taller
había declarado ciega**, y hicieron falta cuatro rondas más.

**Y por eso él pidió que se le DIBUJEN las opciones antes de decidir.** Cuando se le dibujó,
decidió en una línea. Cuando se le describió, hubo que volver.
