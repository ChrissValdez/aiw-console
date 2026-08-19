# VEREDICTO 120 — la Tarjeta emparejada · Y EL VIRAJE QUE EL OPERADOR ORDENÓ DESPUÉS

> Run: `RUN-CANTU-SLIDE-CARD-FIELD-SIZE-PAIRING-001` · `queue_order` 120 al escribir.
> Veredicto del operador **Christopher Valdez Cantu**, **2026-08-18**, tras abrir Cantu Studio
> en su máquina y revisar el formulario de la Tarjeta en sus cuatro familias.
> Transcrito por la cabina **VERBATIM**.

---

## SUS PALABRAS, ÍNTEGRAS

```
se ve bien, lista no puedo verlo porque aun no habilitamos el compoentne

ahora... vamos a  enfocarnos en habilitar lso componentes que faltan, antes d ehcaer
cosas que afectan componentes aun no habilitados
```

---

## PARTE 1 — EL VEREDICTO DEL RUN: PASA

**La Tarjeta pasa en sus cuatro familias.** Cada control de tamaño quedó junto a su campo.
La decisión que quedaba abierta —que en «Cita» el Tamaño quede **encima** de «Apagar (Modo
Foco)»— **queda aceptada por el «se ve bien»**, no por palabras suyas. Es vetable y barato: es
colocación, ninguna prueba la clava.

**Y confirma, por segunda vez y sin que se le preguntara, que la Lista con etiquetas sigue
invisible para él.** No es una queja incidental: es la premisa de lo que ordena a continuación.

---

## PARTE 2 — LA SEGUNDA MITAD ES UNA ORDEN DE PRIORIDAD, Y CAMBIA LA COLA

> *«vamos a enfocarnos en habilitar los componentes que faltan, antes de hacer cosas que
> afectan componentes aún no habilitados»*

**Es una decisión de orden de ejecución, y de las que más pesan, porque no es una preferencia:
es un diagnóstico correcto de un defecto que este proyecto lleva pagando.**

### La evidencia que le da la razón, y está medida en este mismo repo

| Run | Qué le pasó |
|---|---|
| `#116` | Dio a «Lista con etiquetas» su escala de texto. **La mitad de su QA no se pudo mirar**: el operador no podía insertar el componente. La deuda se aparcó |
| `#119` | Escribió la regla de colocación. Cerró **sin QA visual** — el hueco llegaba vacío |
| `#120` | Emparejó la Tarjeta. **Volvió a nombrar la Lista como no verificable** |

**Tres runs seguidos produciendo trabajo sobre superficies que el autor no puede ver.** Cada uno
dejó una deuda que hay que volver a abrir después. **El operador está diciendo que se deje de
generar esa deuda antes de generar más.**

### El principio, escrito como regla

**NO SE TRABAJA SOBRE UN COMPONENTE QUE EL AUTOR NO PUEDE INSERTAR, SALVO QUE EL PROPIO RUN SEA
EL QUE LO HABILITA.**

Su razón operativa: un cambio sobre un componente contenido **no se puede juzgar**, así que su
QA nace parcial y su verificación se aplaza. Y su razón económica: **cuando el componente se
habilite, su formulario se rehace**, y buena parte de lo escrito antes se toca otra vez.

**Corolario, y es el que evita el error simétrico:** una vez habilitado, aplicarle las
convenciones ya escritas **no es trabajo duplicado**, es trabajo que por fin se puede mirar. Las
reglas escritas —la escalera anclada en «Mediano = lo de hoy», la colocación del control— **no
se rehacen: se aplican**, y ahora con ojo humano detrás.

---

## LO QUE ESTE VEREDICTO ORDENA HACER A LA CABINA

1. **Medir qué componentes siguen contenidos**, contra el disco y no contra el plan.
2. **Medir qué runs de la cola tocan componentes que el autor no puede insertar hoy.**
3. **Proponer la reordenación con el `remap` del dry-run**, y no aplicarla hasta que el operador
   vea qué se mueve.

**No se reordena por costumbre ni por este documento: se reordena midiendo.**
