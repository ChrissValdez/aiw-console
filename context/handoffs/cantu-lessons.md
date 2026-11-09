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
- CR-PL `local_4c741188-e71b-48a9-a760-74382af20e8c`;
- CR-PE `local_af06ccde-1ef8-480f-96a3-895491e78db5` (Peticiones, abierto el 7-nov a las 17:56; CARRILES v3).

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
  - **RW-83 cerrado.** El commit `c8a6452` está en main. La página quedó publicada en la versión `1794036154-9d32`: se revisó el diff
    contra la de hoy y `LECCIONES` es idéntico. La colección `evaluacion` sigue en 0 documentos. La sesión se archiva.
    - Lo medido: 1 201 preguntas, ninguna lección sin quiz y ningún quiz sin lección. 5 quizzes no salen seguidos, y 10 de 14
      quedan partidos entre las dos rutas: 20 de las 22 complementarias son refuerzo de un quiz de la esencial.
    - **Las 4 dudas del operador** (RW-83, «Dudas»):
      1. el quiz de Fundamentos, después de ALG-13, y el de Polinomios, después de ALG-05;
      2. Trabajo y rendimiento y Productos notables, a quizzes de la complementaria, y ALG-20 con Razones;
      3. que el quiz de la ruta esencial pregunte solo lo de sus esenciales; eso toca a CQL;
      4. aceptar Exponentes y Radicales partidos (la 30 y la 50).
    - **02:13, «Sí, las dos»** (dudas 1 y 2; veredicto, cantu-lessons `dbbccd8`).
      - Republicada la versión `1794039294-1330` con el guion `scratchpad/mover-quizzes.mjs`: Fundamentos va después de 13,
        Polinomios después de 05, Trabajo después de 58 y Productos notables después de 68; ALG-20 con Razones.
      - Los grupos están numerados por su primera lección. Una lección de un quiz que ya pasó es refuerzo, también en la esencial
        (ALG-36).
      - Probada en el 8986: 30 tramos y 14 quizzes, igual que RW-83 §5.
      - La copia de antes está en `_scratch\RW-83\pagina-agrupada.antes-cambios.html`.
      - **Siguen abiertas la duda 3 (con CQL) y la 4,** y su revisión del temario.
    - **02:29:** le llevé al chat la lista agrupada de las 72, con títulos.
    - **10:56, «Me causa ruido eso de refuerzos»** (veredicto, cantu-lessons `df896ca`). Le molesta que el mismo tema vuelva 13 a 46
      lecciones después, como pasó con Porcentajes en aritmética.
      - Medido: son 14 refuerzos, con 205 preguntas del banco y 0 del PAA. 10 podrían ir justo después de su tema; 53, 54, 71 y
        72 necesitan un tema posterior.
      - Tres caminos:
        - A, pasarlos a la esencial, como ARI-23;
        - **B (la recomendación de la cabina), pegados a su tema y opcionales;**
        - C, dejarlos como están.
      - B y A cambian la regla de numerar de álgebra, pero aritmética no se mueve. Espera su decisión.
    - **11:01, «C descartado… estoy entre A o B».** Pregunta si el concepto es «esencial y opcional» en vez de «esencial y
      complementaria», y pide analizar los dos temarios.
      - **RW-84 lanzado** (encargo en cantu-lessons `396aa7a`; sesión `local_f364861e-c7ce-44eb-89ec-9de4eeca0b99`). Es de solo
        lectura y compara hoy, A y B en aritmética y álgebra. Entrega `RW-84.md` y `ORDEN-ESENCIAL-OPCIONAL.json`.
      - **RW-84 entregado (11:14; subido a main como cantu-lessons `2bc2bd3` a las 11:19; sesión archivada).** Recomienda B,
        «esencial y opcional», en las dos áreas.
        - Aritmética: B = v3, 0 códigos cambian, así que RW-82 se integra tal cual. «B estricto» (Notación científica junto a
          Operaciones) cambia 16 códigos; no lo recomienda.
        - Álgebra: la esencial sigue en 50; los regresos bajan de 14 a 4; el de la esencial se salta opcionales en 9 sitios;
          cambian 67 de 72 números (solo la página: no hay lecciones escritas).
        - El quiz: «Quiz X» esencial, recortado a sus esenciales, más «Quiz X completo» opcional. Va a CQL.
        - La marca es «Opcional», con «para ir más lejos» debajo. Siete dudas en el informe; se las llevé al chat.
    - **11:35–12:13, el operador decide el modelo** (veredicto, cantu-lessons `4d98ff2`, `655bd4f`, `06eda42`, `f232b4f` y `7c743b3`):
      - preguntó qué hace esencial u opcional a una lección: la vara de RW-77 y RW-78, que se fija en el PAA real;
      - pidió el peso de cada tema para saber en qué enfocarse con pocas horas;
      - **su regla (12:07):** se estudia por áreas, una tras otra; dentro de cada área manda el orden pedagógico, y el peso solo
        desempata dos temas independientes. La cabina retiró su idea de bloques de varias áreas;
      - **12:13: B, «esencial y opcional».** No a la C ni a una «segunda vuelta», y el alumno necesita un coach.
      - Escrito en `NUMERACION-DE-LECCIONES.md` v4. En aritmética B da la v3 (0 cambios). Álgebra se renumera una sola vez, con
        la tabla de RW-85.
      - **RW-85 lanzado** (encargo en cantu-lessons `7c743b3`; sesión `local_f87be911-1a3c-49f4-b31a-e1bfb4070e92`). Es de solo
        lectura y trabaja así:
        - ordena cada área con su regla y comprueba el orden de las áreas;
        - mide el peso, las horas y los prerrequisitos de cada uno de los 43 temas;
        - escribe las reglas del coach y tres planes de 20, 50 y 100 horas, y mide el peso de Español;
        - entrega `RW-85.md` y `RUTA-DE-ESTUDIO.json`, que la sesión estrategia-moodle va a leer.
      - Siguen abiertas las dudas 4 a 6 de RW-84: los dos quizzes (va a CQL), la marca «Opcional» y ALG-36.
      - **RW-85 entregó a las 12:41 (cantu-lessons `b972661`, subido).**
        - Aritmética: la v3 pasa la regla.
        - Álgebra: el orden B con Desigualdades detrás de Sistemas; cambian 22 códigos frente a B y 67 frente a RW-80. La tabla
          está en §2.2.
        - El orden de las áreas se confirma: ARI → ALG → GEO → DATOS → FUN.
        - Horas [ESTIMADO]: ≈ 99 h la esencial sin Reto.
        - 8 dudas.
        - **La cabina le devolvió los planes de §7** (12:43): el coach arrastraba solo los usos del examen, y los planes mandaban
          a Datos sin fracciones y a Funciones sin álgebra. El arrastre tiene que contar los fundamentos del temario. La tabla de
          álgebra no cambia. La sesión sigue abierta hasta esa corrección.
        - **Corrección entregada a las 12:47 (`9b90e85`, subido a las 12:48).** El arrastre cuenta los fundamentos del temario, y
          los 9 planes dan «ok» en la comprobación de prerrequisitos.
          - Solo cambian los dos planes del que no sabe nada: con 50 h sale Funciones y entran Sistemas, Desigualdades y
            Exponentes (de 24,5 a 25,3 preg./forma).
          - Para el que no sabe nada, Geometría entra desde 65 h y Funciones desde 87 h [ESTIMADO].
        - **12:48:** la cabina le pidió comprobar si Geometría queda fuera con 50 h por el examen o por elegir de uno en uno
          (la cadena de figuras como paquete).
        - **Respuesta a las 12:54 (`690f507`, subido a las 12:55; sesión archivada): era el coach, no el examen.**
          - Ahora el coach compara planes enteros, y un candidato puede ser un tramo de la cadena de un área.
          - El que no sabe nada, con 50 h, pasa de 25,3 a 29,0 preg./forma: entra la cadena de figuras de Geometría y sale
            Datos entero.
          - Geometría entra desde 44 h (antes 65) y Funciones desde 85 h.
          - Con 20 h no cambia nada (11,8), porque el paquete cuesta ≈ 37,4 h.
          - El JSON trae los planes de este coach.
      - **12:45, «Sí, apérgalo»** (veredicto `dce1699`): aprobó Desigualdades detrás de Sistemas (RW-85, duda 1). Siguen abiertas
        las dudas 2 a 8.
      - **RW-86 lanzado** (encargo en cantu-lessons `8c38d7f`; sesión `local_66b72197-053f-4a2e-8d1e-f07544d9a0dc`).
        - Prepara la página de álgebra con el orden final, `_scratchRW-86pagina-b.html`: marca por fila e interruptor
          «Esconder las opcionales».
        - Lee la tabla del commit `b972661`. `evaluacion` tiene 0 documentos (12:47).
        - La cabina la publica en `KVVPFq3NkR7Ac3hxhQsLee`.
      - **RW-86 entregó a las 12:59** (informe en cantu-lessons `44ad45b`, subido; sesión archivada a las 13:04, con Remote
        Control apagado antes).
        - La sonda: 72 filas (50 ● y 22 ○), 14 renglones de quiz y 0 lecciones antes de lo que necesitan; con las opcionales
          escondidas, 50 filas.
        - La cabina decidió sus 9 dudas como recomendaba (todo se queda) y cambió dos frases: la aritmética, con ≈86 min de la
          esencial, y la cita de RW-83, con dónde va hoy el quiz de Polinomios (detrás de ALG-06).
        - **Publicada entre las 13:03 y las 13:04** en `KVVPFq3NkR7Ac3hxhQsLee`, versión 6 (`1794078207-7c78`), sin tocar las
          capacidades; `evaluacion` tenía 0 documentos justo antes. Copia: `_scratch\RW-86\pagina-b.html`, md5
          `ffd52315b0533393090b55fb262ca776`, 94 538 bytes.
      - **13:00, el diagnóstico** (veredicto `5a74f2a`): pregunta si un diagnóstico por área es mejor que el largo, en el que su
        sobrino sacó 28 de 100.
        - Medido en `PAA/Examen Diagnostico/plantilla-matematicas.csv`: Matemáticas trae 60 preguntas (Aritmética 8, Álgebra 20,
          Funciones 7, Estadística 10, Geometría 15). Va detrás de Lectura y Redacción, y Geometría es lo último (46 a 60).
        - La cabina recomienda el diagnóstico por área, con tres cuidados: se abre al empezar el área y se puede adelantar; cada
          pregunta va a un tramo de la ruta; el plan del primer día es provisional.
        - Propone encargar su diseño. Espera su sí.
      - **13:48, «¿por área tal cual, o también un inicial general?»** (veredicto `76b35d5`). La cabina recomienda dos piezas,
        cada una con un solo trabajo:
        - un inicial corto el primer día: reparte las horas entre Español y Matemáticas, da el primer plan y queda como punto de
          partida; no mapea temas;
        - el diagnóstico por área: decide qué tramos saltar.
        - El inicial aporta porque Español es 70 de las 125 preguntas y los de área no lo miden. Pregunta si encarga el diseño
          con las dos piezas.
      - **13:53, «español y matematicas estan separados»** (veredicto `72bb2f6`): se estudian por separado, cada uno con su
        diagnóstico, y solo se juntan en el simulador. **La cabina retira el inicial corto:** su razón era ese reparto.
        - Recomienda solo el diagnóstico de Matemáticas por área, encadenado: el de aritmética se presenta el primer día; si sale
          bien, se ofrece el siguiente enseguida, y si sale flojo, el siguiente se abre al llegar a su área. Cada pregunta apunta
          a un tramo, y el plan del primer día es provisional.
        - Responde en parte la duda 8 de RW-85: lo que sobra en Matemáticas no pasa a Español. Falta decidir si va a las
          opcionales o al simulador.
        - **A estrategia-moodle se le pasa con RW-85:** nada reparte horas entre Español y Matemáticas.
        - Pregunta si encarga el diseño del diagnóstico por área.
      - **13:56, «si encargalo»:** RW-87 encargado (cantu-lessons `f0ce943`, encargo en la línea 4700 de
        `REVISION-WEB-TICKETS.md`). Es el diseño de solo lectura del diagnóstico de Matemáticas por área. Entrega `RW-87.md` y
        `DIAGNOSTICO-POR-AREA.json`.
        - **Sin lanzar:** el operador escribe por Remote Control, y la app no deja abrir la sesión (ni con `user_asked` ni con
          tarjeta). Se le preguntó si lo corre la cabina como agente de fondo o si lo lanza él escribiendo desde la PC.
      - **14:19, «volvamos a lo simple»** (veredicto `f04a922`): se queda el diagnóstico de hoy, y los de sección van más
        adelante. **RW-87 queda en pausa sin lanzarse.** Sigue la ruta esencial con opcionales. Pide la recomendación para los
        temarios de aritmética y álgebra, antes que nada.
        - **La cabina recomienda congelarlos como están:**
          - aritmética, la v3 (29 lecciones: 21 esenciales y 8 opcionales); solo falta RW-82;
          - álgebra, la página publicada (72 lecciones: 50 esenciales y 22 opcionales), con las 4 dudosas como están, la
            geometría en una línea y el operador marcando solo lo que cambiaría;
          - códigos fijos: si algo cambia, cambia la marca;
          - para CQL, la versión de cada quiz de álgebra solo con lo que el alumno de la esencial ya estudió (Racionales: 53 de
            81), y las ≈ 7 preguntas de Propiedades (duda 6 de RW-85).
        - Se aparcan las dudas 2, 3, 7 y 8 de RW-85. Espera su sí.
      - **14:24, «¿cómo quedó el orden de álgebra?»** (veredicto `f978513`). Medido en la página publicada: sin bloque de
        opcionales al final; 20 de 22 opcionales junto a su tema; 8 de 12 bloques seguidos. Hay 4 regresos, cada uno por lo que la
        lección necesita: ALG-31, ALG-47 (el único esencial lejano, 41 lecciones después de ALG-06), ALG-68, y ALG-70 a 72.
        Aritmética no tiene ninguno. La cabina recomienda dejarlo así y congelar. Espera su sí.
      - **14:28, «Sí, congélalos»: LOS DOS TEMARIOS QUEDAN FIJOS** (veredicto y `NUMERACION-DE-LECCIONES.md`, sección
        «Congelado», en cantu-lessons `39d20f9`):
        - aritmética, la v3 (ARI-01 a 21 esenciales, de 22 a 29 opcionales), que aplica RW-82;
        - álgebra, el orden de RW-85 §2.2: desde hoy sus códigos son estos;
        - las 4 dudosas como están, la geometría en una línea, y los códigos fijos (si algo cambia, cambia la marca).
        - Aprobadas las dudas 4 y 5 de RW-85. Aparcadas la 2, la 3, la 7, la 8 y RW-87.
        - **La página de álgebra, en la versión 7** (`1794083454-ea06`): «Ya decidido» dice que está congelada, y «Lo que decides
          tú» queda en marcar solo lo que cambiaría, más el plan `.docx`.
        - **Dos pedidos a CQL_Cabina entre las 14:30 y las 14:31**, en cola porque estaba fuera de línea (sin confirmar que lo leyó): el quiz de
          Propiedades (≈ 7 preguntas que usan ARI-03, ARI-04 y ARI-16; duda 6 de RW-85), y una versión de cada uno de los 11 quizzes
          esenciales de álgebra solo con lo que ya estudió el alumno de la esencial (no urge). Espera su aviso.
      - **14:32, «Ya la cerré»** (veredicto `a215a82`): a las 14:33 el 8791 seguía escuchando (PID 19172, hijo del PowerShell
        de `abrir-galeria.ps1`, PID 1788). Cerró el navegador, no la ventana del servidor. `cantu-revisiones` está limpio y al día
        (`8c86c01`), sin votos pendientes. Se le pidió Enter en esa ventana o su permiso para que la cabina lo pare.
      - **14:34, «Páralo tú»** (veredicto `54f44ab`): la cabina paró el 8791 y escribió `desde` a las 14:36:12 (medido con `date`).
- **RW-82 integrado en la PC (de 14:36 a 14:55):** en `codigos.json`, `"desde": "2026-11-07T14:36:12-06:00"`.
  - `renumerar.mjs`: dos pasadas, y la tercera, sin cambios. `--comprobar`: ningún código de antes en lo vivo.
  - **Votos:** ninguno perdido ni cambiado en las 10 galerías. `contar-votos.mjs comparar` da un «MAL» falso en seis: lee
    las claves sin fecha y las toma por de hoy. La comparación que sirve usa la generación del informe de la migración
    (RW-79): `_scratch/RW-82/trabajo/comparar-con-informe.mjs`.
  - **Prueba en el 8795** (proceso hijo, parado por su handle):
    - el inicio dice «Ruta esencial · ARI-01 a ARI-21 · 21 lecciones»;
    - ARI-21 es «Porcentaje ¿de qué?» y ARI-25, «Notación científica»;
    - un «Aprobar» de prueba en ARI-21 se guardó sin 409 y se deshizo; los `respuestas.*` de REVISADAS se restauraron
      con `git checkout --`.
  - `build.mjs --todas`, con 0 ✘, y `publicar-paginas.mjs`, con 38 ficheros cambiados y ninguno borrado.
  - **Commits, todos subidos:** en cantu-lessons, `e5b916a` (encima del merge `9c925c4`); en cantu-revisiones, `ff73677`
    (galerías y lecciones) y `9894496` (las páginas publicadas).
  - **Falta:**
    - el doble clic en el botón de Laptop-Chris y de Laptop-MC;
    - el aviso a Chris y a Meche: «ya se vota, recarguen»;
    - si alguna laptop publica votos de antes, correr en la PC `renumerar.mjs --revisiones` y `--comprobar` (§10, paso 11).
  - **El vigilante de votos,** rearmado como `bzdgf914a` (15:24).
- **La tarde del 7-nov, álgebra primero (de 15:51 a 17:49; veredictos en cantu-lessons, de `d3a3b78` a `dbc9173`):**
  - 15:51, «dime en qué estamos»; 15:55, «Sí, álgebra primero»; 16:06, los bloques de los dos temarios; 16:12, la duda de
    ALG-31 y de los «regresos».
  - **16:16, «revisa todo el contenido de álgebra»** (`504bff3`): 0 lecciones antes de lo que necesitan; 4 bloques partidos (2,
    3, 7 y 11). Preguntas que se enseñan después de su quiz: Desigualdades 20 de 86, Fundamentos 16 de 106, Ecuaciones
    lineales 15 de 98, Polinomios 12 de 82 y Sistemas 9 de 99. Casi todas por lo que la lección necesita. Scripts y salida
    en `_scratch/RW-86/` (`auditar-algebra-2.mjs`, `auditoria-algebra-2.txt`).
  - **17:43, «Estoy de acuerdo con las re etiquetas» y «listo» a la página de álgebra** (`dbc9173`):
    - re-etiquetas, sin cambiar ningún código: ALG-31 → «5 · Sistemas»; ALG-68 → «11 · Cuadráticas»; ALG-70 a 72 → «7b ·
      Radicales: ecuaciones y racionalizar». Ningún bloque queda partido;
    - la página, versión 8 (`1794095255-d059`; copia `_scratch/RW-86/pagina-b.html`, md5 `cfd0b7db…`), con «Por qué va
      aquí» en 20 lecciones;
    - `evaluacion`, 0 documentos (17:46): **el temario de álgebra queda aprobado tal cual**;
    - `NUMERACION-DE-LECCIONES.md`, «Congelado»: los «4 regresos» pasan a «Ningún bloque queda partido».
  - **RW-88 encargado (17:51, `7ca7b89`):** el plan de álgebra en `.docx` (`temario/Algebra-temario.docx`, molde de
    aritmética), su extractor en Node (`temario/extraer_docx_algebra.mjs` → `temario/algebra-plan.json`) y ALG-01 y ALG-02
    listos para el piloto. A las 17:49 no se pudo lanzar (Remote Control). **17:53, «lánzalo como su propio taller»:**
    lanzado como `local_96e58dcc-04f6-44a1-970b-e9b6d49e79e3` («rw-88-plan-algebra»). Espera su mensaje.
  - **17:54 y 17:56, el carril CR-PE · Peticiones** (cantu-lessons `ee1915d` y `f66d600`): un carril de larga vida para lo
    que no es de otro carril (los RW y lo que el operador pida directo, también desde la laptop por Remote Control). Sus reglas,
    en `CARRILES.md` «v3»; su bitácora, `docs/carriles/CR-PE.md`; el brief, `_scratch/cabina-lecciones/brief-cr-pe.md`. Copia
    las palabras del operador en su informe y avisa a la cabina una vez por petición; el veredicto lo sigue escribiendo la cabina.
  - **RW-88 entregado (18:13, cantu-lessons `f152adb`, publicado por la cabina):** `temario/Algebra-temario.docx` (md5
    `e013454a…`), `temario/extraer_docx_algebra.mjs`, `temario/algebra-plan.json` y `docs/informes/RW-88.md`. La cabina regeneró el
    JSON del `.docx` (igual al del repo, salvo la fecha) y corrió la sonda: 16 de 16. Fotos en `_scratch/RW-88/fotos/` (HTML sacado del
    `.docx`; **en Word no se ha abierto**). Taller archivado (Remote Control apagado antes).
    - **Las dudas de §6:** 1, 2, 5, 6, 7 y 8, como recomienda el taller. La 9 va a CR-PE·01 (`e285fb8`: `docs/referencias/ALGEBRA-PIEZAS.json`).
      **CR-PE·01 cerrado y publicado (18:17, `9b84e7a` y `18cebd5`):** 265 piezas (no 275: `piezas.json` ya traía N01–N10),
      1 201 preguntas, con el ajuste de RW-80; sonda `tools/sondas/algebra-piezas.mjs`, 11 de 11 (la cabina la corrió). **CR-PE·02**
      (encargado): la página aprobada en `docs/referencias/ALGEBRA-PAGINA-APROBADA.html`, y la sonda que lea esa copia.
      **CR-PE·02 cerrado** (`f37e35c`, 18:19; idéntica a la v8, sonda 11 de 11).
  - **18:19, «procede con el piloto ALG 01 y 02»:** RW-89 (`e9955a4`), taller `local_3fc4fc5b-a114-4686-9605-7b45eabbbf28`
    («rw-89-piloto-algebra»). Hace el alta en `codigos.json` y la web de ALG-01 y de ALG-02 directo al borrador (método de
    `LOTE-2-LECCIONES-WEB.md`, DISEÑO v83). La slide va después de que el operador lea la web. Al entregar: revisar, publicar las
    páginas en cantu-revisiones, poner las dos en «En revisión» en `estados.json` y archivar el taller.
    - **RW-89 entregado e integrado (18:56):** el taller dejó `0cdb754` (alta en `codigos.json`, los seis ficheros del borrador y
      `docs/informes/RW-89.md`). La cabina registró sus 5 etiquetas en `BLOQUES-PROVISIONALES.md` (`4aa07d2`), compiló (las dos en
      verde), publicó las páginas (cantu-revisiones `eaf0566`) y puso la lección «En revisión» (`bbc20f4`). Nota en el veredicto (18:57).
      Taller archivado (Remote Control apagado antes). Alto: ALG-01, 3 844 px y 608 palabras; ALG-02, 4 437 px y 695 (341 de fórmula).
      En la Galería de prueba (8795) sale el área «Álgebra» con las dos. **Espera:** su lectura de las dos webs y las dudas 1 a 6
      del informe. Después, la slide de las dos (antes, `tools/sondas/comun.mjs` debe aceptar el área).
    - **20:21–20:27, su lectura** (votos en cantu-revisiones `f18b832`, comentarios en `b3f43ea`; veredicto y tablero en
      cantu-lessons `4882f53`): «sí» en ALG-01 AP, S1, S2 y EG, y en ALG-02 AP; «meh» en ALG-01·S3 y ALG-02·S1, S2, S3 y EG, con un
      comentario en cada una (los 5, «en el taller» CR-GW·16 en `tablero.json`). Pidió **tres variantes por sección** en vez de
      una: va como **CR-GW·16** (`docs/carriles/CR-GW/16-encargo.md`), enviado a las 20:37 a CR-GW. **Desde ALG-03, la primera
      ronda de cada lección web nueva trae tres variantes por sección** (cambia «una sola versión» de LOTE-2). Las dudas 1 a 6
      de RW-89 siguen sin su respuesta. La PC se reinició hacia las 20:35; vigilante rearmado (`batmw8mss`).
    - **21:11, la ronda de CR-GW·16, publicada** (cantu-revisiones `b816268`; informe `docs/carriles/CR-GW/16.md`, `35ed248`; nota
      en el veredicto y tablero, `f70c8ca`): la 61, la 62 y la 63 en ALG-01·S3 y ALG-02·S1, S2, S3 y EG. Los 5 comentarios,
      «atendido». **Espera su voto.** Con él: CR-GW entrega a `_scratch/CR-GW/entregas/16/`, CR-LW escribe, y la cabina registra
      la etiqueta que salga (`anatomia-juntar-semejantes` o `paso-a-paso-suma-de-polinomios`). A CR-PL, cuando toque: los dos avisos
      falsos de nivel (`conceptGrid` a 29,2 px; `papeles.mjs:147` solo mira `c0`), propuesta en `CR-GW/16.md` §3.
    - **2026-11-08, 11:20–11:31, su voto de la ronda** (cantu-revisiones `c08c0df`; veredicto, adenda, TALLER-COMUN v10 y tablero en
      cantu-lessons `27f161e`): ALG-02·EG **la 61** (CR-GW la entrega, CR-LW·18 la escribe; tesela «en el taller»). ALG-01·S3 y
      ALG-02·S1, S2 y S3, **segunda ronda** desde la 64 (adenda de las 11:35, enviada a CR-GW). **«Variable», no «literal»**
      (TALLER-COMUN v10, punto 17). Vigilante rearmado (`bw4a6ts86`). **Preguntó el nombre de la «ruta complementaria»:** la cabina
      recomienda «Ampliación» (no «Refuerzo»: RW-84 §7); espera su elección. Con ella: CR-PL cambia el nombre visible y la cabina
      los documentos; el valor interno de `codigos.json` (`complementaria`) no cambia.
    - **11:37, ALG-02·EG entregada por CR-GW** (`_scratch/CR-GW/entregas/16/ALG-02-EG-signo-a-la-izquierda.json`, md5 `3a64b022…`,
      comprobado) y **encargada a CR-LW como CR-LW·18** (cantu-lessons `9ffa14f`, enviada). Al volver: revisar, publicar la página
      de ALG-02 y mirar que el 🚧 quede en 0. CR-GW sigue con la ronda 2.
    - **11:41, CR-LW·18 hecho y publicado:** `bbfdaeb` y `461179e` (borrador md5 `f894420b…`, verde, apuntado `ALG-02 EG CR-GW V61`),
      subidos; página en cantu-revisiones `88c359d`. 🚧 en 0. Los borradores de álgebra van con LF en disco (los de aritmética, CRLF).
    - **11:51, el nombre de la ruta:** «Ampliación» no le gusta; le gusta «Refuerzo» pero pidió más. La cabina le dio 8 con tabla y
      recomienda «Ventaja» (veredicto `10f2201`). Espera su elección.
    - **11:52, las guías de la UDEM** (veredicto `5593eb4`): las quiere como referencia de álgebra. Están en su OneDrive
      (`EducaTalento/Asesorias Chris/Matemáticas/`, zips de Álgebra I y II); la copia `projects/cantu-lessons/fuentes/udem/` (gitignored)
      ya no estaba y se rehízo (50 ficheros). CR-GW lo sabe para la ronda 2. **Desde ALG-03, cada encargo cita la guía de su tema.**
    - **12:08, la ronda 2 de CR-GW·16, publicada** (cantu-revisiones `3a068e6`; CR-GW `1c53660` y `93df2d0`, informe
      `docs/carriles/CR-GW/16.md` §6; galería md5 `c39d995b…`, 30 fotos nuevas): la 64, la 65 y la 66 en ALG-01·S3 y ALG-02·S1, S2
      y S3. CR-GW recomienda la 64 en ALG-01·S3, y la 65, la 66 y la 64 en ALG-02·S1, S2 y S3. ALG-01·S3 pasa de 60 palabras (77 a 80).
      **Espera su voto.** Con él: CR-GW entrega a `_scratch/CR-GW/entregas/16/`, un encargo nuevo de CR-LW, y la cabina registra en
      `docs/BLOQUES-PROVISIONALES.md` las etiquetas de las que ganen (y quita `anatomia-de-una-expresion` de ALG-02 si no gana).
    - **12:09, «Ventaja», por ahora** (veredicto y encargo en cantu-lessons `103eac8`): es el nombre provisional de la ruta
      complementaria; lo sigue analizando. **CR-PL·35** (`docs/carriles/CR-PL/35-encargo.md`, enviado a las 12:14): el nombre que se ve
      en `servidor/portada.js` (el valor interno `complementaria` no cambia) y los tres avisos falsos de álgebra (`conceptGrid` a
      29,2 px, `papeles.mjs:147`, números blancos sobre círculos). Al volver: integrar y publicar; cambia `servidor/`, así que en
      cada aparato «Sincronizar» y, si no se ve, «Reiniciar».
    - **12:09–12:16, su voto de la ronda 2** (cantu-revisiones `f4414da`; veredicto, adenda 2 a CR-GW·16 y tablero en cantu-lessons
      `2da95a2`). **ALG-01·S3, la 64:** CR-GW la entrega y luego CR-LW·19 la escribe (tesela «en el taller»). **ALG-02·S1, S2 y S3,
      tercera ronda** desde la 67, enviada a CR-GW a las 12:19:
      - S1, sobre la 65: las flechas, cada una a su parte y con su explicación;
      - S2, sobre la 64, en renglón: el «NO» en negritas, 9x^(2+2) tachado y tres formas de marcar el 3, el 6 y el 9;
      - S3, sobre la 64: una línea suave entre la ecuación y el procedimiento.

      La galería que CR-GW rehízo a las 12:13 (`e7609971…`, la 65 de S2 con la guía UDEM) **no se publica**: él votó la de las
      12:07, y la 65 no se cambia donde está. Vigilante rearmado (`b78nc9sas`).
    - **12:22, ALG-01·S3 entregada por CR-GW** (`_scratch/CR-GW/entregas/16/ALG-01-S3-error-comun-con-dos-pasos.json`, md5
      `d89af052…`; base comprobada con el sha256 del borrador vivo) y **encargada a CR-LW como CR-LW·19** (cantu-lessons `e36b95e`,
      enviada). Al volver: revisar, publicar la página de ALG-01, poner la tesela «ALG-01·S3» en «atendido» y comprobar que el 🚧
      quede en 0. El aviso de palabras (80 contra 60) es esperado.
    - **12:25, CR-LW·19 hecho y publicado:** `0d5d17b` y `6a3dff6` (borrador md5 `9b04391f…`, amarillo solo por el aviso de
      palabras; apuntado `ALG-01 S3 CR-GW V64`), subidos; página en cantu-revisiones `64bfc5a`. 🚧 en 0. Siguen CR-GW (la tercera
      ronda de ALG-02·S1–S3) y CR-PL·35.
    - **12:28, su «no» a la 65 de ALG-02·S2** (cantu-revisiones `b18b2a6`): la publicada, sin comentario. La ronda 3 de S2 sigue sobre
      la 64 y CR-GW lo sabe. Vigilante rearmado (`bymwqurvt`).
    - **12:41, CR-PL·35 integrado** (veredicto `f34e434`): «Ventaja» en la Galería (cantu-revisiones `69624bd`, probado en el 8795) y
      los tres avisos falsos de álgebra (cantu-lessons `9cac7d6` + `51ce9ab`, informe `docs/carriles/CR-PL/35.md`).
      `build.mjs --todas` recompiló las 60 piezas (12 min 44 s); al publicar no cambió ningún fichero, solo el manifiesto
      (`1808448`). Llega a cada aparato con «Sincronizar», y si no se ve, «Reiniciar». **Dudas de CR-PL, para el nombre
      definitivo:** el botón dice «Plegar la ventaja», y la otra sigue llamándose «Ruta esencial». La rama `cr-pl-35-ventaja`
      queda en los dos repos, ya integrada.
    - **12:51, la ronda 3 de CR-GW·16, publicada** (cantu-revisiones `60828c1`; CR-GW `0f76cd7`, informe §7; galería md5
      `d7cdccdf…`, 24 fotos nuevas): la 67, la 68 y la 69 en ALG-02·S1, S2 y S3. CR-GW recomienda la 68 en S1, y la 67 en S2 y en S3.
      **Espera su voto.** Con él: CR-GW entrega, un encargo nuevo de CR-LW, y la cabina registra en `docs/BLOQUES-PROVISIONALES.md`
      las etiquetas de las que ganen (termino-desglosado, tabla-por-numero-de-terminos, semejantes-en-recuadro,
      paso-a-paso-suma-de-polinomios).
    - **13:02–13:05, su voto de la ronda 3 (en Laptop-Chris, cantu-revisiones `c24375c`) y el siguiente batch** (veredicto y adenda 3
      en cantu-lessons `a503d2a`). ALG-02·S1 **la 68** y S3 **la 67**: CR-GW las entrega y después las escribe CR-LW·20. S2, a
      una **cuarta ronda** desde la 70 sobre la 67: el «2 + 2» y la x se tachan con dos líneas separadas, «más orgánicas». Enviada
      a CR-GW a las 13:07. **Pidió el siguiente batch de álgebra, por bloque (4 a 6 lecciones).** La cabina le llevó el temario
      (`temario/algebra-plan.json`: 72 lecciones en 13 bloques) y recomienda **ALG-03 a ALG-06**, que cierran el bloque 1
      «Expresiones», con la guía 02 de la UDEM. Después, el bloque 2 (ALG-07 a ALG-14, 8 esenciales) en dos batches de 4.
      **Espera su elección.** ALG-06 es la primera de ventaja de álgebra: con ella, a CR-PL la duda 3 de RW-88.
    - **13:08, el batch: «Vamos con 03 a 06 y cuando ese quedé pedimos bloque 2 entero»** (veredicto y encargos en cantu-lessons
      `d7a23bc`).
      - **RW-90** (`docs/encargos/REVISION-WEB-TICKETS.md`, al final): un taller escribe ALG-03 a ALG-06 directo al borrador, con el
        método de RW-89, las decisiones de ALG-01 y ALG-02 y la guía 02 de la UDEM. Va en la sesión anidada `local_fbba3ef2-0c4d-4673-b876-dfc0d2971f01`
        (`rw-90-alg-03-06`), lanzada a las 13:12. Avisa al terminar cada lección; la cabina publica cada página y pasa la lección
        a **CR-GW·17**, la primera ronda con tres variantes por sección y la versión del taller plegada como «hoy». Ese encargo
        todavía no está escrito.
      - **CR-PL·36** (`docs/carriles/CR-PL/36-encargo.md`, enviado a las 13:12): el catálogo y la Galería, con las de ventaja de
        álgebra intercaladas (RW-88, duda 3).
      - **Cuando el batch 1 quede:** el bloque 2 entero (ALG-07 a ALG-14, 8 lecciones) en un solo batch, como pidió.
    - **13:13, ALG-02·S1 (la 68) y S3 (la 67) entregadas por CR-GW** (`_scratch/CR-GW/entregas/16/`, md5 `cb5a419b…` y `94a41bdd…`)
      y **encargadas a CR-LW·20** (cantu-lessons `31a3554`, enviado). En el mismo commit, la cabina registró en
      `docs/BLOQUES-PROVISIONALES.md` `termino-desglosado`, `tabla-por-numero-de-terminos` y `paso-a-paso-suma-de-polinomios`, y dejó
      `anatomia-de-una-expresion` como «sustituido». `semejantes-en-recuadro` (S2) espera la ronda 4. Al volver CR-LW: publicar
      ALG-02 y comprobar que el 🚧 quede en 0.
    - **13:16, CR-LW·20 hecho y publicado:** `e93249a` y `3a81142` (borrador md5 `86745d86…`, 19 bloques, amarillo solo por los
      avisos a propósito de `termino-desglosado`), subidos; página en cantu-revisiones `60169a1`. 🚧 en 0. «Literal» sigue en S2
      (bloques 10 a 12) hasta que se escriba la ronda 4.
    - **13:25, CR-PL·36 integrado** (cantu-lessons `bbd6685`, cantu-revisiones `ea21706`, en avance rápido; informe `CR-PL/36.md`):
      `INTERCALADAS = {ALG}` en el catálogo; en la Galería, álgebra va en una sola tabla con la pastilla «de ventaja». Aritmética
      sigue igual (probado en el 8795). No hay que recompilar. **Pendiente, sin encargo:** que algo compruebe que el orden de
      álgebra en `codigos.json` es el `orden` del temario (CR-PL·36, §6).
    - **13:26, la ronda 4 de ALG-02·S2, publicada** (CR-GW·16 §8, cantu-lessons `81215dc`; galería en cantu-revisiones `4e4b284`):
      la 70, la 71 y la 72, la 67 con la x y el 2+2 tachados aparte, a mano. CR-GW recomienda la 70. **Espera el voto.** Con él:
      la elegida a CR-LW·21, y `semejantes-en-recuadro` a `docs/BLOQUES-PROVISIONALES.md`.
    - **13:26–13:30, ALG-03 de RW-90** (`a98fd53`, md5 `559eee90…`): revisada, con sus dos etiquetas registradas (`24b882c`), recompilada
      en verde y publicada (cantu-revisiones `95d4182`). Las cinco teselas, «en el taller · CR-GW·17» (`ef1ab60`).
      - **CR-GW·17** (`docs/carriles/CR-GW/17-encargo.md`, `eb06d6a`, enviado a las 13:29): la primera ronda del batch, lección por
        lección, con tres variantes por sección (ALG-03: la 73 a la 75) y «hoy» plegado. **ALG-04, ALG-05 y ALG-06 le van en adendas**
        cuando RW-90 avise de cada una: revisar, registrar sus etiquetas, recompilar, publicar, teselas y adenda.
    - **13:34–13:37, ALG-04 de RW-90** (`906058c`, md5 `d0e492c5…`, 721 palabras): revisada, `escala-de-letra` registrada (`1b0c3ea`),
      verde y publicada (cantu-revisiones `9744822`); CR-GW·17 adenda 1 (`139e2e8`, la 76 a la 78) y teselas (`b0cbfe4`). Su texto
      nombraba «ARI-04» y «ARI-16»: dicho a CR-GW·17 y a RW-90.
    - **13:39, RW-90 paró en ALG-05 por el largo** (802 palabras; 378 sin fórmulas). La cabina la dejó entera (13:40): el plan
      la trae como una lección. El corte (a) S1+S2 / (b) S3+S4+EG queda en el veredicto por si el operador la quiere en dos.
      Guarda nueva para ALG-06: ~450 palabras de prosa sin fórmulas u ~8 000 px.
    - **13:41–13:43, ALG-05** (`7f5b039`, md5 `f05586af…`): revisada, `escala-de-letra` registrada (`5cc57c6`), verde y publicada
      (cantu-revisiones `4d6a231`); CR-GW·17 adenda 2 (`5391d32`, la 79 a la 81) y teselas. Falta ALG-06 de RW-90.
    - **13:44–13:47, ALG-06, la primera de ventaja** (`c894da5`, md5 `7f8f6f95…`): revisada, `escala-de-letra` registrada (`c45c51f`),
      verde y publicada (cantu-revisiones `e101ed9`); en el 8795, en su sitio con «de ventaja». CR-GW·17 adenda 3 (`6bb6acc`, la 82 a
      la 84) y teselas. **RW-90 terminó las cuatro; falta su informe** (`docs/informes/RW-90.md`): revisarlo, empujarlo y archivar el
      taller. **El batch «queda» cuando el operador vote las rondas de CR-GW·17**; entonces, el bloque 2 entero (ALG-07 a ALG-14).
      - 13:47: RW-90 pasó el dinero de ALG-06 a «$» (`d3c682e`, regla 36.1); republicada (cantu-revisiones `18bd063`) y nota al pie
        de la adenda 3 (`7876350`). El mensaje a CR-GW no salió: la app pausa los mensajes entre sesiones tras 10 sin que el
        operador escriba aquí. CR-GW lo ve en el encargo; repetírselo cuando el operador escriba.
    - **13:40–13:47, votos en Laptop-Chris** (cantu-revisiones `d97000e` y `1c9acb4`; veredicto y adendas en cantu-lessons `a189363` y
      `03bd6aa`):
      - **ALG-02·S2, la 71** («sí»). CR-GW·16, adenda 4: la entrega. Después, CR-LW·21 y el registro de `semejantes-en-recuadro`.
        Tesela «CR-GW·16 y CR-LW·21». **CR-LW·21 todavía no está escrito.**
      - **Votó el «hoy» de ALG-03 y ALG-04.** «sí»: ALG-03 AP, S2 y EG, y ALG-04 AP y EG. «meh»: ALG-03 S1 y S3, y ALG-04 S1 a S4.
        CR-GW·17, adenda 4: solo las «meh» van a tres variantes. ALG-05 y ALG-06 esperan su voto del «hoy». Teselas al día.
      - **Dos reglas nuevas, para TALLER-COMUN v11 antes del bloque 2:** la «Tabla» solo para listas de reglas, y un procedimiento
        por partes en la lámina gris, con recuadros por paso. Además, «antes del paréntesis» y no «delante»; y ½x, no x/2.
      - **Pregunta abierta:** ¿se cambia el título de ALG-03 (temario) a «antes del paréntesis»?
      - **RW-90 terminó:** informe en `1297396`, revisado y empujado. Falta archivar su sesión.
      - **Los mensajes a CR-GW (adendas 3·nota y 4, y CR-GW·16 adenda 4) no salieron**, por la pausa de la app. Mandarlos en
        cuanto el operador escriba.
    - **13:48–13:52, el operador vota ALG-05 y ALG-06 (casi todo «mismo feedback que…»), dice «si cmabialo» al título de ALG-03 y
      pide arreglar los comentarios repetidos por tandas en las seis, con aritmética de referencia** (veredicto y encargos en
      cantu-lessons `1a2f971`).
      - **RW-91** (`REVISION-WEB-TICKETS.md`, al final), lanzado a las 13:58 como sesión `local_6c0ebd26-e60c-4a0b-b8c7-2e34bb874311`
        (`rw-91-tandas-algebra`):
        - primero, la revisión contra aritmética;
        - después, las tandas 1 (las palabras y el título de ALG-03), 2 (la tabla), 3 (la lámina gris) y 5 (lo de aritmética);
        - la 71 de ALG-02·S2, que ya no va a CR-LW·21 (CR-LW·21 no se escribe);
        - y la tanda 4 con la elegida de CR-GW·17.
        Avisa por tanda. **En cada aviso:** revisar, registrar sus etiquetas, publicar y avisar al operador para que vuelva a votar.
      - **CR-GW** (mensaje enviado a las 13:57): primero la entrega de la 71 (adenda 4 de CR-GW·16). Después, CR-GW·17 adenda 5:
        solo tres variantes de ALG-03·S1 (la 73 a la 75). Lo demás de CR-GW·17, cancelado.
      - **Teselas:** las quince «meh» de ALG-02 a ALG-06 dicen «en el taller · RW-91».
    - **14:01–14:07, la entrega de la 71 y la tanda 1 de RW-91.**
      - CR-GW entregó la 71 de ALG-02·S2 (`_scratch/CR-GW/entregas/16/ALG-02-S2-tachado-con-ola.json`, md5 `2d9f39d6…`; bloques
        9–12 → 3). Cuadra con el vivo. La cabina registró `semejantes-en-recuadro` (cantu-lessons `46012ef`) y se la pasó a RW-91.
      - La tanda 1 de RW-91 (`83bdbab`: «antes», el título de ALG-03 en el borrador, la identidad, el `.docx` y el plan, y ALG-04 sin
        códigos de lección) está revisada y empujada. Nota del veredicto y tesela de ALG-02·S2 en `f0969c5`.
      - **Falta publicar la tanda 1** (ALG-03, ALG-04 y ALG-05). Se espera el aviso de RW-91: está en la tanda 2 y tiene ALG-04 y
        ALG-06 abiertos en el checkout, así que compilar ahora mezclaría su trabajo a medias. Ya se le pidió que diga en cada aviso si
        terminó de compilar.
      - CR-GW sigue con la 73 a la 75 de ALG-03·S1.
    - **14:10, la tanda 1, publicada** (aviso de RW-91 a las 14:07). ALG-03 y ALG-05 en 🟢 (cantu-revisiones `10b7afd`).
      - ALG-04 sale con la tanda 2, porque RW-91 lo tiene abierto.
      - El «hoy» no se vota todavía: se vota cuando cada lección tenga sus tandas.
    - **14:12, la tanda 2 (`0ca5640`), revisada y empujada.**
      - Las tablas de ALG-04·S1 y S4 y de ALG-06·S1 pasan a fichas en la losa gris. Las cuentas están bien.
      - Sus tres etiquetas `fichas-*` ya tienen fila en BLOQUES (`e990a6d`).
      - ALG-06 da 🟢. ALG-04 da 🟡 (S1, 102 palabras de prosa, por encima de 60): se le pidió a RW-91 que lo recorte. **Sin
        publicar** hasta su aviso con fotos.
      - 14:15: llegó el aviso de la tanda 2 (se cruzó con el de la cabina). Fotos vistas.
        - La x recta en «2x + 14» es de la foto, que se tomó antes de que cargara KaTeX_Math-BoldItalic; en la página sale en cursiva.
        - RW-91 ya está en la tanda 3, con ALG-03 a ALG-06 abiertas y recompiladas a las 14:13. **ALG-04 y ALG-06 se publican con la
          tanda 3**, las cuatro juntas.
    - **14:17–14:28, la tanda 3, la 71 y CR-GW·17** (veredicto en cantu-lessons `b7908a2`).
      - La tanda 3 de RW-91 (`098403f`) pasa siete cadenas al paso a paso de la lámina gris. Las 10 etiquetas de las tandas 2 y 3 ya
        tienen fila en BLOQUES (`e990a6d`, `04181b0`).
      - Publicadas: ALG-03, ALG-05 y ALG-06 en 🟢 (cantu-revisiones `f611b28`), y ALG-02 con la 71 (`3b0b634`; RW-91 la escribió en
        `ae62117`, igual que la entrega). El 🟡 de ALG-02 es el de siempre, la escala de S1.
      - **ALG-04, sin publicar:** S1 da 102 palabras de prosa (tope 60). Se le pidió a RW-91 que lo recorte; está en su cola.
      - **CR-GW·17** (`d4a33c3`): la 73, la 74 y la 75 de ALG-03·S1, en la galería CR-GW (cantu-revisiones `a57faa0`), probadas en el
        8795. **Le toca votar al operador.** Con la elegida: registrar `signo-antes-del-parentesis` y pasársela a RW-91 para la tanda 4
        (ALG-03·S1, ALG-05·S1 y S3, ALG-06·S2).
      - RW-91 sigue con la tanda 5 (lo de aritmética).
    - **14:34, la tanda 5** (`db3f579`): la nota «Error común», con su contexto y la cuenta buena en grande, en ALG-04·S2, ALG-05·S2 y
      ALG-06·S3. Publicadas ALG-05 y ALG-06 en 🟢 (cantu-revisiones `bc9fb41`). ALG-04 sigue esperando el recorte de S1. RW-91 escribe el
      informe, con tres preguntas: × o ·, «costo variable» y el tachado diagonal de ARI-16.
    - **14:35–14:43, la jerarquía visual y la pregunta del flujo** (veredicto en cantu-lessons `329d094` y `806705f`).
      - El operador votó «meh» la 73, pasó la 71 de «sí» a «meh» y votó «no» la 74 y la 75. Pide jerarquía visual: el área gris
        de aritmética para la explicación y el procedimiento, «en general».
      - **CR-GW·17, adenda 6:** la 85 a la 87 sobre la 73 y la 71, en ALG-03·S1 y ALG-02·S2 a la vez. La elegida la escribe RW-91,
        y después hace la tanda 4.
      - ALG-04 se publicó en 🟡 con las tres frases de S1 (cantu-revisiones `ae51e77`; cantu-lessons `dcd8dbb`). El recorte
        `a1037d8` se deshizo porque los mensajes de la cabina se cruzaron. El informe de RW-91 está empujado.
      - **El operador preguntó cómo acelerar el flujo** (14:38). El diagnóstico va en el chat. **Pendiente: qué adopta.**
    - **14:54, la 85 a la 87, publicadas** (cantu-revisiones `7285a36`; informe en cantu-lessons `b98f050`):
      - la 85: la cuenta en la losa gris;
      - la 86: la cuenta y la leyenda en la lámina gris;
      - la 87: una ficha con rótulo.

      Cada una va en ALG-03·S1 y ALG-02·S2. **Esperan su voto.** Con la elegida, RW-91 escribe las dos secciones y hace la tanda 4.
    - **15:03–15:07, la 86 en las dos secciones** (veredicto y adenda 7 en cantu-lessons `cdad5ca` y `ccb7f1d`).
      - El operador pidió leer también lo que dijo de las rechazadas. La regla queda así:
        - la 86, cuando la sección explica una sola cosa;
        - la 87 (ficha con rótulo), cuando tiene varios casos;
        - la 85, para un procedimiento largo.
        Va a TALLER-COMUN v11.
      - **CR-GW** hace tres entregas: la 86 de ALG-02·S2, la de ALG-03·S1 y la pieza de la 87.
      - **RW-91** escribe la 86 en las dos secciones y después la tanda 4 con la 87: ALG-05·S1 y S3 y ALG-06·S2 tienen dos casos cada
        una.
      - **Sigue pendiente qué adopta el operador del flujo** (la pregunta de las 14:38). **Resuelto a las 15:07: los cuatro.**
    - **15:07, el flujo nuevo: el operador aprueba los cuatro cambios** («Primero las piezas, después las lecciones … probemos que
      tal jalan»). Su matiz: las piezas salen de verlas aplicadas, así que la ronda de pieza se abre en cuanto aparece el comentario.
      - **Escrito:** TALLER-COMUN v11, con la sección 9 y los puntos 18 a 22 (cantu-lessons `a57ba54`), y en el CLAUDE.md de la cabina
        «El flujo de trabajo v11».
      - **CR-GW·18 en marcha:** el catálogo de piezas en `docs/referencias/piezas/` (la 86, la 87, la 85, la 67, el tachado y `.fa-r`),
        con su comprobación y el censo del tachado en diagonal de aritmética. CR-GW es ya el carril de piezas; su siguiente número,
        el 91.
      - **RW-91, adenda 1 (tanda 6) en marcha:** la 87 en ALG-04·S1 y S4 y en ALG-06·S1; después, la ronda ligera de ALG-06·EG (la 88 a
        la 90), sobre una copia de la galería CR-GW que publica la cabina. La elegida la escribe RW-91.
      - **El bloque 2 (ALG-07 a ALG-14), en dos carriles, cada uno en su worktree:** el encargo se escribe cuando el catálogo esté.
      - **Publicadas:**
        - la 86, en ALG-02·S2 (15:11, cantu-revisiones `58e4e47`) y en ALG-03·S1 (15:13, `83f6bb7`);
        - la 87, en ALG-05·S1 y S3 y en ALG-06·S2 (15:18, `c99b234`).

        Etiquetas registradas: `signo-antes-del-parentesis` y las tres `casos-…`.
      - **15:11, el operador preguntó por el estado de ALG-02.** Su laptop tenía la copia de las 15:04: con una declaración más vieja
        que su voto, la tesela sale «sin encargo». Desde ahora, tras cada voto la declaración va primero. Para CR-PL queda una
        propuesta: «recién votada» en vez de «sin encargo».
      - **15:29, RW-91 tanda 6, paso 1** (`e6afca9`): la 87 en ALG-04·S1 y S4 (tres fichas, una debajo de la otra; ALG-04 pasa de 6289 a ~7990 px a 1366) y en ALG-06·S1 (dos, en paralelo). Etiquetas `casos-sustituir-tres-valores`, `casos-partir-un-segmento` y `casos-perimetro-y-area` registradas; las `fichas-…` de la tanda 2, marcadas como sustituidas (`5f4d808`). Publicadas a las 15:31 (cantu-revisiones `c0d8fca`). Sigue la ronda ligera de ALG-06·EG (la 88 a la 90).
      - **15:32, «recién votada», como regla:** el operador dijo que sí, y que no fuera un arreglo a mano de este caso. **CR-PL·37 encargado** (cantu-lessons `533e4ff`): la plataforma dice sola «recién votada» mientras el aparato no tenga noticias de la cabina de después del voto, y «sin encargo» en rojo solo pasado el margen. El flujo v11 de la cabina lo dice (CLAUDE.md): ese margen es nuestro plazo para declarar.
      - **15:40, la ronda ligera de ALG-06·EG, publicada** (la 88 a la 90; cantu-revisiones `d16ccef`; RW-91 informe `efd66b1`): unos 11 min desde el paso 1, contra 37 de antes. Al probarla salió que un «meh» del «hoy» deja la sección en «Esperando variantes» aunque la página ya cambió: 12 secciones (ALG-03·S3, ALG-04·S1–S4, ALG-05·S1–S4, ALG-06·S1–S3). **CR-PL·38 encargado, después de la 37** (`89b626a`): vuelven solas a «Por votar». Mientras, el operador las vota en su «hoy». (apuntado a las 15:41)
      - **15:45, CR-GW·18 terminado** (`61eb47a`): el catálogo `docs/referencias/piezas/`, seis piezas (lamina-86, ficha-87, losa-85, paso-a-paso-67, tachado-de-la-casa, recuadro-de-lo-que-se-opera), 144 fotos iguales a lo votado; censo del tachado en diagonal de aritmética: solo ARI-16·S7 (web y slide), copiado sin uso en S5 y S6. **CR-GW·19 encargado** (`f49e04d`): ronda de pieza del despeje, la 91 a la 93, antes del bloque 2. **RW-92 y RW-93 preparados sin lanzar** (`e2f4889`): el bloque 2 en dos carriles con worktree; se lanzan cuando el operador lo pida (su «cuando ese quedé» de las 13:08). Al lanzarlos: las altas de ALG-07–14 en `codigos.json` primero (la cabina). (apuntado a las 15:48)
      - **CR-PL·37 integrado** (cantu-revisiones `6a7725c` ff; cantu-lessons `f24b341`, cherry-pick de `4d2bc6f`): «recién votada» en gris mientras el HEAD de cantu-lessons del aparato sea de antes del voto + 10 min (`MARGEN_RECIEN_VOTADA`); banco 106/106. Probado en el 8795: la leyenda sale, sin errores. Al operador: Sincronizar y después Reiniciar (plataforma.mjs es del servidor). CR-PL sigue con la 38. (apuntado a las 15:50)
      - **CR-PL·38 integrado** (cantu-revisiones `831a775` ff, 16:02; cantu-lessons `def22f4` ff): un ~ o ✗ de «Hoy» con `ver:` de antes de la página del aparato vuelve a «● Por votar», con el voto viejo aparte en la vista «Hoy» (franja amarilla, botones sin marcar, el comentario en su caja). No entra en las webs. Probado en el 8795 con los votos de verdad: «Cambió después de tu voto» en las 12 de la lista y en ninguna otra tesela de las 35 lecciones; sin errores. Para «Sí», nada (la revisión de la Lección ya lo atrapa). **Su límite (informe §6.2):** compara la fecha de la página entera, así que recompilar una lección por otra sección, o un `--todas`, reabre todos los ~ pendientes. **CR-PL·39 encargado** (cantu-lessons `fea62a5`): guardar al votar la huella de la sección (`pz.partes`, CR-PL·08) y comparar huellas. Hasta que llegue, al recompilar una lección con ~ sin atender, mirar si sale un «Por votar» falso. (apuntado a las 16:08)
      - **16:10–16:19, votos de la laptop y dos mensajes del operador** (veredicto, cantu-lessons `d592d72`): (1) **los tamaños de letra, error sistemático** («tiende a poner tamaños de letra gigante en procedimientos … el tamaño de letra de la tarjeta de pasos esat bien … encontrar estandares de tamaño»); la cabina midió a 1366 las 35 webs: `.pap` 29,1 px; `.jv-losa` (86/87) **35 px** en 8 secciones de álgebra; `.cad` 29,1 en 7; aritmética casi toda 24,3 con ~10 secciones sueltas (ARI-08·S3 hasta 46 px). Causa: la regla 38 deja «a conciencia» y el punto 22 decía «la cuenta, en grande». (2) **variantes nuevas, no una vieja actualizada**, y el comentario viejo seguía en la caja. **Hecho:** TALLER-COMUN v12 (§9.2 variantes nuevas tras un ~; punto 23, tope 29,1 px; el 22 sin «en grande»), **CR-GW·20** (censo con foto + ronda de tres normas, la 94–96; `ff0ea4a`), **RW-91 adenda 2** (escribe la 88 de ALG-06·EG; rondas de ALG-04·S3, 97–99, y S4, 100–102), **CR-PL·39 adenda 1** (la caja del comentario vacía si la sección cambió), RW-92/93 sin «arreglo directo», tablero declarado (8 secciones esperan la norma; ALG-05·S2 y S4 ✓). **Publicada la ronda del despeje** (CR-GW·19, 91–93; cantu-revisiones `bc1f9bd`). **El bloque 2 espera** la norma y el despeje. (apuntado a las 16:26)
      - **CR-PL·39 integrado** (cantu-revisiones `7d1d663`, cantu-lessons `d018ac5`, cherry-picks; push 16:31): huella:<s> al votar; los votos viejos buscan la suya en `servidor/.partes-vistas.json` (por aparato, gitignored) y si no, la fecha. En la PC sembré a mano la de ALG-06 15:30 (solo cambió EG con la 88) y quedan 0 teselas «cambió». **La ALG-06 con la 88 (RW-91 `2d6764e`, ya empujado) se publica cuando la laptop haya sincronizado y reiniciado con la 39**, para que guarde antes las huellas de 15:30. Pendiente: la adenda 1 de la 39 (la caja del comentario vacía), y proponer a CR-PL la misma vuelta para «Aprobar» (apr-partes; un --todas devuelve 19 ✓ de ARI). (apuntado a las 16:32)
      - **La «w» es de ALG-04·S2:** el comentario se guardó en S3, pero la «w» solo está en S2 (medido). La ronda 97–99 va en S2 (corrección de la adenda 2, `8b75fe7`); S3, a la pregunta del operador. **Publicada la ronda de ALG-04·S4** (100–102; cantu-revisiones `2fc3c90`, 16:34; probada en el 8795). La ALG-06 con la 88 sigue sin publicar hasta que la laptop sincronice y reinicie con la 39. (apuntado a las 16:34)
      - **CR-PL·39, adenda 1, integrada** (cantu-revisiones `7ac5a07`, cantu-lessons `792e196`, cherry-picks; push 16:37): si la sección cambió tras el voto, la caja del comentario de «Hoy» empieza vacía (lo escrito va a `c-nuevo:<s>:V0`; al votar, el viejo pasa a `c-antes:<s>:<ver>`), y el viejo se lee en el aviso. Probado en el 8795: sin errores y caja normal sin cambio. No arregla para atrás los cuatro ~ con comentario viejo (esperan CR-GW·20). (apuntado a las 16:37)
      - **Publicada la ronda de la «w», ALG-04·S2, la 97 a la 99** (RW-91 tanda 7; cantu-revisiones `37b4ed1`, tablero `010438f`; solo suma, probada en el 8795). RW-91 sigue con la 88 de ALG-06·EG; CR-GW·20, con la norma (94–96). (apuntado a las 16:41)
      - **16:49, ALG-04·S3 se queda** («Se queda así, me gusta como se ve en genearl y en tamaños»; tablero atendido; medido: su cadena va a 29,1, la de la tarjeta). **Publicada la ronda de la norma de tamaños, la 94 a la 96** (CR-GW·20; cantu-revisiones `a90ed12`, informe `5dd1c2a`, tablero `cbf9bfd`): 94 por pieza (procedimiento 24,3, lo corto 29,2; la recomienda CR-GW), 95 todo 29,2 y lo corto 35, 96 por renglones (≤3 a 29,2, 4+ a 24,3); la tarjeta, 29,1 en las tres. Dos preguntas al operador: ARI-07·S1/S2 a 29,1 o a 35 (la 53 «al nivel 3»), y las letras del Venn (ARI-28·S3/S4 a 31,7, ARI-29·S1/EG a 29,9; las normas las dejan hasta 29,2). Tras el voto: DISEÑO 38 v84 (cabina), catálogo (CR-GW), guarda (CR-PL), RW-91 adenda 3 y un taller en aritmética. (apuntado a las 16:50)
      - **16:50, votos de la laptop en CR-GW** (cantu-revisiones `354aec3`): la 97 ✓ (ALG-04·S2); la 100 ~ (negrita en todo el procedimiento; la tercera leyenda más arriba); la 91 ~ (alinear a la izquierda dentro del bloque, no en el «=»: la regla 21.3, «ya lo hemos mencionado muchas veces»). **Y un mensaje:** en ALG-06·S1 la leyenda explica en texto lo que harían unas flechas; «revisa y aplica en todas las secciones de procedimientos». **Hecho** (cantu-lessons `8e25fc4`): TALLER-COMUN **v13** (puntos 24 negrita, 25 alineación, 26 flechas y recuadros), **CR-GW·21** (censo de flechas y recuadros en aritmética y álgebra + ronda 109–111 en ALG-06·S1; despeje 106–108; lista de bloques alineados en el «=»), **RW-91 adenda 3** (escribe la 97 sin publicar; ronda de ALG-04·S4, 103–105). La aplicación de la norma pasa a la **adenda 4** de RW-91, en una sola pasada con negrita, alineación y flechas. La norma (94–96) **sigue por votar**: sus fotos llevan negrita, se miran por el tamaño. ALG-04 (la 97) se publica con la ALG-06 de la 88 cuando la laptop corra la 39. Vigilante rearmado (`bfprt4d24`). (apuntado a las 16:56)
      - **17:01, la norma: la 94 ✓** (cantu-revisiones `6601f82`) → **DISEÑO v84**, regla 38 (procedimiento 24,3, lo corto 29,2, tarjeta 29,1, nada pasa de 29,2, sin «a conciencia»); TALLER-COMUN punto 23 la cita. CR-GW pasa la 94 al catálogo tras sus rondas de la 21. **Dos mensajes del operador (~17:00 y ~17:05, veredicto):** (1) los defectos sistemáticos son de diseño → **CARRILES v4**, carriles nuevos **CR-DW** (sistema de diseño web; `local_953c9fc5-9326-4564-9bb4-80ebbb8564da`) y **CR-DS** (slide, con anclajes; `local_23be0e95-81f8-470c-92fd-9703e1d260c2`), encargos `docs/carriles/CR-D?/01-encargo.md`: diagnóstico por partes y luego propuesta `docs/referencias/SISTEMA-DE-DISENO-*.md`; el bloque 2 (RW-92/93) espera al sistema. (2) un botón en la portada para los votos de sistema pendientes → **CR-PL·40** (encargo `docs/carriles/CR-PL/40-encargo.md`). La guarda de la 94 va en un encargo de CR-PL aparte, después. Commit cantu-lessons `86326ab`. Vigilante rearmado. (apuntado a las 17:07)
      - **Publicado el despeje, ronda 2: la 106 a la 108** (CR-GW·21; cantu-revisiones `6d06ac7`, md5 b6dc9137…; solo cambia la vista PIEZA-DESPEJE, la ronda 1 plegada; probada en el 8795). CR-GW sigue con las flechas (109–111). CR-DW y CR-DS confirmaron la lectura y empezaron la fase 1. (apuntado a las 17:09)
      - **17:11–17:12, el operador: cada regla con ejemplos (foto) en una galería de reglas web y slide, con sus excepciones, y más de un ejemplo cuando haga falta** («si es una biblia de texto largo será difícil de verificar») → adenda 1 de CR-DW·01 y CR-DS·01 (`galerias/REGLAS-WEB/` y `REGLAS-SLIDE/`, una vista por regla, que se vota; el .md queda en tokens + índice) y adenda 1 de CR-PL·40 (entradas «Reglas web» y «Reglas slide» en la portada; sus pendientes, en el botón). cantu-lessons `bf5d191`. RW-91 terminó la ronda de ALG-04·S4 (103–105, informe `cfd3484`): falta su aviso con ruta y md5 para publicarla. (apuntado a las 17:13)
      - **CR-PL·40 integrado** (cantu-revisiones `d3e16be`, cantu-lessons `0b7e468`, cherry-picks; probado en el 8795): «Votos de sistema (n)» en la barra del inicio, apagado sin pendientes; ronda de sistema = clave `PIEZA-` o `"ronda": "pieza"` en el CAT (pedirlo en los encargos). Su adenda 1 (Reglas web/slide en la portada) va en camino. **Pregunta al operador (de CR-DS):** ¿el anclaje de hoy sustituye a la 4 de ARI-07·D2 (cada escena centrada por su cuenta, 6-nov 14:49) o ARI-07 queda como excepción? CR-DW entregó la parte 1 (inventario, `d64271b`, ya en origin): falta su aviso. (apuntado a las 17:20)
      - **CR-DW·01 parte 1** (inventario, `d64271b`): la causa de la cuenta en el «=» y a 35 en álgebra era el molde `LOTE-1-GUIONES-WEB` §10 punto 7, que TALLER-COMUN y LOTE-2 mandan leer; ningún encargo de álgebra citó la 21.3. **Corregido** (cantu-lessons `1b2a0da`): el punto 7 (y 9, 10) del molde y TALLER-COMUN §2 (DISEÑO v84; si un lote choca, mandan DISEÑO y los puntos 23–26). 388 decisiones de diseño en el veredicto, 123 de sistema sin regla. Avisados CR-DW (sigue la parte 2), CR-DS (revisa LOTE-2-SLIDES) y RW-91. (apuntado a las 17:21)
      - **Publicadas las flechas, la 109 a la 111** (CR-GW·21; cantu-revisiones `155b700`) **y ALG-04·S4 ronda 2, la 103 a la 105** (RW-91 tanda 8; armada sobre `d3e16be`, la cabina la juntó vista por vista encima de las flechas: `05e29b7`; probadas en el 8795). Tablero y veredicto en cantu-lessons `a2048d9`, con los commits de CR-DW (partes 2 y 3), CR-DS (parte 1) y CR-GW·21 (adenda: la 94 en el catálogo). **LOTE-2 queda solo para la mecánica** (aviso en sus dos ficheros y en TALLER-COMUN §2): el informe de otro taller no es instrucción. CR-DW parte 3: ARI-02 y ARI-03, aprobadas, también alinean en el «=» (22 listas más en aritmética); va al taller de aritmética de la pasada. Por votar: flechas, ALG-04·S4 y despeje 106–108. (apuntado a las 17:28)
      - **CR-DW cierra la fase 1** (parte 4, formatos: `9b3b33f`, `509e5a8`; veredicto y push `97af74f`): 16 formatos sin una tabla que los junte; la `la-e` (43 fórmulas anotadas de aritmética), la flecha con su operación, la Anatomía y el lado a lado no están en el catálogo → **encargo pendiente a CR-GW para darlas de alta**. Fase 2 adelante (REGLAS-WEB por dimensión: letra, alineación y énfasis primero). Lectura del punto 22: rige lo que se trabaja; una igualdad que enuncia va centrada en el blanco (excepción con foto). **Números: CR-DW 120–149, CR-DS 150–179, 112–119 para CR-GW y RW-91.** El aviso a CR-DS de sus números no salió (tope de 10 mensajes sin que el operador escriba); está en el veredicto, 17:30. (apuntado a las 17:30)
      - **LOTE-1-MONTAJE lleva el mismo aviso que LOTE-2** (solo mecánica; su §3.2 alineaba en el «=»), y el de LOTE-2 suma: moldes = mecánica, el paso a paso es la 67, «sin px» es la letra (CR-DW·01 §2.4, `4e0cf84`; cantu-lessons `068398b`). (apuntado a las 17:31)
      - **REGLAS-WEB publicada, entrega 1** (CR-DW; cantu-revisiones `efb4c96`: 8 reglas de letra, alineación y énfasis; opciones 120–121 negrita y 122–123 recuadro) y **CR-PL·40 adenda 1 integrada** (`80da656` ff, cantu-lessons `5680248`; «Reglas | web | slide» junto al título; votos de sistema = 10). Pendiente para CR-PL: «aprobada» en vez de «✓ por escribir» en reglas; a CR-DS: clave de regla sin código de lección. CR-DS partes 2 y 3 empujadas (`969cb0d`): el salto entre slides es el centrado de Studio (82/114 pares, hasta 286 px). Mensajes a los carriles pausados por la app hasta que el operador escriba. (apuntado a las 17:47)
      - **DISEÑO v85** (cantu-lessons `1e46daf`, TC §2 `5a8ff4e`): la anatomía (la 68 y la desglosada, aprobadas a 66,8) fuera del tope de 29,2 hasta el voto de REGLA-LETRA-NIVELES, y nadie la achica en la pasada; 21.6 y 21.10 nombran la cadena de la 29. CR-DS cerró la fase 1 (parte 4, `97c544d`). Vigilante rearmado (`b7svcigks`; la alarma de las 17:47 era la galería nueva, sin votos). (apuntado a las 17:49)
      - **18:00, el operador en la PC** («puedes sacar nuevas sesiones de ser necesario»; «el carril de RW 91 sigue vigente o lo archivamos ?»). **REGLAS-SLIDE publicada** (cantu-revisiones `2a8d6ec`, claves con prefijo REGLA-SLIDE- porque la misma clave juntaba las vistas de las dos galerías; votos de sistema = 12). **Encargos a carriles existentes** (cantu-lessons `59be709`): CR-LW·21 (pasada única de aritmética: fase 0 ya, escribe tras los votos), CR-GW·22 (la-e, Anatomía, lado a lado al catálogo), CR-PL·41 («aprobada», aviso de claves, guarda 94). Sin sesiones nuevas: el cuello son los votos de flechas, negrita y recuadro. RW-91 sigue (adenda 4 tras esos votos). CR-DW entrega 2 de REGLAS-WEB (formatos) en `208813b`, por publicar. Vigilante `blpna6kyu`. (apuntado a las 18:02)
      - **18:04–18:10, votos en la PC** (cantu-revisiones `8ae5210`, `2b93399`): **la 109** (flechas), **la 106** (despeje), **la 104** (ALG-04·S4); REGLAS-WEB entera: ✓ salvo FLECHAS ~ (descripción corta opcional), NEGRITA la 120, RECUADRO la 122; regla nueva **REGLA-ALINEACION-LEYENDAS** (leyendas de 2+ columnas a la misma altura). → tablero `6640c67`; **DISEÑO v86, regla 42** + TC 26 (`521dd4b`); **RW-91 adenda 4** (pasada única de álgebra + la 104, `6e5a220`); CR-LW·21 y CR-GW·22 adenda 1 (`7b24cab`); CR-PL·41 negrita; CR-DW: vista de LEYENDAS y matiz de FLECHAS. REGLAS-SLIDE entrega 2 publicada (`41d5999`, 150–165); en REGLAS-SLIDE no hay votos en la PC (CR-DS dijo que sí: preguntado al operador). Vigilante rearmado. (apuntado a las 18:15)
      - **18:13–18:27, votos de REGLAS-SLIDE en la PC** (cantu-revisiones `e49c78f`, `bd18175`): las 10 por votar; 7 de 8 la recomendada; **el anclaje: la 151 (centrado slide por slide), no la 150** → **DISEÑO v87, regla 43** + veredicto (cantu-lessons `26b3f68`); **pregunta abierta al operador:** centrar la caja común de la secuencia (sin brinco); nadie aplica el anclaje ni la guarda del salto hasta su respuesta. Comentario de la 159 → regla nueva pendiente **REGLA-SLIDE-ENFASIS-FOCO-PASO** (color o negrita con lo demás en gris); a CR-DS, 166–168. **Pedido de la portada** (ruta en columna, filtro Esencial · Ventaja · Ambas, agrupar por bloques) → **CR-PL·42** (`470b837`), en cola tras la 41. **REGLAS-WEB 2b publicada** (cantu-revisiones `69a05e4`; votos de sistema = 11). Vigilante `brfqrwoet`. (apuntado a las 18:38)
      - **CR-LW·21, fase 1 en marcha** (rama `cr-lw-21-pasada-unica`; ARI-22 `ccaa507`, plan §6 `fb29fed`; LEYENDAS falla en ARI-16·S2, S4 y ARI-15·S5, que arregla con subrejilla). Respuestas a su §4: ARI-12·S1 no se toca (tabla de primos); ARI-15·S5 y ARI-26·S1 al final, con las piezas del catálogo; ARI-16·S1 con leyenda corta solo si aporta; ARI-11·S7 solo se alinea. **CR-GW·22 adenda 2** (`ef7a9a3`): las flechas cruzadas de la regla de 3 (ARI-08·S3) y el brinco del punto (ARI-25·S2, si está aprobada). Empujado con ella el `104c022` de CR-DS (entrega 3 de REGLAS-SLIDE, 166–168), que falta publicar cuando avise. (apuntado a las 18:40)
      - **REGLAS-SLIDE, entrega 3 publicada** (cantu-revisiones `fb58ed7`, md5 e3e1e854…): la vista REGLA-SLIDE-ENFASIS-FOCO-PASO (166 color, la recomendada; 167 negrita con lo demás en gris; 168 una por lección), con foto real; probada en el 8795, sin fotos rotas ni scroll lateral. SISTEMA v1.2 en `104c022`. (apuntado a las 18:41)
      - **18:43, el anclaje decidido: «Centrado, sin brinco»** (el botón de la cabina). **DISEÑO v88**, regla 43 (cantu-lessons `de99c91`): toda la secuencia usa la caja de su paso más alto, centrada en el alto; lo que sigue no se mueve más de 2 px. A CR-DS: la vista a «ya decidida» y SISTEMA v1.3 con la medida de la guarda del salto; con eso, la cabina encarga la guarda a CR-PL (después de la 41 y la 42). Lo aplica CR-LS cuando se abra la pasada de las slides. (apuntado a las 18:44)
      - **18:44, voto en la laptop (LAPTOP-PF6SOUAS, cantu-revisiones `3f3a5fb`, traído a la PC por ff): REGLA-SLIDE-ENFASIS-FOCO-PASO, la 167 ✓** (negrita y tinta en lo que se trabaja, lo demás en gris; no la 166 recomendada). **DISEÑO v89** (cantu-lessons `07baf2c`): la 156 con su excepción; la 159 sigue, y su cruce con la 167 lo mide CR-DS (169–179 libres para una ronda ligera). A CR-DS: SISTEMA v1.3 con el anclaje, la 167 y las dos comprobaciones para CR-PL. Empujado con ella el `5473c8d` de CR-DW (SISTEMA-DE-DISENO-WEB v1). Vigilante `bvy07ondv`. (apuntado a las 18:46)
      - **18:49–18:51, votos de REGLAS-WEB 2b en la laptop** (cantu-revisiones `cb6afdf`): la 126 ✓ (flechas con descripción corta); **la 125 ✓, no la 124 recomendada: toda cuenta en bloque en su gris, también la que solo enuncia**; ✓ las nueve de formato. **DISEÑO v90**, regla 42 (cantu-lessons `9b8ce37`). La 125 va ya en las pasadas: avisados RW-91 y CR-LW (más las piezas del catálogo, `3e991af`); CR-GW, la NOTA de la lámina; CR-DW, galería con los votos + SISTEMA + comprobación de la 125. Empujados con ella `3e991af` (CR-GW·22 adenda 1: 109, 106, 122, 120, leyendas) y `4acae8f` (CR-DS entrega 4: el anclaje; SISTEMA v1.3 con las guardas del salto y de la 167): esperan su aviso para publicar o encargar. Vigilante `bk4c7jphh`. (apuntado a las 18:52)
      - **REGLAS-SLIDE entrega 4 publicada** (cantu-revisiones `5282fdd`; el anclaje «ya decidida», con maqueta; la 150 sale del CAT, su ✗ sigue en respuestas). PC traída a `cb6afdf` (votos web de la laptop). **CR-DS: ronda del cruce 159/167 con la 169–171** (A la 167 tal cual, recomendada; B negrita y color; C un dato con color nunca en gris). **CR-GW**: anatomía en 700 y 66,8 (ya es regla); **ronda PIEZA-LAMINA 112–114** (fórmula anotada, `.jv`, común); el despeje con el recuadro fino de la 67; el brinco de ARI-25·S2 se da de alta (V3 ✓ en RW-64). **RW-91**: la 67 nueva (la 120) en ALG-02, 03 y 05. **CR-PL·43** (`401fed3`): guardas del salto y G1 de la 167, en cola tras la 41 y la 42. Libres: 115–119, 172–179. (apuntado a las 18:55)
      - **CR-LW·21 y la 125:** censo de ~50 cuentas sueltas en 23 lecciones (`_scratch/CR-LW/21/125-censo.md`). A (31, `[…]` en un Texto de Studio → Bloque HTML con la lámina 86) y B (8, la banda `la-r` y la fórmula de ARI-02·S2) van en la pasada. **C: las tarjetas de Regla o Fórmula de Studio se quedan** (el componente es su recuadro): **DISEÑO v91** (cantu-lessons `87ba264`), lectura de la cabina, avisada al operador; también a RW-91. ARI-03·S2 y ARI-09·S1 (★) van a «antes y después». Empujado con ella `65cd11b` (CR-DS entrega 5: la ronda 169–171), que falta publicar cuando avise. La alarma del vigilante de las 18:52 eran los votos web de la laptop traídos a la PC (ya apuntados). Vigilante rearmado. (apuntado a las 18:56)
      - **REGLAS-SLIDE entrega 5 publicada** (cantu-revisiones `5dc44c5`): la ronda del cruce **REGLA-SLIDE-COLOR-FOCO-CRUCE, 169–171** (169 la 167 tal cual, recomendada; 170 negrita y color; 171 un dato con color nunca en gris); por votar. **DISEÑO v92** (cantu-lessons `6727120`): rige la 167 mientras tanto; la 167 no aplica al paso a paso hecho a mano (lectura de la cabina, avisada al operador). CR-PL·43 adenda 1 (`ef21290`): la G1 se salta el hecho a mano. CR-DS cierra la fase 2 y queda a la espera del voto. (apuntado a las 18:58)
      - **El operador: «sigo sintiendo el ritmo de trabajo algo lento… me tardo poco en dar feedback y mucho para verse reflejado».** Medido (18:04→19:00): votos→DISEÑO 4 min; piezas→catálogo 35 min (RW-91 esperó); RW-91 0 lecciones desde 18:14; CR-LW 2 en su rama, rehízo ARI-22 y ARI-13 por la 125; su pedido de tablas aún en fila tras la 41; DISEÑO v85→v92 en una hora. **Seis mejoras propuestas, ninguna aplicada, ⏳ esperando su sí:** 1 no abrir rondas de reglas durante una pasada (lo votado entra en la siguiente, salvo «urgente»); 2 publicar lección por lección (meta: primer cambio visible ≤ 45 min); 3 sus pedidos de plataforma primero en la fila de CR-PL; 4 una pieza votada ✓ se aplica ya desde la variante votada, el catálogo la registra en paralelo; 5 probar dos compilaciones a la vez (worktrees); 6 script de publicar galerías y veredicto por tanda. **REGLAS-WEB 3b publicada** (cantu-revisiones `24776ce`; 26 vistas; votos de sistema = 7: el cruce 169–171 y seis web 127–130). Empujados los cierres de CR-DS (`70a1413`, fase 2 cerrada, SISTEMA v1.5) y CR-DW (`0e7f1b8`, SISTEMA-WEB v1.1, guarda de la 125 con gris.mjs: 34 cuentas en 14 lecciones, para CR-LW). (apuntado a las 19:02)
      - **19:03, voto en la laptop (cantu-revisiones `f947c29`, traído por ff): el cruce, la 169 ✓** (la 167 tal cual; 170 y 171 ✗). **DISEÑO v93** + veredicto + **CR-PL·43 adenda 2: la G2 encendida** (cantu-lessons `755a1f4`). A CR-DS: SISTEMA v1.6; lo demás suyo espera la decisión de la mejora 1. Vigilante `bdsj3at5x`. Sigue ⏳ su respuesta a las seis mejoras. (apuntado a las 19:04)
      - **CR-DS `5a67bb1` empujado (SISTEMA v1.6: la 169 y la G2 encendida).** Su lectura de la G2, «ni de dato ni de signo», confirmada por la cabina: la 169 dice «sin excepciones» y la 171 (los signos conservan su color) fue ✗. En el paso, los signos rojos y verdes de ARI-01 a 04 van en la tinta; en el historial conservan su color. Va a la lista de CR-LS. Sigue ⏳ su respuesta a las seis mejoras. (apuntado a las 19:06)
      - **19:05–19:06, voto en la laptop (cantu-revisiones `ef8b860` y `1fdeeb5`, traídos por ff): REGLAS-WEB 3b, completa.** TINTA ✓, LO-QUE-RESALTA ✓, ROTULOS la 128 ✓ (127 ✗), RESULTADO ✓, RAYA ✓, ESPACIADO-RELLENO la 129 ✓ (130 ✗). **DISEÑO v94** + veredicto (cantu-lessons `9e1d9c9`). **CR-GW·22 adenda 3** (`59ce386`): la 129, la lámina 85/86/87 y el problema resuelto a 28 px, antes que 112–114. A CR-DW: las seis en SISTEMA-WEB y la lista por lección (las 2 lecciones en #2E3440). **CR-PL·41 integrada** (cantu-revisiones `ffeda26`, cantu-lessons `1a44b81`, cherry-pick; probada en el 8795: «aprobada: la 128/129»): guardas `norma-94` y `negrita-120`, 8 secciones de álgebra en rojo hasta RW-91 (`--todas` exit 1, esperado). §7 contestado: Venn como excepción mientras el operador no decida; ARI-11·S4 (35 en una Tabla) a CR-LW y ALG-02·S1 (signo) a RW-91; el Ejemplo paso a paso de Studio no se mira. CR-PL sigue con la 42 y la 43. 🚧 0. Sigue ⏳ su respuesta a las seis mejoras. (apuntado a las 19:12)
      - **19:16, el operador: «Sí, las seis».** **TALLER-COMUN v14, la 9.5** (cantu-lessons `95b2db6`) + veredicto (`61972ef`): 1 sin rondas de reglas que toquen una pasada en marcha (lo votado entra en la siguiente, salvo «urgente»; lo avisado antes de las 19:16 entra); 2 lección por lección; 3 sus pedidos primero en CR-PL; 4 pieza ✓ desde la variante, catálogo en paralelo (la 129: las lecciones copian el aire de `la-e`); 5 dos compilaciones a la vez, cada una en su copia; 6 **`_scratch/cabina-lecciones/publicar-galeria.mjs`** (md5, ff, diff por vista y CAT, img sin pisar, prueba en el 8795 con Chrome sin ventana, commit por ruta, push solo si va solo; `--seco`, `--sin-push`, `--md5`; probado: 15 s) y una nota/versión por tanda. Avisados los seis carriles: CR-GW guarda la 112–114 hasta cerrar la pasada; CR-DS junta tinta y formatos en una última entrega antes de la pasada de slides; CR-DW a la espera (SISTEMA-WEB v1.3 `a04a085`). **Primera publicación por lección: ARI-12, 19, 20 (verde) y 23 (amarillo) de CR-LW·21**, cherry-pick a main y compiladas con las guardas nuevas (✔ norma-94 y negrita-120), páginas en cantu-revisiones `31e4ff5` (19:23). 🚧 0. (apuntado a las 19:23)
      - **RW-91, adenda 4: ALG-04, ALG-06 y ALG-01 publicadas** (cantu-lessons `5152312` y `9392bbc`, md5 cotejados; páginas en cantu-revisiones `2b9a7c7`, 19:27). ALG-01 amarillo; ALG-04 y ALG-06 rojo **solo por un falso positivo de `negrita-120`** (la leyenda tras `hr.jv-raya` en la misma losa queda como último renglón; comprobado en el código) → a CR-PL, entre la 42 y la 43. Norma 94 ✔ en las tres. A RW-91: los desbordes a 380 (ALG-04·S3 72 px, ALG-06·S2 10 px) al final de su pasada. CR-GW·22 cerrada (`6b53250` el aire de 28 px en el catálogo, `2c864f4` cierre; la 112–114 se cae: la 128 y la 129 ya lo deciden). Siguen ALG-02, 03 y 05 (RW-91) y las demás de CR-LW. (apuntado a las 19:27)
      - **RW-91: ALG-02 (amarillo), ALG-03 (verde) y ALG-05 (rojo, el mismo falso positivo de `negrita-120` en S3) publicadas** (cantu-lessons `e65f4ed`, md5 cotejados; páginas en cantu-revisiones `2e370fb`, 19:29). **Las seis de álgebra, publicadas**; a RW-91 le quedan los desbordes a 380 (ALG-04·S3, ALG-06·S2). Empujado también `50c7c85` (CR-DS·01 entrega 6: la tinta 172–173 y los formatos, SISTEMA v1.7): espero su aviso con ruta y md5 para publicarla con `publicar-galeria.mjs`. (apuntado a las 19:29)
      - **REGLAS-SLIDE entrega 6 publicada con `publicar-galeria.mjs`** (cantu-revisiones `b87e6d3`, 19:30, 19 s): REGLA-SLIDE-TIPO-TINTA (172 recomendada, 173) y REGLA-SLIDE-FORMATO-TABLA (se vota en su 0); portada «Votos de sistema (2)». Por votar. Las guardas 3 a 5 de SISTEMA v1.7 → **CR-PL·43 adenda 3** (`19c1e37`; Studio no se mide, D-079). **19:29, en la laptop (`b70b40b`): ✓ en el «hoy» de ALG-04·S1 y S3, y ALG-06·S1, S2 y S3**, tres minutos después de ver lo publicado; veredicto `f8afac9`; 🚧 0. RW-91: los «desbordes» a 380 eran su medida (la `.katex-mathml` oculta), no se toca nada; cierra su informe y se archiva. Vigilante `bez41nkpv`. (apuntado a las 19:32)
      - **CR-PL: el arreglo de `negrita-120`** (la cuenta de una caja pintada termina en su `.jv-raya`; banco42-negrita 5/5, con control positivo), cherry-pick `60f8e3e` desde su rama de la 42. Recompiladas ALG-04 y ALG-06 (verde) y ALG-05 (amarillo): ningún rojo en álgebra; manifiesto en cantu-revisiones `4913b54` (las páginas, sin cambios). **RW-91 cerrado** (informe `de6bc33`/`a98cad4`, empujados) **y archivado**, con Remote Control apagado antes. **Para la próxima pasada de álgebra:** cambiar en ALG-01 a 06 las hojas de la 85, la 86 y la 87 por las del catálogo (`6b53250`) y quitar la regla de la 129 que RW-91 puso en cada bloque (no se hizo ahora para no cambiar la huella de las cinco recién aprobadas; no se ve diferencia). (apuntado a las 19:34)
      La 3 («opcional» en el catálogo y opcionales intercaladas) va a CR-PL con el alta de las primeras opcionales de álgebra;
      no frena el piloto. La 4 (rehacer `Aritmetica-temario-v2.docx`, que va con L01–L26) espera a que el operador revise el
      de álgebra, para usar el formato que apruebe.
    - **Lo que sigue:** el alta y la web ya están (RW-89, arriba). Queda `tools/sondas/comun.mjs`, que acepte el área antes de la slide.
- **RW-82 entregado (lo revisé a las 02:25)** en las ramas `rw-82-renumerar` (cantu-lessons `819716f`, cantu-revisiones `5f85951`),
  sin choques con main. «Para integrar» está en `docs/informes/RW-82.md` §10, en la rama. `desde` va a mano.
  - **B quedó aprobado (12:13) y deja aritmética en la v3, así que se integra tal cual.** Solo falta su «listo», con los tres
    aparatos sincronizados y el 8791 cerrado.
- **Vigilante de votos:** el `bnj2w4wng` se paró al reiniciarse la sesión. Se rearmó a las 10:57 como `b2e2rei5e`.
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
