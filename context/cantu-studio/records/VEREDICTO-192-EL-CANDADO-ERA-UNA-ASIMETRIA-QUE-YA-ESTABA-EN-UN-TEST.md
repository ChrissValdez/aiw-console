# VEREDICTO — `#192`: el candado era una asimetría, y ya estaba escrita en un test

**Fecha: 2026-09-09** · **Run:** `RUN-CANTU-DOCS-RETENTION-PRECONDITION-4-SCOPE-001`
**Commits:** trabajo `15431b5f` · cierre por debajo

---

## Qué deshizo

La precondición 4 exigía que el run que mueve ficheros **reescribiera toda cita load-bearing**
del lote. La clase de retención «evidencia» declara que **la evidencia congelada no se reescribe
nunca**. Cuando las citas del lote viven en evidencia congelada —y viven—, la precondición 4
**exigía exactamente lo que la política prohíbe**: incumplible por construcción, y con ella
ninguna migración física podía autorizarse jamás.

---

## LA PRUEBA DE QUE NO SE AFLOJÓ NADA, y es de conjuntos, no de palabras

| | |
|---|---|
| hojas del JSON antes / después | **207 → 238** |
| **valores cambiados en TODA la política** | **1** — `preconditions_for_physical_migration.checklist[3].requirement` |
| hojas nuevas | 31, **todas aditivas** |
| **hojas desaparecidas** | **0** |

**Que ninguna hoja desaparezca lo demuestra por construcción**: cada `retention_expectation`,
cada regla de `archive_semantics` y cada cláusula de `deletion_policy` siguen byte a byte.

Y el taller lo probó por el otro lado, sobre el lote de 7 real: los ficheros cuya reescritura la
precondición 4 exige pasan de **33 a 22**, **añade 0**, **congelados aún exigidos 0**.
**Subconjunto estricto. Una enmienda que solo quita no puede aflojar nada.**

**Una sonda del taller falló y él la publicó**: buscar `deletab` en el texto nuevo dio positivo,
y el acierto estaba dentro de la frase que dice que la política de borrado **no** cambió. La
palabra suelta era la sonda equivocada. **Lo declaró en vez de callarlo, y por eso su prueba de
conjuntos vale.**

---

## ⚠ EL HALLAZGO, y es el mejor de la cadena

La guarda que escribió el taller de `#190` **ya excluía `_historical_run_record`**, con esta
razón en su propio código, líneas 39–40, verificada verbatim:

> *«en estos cuatro la ruta muerta ES el dato, no un puntero que alguien vaya a seguir.
> Reescribirla destruiría la medición.»*

**Eso es el principio de procedencia, dentro de una prueba automatizada, DOS RUNS ANTES de que la
política lo dijera.** Los tests ya trataban la historia como historia mientras la política seguía
exigiendo reescribirla. **Esa asimetría era la forma técnica del candado**, y estuvo a la vista
todo el tiempo sin que nadie la leyera como tal.

---

## La enmienda hizo MÁS de lo que se le pidió, en la dirección correcta

Añadió que **el análisis de impacto NO está completo sin las citas congeladas**: hay que contarlas
y publicarlas por clase y por fichero aunque no se pida tocarlas, *«para que el operador vea la
superficie entera antes de autorizar»*. En sus palabras: **una cita congelada que se queda en pie
es una decisión medida y publicada, nunca una omisión.**

El ticket no pedía eso. **Es lo que impide que un estrechamiento se convierta en un punto ciego**,
y es la diferencia entre acotar un requisito y esconderlo.

---

## Una desviación del taller, declarada y correcta

El run decía acotar «a citas de prosa viva». **Al pie de la letra eso habría sacado el registro de
máquina y el código** —`.aiw/`, `.project/`, `src/`, `tools/`—, que no son congelados y cuyas
citas **sí** tienen que resolver; el validador se habría puesto rojo. Los dejó dentro. El
estrechamiento excluye **exactamente** las clases que la política declara no reescribibles, ni una
más. **Leyó la intención en vez de la letra, y lo dijo.**

---

## Gana el disco: dos de las cuatro cifras del ticket no cuadraban

| el ticket decía | medido el 2026-09-09 | |
|---|---|---|
| 12 citas en congelado | **14**, en 11 ficheros | **más**, no menos: no procedía parar |
| 462 citas del §8 ítem 2 | **327**, en 94 ficheros | `#189` y `#190` repararon rutas entre medias |
| 134 fuentes sin disposición | **135** | |
| el ledger lo nombra la precondición 7 | **la 8** | la 7 no menciona ninguno |

Las 327 **afilan** el argumento del §8 en vez de romperlo: 103 en congelado, **solo 6 en prosa
viva**.

---

## La tabla de las nueve, remedida contra el disco del día

**1 cumplida** (política aprobada) · **2 con alcance acotado** · **1 despejada sin registrar**
(0 de 20 conflictos tocan el lote) · **5 no cumplidas** (4, 5, 7, 8, 9).

**Lo que cambia no es un tick: es la naturaleza de la 4**, que pasa de *incumplible por
construcción* a *cumplible y pendiente*. **El taller NO la marcó satisfecha**, y tenía razón: su
segunda mitad —«el mismo run que mueve reescribe»— solo se puede verificar **dentro** del run que
mueve. Tampoco marcó la 8: su propia entrada del ledger dice en `not_granted` que no autoriza el
lote. **Un ejecutor que se niega a marcarse a sí mismo el aprobado.**

---

## ⚠ DOS DEFECTOS DE LA CABINA QUE EL TALLER DESTAPÓ

**1 · Un puntero entre repos sin su repo.** El texto del run citaba
`DECISION-191-LA-CITA-EN-EVIDENCIA-CONGELADA-ES-PROCEDENCIA-NO-NAVEGACION.md` **sin decir que vive
en `aiw-console`**. El taller solo ve `cantu-studio`; buscó en `docs/` y `.aiw/`, no encontró nada,
y reportó que no existía. **Su cero era correcto para donde miró.** El fichero existe, 4 358 bytes,
commiteado en `3ed3adc9`.

**2 · La trampa LF/CRLF, TERCERA VEZ EN TRES RUNS.** La cabina comprobó el prefijo del ledger
comparando el blob de `HEAD` —normalizado a LF— contra el árbol de trabajo —CRLF— y se publicó a
sí misma *«PREFIJO DIFIERE — no es append puro»*. **Falso.** Normalizando los dos lados el prefijo
es idéntico, y los 8 945 bytes que declaró el taller cuadran al byte: 8 941 del blob más los
cuatro CR de sus cuatro líneas. **La cabina escribió un record entero sobre esta trampa el 7 de
septiembre y volvió a caer el 9.**

**Las dos se llevan al `PROMPT-DE-REINICIO.md`**, que es donde dejan de depender de que la cabina
se acuerde. Un record que se relee no es una guarda; un prompt de arranque sí.

---

## Sin QA de pantalla — cuarto cierre seguido sobre documentación

Lo cambiado es una política de máquina, una línea de ledger y un informe, todo verificable contra
disco, y la cabina lo verificó hoja a hoja. **Lo que queda sin ojo humano: si la redacción de la
precondición 4 dice lo que el operador quiso decir.** La cabina puede demostrar que no aflojó
nada; **no puede demostrar que diga lo que él quería.**

**No autoriza nada.** `physical_migration_authorized` sigue en `false`.
