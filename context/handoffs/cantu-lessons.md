# HANDOFF — hilo `cantu-lessons` (LECCIONES)

> **Tercer relevo de este hilo.** Escrito por la cabina de Cowork el **2026-10-28** (noche, CDMX), en la laptop
> (`laptop-pf6souas`), para la mudanza a la PC y el paso de la cabina a Claude Code. Sustituye al relevo del 2026-09-30;
> ese va **al final, tal cual**, porque esta cabina no lo volvió a medir: la primera sesión en la PC lo revisa contra el
> disco y deja lo vigente.
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el disco al abrir. Gana el disco.**
>
> **La cabina de este hilo, en Claude Code, se abre en `context/cabinas/lecciones/`.** Su `CLAUDE.md` dice qué cambia
> respecto a Cowork y carga `context/cabinas/REGLAS-DE-CABINA.md`.

## Dónde estamos

- **La copia de trabajo es la PC.** La laptop (`laptop-pf6souas`) quedó congelada antes de la copia. Medido ahí:
  8 repos, todos en `main`, **0 commits sin publicar**, sin locks. HEAD de cada uno (`repos-laptop.tsv`):

  | repo | sha |
  |---|---|
  | `Acervo` | `3c11b995` |
  | `PHD` | `e9d38b62` (su `maintenance.lock` vacío del 13 de octubre se borró con la palabra del operador) |
  | `aiw` | `f7640bdc` |
  | `projects/aiw-console` | `19ca1dc8` |
  | `projects/cantu-lessons` | `04f558e8` |
  | `projects/cantu-quizzes-latex` | `39fc5dd2` |
  | `projects/cantu-studio` | `9e8a02c4` |
  | `projects/phd-p2-experiment` | `91d10430` |

- **El operador copió todo a la PC**, `Dieta_Chris` (unos 100 GB), `_scratch` y `Acervo` incluidos.
- **El operador creó `projects/cantu-revisiones`** en las dos computadoras, vacío, solo con su README.
- **Falta verificar la copia.** `_scratch/cabina/mudanza/` en la PC tiene que tener estos md5 (árbol de trabajo):
  `manifiesto-laptop.tsv` `2cf33fca` (72 454 ficheros), `repos-laptop.tsv` `e127dfe9`, `mudanza.mjs` `6cd0b0f9`,
  `README.md` `427457b0`. Criterio, del README: dos `comparar` con «VEREDICTO: SÍ» y el build de L02 `--slide` en VERDE.
  Lo que «sobra» en la PC es informativo: `projects/aiw-console/context/cabinas/`, `projects/cantu-revisiones`,
  la carpeta `mudanza` misma y `Artifacts`. `cantu-revisiones` no estaba en la laptop al medir, así que `comparar` de
  repos lo dará como sobrante. Después de verificar, `_scratch/cabina/mudanza/` es desechable: el resultado va al veredicto.

## Lo último que se cerró

- **RW-53** (L02 slide, con el operador eligiendo en la galería): las ocho escenas en `4b488ac`, con el registro de
  `docs/BLOQUES-PROVISIONALES.md` al día (entran `cuenta-slide`, `se-sale-del-conjunto`, `problema-slide`; retiradas,
  sin borrar la fila, `atajo-con-las-dos-propiedades` y `neutro-e-inverso-en-rejilla`). `build.mjs --slide` de L02: VERDE.
- **Lo aprendido de RW-53** en `04f558e`: `DISENO-DE-LECCIONES` v62 (regla 41: el molde de slide es L02, once puntos; lo
  que aún no tiene guarda está declarado), `MOLDE-DE-GALERIA` v2, `TALLER-COMUN` v6.
- **Después de la copia**, a pedido del operador, la cabina de Cowork escribió en la laptop: en `cantu-lessons`, los
  mensajes del operador de la mudanza en el veredicto; en `aiw-console`, `context/cabinas/` y este relevo. Son los commits
  posteriores a los sha de la tabla; el operador los publica desde la laptop y la PC los trae con `pull`.
- **Quedó en la laptop, sin importancia ya:** el servidor de la galería de RW-53 (127.0.0.1:8791), si el operador no lo paró.

## Decisiones del operador de hoy (sus palabras, en el veredicto de `cantu-lessons`)

1. **La cabina pasa a Claude Code** en la PC, con Remote Control para seguir desde otros aparatos. Los talleres, como
   sesiones aparte (worktree apagado).
2. **Revisar a distancia con la opción A:** commit, push y pull en el aparato donde revise. Repo aparte: `cantu-revisiones`.
3. **La cabina hace commit y push.** En Cowork no podía: corría en la nube sin ruta a GitHub; no era un tema de permisos.
4. **La configuración de las cabinas, en un solo repo sincronizado: `aiw-console/context/cabinas/`.** El operador propuso un
   repo nuevo; la cabina recomendó este porque `context/` ya es el canal de contexto de la cabina (D-037) y un repo nuevo lo
   partiría en dos. Pendiente: proponer la entrada D-081 en `DECISIONES.md`.
5. **Lo que hace falta para seguir vive en git; `_scratch` es desechable.** El informe de cada taller pasa a git (dónde,
   por proponer).

## Pendientes que ya venían

- L11 slide desde su web; L11B sin slide; L02·D9 (opciones); L20·D3 a las variantes de L20.
- El ticket de herramientas: las guardas de la regla 41 v62, las piezas del lote, las guardas de RW-45, las mutaciones
  débiles, nombres de consola, historial, y los `_generado` viejos de `lecciones/L02-…/` (no los creó la cabina: necesitan
  la palabra del operador).
- Probar la tarjeta del problema (`problema-slide`) con más problemas: lo pidió el operador.
- L16 por aprobar (desbloquea RW-31, RW-32 y RW-33); la revisión de L11 y L11B; la pregunta de Moodle.
- La siguiente tanda de slides: L03 en adelante, en orden, con el comentario del operador por escena.

## Dónde está todo lo de esta etapa

- Veredicto del hilo: `projects/cantu-lessons/docs/veredictos/2026-10-16-lectura-de-las-seis-lecciones-web.md`.
- Tickets: `projects/cantu-lessons/docs/encargos/REVISION-WEB-TICKETS.md` (hasta RW-53).
- Informe de RW-53: `_scratch/RW-53/INFORME.md`.
- Los dos documentos puente que la cabina de Cowork dejó en el Project de claude.ai se borran al escribirse este relevo.

---

## El relevo anterior (2026-09-30), tal cual

> Sin volver a medir. Lo de abajo es el segundo relevo entero, con sus encabezados. Lo vencido se reconoce por la fecha.

# HANDOFF — hilo `cantu-lessons` (LECCIONES)

> **Segundo relevo de este hilo.** Escrito por la cabina el **2026-09-30**, al cerrar la sesión que
> se abrió el 25 en la PC (`desktop-525k0is`), antes de que el operador siga en la laptop.
> Sustituye al relevo del 2026-09-25.
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el disco al abrir. Gana el disco.**

---

## ⚠ LO PRIMERO: EL ÍNDICE, Y DOS FICHEROS NUEVOS

1. `projects/cantu-lessons/docs/CATALOGO-POR-CASILLA.md` — el índice. Su sección **«Lo que espera
   al operador»** se reescribió el 2026-09-30 y está al día.
2. `projects/cantu-lessons/docs/veredictos/2026-09-30-contenido-primero-y-el-guion-por-casilla.md` —
   **el cambio de método de esta sesión**, con las palabras del operador.
3. `projects/cantu-lessons/docs/guiones/L06-operar-con-signos.html` — **el guion piloto**. Se abre
   con doble clic en el navegador. Es lo siguiente que el operador tiene que mirar.

---

## LO QUE CAMBIÓ EN ESTA SESIÓN: EL MÉTODO

El operador se había perdido: cinco rondas de variantes mezclaban **diseñar piezas para todas las
lecciones** con **diseñar esta lección**, y la ronda 5 entregaba **combinaciones completas** de la
casilla 2 que impedían elegir sección por sección. Eso ya lo prohibía la regla 18, y no se cumplió.

**El método nuevo, decidido por el operador (veredicto del 09-30):**

| etapa | qué se decide | vehículo |
|---|---|---|
| **1 · Guion** | **el contenido**: qué dice cada casilla y cada sección, en qué orden | HTML en blanco y negro en `docs/guiones/`, con el **contenido real**. Recuadro blanco = lo que lee el alumno; recuadro gris = por qué va así. Vistas «Con justificación» / «Solo la lección». Variantes de contenido por casilla y por sección. Los componentes ya decididos se copian en gris, fieles, con los desplegables funcionando y **abiertos** |
| **2 · Forma visual** | variantes **por sección**, se elige una por sección, independientes | se re-corta la ronda 5 para L06 |
| **3 · Montaje** | topes de toda la lección y un vistazo final | Cantu Studio |

**Cuatro lecciones de cómo se llegó al formato del guion**, porque el operador rechazó tres
intentos seguidos y cada rechazo es una regla:

1. **Texto puro no sirve**: «si es puro texto me sera dificil visualizarlo».
2. **Una maqueta con barras grises tampoco**: valida la **estructura**, que las casillas ya
   resuelven. La etapa 1 aprueba **contenido**, así que el guion lleva el contenido real.
3. **La justificación no puede competir con la lección**: va aparte, en gris y más pequeña, nunca
   en un recuadro llamativo. Medido en el piloto a 1 180 px: con justificación, 3 003 px; solo la
   lección, 2 090 px. Casi un tercio era justificación.
4. **Donde el componente ya existe, se copia fiel en gris.** Para el ejemplo guiado y la pregunta,
   la cabina **compiló la lección viva con el motor de Studio** (`previewRenderer.js`,
   `renderWebDraftPreviewHtml`) y reprodujo la estructura real. Es la forma de no inventar la réplica.

**Aún no es regla escrita.** El operador no ha dicho si el piloto ya es el formato de la etapa 1;
hasta entonces **no** se escribe en `DISENO-DE-LECCIONES.md`. El hueco de la **regla 17** está vacío
y es el sitio natural. La cabecera de ese documento sigue diciendo **v4** con el registro en **v16**.

---

## ESTADO, medido el 2026-09-30

### Los cinco repos

| repo | HEAD local = origin/main local | nota |
|---|---|---|
| `aiw` | f7640bd | — |
| `aiw-console` | 1dc6bf7 antes de este relevo | otros hilos commitearon el 30 (QA de runs de `cantu-studio`) |
| `cantu-lessons` | 8e24e72 antes de los commits de este cierre | árbol limpio antes del cierre |
| `cantu-quizzes-latex` | 4cd9652 | — |
| `cantu-studio` | 2c1759fc | — |

**GitHub solo se pudo comparar para `aiw-console`**, que es público. Los otros cuatro son privados
y la terminal del equipo no tiene credenciales («could not read Username»), así que lo que se
compara es contra el último fetch local. **No es lo mismo que decir que están al día con GitHub.**

### La lección viva — `operar_con_signos`

Casillas 1, 3 y 5 puestas; la 4 no va (una sola idea). **La 2 es lo que falta**, ahora por el
método nuevo: primero se aprueba el guion, después la forma por sección.

El material de la ronda 5 **se conserva** en `drafts/web/_pendiente-qa/casilla-2-operar-con-signos/`
para re-cortarlo por sección en la etapa 2. **Su QA de combinaciones está retirada.** No borres la
carpeta: el método viejo decía borrarla al aprobar una variante, y ya no aplica.

### El cruce con `cantu-studio`

El componente «Pregunta» está pedido y en cola: **`RUN-CANTU-COMPONENT-PETITIONS-ANALYSIS-STOP-001`,
el 2026-09-30 `#221` «ANALYSIS STOP — the component petitions, read together», *planned***.
**Búscalo por `run_id`:** el 09-20 era el #215, el 09-25 el #217, y el título perdió la palabra
«five». Es el caso de manual de «el número nunca es identidad».

---

## LO QUE ESPERA AL OPERADOR

En el catálogo, completo. En corto, y **en este orden**:

1. ¿El guion piloto es el formato de la etapa 1? *(recomendación: sí)*
2. Elegir las variantes del guion de L06 (la barra de abajo del guion da la línea para copiar).
   **La apertura B, las variantes B y C de las dos secciones y la pregunta B las escribió la
   cabina** y piden juicio.
3. Notas ② (dos secciones o tres; *recomendación: dos*) y ③ (dos ideas o la misma; *recomendación:
   dos*, como pide el temario).
4. **El orden de las casillas 4 y 5.** Medido: el 4 → 5 **nunca se justificó por escrito**; afecta a
   8 de 25 lecciones. *Recomendación:* mantenerlo, con la condición de que la pregunta no se
   conteste copiando el resumen de encima.

**Con su sí al punto 1**, la cabina escribe la regla (hueco de la 17), corrige la cabecera de
`DISENO-DE-LECCIONES.md` y commitea.

---

## LA CAPACIDAD DE LA CABINA — lo que costó medio día en la PC

**La terminal del equipo (`device_bash`) NO es un ajuste: depende de cómo está instalada la app.**
En la PC no aparecía, y la causa se midió paso a paso el 2026-09-25:

1. La app estaba instalada con el **`.exe` antiguo** (`%LOCALAPPDATA%\AnthropicClaude\`), que trae
   la app pero **no la máquina virtual** donde corre la terminal. **El botón «Download for Windows»
   de la web baja ese mismo `.exe`.**
2. La buena es el **`.msix`**:
   `https://claude.ai/api/desktop/win32/x64/msix/latest/redirect`. Se reconoce porque corre desde
   `C:\Program Files\WindowsApps\Claude_…_x64__pzs8sxrjxfjjc\`.
3. En la PC, el `.msix` no instalaba (`0x80073CFF`, «instalación de prueba bloqueada por la
   directiva») porque había **`AllowAllTrustedApps = 0`** en
   `HKLM\SOFTWARE\Policies\Microsoft\Windows\Appx`, junto a un valor `MdmHosts` de **Intune**. Se
   puso a 1. **Si la PC sigue inscrita en esa administración, puede volver a 0**: la app seguiría
   funcionando, pero sus actualizaciones podrían fallar.
4. Requisitos que la PC **sí** cumplía: Windows 10 Pro 19045, Plataforma de máquina virtual activa,
   hipervisor en `Auto`, `vmcompute` y `hns` corriendo.

**Si en la laptop falta la terminal**, se mide en este orden (PowerShell como administrador):
`Get-AppxPackage -Name Claude` (vacío = `.exe`), luego la directiva, luego la virtualización.

**El permiso de borrado CADUCA al reconectarse el equipo.** Pasó el 09-30. Se vuelve a pedir con
la herramienta y sigue; no es un fallo.

---

## ARRANQUE EN LA LAPTOP

1. **Pull en los cinco repos** antes de abrir el hilo. Hay commits de este cierre en `cantu-lessons`
   y en `aiw-console`.
2. Derivar la ruta de montaje: **no es la de la PC**.
3. Locks con `ls`; probar terminal, `git log`, borrado y escritura en `.git`.
4. Leer, en este orden: el catálogo, el veredicto del 09-30 y el guion piloto.
5. **Retomar por el punto 1 de «Lo que espera al operador».**

---

## LO QUE NO VIAJÓ, Y SE DICE PARA QUE NADIE LO BUSQUE

- **Los scripts de la ronda 5** (`construir`, `medir`, `validar`, `anchos.json`) se quedaron en
  `_scratch` de la **laptop**, desde el 09-20. En la PC nunca estuvieron. En la laptop deberían
  seguir ahí; compruébalo antes de la etapa 2.
- **`_scratch\wireframes\` de la PC**: el guion vivió ahí mientras era borrador. Ya está en el repo,
  en `docs/guiones/`, y la copia de `_scratch` la borró la cabina en este cierre.

---

## LAS LECCIONES QUE MÁS COSTARON EN ESTA SESIÓN

1. **Una afirmación hecha con la herramienta equivocada.** El 09-25 la cabina afirmó que `bc2455d`
   «no existía en ningún repo»: buscó en disco un commit que seguía en GitHub sin bajar. Entró a
   las 18:18. Se corrigió en voz alta.
2. **El método de variantes se rompió sin que nadie lo notara durante cinco rondas**, aunque la
   regla 18 ya lo prohibía. Una regla escrita no protege si el encargo no la cita.
3. **Un wireframe que valida lo ya decidido es trabajo tirado.** Antes de maquetar, preguntar qué
   decisión tiene que poder tomar el operador con él.
4. **La terminal no se da por perdida ni por imposible**: se diagnostica hasta la causa. Medio día
   de PowerShell sustituyó a una sesión entera sin commits ni borrados.
