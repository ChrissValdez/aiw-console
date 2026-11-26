# Líneas de trabajo: cuáles hay, quién lleva cada una y en qué estado

> **v0 · 2026-11-26, 04:48 UTC (`date -u`). Propuesta en PR, sin fusionar.** La escribió un hilo del Project «Metodo_Cantu» de
> `cuentachris`, a pedido de Chris: *«hay que pulir el sistema de estados para que jale al 100»*. Vale cuando Chris la apruebe.
> La decisión es D-088.
>
> **Por qué existe:** hasta hoy las líneas y sus estados solo vivían en las instrucciones de cada Project, una copia por cuenta,
> escrita a mano. Quién tiene cada repo vive en `ASIGNACIONES.md`. Las dos copias y el registro se separaban en cuanto algo
> cambiaba (por ejemplo, la Línea B pasó a `cuentachris` a las 04:41 y la Línea F se quedó sin poder escribir en su repo).

## Qué es una línea

**Una línea es un frente de largo plazo con su propia meta.** Se nombra con una letra y un nombre corto: «Línea A, Dashboard».
- Una línea puede usar uno, varios o **ningún** repo (la Línea H no tiene).
- Un repo nunca es una línea. Un hilo es una tarea corta dentro de una línea. Lo que no es de ninguna línea es «Otros temas»
  y no se registra aquí.
- **Las letras no se reusan.** Si una línea se archiva, su letra queda ocupada; la siguiente línea nueva toma la letra libre que sigue.

## El registro

**Este fichero es la única fuente de qué líneas hay y en qué estado está cada una.** Las instrucciones de cada Project ya no
llevan la lista: la leen de aquí (ver «Lo que va en las instrucciones de cada Project», abajo).

La cuenta se escribe con su nombre fijo (`cuentachris`, `cuentapato`), nunca como «Aquí» u «Otra cuenta»: eso depende de quién
lee. El script de abajo lo traduce.

| Línea | Nombre | Cuenta | Estado | Regresa a | Repos | Desde | Nota |
|---|---|---|---|---|---|---|---|
| A | Dashboard | `cuentachris` | pausada | — | `metodo-cantu-dashboard` | 2026-11-26 | Reparto de D-087. Pausada por Chris el 26-nov (*«vamos a pausar el dashboard (no archivado, pausado, sigue vivo…)»*) para avanzar otras líneas. Quedó en la v41 (MAESTRO-16 y PIEZAS-27), sin votos pendientes; se retoma con su relevo. El repo sigue de `cuentachris`. |
| B | Lecciones mate | — | libre | `cuentapato` | `cantu-lessons`, `cantu-revisiones` | 2026-11-26 | Préstamo terminado: `cuentachris` la soltó a las 08:15 UTC con la galería como artefacto lista (v28, PR #3 de `cantu-revisiones`). La toma `cuentapato` y borra «Regresa a»; en ese mismo commit reanuda la Línea F. |
| C | Lecciones español | `cuentapato` | activa | — | `cantu-espanol` | 2026-11-24 | Repo nuevo que creó Pato. Su galería irá aparte de la de mate. |
| D | Landing | `cuentapato` | activa | — | `metodo-cantu-landing` | 2026-11-24 | Antes de escribir, leer `context/cabinas/landing/MEMORIA-PC-CHRIS.md`. |
| E | Quizzes | `cuentapato` | activa | — | `cantu-quizzes-latex` | 2026-11-24 | La soltó `cuentachris` el 24-nov. |
| F | Revisiones | `cuentapato` | pausada | — | `cantu-revisiones`, `cantu-lessons` | 2026-11-26 | Pausada porque sus repos están con `cuentachris` por la Línea B (la ronda CR-LX3 sigue abierta en la galería local). Se reanuda cuando regresen. |
| G | Studio | — | archivada | — | `cantu-studio` | 2026-11-26 | Chris la archivó el 26-nov. En `ASIGNACIONES.md` su repo sigue libre y en pausa (D-079). |
| H | Asesorías UANL | `cuentachris` | activa | — | — | 2026-11-26 | Sin repo. Fecha en que se nombró la línea (aviso del formato de cierre, 03:19 UTC). |

### Los estados

| Estado | Qué quiere decir | Cuenta |
|---|---|---|
| **activa** | Su cuenta trabaja en ella. | Una cuenta. |
| **pausada** | Nadie trabaja en ella por ahora; la cuenta la conserva. | Una cuenta. |
| **archivada** | Cerrada. No se muestra salvo que Chris lo pida. | `—` |
| **libre** | Nadie la tiene; es el paso intermedio cuando una línea cambia de cuenta. | `—` |

**«Regresa a»** marca un préstamo: la línea está con una cuenta, pero vuelve a la otra al terminar. Si no es préstamo, `—`.

### Cómo se ve desde cada cuenta

Cada cuenta arma el cierre de sus mensajes (📍 Estado) desde esta tabla, así:

| En la tabla | Lo lee `cuentachris` como | Lo lee `cuentapato` como |
|---|---|---|
| activa, `cuentachris` | 🟢 Aquí | 👤 Cuenta Chris |
| activa, `cuentapato` | 👤 Cuenta Pato | 🟢 Aquí |
| pausada (de cualquiera) | ⏸️ Pausadas (con su cuenta si es la otra) | ⏸️ Pausadas (con su cuenta si es la otra) |
| libre | ⏸️ Pausadas, «sin cuenta, en traspaso» | igual |
| archivada | no se muestra | no se muestra |

**El script lo hace solo** (ver abajo). Lo que el script no sabe es **en qué va** cada línea: esa frase la pone la sesión con lo
que midió.

## Las reglas con `ASIGNACIONES.md`

Las líneas y los repos son dos registros distintos, pero **no pueden contradecirse**:

1. **Una línea activa tiene sus repos.** Cada repo de una línea activa es de la misma cuenta en `ASIGNACIONES.md`, en estado `activo`.
2. **Un repo es de una sola cuenta a la vez**, aunque lo usen dos líneas. Si dos líneas comparten repo (B y F), solo puede estar
   activa la de la cuenta que tiene el repo; la otra queda pausada.
3. **Una línea archivada no tiene repos tomados:** los suyos están `libre` en `ASIGNACIONES.md`.
4. **Todo repo de `ASIGNACIONES.md` está en alguna línea**, salvo `aiw-console`, que es el contexto compartido.
5. **Una línea sin repo** (H) solo vive aquí.

**Leer sigue sin cambiar nada:** cualquier cuenta lee cualquier repo (Línea A lee de `cantu-lessons`; ver «Las dependencias
entre repos» en `ASIGNACIONES.md`).

## Cambiar el estado de una línea

**Quién aprueba:** Chris, igual que en `ASIGNACIONES.md` (pregunta 1), dicho en la sesión que hace el cambio.

**Siempre en un solo commit:** la línea de esta tabla y, si cambia algún repo, su línea de `ASIGNACIONES.md`. Así nunca queda
un momento en que los dos registros se contradicen. Antes del commit, `node context/metodo-cantu/lineas.mjs --revisar` debe salir
sin errores.

| Cambio | Lo hace | Pasos | ¿Aviso en el buzón? |
|---|---|---|---|
| **Pausar o reanudar** una línea propia | La cuenta que la tiene | Cambia su estado y la fecha. | No hace falta: la otra cuenta lo ve al hacer `git pull`. Sí, si le afecta algo (un repo que lee). |
| **Pasar a la otra cuenta** | Primero la que la tiene, luego la que llega | 1. La que la tiene **suelta**: suelta sus repos (`ASIGNACIONES.md`, «Soltar un repo») y aquí pone cuenta `—` y `libre`, en el mismo commit. 2. Deja aviso nombrando el relevo. 3. La que llega **toma**: toma los repos y aquí pone su cuenta y `activa`, en el mismo commit. | **Sí**, al soltar y al tomar. |
| **Prestar** (pasar y que regrese) | Igual que pasar | Igual que pasar, y quien toma escribe en «Regresa a» la cuenta dueña. | Sí, y otro aviso al regresarla, con la lista de regreso (accesos como Editor, todo en GitHub, enlaces de los PR). |
| **Regresar un préstamo** | La que la tiene prestada | Suelta como arriba; la dueña la toma y borra «Regresa a». Si una línea quedó pausada por el préstamo (F), su cuenta la reanuda en ese mismo commit. | Sí. |
| **Archivar o desarchivar** | La cuenta que la tiene, o cualquiera si Chris lo pide | Primero suelta sus repos. Luego cuenta `—` y `archivada`. Para desarchivar, una cuenta la toma como una línea libre. | Sí, una línea. |
| **Línea nueva** | Cualquier cuenta, con el sí de Chris | Agrega su fila con la siguiente letra libre. Si usa un repo, lo toma en `ASIGNACIONES.md` en el mismo commit. | Sí, una línea, para que la otra cuenta la vea con su nombre. |

**Nunca se cambia la línea de la otra cuenta** desde la cuenta que la quiere (igual que con los repos): se le pide por el buzón.

**Desde la nube**, la línea propia de esta tabla va directo a `main`, igual que la línea propia de `ASIGNACIONES.md` (pregunta 7).
Todo lo demás de este fichero (las reglas, los estados) va por PR.

## El script

```text
node context/metodo-cantu/lineas.mjs --cuenta cuentachris     # arma el 📍 Estado tal como lo ve esa cuenta
node context/metodo-cantu/lineas.mjs --revisar                 # revisa que LINEAS y ASIGNACIONES no se contradigan
```

- Solo lee estos dos ficheros; no hace `git` ni cambia nada.
- `--revisar` sale con error (código 1) si alguna de las reglas de arriba no se cumple, y dice cuál y en qué línea.
- `--cuenta` también revisa, y si hay algo mal lo pone arriba del Estado, para que la sesión lo diga en vez de esconderlo.

**Cuándo se corre:**
1. Al abrir cada sesión o hilo, después del `git pull` de `aiw-console` (la regla de oro de `ASIGNACIONES.md`).
2. Antes de commitear un cambio aquí o en `ASIGNACIONES.md`.
3. Si en un hilo largo hay duda del estado, otra vez. **El estado no se supone: se mide.**

## Lo que va en las instrucciones de cada Project

Las instrucciones de cada Project conservan el **formato** del cierre (la jerarquía, los tres encabezados, el vocabulario), pero ya
no la lista de líneas. Donde hoy dice «Líneas de este proyecto: …», va esto, con el nombre de la cuenta de ese Project:

```text
Líneas de este proyecto: la lista y el estado de cada una viven en aiw-console, context/metodo-cantu/LINEAS.md. Esta cuenta es
cuentachris. Antes de armar el 📍 Estado, haz git pull de aiw-console y corre
node context/metodo-cantu/lineas.mjs --cuenta cuentachris; usa sus grupos tal cual y añade a cada línea una frase de en qué va.
Si el script avisa de una contradicción, dilo en «Qué necesito de ti». Para cambiar el estado de una línea, sigue
«Cambiar el estado de una línea» en ese mismo fichero; nunca lo cambies solo en el mensaje.
```

En el Project de Pato, lo mismo con `cuentapato`.
