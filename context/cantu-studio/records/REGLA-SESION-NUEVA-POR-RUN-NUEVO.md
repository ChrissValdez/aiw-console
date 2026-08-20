# REGLA — un run nuevo se lanza en SESIÓN NUEVA. Las correcciones, no.

> Puesta por el operador **Christopher Valdez Cantu** el **2026-08-18**, al recibir el ticket de
> `#122`. Transcrita por la cabina **VERBATIM**. **Es permanente hasta que él la retire.**

---

## SUS PALABRAS, ÍNTEGRAS

```
ya lo mande pero el proximo ticket que ya no sea en la misma sesion se esta volviendo habito
dejarlo todo en la misma sesion cuando no aplica
cuando son correcciones sobre el mismo run esta bien pero ahorita abrimos otro y lo mandaste
a la misma sesin
Ya lo mande asi
pero dejalo como regla para proximos tickets
```

---

## LA REGLA

| Situación | Sesión |
|---|---|
| **Ronda de corrección sobre el MISMO run** | **misma sesión** — el taller ya tiene el terreno medido y volver a levantarlo es tiempo tirado |
| **RUN NUEVO** | **SESIÓN NUEVA**, siempre, y con **modelo y esfuerzo declarados**, porque ahí sí los elige |

**El corte es el `run_id`, no el tamaño del encargo.** Un run nuevo pequeño se lanza en sesión
nueva igual que uno grande.

---

## EL DEFECTO QUE CORRIGE, Y ERA DE LA CABINA

**La regla anterior decía «declara siempre la sesión, en las dos direcciones».** La cabina la
degradó a declarar *«misma sesión»* por defecto, y acabó escribiéndolo **también al abrir runs
nuevos**. Dejó de ser una decisión y pasó a ser una muletilla.

**Coste medido:** `#122` —«Lift containment and implement Video»— salió recomendando misma
sesión, con el taller cargando **cinco rondas de razonamiento sobre la Lista con etiquetas**. El
operador lo lanzó así porque ya lo tenía delante, pero la recomendación era mala.

**Y hay una consecuencia que la muletilla se llevaba por delante:** en sesión nueva el operador
**elige modelo y esfuerzo**. Recomendar misma sesión por costumbre le quitaba esa elección sin
que nadie lo decidiera.

---

## POR QUÉ ES CORRECTA, Y NO ES SOLO HIGIENE

Ya estaba escrito en las reglas de cabina y la cabina no lo aplicó:

> *Sesión nueva cuando el encargo anterior sesgaría al siguiente. Y en particular: cuando el
> taller anterior tiene invertido su propio razonamiento en lo que sigue.*

Un taller que acaba de defender cinco rondas de decisiones sobre un componente **tiene
invertido su razonamiento en ellas**. Al run siguiente le conviene un taller que llegue con el
disco delante y nada más.

**Y no pierde nada**, porque lo que el run siguiente necesita saber **está en ficheros**: el
`full_description`, la regla en `docs/reference/`, los veredictos en `context/`. **Un contrato
en un fichero no envejece; el razonamiento de una sesión sí.** Es la misma razón por la que los
hilos se coordinan con ficheros y no con mensajes.

---

## CÓMO SE APLICA A PARTIR DE AHORA

1. **Todo ticket de run nuevo cierra con: «SESIÓN NUEVA», y modelo y esfuerzo.**
2. **Toda ronda de corrección cierra con: «misma sesión», y sin modelo ni esfuerzo.**
3. **La declaración sigue siendo obligatoria en las dos direcciones.** Lo que cambia es que ya
   no se decide por costumbre: se decide mirando si el `run_id` cambió.
4. **Va al handoff y al prompt de reinicio**, no solo a este record, porque es una regla que la
   cabina necesita antes de escribir su primera respuesta.
