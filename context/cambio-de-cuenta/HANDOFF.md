# HANDOFF de cambio de cuenta

- **De la cuenta suplementaria a la principal.** La principal ya tiene su cabina: se abre su sesión y se escribe «ya volví, revisa la
  carpeta del protocolo».
- **Escrito:** 2026-11-13, 15:13 (hora de la PC). Lo escribió la cabina de LECCIONES de la suplementaria, en la sesión
  `local_f6677f4f-97d5-4ff8-aad1-45b02f781ebb`. Esa sesión se queda esperando.
- **Por qué ahora:** el operador lo pidió (*«enterado, entonces cortemos / y procedmaos a cambiar de cuenta»*). Tope semanal de la
  suplementaria: 87 %, con el de 5 h al 79 %. Se reinicia el 14-nov a las 00:00, hora de la PC.
- **`sincronia.mjs`:** sale «NO CAMBIAR», pero solo por lo que se nombra aquí abajo («Lo que la sincronía marca»). Puntas:
  - cantu-lessons 2ec59bd0;
  - cantu-revisiones 7670331;
  - aiw-console, el commit de este fichero.
- **`pendientes.mjs`** (15:13): 0 cambios, 0 sin entrada. Esperan el voto otra vez del operador: ALG-06·EG, ALG-38·S2, ALG-39·S1 y
  ALG-47·S2/S3. Su ~ ya está escrito en la lección, y la plataforma le pide confirmarlo.

## LECCIONES

### Hecho y en GitHub (13-nov)

- **Bloques 5 a 9 de álgebra, terminados y publicados:**
  - CR-A5·02 (ALG-27 a 31): la 2 de ALG-28·S4, las reglas de ALG-38 y la Ciruela;
  - CR-A7·02 (ALG-38 a 44): tus ~ de ALG-38·S2 y ALG-39·S1, ALG-42 y ALG-44 nuevas, y el Petróleo;
  - CR-A9·01 (ALG-45 a 51): ALG-51 nueva, ALG-47·S2/S3 de la adenda 3, la partida de las cadenas y el Verde hoja.

  Las tres ramas están juntadas y en `ramas-integradas.txt`; sus informes y relevos, en main.
- **Los tokens de color** (CR-SIS·19): `ciruela`, `petroleo` y `verde_hoja`, en main 738e81cd. Están en DISEÑO v118.
- **DISEÑO v119** (01da1e20), de CR-SIS·20:
  - la partida de una cadena va en la columna de las expresiones, ahora dicho con palabras;
  - 21.6 y REGLA-ALINEACION-BLOQUE exceptúan la cadena;
  - la regla nueva REGLA-COLUMNA-AL-MARGEN;
  - la 36 nombra las guardas nuevas.
- **CR-SIS·20, ya publicado:** B1 y B9 completos, en ALG-02, 04, 05, 06, 45, 46, 47, 48, 49 y 51 (páginas 24fc6b1 y 7670331).
- El veredicto y el tablero están al día. Los comentarios de ALG-27, ALG-38 y ALG-47 están atendidos o «en el taller (CR-SIS·20)».

### En curso: CR-SIS·20, «Todo álgebra contra las reglas» (cortado a media)

- **Encargo:** `cantu-lessons/docs/carriles/CR-SIS/20-encargo.md`.
- **Relevo:** «Relevo de CR-SIS·20», en `docs/carriles/CR-SIS.md`. Está en main (9032e85c); léelo entero.
- **Rama `cr-sis-20`** (worktree `_scratch/CR-SIS/20/wt/cantu-lessons`), sin push. Su punta, 0e19e1e1, es un WIP tal cual del corte.
- **Falta en main, de esa rama:**
  1. **Los commits de B5 y B6** (por ruta, compilar y publicar):
     - B5: ALG-29 `0cc2043b` y ALG-31 `41eceeee`;
     - B6: ALG-32 `8602d403`, ALG-34 `1ff509dc`, ALG-35 `b834d73f`, ALG-36 `c690c9ad` y ALG-37 `cfa244a4`;
     - más ALG-10, 11, 16, 26 y los demás desde 655c4076, menos 04, 47 y 48.

     ALG-37 estrena la etiqueta `pasos-tres-puntos-se-prueban`. Su fila está en `_scratch/CR-SIS/20/fila-ALG-37.md` y entra al
     registro antes de compilar ALG-37 en main.
  2. **El WIP 0e19e1e1, sin compilar:**
     - 10 lecciones: ALG-06 (slide), 13, 14, 15, 18, 19, 20, 24, 25 y 38 (slide);
     - las NOTA de las piezas 85, 86, 87 y 106;
     - las guardas sin terminar: `tools/revision/lib/formaCuenta.mjs` y lo demás de `tools/revision`.

     El relevo dice qué le falta a cada una.
  3. **Las guardas, a 🔴,** con `--control-negativo`. Deben caer ALG-35·S3, ALG-47·S1 y S2, y ALG-21·S3 de main.
  4. **El informe** `CR-SIS/20.md`, con las 54 dudas para el operador (`_scratch/CR-SIS/20/informe-partes.md`).
- **La sesión de CR-SIS es de la suplementaria.** En la principal, CR-SIS·20 se abre en una sesión nueva desde su relevo. Es más
  ligera: la de aquí pasaba de 3 200 mensajes. Censo y pases en Sonnet; compilaciones una a la vez.
- **No tocar:**
  - ALG-30·S1 y D3: van con las tres decisiones de ALG-30, que esperan al operador;
  - los sistemas votados de ALG-28 a 31.

### Espera del operador

- **ALG-30, tres decisiones:** el resultado sin plano, de 70 a 56 escenas, y S1 en los pasos 4 a 6.
- **El voto otra vez** de ALG-06·EG, ALG-38·S2, ALG-39·S1 y ALG-47·S2/S3.
- **ARI-02·D9:** su encargo.
- **Las 54 dudas de CR-SIS·20,** cuando estén en el informe.

### Al relevo de los carriles (no urgente)

- La ronda 2 de las galerías CR-A9 y CR-A7.
- La vista `SIS-COLOR-BLOQUE-8` (Radicales, ALG-43 y 44).
- El censo de ALG-32 a 37 de CR-A7 ya lo cubre CR-SIS·20.

### Lo que la sincronía marca (nombrado, no bloquea)

- **`cr-sis-20`:** el carril en curso, arriba.
- **`_scratch/CR-PL/72/prueba/{les,pub-les,rev,pub-rev}`:** copias de prueba de CR-PL·72 con 3 a 5 ficheros sin commit. No son
  trabajo: no se integran.

### Ojo

- **El vigilante de votos está apagado.** Se rearma con `node _scratch/cabina-lecciones/vigilar-votos.mjs 120`, en segundo plano,
  desde `AIW_Workspace`.
- **Herramientas nuevas de la cabina,** en `_scratch/cabina-lecciones/`:
  - `atender-teselas.mjs` y `declarar-comentarios.mjs`: el tablero, línea por línea;
  - `alta-leccion.mjs`: la línea de codigos.json y las filas del registro;
  - `diseno-v119.mjs`.
- **Las compilaciones a la vez se frenan entre sí.** Hoy una tardó más de 10 minutos. Va una a la vez, con `timeout`, y se mata solo
  por PID.
- **No se toca:**
  - el 8791 del operador, su navegador ni `respuestas.*`;
  - ninguna cabina vota.

## Otras cabinas (no bloquean; que las vea su cabina)

- cantu-studio: `tools/studio/editor-ui/package-lock.json` modificado. La cabina está en pausa (D-079).
- phd-p2-experiment: 8 cosas sin commit, en `data/manual/se_*` y `data/tutor-configs/`. Son de su cabina.
