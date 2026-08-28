# `#61` `RUN-CONSOLE-REPORT-COVERAGE-READABILITY-001` — la cobertura se lee para juzgar

**Medición fechada: 2026-08-27** · encargo de taller, entregado **sin commitear** (git es del
operador). Guarda de aborto verificada contra `roadmap/roadmap.json`: `queue_order: 61` →
`RUN-CONSOLE-REPORT-COVERAGE-READABILITY-001`, `status: "active"`, título verbatim del
canónico: *«The coverage section becomes readable for human judgment: the figures first, the
audit detail folded below»*.

```bash
cd projects/aiw-console && node -e "const r=require('./roadmap/roadmap.json');const runs=[];for(const o of r.objectives)for(const p of o.phases||[])for(const x of p.runs||[])runs.push(x);const x=runs.find(v=>v.queue_order===61);console.log(x.run_id,'|',x.status)"
# → RUN-CONSOLE-REPORT-COVERAGE-READABILITY-001 | active
```

El hallazgo es el **H-02** de `HALLAZGOS-67-SUPERFICIE-DEL-REPORTE.md`, con las palabras del
operador: «si es info para el AI está bien, pero si es para mi juicio está muy denso». La
sección **estaba correcta** —la QA del `#60` la aprobó paso a paso, B3-B6, con esta misma
pantalla delante— y era **inservible para el juicio**. La forma la decidió el operador el
2026-08-27: **las tres cifras arriba y, debajo, plegado, el material de auditoría — el objeto
de recuentos crudo y las cifras del perfil.**

---

## 1. GANA EL DISCO — las cifras del ticket, verificadas una a una

**Base de la suite:** el ticket dice 732/732/0 y **manda el disco**. Verificada antes de tocar
nada:

```bash
cd projects/aiw-console && npm test    # → tests 732 | pass 732 | fail 0
```

**Densidad**, medida sobre el reporte piloto vivo
(`cantu-quizzes-latex/reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json`):

```bash
node -e "const a=require('C:/Users/chris/Documents/AIW_Workspace/projects/cantu-quizzes-latex/reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json');console.log('puntos ciegos',a.blind_spots.length,'| ids en affects',a.blind_spots.reduce((s,b)=>s+(b.affects||[]).length,0),'| caracteres de why_not',a.blind_spots.map(b=>b.why_not||'').join('').length);let f=0,g=0;for(const[k,v]of Object.entries(a.profile_data)){if(v&&typeof v==='object'&&!Array.isArray(v)){g++;f+=Object.keys(v).length}else f++}console.log('filas de cifras',f,'| grupos',g,'| total',f+g)"
# → puntos ciegos 7 | ids en affects 28 | caracteres de why_not 1467
# → filas de cifras 21 | grupos 3 | total 24
```

| Cifra del ticket | Disco | Veredicto |
| --- | --- | --- |
| cabecera del perfil, 3 filas | 3 | ✔ |
| 7 bloques de declarados con 28 ids | 7 / 28 | ✔ |
| 1467 caracteres de prosa verbatim | 1467 (piloto vivo) | ✔ |
| 3 citas de cabecera, una imprimiendo un objeto JSON crudo | 3, y la de `where: "counts"` imprime `counts` entero | ✔ |
| 24 filas de cifras del perfil | 21 filas + 3 cabeceras de grupo = 24 elementos | ✔ |
| «14 ids cumplidos con 25 chips de evidencia» | **14 ids CITADOS, de los que 13 son cumplidos**; el 14º es el restado. 24 chips en los 13 + 1 en el restado = 25 | ✔ con matiz: 14 es el citado, no el cumplido |
| la regla del silencio, 277 caracteres | **273** en inglés (`T.silenceRule`) | ✘ — el disco dice 273 |
| suite 732/732/0 | 732/732/0 | ✔ |

**Deriva del fixture, dicha y no arreglada:** `tests/fixtures/reports/CASO-1-audit-contenido.report.json`
es la copia versionada del piloto y **ya no lo sigue**: le falta el grupo `compilation`, así
que da **16 filas de cifras y 1424 caracteres** donde el piloto vivo da 21 y 1467. Re-copiarlo
mueve el corpus de agujas vetadas y las aserciones del `#60`; **está fuera del alcance de este
encargo** y queda apuntado.

## 2. Lo construido — y de quién es cada decisión

Todo en `project-console/assets/run-report-renderer.js` + `.css`. **Ni un byte en
`project-console/serve.mjs` ni en `console/serve.mjs`, ni en ninguna ruta de escritura, ni en
el repo del emisor** (`git diff --stat` vacío en ambos `serve.mjs`; el único fichero tocado
fuera de los dos del alcance es el test nuevo).

**EL VISTAZO (arriba, fuera de todo pliegue).** Tres casillas, una por cajón, con el rótulo
que el cajón ya llevaba:

- **Cumplidos y declarados → `13`.** Es la resta exacta de la D-067 (`citados − declarados`),
  la misma que pinta el cajón. Único número que el reporte solo sostiene.
- **Declarados sin cumplir → `7`.** Cuenta **declaraciones**, y la casilla lo dice: «nunca un
  recuento de criterios; sus ids quedan abajo, verbatim». Contar los 28 ids como criterios
  exigiría el inventario del perfil, que no viaja en el reporte (§4 del record del `#60`).
- **Silencio = no revisado → `no revisado`, SIN CIFRA.** Aquí la decisión del operador dice
  «las tres cifras» y la D-067 dice que el silencio **nunca** se vuelve un número neutro.
  **Manda la regla intocable**: la casilla lleva la palabra del veredicto, no un `0`, y se
  rotula a sí misma «una regla, no una cifra». El cajón de abajo sigue enunciando la regla
  entera. **Esto es una desviación de la letra del encargo y va declarada aquí**, no
  escondida: si el operador quiere tres números, primero hay que abrirle canal al inventario,
  que es el hueco que el `#60` ya le encuadró y él no ha decidido.

**EL PLIEGUE (debajo, cerrado al llegar).** «Material para auditar», un `details` alrededor
del **mismo marcado que se pintaba antes**: se abre byte a byte igual, cada `where` junto a la
evidencia que alcanza y cada cifra con su clave. Contiene lo que el operador nombró: el objeto
de recuentos crudo y las cifras del perfil.

**Un caso que el encargo no cubre literalmente, y por qué NO se paró.** El «objeto de
recuentos crudo» no existe suelto: **es la evidencia de una cita de cabecera**, y una regla
intocable ata cada `where` a la evidencia que alcanza. Meter el objeto en el pliegue y dejar
su `where` fuera rompería esa regla. Partir el bloque —una cita adentro, dos afuera— sí sería
inventar el criterio «qué cita es auditoría», que es juicio del operador. Así que **el bloque
de citas viaja entero al pliegue**, completo, que es la única salida que no inventa criterio
nuevo. **Se trae el caso como lo pide la condición de parada** (§5) por si el operador lo
resuelve al revés; el resto de la clasificación sí la cubrió su decisión y no hubo nada más
que decidir.

**Lo que NO se movió, a propósito:** los tres cajones siguen visibles y sin plegar. El
encargo define «detalle de auditoría» por aposición —el objeto de recuentos y las cifras del
perfil— y no autoriza plegar más.

## 3. Efecto medido en pantalla real

Medido en la consola sirviendo desde disco (`127.0.0.1:8788`), sobre el **piloto vivo**, con
`getBoundingClientRect()` de la sección `#rr-sec-coverage`:

| | antes | ahora |
| --- | --- | --- |
| alto de la sección al llegar | **2544 px** | **1692 px** (−33%) |
| lo primero que se ve | la cabecera del perfil y luego cien elementos al mismo nivel | **144 px con las tres casillas** |
| material de auditoría | al mismo nivel que todo lo demás | **996 px, plegados, a un clic** |

Y lo que sigue intacto en la misma medición: `3` filas de citas de cabecera, `7` bloques de
declaraciones, `1` id tachado, `21` filas de cifras + `3` grupos dentro del pliegue.

## 4. Cada regla intocable, clavada por un test CON NOMBRE

Fichero nuevo `tests/run-report-coverage-readability.test.mjs`, **13 tests**. Cada uno se
llama por la regla que guarda, no por el marcado que lee:

| Regla del encargo | Test que la clava |
| --- | --- |
| Las tres cifras se leen sin abrir nada | *«the three figures ride on TOP of the coverage, before any bucket and outside every fold»* |
| El silencio enuncia su REGLA y nunca es una cifra | *«UNTOUCHABLE — silence carries NO figure…»* (en los dos idiomas; falla si aparece un dígito) |
| Los declarados nunca se cuentan como criterios | *«UNTOUCHABLE — the declared slot counts DECLARATIONS and says so…»* |
| Ids y `why_not` verbatim, sin clasificar | *«UNTOUCHABLE — every declared id and every why_not stays on screen VERBATIM…»* (recorre los 7 puntos ciegos del disco) |
| Cada cita conserva su `where` **y** la evidencia que alcanza | *«UNTOUCHABLE — every header citation keeps its `where` AND the evidence…»* (compara contra `rrResolvePath` y contra `JSON.stringify(counts)`) |
| El id restado sigue tachado y visible con su frase | *«UNTOUCHABLE — the subtracted id stays STRUCK and visible with its sentence…»* |
| El detalle se pliega, no se quita ni se resume | *«the audit material is FOLDED, closed on arrival…»* + *«the profile figures open COMPLETE — every key, every value…»* |
| Cero ramas de dominio | la suite de tokens vetados, intacta, **160 agujas, verde**; más *«the coverage shape is one shape — the same markup for a report that shares no word with the pilot»* |

**Los tests muerden — probado, no supuesto.** Seis mutaciones introducidas a mano en el
renderizador y revertidas después, cada una falla exactamente el test de su regla:

| Mutación | Resultado |
| --- | --- |
| la casilla del silencio pinta `0` | falla 1 test — el del silencio |
| se quita la evidencia de las citas de cabecera | fallan 3 — los de la cita comprobable |
| el pliegue llega abierto | falla 1 — el del pliegue |
| `why_not` truncado a 60 caracteres | falla 1 — el del verbatim |
| el id restado deja de tacharse | fallan 2 — el de la resta y el de forma única |
| la casilla de declarados cuenta los 28 ids | fallan 2 — el de declaraciones y el de derivación |

## 5. Criterios de aceptación, uno a uno

1. Las tres cifras se leen de un vistazo, sin abrir nada ✔ — 144 px al frente de la sección,
   fuera de todo pliegue. **Con la salvedad declarada del §2**: la tercera casilla lleva la
   regla, no un número, porque la D-067 lo prohíbe.
2. El detalle de auditoría alcanzable y completo ✔ — plegado, nunca quitado, nunca resumido;
   el test recorre clave a clave y valor a valor.
3. Cada regla intocable clavada por un test con nombre ✔ (§4), y cada test probado por
   mutación.
4. Cero ramas de dominio ✔ — 160 agujas vetadas, verde; el vocabulario nuevo pasa por la
   tabla de idiomas como todo lo demás.
5. Ni un byte en `serve.mjs` ni en ruta de escritura ni en el repo del emisor ✔.
6. Suite entera verde ✔ — **745/745/0** (base 732/732/0 verificada, +13).

```bash
cd projects/aiw-console && npm test    # → tests 745 | pass 745 | fail 0
```

## 6. Lo que este encargo NO hizo

No tocó la posición enterrada del resumen del emisor (H-01) ni los ids internos que no salen
en pantalla (H-03): son hallazgos de otros runs. No cambió el estado del run, no re-emitió
`.project/`, no commiteó, no tocó el roadmap. No refrescó `CASO-1` pese a la deriva del §1.
**No decidió el canal del inventario del perfil**, que es lo que impide que la tercera casilla
lleve un número.

**El veredicto visual es del operador y ninguna medición de este repo lo sustituye.** La
pantalla está servida en `http://127.0.0.1:8788/project-console/index.html`.
