# HANDOFF de cambio de cuenta

- **De la cuenta principal a la suplementaria.** La suplementaria ya tiene su cabina de LECCIONES
  (`local_f6677f4f-97d5-4ff8-aad1-45b02f781ebb`): se abre y se escribe «ya volví, revisa la carpeta del protocolo».
- **Escrito:** 2026-11-20, 04:47 (hora de la PC), por la cabina de LECCIONES de la principal
  (`local_3591b566-02e3-4c0e-8bca-146697b7fc03`), que se queda esperando.
- **Por qué:** la principal llegó a su tope (98–99 %; se renueva el 20-nov a las 05:00, hora de la PC). El operador pidió gastar ese
  resto «sin que se queden 12 talleres a la mitad» y volver a la suplementaria.
- **La pausa del 88 % es de la suplementaria** (memoria «pausa-al-88-semanal»): medir con `get_usage` en cada vuelta.

## LECCIONES · el pulido CR-LX·14–25

Encargo: `cantu-lessons/docs/carriles/CR-LX/pulido.md`. **Lecciones pulidas: 115 de 217 (53 %)** en cuanto entren ·21 y ·20; faltan
102 (47 %): ARI-16–29, ALG-19–73 y FUN-01–33. **Casi todas ya tienen hoja** (abajo).

### ⚠ Lo primero: dos juntados que pueden haber quedado cortados

- **·21 (GEO-23 a 44, `cr-lx-21` `c7775cd5`)**: `integrar.mjs` corría al escribir esto: paso 1 hecho (cherry-pick de 26 commits, main
  local en `163e4ba3`), compilando y publicando. Si el cambio de cuenta lo cortó: `git -C projects/cantu-lessons log origin/main..main`
  y `git status`; si main local va por delante sin publicar, repetir
  `node tools/cabina/integrar.mjs cantu-lessons cr-lx-21 c7775cd5` (o compilar y publicar a mano las 22, memoria
  «lecciones-integrar-a-mano-y-tablero-espera»). Registro: `%TEMP%\int-lx21.log`.
- **·20 (GEO-01 a 22, `cr-lx-20` `af2cc159`)**: entregado con informe `20.md`, en cola tras ·21. Si no llegó a correr:
  `node tools/cabina/integrar.mjs cantu-lessons cr-lx-20 af2cc159` (registro `%TEMP%\int-lx20.log`). Su informe trae «Para la cabina».
- Si el paso 6 (push de aiw-console) choca: `git fetch; git rebase origin/main; git push origin HEAD:main`, comprobando antes que
  `origin/main..HEAD` solo trae el renglón de ramas-integradas.

### Las ramas a medias (todas SIN push; ninguna se junta hasta tener su tramo completo e informe final)

| ticket | rama y punta | sanas (compiladas, nada peor que main) | a medias | hojas |
|---|---|---|---|---|
| ·15 ARI-16–29 | `cr-lx-15` `c323a2d6` PROVISIONAL | — | ARI-16–21: 1.ª pasada Opus sin compilar (faltan 🟡 de texto, compilar, guardas, fotos) | ARI-22–29 (la 23 parcial) |
| ·17 ALG-19–36 | `cr-lx-17` `ecba6a85` | ALG-20 | ALG-19, 21–24 vueltas a main (su 1.ª pasada en `02b84476`); ALG-25/26 provisionales, slide sin guardas | ALG-27–36, revisadas |
| ·18 ALG-37–55 | `cr-lx-18` `ef08a962` PROVISIONAL | — | ALG-37–39 editadas, sin recompilar tras los arreglos; ALG-39 slide con 2 ✖ nuevos frente a main (D11 nota que tapa 73,6 px de la fórmula; D23/D26 notas sin razón) | ALG-40–55, revisadas |
| ·19 ALG-56–73 | `cr-lx-19` `ff14aecb` PROVISIONAL | ALG-56, 57 | ALG-58–62 (59 casi; 60 con scroll y cadena partida en S2 web) | ALG-63–73 (agentes de la cabina, hasta 04:59) |
| ·24 FUN-01–16 | `cr-lx-24` `7e5027f3` PROVISIONAL | FUN-01, 02, 03 | FUN-04–06 1.ª pasada; FUN-06 web en 🔴 (leyendas de S3) | FUN-07–16, revisadas (117 ✔, 15 ✖) |
| ·25 FUN-17–33 | `cr-lx-25` `70355d38` PROVISIONAL | — | FUN-17–19 compilando al cierre | FUN-20–33 (revisión hasta 04:59) |

- **Cada taller dejó su relevo:** `_scratch/CR-LX/<nn>/estado.txt` (·24: `ESTADO.md`; ·17: `historial.log`). Las hojas, en
  `_scratch/CR-LX/<nn>/spec/<L>.md`, con ✔/✖ por propuesta: **al retomar se aplican solo los ✔**, y el ✖ más común es un «=» en la
  prosa, un «;» o web y slide con distinto número de pasos.
- **·17 escribió un informe parcial** (`docs/carriles/CR-LX/17.md`): el vigilante de entregas lo tomó como entrega. **No integrar**
  hasta que el tramo esté entero; el vigilante se rearmó con `17` en la lista de vistos.
- **El cuello de botella es la compilación** (`turno-n.sh`, 5 a la vez en toda la PC): de 04:25 a 04:50 estuvo 5/5 y casi nada llegó a
  compilar. Al retomar, menos talleres compilando a la vez y más aplicando hojas.

### Para que decida el operador (de los talleres)

- ALG-43 (LX03-105) y ALG-53 (LX03-285): errores de contenido dentro de una nota naranja de «Error común» (T01).
- ALG-52 (#283) y ALG-54 (#302) piden distinto rótulo para el paso 0.
- FUN-02 slide pasa de 11 a 12 escenas (paso partido, T03).
- ALG-37 LX03-017 pide una herramienta que no hay.
- Del informe de ·20, «Para la cabina»: nota gris en GEO, GEO-13, el renombre de GEO-15, GEO-14 P=18(3/2), las cotas de GEO-08 y
  GEO-20 LX04-339; GEO-22 renumerada D7–D12.

### Al final del pulido (sin cambio)

Aplicar `cr-lx-13-hoja` (`7639159f`, `copiar-puente.mjs --aplicar`), build completo, `cierre.mjs` y la lista de lo no hecho para el
operador.

### Vigilantes

El de votos (`_scratch/cabina-lecciones/vigilar-votos.mjs 120`) y el de entregas (`_scratch/CR-LX/vigilar-entregas.mjs 11 22 16 23 14
21 20 17`) se apagan con esta sesión: **la cabina que llega los rearma**.

## Lo que la sincronía marca y no bloquea

- Las ramas `cr-lx-*` de arriba (a medias a propósito), `cr-fig-04` y `cr-lx-13-hoja`; los worktrees de prueba de CR-PL·72.
