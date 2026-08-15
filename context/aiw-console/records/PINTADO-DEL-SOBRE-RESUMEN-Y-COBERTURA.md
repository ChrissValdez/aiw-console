# `#60` `RUN-CONSOLE-REPORT-ENVELOPE-RENDER-001` — la consola pinta lo que el sobre promete

**Medición fechada: 2026-08-15** · encargo de taller, entregado **sin commitear** (git es del
operador). Guarda de aborto verificada contra `roadmap/roadmap.json`: `queue_order: 60` →
`RUN-CONSOLE-REPORT-ENVELOPE-RENDER-001`, `status: "active"`, título verbatim del canónico:
*«The console paints what the envelope promises: the emitter's summary, and the criteria a
run was measured against»*.

La norma es `docs/SOBRE-DEL-REPORTE-v1.md` (v1, CONGELADO 2026-08-15). Lo construido aquí es
exactamente su §3.2 (lo PROMETIDO): el resumen del §4, la cobertura del §6 bajo la D-067, y
`profile_data` + `header_satisfies` en pantalla.

---

## 1. El punto de partida, medido — y el punto de llegada

```bash
# antes (coincide con el Anexo A.2 del sobre):
grep -c "satisfies\|profile_data" project-console/assets/run-report-renderer.js   # → 0
# después:
grep -c "satisfies\|profile_data" project-console/assets/run-report-renderer.js   # → 14
```

Base de la suite verificada antes de tocar nada: **717/717/0** (`npm test`). Al cierre:
**732/732/0** — quince tests nuevos en `tests/run-report-envelope-render.test.mjs`.

## 2. Lo que pinta ahora el renderizador — mapeado a la norma

Todo en `project-console/assets/run-report-renderer.js` + `.css`; **ni un byte en
`project-console/serve.mjs` ni en `console/serve.mjs`** (`git diff --stat` vacío en ambos).
Cero ramas por proyecto o tipo de ítem; la suite de tokens vetados creció con la cosecha
nueva (§5) y pasa.

- **Resumen del emisor (§4)** — sección propia al frente del contexto, con las TRES capas
  separadas: la **escrita** son las tres preguntas fijas y sólo ellas, verbatim; la
  **derivada** es una franja aparte rotulada «Derivado del dato — nadie lo escribe» (ítems
  por tipo, pasos que piden veredicto, cumplidos de cobertura), ciega a cualquier cifra que
  la prosa afirme (probado: la prosa dice 99, el dato pinta 2); la **prohibida** se cumple
  por lo que la vista no hace — no compone prosa.
- **Los cuatro estados de una pregunta del resumen** (§4.2–§4.3): prosa → verbatim;
  `{absent:{why_not}}` → hecho declarado CON su motivo (y `who_could` si viene); **cadena
  vacía → incumplimiento visible** («Vacío y sin motivo declarado…»), nunca disfrazado de
  «sin declarar»; `absent` sin `why_not` y clave ausente → «nadie lo miró», idéntico a
  propósito (es la promesa del §4.3, no un accidente). Reporte sin bloque `summary` → la
  ausencia misma se pinta (sección + insignia en raíl).
- **Cobertura (§6.4, lectura dura D-067)** — sección con los tres rótulos de la decisión.
  **«Cumplidos y declarados»**: derivable EXACTO del reporte solo — `citados − declarados`
  no necesita inventario porque `satisfies` apunta a ids del perfil por contrato — con cada
  id acompañado de su evidencia: ítems que lo citan (enlazados a su tarjeta) y/o la clave de
  cabecera. **«Declarados sin cumplir»**: las declaraciones mismas — ids de `affects`
  verbatim y `why_not` verbatim, jamás clasificado (§3.2), jamás contado como «criterios»
  (véase §4 de este record). **Regla 5 visible**: un id citado Y declarado se resta de los
  cumplidos y se pinta tachado con «también citado — la cita no cuenta como cumplido».
  **«Silencio = no revisado»**: la regla, en voz alta y no neutra.
- **`header_satisfies` (§6.3)**: cada cita con su `where` verbatim, sus ids, y **la
  evidencia que el `where` alcanza, citada en pantalla** (una cita que el operador no puede
  comprobar es una cita mal pintada); un `where` que no resuelve declara la clave
  inalcanzable por su nombre — la misma honestidad que los previews.
- **`profile_data`**: bloque «Figures of the profile / Las cifras del perfil», claves
  humanizadas (espacio de nombres del emisor: se muestra, no se nombra), **un `null`
  declarado pinta el guion «—» de la tabla de recuentos, nunca la palabra `null`** (§5.3:
  la cifra va nula y el motivo al lado).
- **`satisfies` por ítem (§2.2)**: chips en la tarjeta; `satisfies: []` → «no cita ningún
  criterio» + su `satisfies_note` verbatim (C1 del piloto lo estrena en pantalla).

## 3. GANA EL DISCO — las dos cifras del ticket que el disco ya movió

**El reporte real adoptó el sobre entre la medición del ticket y este run.** El fichero
`cantu-quizzes-latex/reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json` trae HOY
`summary` (tres claves en prosa, conforme §4.2), `header_satisfies` (las tres entradas del
§8.4.4.1), `QZ-C-COUNT-MOVE` en `R1`/`R2`, `QZ-C-DISTR` en el `affects` del punto ciego que
declara su irreproducibilidad, y 7 puntos ciegos (los dos del §8.4.4.4 y el de los cuatro
duros incluidos). Es decir: **las adiciones 1–4 del §8.4.4, más los cuatro duros declarados
como hueco.**

1. **«La cabina publicó 10 criterios tocados y la honesta es 9»** — verdad del disco de
   ANTES de la adopción. Hoy, con mi comando (la derivación del §6.4 leyendo
   `header_satisfies`, la del Anexo A.2):

   ```bash
   cd projects/cantu-quizzes-latex && node -e "const fs=require('fs');const p=fs.readFileSync('docs/PERFIL-REPORTE-QUIZZES-v1.md','utf8');const ids=[...new Set([...p.matchAll(/^\| \`(QZ-C-[A-Z0-9-]+)\`/gm)].map(m=>m[1]))];const r=JSON.parse(fs.readFileSync('reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json','utf8'));const cit=new Set([...r.items.flatMap(i=>i.satisfies||[]),...(r.header_satisfies||[]).flatMap(h=>h.satisfies||[])]);const dec=new Set(r.blind_spots.flatMap(b=>b.affects||[]).filter(a=>ids.includes(a)));console.log('citados',cit.size,'| cumplidos',ids.filter(x=>cit.has(x)&&!dec.has(x)).length,'| declarados',ids.filter(x=>dec.has(x)).length,'| silencio',ids.filter(x=>!cit.has(x)&&!dec.has(x)).length)"
   # → citados 14 | cumplidos 13 | declarados 16 | silencio 0
   ```

   **Citados 14 (11 por ítems + 3 por cabecera) · cumplidos 13 · declarados 16 · silencio
   0** — la proyección «tras 1–4» del §8.4.4, ahora hecha disco. La distancia 9-vs-10 del
   ticket ya no existe como defecto: `QZ-C-DISTR` está declarado con su id en un `affects`
   y **la resta del §6.4 lo excluye por dato, sin leer prosa** — la regla 5 funcionando,
   que es lo que el criterio de aceptación 2 exige. La suite lo fija con nombres, sobre el
   reporte real y sobre un caso mínimo.

2. **«Ningún reporte trae un `summary` todavía»** — también quedó viejo: el piloto lo trae,
   conforme, y este run lo pinta verbatim (fijado en suite). Los estados que ningún reporte
   real trae (ausencia declarada, vacío sin motivo, `absent` sin `why_not`) se prueban
   contra reportes mínimos en la propia suite — que era lo esperado por el ticket, y sigue
   siendo cierto para esos estados.

**Ninguna de las dos es contradicción del reporte con el contrato congelado** (la parada
prevista): es el emisor SIGUIENDO al contrato después de que el ticket midiera. No hubo que
parar.

3. **⚠ La adopción del emisor está SIN COMMITEAR en su repo.** `git status` en
   `cantu-quizzes-latex` muestra `M reports/.../report.json` (y el veredicto no-real del
   `#58` retirado a `verdict.PRUEBA-DE-HERRAMIENTA-NO-ES-VEREDICTO.json` +
   `_verdict.json.RETIRADO`, con `.project/reports_index.json` sin trackear). **Nada de eso
   es de este run — aquí no se escribió ni un byte en aquel repo.** Pero las cifras que la
   suite de la consola fija (14/13/16/0, 18 ítems, 7 puntos ciegos) son las del disco de
   hoy, no las del último commit del emisor. Si el operador descartara aquella adopción en
   vez de commitearla, la copia versionada CASO-1 quedaría describiendo un fichero que ya no
   existe y habría que refrescarla de vuelta.

## 4. HALLAZGO — el inventario de ids del perfil no tiene canal máquina hacia la consola

El §6.4 deriva sus tres cifras contra «los ids del PERFIL declarado». Medido: el inventario
(29 `QZ-C-*`) vive en el documento del perfil del emisor y **no viaja por ningún canal que
la consola lea** — no está en el reporte (§2.1 no tiene campo para él), no está en
`reports_index.json`, el proyector no conoce `profile`, y parsear el `.md` del emisor
exigiría un regex de dominio (`QZ-C-…`) que la ceguera veta, o una ruta nueva en `serve.mjs`
que este run tiene prohibido tocar.

**Consecuencia, y así quedó construido:** la consola deriva EXACTO lo que el reporte
sostiene — cumplidos (la resta no necesita inventario), la resta de la regla 5, y las citas
con su evidencia — y **se niega a fabricar la precisión que el dato no tiene** (§6.4: «sería
fabricar una precisión que el dato no tiene»): no enumera ids silenciosos ni cuenta
«declarados» como criterios (en `affects` van mezclados ids de ítem y códigos de pregunta a
propósito). El cubo del silencio pinta LA REGLA de la D-067 — «no revisado», no neutro — y
dice por qué ahí no hay lista: el inventario vive con el perfil.

**Queda para el operador, como encuadre y sin decidirlo aquí** (misma vía que la D-068.3,
que ya trató «lo que el perfil declara una vez»): si algún día quiere los tres números en
pantalla, el inventario tendría que viajar en dato — por ejemplo, el perfil publicándolo en
forma legible por máquina (petición al emisor, no imposición), o una decisión numerada que
añada el canal. Hasta entonces, la cifra completa se produce con el comando del Anexo A.2,
como hasta hoy.

## 5. El método: copia desechable, y la suite como inventario

- **CASO-1 re-copiado del reporte real** (byte a byte; su identidad declarada es «copia
  versionada del piloto» y una copia que deja de seguir a su original deja de serlo). El
  espejo QA `tests/fixtures/reports-qa/reports/RUN-QA-REPORT-AUDIT-001/report.json` se
  re-copió igual — su propio pin exige identidad byte a byte. **Nota:** el
  `reports_index.json` emitido de ese fixture conserva su `emitted_at` viejo
  (`2026-08-08T22:40:00Z`) frente al del reporte refrescado (`2026-08-13T00:00:00Z`);
  ningún test compara ambos, re-emitir `.project/` está fuera de alcance, y fabricar a mano
  un índice que se declara «generated_from: aiw-projector» sería peor que la deriva. Queda
  dicho.
- **La suite inventarió los sitios** (cero `grep` de rastreo): el refresco movió 11
  aserciones y cada una se actualizó con su porqué en comentario `[#60]` — pasos 12→21,
  insignias 2→7, «not declared» de CASO-4 que ahora es exactamente la ausencia del resumen
  (2 insignias), RUN-X 6→8, el corpus de agujas vetadas 94→**160** (la cosecha ahora incluye
  `satisfies` por ítem y de cabecera, `affects` y las claves de `profile_data`; `where` NO
  se cosecha a propósito — nombra claves del sobre, vocabulario propio del renderizador).
- **Dos pins se afinaron sin perder diente**, porque el disco los alcanzó: el barrido de
  claves crudas pasó de «en toda la página» a «como etiqueta de fila» — el `summary` del
  emisor cita `verification_reason` por nombre en su prosa y la prosa viaja verbatim—; y el
  test del `unchanged` de R1, que fijaba los identificadores `["statement","options",
  "feedback"]`, ahora fija la prosa del emisor («el enunciado», …) que el propio emisor
  corrigió, y conserva la capacidad de traducción probada en la unidad (`rrUnchangedLabel`).

## 6. Criterios de aceptación, uno a uno

1. Criterios y cobertura contra el reporte REAL, cifra verificada ✔ (§3 de este record).
2. Silencio = «no revisado», no neutro ✔; irreproducible declarado no cuenta como cumplido ✔
   (resta por dato; fijado en real y en mínimo).
3. Resumen por presencia de campo, tres capas separadas ✔; estados sin reporte real →
   fixtures ✔ (y el real, que ya trae uno, también fijado).
4. Ausencia con motivo pinta CON su motivo ✔; vacío sin motivo se ve como incumplimiento ✔.
5. Ciego al dominio ✔ — cero ramas nuevas; tokens vetados 160 agujas, verde; el intento
   `it.type !=` de esta misma sesión lo mordió la suite y se reescribió al idioma de la casa
   (tercera mordida del veto a un autor: sigue funcionando).
6. Rutas de escritura intactas ✔ — `git diff` vacío en ambos `serve.mjs`.
7. Suite entera verde ✔ — **732/732/0** (base 717/717/0 verificada, +15).

## 7. Lo que este run NO hizo

No escribió en el repo del emisor (su `git status` es suyo, §3.3). No re-emitió `.project/`.
No commiteó ni cerró el run. No tocó los textos rancios (`#65`). No decidió el canal del
inventario (§4 — es del operador). El veredicto real del piloto sigue esperando al operador
— con el bloqueo que él mismo declaró en el `#58` («falta el summary… y los criterios
anexos») **ahora pintado en pantalla**.
