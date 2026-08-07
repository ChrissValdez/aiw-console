# El piloto de Fracciones, el run de erratas, y la QA que queda pendiente

**Hilo `cantu-quizzes-latex` · 2026-08-06, 14:45 CST.** Cierre de la primera sesión del hilo.
Continúa a `ALTA-O4-O5-Y-RUBRICA-V2.md` y `COLA-COMPLETA-O5-Y-CLASIFICACION.md`.

---

## 1. `#1` — cerrado, y su descripción hubo que corregirla antes de abrirlo

**Al ir a preparar el bloque que el operador había pedido, la medición mostró que el run estaba
mal descrito.** Su texto afirmaba que no se tocaba nada más que la cadena del código. Falso:

| Errata | Ocurrencias | Dónde |
|---|---|---|
| `ARI-PI-Interteres` | **15** | un solo fichero, y **solo en el comentario `%% Código:`**. El id del `multi` ya era correcto |
| `GEO-GP-Triangulo` | **104** | **45** comentarios · **45 ids de `multi`** · **14 rutas de `\includegraphics`** |

Y los PNG llevaban la errata: **22 ficheros sin la `s`, 10 con ella**. Renombrar el código sin
renombrar los ficheros habría roto 14 figuras. **La cabina no puede renombrar** —renombrar es
borrar y crear—, así que **se retiró la recomendación del bloque y el run entero fue al taller.**

**Entregado y verificado por la cabina contra disco:** 0 apariciones de cualquiera de las dos
erratas en todo el `.tex`; **21 referencias a figura resolviendo y 0 fallando, igual que antes**;
14 PNG renombrados sin colisiones; recuentos por nivel intactos. Commit `23fa94d`, con los 14
renombrados registrados por git **como renames al 100 %**.

**Tres hallazgos suyos quedan sin dueño**, y el operador aprobó run propio para los tres: el
`\end{m}` de `GEO-GP-Triangulos-Facil-005` que rompe su fichero entero; los dos cuadernos
generadores que siguen emitiendo los nombres de PNG antiguos; y 8 PNG huérfanos.

## 2. `#2` — entregado, pendiente de veredicto humano

**Recuentos: 25/45/20 antes y después. Cero bajas, cero huecos.** Verificado por la cabina:
`begin` = `end` = `\item*` = códigos, en los tres ficheros.

### Dos reclasificaciones

- **`Dificil-001` → `Medio-046` (DESINFLADA).** Es paso por paso la misma estructura que
  `Diagnóstico Medio-018`, y una `Medio` del mismo fichero (`Medio-014`) tiene **un paso más**.
- **`Medio-033` → `Dificil-021` (INFLADA).** Fracción continua de **profundidad 3**, cuando las
  del ancla son de profundidad 1, y `Dificil-019` —que se queda en Reto— también es de 1.

### Cinco correcciones, todas verificadas por la cabina

| Código | Defecto |
|---|---|
| `Facil-014` | **tres respuestas correctas** bajo la letra del enunciado: pedía «su equivalente» y `9/15`, `3/5` y `6/10` lo son. Su propia retroalimentación ya lo reconocía entre paréntesis. Se corrigió el enunciado a «a su mínima expresión» |
| `Facil-012` | `2/8` y `4/16` valían ambos `1/4` → `3/8` |
| `Facil-013` | `3/4` y `6/8` eran el mismo número → `9/8` |
| `Facil-018` | `6/4` y `3/2` eran el mismo número → `3/4` |
| `Facil-020` | notación `-\(\frac{1}{4}\)` → `\(-\frac{1}{4}\)` |

**Y revisó las cinco anteriores de `cae3050`: las cinco correctas, ninguna deshecha.**

### Un hueco declarado y no tapado

`Facil-025` —¿cuál es mayor, `2¼` o `10/4`?— tiene **`No se puede determinar`** como cuarta
opción, descartable sin leer. **No se sustituyó**: la pregunta solo admite tres respuestas con
sentido, y arreglarlo bien es rehacer el ítem. **Entregar el hueco declarado es lo que manda la
§7.3**, y el run lo cumplió.

## 3. LA QA PENDIENTE — 5 pasos

Redactada y entregada al operador. **Se conserva aquí porque es lo único que bloquea el cierre de
`#2` y con él los otros 39 runs.**

**PASO 1 (PARADA) — los dos movimientos de nivel.** Se juzgan comparando: la bajada contra
`Diagnóstico Medio-018` (el bote de pintura) y contra `Medio-014` (la herencia de $240 000, que
tiene un paso más y se queda en PAA); la subida contra `Dificil-019` (que se queda en Reto y es
de profundidad 1). *Si el operador discrepa, el ancla no discrimina y hay que reescribir la
rúbrica antes de los 39.*

**PASO 2 — el criterio «dos opciones con el mismo valor»**, que el taller inventó porque la §4 no
lo tiene y que produjo 3 de sus 5 correcciones. *Si el operador no lo acepta, hay que quitarlo
antes de que se aplique 39 veces.*

**PASO 3 — `Facil-025`**: dejarla, rehacer el ítem, o retirarla y reponer.

**PASO 4 — la política de numeración al mover**: número libre en destino, número vacante **no
reutilizado**, huecos permanentes a cambio de que un código nunca cambie de dueño.

**PASO 5 — dónde duele la ausencia de explicación de distractoras**: 10 preguntas donde un error
plausible aterriza sobre una opción listada, **5 de ellas de la familia «fracción del resto»**,
que es el error canónico del tema. No es defecto; es información para una decisión futura.

## 4. Lo que el piloto enseñó sobre el PROCEDIMIENTO

- **El ancla funcionó, y sobre todo IMPIDIÓ movimientos**: dos preguntas que parecían infladas
  resultaron tener primos enunciados en el examen. Sin ancla se habrían promovido mal.
- **Pero el ancla dice si una OPERACIÓN es de nivel PAA, no si una PRESENTACIÓN lo es.**
  `1½ × 3` desnudo es Fundamentos; `1½ tazas × 4 pasteles` es PAA. **Sobrepromociona el nivel
  Fácil sistemáticamente**, y lo que discrimina es la §3.4, que es rúbrica y no ancla.
- **Los veredictos se apoyan en los EXTREMOS del ancla, no en su centro.** Con 40 el juicio es
  firme; **con 10 se degrada mucho más rápido de lo que sugiere el recuento**. Para los subtemas
  de ancla mínima, mover solo ante diferencias groseras y marcar el resto como provisional.
- **Coste: ~30 llamadas, ~195 KB leídos, cupo en una ventana sin compactar, con poco margen.**
  Los cuatro subtemas de 100 preguntas —`FUN-FF-Evaluacion`, `FUN-FF-DominioRango`,
  `ALG-EQD-SistemasEcuaciones`, `ALG-EXP-Factorizacion`— **probablemente no quepan**, y compactar
  a mitad de una comparación de niveles degrada el juicio sin avisar.
- **Reparto ~40 % mecanizable / ~60 % juicio**, y el 40 % debería correrse ANTES del run para que
  el juicio no gaste contexto en lo que cuenta una máquina. **El chequeo de mayor rendimiento que
  falta es el de valores duplicados entre opciones**: es trivial y encontró 3 de 5 correcciones.
- **`Facil-014`, el defecto duro real del subtema, no lo encuentra ningún `grep`**: hacía falta
  leer que «equivalente» es verdad de tres opciones. Ni siquiera lo delata la clave, que era
  correcta.

## 5. Correcciones hacia adelante

- **La §6.4 de la rúbrica cita «88 de 90» y esa cifra NO es reproducible.** El taller obtiene 1 en
  lectura estricta y 5 en amplia, porque la §6.4 nunca define el criterio. La conclusión —es la
  norma del banco, 94–99 %— se sostiene y se refuerza; **la cifra concreta no debe citarse**.
- **Subtemas y medias, con su alcance, que es lo que faltaba en las dos versiones anteriores:**
  Matemáticas **41 subtemas, media 73,2** · Español **17, media 50,0** · las dos juntas **58,
  media 64,1**. La cabina citó 41 y el taller 58: ninguno estaba mal, faltaba el alcance.
- **El bloque de git de la cabina omitió `.project/docs_index.json` y `.project/roadmap.json`** del
  `add` dirigido. Sin daño; entran en el commit siguiente.

## 6. Ficheros que la cabina no puede borrar

- `_backups/roadmap-cantu-quizzes-latex-ANTES-O4-O5-20260806-1305.json` — ya no hace falta: el
  cambio está commiteado y verificado.
- `_scratch/PRUEBA-ARRANQUE-cantu-quizzes-latex.txt` — prueba de capacidad del arranque.

**Ninguno de los dos viaja a la laptop nueva:** están fuera de todo repo, y es correcto.
