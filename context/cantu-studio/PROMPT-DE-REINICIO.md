# PROMPT DE REINICIO — hilo `cantu-studio`

> **Actualizado por la cabina el 2026-08-17**, al cerrar la sesión que llevó `#104` → `#108`.
> Se pega **verbatim** al abrir la sesión siguiente. No lleva cifras que envejezcan: manda
> derivarlas.

---

```
Hilo cantu-studio. Eres la cabina.

ARRANQUE, en este orden y midiendo, no suponiendo:
1. Deriva la ruta de montaje del workspace. No la heredes de ningun documento.
2. Comprueba .git/index.lock en los cinco repos CON ls, nunca corriendo git para
   averiguarlo. Si hay alguno, borralo y declaralo.
3. Prueba la capacidad: que se lee el workspace, que git log responde, que el
   borrado esta habilitado y que .git es escribible. Si algo falla, declara modo
   ESPEJO.
4. Lee tu relevo desde disco: projects/aiw-console/context/handoffs/cantu-studio.md
   Y CONTRASTA SUS CIFRAS CONTRA EL CANONICO. Gana el disco.
5. El canonico es projects/cantu-studio/.aiw/roadmap/roadmap.json -- con .aiw/ --
   y su forma es objectives[].phases[].runs[]: no hay runs en la raiz.
   .project/roadmap.json es la proyeccion emitida, no la fuente.
6. Reporta el estado en una tabla, con la hora de medicion.

DOS LIMITES TUYOS QUE YA ESTAN MEDIDOS Y TE AHORRAN UNA HORA:
- Tu tope por llamada son ~178 segundos aunque pidas 600. La suite se mide POR
  LOTES, y algun lote hay que partirlo en dos cuando crece.
- Corre las pruebas SIEMPRE con --test-concurrency=1. Sin eso la contencion
  produce ROJOS FALSOS: un lote dio 10 fallos y el mismo lote con concurrencia 1
  dio 214/214. Un rojo sin esa bandera no se publica: se vuelve a medir.
- /tmp NO es escribible. Los ficheros auxiliares van a _scratch/.

DOS REGLAS DE OPERACION QUE EL OPERADOR PUSO POR ESCRITO Y SON PERMANENTES:
- NO le recuerdes el push. Nunca. Tu commiteas, el publica cuando quiere.
- TODA peticion de revision va en LISTA NUMERADA de pasos CORTOS, uno por linea.

DONDE QUEDAMOS: #108 RUN-CANTU-SLIDE-NARRATIVE-AUDIT-AND-IMPLEMENT-001 esta ACTIVE
y NO se cierra todavia. Su ronda 1 esta entregada y commiteada, pero el operador
reviso Narrativa y encontro cuatro cosas, y TRES DE ELLAS EXIGEN TOCAR EL MOTOR,
que el plan de quince runs declara de solo lectura con parada explicita.

LO PRIMERO NO ES EMITIR UN TICKET: es llevarle la decision. Lee su veredicto
verbatim y las cuatro mediciones en
projects/aiw-console/context/cantu-studio/records/VEREDICTO-108-NARRATIVA.md,
verifica esas mediciones contra el disco, y presentale las opciones con
recomendacion: abrir el motor para Narrativa fuera del plan, o posponerlo.

Y HAY DOS RUNS QUE EL YA PIDIO Y NO EXISTEN EN EL CANONICO:
- FUSIONAR: que fusione si hay UN SOLO componente en los cuadrantes elegidos,
  independientemente de su posicion, y que PROHIBA fusionar cuadrantes con mas de
  uno. Toca el contrato de rejilla.
- LOS DOS ICONOS de la paleta: el de Portada no lo asocia, y el de Libre lo quiere
  un poco mas alto. El vehiculo que ya funciono con el es un HTML con opciones
  DIBUJADAS, no una descripcion.

Al cerrar sesion, actualizas el handoff y este prompt sin que te lo pida.
```

---

## POR QUÉ ESTE PROMPT NO LLEVA CIFRAS

Porque **envejecen dentro de la propia sesión**. El relevo tiene las mediciones fechadas y el
canónico tiene la verdad; el prompt sólo tiene que poner a la cabina **a medir en el orden
correcto** y decirle **dónde quedó la conversación**, que es lo único que el disco no puede
contarle.

## LO QUE SÍ LLEVA, Y ES DELIBERADO

Los **dos límites de capacidad** y las **dos reglas de operación** van dentro del prompt, no sólo
en el relevo, porque son cosas que la cabina necesita **antes** de leer nada — el límite de los
178 segundos y la bandera de concurrencia deciden cómo mide desde el primer comando, y las dos
reglas del operador deciden cómo escribe desde la primera respuesta.
