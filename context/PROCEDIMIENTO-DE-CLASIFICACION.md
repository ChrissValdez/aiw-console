# Procedimiento de clasificación de runs

**Estado:** vigente. Emitido por el run piloto de `aiw-console`, «Classify
aiw-console's live runs as the pilot, and rule on the procedure itself».
**Alcance:** los tres proyectos.

Este documento dice **CÓMO** se clasifica un run.
`context/CLASIFICACION-DE-RUNS.md` dice **QUÉ SIGNIFICAN** los campos y es el
documento normativo. Están separados a propósito: el método va a cambiar con la
práctica, y el vocabulario no debería moverse cada vez que eso pase. **Si los dos
discrepan, gana la especificación.**

---

## 1. El procedimiento

### Paso 0 — Leer el `full_description` verbatim del canónico

No un record, no un resumen, no el título. **Un record es una medición fechada, no el
estado de hoy.** En la sesión que produjo este documento hubo tres correcciones por
citar records como si fueran disco.

### Paso 1 — `failure_surfaces`, primero

Va primero porque es el que más se equivoca por defecto y porque ajusta la severidad.

> **Si este run se hace mal, ¿quién se entera, y cuándo?**

- Se rompe algo y salta solo → `LOUD`
- Se ve al mirar el resultado → `VISIBLE`
- Nada se rompe, y se descubre cuando ya se propagó → `SILENT`

**`SILENT` no es el valor prudente: es un valor con carga probatoria.** En el piloto
se puso `SILENT` en siete runs seguidos y la escala dejó de discriminar hasta que una
pregunta del operador lo destapó. Si el método del run es una persona mirando la
pantalla, el fallo se ve mientras ocurre: es `VISIBLE`.

**Regla derivada, medida tres veces:** cuando el entregable es una regla que un
validador hace cumplir, la superficie es `SILENT` por defecto — el modo de fallo de
un validador no es romperse, es no dispararse.

### Paso 2 — `blast_radius`, contando

**No se razona: se cuenta.** Enumerar los consumidores presentes y planificados, con
su ruta.

**Fijar el criterio ANTES de ver el número.** En el piloto fue: si el campo pasa por
una pieza compartida → `ADJACENT`; si se cablea a mano en cada capa → `SYSTEMIC`.
Fijarlo después es contar hacia la etiqueta que uno ya quiere.

**Registrar la RAZÓN, no solo el valor.** En dos runs del piloto el valor era correcto
y la razón dada era falsa. Si solo viaja el valor, el siguiente lo hereda con la razón
falsa y la aplica donde sí cambia el resultado.

**Un consumidor es quien depende del artefacto. Los tests de la misma superficie no
son consumidores: son su verificación.**

### Paso 3 — `work_type` y `correctness_model`, juntos

**No son independientes.** La especificación §3 prohíbe `SPECIFIED`+`FOUNDATIONAL` y
`FOUNDATIONAL`+`LOUD`. Elegir uno restringe al otro, así que se deciden en el mismo
acto.

> **¿Este run AÑADE FUNCIÓN, o PONE SUELO?** Poner suelo es congelar una forma que
> otros van a obedecer y que deshacer costaría una enmienda. Eso es `FOUNDATIONAL`,
> y arrastra `JUDGED_*`.

> **¿Contra qué se juzga que está bien?** Un criterio escrito de antemano →
> `SPECIFIED`. Una referencia que ya existe, y alguien acepta o rechaza contra ella →
> `JUDGED_ACCEPTS`. Nada contra qué medirse, porque el run define su propio criterio →
> `JUDGED_DEFINES`.

**Precisión adjudicada:** que el operador deba satisfacer una precondición **antes**
de que el run arranque **no** lo hace `JUDGED_DEFINES`. Lo que un run tiene que
ESPERAR no es lo que un run HACE.

### Paso 4 — `external_effects`: es censo, no juicio

¿El run escribe fuera de su repo, u obliga a un proyecto que no toca? Formas en uso:

- **`writes_repo:<proyecto>`** — el run escribe en otro repositorio.
- **`obliges_project:<proyecto>`** — produce una norma que otro proyecto debe
  obedecer, sin tocarlo.

Vacío se deja **ausente**, no como lista vacía. La guarda sube el cierre a
`SEMI_ATTENDED` como mínimo; nunca lo baja.

### Paso 5 — Mezcla

> **Un run es MIXTO cuando su propia superficie de ESCRITURA abarca dos naturalezas
> distintas.** La frontera es dónde el run escribe, no de qué depende ni de qué habla.

**Regla provisional, mientras las tres reglas mecánicas de §7 sigan abiertas:** si un
run sostiene varias superficies de fallo, **gana la peor**; y si eso sube injustamente
al run entero, **la señal es partirlo**.

**El censo de mixtos se hace contra la población del día en que se cierran las reglas,
no contra la de la sesión que lo levantó.** Los dos censos que existían al escribir
esto —el de `aiw-console` y el de `aiw`— tenían el mismo agujero: los runs nuevos. En
`aiw-console` eso hizo que se declarara ausente una mezcla que sí estaba.

### Paso 6 — No derivar a mano

`severity` y `closure_mode` los calcula el motor y **nunca se almacenan**. En el
piloto se derivó una a mano, entró en un criterio de aceptación y el taller paró:
`COSMETIC` × `LOCAL` = MINOR, y `SILENT` suma un paso → **MODERATE**.

**Corolario:** si se quiere confirmar una predicción de derivación, **se deja fuera
del ticket**. Escrita en el criterio, el taller verifica la aritmética de quien la
escribió, no la del motor.

---

## 2. Las familias: para ordenar, no para heredar

Agrupar runs parecidos ahorra repetir el razonamiento y ordena la conversación.
**No sirve para heredar valores.**

Medido en el piloto: **las tres familias se partieron, cada una por un campo
distinto.** Una se partió en `correctness_model`, otra en dos pares por
`external_effects`, y la tercera —uniforme en cierre— se partió en todo lo demás.

**Las familias se descubren por naturaleza del trabajo, no por fase.** Se verifica
contra la fase; cuando divergen, gana la naturaleza y la divergencia se anota.

---

## 3. Los cuatro defectos de método, con su remedio

1. **Una tabla terminada solo admite sí o no**, y la que cuesta menos es sí. Aislar
   **la pregunta que decide los valores** y presentarla antes que la tabla.
2. **Antes de declarar que el modelo falla, releer la definición del campo y buscar el
   caso que lo demuestre.** Si no aparece el caso, no es fallo del modelo: es una
   lectura. En el piloto se emitieron tres «huecos del modelo» y dos eran lectura.
3. **Contar antes de etiquetar `blast_radius`**, y guardar la razón junto al valor.
4. **Una cifra marcada «por verificar» no puede ser además el gatillo de una parada.**
   La convierte en trampa. La parada cuelga de la IDENTIDAD —`run_id`, título,
   `depends_on`—, que es lo que se rompe de verdad cuando alguien inserta un run.

### 3.1 El error de lectura que hay que conocer

**`closure_mode` NO es una escala de riesgo. Mide PRESENCIA**: cuánta persona hace
falta DENTRO del run para que cierre. `severity` mide DAÑO. Van en ejes distintos y
pueden cruzarse.

Los dos casos medidos en el piloto:

- El run del corte: **CRITICAL** y `SEMI_ATTENDED` — el daño es máximo, pero cuando
  ejecuta ya está todo decidido y sus compuertas son aristas reales.
- La auditoría visual: **MODERATE** y `ATTENDED` — el daño es medio, pero sin la
  persona dentro el run no puede terminar.

---

## 4. Irreversibilidad, adjudicado

> **Un acto es irreversible cuando el sistema, tal como está construido, no tiene ruta
> de vuelta.** No cuenta que git lo permitiría si esa ruta no existe en el código, ni
> cuenta si la única vuelta atrás exige un acto que la doctrina prohíbe.

---

## 5. Dos notas de alcance que NO son huecos del modelo

- **`care_budget` es consejo dirigido al TALLER.** En un run que se ejecuta en cabina
  se queda sin destinatario. No es defecto: la especificación §5 lo declara consejo,
  no regla dura.
- **La irreversibilidad no tiene eje propio** y llega a la severidad de rebote, por
  `blast_radius` y `failure_surfaces`. **Hueco declarado, SIN caso medido.** El
  candidato nombrado por el hilo `aiw` existe solo bajo una reordenación que aún no
  está en disco, y por eso no cuenta como testigo.

---

## 6. Lo que este documento NO resuelve

1. **Las tres reglas mecánicas de runs mixtos** siguen siendo el hueco de
   `CLASIFICACION-DE-RUNS.md §7`. La población de casos reales al escribir esto son
   tres. **No se reconstruyen por coherencia**: se cierran con los casos de `aiw`
   delante y su censo actualizado.
2. **Cómo se DECLARA la calibración de un `completed`.** Sin un solo caso. Los 43
   `completed` de `aiw-console` se quedan sin clasificar.

---

## 7. El piloto: los doce de `aiw-console`

Clasificados y escritos por el motor. Reparto derivado:

| `severity` | nº |
|---|---:|
| CRITICAL | 6 |
| MAJOR | 3 |
| MODERATE | 3 |
| MINOR | 0 |

| `closure_mode` | nº |
|---|---:|
| `ATTENDED` | 4 |
| `SEMI_ATTENDED` | 6 |
| `UNATTENDED` | 2 |

**Esta cola no produce ningún MINOR**, y se declara sin maquillar: es dato de
calibración. Los cuatro escalones no están ocupados. Los seis CRITICAL son los que
tocan el esquema que obedecen tres proyectos o actúan sobre otro repositorio.

**Los dos `UNATTENDED` son los primeros candidatos reales a ventana desatendida que
este workspace ha producido.**

---

## 8. Cómo se corrige este documento

**Hacia adelante.** Los records que lo alimentan son mediciones fechadas y no se
reescriben. Una corrección entra como sección nueva o como enmienda datada, con la
medición que la respalda.

---

## 9. La clasificación entra con el alta — añadido 2026-08-03

**Adjudicado por la cabina y el operador** (run `queue_order` 46 de `aiw-console`,
`RUN-CONSOLE-PROGRESS-NORMATIVE-001`; record
`context/aiw-console/records/PROGRESS-COMO-NORMA.md`):

> Un run que se CREA se clasifica en el mismo acto. El ticket que lo crea escribe
> sus cuatro valores y su lista de guarda, o declara POR ESCRITO por qué no y en
> qué turno se hará.

Su caso medido, en una línea: el primer run creado tras instituirse el
procedimiento (`RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001`, hoy `queue_order` 47)
entró sin clasificar, y lo detectó el operador mirando la pantalla, no ningún
mecanismo — sin clasificar no es error de ningún validador ni blocker de ninguna
vista, así que la única alarma era la nota de la consola, y la clasificación llegó
al día siguiente por encargo aparte
(`records/CLASIFICACION-Y-REPARACION-REGISTRO-DE-CAMPOS.md`).
