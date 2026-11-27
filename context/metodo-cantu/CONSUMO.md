# Consumo de tokens: cuánto gasta de verdad cada tarea

> **v0 · 2026-11-27, 23:05 UTC (`date -u`).** Lo escribió un hilo del Project «Metodo_Cantu» de `cuentachris`, a pedido de Chris:
> *«como quiera empieza a tener un registro de cuanto porcentaje se usa en tareas y lineas, porque me estoy dando cuenta que no
> estas midiendo bien que tantos tokens va a usar una tarea … ni cerquita»*. Y después: *«lo del registro de consumo de tokens
> pasale la misma instruccion a cuenta de pato»*.
>
> **Por qué existe:** las estimaciones de las sesiones han salido infladas por mucho (casos 1 y 2, abajo). La memoria del Project
> está apagada, así que lo medido se perdía al cerrar cada hilo. Este fichero lo guarda para las dos cuentas.

## La regla (para las dos cuentas)

1. **Antes de estimar cuánto va a gastar una tarea, se lee este fichero.** La estimación sale de las filas parecidas del registro,
   no de la intuición. Si no hay ninguna parecida, se dice así: «no tengo dato parecido; mi cálculo es [INFERENCIA]».
2. **Al cerrar una tarea grande, se le pide a Chris el % semanal de antes y de después** (lo ve en claude.ai, Ajustes → Uso), y se
   agrega su fila aquí. Si fue con la API, el costo en USD (lo da el script o la consola de Claude, página Cost).
   - «Grande» = una noche de trabajo, una tanda, varios hilos o más de una hora de trabajo seguido.
   - Si no se tiene el % de antes, se anota el de después y se marca `[SIN ANTES]`.
3. **Se anota lo que corrió a la vez.** El % semanal mezcla todo lo de la cuenta; si había otras tareas, se escriben en la nota.
4. **Una fila por tarea, nunca se borra una fila.** Si un dato se corrige, se agrega la corrección en la nota.
5. **Desde la nube, una fila nueva del registro va directo a `main`**, igual que un aviso del buzón (D-087). Cambiar las reglas o
   la sección «Cómo estimar» va por PR.

## El registro

`Cuenta`: `cuentachris` o `cuentapato`. `Antes → después`: % semanal usado de la suscripción, o USD si fue con la API.
`Estimado`: lo que dijo la sesión antes de empezar, si dijo algo.

| # | Fecha | Cuenta | Línea | Tarea | Modelo y esfuerzo | Estimado | Antes → después | Gasto real | Nota |
|---|---|---|---|---|---|---|---|---|---|
| 1 | ~2026-11-24/26 `[NO VERIFICADO]` | `cuentapato` | `[NO VERIFICADO]` | Trabajo pesado dejado corriendo toda la noche | `[NO VERIFICADO]` | De 50 % a 80 % o más, quizá hasta 100 % | ~50 % → ~52 % | **~2 %** | Chris (27-nov): *«al dia siguietne me levante y gasto un 2% y acabo normalmente las tareas que deje»*. La estimación se pasó unas 15 a 25 veces. |
| 2 | 2026-11-27 | `[NO VERIFICADO]` | `[NO VERIFICADO]` | Una tarea con 10 % restante | `[NO VERIFICADO]` | «No alcanza» (más de 10 %) | 90 % → ~92-93 % | **2-3 %** | Contado por el coordinador al abrir este hilo. |
| 3 | hasta 2026-11-27 | `cuentachris` (llave de API) | E, Quizzes | Revisión del banco v1.6 con la API: tandas 1 a 8 y parte de la 9 | Opus, high | — | USD | **~197 USD** | Unos 0.04 a 0.09 USD por pregunta según el archivo. La llave se quedó sin saldo a media tanda 9 (*«Credit balance is too low»*). |
| 4 | 2026-11-27, 15:53-17:03 (hora de Chris) | `cuentapato` (llave de API) | E, Quizzes | Revisión v1.6, resto de la tanda 9: 13 archivos, 458 preguntas | Opus, high | — | Saldo de la consola: 181.35 → 177 USD | **22.98 USD según el script** (0.050 USD por pregunta); **~4.35 USD según la consola** | Las dos cifras no cuadran; puede ser retraso de la consola. Hay que volver a mirar la página Cost en un día. Unos 70 min en total (~9 s por pregunta). Total del banco desde el piloto, según el script: **219.98 USD**. |

## Cómo estimar (sale de los datos de arriba)

### Suscripción (% semanal)
- **Las estimaciones han salido infladas por mucho.** Con dos casos, el gasto real fue entre 2 y 3 % cuando se decía 10 a 50 %.
- **Hasta tener más datos, la referencia es:** una tarea grande, incluso una noche entera, ronda **2 a 3 % de la semana**.
- **Si se va a decir que algo «no alcanza» o «se pasa del 80 %»**, primero se compara con las filas del registro y se dice cuál se usó.
- La cifra se da como rango y con su fuente: «2-3 %, como las filas 1 y 2».

### API (USD)
- **Revisión v1.6 con Opus high:** unos **0.05 USD por pregunta** (0.04 a 0.09 según el archivo) y unos 9 segundos por pregunta.
- Un archivo de 20 preguntas cuesta ~1 USD; uno de 60, ~2.5 a 3.5 USD.
- El script da su propio total; la consola de Claude (página Cost) es la cifra que manda, pero puede ir atrasada (fila 4).

### Lo que falta medir
- Cuánto gasta un hilo normal de una hora, por línea.
- La diferencia entre Opus high y xhigh en la misma tarea.
- Si el % semanal de `cuentachris` y de `cuentapato` se comporta igual.
