# DECISIÓN DEL OPERADOR — la válvula de escape se mide antes de construirse

**Fecha: 2026-09-15** · **Origen:** el operador la pidió para desbloquear el hilo de LECCIONES
**Estado: RUN PENDIENTE DE INSERTAR.** `#195` está `active`; una escritura estructural con un
encargo en vuelo no se hace. Se encola en cuanto cierre.

---

## Lo que dijo, VERBATIM

```
hay algo que quiero crear y necesito tu ayuda con esto
es una insercion vital para el hilo de cantu lessons
se trata de algun compoentne tanto en web o slide (para insertar html o algun aforma
de insertar diseños personalizados para el creador de lecciones)
Despues si queda bien re evaluamos si conviene lo que inserto implementar un nuevo
compoentne ya mas formalmente o si fue un caso demasiado aislado para que amerite un
componente
pero esoo da flexibilidad sin perder lo que tenemos hecho que opinas de esto?

  -> «Run de análisis con parada, primero (recomendada)»
```

---

## Lo que la idea acierta, y hay que decirlo antes que los riesgos

**Convierte «¿hace falta un componente?» de una adivinanza en una medición.** Es el principio del
piloto de `#176` —*«un contrato no se congela sin haberse estrenado»*— aplicado a la autoría. Con
**886 lecciones** por delante van a aparecer casos que ningún componente cubre, y **sin válvula
cada uno se convierte en un run**. Eso no escala, y el hilo de LECCIONES lo va a chocar pronto.

---

## ⚠ YA EXISTE MEDIA VÁLVULA, Y ESTÁ ROTA

Es la deuda nombrada dos veces en esta sesión, medida contra disco:

| | |
|---|---|
| el motor de diapositiva | **la pinta** — `case 'html'` en `renderColumnsSlide.js:144` |
| el selector de componentes de celda | **no la ofrece** |
| `SlideItemSchema` | **sin miembro `html`** — «Insertar JSON» la rebota |
| `compileSlideItem` | **LANZA** — `[Compiler] Slide item no soportado: html`, `compiler.js:3889` |

**Corpus: dos usuarios, los dos ficheros de Core escritos a mano, cero en los ocho fixtures.**

Construir una segunda válvula al lado dejaría **dos puertas traseras medio abiertas en vez de una
bien hecha**. Y esa ambigüedad ya cobró una vez: **produjo una frase falsa en un documento de
referencia** —«plain bullets are only reachable via the raw `html` cell»— que sobrevivió hasta que
`#193` la midió. Mientras el motor la pinte y el compilador la rechace sin que nadie declare cuál
manda, **el siguiente que lea el motor volverá a escribir que existe un rodeo que no existe.**

---

## Tres riesgos medidos, para que no se descubran con una lección puesta

**1 · Las cuatro puertas.** Este proyecto gastó **cinco runs** en que editor, teclado, importación
y esquema hablen **una sola lista** de comandos permitidos, con tres guardas atadas. **Un paso de
HTML crudo es un agujero que las atraviesa las cuatro a la vez.** No es razón para no hacerlo; es
razón para que tenga **su propia puerta**, no ninguna.

**2 · Moodle.** Las lecciones exportan a HTML de Moodle, que tiene **su propio sanitizador**. Lo
que se vea bien en la Previa Real puede no verse en Moodle — y eso lo descubre **el alumno**, no
el autor.

**3 · La migración.** Una lección con HTML a mano queda **congelada**: el día que ese patrón se
convierta en componente, los bloques de HTML **no se actualizan solos**. Con 886 lecciones eso se
acumula en silencio, y es la misma clase de deuda que los punteros planos que costaron cuatro runs.

---

## La pregunta que puede reducir el problema a la mitad

**¿Cuánto de lo que quiere ya lo hace «Recurso visual»?** Acepta SVG y **ya está protegido**:
`isSafeSvg` exige un solo `<svg>`, con tags y atributos permitidos, y **rechaza scripts, HTML,
eventos, URLs externas y `data:text/html`**. Si buena parte de los «diseños personalizados» son
gráficos, la mitad está hecha **y con la puerta puesta**.

---

## EL TEXTO DEL RUN, redactado y pendiente

**`run_id`:** `RUN-CANTU-AUTHOR-ESCAPE-HATCH-ANALYSIS-001`
**`title`:** `Measure what an author escape hatch would have to be`

**`full_description`:**

> 🛑 **PARADA DE ANÁLISIS. ESTE RUN NO CONSTRUYE NADA Y NO ESCRIBE UNA LÍNEA DE CÓDIGO DE
> PRODUCCIÓN.** La instrucción va dentro del run y no en el chat, a propósito: cuando la cola
> llegue aquí, la cabina **no encadena** — mide el terreno y lleva el encuadre al operador.
>
> El operador quiere una válvula de escape para que el autor de lecciones inserte diseños que
> ningún componente cubre, y luego decidir **contando** si alguno merece convertirse en
> componente. La idea es buena y el orden es lo que este run protege: **medir antes de abrir una
> puerta que atraviesa cuatro guardas.**
>
> **QUÉ HAY QUE MEDIR, y cada cosa con su número:**
>
> **(a) QUÉ PASA HOY CUANDO UN AUTOR SE TOPA CON UN MURO A MITAD DE LECCIÓN.** ⚠ **NO midas
> "qué necesita que no exista": esa pregunta es incontestable por construcción y pedirla sería
> pedir lo imposible.** El operador lo dijo con estas palabras: *«no sé qué ocupo hasta que al
> crear las lecciones me lo topo; pero actualmente si el componente no lo hace, no hay manera de
> insertarlo a mitad de una lección»*. Lo medible es el **muro**, no la demanda. Mide: ¿existe
> HOY algún campo, en Web o en Slide, que deje pasar contenido de autor **sin escapar** — una
> `narrative`, una celda de tabla, cualquier cosa? Si lo hay, la válvula existe a medias en más
> sitios de los dos que ya conocemos, y eso cambia la respuesta entera. Si no lo hay, queda
> demostrado que **la lección se para**, que es el hecho que sostiene todo esto.
>
> **(b) Qué NO cubre «Recurso visual», y dilo en corto.** Acepta SVG con `isSafeSvg` puesto, y
> sirve para gráficos. **NO sirve para prototipar maquetación** — el propio operador lo corrigió:
> un prototipo de tabla no es un gráfico. No lo cuentes como cobertura parcial; la cabina ya lo
> estiró una vez y se equivocó.
>
> **(c) Qué costaría terminar la celda `html` que ya existe** — esquema, selector, compilador y
> puerta de importación — frente a construir un componente nuevo al lado. **Son las dos opciones
> reales y el run las compara; no elige.**
>
> **(d) Qué hace Moodle con HTML ajeno.** Su exportación pasa por un sanitizador propio. Mide qué
> sobrevive y qué no, **conduciendo el export**, no leyendo documentación.
>
> **(e) Qué se rompe de las cuatro puertas.** Enumera, una por una, qué validación deja de
> aplicarse cuando un bloque lleva HTML crudo, y qué guarda atada lo detectaría — o no.
>
> **(f) El coste de migración.** Si mañana un patrón se vuelve componente, ¿qué pasa con las
> lecciones que ya lo escribieron a mano? Mide si hay forma de detectarlas, y si la hay, cuál.
>
> **(g) LA TERCERA SALIDA, que hoy no se puede ni considerar.** El operador la nombró con su
> ejemplo: *«ya que quede bien definimos si conviene hacer un nuevo componente, o incluso ajustar
> el componente de tabla para que sea compatible con este nuevo diseño»*. **Ajustar un componente
> existente** es a menudo más barato que crear uno, y hoy esa opción no llega nunca a evaluarse
> porque el prototipo no llega a existir. Mide qué haría falta para que un prototipo se pueda
> comparar contra el componente que más se le parece.
>
> **LO QUE EL RUN ENTREGA:** una recomendación con las cifras delante, y **el diseño de la válvula
> que de verdad sirva**. Que no es «meter HTML»: es una que **REGISTRE CADA USO CON NOMBRE
> OBLIGATORIO**. El flujo que el operador describe es prototipar, evaluar y promover, y **el paso
> de promover solo funciona si se puede AGRUPAR**: sin etiqueta, cuarenta inserciones repartidas en
> lecciones no distinguen nueve intentos de la misma idea de nueve ideas distintas. Con etiqueta,
> «apareció 9 veces en 6 lecciones» es una consulta; sin ella, es acordarse — y acordarse es cómo
> se escribieron los mapas paralelos que esta sesión lleva cinco runs desmontando. **El registro no
> es un extra del diseño: es lo que convierte una válvula en evidencia.**
>
> **PARA Y REPORTA** en cuanto tengas las seis, sin construir nada. Y si alguna medición desmiente
> el encuadre —por ejemplo, si la demanda de (a) resulta cubierta por lo que ya existe—, **eso vale
> más que el entregable**.

**Modelo y esfuerzo cuando se emita:** Opus · Alto · sesión nueva.

---

## PARADA DE ANÁLISIS DEL 2026-09-15 — lo que el operador imaginó, y el requisito que puso

Surgió a mitad de `#197`, midiendo la guarda de HTML en prosa, y **es la conversación que
convierte este run de una idea en un encargo con requisitos**. Se escribe aquí porque en el
chat se pierde.

### Cómo lo imagina, en sus palabras

> *«si quiero poder insertar html de forma libre y a gusto… quisiera que fuera insertando json
> (quizás dentro de un campo de json como bloque html) y lo que me imagino es un componente que
> tal cual sea un campo que me permita ahí pegar html libremente»*

### ⚠ EL ARGUMENTO FUERTE, Y NO ES «FLEXIBILIDAD»

**Lo que hace peligrosa la prosa no es el HTML: es que nadie puede distinguir dos cosas.** Un
`<br>` en una descripción puede ser «el autor lo quiso» o «nadie lo impidió», y **desde fuera se
ven idénticos**. Por eso `#197` cierra esos campos: no porque el HTML sea malo, sino porque ahí
**es indistinguible de un accidente**.

**Un bloque de HTML declarado invierte exactamente eso.** El autor lo eligió, tiene nombre, sale
en el JSON, sale en el editor y **se puede censar**. El mismo marcado que es un agujero en una
descripción es **una decisión visible** en un bloque que se llama «HTML».

**Y de ahí sale lo que no es obvio: cerrar la prosa hace esta válvula MÁS necesaria, no menos.**
Los dos runs son complementarios y en este orden — primero la puerta, después la válvula.

### Tres cosas de diseño, medidas

1. **Bloque con nombre propio, no campo escondido dentro de otro.** Todo su valor está en que se
   vea. Un campo enterrado lo vuelve invisible otra vez, que es el defecto que `#197` acaba de
   encontrar.
2. **No parte de cero: existe a medias.** El motor de diapositiva ya pinta `case 'html'`
   (`renderColumnsSlide.js:144`), pero el selector no lo ofrece, el esquema no lo admite y
   `compileSlideItem` **lanza**. En diapositiva es **terminar**; en Web es **construir**.
3. **La posición de seguridad se escribe, no se deja implícita.** Un bloque de HTML es un sitio
   donde la guarda de `#197` **deliberadamente no aplica**. Si no está dicho con su razón, dentro
   de seis meses alguien lo lee como un hueco más y lo tapa.

### La etiqueta obligatoria, y qué contestó el operador

La cabina propuso que cada bloque lleve **etiqueta obligatoria** —*«esto es mi prototipo
`tabla-v2`»*— para que «¿esto merece componente?» se conteste **contando y no recordando**, y
nombró como riesgo que un bloque de HTML no se migra solo.

**Él reencuadró el riesgo, y su reencuadre es mejor:**

> *«cuando se crea un componente nuevo es para replicar digamos tabla-v2, entonces ahí lo recreo
> y borro el html viejo. Eso no es grave. Lo que sí es grave es que insertar un html cuando
> compile mi js a json y eventualmente se genere el html final truene la lección.»*

**La migración no es el riesgo: él recrea y borra.** El riesgo es **que la lección no se
construya**.

### ⚠ EL REQUISITO QUE ESE REENCUADRE IMPONE, con lo medido

**Lo que NO puede pasar si el bloque se admite bien:** `compileSlideItem` lanza hoy con `html`,
pero **porque el tipo no está admitido**, no porque el HTML le haga daño. Admitirlo de verdad
elimina ese fallo.

**Lo que SÍ puede pasar, y es más silencioso y peor.** Medido: el motor hace
`content = col.content || ''` y lo mete **crudo en una plantilla de texto**. **No parsea:
concatena.** Entonces:

- Un `<div>` **sin cerrar** no lanza nada y **se traga el resto de la diapositiva**. El compilador
  dice que todo fue bien y la página sale rota.
- Un `</section>` de más **cierra algo que el autor no abrió**.
- Un `<style>` sin cerrar se come el resto como CSS.

**LA FORMA DE LA GUARDA, Y ES LA RESPUESTA A SU REQUISITO: se valida la FORMA, no el
CONTENIDO.** Etiquetas balanceadas, nada que cierre lo que no abrió, nada que se escape de su
contenedor. Se comprueba **al guardar**, se lo dice **antes de compilar**, y **no le limita el
diseño en absoluto**: sigue pudiendo pegar cualquier tabla, cualquier `<style>`, cualquier
maquetación. **Segunda red barata:** que el motor **envuelva** el bloque en un contenedor propio,
para que un HTML mal formado se quede en su celda en vez de derramarse.

**Requisito, no sugerencia:** *el bloque de HTML no puede romper la construcción ni derramarse
fuera de su contenedor, y eso se garantiza con una guarda de FORMA, no de contenido.*

### La decisión que queda abierta y se le traerá con la medición delante

**Qué pasa con `<script>`.** Balancear no dice nada de si se ejecuta. Un bloque declarado de HTML
es a la vez **el sitio donde tendría más sentido permitirlo** y **el sitio donde más cuesta si
sale mal en Moodle**. No se decide aquí.

---

## Lo que la cabina opinó, y queda escrito porque el operador lo pidió

Que la idea es correcta y el momento de construirla no. Que **terminar la válvula que ya existe a
medias es mejor que poner otra al lado**. Y que el valor de la válvula no es la flexibilidad: es
**la evidencia que produce**. Una válvula que no registra sus usos da lo primero y no da lo
segundo, y entonces dentro de un año la pregunta «¿esto merece componente?» se contestará de
memoria — que es exactamente cómo se escribieron los mapas paralelos que esta sesión lleva
desmontando.
