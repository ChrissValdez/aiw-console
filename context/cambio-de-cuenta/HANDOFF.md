# HANDOFF de cambio de cuenta

- **De la cuenta principal a la suplementaria.** La suplementaria ya tiene su cabina de LECCIONES
  (`local_f6677f4f-97d5-4ff8-aad1-45b02f781ebb`): se abre y se escribe «ya volví, revisa la carpeta del protocolo».
- **Escrito:** 2026-11-20, 05:53 (hora de la PC), por la cabina de LECCIONES de la principal
  (`local_3591b566-02e3-4c0e-8bca-146697b7fc03`), que se queda esperando. Pone al día el de las 04:47 (`bc30e10`).
- **Por qué:** la principal llegó a su tope semanal (se renueva el 20-nov a las 05:00, hora de la PC). El operador: *«a las 5:01
  termians todo lo que se esta haciendo y habilitas el handsoff»*.
- **La pausa del 88 % es de la suplementaria** (memoria «pausa-al-88-semanal»): medir con `get_usage` en cada vuelta.

## LECCIONES · el pulido CR-LX·14–25

Encargo: `cantu-lessons/docs/carriles/CR-LX/pulido.md`. **Lecciones pulidas en main: 93 de 217 (43 %)**; con ·20 (entregada, falta juntarla) 115 (53 %), y con las sanas que ya
están en ramas de talleres 123 (57 %). Faltan 94 (43 %): ARI-16–29, ALG-19–73 y FUN-01–33 (menos las sanas de la tabla). **Todas las que faltan tienen hoja**, salvo ARI-16–21,
ALG-19–26 y FUN-01–06, que ya se trabajaron en rama.

### ⚠ Lo primero: juntar ·20 y correr el cierre

- **·21 (GEO-23 a 44) ya está juntado** (05:52): main `163e4ba3` empujado, 22 lecciones publicadas (cantu-revisiones `aa1d9aa2`),
  apuntado en aiw-console `930231a0`. Falta `node tools/cabina/cierre.mjs` (lo pide integrar.mjs antes del «listo»).
- **·20 (GEO-01 a 22, `cr-lx-20` `af2cc159`) NO se juntó:** su cola se paró antes de empezar. Correr, desde `cantu-lessons`:
  `node tools/cabina/integrar.mjs cantu-lessons cr-lx-20 af2cc159` (~65 min: 44 piezas a ~1,5 min). Su informe trae «Para la cabina».
  Luego `cierre.mjs`.
- Si el paso 6 (push de aiw-console) choca: `git fetch; git rebase origin/main; git push origin HEAD:main`, comprobando antes que
  `origin/main..HEAD` solo trae el renglón de ramas-integradas.

### Las ramas a medias (todas SIN push; ninguna se junta hasta tener su tramo completo e informe final)

| ticket | rama y punta | sanas (compiladas, nada peor que main) | a medias | hojas |
|---|---|---|---|---|
| ·15 ARI-16–29 | `cr-lx-15` `58d65ca7` PROVISIONAL | — | ARI-16–21: 1.ª pasada Opus + 🟡 de texto de 19–21, sin compilar | ARI-22–29 (la 23 parcial) |
| ·17 ALG-19–36 | `cr-lx-17` `be4c19b8` | ALG-20, 25, 26 (25/26 «en parte») | ALG-19, 21–24 vueltas a main (1.ª pasada en `02b84476`); ALG-27 provisional sin compilar (4 de 6 ✔; faltan #03, LX27#08, guardas) | ALG-28–36, revisadas |
| ·18 ALG-37–55 | `cr-lx-18` `e61009eb` PROVISIONAL | — | ALG-37–39 editadas y con los ✖ de la slide de ALG-39 ya arreglados en el borrador, sin recompilar: lo primero, tanda + guardas de las tres | ALG-40–55, revisadas |
| ·19 ALG-56–73 | `cr-lx-19` `79d26142` PROVISIONAL | ALG-56, 57 | ALG-58, 61, 62 a medias; ALG-59 (slide) y ALG-60 (web, S2 con la cadena devuelta a main) listas para compilar: si salen sin nada peor, un commit cada una | ALG-63–73, confirmadas y revisadas (04:55) |
| ·24 FUN-01–16 | `cr-lx-24` `7e5027f3` PROVISIONAL | FUN-01, 02, 03 | FUN-04 web verde, slide con ⚠ aire-slide nuevo; FUN-05 web ⚠ scroll nuevo, slide 🔴 (escena desborda); FUN-06 web 🔴 (leyendas de S3) y slide 🔴 (desborde D10–D11, gris del array D9–D10) — medido a las 05:03, con la vara posiblemente vieja | FUN-07–16, revisadas (117 ✔, 15 ✖) |
| ·25 FUN-17–33 | `cr-lx-25` `f1db2dd9` PROVISIONAL | — (FUN-17 `21fe4449`: web sana; la slide sin verificar, su compilación falló a las 05:00 «Network.enable timed out»: recompilar y guardas) | FUN-18/19 (`f1db2dd9`): web con los 🟠 que rompían devueltos (FUN-19 251; FUN-18 238, 239, 242, #248), sin recompilar; slides con ⚠ nuevos (aire-slide FUN-18, area FUN-19) | FUN-20–33, revisadas |

- **Cada taller dejó su relevo:** `_scratch/CR-LX/<nn>/estado.txt` (·24: `ESTADO.md`; ·17: `historial.log` e informe parcial
  `docs/carriles/CR-LX/17.md` en su rama). Las hojas, en `_scratch/CR-LX/<nn>/spec/<L>.md`, con ✔/✖ por propuesta: **al retomar se
  aplican solo los ✔**. El ✖ más común: un «=» en la prosa, dos en un renglón, un «;», o web y slide con distinto número de pasos.
- **Hojas con texto viejo que ya no estaba**, recotejadas a las 04:59 (ALG-65, 66, 67, 72: propuestas reescritas sobre el texto real o
  «sin efecto»; queda [NO VERIFICADO] la nota «se sustituye» de ALG-66 LX03-496); en FUN-27–33, textos que salen 2–3 veces
  (precisar cuál). «Revisar a mano»: ALG-66 #506, ALG-68 #534 (D02).
- **·17 lleva informe parcial** en su rama: el vigilante de entregas lo tomó como entrega. **No integrar** hasta que el tramo esté
  entero; el vigilante se rearmó con `17` en la lista de vistos.
- **Ojo con la vara «nada peor que main»** (·25, 05:03): la web de FUN-18 sigue dando ⚠ nuevos aunque el borrador solo cambia dos
  palabras frente a origin/main. Sospecha: lo compilado de main que usan las guardas es del 19-nov 05:32, anterior a main de hoy.
  Antes de culpar a una rama por un ⚠ «nuevo», compilar esa lección en main fresco y comparar.
- **El cuello de botella es la compilación** (`turno-n.sh`, 5 a la vez en toda la PC): de 04:25 a 04:50 estuvo 5/5. Al retomar, menos
  talleres compilando a la vez y más aplicando hojas.

### La lista de lo no hecho (borrador)

`_scratch/CR-LX/lista-no-hecho.md` (04:55): 162 renglones de los informes 14, 16, 20, 21, 22 y 23 — 47 decisiones del operador, 28 de
sistema, 87 «en parte» o «no» por no caber. En 20 y 21 los «en parte» van un renglón por lección, sin detalle (en 20, detallado hasta GEO-13; el informe 20.md corta cada
hallazgo en «…», así que «qué falta» hay que sacarlo del diff o de las fotos de `20/GEO-nn/`). Se completa con los
informes de 15, 17, 18, 19, 24 y 25 al final del pulido, y se pasa a limpio (juntar los motivos repetidos: decisión 1 «Error común»,
decisión 2 «problema a la vista»).

### Para que decida el operador (de los talleres)

- ALG-43 (LX03-105) y ALG-53 (LX03-285): errores de contenido dentro de una nota naranja de «Error común» (T01).
- ALG-52 (#283) y ALG-54 (#302) piden distinto rótulo para el paso 0.
- FUN-02 slide pasa de 11 a 12 escenas (paso partido, T03).
- ALG-37 LX03-017 pide una herramienta que no hay.
- ALG-65 #483: decisión de diseño.
- Títulos: FUN-31 «La gráfica y la tabla» → «La gráfica»; FUN-33 «Personas contra tiempo» → «Reparto del trabajo».
- Del informe de ·20, «Para la cabina»: nota gris en GEO, GEO-13, el renombre de GEO-15, GEO-14 P=18(3/2), las cotas de GEO-08 y
  GEO-20 LX04-339; GEO-22 renumerada D7–D12.

### Al final del pulido (sin cambio)

Aplicar `cr-lx-13-hoja` (`7639159f`, `copiar-puente.mjs --aplicar`), build completo, `cierre.mjs` y la lista de lo no hecho para el
operador.

### Vigilantes

El de votos (`_scratch/cabina-lecciones/vigilar-votos.mjs 120`) y el de entregas (`_scratch/CR-LX/vigilar-entregas.mjs 11 22 16 23 14
21 20 17`) se apagaron a las 05:53 por PID; **la cabina que llega los rearma**.

## Lo que la sincronía marca y no bloquea

- Las ramas `cr-lx-*` de arriba (a medias a propósito), `cr-fig-04` y `cr-lx-13-hoja`; los worktrees de prueba de CR-PL·72.
