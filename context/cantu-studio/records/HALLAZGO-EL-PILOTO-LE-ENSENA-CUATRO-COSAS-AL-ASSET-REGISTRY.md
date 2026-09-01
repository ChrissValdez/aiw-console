# HALLAZGO — lo que el piloto le enseña al Asset Registry

**Fecha:** 2026-09-01 · **Origen:** `RUN-CANTU-SLIDE-STACK-SCRIPT-ONCE-001` (`#174`), cerrado
**Destino:** `RUN-JAME-ASSET-REGISTRY-DESIGN-001` y `RUN-JAME-CTX-ASSETS-CONTRACT-001`
**Autoría de las mediciones:** el taller de `#174`. Verificadas contra disco por la cabina donde
se indica.

---

## Por qué existe este record

El run se programó **antes** del diseño del registro precisamente para que el diseño se hiciera
contra un caso real. **Esa apuesta rindió:** cuatro de los cinco hallazgos de abajo no se
habrían encontrado razonando sobre el registro en abstracto, y tres de ellos **contradicen lo
que un contrato general habría asumido**.

## La unidad de reparto no fue el componente: fue el fichero más una guarda `||`

No hizo falta ámbito de documento ni registro compartido. La forma que funcionó:

    window.CANTU_STACK_PROCEDIMIENTO = window.CANTU_STACK_PROCEDIMIENTO || function (CFG) { … }

El registro que `#173` descartó por peligroso —un `Set` reiniciado por documento, con el riesgo
de que una lección contamine a otra si alguien olvida el reinicio— **sigue sin existir, y no ha
hecho falta**.

**Consecuencia para el contrato:** si el activo se emite **idempotente** y se deja que la pasada
por identidad haga el «una vez», **el registro no necesita ciclo de vida de documento**. Eso es
más barato y más seguro que meter un `emitir()` en la firma de todos los componentes.

Y hay un requisito escondido que este caso hace visible: **el cuerpo compartido tiene que
DEFINIR, no CORRER.** El IIFE anterior leía `getElementById` en su primera línea y no habría
sido eliminable **ni siendo byte a byte idéntico**. La guarda de tiempo de parseo de `#173` es
la que decide si un activo es compartible.

## Cuatro sitios donde un contrato general se habría equivocado

**1 · Habría contado mal la carga por instancia.** Un registro que derive «lo que varía»
observando la salida emitida habría dicho **cuatro valores** —que es lo que dijo la cabina—.
Son **nueve**, de los que hoy varían **siete**. Tres viajaban dentro de los bloques del aviso,
cerrados tras `authorBlockIndex`, que el corpus nunca trae.
**Regla:** *un contrato no puede inferir su clave de una muestra; tiene que declararla.* Con la
muestra, el primer documento de Author Lite habría roto la compartición **en silencio**: no
habría fallado, solo habría dejado de ahorrar.

**2 · Cuatro de las nueve ranuras no eran datos: eran sintaxis.** Cosían trozos de expresión
para elegir una rama, así que con y sin `historyFontSize` el compilador emitía **dos redacciones
distintas de la misma función**, no dos ramas de una. Un contrato que asuma «código fijo más
datos variables» **no puede describir esto**. Convertirlo exigió **reescribir** el componente,
no **configurarlo**.
**Regla:** *el registro debe declarar que parametrizar es un cambio de código, y presupuestarlo.*

**3 · El precio lo pagan las guardas del activo que se sustituye, no el activo.** El obstáculo
real no fue técnico: fueron **quince guardas que existen para prohibir que ese texto crezca**,
más sesenta y tres árboles fijados que lo capturan verbatim.
**Regla:** *cualquier activo compartido choca con las guardas de estabilidad del activo que
sustituye.* Sin un capítulo sobre esto, cada migración lo descubrirá el día que se ejecute.

**4 · Compartir NO siempre ahorra, y hay que medir el umbral.** Con una sola instancia por
fichero **cuesta**: `staging/1_propiedades_numeros_slide` subió 7,2 KiB. Y en el carril de la
**previa**, que no aplica la pasada, el documento de 22 instancias **creció un 6,6 %**.
**Regla:** *el contrato necesita un umbral por documento, y necesita saber en qué carriles corre
la pasada.* Verificado por la cabina: `compiler-api` no llama a `dedupeEmittedBlocks`.

## La cifra, para que el registro sepa de qué tamaño es el problema

    corpus SLIDE   4384,3 -> 1596,8 KiB     -2787,5 KiB   (-63,6 %)
    razon cuerpo compartido : configuracion       302 : 1
    capturado sobre lo alcanzable                  98,9 %

Y el peso era **reciente y propio**: `calculateFit` medía 11 361 B el 28 de agosto y 68 707 B
una semana después, por el trabajo de la reparación de la tarjeta enfocada. **Un activo que se
repite N veces multiplica por N cada ronda futura sobre él.** Ese es el argumento más fuerte a
favor del registro, y sale de aquí.
