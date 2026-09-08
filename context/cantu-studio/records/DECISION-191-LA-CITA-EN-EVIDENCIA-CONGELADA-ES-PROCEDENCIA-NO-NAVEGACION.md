# DECISIÓN DEL OPERADOR — una cita dentro de evidencia congelada es procedencia, no navegación

**Fecha: 2026-09-08** · **Origen:** el cierre de `RUN-CANTU-DOCUMENTATION-CORPUS-CLEANUP-001` (`#191`)
**Commits:** trabajo `44698d01` · cierre `78481c80`

---

## Lo que dijo, VERBATIM

```
Los cinco cambios de prosa de #191, ¿pasan?
  -> «Pasan, cierra sin que los lea»

Los 7 movimientos bloqueados: la precondición 4 exige reescribir toda cita
load-bearing en el mismo run, y la política prohíbe reescribir evidencia
congelada. Es un candado circular que tu propia firma ya nombró para las 462
citas. ¿Qué hago con él?
  -> «Acotar la precondición 4 a citas vivas (recomendada)»
```

---

## EL CANDADO, y lo notable es que se midió DOS VECES POR SEPARADO

`.aiw/docs/docs_retention_archive_policy.json` sostiene dos reglas que, juntas, se anulan:

| | |
|---|---|
| **precondición 4** | *«the same bounded run that moves files **rewrites every load-bearing citation**; a move without same-run citation rewrites does not happen»* |
| **clase de retención «evidencia»** | *«**Frozen evidence is never rewritten**; it may gain banners/labels or move intact»* |

**Cuando las citas de un lote viven en evidencia congelada, la precondición 4 exige exactamente
lo que la política prohíbe.** No es un requisito difícil: es un requisito **incumplible por
construcción**, y mientras siga escrito así **ninguna migración física se autoriza jamás**.

**El taller de `#191` lo dedujo sobre el lote de 7**, donde 12 de sus citas caen en ficheros
congelados. **Y ya estaba escrito**, con estas palabras, en la firma del operador del 2026-08-02
para el caso mayor de las 462 citas del §8 ítem 2:

> *«Rewriting the 462 citations is **ruled out by the retention policy's freeze on evidence**,
> not merely deferred.»*

**Dos mediciones independientes, con año de distancia entre ellas, misma conclusión.** El taller
no lo copió: no había leído esa línea cuando lo dedujo.

---

## Por qué acotar la precondición 4, y no las otras salidas

**El argumento es el que este mismo run acabó de aplicar al ítem 3 de su propia enmienda**, dos
horas antes y sobre otro fichero:

> Una cita dentro de evidencia congelada **registra dónde estaba algo, no dónde encontrarlo.**
> Es **procedencia**. Un lector que la sigue está preguntando por la historia, no buscando un
> documento que leer.

Si eso es cierto —y en `OPERATIONS-RUN-PROTOCOL:91` se aceptó que lo es—, entonces **exigir que
se reescriba antes de mover es exigir que se falsifique el registro histórico**. La cita vieja no
está rota: está **fechada**.

Las otras tres salidas y por qué no:

- **Retirar la disposición `move` de los 7** cierra el síntoma y deja el candado intacto para el
  próximo lote. Y son 7 de un universo de 481.
- **Dejarlo como deuda** congela la migración física indefinidamente, que es el estado actual
  disfrazado de decisión.
- **Un run de análisis con parada** habría sido lo correcto **si la medición faltara**. No falta:
  está hecha dos veces y las dos coinciden.

---

## Lo que la enmienda NO toca, y es el punto

**El congelamiento de la evidencia se queda exactamente como está.** La enmienda no relaja qué se
puede reescribir: **acota qué hay que reescribir antes de mover**, y lo acota a la prosa viva,
que es donde una cita muerta sí engaña a alguien.

**No es aflojar una guarda: es dejar de pedirle a la guarda que se contradiga.**

---

## El otro veredicto del mismo turno, y hay que decirlo entero

**El operador eligió cerrar `#191` sin leer los cinco cambios de prosa.** Es su decisión y es
legítima. Pero **es el tercer cierre seguido sin ojo humano sobre documentación** —`#189`, `#190`,
`#191`— y esta vez **cuatro de los cinco cambios son afirmaciones de gobernanza, no punteros**:

- la afirmación de vigencia de `CLAUDE.md:85-86`, que lee **todo agente que abre este repo**;
- el **peldaño 4 de la escalera de autoridad** de `GOVERNANCE-AUTHORITY-AND-NO-CLAIMS:14`, que
  decide **qué fuente gana cuando dos se contradicen**.

La cabina verificó que las cinco son **derivables del disco** y publicó la derivación de cada
una. Ninguna es criterio del taller. Pero derivable no es lo mismo que leído, y **queda dicho
aquí para que el riesgo esté contado y no descubierto.**
