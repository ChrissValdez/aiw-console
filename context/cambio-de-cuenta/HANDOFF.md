# HANDOFF de cambio de cuenta

- **De la cuenta principal a la suplementaria.** La suplementaria ya tiene su cabina de LECCIONES (la sesión del 13-nov,
  `local_f6677f4f-97d5-4ff8-aad1-45b02f781ebb`). Se abre y se escribe «ya volví, revisa la carpeta del protocolo».
- **Escrito:** 2026-11-19, 02:08 (hora de la PC). Lo escribió la cabina de LECCIONES de la principal, en la sesión
  `local_3591b566-02e3-4c0e-8bca-146697b7fc03`. Esa sesión se queda esperando.
- **Por qué ahora:** lo pidió el operador (*«creo que es un buen momento de hacer switch de la cuenta... entonces... iniciemos
  protocolo para seguir trabajando en la otra cuenta»*). Tope semanal de la principal: **90 %**; se reinicia el 20-nov a las 05:00,
  hora de la PC (11:00Z).
- **`sincronia.mjs`:** sale «NO CAMBIAR», solo por lo que se nombra abajo en «Lo que la sincronía marca y no bloquea» (cr-fig-04 y los worktrees de prueba de CR-PL·72). Puntas: cantu-lessons `cf0b0152`, cantu-revisiones `25553db1`, aiw-console el commit de este fichero.
- **El cierre de LECCIONES** (`tools/cabina/cierre.mjs`): **✔ listo** (medida de las 02:06): 0 sin encargo, 0 por publicar, 0 votos obsoletos, 0 comentarios sin atender, 434 piezas; ⚠ desborde en la primera visita, 116 escenas en 63 de 159 mazos (58 sin medir).

## LECCIONES

### Hecho y en GitHub (18 y 19-nov)

- **Las 217 lecciones del temario están escritas y publicadas** (web y slide, 434 piezas): Aritmética 29, Álgebra 73, Geometría 44,
  Datos y probabilidad 38, Funciones 33. «Técnicas» sigue en pausa. **Ninguna está aprobada todavía:** las 434 están «En revisión 👁».
- **Datos y Funciones** (el pedido del 18-nov, 15:30, *«visto bueno, lanza todas las leciones de las areas de Funciones y Datos y
  probabilidad»*), terminado. Ramas juntadas: cr-est-05, cr-f2-01b, cr-e2-01c, cr-fun-05c, cr-e2-02b, y los arreglos del cierre
  cr-fun-06, cr-est-06 y cr-f2-02. Los 13 colores de bloque, votados (DISEÑO hasta v147; la lista, en el relevo de la cabina).
- **La guarda del desborde en la primera visita** (CR-RO·01 y ·02; el operador, 19-nov: *«Sí, las dos»*):
  - en main `cf0b0152`: `tools/revision/mide-desborde.mjs`. `build.mjs` mide cada slide compilada (⚠, nunca ✖). El cierre suma la
    cuenta del curso desde los registros, sin volver a medir; el ⚠ no impide el «listo». `DESBORDE_ESTRICTO=1` lo pasa a ✖.
  - **Cifra parcial:** 116 escenas desbordan en 63 de 159 mazos medidos. **Faltan 58:** de EST-30 en adelante (25) y los 33 de FUN.
    Para sembrarlos (~8 min), desde `cantu-lessons`:
    `sh C:/Users/chris/Documents/AIW_Workspace/_scratch/CR-E2/01/turno.sh node tools/revision/mide-desborde.mjs --sin-medir --turno --raiz=C:/Users/chris/Documents/AIW_Workspace/projects/cantu-lessons`
    Los registros (`lecciones/*/_generado/slide-mazo.desborde.json`) están fuera de git: viven en el disco de la PC.
  - **Petición 37 a Studio** (`docs/PARA-CANTU-STUDIO-2026-11-19.md`, `c7691f95`): que el foco se vuelva a medir cuando llega la
    letra. Con ella la cuenta baja a 0 y la guarda pasa a ✖. Studio sigue en pausa (D-079).
- **El relevo de la cabina** (`context/handoffs/cantu-lessons.md`, sección «Dónde estamos (2026-11-19, 00:50)»), al día.
- **Protocolo para otra cabina en la laptop** (`OTRA-CABINA-EN-LAPTOP.md`, 18-nov): la LANDING a la laptop. Lo hace el operador
  cuando quiera. Con este cambio, la LANDING de la PC también pasa a la suplementaria: la app de la PC tiene una sola cuenta.

### En curso

- **Nada.** Ningún carril trabaja. El vigilante de votos (`_scratch/cabina-lecciones/vigilar-votos.mjs 120`) se apaga con esta
  sesión: **la cabina que llega lo rearma lo primero**.

### Lo que sigue

1. **La revisión del operador de las 217 lecciones.** Cada voto o comentario se encarga a su carril y se publica. Las sesiones de
   carril son de la principal: en la suplementaria se abren nuevas desde el relevo de cada una (`cantu-lessons/docs/carriles/CR-*.md`).
2. **Sembrar las 58 que faltan de la guarda** (el comando de arriba) y correr el cierre para que la cifra salga entera.
3. **Las dudas de sistema, para repasar con el operador** (una por una, con su foto):
   - el orden de `codigos.json`, y «opcional» o «complementaria»;
   - el tope de siete números;
   - la familia oliva/musgo casi agotada;
   - la «y» del plano a 3,72:1 (`#5E81AC`);
   - las cajas cálidas de FUN-07 y FUN-08, sin voto;
   - EST-32 sigue en la tinta;
   - FUN-31 lleva el Vino añejo también en D3, D5, D9 y D10 (la vista nombra cuatro);
   - FUN-12·D6–D10: bajar el enunciado para que la guarda dé 0 (encargo de contenido);
   - los §Dudas de CR-FUN (22), CR-E2 (12), CR-F2 (8) y CR-RO·02.

### Lo que la sincronía marca y no bloquea

- **`cr-fig-04`** (`618d8716`, 2 commits, del 17-nov): «la guarda de figuras (regla 46, DISEÑO v135)» y su relevo. **No está en main**
  (no hay `tools/revision/prueba-figuras.mjs` ni `docs/carriles/CR-FIG/04.md`). Es la rama del incidente del `sed` durante un
  `--todas` (memoria «modo-seco-comprobar-antes»). No la junté a ciegas: hay que ver si se retoma, se rehace o se archiva.
- **Worktrees de prueba de CR-PL·72** (`_scratch/CR-PL/72/prueba/les`, `pub-les`, `pub-rev`, `rev`), con cambios sin commitear. Son
  copias de prueba de un carril ya juntado; no las borré (borrar lo ajeno pide el sí del operador).
- Las otras ramas viejas que marcaba (cr-e2-01, -01b, -02, cr-f2-01, cr-fun-05, -05b, cr-ro-01, cr-est-02, cr-fun-01, cr-g5-05,
  cr-le-18, cr-pl-76/78 «antes del rebase», cr-pl-82, cr-sis-29) ya están en main por otra rama o por squash: apuntadas en
  `ramas-integradas.txt` el 19-nov.

## Otras cabinas (no bloquean; que las vea su cabina)

- **metodo-cantu-landing:** 37 commits de GitHub sin bajar en la PC (`git pull --rebase`).
- **Resuelve-Esparza:** 33 commits sin bajar.
- **cantu-studio:** 1 sin commitear (`tools/studio/editor-ui/package-lock.json`).
- **phd-p2-experiment:** 8 sin commitear (`data/manual/se_*`).
