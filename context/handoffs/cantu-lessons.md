# HANDOFF — hilo `cantu-lessons` (LECCIONES)

> **Quinto relevo de este hilo.** Lo escribió la cabina el **2026-10-31 a las 00:05** en la PC (`DESKTOP-525K0IS`), antes
> de que el operador compactara la conversación de la cabina (la que abrió el 2026-10-29). Sustituye al cuarto relevo
> (2026-10-29, con añadidos del 30; está en git, `aiw-console` `f118fed`, con la tabla de lo que salió del relevo de
> septiembre).
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el disco al abrir. Gana el disco.**
>
> **La cabina abre leyendo enteros** `context/cabinas/lecciones/CLAUDE.md` y `context/cabinas/REGLAS-DE-CABINA.md`. La
> app abre la sesión en `AIW_Workspace`, así que ese `CLAUDE.md` **no se carga solo**.

## Dónde estamos (2026-11-06, 15:55) — antes de compactar la conversación de la cabina

> Lo escribió la cabina antes de que el operador compactara su conversación (CARRILES v2, «Ahorro y velocidad»). Lo de abajo, desde
> «Dónde estamos (2026-10-31, 00:05)», es historia. **Gana el disco:** el veredicto, los encargos de `docs/carriles/` y `tablero.json`.

**Los carriles (sesiones enlazadas a la cabina):**
- CR-GW `local_ec02efe0-9621-4021-bb4a-7d666e418d3f`;
- CR-GS `local_1a18fc95-7a2d-4918-b1fa-dd2b714f3416` (renovada a las 17:34; la vieja, `local_49a75736…`, archivada);
- CR-LW `local_4a414da2-60b9-4ccf-b42b-ddecaee83b21`;
- CR-LS `local_7c6e3e45-a14b-4444-bb79-721be4b4083a`;
- CR-PL `local_4c741188-e71b-48a9-a760-74382af20e8c`.

**Lo que está en curso:**
- **CR-GS·14** (las tandas del color y la norma; `docs/carriles/CR-GS/14-encargo.md` y sus adendas):
  - falta L12·D5: una opción nueva sobre la 5, más su pieza `L12-b4-A2c` (adendas de las 15:44 y las 15:46);
  - después deja su relevo, y **la cabina abre otra sesión de CR-GS** (contexto al 77 %), archiva la vieja y le apaga antes el Remote
    Control.
  - **15:59: L12·D5 entregada (la 6, en la galería 8e421a1) y relevo escrito** (`docs/carriles/CR-GS.md`, `1857f00`). **Ya abierta (17:34):** por Remote Control la app no deja abrir sesiones ni proponer tarjetas. Se abre con un mensaje del operador
    escrito en la app de escritorio. El brief está en `_scratch/cabina-lecciones/brief-cr-gs-2.md`. Mientras tanto, la sesión vieja sigue disponible.
- **CR-LS·13** (escribe las tandas; adendas en `docs/carriles/CR-LS/13-encargo.md`):
  - escritas y publicadas: A, B, A2 (L07), A3 (L21) y la C1 de L02 a L12;
  - L13 ya está escrita (`6001620`) y falta publicarla; sigue el resto de la C1, y luego la C2;
  - `L12-b4` espera la A2c. `L18-b4-C` y `L24-b5-C` van como estaban (solo la norma);
  - al cerrar la C, la cabina la pasa a Sonnet (`set_session_model`).
- **CR-PL·29:** plegar cada área del inicio, la vista «Hoy» del tamaño de las demás, y quitar la regla que dejaba aprobada L01·web
  por `estados.json`. CR-PL·27 y ·28 (las dos revisiones: Chris, Meche y Final) ya están integradas.
- **CR-GW y CR-LW, sin trabajo** desde las 13:00. Lo siguiente: la norma de letra y aire de la web, cuando cierre la tanda C.

**2026-11-07, 00:40 · El subtítulo de las rutas y el piloto de álgebra** (veredicto y encargo en cantu-lessons `0911d44`).
- **CR-PL·34 encargado (00:41):** el subtítulo de CR-PL·33 hace bien su trabajo, pero «no se ve tan bonito». La primera fase son tres
  versiones con fotos en `_scratch\CR-PL\34\fotos\`, sin integrar. **00:50, el operador se queda con la de hoy:** «no, la version
  actual sigue siendo la mejor, asi dejemosla de momento» (veredicto, cantu-lessons `90f08c4`). CR-PL·34 se cierra sin código: CR-PL
  escribe el informe corto (`34.md`), la bitácora y el relevo, y avisa con el commit para publicarlo.
- **«Agrupar por tema» (00:54):** el operador lo quiere **sin la etiqueta examen/base**. El grupo es el quiz. Lo que manda es el
  orden: las lecciones del grupo, y debajo el renglón del quiz. La cabina midió `temario/aritmetica.json`:
  - El `orden` ya intercala cada quiz después de las lecciones que lo preparan.
  - **Ninguna lección se queda sin quiz.** ARI-10, 20, 22 y 26 son mitades de lecciones partidas después del temario. ARI-26 lo
    dice su borrador (`ARI-PI-Intereses`); ARI-22 lo dice el veredicto (RW-21 partió L11); ARI-10 y ARI-20 se deducen de su
    lección madre.
  - **Los 8 grupos:**
    - Propiedades: ARI-01–02
    - Operaciones: ARI-03–10
    - Teoría de números: ARI-11–14
    - Fracciones: ARI-15–17
    - Porcentajes: ARI-18–20 y ARI-23
    - Notación científica: ARI-21–22
    - Intereses: ARI-24–26
    - Conjuntos: ARI-27–29
  - **Dos casos para él:**
    1. El `orden` cierra Propiedades después de L04. En cambio, «Practica en» de L03 y L04 y el «Lo prepara» del quiz dicen
       Operaciones. La cabina recomienda que Propiedades cierre en ARI-02.
    2. ARI-23 es complementaria, pero prepara el quiz de Porcentajes. La cabina recomienda que el quiz cierre tras ARI-20 y que
       ARI-23 quede en la complementaria como refuerzo de ese quiz. Pasarla a esencial obligaría a renumerar.
  - **Con su sí:** el campo `quiz` en `codigos.json` y el encargo del modo a CR-PL.
  - **01:01, de acuerdo con los bloques** (el caso 1 queda decidido: Propiedades cierra en ARI-02). Pregunta además por el orden de la
    complementaria y por pasar ARI-23 a la esencial (veredicto, cantu-lessons `f8f0b36`).
    - Notación científica no está en medio por ningún motivo: RW-79 dejó las complementarias en el orden que tenían.
    - ARI-23 prepara 19 de las 95 preguntas de Porcentajes. Es complementaria por RW-77, porque el PAA nunca la pregunta.
    - **La cabina recomienda una tercera renumeración, de 6 códigos (RW-82, con el molde de RW-79):**
      - ARI-23 → ARI-21, esencial, al final del grupo 5;
      - ARI-24–26 → ARI-22–24, Intereses;
      - ARI-21–22 → ARI-25–26, Notación científica;
      - ARI-01–20 y ARI-27–29 no cambian.
    - Quedan 21 esenciales y 8 complementarias, sin ninguna lección suelta. Primero RW-82 y después el campo `quiz` y CR-PL, porque
      los dos tocan `codigos.json`.
  - **01:03, «Sí, renumera».** La tabla v3 está en `NUMERACION-DE-LECCIONES.md`, con «Los grupos por quiz» de v3, y el encargo
    RW-82 en `REVISION-WEB-TICKETS.md` (cantu-lessons `fb3a9f5`).
    - «Porcentaje ¿de qué?» queda como esencial · examen; esa clase la decidió la cabina.
    - **RW-82 lanzado**, en la sesión `local_1f88e612-d66c-4f93-8436-b7a0b644c061`, con ramas `rw-82-renumerar` y sin push.
    - La migración la corre la cabina al integrar, con su §«Para integrar»: los tres aparatos sincronizados y sin votar.
    - Después de RW-82 vienen el campo `quiz` y CR-PL.
    - **RW-82 pidió tocar la plataforma** porque `ARI-21` es válido en las dos generaciones. La cabina contestó a las 01:12:
      - `numeracion` en cada POST, con 409 solo sobre ARI-21–26 y `VERSION_DE_DATOS` 6; la página dice «recárgala» sin perder lo
        escrito;
      - `"n":"RW-82"` en los renglones de `respuestas.log`;
      - **`desde` (la hora ISO del corte) la escribe la cabina a mano en `codigos.json`** al integrar. La herramienta se niega a
        correr sin ella.
- **Álgebra agrupada por quiz (01:04):** *«y agrupa igual los temas de algebra, para poder analizarlo de la misma manera antes de
  aprobarlo»*.
  - En álgebra no hay «Practica en»: hay que medirlo por el fichero de cada pregunta, con 14 quizzes del banco.
  - **RW-83 lanzado** (cantu-lessons `d1cea42`), en la sesión `local_a5c015d6-c9ac-4147-895f-748c3c651115`. Es de solo lectura y
    entrega `RW-83.md`, `ALGEBRA-QUIZ-POR-LECCION.json` y `_scratch\RW-83\pagina-agrupada.html`.
  - La cabina publica esa página en el mismo artifact (KVVPFq3NkR7Ac3hxhQsLee, versión de hoy `1794028414-f051`), sin tocar las
    capacidades (`db`, `user`) ni la colección `evaluacion`.
- **El temario de álgebra no está aprobado:**
  - en la página hay 0 marcas (`evaluacion` vacía, medido a las 00:40);
  - siguen abiertas las 4 dudosas, la geometría que usa álgebra y el plan.
- **El piloto ALG-01 y ALG-02:** lo frenan su sí al temario, el plan de esas dos lecciones y el área ALG en la plataforma
  (`codigos.json` solo tiene ARI). No lo frenan las 4 dudosas, la geometría ni NUEVAS-FG.
- **Recomendación de la cabina:** aprobar el temario como está y preparar el plan de las dos lecciones del piloto. Se espera su sí.
- **00:45 · «Agrupar por quiz»** (veredicto en cantu-lessons `420a056`): un interruptor junto al título del área que agrupa la tabla
  por quiz sin cambiar el orden. Las lecciones sin quiz quedan sueltas. Sirve también para ver un quiz partido. Pidió la opinión de la
  cabina; no hay nada encargado.
  - **El dato:** la relación lección → quiz solo está en `temario/aritmetica.json` (21-oct), con su propia numeración y casada por
    título.
  - **Lo que habría que decidir:**
    - 4 lecciones sin quiz, porque se escribieron después: ARI-10, 20, 22 y 26;
    - ARI-03 y ARI-04 caen en Propiedades según el orden del temario, y en Operaciones según «Lo prepara»;
    - Porcentajes queda partido (ARI-18 y 19, y ARI-23, que es complementaria).
  - **Recomendación de la cabina:**
    1. un campo `quiz` en `codigos.json`, como `ruta`, con la tabla que prepara la cabina y que él confirma;
    2. después, el modo en CR-PL, detrás de CR-PL·34.
  - Le abrí la página del temario de álgebra para que la marque.

**RW-81 aceptado (2026-11-06, 23:25, «Sí, las 7»):** sin glosario (veredicto y reglas en cantu-lessons `e1a0c13`). **CR-LW·17** encargado (23:27): las frases «divisor común mayor» (ARI-12 · S1) y «¿qué por ciento…?» (ARI-18 · S1), y «cifra» → «dígito» en toda la web de ARI-14. **CR-LW·17 integrado y publicado (23:40):** cantu-lessons hasta `0b2d0d0` y las páginas en cantu-revisiones `c0e1eb9`. ARI-12 · S1 lleva la frase debajo de las dos tarjetas, porque dentro de la del MCD daba rojo por las gemelas. ARI-18 · S1 queda en amarillo por el aviso de palabras (56 + 11 = 67); lo admitió la cabina (precedente CR-LW·03, L11·S1) y el operador puede pedir el verde. **CR-LS·14 encargado (23:41, `2534f3c`):** las mismas frases en ARI-12 · D2 (pie debajo de las tarjetas), ARI-18 · D2 (al final del subtítulo) y «dígito» en D6, D10 y D11 de ARI-14. **CR-LS·14 integrado y publicado (23:54):** cantu-lessons hasta `0e27d92` y las slides en cantu-revisiones `8c86c01`; las tres en verde, ninguna vuelve a 👁 (no estaban aprobadas). RW-81 queda cerrado en web y slide. TALLER-COMUN v9: puntos 14 («dígito» al volver a tocar ARI-06/07/11/15/21), 15 (las 8 palabras de álgebra de RW-81 §5) y 16 («carril» = sesión CR-*; en la galería, «modo web/slide»). CARRILES v2 punto 4: se compacta, no se renueva. Lo del banco, a CQL como nota (sin respuesta). MCM/mcm sigue con las convenciones pendientes.

**RW-80 aceptado (2026-11-06, 23:12, «Sí, acéptalas»):** las 5 dudas de su §6, como recomienda el informe (veredicto, cantu-lessons `974784e`). El hueco de la fórmula general (4 a 6 Fácil y Medio, por `AZUL-026`) CQL lo programó como **NUEVAS-FG** (`ac5935a`, fila 454): de 4 a 6 nuevas al final de `ALG-EQD-EcuacionesCuadraticas-01_Facil` y `-02_Medio` (desde `-Facil-027` y `-Medio-058`); «ninguna solución real» irá como Fácil, y la raíz doble puede quedar fuera por gemela. Taller, verificación ciega, integración y compilación tras la QA de Chris; CQL avisa al integrar. La página del temario, versión 3 (las 5 en «Ya decidido»). Lo siguiente: las 7 dudas de RW-81, presentadas al operador con los códigos de hoy (L14 → ARI-12, L20 → ARI-18, L16 → ARI-14…).

**CR-PL·33 integrado (2026-11-06, 22:37):** en el inicio, una sola tabla por área con dos subtítulos de ancho completo, «Ruta esencial · ARI-01 a ARI-20 · 20 lecciones» y «Ruta complementaria · ARI-21 a ARI-29 · 9 lecciones · para quien busca excelencia», leídos de la `ruta` de `codigos.json`; la complementaria se pliega y cada aparato lo recuerda (`plataforma:rutas-plegadas`). cantu-revisiones `1469c3f`, cantu-lessons `47be62d` + `b08a194` (informe `docs/carriles/CR-PL/33.md`). Bancos 09, 20, 21, 23–33 en verde sobre el main de hoy, ya con códigos ARI (duda 6 de RW-79 cerrada). Probado en el 8798: los dos subtítulos, plegar, recordar al recargar y desplegar. Llega a cada aparato con «Sincronizar» (cambia `servidor/`); si el inicio no los enseña, «Reiniciar». Las 4 dudas del carril (§4), aceptadas como recomienda. **estrategia-moodle** (`local_884fd1a4…`): sesión anidada donde el operador analiza el plan personalizado en Moodle; escribe `docs/referencias/PLAN-PERSONALIZADO-MOODLE.md` cuando él decida.

**RW-79 integrado (2026-11-06, 21:29; páginas a las 21:45):** aritmética es ARI-01…ARI-29 (ARI-01–20 esenciales, ARI-21–29 complementarias). Migración en la PC con la galería cerrada: ningún voto perdido ni cambiado (10 galerías, 4.060 renglones); cantu-lessons `abc993e`, cantu-revisiones `efc23d1` y las 58 piezas publicadas `f8f21da`. Probado en el 8799: 29 filas ARI, 6 aprobadas, 409 a una clave vieja, insignia a 1366 y 380. **Laptops:** al encenderlas, botón y «Sincronizar» antes de votar; si traen votos viejos, `renumerar.mjs --revisiones` en la PC y push. **Pendiente de RW-79:** `--traducir` en cada carril antes de su próxima ronda (duda 3). Vigilante rearmado (bnj2w4wng). **CR-PL·33** (subtítulos de ruta en el inicio) en la sesión nueva `local_4c741188…`.

**CR-PL·32 integrado (2026-11-06, 21:21):** el botón «Reiniciar» junto a «Sincronizar» (cantu-revisiones `32fb1b7`, cantu-lessons `69faca5`; informe `docs/carriles/CR-PL/32.md`). Llega a cada aparato con su primer «Sincronizar», que reinicia solo porque cambia `servidor/`. Sin conflictos con `rw-79-ruta-esencial` (merge-tree del carril).

**El temario de álgebra, versión 2 (2026-11-06, 21:19):** la misma página, ahora con el orden de RW-80 (`cantu-lessons 21b770c`, integrado; taller archivado). Los datos salen de `RW-80.md` §4 y §5 con `scratchpad/alg/extraer80.mjs`: las piezas suman lo de cada lección en las 72. Esperan al operador las 5 dudas de RW-80 (§6), su evaluación en la página y las 4 dudosas (ALG-52, 64, 56 y 36). **RW-81** (¿cada concepto con un solo nombre?, el glosario) está en curso, `local_65d1d8bb…`: es solo medición, el operador lo revisa antes de aplicar nada.

**El temario de álgebra, para evaluar (2026-11-06, 20:37):** página privada https://claude.ai/artifact/KVVPFq3NkR7Ac3hxhQsLee, hecha con los datos de RW-78. Tiene las 72 lecciones (ALG-01…ALG-72) en dos rutas. El operador marca cada una «bien», «cambiar» o «duda», con una nota. Sus marcas se leen con `ArtifactData` `list` de la colección `evaluacion`, un documento por código, con los campos `veredicto`, `nota`, `el` y `por`.

**Lo que la cabina le debía al operador, cerrado (2026-11-06, 19:51):** el aviso grande de la lentitud se dio a las 18:40, y él contestó desde la PC que «ya no esta lento», con la duda de que fuera por la poca carga. Si vuelve con los carriles trabajando, va a CR-PL. En Chrome seguía la línea de QuotaExceededError: el almacén ya estaba lleno, y se quita borrando los datos de 127.0.0.1 una vez.

**Lo que espera al operador:**
- en la galería CR-GS (`19304b5`, prueba-14d):
  - la «?» en el color de su bloque (vista de sistema en L21·D10: L08·D8, L21·D10 y L22·D8; las piezas `L08-b6-A3` y `L22-b5-A3`
    esperan su voto);
  - L18·D5 y L24·D6 en una columna (piezas `-A4`);
  - L12·D5, la ronda nueva, cuando CR-GS la entregue;
- **L05·D5, la 10:** ¿rompe su regla de columnas (DISENO v82)? Pregunta abierta;
- **álgebra, en pausa:** él pidió el plan («Sí, prepáralo») y luego lo pausó para hablar de carriles y tokens. No hay ninguna lección
  de álgebra en el repo. El temario está en `temario/02-algebra.md`, `algebra.json` y `presupuesto-algebra.md`. La recomendación de
  la cabina: sin carriles nuevos; la web, con CR-GW y CR-LW; una sola sesión de producción para el piloto;
- **Meche:** las pestañas ya están; empieza a revisar cuando él diga.

**Lo nuevo de hoy, en las reglas:**
- **DISENO v76 a v82:**
  - cuatro colores (sin la Lavanda), con el Azul acero de letra `#4E719B` (token `azul_letra`), y el plan de rotación cerrado
    (L08–L10 en Azul acero de letra);
  - la cuenta del paso a paso web al nivel 2 (en L07, el 3);
  - la norma de la slide aplicada, con dos excepciones;
  - un procedimiento no salta de columna.
- **CARRILES v2:** un aviso por tanda; releer el voto antes de entregar; un dueño por galería; renovar al pasar del 60 %.
- **`lecciones/tablero.json` → `teselas` (CR-PL·26 y ·27):** cada tesela por escribir se declara «en el taller» o «espera». También
  se puede declarar una pieza entera (`"L11·slide"`). Lo escrito y no publicado sale «por publicar», en gris.
- **Los apuntes:**
  - una decisión de sistema va con su propio código y `--en` (`CR-GS12`, `CR-GS12R`, `CR-GS14P` el color del plan, `CR-GS14N` la
    norma);
  - `escrita.mjs` se niega a pisar otro apunte (CR-PL·25);
  - **misma vista** (la clave heredada de RW-59, RW-61 o RW-64) con una decisión más nueva: `--reemplazar`, sin preguntar;
  - **dos vistas distintas en una slide** (el paso a paso y el color de la tanda 2): el paso a paso se queda con el apunte, y el
    color va como `CR-GS14P`.

**Las herramientas de la cabina** (en `_scratch/cabina-lecciones/`):
- `pendientes.mjs` mide el 🚧 en su propio servidor (8797) y escribe `pendientes.json`. Se corre en cada cierre;
- `vigilar-votos.mjs 120`, siempre con `run_in_background` (no con `&`). Se rearma cada vez que despierta.
- **Al publicar:** un worktree temporal, con `git -C` y sin hacer `cd` dentro. Si la shell queda dentro, Windows no deja borrarlo:
  quedaron `pubgw15`, `pubgw15b`, `int26-cantu-revisiones` y `pubL06`, que el operador borra cuando quiera.

**Los tokens:** a las 15:49 iba el 15 % de la semana (se reinicia el 13-nov a las 04:59). La cabina tenía el 70 % de su contexto, CR-GS el
77 % y CR-LS el 32 %.

## Dónde estamos (2026-10-31, 00:05)

- **2026-11-04, 19:20: la revisión general de las slides** (el operador, comentario general `GEN-20261104-173148`, y otro
  a las 18:07, `GEN-20261104-180745`; veredicto, «El operador pide una revisión general de las slides» y las secciones que
  le siguen).
  - **Lo que pide:**
    - el color de lo que se trabaja en cada paso, y de su resultado en el paso siguiente;
    - que nada se vea amontonado;
    - las notas destacadas más chicas;
    - el componente de las preguntas bajo las tarjetas, más ligero.
  - **El color, fijado en L04·D8** (la 2, Azul acero): uno o dos colores por problema, los mismos en todo el problema; entre
    lecciones se varía con cálidos y fríos de su paleta; el Ocre no.
  - **Lo lleva CR-GS·12 por tandas.** La tanda 1 (L01–L10, L12, L29; 33 vistas) está publicada en `c4c0599`, y la tanda 2
    (L11–L29) está en curso.
  - **Cuando la vote:** la cabina escribe en DISENO la regla del color (sustituye a la regla 10, el `\mathbf` sin color, y
    precisa la 41 v60.3) y la de la nota. CR-GS dejó el texto propuesto en `docs/carriles/CR-GS/12.md`.
  - **Para el color en la letra solo valen el Azul acero y el Malva.** CR-GS propone sumar a la paleta un tono de letra
    para cada claro; lo decide el operador al verlo.
- **CR-PL·18, integrado (`511c538`):** una ronda nueva ya no la tapa una aprobación de otra galería ni una decisión de
  sistema escrita; lo más nuevo manda.
- **Los comentarios del botón 💬:** la cabina los apunta verbatim y los marca en `lecciones/tablero.json`: «en el taller»
  con `donde`, y «atendido» con `respuesta` y el `el` **con la hora ISO**. Con solo el día, la plataforma reabre lo
  editado ese mismo día; pasó con L04·D8.
- **El vigilante ve también las laptops** desde el 4-nov: un espejo sin blobs en `_scratch/cabina-lecciones/espejo-revisiones.git`,
  traído cada minuto. Despierta con los commits «respuestas de … desde <aparato>» de otro aparato.
- **Pregunta abierta al operador:** ¿los rótulos de bloque de cuentas, a la izquierda en las 14 secciones web donde salen
  centrados, como en L04·S3? (CR-GW·12, §2: L05·S2–S4, L11·S2, L12·S4, L18·S5–S7, L19·S5, L23·S1, S2, S4, L25·S1, S2).

- **Sin runs (D-083).** El tablero es la **«Galería de lecciones»**: la plataforma de revisión, y cuando el operador dice
  «la galería» es ella entera. El trabajo va por tickets RW, y el siguiente libre es **RW-76**.
  `cantu-lessons/roadmap/roadmap.json` está congelado como historia, y ninguna respuesta abre con la línea del run.
- **Desde el 31-oct (00:32) se revisa por lección,** en orden y por tandas, con L01 de piloto. Es un ticket corrector de
  web y uno de slide por tanda. Está en el contrato de la cabina, «Revisar por lección», y el mensaje del operador en el
  veredicto. **Desde el 1-nov los correctores por tanda los sustituyen los carriles (abajo); L01 quedó aprobada sin correcciones y RW-74 no se usó.** Antes: el corrector de la web de L01 se lanzaba cuando el operador
  diga «L01 revisada».
- **RW-72 está cerrado: sin servidor 24/7 (D-084, 31-oct).** El operador, tras leer el informe: «seguimos con el metodo
  de trabajo actual con la pc como trabajo local y trabajando remotanete es lo que nos ha jalado mejor». El informe
  (`docs/informes/RW-72.md`) queda como punto de partida si se reabre. Después dijo: «procedere a dar mi veredicto
  leccion a leccion».
- **Las 29 lecciones, de L01 a L29** (RW-66), con **29 webs y 29 slides** compiladas. La última que faltaba era la slide
  de L12 (antes L11B), escrita el 30-oct en la ronda 2 de RW-68.
- **La normalización que pidió el operador está hecha:** la numeración, los estados, la slide de L12 y las galerías
  completas con «Hoy» (RW-71).
- **HEAD** (en los tres, HEAD = `origin/main` y el árbol limpio):

  | repo | sha |
  |---|---|
  | `projects/cantu-lessons` | `f397080` (CR-PL·18 integrado, con su adenda; antes, de `b8723d9` a `3ca5bcc` el 4-nov por la tarde: los comentarios de L02 a L09, la revisión general, los encargos CR-GS·11 y ·12, CR-LS·11 y ·12, CR-GW·12 y ·13, CR-LW·13 y ·14 y CR-PL·18, y lo escrito por los carriles; antes, `853dab4` (los informes de CR-PL·17: modal, panel, viejos y reabrir; los 7 comentarios de prueba del operador en L01·S1, atendidos en `lecciones/tablero.json` «comentarios»); antes, el veredicto «CR-PL·17, integrado» encima de `17726bf` (merge del informe de CR-PL·17; Laptop-MC en el veredicto); antes, el veredicto «Las cadenas de «Ver cálculo» con la v61…; y sin pendientes en las 29» encima de `dd4ba78` (las correcciones de L03, CR-GW·10 y ·11, CR-LW·11 y ·12, CR-LS·10 con L03·D2; L02·D3 y D4 apuntadas en `2551c96`); antes, el veredicto «Las 18 slides de la mañana, publicadas» encima de `ee229f1` (DISENO v67, regla 38 punto 9, en `ab01c5b`; las correcciones del operador a L03 en `d632587` y `f64410f`, con los encargos CR-GW·10 y CR-LW·11); antes, `5d0d75e` (en el veredicto, «El operador vota la ronda 3 del aire y L18·S4, en la PC (2026-11-04, 10:16)», con los encargos CR-GS·09, CR-LS·10, CR-GW·09 y CR-LW·10); antes, el veredicto «CR-PL·16, integrado» encima de `168b834` (los nombres de las decisiones de sistema; merge de CR-PL·16 en `903d0e3`; informe de CR-LW·09 en `47502e1`); antes, el veredicto «CR-LS·09 terminado» encima de `935883b` (informe de CR-LS·09; CR-GS·08 informe `adaa92e`); antes, el veredicto «CR-PL·15, integrado» encima de `e4a9420` (merge del informe de CR-PL·15); CR-LW·09 escribió las 35 de CR-GW·08 (la última, L29, `0347ae3`); antes, `4eb2a87` (lo escrito por CR-LW·09 y CR-LS·09; encargos CR-LS·09 `c5e5f33` y CR-PL·16 `be47608`; registro de 4 etiquetas `7dfbabb`; informe de CR-GW·08 `a4168aa`; antes, `5607122`: en el veredicto, «El operador vota la ronda 2 del aire y la ronda web de la noche, en la PC (2026-11-03, 22:13)», con los encargos CR-GS·08 y CR-GW·08; CR-PL·14 integrado en `4d04ce0`; antes, `bbcf8ca`: en el veredicto, «El operador vota en la PC: L02·S1, la 4», con el encargo CR-LW·09 en `b9b37af` y su escritura en `d8b15c1`; antes, `502fbfd`: en el veredicto, «El operador: fuera «Pegar respuestas»», y el encargo CR-PL·15; antes, `11bee6c`: en el veredicto, «CR-PL·14, integrado: «Sincronizar»»; antes, `6b39083`: en el veredicto, «CR-PL·13, integrado…; y la PC, sincronizada»; CR-PL·13 integrado, `40fb78f`; antes, `0d7da2f`: en el veredicto, «Los votos de la laptop, publicados; y CR-GW·07, tanda 2»; antes, `6fcad02`: en el veredicto, «CR-LS·08 terminado: el CSS de una entrega alcanza a escenas que no se votaron»; antes, `2c2371b`: en el veredicto, «El operador: quién sube los votos, y un botón de «Sincronizar»», y el encargo CR-PL·14; el informe de CR-LS·08, `de3a16e`; antes, `45f2f59`: en el veredicto, «CR-GW·07, la ronda de las 12 de la web, publicada», y su informe; antes, `48c0294`: en el veredicto, «CR-GS·07 terminado», y su informe; antes, `4a6cc93`: en el veredicto, «CR-GS·07, tandas 2 y 3…»; antes, `68d1ee7`: en el veredicto, «CR-GS·07, tanda 1 de la ronda 2 del aire…»; antes, `a6c5b71`: en el veredicto, «CR-LS·08, la segunda mitad…»; CR-LS·08, L28 `82f2a9e`, L29 `74807e1` y L18 `e5f2528`; antes, `7f8bbb1`: en el veredicto, «CR-LW·08 escrito; L13, L17, L21, L22 y L27 publicadas»; CR-LW·08, de `8fd8715` a `f5aa26a`; CR-LS·08, L27 `4311f69`; antes, `d6a0ddb`: en el veredicto, «CR-GW·07, las entregas, y L28·S5 escrita», y el encargo CR-LW·08; L28·S5 de CR-LW·07, `625601e` y `0da882b`; antes, `250548f`: en el veredicto, «El operador vota la web, desde la laptop» y «CR-LW·07: las cadenas escritas…»; el encargo CR-GW·07; CR-LW·07, de `1312565` a `35e9aaa`; CR-LS·08 sigue, L12 `fb031d0` y L17 `fa1bb7d`; antes, `c98e3a0`: en el veredicto, «CR-LS·08, la primera mitad…»; CR-LS·08 hasta `b056216`; CR-LW·07, L05 y L12, `1312565` y `30abc9d`; antes, `b45822f`: en el veredicto, «L28·S5: la ley en un renglón no cabe…», y el informe de CR-GW·06; CR-LS·08, L14 y L15 escritas; antes, `d7c9625`: en el veredicto, «Las cadenas con la v61: las entregas de CR-GW·06», su informe y el encargo CR-LW·07; CR-LS·08 en marcha, L07 y L13 escritas; antes, `cf6f021`: el encargo CR-LS·08 y 6 etiquetas nuevas en el registro; antes, `4d8df03`: en el veredicto, «El operador vota las tandas del aire y las cadenas, desde la laptop», y el encargo CR-GS·07; antes, `5ff8bd4`: en el veredicto, «La laptop, al día…»; antes, `0ac4fc5`: en el veredicto, «La laptop no trae lo nuevo, otra vez…»; antes, `fa94920`: en el veredicto, «CR-LS·07: L29·D7, escrita y publicada»; CR-LS·07, `f8924d5` y `5f724dc`; antes, `247ca40`: en el veredicto, «CR-GS·06 terminado», y su informe; antes, `9e9b9cf`: en el veredicto, «L29·D7, entregada…», y el encargo CR-LS·07; antes, `d00d35b`: en el veredicto, «CR-GS·06, tanda 4, la última…»; antes, `07a393a`: en el veredicto, «CR-GS·06, tanda 3…»; antes, `a50220f`: en el veredicto, «CR-GS·06, tanda 2…»; antes, `bc997f2`: en el veredicto, «CR-GS·06, tanda 1: L07·D6 y L12…»; antes, `4968974`: en el veredicto, «La ronda de las cadenas, rehecha y publicada», y el informe de CR-GW·06; antes, `959f8ac`: en el veredicto, «CR-LS·06 terminado: L24, L26, L28 y L29; la ronda de las cadenas, devuelta antes de publicar»; `8f2c2a0` solo dejó dos renglones en blanco; CR-LS·06 terminado, de `408952e` a `d93d6e9`; antes, `29fed25`: en el veredicto, «El operador: las cadenas alineadas en el «=», y no al inicio de la fórmula», y el encargo CR-GW·06; antes, `9a19305`: en el veredicto, «CR-LS·06, la primera mitad…; CR-PL·12, integrado», y el encargo CR-PL·13; CR-PL·12 integrado, `9c0c8de`; «sin cambio» de L19 a D9–D12 y la etiqueta que sale de L14·D3, `29d9fff`; CR-LS·06, L14 a L19, de `6aa2d02` a `ddd4710`; antes, `44a90f6`: en el veredicto, «El aire medido: CR-GS·06 entrega 24 slides, CR-GW·05 publica once «con aire»…», y el informe de CR-GW·05; el encargo CR-LS·06 y las 10 etiquetas nuevas en el registro, `34598c8`; CR-LW·06 escrito, `4d91c7d` y `2329c51`; antes, `36425c1`: en el veredicto, «L18·S6 y S7, con la 23: lo decide la cabina», y el encargo CR-LW·06; antes, `0312deb`: en el veredicto, «CR-GW·05 y CR-LW·05: L18·S5 y L25·S2 escritas, y la ronda … publicada», y el encargo CR-PL·12; CR-LW·05 escrito, `0977db8`, `d248c27` y `f98a9c8`; antes, `9e3c956`: el encargo CR-LW·05; antes, `2d32241`: la hora de la nota del 3-nov; antes, `4aa7cf4`: en el veredicto, «El operador vota las slides de L13·D11 a L29 y la ronda 5 de la web, y pide aire en las tarjetas de la slide (2026-11-03)», y los encargos CR-GS·06 y CR-GW·05; antes, `646bfa5`: CR-LS·05 escrito, `0d3da2c`; el registro de L11·D7, `e30bcf4`; `salen.json` vacío, `0940d10`; antes, `c9949c2`: el informe de CR-GS·05 y el encargo CR-LS·05; antes, `74ed86d`: CR-PL·11 integrado en `b62fea0`, con su nota en el veredicto; antes, `41149df`: el encargo CR-GS·05 y, en el veredicto, «El operador: L14·D2 y D3 «esperando variantes» y nadie trabaja…»; antes, `97ed777`: en el veredicto, el operador pide «Siguiente sin votar» y «Volver» aparte; antes, `9e574b0`: CR-LW·04 y CR-LS·04 escritos, hasta `509def1`, y su nota en el veredicto; antes, `cf9eadf`: los informes de CR-GW·04 y CR-GS·04, los encargos CR-LW·04 y CR-LS·04, y en el veredicto lo que decidió la cabina de sus dudas; antes, `97a624f`: los encargos CR-GW·04, CR-GS·04 y CR-PL·11, y en el veredicto «El operador vota la web (RW-64 y RW-73, con la ronda 4)…», con sus votos leídos de la PC; CR-PL·10 integrado en `986f8f6`, con su nota en el veredicto; su encargo y el mensaje del operador en `587e35f`; CR-PL·09 integrado en `44372f6`, CARRILES con los comentarios y `salen.json`; el tablero limpio, `df43016`: quedan 5 decisiones abiertas) |
  | `projects/cantu-revisiones` | `511c538` en `origin/main` (CR-PL·18 integrado; antes, el 4-nov por la tarde: la galería CR-GS con las rondas de CR-GS·11 y ·12, hasta la tanda 1 en `c4c0599`; la ronda de L05·S4 en la galería CR-GW, `a1fd0f3`; las páginas de L02, L03, L04 y L06; antes, `f913d94` (CR-PL·17, a pedido directo del operador a CR-PL: el modal más grande con lápiz, `2f0f5c5`; el panel al lado de la sección con papelera e historial, `6e6cd6e`; editar y quitar también los subidos, `b8a9959`; un atendido editado se reabre y la lista de la pestaña Lección con iconos, `f913d94`; antes, `e902ab6`: CR-PL·17 integrado: el botón de comentario por sección y por slide, y «Sin copiar» en una línea; el botón espera 90 s, `ff0b980`; antes, `740bf93`: L03 con las correcciones del operador, de `78853e6` a `3d9de9e`; las 9 cadenas de «Ver cálculo», de `608ae0f` a `740bf93`; la ronda del texto de L03·S3 en `02c0a97`, votada; **ningún pendiente en las 29**; antes, `52babb0`: las 18 slides de la mañana, de `853db29` a `52babb0`; la ronda 4 de L25·D5 en `1944e33`; antes, `a64afae`: los votos de la PC del 2026-11-04, 10:16: CR-GW y RW-61; antes, `911fdf1`: CR-PL·16 integrado; antes, `eb19b0c`: las 41 slides de CR-LS·09 publicadas, por lotes de `4f59f5c` a `eb19b0c`; la ronda 3 de las slides, tandas 1 y 2, en `2193256` y `a4a8638`; antes, `3bfaba1`: CR-PL·15 integrado en `a6ccb88`: fuera «Pegar respuestas»; L29 publicada; la ronda 3 de CR-GS·08, tanda 1, en `2193256`; L12, L24, L25 y L28 en `5181141`; antes, `4f59f5c`: publicadas L02, L11, L12, L15 a L20 con la web de CR-GW·08, y L09, L10 y L14 con las slides de CR-GS·08; la ronda de L18·S4 en `9eeb511`; antes, `8e7b2b7`: L11 publicada; antes, los votos de la PC de las 22:13, de `5c093fb` a `59f3839`; L04 en `d7b0154`, L02 en `ee35fe5`; antes, `4222408`: L02 publicada con la 4 de S1, CR-LW·09; antes, `36bec59`: CR-PL·14 integrado: «Sincronizar»; antes, `eab5276`: CR-PL·13 integrado; antes, `c6d6dbe`: la tanda 2 de CR-GW·07; antes, los votos de la tarde publicados desde la laptop a las 20:20, de `8e646da` a `ce72476`, sin vistas con dos ✓; antes, `c007ed1`: la ronda de las 12 de CR-GW·07; antes, `f4461c5`: las tandas 2 y 3 de CR-GS·07, L19 a L29: RW-61 con 67 vistas aprobadas y 58 por votar; antes, `c6f4538`: la tanda 1 de CR-GS·07: la ronda 2 de L09, L10, L14, L16, L17 y L18, y las 21 decididas aprobadas en RW-61, RW-59 y RW-68; antes, `f0e4237`: la slide de L18, L28 y L29, y la web de L28 y L29; antes, `8e5115c`: la web de L13, L21 y L22, de CR-LW·08, y la slide de L17 y L27, de CR-LS·08; antes, `2897fdc`: las páginas de L05, L12, L15 y L25: las cadenas de CR-LW·07 y la slide de L15; antes, `766628b`: las páginas de L07, L13, L14, L16 y L25, de CR-LS·08; antes, `197d774`: los votos de la laptop, juntados y publicados a las 17:19: `e0c1480` a `197d774`; antes, `66329f9`: la página de L29, de CR-LS·07; antes, `c240ec6`: la tanda 4 corregida: L29·D7 aprobada con la 1, sin «con aire»; antes, `0f49a8c`: la tanda 4 de CR-GS·06, RW-61: L25 a L29; antes, `3c03306`: la tanda 3 de CR-GS·06, RW-61: L19 a L24; antes, `ca291fe`: la tanda 2 de CR-GS·06, RW-61: L09, L10, L13 a L18; antes, `a811059`: la tanda 1 de CR-GS·06: L07·D6 en RW-59, y L12·D2, D4, D5 y D6 en RW-68, que se reabre; antes, `58eb6c8`: la ronda de las cadenas, `galerias/CR-GW/`, de CR-GW·06; antes, `f7c6178`: las páginas de L24, L26, L28 y L29, de CR-LS·06; antes, `1f2f5e8`: las páginas de L14, L15, L16, L17 y L19, de CR-LS·06; CR-PL·12 integrado, `56ffd93`; los votos del 3-nov, publicados por el operador, `5d673cf`, `7d44e5d` y `29b01be`; antes, `ed7c66d`: las once «con aire» de CR-GW·05 y la página de L18, de CR-LW·06; antes, `1f1aca0`: la ronda 6 de RW-73 y la 5 de RW-64, de CR-GW·05, y las páginas de L18 y L25, de CR-LW·05; antes, `73fca3a`: las páginas de L11, de CR-LS·05; antes, `907a4f1`: CR-PL·11 integrado; las rondas de RW-61 de CR-GS·05, `257e263`; antes, `d306e8d`: los votos de RW-61 del operador, publicados a las 22:29; antes, `492a412`: las páginas de L04, L11, L12, L13, L23, L25, L28 y L29, de CR-LW·04 y CR-LS·04; antes, `1057bf9`: la ronda 5 de RW-73 y la 4 de RW-64, de CR-GW·04, publicadas por la cabina; antes, los votos web del operador, `e0d9874` y `5eeba38`, y CR-PL·10 integrado, `78b6e76`). El checkout de la PC está en `73fca3a` (el operador pulsó «Traer lo nuevo»), en `c6d6dbe` desde las 20:31, limpio, igual a lo publicado (comprobado a las 20:32, a petición del operador), y 1 detrás. **La laptop** (`LAPTOP-PF6SOUAS`), al día desde las 17:19 del 3-nov: estaba en `5d4680e` (2-nov), con el botón de antes de CR-PL·02, y su pull chocaba. El operador corrió a mano la copia, el `checkout`, el `pull` y `juntar.mjs`, y publicó. En las claves que cambiaron en los dos aparatos quedó la del remoto, la más nueva; ninguna vista quedó con dos ✓, y lo que entró es del 2-nov, ya encargado. Desde ahora su botón junta los votos solo. **A las 18:05 y las 18:44 pegó sus votos de la tarde, marcados en la laptop; los publicó a las 20:20** (`8e646da` a `ce72476`), iguales a lo que pegó (sus votos del 3-nov ya están publicados) (RW-61 devuelta a lo publicado sin tocar `respuestas.*`). **El vigilante de los votos** (desde el 2026-11-02, 23:12, regla del operador: «en el momento que mande votos y feedback deberia generar las varaintes nuevas»): la cabina deja corriendo en segundo plano `node _scratch/cabina-lecciones/vigilar-votos.mjs 120`, que mira los `galerias/*/respuestas.log` de la PC y la despierta 2 minutos después del último cambio; ella lo apunta, lo encarga ya y lo vuelve a armar. Una sesión nueva lo arma al arrancar; el 8791 corre, y la cabina publica desde una copia aparte (`git worktree add --detach`, `CANTU_REVISIONES_DIR=<copia> node tools/revision/publicar-paginas.mjs`). Las galerías que los carriles escriben en la PC se pasan a la copia con un índice temporal y `git diff --binary origin/main <árbol> -- <galería> ":!galerias/*/respuestas.*" | git apply --index`; después, en la PC, `git checkout -- galerias` y `git clean -f -- galerias`. Los votos de L12 a L29 aún no están publicados. **El 3-nov, de 11:52 a 12:29, el operador votó en la PC** RW-61 (100 slides, L13·D11 a L29), la ronda 5 de RW-73 y la 4 de RW-64. No están publicados, y los carriles los leen del disco. Los pegó en el chat. **El vigilante se cayó a la 01:16** (salida 4) cuando la app reanudó la conversación, y nadie se enteró de los votos hasta ese mensaje. Se volvió a armar a las 12:39. Al reanudar, lo primero es mirar si sigue vivo. Lo nuevo del disco contra HEAD: `node _scratch/cabina-lecciones/votos-nuevos.mjs` |
  | `projects/aiw-console` | el commit de este relevo |

- **Trabajan RW-59, RW-60 y RW-64** con los votos que el operador pegó en el chat el 31-oct (19:23; veredicto, «El
  operador vota RW-59, RW-60 y RW-64…»). Esperan al operador RW-61 y RW-68. **RW-73 corre en su propia sesión desde el 31-oct,
  19:27** (el operador escribió desde la PC: «Lo lanzo desde la PC»).
  Las de los tickets cerrados están archivadas.
- **31-oct, 23:57: el operador votó L02 a L04** (veredicto, «El operador vota L02 a L04 y pide carriles…»). RW-64
  escribió sus tres nuevas (`4e31d8d`, páginas en `45fe87c`). **RW-75 está integrado (1-nov)**: carriles «Web · Slide»,
  «Copiar» por lección (por omisión, solo lo nuevo) y los estados después del voto, con un ojo por lección (veredicto,
  «RW-64 escribe L02·S1, L02·S2 y L04·S1, y se integra RW-75»).
- **1-nov, 20:53: los carriles de corrección** (el operador; veredicto, «El operador pide los carriles de corrección»).
  Sustituyen a los tickets correctores por tanda y a la recomendación de la cabina del 31-oct (dos sesiones).
  - **Son cinco sesiones de larga vida:** CR-GW (guion web), CR-GS (guion slide), CR-LW (lección web), CR-LS
    (lección slide) y CR-PL (plataforma).
  - **Guion decide y Lección escribe.** El contrato es `cantu-lessons/docs/carriles/CARRILES.md` (v1).
  - **Lanzados a las 21:06**, cada uno con su primer encargo en `docs/carriles/CR-xx/01-encargo.md` (`ab663f1`). Los
    seis tickets dejaron su traspaso en su informe (`c100f2b`) y están archivados. El contrato de la cabina tiene
    ahora «Los carriles de corrección».
  - **La web de L01 está aprobada:** «Hoy» ✓ en sus cinco secciones, sin correcciones.

## Cómo se trabaja ahora

**La Galería de lecciones** (`cantu-revisiones`):
- **Se abre con `cantu-revisiones/abrir-galeria.cmd`** en `http://127.0.0.1:8791/`. **El 8791 es del operador:** la
  cabina no lo toca ni lo para; sus pruebas van en otro puerto (8799 suele estar libre), paradas por PID.
- **El botón trae los dos repos** (`cantu-lessons`, solo si está limpio y en `main`). Corre `renumerar.mjs` primero en
  simulación y arranca el servidor en un hilo (`servidor/arranque.mjs`). Con Enter, publica los votos.
- **«Traer lo nuevo»** (RW-70) es un botón de la barra. Trae lo nuevo sin cerrar la ventana, publica los votos y recarga
  la misma vista.
- **Cada lección tiene sus pestañas:** Guion web y Guion slide, que son sus galerías; Lección web y Lección slide, que
  abren aparte; e Historial.
  - Donde una galería de ticket trae opciones, sale su vista.
  - Donde no, la vista **«Hoy»** (RW-71), con sus votos en `galerias/HOY/respuestas.json`.
  - **Tras cada pull, la cabina lee los ~ y ✗ de «Hoy»:** le tocan a ella, y van a la bandeja o a un ticket.
- **Desde RW-75 (1-nov):**
  - **Votar por carril:** el control «Web · Slide» deja las flechas y «lo siguiente por votar» en una pieza.
  - **«Copiar»:** por lección, primero la web y después la slide, con la galería de cada sección. Por omisión copia
    solo lo nuevo, y «Copiar todo» está al lado.
  - **Los estados por sección y por slide:** votada sin decisión, por escribir, escrita y por revisar, revisada.
  - **El ojo de cada lección** vuelve solo cuando su página cambia. «✓ La revisé» se marca en la propia lección, y se
    guarda en `galerias/REVISADAS/`.
  - **«Escrita» la apunta el taller** con `node tools/revision/escrita.mjs` en el commit en que escribe la opción
    (MOLDE-DE-GALERIA, punto 6). Si un taller no lo hizo, la cabina lo apunta al integrar. Una decisión de sistema se
    apunta con las lecciones y la pieza.
  - **Si el 8791 está corriendo,** la cabina integra el código de `cantu-revisiones` en una copia aparte (worktree
    `--detach` en `origin/main`) y empuja desde ahí. Al operador le llega con «Traer lo nuevo», que vuelve a arrancar
    la galería.
- **Los votos:** «✓ Se queda · ~ Referencia · ✗ Fuera», con una sola ✓ por slide o sección. Una con una sola ✓ y sin
  opciones nuevas se escribe en la lección. Está en `MOLDE-DE-GALERIA`: «Los votos…» y «La vista «Hoy»».
- **En la laptop** (`LAPTOP-PF6SOUAS`) se ven las páginas que la cabina publica en `cantu-revisiones/lecciones/`, sin
  compilar. El operador lo probó el 30-oct.
  - El Historial dice «historial sin leer».
  - **Su ventana abierta es de antes de RW-70:** con Enter y otro doble clic le llegan «Traer lo nuevo» y «Hoy».

**Compilar y publicar** (`cantu-lessons`):
- **`node tools/revision/build.mjs --todas --sin-git`** (RW-67) compila solo lo que no está al día, 3 a la vez, y pinta
  las miniaturas. Sin cambios tarda 0,8 s; todo, unos 15 min. `--simular` dice antes qué compilaría. Una corrida a la
  vez por checkout.
- **Tras compilar, la cabina publica para la laptop:**
  1. `node tools/revision/publicar-paginas.mjs [Lnn…]`;
  2. en `cantu-revisiones`, `git add -- lecciones`, commit por ruta y push.

  Que lo haga solo el build está en la bandeja, con la duda 7 de RW-67.
- **Los estados**, con `node tools/revision/estado.mjs <Lnn> <guion|leccion|slide> <estado>`. Lo que no se deduce va en
  `lecciones/tablero.json`, que escribe **solo la cabina**. Después, `node tools/revision/tablero.mjs`.
- **La numeración:** la tabla de antes a hoy está en `docs/referencias/NUMERACION-DE-LECCIONES.md`. La historia
  (veredicto, informes, tickets de antes) usa los códigos viejos.

**Los tickets:**
- **La cabina escribe el ticket** en `docs/encargos/REVISION-WEB-TICKETS.md`, lo publica y **lo lanza sin preguntar**
  como sesión anidada (`start_session`). Solo pregunta antes de una decisión altamente crítica. Contrato, «Lanzar
  tickets».
- **Si la herramienta toca `tools/` o la galería,** el taller trabaja en worktrees que le prepara la cabina
  (`_scratch/RW-xx/<repo>`, rama `rw-xx-…`). Hace commit en su rama con identidad explícita, sin push ni merge.
- **La cabina integra:** revisa, `merge --no-ff -F <fichero>`, push, quita el worktree y borra la rama.
- **En un turno abierto por un aviso automático, o con el operador en Remote Control,** la app no deja abrir sesiones.
  - Si el turno lo abrió un aviso: tarjeta (`own_initiative`).
  - Si el operador escribe por Remote Control: que pulse la tarjeta desde la PC. Si pide «hazlo aquí», va como agente de
    fondo de la cabina. Así corrió RW-71.
- **Al terminar cada taller, la cabina archiva las sesiones que ya no hacen falta** (el operador, 30-oct). Antes mira
  `list_events` y apaga el Remote Control. Las que esperan un voto siguen activas.

**Git:**
- **Credenciales:** `GIT_TERMINAL_PROMPT=0 GCM_INTERACTIVE=never` en lo que va a la red. Si algo pide credenciales, se
  para y se da el error literal.
- **El índice:** `--no-optional-locks` para leer; `add` por nombre; identidad con `-c`, nunca escrita en
  `.git/config`.
- **`aiw-console` es de todas las cabinas:**
  - commit siempre con `-- <ruta>`;
  - después, `git log origin/main..HEAD` en una llamada aparte: si hay commits ajenos, no se empuja;
  - push por sha: `git push origin <sha>:refs/heads/main`.
- **Los finales de línea:** en `cantu-lessons`, el veredicto, los tickets, `tablero.json`, los README, el molde y
  TALLER-COMUN están en CRLF; la bandeja y este relevo, en LF. Se miden con node, porque grep y sed de Git Bash no ven el
  `\r`. Se escriben con scripts de node que conservan el final de línea, no con heredocs.

## En vuelo: lo que espera al operador

| ticket | qué | dónde va | qué espera |
|---|---|---|---|
| CR-GW (guion web; `local_ec02efe0-9621-4021-bb4a-7d666e418d3f`) | las galerías de la web (hereda RW-64 y RW-73) | CR-GW·03 hecho y publicado (`e52bb80`): RW-73 con la 11 donde la votó, ronda 3 (banda/11; la 15 centrada en L28 y L29) y ronda 4 (el nombre de la 11: la 20 o la 21, recomendada); RW-64 con 16 aprobadas y siete rondas; 17 entregas nuevas | **CR-GW·04 hecho** (informe `docs/carriles/CR-GW/04.md`; galerías `1057bf9`): 15 entregas (las 12 decididas, y con la 21 el arreglo de L04·S3 y L12·S4 y L23·S4), a CR-LW·04; la ronda 5 de las 5 con ~ (RW-73: L18·S5 22–24, L25·S2 25–27, L19·S5 28–30; RW-64: L22·S3 y L25·S3 5–7). Si el operador elige la 5 y la 28, «la misma altura» (`subgrid`) va como decisión de sistema a L21·S1, L21·S3, L22·S2 y L22·S4 . **CR-GW·05 en marcha** (`docs/carriles/CR-GW/05-encargo.md`, 12:38): entregar L18·S5, la 23, y L25·S2, la 26; la ronda de L19·S5 (sobre la 28), L22·S3 y L25·S3 (sobre la 5): el bloque centrado y más aire; preparar «la misma altura» para L21·S1, L21·S3, L22·S2 y L22·S4; medir el aire entre renglones en la web votada. Entregas hechas (12:42): `_scratch/CR-GW/entregas/05/`, L18·S5 la 23 y L25·S2 la 26, a CR-LW·05; L18·S6 y S7 con la 23, entregadas (13:00) a CR-LW·06. La ronda, publicada (`1f1aca0`): L19·S5 31–33 (recomienda la 32), L22·S3 y L25·S3 8–10 (recomienda la 8); «la misma altura» preparada en `entregas/05/preparadas/`; **CR-GW·05 hecho** (informe `docs/carriles/CR-GW/05.md`): once «con aire» publicadas (`ed7c66d`): RW-73, la 34, en L19·S2, L25·S1, L28·S1 y S5; RW-64, la 3, en L12·S1, S3, L13·S6 y L17·S6, y la 5 en L28·S3, S4 y S6 (la vara: la 23, 33 px con fracción; la 26, 25 px sin ella) . **CR-GW·06 en marcha** (`docs/carriles/CR-GW/06-encargo.md`, 14:18), decisión de sistema de web y slide: el operador pide las cadenas alineadas al inicio de la fórmula, no sobre el «=» (cambia la regla 29, v61); el censo de las 29 webs y 29 slides y una ronda de sistema (hoy · todo al inicio, recomendada · la v61 bien hecha). A CR-GS se le avisó que no cambie las cadenas hasta que se decida. El censo: 111 cadenas (`_scratch/CR-GW/06/censo.md`). CR-GW recomienda la 2 (la v61 bien hecha), porque la captura del operador ya es «todo al inicio», y la cabina lo acepta. **La ronda, devuelta antes de publicar** (14:36): en L12·S1, L16·S3 y L13·D15 la plataforma junta sus opciones con las de otra galería, y su ✓ le bajaba al operador la ✓ de la sección. Está apartada en `_scratch/CR-GW/06/galeria-apartada/`, fuera de la PC, y CR-GW la rehizo con muestras sin otra galería: L12·S2, L18·S1, L18·S4, L12·EG, L02·D3 y L02·D4. **Publicada** (`58eb6c8`), probada por la cabina: ✓ en las seis, y las otras siete galerías sin cambio . **Las cadenas, decididas: la 2, «La v61 bien hecha»** (L02·D3 y D4; la regla 29 no cambia). Punto 4 hecho (informe §6): 8 entregas web; 7 a CR-LW·07 (L05·S1, L12·S1–S3, L15·S4, L25·S1, L29·S2); L28·S5, por decisión de la cabina, cada ley de De Morgan en un renglón (punto 1 de la v61), con entrega nueva de CR-GW. No cabe: a 320 px se desplaza con la letra normal, y a 380 px con A+, así que va la de dos renglones con la partida corrida, sumada a CR-LW·07; en la slide solo L29·D4, a CR-GS·07; 9 cuentas de «Ver cálculo» de los EG las pone Studio, en pausa (petición en `_scratch/CR-GW/entregas/06/peticion-studio.md`) . **CR-GW·07 en marcha** (`docs/carriles/CR-GW/07-encargo.md`, 18:48), con los votos web de la laptop (sin publicar): entregar L13·S6 la 3, L22·S3 la 8, L28·S1 la 34 y «la misma altura» (L21·S1, L21·S3, L22·S2, L22·S4) con el bloque centrado; L12·EG la 2, decidida, depende de Studio; la ronda de 12 (aire un escalón más, margen de dentro de las losas, el bloque centrado) . Entregas hechas (`_scratch/CR-GW/entregas/07/`): L13·S6, L22·S3, L28·S1 y «la misma altura» (L21·S1, L21·S3, L22·S2, L22·S4), a CR-LW·08 . **La ronda de las 12, publicada** (`c007ed1`, 14 vistas): aire de 31–35 px sin fracción y 37–43 con ella, 28 px de margen dentro de las losas (16 en el celular), el bloque centrado; en L28·S3, S4 y S6 la figura ×1,5. **Tanda 2, publicada** (`c6d6dbe`): las 15 votadas con el mismo defecto (RW-64 y RW-73). Las 12 que nunca votó, preparadas en `_scratch/CR-GW/entregas/07/sistema-preparadas/`, se entregan cuando elija los valores. **Votadas en la PC** (21:40 y 22:13): eligió «con más aire y margen en la losa» en todas. Las cuatro de las 21:40 (L02·S2, L04·S1, S2, L11·S1), entregadas y publicadas. **CR-GW·08 encargado** (`docs/carriles/CR-GW/08-encargo.md`, `5607122`): las 23 decididas de las 22:13, las 12 de sistema (ya elegidos los valores) y la ronda de L18·S4 (el recuadro amarillo, igual que L18·D4 de CR-GS·08) . **CR-GW·08 terminado** (informe `docs/carriles/CR-GW/08.md`, `a4168aa`): 37 entregas; la ronda de L18·S4 publicada (`9eeb511`), la 4 y la 5 del recuadro; el recuadro solo está en L18·S4 . **L18·S4, votada** (10:16): la 5, «con el recuadro más grande». **CR-GW·09 encargado** (`5d0d75e`): entregarla . **CR-GW·09 hecho** (`f41a6b3`): L18·S4 la 5, publicada en `853db29`. **CR-GW·10 encargado** (`d632587`): las correcciones del operador a L03: la frase de S1 que él eligió («…lleva el signo del número mayor», también en el ejemplo, «porque 18 es mayor que 7»), los bloques de S2 centrados y alineados a la izquierda por dentro, las figuras de S3 sin rótulos, y una ronda del texto de entrada de S3 . **CR-GW·10 hecho** (`docs/carriles/CR-GW/10.md`, `f6ab158`): L03 entera, el texto de S3 la 1. **CR-GW·11 hecho** (`6ef5891`): las 9 cadenas de «Ver cálculo» en el borrador, con `\phantom{{}={}}`, sin Studio . **CR-GW·12 hecho** (`docs/carriles/CR-GW/12.md`): L04·S3, los rótulos a la izquierda, publicada en `a14b404`; el mismo rótulo centrado sale en 14 secciones más (pregunta al operador). **CR-GW·13 hecho** (`docs/carriles/CR-GW/13.md`): L06·S1, el recuadro más alto, publicada en `3efe52b`; la ronda de L05·S4 (el estimado otra vez) en la galería CR-GW, clave `L05-S4`, publicada en `a1fd0f3`; cuando la vote, la entrega va a CR-LW·14 | el siguiente encargo |
| CR-GS (guion slide; `local_49a75736-5723-47eb-8d03-a0d0bd4bdb55`) | las galerías de la slide (hereda RW-59, RW-60, RW-61 y RW-68) | CR-GS·03 hecho y publicado (`71221b5`, la foto de L14·D4 en `40fa18c`) | **CR-GS·04 hecho** (informe `docs/carriles/CR-GS/04.md`): L13·D12, la 1, a CR-LS·04 (la «Regla» con letras, como se votó). **CR-GS·05 en marcha** (`docs/carriles/CR-GS/05-encargo.md`, 23:1x): primero las rondas de L14·D2 (la «Explicación guiada», con altura razonable, como la del sandbox de cantu-studio), L14·D3 (~ sin comentario) y L13·D11 (con el componente de factorización de la web), publicadas en cuanto estén; después entregar L11·D7–D11 (la 3) y verificar L13 — las rondas, publicadas (`257e263`). **CR-GS·05 hecho** (informe `docs/carriles/CR-GS/05.md`): la entrega de L11·D7–D11 (la 3), a CR-LS·05; L13 cuadra con lo votado . **CR-GS·06 en marcha** (`docs/carriles/CR-GS/06-encargo.md`, 12:38), con los votos del 3-nov: medir el aire en todas las slides que el operador revisó (RW-59, RW-61, RW-68), contra las reglas 21.9, 38.3 y 41 y contra L02, y dejar la sonda para la guarda de CR-PL; entregar las 28 decididas que pasen la medida; las rondas por tandas: las 64 con ~, y una «con aire» donde la medida diga amontonado . **La medida, hecha** (`_scratch/CR-GS/06/MEDIDA.md`; mínimo / «con aire»: fracción 0,6 / 0,8 em, raya 20 / 35 px, borde 24 / 32 px): 24 decididas entregadas a CR-LS·06; 4 a la ronda (L13·D11, L16·D8, L17·D8, L29·D7); ya escritas y amontonadas, a ronda en su galería: L12·D2, D4 y D5 (RW-68 se reabre), L13·D5–D10 (RW-61), L07·D6 (RW-59) . **Tanda 1, publicada** (`a811059`): L07·D6 (RW-59, la 3 «con aire») y L12·D2, D4, D5 y D6 (RW-68 reabierta). Su hallazgo para la regla 38.3: hace falta `\\[1.6em]` antes de un renglón con fracción y un puntal `\rule{0pt}{1.75em}` después. **Tanda 2, publicada** (`ca291fe`): L09, L10 y L13 a L18 en RW-61. **Desde la tanda 3, CR-GS deja cada tanda en su copia de prueba, no en la PC** (la cabina publica desde ahí; así «Traer lo nuevo» no choca). **Tanda 3, publicada** (`3c03306`): L19 a L24 (CR-GS la escribió aún en la PC; la cabina la publicó y la dejó limpia). **Tanda 4, la última, publicada** (`0f49a8c`): L25 a L29 (escrita también en la PC). Corrige su cifra de L29·D7 y L25·D2: los 10 px eran el filo de unos recuadros; corregida (`c240ec6`): L29·D7, la 1, pasa la medida y se entregó (25 entregadas; no pasan L13·D11, L16·D8 y L17·D8) . **CR-GS·06 hecho** (informe `docs/carriles/CR-GS/06.md`): por votar, 80 vistas con 91 opciones (RW-61 L09–L29, RW-59 L07·D6, RW-68 L12·D2, D4, D5 y D6). Pendientes de la cabina: la regla 38.3 (`conAire`: `\\[1.6em]` antes de un renglón con fracción y un puntal; se escribe cuando las rondas del aire tengan su ✓) y la guarda del aire para CR-PL (`_scratch/CR-GS/06/aire.mjs`, `resumen.mjs`, `veredicto.mjs`, `MEDIDA.md`), después de CR-PL·13 . **CR-GS·07 en marcha** (`docs/carriles/CR-GS/07-encargo.md`, 18:10): entregar las 21 decididas de la ronda 1 y la ronda 2 del aire en las 59 que siguen con ~ (casi todas «apretado todavia»): el aire un escalón más, el margen de dentro a los lados de las tarjetas, fuera el rótulo «El problema», preguntas y respuestas en su fila, el procedimiento centrado, lo particular; las cadenas con la v61 . Las 21 decididas, entregadas (`_scratch/CR-GS/entregas/07/`) a CR-LS·08. **Tanda 1, publicada** (`c6f4538`, desde `_scratch/CR-GS/prueba-07/`): L09, L10, L14, L16, L17 y L18, con un escalón más de aire y los lados a 56 px; «El problema» fuera en todas . **Tandas 2 y 3, publicadas** (`f4461c5`): L19 a L29. L29·D5 se queda en dos renglones, como la pidió el operador (lo decidió la cabina, sobre la v61). **CR-GS·07 hecho** (informe `docs/carriles/CR-GS/07.md`). Pendiente: al escribir dos «Todo en un panel» en una lección, CR-LS separa sus estilos (la segunda pisa la raya y el borde de la primera); la regla 38.3, con lo que vote. **El operador votó la ronda 2 en la PC** (22:13): 41 decididas y 18 con ~. **CR-GS·08 encargado** (`docs/carriles/CR-GS/08-encargo.md`, `5607122`): entregar las 41 (`_scratch/CR-GS/entregas/08/`) y la ronda 3 de las 18, por tandas en su copia; en su informe, los valores del aire elegidos, para la regla 38.3 . **Las 41, entregadas** (`_scratch/CR-GS/entregas/08/`) a CR-LS·09. Ronda 3 en curso, con L18·D4 al final con las medidas de la web (la 4, `.25em .3em`; la 5, `.4em .45em`) . **Ronda 3, tanda 1, publicada** (`2193256`): 16 de las 18; L29·D4 trae la 3 (raya arriba) y la 4 (riel a la izquierda, recomendada), porque la cabina leyó mal su comentario . **Tanda 2, publicada** (`a4a8638`): L18·D2 y D4 (el recuadro, con las medidas de la web). **CR-GS·08 terminado** (informe `docs/carriles/CR-GS/08.md`, `adaa92e`); para la regla 38.3 propone 1,0 / 0,8 em, raya 45, borde 40, lados 56 . **Ronda 3, votada** (10:16): 17 decididas; L25·D5 sigue con ~. **CR-GS·09 encargado** (`docs/carriles/CR-GS/09-encargo.md`, `5d0d75e`): entregar las 17, la ronda 4 de L25·D5 y la medida del aire de las 58 elegidas para la regla 38.3 . **CR-GS·09 cerrado** (informe `docs/carriles/CR-GS/09.md`, `12b4919`, `a92e38a`): las 17 y L25·D5; la medida de las 58 entró en DISENO v67 (regla 38, punto 9, `ab01c5b`). **L03·D2 entregada** (`_scratch/CR-GS/entregas/10/`): la frase nueva de la ley . L03·D2, escrita y publicada . **CR-GS·11 hecho** (`docs/carriles/CR-GS/11.md`): la ronda de los comentarios de L02, L03 y L04. **CR-GS·12 en marcha** (`docs/carriles/CR-GS/12-encargo.md`, con dos adendas): las siete decididas y L03·D5 entregadas y escritas; L04·D8, la 2, entregada pero en espera, porque su bloque trae la nota de D11, que tiene una ronda corta sin votar; cuando la vote, entrega el bloque con las dos; la tanda 1 de la revisión general, publicada en `c4c0599`; la tanda 2 (L11–L29), en curso | el siguiente encargo |
| CR-LW (lección web; `local_4a414da2-60b9-4ccf-b42b-ddecaee83b21`) | escribe la web decidida | CR-LW·03 hecho y publicado (informe `9a8363b`, páginas `eed4a61`): 18 en 11 lecciones. En espera: L18·S5–S7, L23·S4, L25·S2, y el arreglo de L04·S3 y L12·S4–S5, hasta el voto de la ronda 4 | **CR-LW·04 hecho y publicado** (informe `docs/carriles/CR-LW/04.md`, `509def1`; páginas `492a412`): las 15 de CR-GW·04 en L04, L11, L12, L23, L25, L28 y L29; L23, L28 y L29 en amarillo solo por `escala`; L12·S5 no lleva nombre del caso **CR-LW·05 hecho y publicado** (informe `docs/carriles/CR-LW/05.md`; `0977db8`, `d248c27`; páginas `1f1aca0`): L18·S5, la 23, y L25·S2, la 26; L18 a amarillo solo por la `escala` de la 21 **CR-LW·06 hecho y publicado** (`4d91c7d`, informe `2329c51`; página `ed7c66d`): L18·S6 y S7 con la 23 (lo decidió la cabina; al operador se le dice que, si no la quiere ahí, se quita) | lo que entregue CR-GW: «la misma altura» y lo que vote de la ronda. **CR-LW·07 hecho y publicado** (informe `docs/carriles/CR-LW/07.md`, `35e9aaa`; páginas `2897fdc`): las cadenas con la v61 en L05·S1, L12·S1–S3, L15·S4, L25·S1 y L29·S2; L28·S5 (dos renglones) se le sumó después (`625601e`). L28 y L29 se publican con su slide. **CR-LW·08 hecho** (informe `docs/carriles/CR-LW/08.md`, `f5aa26a`): L13·S6, L22·S3, L28·S1 y «la misma altura» (L21·S1, S3; L22·S2, S4), con 0 px de desnivel; publicadas L13, L21 y L22 (`8e5115c`); L28 publicada con su slide (`f0e4237`). **CR-LW·09 abierto** (encargo `b9b37af`): escribe las decididas que el operador marque esta noche en la PC; la primera, L02·S1 con la 4 de RW-64 (`d8b15c1`, publicada en `4222408`, L02 · web en 👁). Después, L02·S2 (`64d06c4`, `eb8cc92`; publicada `ee35fe5`), L04·S1 y S2 (`cf153f3`; `d7b0154`) y L11·S1 (`a8e5431`; `8e7b2b7`). Con CR-GW·08: escritas y publicadas las 35 (L02, L11, L12, L15 a L23, L25, L28 y L29; la última en `3bfaba1`); falta L18·S4, que espera el voto. **CR-LW·09 cerrado** (informe `docs/carriles/CR-LW/09.md`, `47502e1`). **CR-LW·10 hecho** (`e3b243c`, informe `94c64f5`): L18·S4, publicada en `853db29`. **CR-LW·11 hecho** (`4ac41dc`): L03 S1, S2, S3, EG y el texto de S3. **CR-LW·12 hecho** (`dd4ba78`): las 9 cadenas de «Ver cálculo» en L12, L14, L16, L20, L25 y L26. Las de sistema las apunta `CR-GW08 V1 --en …` (la plataforma enseña el código hasta CR-PL·16). Aparta cada borrador, como CR-LS. Lo que vio en `escrita.mjs`: `--en` no deja dos opciones de la misma galería en una lección (le quitó la V4 a L02·S1); apunta por sección, a mano, y va a CR-PL cuando cierre ·15. Su informe 09, al final . **CR-LW·13 hecho** (`docs/carriles/CR-LW/13.md`, `e0cff1e`): L04·S3. **CR-LW·14 abierto** (`docs/carriles/CR-LW/14-encargo.md`): L06·S1 escrita (`515a5e8`); L05·S4, cuando la vote |
| CR-LS (lección slide; `local_7c6e3e45-a14b-4444-bb79-721be4b4083a`) | escribe la slide decidida | CR-LS·03 hecho y publicado (informe `721ead5`, páginas `eed4a61`): las 29 portadas en Ocre, L13, L14·D4 y L12 apuntada | **CR-LS·04 hecho y publicado** (informe `docs/carriles/CR-LS/04.md`; `9270c5f`; páginas `492a412`): L13·D12, la 1; L13 en verde. **CR-LS·05 hecho y publicado** (informe `docs/carriles/CR-LS/05.md`; `0d3da2c`; páginas `73fca3a`): L11·D7, la 1, y D8–D11, la 3; L11 · slide en 8 bloques, en verde; la entrada de L11 salió de `salen.json` **CR-LS·06 hecho y publicado** (informe `docs/carriles/CR-LS/06.md`, `d93d6e9`; páginas `1f2f5e8` y `f7c6178`): las 24 de CR-GS·06 en L14, L15, L16, L17, L19, L24, L26, L28 y L29 (L19·D8 insertada; «sin cambio» de L19 en D9–D12; sale `rejilla-de-factores-mcd-mcm` de L14·D3). Quedan «1 cambio pendiente» L13·D11, L16·D8, L17·D8 y L29·D7, hasta que CR-GS traiga su «con aire» . **CR-LS·07 hecho y publicado** (`f8924d5`, informe `5f724dc`; página `66329f9`): L29·D7, la 1; L29 en verde. **CR-LS·08 en marcha** (`docs/carriles/CR-LS/08-encargo.md`, 18:14): las 21 decididas de CR-GS·07, de L07 a L29; quita las 8 filas de variantes que caen en un bloque reemplazado, como en ·06 (lo confirmó la cabina). Primera mitad, escrita y publicada (L15 con su web, `2897fdc`). Segunda mitad, escrita y publicada: L12, L17, L27, L18, L28 y L29 (`2897fdc`, `8e5115c`, `f0e4237`) . Informe en `docs/carriles/CR-LS/08.md` (`de3a16e`). Su §6: el CSS del aire de CR-GS·06 llega a escenas no votadas (L07·D13–D14, L12·D3, L15·D2 y D7, L16·D7) y la regla S1 de RW-59 entra en L18, L25 y L27; la cabina decidió que se queda (va en la dirección que pidió el operador), y si él no lo quiere en alguna, CR-GS acota la regla . **CR-LS·09 encargado** (`c5e5f33`): las 41 de CR-GS·08; escritas y publicadas L09, L10, L14 (`4f59f5c`), L26 (`33093e8`), L24 y L12·D6 (`5181141`); el aire llega a escenas no votadas (L24·D4, L12·D2–D5) y se queda; empezó por las de solo slide; aparta cada borrador en `_scratch/cabina-lecciones/borradores/<Lnn>.txt` porque CR-LW escribe en los mismos . **CR-LS·09 terminado** (informe `docs/carriles/CR-LS/09.md`, `935883b`): las 41, idénticas a sus fotos votadas, publicadas por lotes hasta `eb19b0c` . **CR-LS·10 encargado** (`5d0d75e`): escribir las 17 de CR-GS·09 cuando lleguen; L29·D4 con el riel a la izquierda, porque así lo eligió el operador . **CR-LS·10 hecho** (informe `docs/carriles/CR-LS/10.md`, `943aed1`): las 18, publicadas de `853db29` a `52babb0`; en L17 separó D7 de D3 con `l17d7`. L03·D2 escrita (`0aa978f`), publicada en `78853e6` . **CR-LS·11 hecho** (`docs/carriles/CR-LS/11.md`, `32f93b2`): las siete de L02 y L03, publicadas en `1f06b4f` y `f5cf235`. **CR-LS·12 abierto** (`docs/carriles/CR-LS/12-encargo.md`): L03·D5 escrita (`e896bd1`, publicada en `2f86a36`); L04·D8 espera la entrega de CR-GS tras el voto de L04·D11 | el siguiente encargo |
| CR-PL (plataforma; `local_4c741188-e71b-48a9-a760-74382af20e8c`) | la Galería de lecciones y sus herramientas | CR-PL·03 integrado (`98b0512`, `85c30fc`): `escrita.mjs --en` y con CR-GS/CR-GW; lo decidido por sistema sin vista sale decidido; «– Sin cambio» (`lecciones/sin-cambio.json`, lo lleva la cabina); L08·D2 con la miniatura de la lección. «Falta decidir» de 243 a 5 (L11·D12–D16 esperan la ronda 2 de L11·D8–D11). **CR-PL·04 integrado** (`24742da`, `ba6211c`; informe `docs/carriles/CR-PL/04.md`): «Decidida» con la etiqueta rellena verde de «Aprobada»; «Por votar» con la de «En revisión» (gris, borde sólido) y su tesela con borde gris doble; lo mismo en la lista «Por votar (n)» y el número de la pestaña; las otras seis marcas, igual. Fotos de antes y después en `_scratch/CR-PL/04/`. El operador dijo «Sí, también» a lo mismo en el inicio. **CR-PL·05 integrado** (`bc626cd`, `29b26de`; informe `docs/carriles/CR-PL/05.md`): en las columnas Guion del inicio, «● N por votar» con la etiqueta gris de borde doble (26), «N decididas» con relleno verde (27, también las de sistema de L10 y L24), «N por escribir»/«N votadas» letra suelta con icono; el gris de «Falta decidir»/«Sin cambio» a `#6B7280` (4,83:1) en el inicio y el mosaico. Fotos en `_scratch/CR-PL/05/`. **CR-PL·06 integrado** (`35482bf`, `77de6a1`; informe `docs/carriles/CR-PL/06.md`): `--verde` `#3B7531` y `--azul` `#4F6C90` en el `:root` de `portada.css` (arregla también las reglas del molde que la plataforma junta, sin tocar `galerias/*`), `.tenue` y «Sin empezar» en `#6B7280`, `.sin-mini` en `#8B919A`; de 831 letras bajo el 4,5:1 a 198, todas a propósito (el «·» y la ✗ apagada al 0,4). Duda abierta: las galerías abiertas solas siguen con los colores de antes (pasarlos al molde, en otro encargo, si se quiere). **Pregunta abierta del operador** (veredicto, 12:22): «N decididas» frente a «aprobada» en la columna Guion; «aprobada» solo sale en L01 · Guion slide (sin vistas y con la lección «Aprobada»). El operador dijo «Sí, igual en todas»: **CR-PL·07 integrado** (`c9f05cc`, `ad69140`; informe `docs/carriles/CR-PL/07.md`): sin el caso «aprobada» en `celdaGuion`; L01 · Guion slide dice «8 decididas»; «Aprobada» solo en las columnas Lección. Su duda: «aprobada: ✓ N» en el title de las teselas y la barra es la de la galería (se queda; «elegida: ✓ N» si el operador la confunde). Worktrees y ramas de CR-PL·04–07 quitados. **CR-PL·08 integrado** (`994f9b8`, `7c95957`; informe `docs/carriles/CR-PL/08.md`; probado por la cabina en el 8799: L01 web ✓ Aprobada, L01 slide 👁, L11 slide 🚧 1 (D7), «Aprobar» y «deshacer», «Copiar» con «Aprobaciones»), el flujo nuevo que aprobó el operador («Sí, encárgalo»; su mensaje y lo medido, en el veredicto, secciones «El operador: el flujo y los estados no se entienden» y «sí al flujo nuevo»): columna Guion «● n por votar», «◐ n esperando variantes», «✓ n/N decididas», sin «sin cambio»; columna Lección «En revisión 🚧 n cambios pendientes», «En revisión 👁», «✓ Aprobada» de la versión exacta, derivadas por la plataforma; «Aprobar» en el inicio y en la pestaña (se guarda como voto, sale en «Copiar»); «Lo nuevo desde la última vez», «Qué cambió» y la leyenda; rama `cr-pl-08-flujo` en `_scratch/CR-PL/cantu-revisiones` (desde `c9f05cc`) y `_scratch/CR-PL/cantu-lessons` (desde `07d925c`); fotos en `_scratch/CR-PL/08/`. `CARRILES.md` lleva la regla «Las aprobaciones del operador»: **la cabina ya no corre `estado.mjs … Aprobada` ni `… En revisión`**; apunta las aprobaciones del operador en el veredicto, con la huella. Worktrees y ramas quitados. **CR-PL·09 integrado** (`a99eb92`, `6dad3b3`; informe `docs/carriles/CR-PL/09.md`; probado por la cabina en el 8799: L11 · slide «● 4 por votar · ✓ 12/16» y 🚧 1, un comentario de prueba en L01 · web con «Aprobar» apagado y «Quitar»; sus 5 dudas aceptadas) (`docs/carriles/CR-PL/09-encargo.md`, 2026-11-02 16:00; el mensaje del operador, en el veredicto, sección «El operador: «5/5 ✓», un reloj, L11·D12–D16 y dónde comentar una lección»): «✓ n/N» sin la palabra; un reloj de arena en lugar de ◐; «Esperando variantes» solo cuando el operador ya dio feedback, y una «Hoy» sin voto es «● Por votar»; `lecciones/salen.json` para lo que una decisión quita (L11 · slide: D8 a D16 salen por L11·D7, la 1; D12 a D16 salían «esperando variantes»); y «Comentar», en cada Lección y uno general en el inicio (claves `com:` en REVISADAS; la cabina los atiende en `tablero.json`, clave `comentarios`). «Comentar» lo recomendó la cabina y se lanzó sin esperar: si el operador pide otra forma, se le dice al carril. Rama `cr-pl-09-comentar` en `_scratch/CR-PL/cantu-revisiones` (desde `994f9b8`) y `_scratch/CR-PL/cantu-lessons` (desde `35d3b31`); fotos en `_scratch/CR-PL/09/`. `CARRILES.md` lleva «Los comentarios del operador» (la cabina los apunta verbatim con su id, decide dónde van y escribe su estado en `tablero.json` › `comentarios`: «en el taller» con `donde`, «atendido» con `respuesta`) y «Lo que una decisión quita» (`salen.json`, en el mismo commit que el veredicto). Worktrees y ramas quitados. **CR-PL·10 integrado** (`78b6e76`, `986f8f6`; informe `docs/carriles/CR-PL/10.md`; probado por la cabina en el 8799: ninguna celda Lección sin entrar, L01 · web entra a `#L01/leccion-web` con «Comentar», la leyenda al pie; sus 2 dudas aceptadas) (`docs/carriles/CR-PL/10-encargo.md`, lanzado el 2026-11-02 a las 18:1x): el operador no encuentra cómo entrar a la pestaña de una Lección aprobada para comentarla, y pide «un iconito para entrar al lado de la badge aprobado»; y la leyenda del inicio, abajo, plegada como «Por votar». Rama `cr-pl-10-entrar` en `_scratch/CR-PL/cantu-revisiones` (desde `a99eb92`) y `_scratch/CR-PL/cantu-lessons` (desde `587e35f`); fotos en `_scratch/CR-PL/10/`. Worktrees y ramas quitados. **CR-PL·11 en marcha** (`docs/carriles/CR-PL/11-encargo.md`, 21:0x): «→» al votar va a la siguiente vista, no a la que falta votar; y «Copiar mis respuestas» dejó los 17 votos web del operador en «Sin copiar». Rama `cr-pl-11-siguiente` en `_scratch/CR-PL/cantu-revisiones` (desde `78b6e76`) y `_scratch/CR-PL/cantu-lessons` (desde `97a624f`); fotos en `_scratch/CR-PL/11/`. **CR-PL·12 en marcha** (`docs/carriles/CR-PL/12-encargo.md`, 13:00; rama `cr-pl-12-en-que-secciones` en `_scratch/CR-PL/cantu-revisiones`, desde `1f1aca0`): «Lo que decidiste y ya trae» dice «en toda la web» con una decisión de sistema apuntada con `--en` (`portada.js:1307`). Antes: **CR-PL·11 integrado** (`907a4f1`, `b62fea0`; informe `docs/carriles/CR-PL/11.md`): «←» «→» como antes; aparte, «Siguiente sin votar» y «↩» (deshace los saltos uno por uno); «Copiar» trae lo votado en una página ya abierta. Probado en el 8799. Worktrees y ramas quitados . **CR-PL·12 integrado** (`56ffd93`, `9c0c8de`; informe `docs/carriles/CR-PL/12.md`): con «en», «la 23, en L18·S5, L18·S6, L18·S7». Worktrees y ramas quitados. **CR-PL·13 en marcha** (`docs/carriles/CR-PL/13-encargo.md`, 14:13; rama `cr-pl-13-sin-codigos` en `_scratch/CR-PL/cantu-revisiones`, desde `1f2f5e8`, y `_scratch/CR-PL/cantu-lessons`, desde `9c0c8de`): «ya trae lo que decidiste (RW-73)» enseña el código de la galería (`estadoPieza()`, `portada.js:406`) . Pendiente para después: una decisión de sistema de otro aspecto (las cadenas, el aire) no debería competir por la ✓ de una vista con el diseño de la sección (lo vio la cabina con CR-GW·06) . **CR-PL·13 integrado** (`eab5276`, `40fb78f`; informe `docs/carriles/CR-PL/13.md`): sin códigos de galería a la vista, también los de carril («Las cadenas», «Guion slide»). Sus dudas, para otro encargo: los códigos que escriben la cabina y los talleres (tablero, pies de figura) y el select «¿De qué parte?», que desborda a 380 px. Su rama y sus worktrees siguen, para ·14. **CR-PL·14 encargado** (`docs/carriles/CR-PL/14-encargo.md`, 20:16), para después de ·13: «Traer lo nuevo» pasa a «Sincronizar» (lo propuso el operador) y dice cuántos votos faltan por subir (lo propuso la cabina); rama `cr-pl-14-sincronizar` desde la punta de ·13 . **CR-PL·14 integrado** (`36bec59`): «Traer lo nuevo» es ahora **«Sincronizar»**, y al lado dice lo que falta por subir del aparato. Su informe y su bitácora, pendientes (los bancos de 04 a 13 seguían corriendo) . **CR-PL·15 encargado** (`docs/carriles/CR-PL/15-encargo.md`), para después del informe de ·14: fuera el botón «Pegar respuestas» (lo decidió el operador: «confunde»); «Copiar mis respuestas» se queda. **CR-PL·14 cerrado** (informe `docs/carriles/CR-PL/14.md`, `ef96ae0`, integrado en `4d04ce0`): banco14 17/17, laptop 8/8, PC 36/38 (U4 como en ·12), bancos 04 a 13 como su control. **CR-PL·15 integrado** (`a6ccb88`; informe `docs/carriles/CR-PL/15.md`, `e4a9420`): fuera «Pegar respuestas»; en las galerías de ticket, el servidor esconde el botón; banco15 11/11, laptop 8/8, PC 34/36. **CR-PL·17 y sus cuatro ajustes, integrados** (hasta `f913d94` y `853dab4`). **El operador ahora le pide cosas directamente a CR-PL:** CR-PL las hace en una rama propia, con sus palabras en un informe `docs/carriles/CR-PL/17-*.md`, y avisa a la cabina, que las prueba en el 8799, las integra y las apunta en el veredicto. banco09 al día, 43/43 contra main. **CR-PL·17** (`e902ab6`, `17726bf`; informe `docs/carriles/CR-PL/17.md`): el botón 💬 por sección (web) y por slide, que guarda un comentario de esa parte; «Copiar» trae los comentarios con su parte y «Sin copiar» en una línea. **Laptop-MC** (TITI-TOTO-LAPTO): Git 2.56, Node 26; el botón espera hasta 90 s (`ff0b980`). **CR-PL·16 integrado** (`911fdf1`, `903d0e3`; informe `docs/carriles/CR-PL/16.md`): `--en` ya no pisa otra sección, y `--nombre` para las decisiones de sistema; la cabina puso «Con más aire y margen en la losa» en L02, L15, L17, L18 y L29 (`168b834`). Sin encargo abierto. **CR-PL·16 encargado** (`be47608`), para después de ·15: `escrita.mjs --en` con dos opciones de la misma galería en una lección, y el nombre de una decisión de sistema (hoy sale «CR-GW08») . **CR-PL·18 integrado** (`511c538`, `aafb6d0`, `f397080`; informe `docs/carriles/CR-PL/18.md`): una ronda nueva va «Por votar» aunque otra galería la aprobara, y una decisión de sistema escrita no la tapa; banco18 12/12, banco09 43/43. Sin encargo abierto. Sus dos notas, para después: `escrita.mjs` con la hora local y su zona en vez del día UTC; en `banco-comentar` paso 5, con L05, un atendido sigue «abierto» (con main igual) | el siguiente encargo; pendientes: la guarda del aire para `build.mjs --slide`, y las dudas de ·13 (códigos de la cabina y los talleres; el select a 380 px) |
| RW-31 a RW-33 | el plan de fracciones de L18 (antes L17) | en espera | la aprobación de la web de L17 (antes L16): desde CR-PL·08 es «Aprobar», en su Lección web (la decisión del tablero se cerró así en `df43016`); cuando la apruebe, la cabina los lanza |

- **Desde el 31-oct, el voto va por lección y en orden** (contrato, «Revisar por lección»). Las galerías de estos
  tickets ya salen dentro de cada lección, y lo que el operador elija ahí lo aplica el corrector de su tanda. Antes del
  primer corrector, la cabina mide si las opciones están en disco; si alguna no está, ese voto vuelve a su ticket.
  Así pasó el 31-oct con RW-59 y RW-64: sus opciones solo estaban en las copias de los talleres, y los votos volvieron a
  sus tickets. **La paleta de RW-60 ya está votada** (la 1, Ocre).
- **Las dudas que quedaron con la recomendación del taller,** mientras el operador no diga otra cosa:
  - **RW-70:** la barra crece una fila a 380 px; en la PC, «Traer lo nuevo» sale en ámbar.
  - **RW-71:** una ✓ con comentario cuenta como decidida; un ~ o una ✗ sin comentario, como votada; L18 y L19 se
    pueden votar; la carpeta se llama `HOY`.

## Pendientes de la cabina

- **De la revisión general (4-nov):**
  - la regla del color y la de la nota, en DISENO, cuando vote la ronda;
  - la respuesta del operador sobre los 14 rótulos centrados de la web;
  - si sube a la paleta un tono de letra para cada claro;
  - las notas de CR-PL·18: la hora local de `escrita.mjs` y el atendido que sigue «abierto» en `banco-comentar`.
- **La bandeja** (`cantu-lessons/docs/encargos/BANDEJA.md`), con lo abierto:
  - que la compilación publique sola (duda 7 de RW-67);
  - la regla de 3 en la web de L08 (necesita la palabra del operador);
  - la guarda del ± de slide;
  - `build.mjs --slide` a 1366 × 768;
  - `studio.mjs` sin `--no-optional-locks`;
  - los subtítulos de las slides;
  - el ± en MathJax;
  - las filas de slide de L03, L04, L06 y L07 en el registro;
  - y las demás que tiene ahí.
- **Las copias de los talleres en `lecciones/`:** son 60 carpetas fuera de `codigos.json` (L01W, L02P…), y `tablero.mjs`
  las avisa. Quitarlas es limpieza que espera la palabra del operador.
- **`renumerar.mjs --comprobar`** marca `galerias/RW-68` por 7 «B» en su texto («antes L11B»). Está así a propósito,
  pero hay que decidir si la guarda lo admite o si se cambia el texto.
- **El temario** (`temario/01-aritmetica.md`) tiene su propia numeración, que no coincide con los códigos.
- **De relevos anteriores, sin volver a medir:**
  - L20·D3 a las variantes de L20;
  - el ticket de herramientas: las guardas de la regla 41 v62, las piezas del lote, las guardas de RW-45, las mutaciones
    débiles, los nombres de consola y los `_generado` viejos de `lecciones/L02-…/`, que necesitan la palabra del
    operador;
  - probar `problema-slide` con más problemas;
  - la pregunta de Moodle.
- **La regla de archivar, pasada a otras cabinas** (el operador: «Sí, pásasela»): P2 contestó que ya la aplicaba;
  Acervo no había contestado al cerrar.
- `drafts/web/_pendiente-qa/casilla-2-operar-con-signos/` **no se borra**: es la etapa 2 de la regla 17. Sus scripts
  están en `_scratch/_LEC_variantes5/`.

## Cerrado (29 y 30 de octubre)

| qué | dónde |
|---|---|
| RW-54 (el servidor), RW-55 (el riel de L02·D9), RW-56 (el botón), RW-58 (L02·D5, el ±) y la regla 41 v63–v64 | ver el veredicto |
| las slides de L01 y L02, «Aprobadas» | `cantu-lessons` `3cba4fe` |
| RW-62 (el tablero por lección) y RW-63 (una sola galería, por lección) | `bb7cc21`, `b4db0bf` |
| RW-65 (la plataforma única, pulida en tres rondas) | `cantu-revisiones` `6522562`, `cantu-lessons` `70fff6f` |
| RW-66 (L01 a L29 y los estados) | `cantu-lessons` `3195e1f`, `cantu-revisiones` `ce11878` |
| RW-67 (compilar solo lo que cambió) | `cantu-lessons` `ba52f04`; la primera completa, 57 piezas en 15 min 27 s |
| RW-69 (la galería en la laptop) | `935a659`, `e591e92`; páginas publicadas `dffdac0` |
| RW-70 («Traer lo nuevo»; `renumerar.mjs` sin opciones) | `cantu-revisiones` `430989f`, `cantu-lessons` `8fd045c` |
| RW-71 (las galerías completas, con «Hoy»; corrió como agente de la cabina) | `cantu-revisiones` `ba0580e`, `cantu-lessons` `6064fcc` |
| RW-75 (carriles, «Copiar» por lección, los estados y el ojo; `escrita.mjs`) | `cantu-lessons` `c673503`, `66c9006` y `9366b3d`; `cantu-revisiones` `6507a85` |
| el nombre «Galería de lecciones» | veredicto `02a3fdf`; contrato `f51bc43` |
| D-082 (el cierre de cada mensaje) y D-083 (sin runs) | `aiw-console` `context/DECISIONES.md` |

## Lo que el operador tiene que decidir (con la recomendación de la cabina)

1. **Pasar el `CLAUDE.md` de la cabina a v1:** sigue marcado «v0 · PILOTO», aunque ya lleva muchas enmiendas.
   *Recomendación: sí, en una sesión tranquila, con el veredicto del piloto al lado.*
2. **Versionar `mudanza.mjs` y las tres sondas** en `context/cabinas/lecciones/herramientas/`. *Recomendación: sí.*
3. **Los permisos de Claude Code en `.claude/settings.json`.** *Recomendación: todavía no.* La cabina corre en modo
   *bypass*.

## La mudanza de la laptop a la PC (abierta desde el 28-oct)

- **No está verificada.** El `comparar` dio NO el 28-oct: faltan 10 499 ficheros, ninguno versionado, y casi todo lo que
  difiere es CRLF contra LF.
- **Falta que el operador copie de la laptop** lo de `_scratch/cabina/mudanza/faltan-en-la-pc.txt`:
  - `cantu-lessons/fuentes/`: 13 ficheros, 18,4 MB. Son evidencia y no van a git, así que **solo están en la laptop**;
  - `PHD/Paper 2/` y `phd-p2-experiment/` (lo de su hilo).

  Cuando copie, la cabina vuelve a correr el `comparar` (pasos 6 y 7 de `_scratch/cabina/mudanza/README.md` y las
  sondas de `sondas/`) y añade el resultado al veredicto. `_scratch/cabina/mudanza/` **no se borra hasta verificar**.
- **La laptop ya se usa para revisar** con la galería (RW-69), pero no para escribir en los repos.

## Dónde está todo

- **El veredicto del hilo**, con todas las palabras del operador:
  `projects/cantu-lessons/docs/veredictos/2026-10-16-lectura-de-las-seis-lecciones-web.md`.
- **Los tickets:** `docs/encargos/REVISION-WEB-TICKETS.md`, hasta RW-71. **La bandeja**: `docs/encargos/BANDEJA.md`.
- **Los informes:** `docs/informes/RW-xx.md`.
- **El molde de galería:** `docs/referencias/MOLDE-DE-GALERIA.md` v3, con «Los votos…» y «La vista «Hoy»».
- **El común de los talleres:** `docs/encargos/TALLER-COMUN.md` v8, con §5 al día con RW-67.
- **Las herramientas:** `tools/revision/README.md` (compilar, publicar, renumerar, el tablero, la plataforma).
- **La galería:** `projects/cantu-revisiones`: su README; `galerias/<ticket>/`, `galerias/HOY/` y `lecciones/`, que es lo
  publicado.
- **Los bancos de prueba de los talleres** (desechables): `_scratch/RW-69/`, `_scratch/RW-70/` y `_scratch/RW-71/`, en
  `trabajo/` y `capturas/`.

## La capacidad de la cabina, medida en la PC

- **Claude Code con el disco directo:** git (`add`, `commit` y `push`), `npm` y `node` v24.12.0. Y **Python 3.12.10** desde
  el 29-oct, por usuario: se llama por ruta completa (memoria de la cabina).
- **GitHub Desktop** está abierto y hace fetch solo. No estorba.
- **La app de Claude** es el `.msix`, y `AllowAllTrustedApps` está en 0: sus actualizaciones pueden fallar. Es cosa del
  operador.

## Lecciones que siguen valiendo

1. **Un `comparar` en NO no es un diagnóstico.** Se desglosa antes de decir qué falló.
2. **Antes de afirmar que algo no existe, se mira también GitHub.**
3. **Una regla escrita no protege si el encargo no la cita.**
4. **Donde el `CLAUDE.md` dice que se abre la sesión no es donde la abre la app.** El mensaje de arranque es la red.
5. **El final de línea se mide con node, no con grep.** Un script que falla «sin ancla» casi siempre es por un CRLF.
6. **El operador no ve la caja de la pregunta cuando escribe por Remote Control.** Cada mensaje se cierra con lo que
   necesita la cabina, dicho en el texto.
