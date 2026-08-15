# `#58` `RUN-CONSOLE-VERDICT-SURFACE-001` — cierre, y la advertencia que va con él

**Cerrado el 2026-08-15** · `closeout_result: "done"`
**Commits del run:** `b8a8158` (inserción y apertura) · `8c41ed3` (el trabajo: 5 ficheros,
+1 024 −27)

---

## 1. ⚠⚠ EL VEREDICTO QUE HAY EN DISCO NO ES UN VEREDICTO

**Lo dice el operador, verbatim, y es lo más importante de este record:**

> «cabe aclarar qeu este approved no es real, lo puse para probar la herramienta, mi
> veredicto real, quiero primero tener el reporte mas pulido, falta el summary, y me falta
> los criteiros que se usaron para esta revision anexos para revisarlos antes de aprobar»

Y añade por qué pesa:

> «este run en especifico se me hace super importnate porque es el piltoto para todos los
> que siguen»

**Consecuencia que hay que decir en voz alta:** el fichero
`cantu-quizzes-latex/reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/verdict.json` afirma hoy
un run `APPROVED` firmado por `CVC`, y **eso no es el juicio del operador**. En particular:

- **`D1` NO está ratificada.** Aparece `APPROVED` en el fichero, y su propio alcance
  declarado por el ejecutor es *«entra en la rúbrica v3 y se aplica a los 39 runs
  restantes»*. **Nadie ha aprobado eso.**
- **`D2` tampoco.**
- El run del piloto **no debe cerrarse** apoyándose en este fichero.

**Lo que el operador espera antes de emitir su veredicto real:** el **resumen** de la
D-065, y **los criterios usados en la revisión, anexados al reporte para poder revisarlos
antes de aprobar**. Lo segundo es la mitad de la D-065 que ya existe en el dato —`profile`,
`profile_source`, `satisfies`— y que **nadie pinta todavía**.

---

## 2. EL ESTADO REAL DEL FICHERO, medido — y no es el que el operador recuerda

Medido el 2026-08-15 a las 04:55 UTC sobre el fichero en disco:

    decided_at   2026-08-15T04:52:53.714Z      verdict_by  CVC
    run          APPROVED                       stopped     false (derivado)
    items        7 APPROVED · 1 CHANGES_REQUIRED · 10 sin veredicto (no lo piden)
    self_dec.    D1 APPROVED · D2 APPROVED
    notas        ninguna, en ningún sitio

**El operador lo describió como «todo approved» y el disco dice otra cosa:** **`C4` quedó
en `CHANGES_REQUIRED` con disposición `operator_fixed`** —«lo arreglo yo»—. **Gana el
disco.**

Y esa discrepancia **prueba la guarda en vez de contradecirla**: el run puede estar
`APPROVED` con un ítem en `CHANGES_REQUIRED` **porque lleva disposición y no es
`this_run`**. Es exactamente la regla del `#54`, funcionando sobre un caso real que nadie
construyó para probarla.

---

## 3. LA QA: pasó, y el operador la describió así

> «jalo como esperaba entre y ya tenia veredicto, cuando itnente cambiarlo me dioj que
> cambios se veian relaizados y si queria sobreescribir, lo hice, ovlvi a cambiar
> sobre escribi y quede con la verion al final»

Los seis pasos, con lo que confirman:

| paso | qué probaba | resultado |
|---|---|---|
| 1 | el formulario viene relleno desde `verdict.json` | pasa |
| 2 | lo tecleado sobrevive a la recarga | pasa |
| 3 | firmar sin cambios **avisa igual** y no escribe hasta confirmar | pasa |
| 4 | el resumen **nombra** lo que cambia, y se deriva de los dos ficheros | pasa |
| 5 | la guarda dice **cuál** y lleva hasta él | pasa |
| 6 | el denominador se dice una vez, con su razón | pasa |

**Dos sobrescrituras reales, ambas confirmadas por el operador tras leer el resumen.** La
D-066 hizo lo que se le pidió: la escritura silenciosa que motivó el run **ya no puede
ocurrir**.

---

## 4. LO QUE NO SE MIRÓ, y se declara

- **El aspecto.** El CSS del run no lo ha juzgado nadie más allá de que el operador
  completó los seis pasos sin quejarse de él. La lógica tiene 22 pruebas nuevas; la suite
  pasó de **695** a **717**, cero fallos, medido por el taller.
- **El chip del cajón de runs sigue siendo la foto del índice** (`verdict_present` de la
  última emisión de `.project/`). Puede decir `no verdict yet` con un veredicto al lado.
  Declarado fuera de alcance por el ejecutor, con razón: arreglarlo pide una lectura por
  run o una re-emisión. **Candidato al run siguiente.**

---

## 5. LA PREGUNTA QUE PARÓ AL EJECUTOR, y cómo se resolvió

El ticket marcaba como parada: **qué manda cuando el fichero en disco y lo tecleado
discrepan**. Se disparó. La respuesta implementada —y escrita en el código con esas
palabras— es **lo tecleado manda en el formulario, y el archivado queda visible y es la
línea base contra la que compara la D-066**.

**Aviso de procedencia:** esa respuesta llegó en la sesión del taller y **la cabina sólo
tiene su paráfrasis**. Se registra aquí como lo que es —una decisión de promesa cuya
formulación exacta no está en palabras del operador— y **queda pendiente de que él la
confirme para elevarla a decisión numerada**.

La otra condición de parada **no se disparó**: `localStorage` ya existía y ya guardaba
estado del operador, así que la persistencia entró por el mecanismo que la consola tenía.

---

## 6. SEMILLA PARA EL `#63`, no su inventario

Textos de este repo que describen falsamente lo que hace, encontrados de paso. **No son la
lista: el `#63` tiene que derivarla corriendo el método, porque enumerar inventarios ya
falló dos veces en este subsistema.**

- **`start-console.ps1`** imprime *«Read-only console: the server answers GET and HEAD only
  and writes nothing»* y lo repite en su cabecera. **Son cuatro rutas de escritura**, y la
  frase se le enseña al operador justo cuando va a firmar. **Es la más peligrosa de las
  encontradas.**
- **`project-console/README.md`** hablaba de «all six artifacts» del emit: son siete.
- **El acuse de la re-emisión** dice «Re-emitted 6 artifacts».
