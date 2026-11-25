# Mudanza a `Metodo_Cantu` en la PC (PC-Chris), paso a paso

> Lo escribió la cabina DASHBOARD el 2026-11-24 a las 07:24 (`date`), con el visto bueno de Chris. Se actualizó a las 08:07 con la respuesta final de Laptop-Chris-CuentaPato, donde la mudanza ya está hecha y comprobada.
>
> **La regla:** un paso a la vez. Cada paso tiene su **comprobación**; si no sale como dice, **se para y se le pregunta a Chris**. **No se edita ninguna ruta a mano**: vienen arregladas en el pull. La excepción es `launch.json`, que no está en git (paso 4).
>
> **No se empieza hasta que Chris confirme que la laptop ya hizo push** de los commits de rutas en aiw, aiw-console y los repos.
>
> **Quién lo corre:** una sesión de Claude Code abierta en la raíz de `C:\Users\chris\Documents\AIW_Workspace`. La raíz no se mueve, así que sirve la misma cabina DASHBOARD de hoy, si ningún proceso suyo trabaja dentro de un repo. Chris aprueba cada paso.

## ✔ Hecha el 2026-11-24, de 08:09 a 08:21 (`date`)

- **Paso 1:** se apagó un servidor huérfano del panel de DASHBOARD, en el puerto 8805; después, 0 procesos estorbando. La cabina de phd-p2 se pausó antes del paso 3, porque escribió en aiw-console a las 08:11 (7c99da8).
- **Paso 2:** fast-forward en los 8 repos (aiw 516efef, aiw-console 7c99da8, lessons a66873c7, revisiones aa54ffd6, studio 24bf43c9, landing 0d7aa55, dashboard cc90ce9a, quizzes 81cf90d), con 0 atrás y 0 adelante.
- **Paso 3:** `[IO.Directory]::Move` uno por uno, sin fallas. `git status` limpio en los 7; solo queda el package-lock de studio.
- **Paso 4:** no hay `launch.json` con rutas viejas.
- **Paso 5:**
  - el repair dejó 135 worktrees en lessons y 24 en revisiones, todos abren;
  - con su sí, el prune borró 11 registros en lessons y 2 en revisiones;
  - quedan 0 prunables y ninguno con `projects\`.
- **Paso 6:**
  - `node --test` en aiw-console: 982 de 982;
  - la consola (`project-console`) sirvió los 6 snapshots con HTTP 200;
  - `sincronia.mjs` vio los 8 repos;
  - `cierre.mjs` en lessons encontró las rutas nuevas;
  - la ruta vieja solo queda en rondas cerradas, en `docs/carriles` y `docs/moldes` de lessons, en `PAA/herramientas/cabina` de quizzes, en `QA/temp` de studio, en los prototipos de landing y en `prototipo/panel/herramientas/probar.mjs` de dashboard;
  - los worktrees CR-LX y CR-LX2 «con miles sin commitear» ya estaban vaciados desde el 21-nov (la limpieza de disco de LECCIONES); no es de la mudanza.
- **Paso 7:** el empaque unido de DASHBOARD sale idéntico a la v32.
- **⚠ Después de la mudanza (medido a las 08:23), algo fuera de esta cabina movió carpetas:**
  - **`AIW_Workspace\aiw` fue a la Papelera a las 08:19:04** y no quedó en ningún otro lado. En la Papelera está en 516efef, limpio y ya subido a GitHub, así que no se perdió nada.
  - **`projects\Resuelve-Esparza` fue a la Papelera a las 08:20:13**, tras aparecer una copia en `AIW_Workspace\Resuelve-Esparza` a las 08:20:10. Las dos están en 30c4cdc y limpias.
  - La única sesión ocupada en ese momento era P2_Cabina_PC_Chris.
  - DASHBOARD no restauró nada: lo decide Chris.
  - **Lo que dijo Chris (08:2x): «yo lo mande, porque es un proyecto viejo que ya no planeo usar».** Lo de `aiw` fue a propósito y se queda en la Papelera y en GitHub.
  - **Lo medido sin `aiw`:**
    - `node --test` en aiw-console da 982 de 982;
    - la consola sirve los otros 5 snapshots, y solo `aiw` da 404;
    - ningún repo de Método Cantú lo usa en código vivo;
    - lo único que aún lo nombra es el registro de la consola (`project-console/projects.json`, `projects.config.json`) y el texto de `REGLAS-DE-CABINA.md`, que se limpian cuando se descongele aiw-console.

## Estructura final

- `AIW_Workspace\aiw\`: no se mueve.
- `AIW_Workspace\aiw-console\`: antes estaba en `projects\aiw-console`.
- `AIW_Workspace\Metodo_Cantu\`: una carpeta normal, no un repo. Lleva cantu-lessons, cantu-revisiones, cantu-studio, metodo-cantu-landing, metodo-cantu-dashboard y cantu-quizzes-latex.
- `projects\` se queda con phd-p2-experiment y Resuelve-Esparza (esta PC también lo tiene; no es de Método Cantú y no se mueve).

## Lo que respondió la otra cuenta (resumen)

- **Las rutas en GitHub:** los «Metodo_Cantu» que vio la cabina en `origin/main` **no eran rutas**: es el nombre de la paleta de color. Los cambios de rutas los sube la laptop. Son estos:
  - aiw: 8
  - aiw-console: 40
  - cantu-lessons: 11
  - cantu-quizzes-latex: 25
  - metodo-cantu-dashboard: 10
  - cantu-studio: 1
  - cantu-revisiones y landing: sin cambios
- **Lo que no se cambia:** informes, records, veredictos, encargos, notas, roadmaps, snapshots, DECISIONES.md, las URL `/projects/<key>/` de la consola y las herramientas de rondas ya cerradas. Esas herramientas fallan si se vuelven a correr tal cual.
- **El `package-lock.json` de cantu-studio:** se queda como está. El pull no lo toca. Después, `git diff`:
  - si es ruido de npm, Chris decide si se descarta;
  - si trae dependencias, se sube aparte.
- **Las memorias:** las cabinas **se siguen abriendo desde la raíz de `AIW_Workspace`**, así que la memoria sigue ligada a la misma carpeta y **no hay que copiar nada**.
  - Las notas que citan rutas viejas no se editan.
  - Al leerlas, la traducción es `projects/aiw-console` → `aiw-console` y `projects/<repo>` → `Metodo_Cantu/<repo>`.
- **Lo que les falló:**
  - `Move-Item` partió un repo (landing): dejó la mitad en cada lado. **Se usa `[IO.Directory]::Move`**, que mueve todo o nada.
  - Los procesos huérfanos bloquean el movimiento: servidores node y pares `tail -f | grep` con el directorio dentro de un repo.
  - `AIW_Workspace\.claude\launch.json` no está en git. **En esta PC no existe** (medido a las 08:07), así que el paso 4 se salta salvo que aparezca.
  - Los tests de aiw-console dieron 982 en verde tras el cambio.

## Paso 1 · Que nada corra dentro de los repos

- Cerrar cabinas y talleres que trabajen dentro de los repos, servidores node (la galería 8791, la consola) y cualquier `tail`/`grep` de sesiones viejas.
- **Comprobación** (PowerShell): no debe salir nada.
  ```powershell
  Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'AIW_Workspace\\projects\\(aiw-console|cantu-|metodo-cantu-)' } | Select-Object ProcessId, Name, CommandLine
  ```

## Paso 2 · Los 8 repos limpios y al día (todavía en `projects\`)

- `git status` y `git log origin/main..HEAD` en los 6, en aiw-console y en aiw. Solo se permite el `package-lock.json` de cantu-studio.
- `git pull --rebase` en los 8. En cantu-studio, con ese archivo sin commit: si git no deja el rebase, **se para** y se le pregunta a Chris (no se descarta).
- **Comprobación:** los 8 con 0 atrás y 0 adelante, sin conflictos. Los commits de rutas de la laptop aparecen en el `git log`.

## Paso 3 · Mover, todo o nada

```powershell
New-Item -ItemType Directory C:\Users\chris\Documents\AIW_Workspace\Metodo_Cantu
```

```powershell
Set-Location C:\Users\chris\Documents\AIW_Workspace
foreach ($r in 'cantu-lessons','cantu-revisiones','cantu-studio','metodo-cantu-landing','metodo-cantu-dashboard','cantu-quizzes-latex') { [IO.Directory]::Move("projects\$r", "Metodo_Cantu\$r") }
[IO.Directory]::Move('projects\aiw-console', 'aiw-console')
```

- Mejor **uno por uno**, comprobando cada uno, que todos de golpe. Si uno falla («en uso»), **se para** y se dice cuál.
- **Comprobación:** `Test-Path` verdadero en las 7 rutas nuevas y falso en las 7 viejas. `git status` limpio en cada repo movido.

## Paso 4 · `launch.json`

- En esta PC no hay `AIW_Workspace\.claude\launch.json`. Si apareciera algún `launch.json` con `projects/aiw-console`, `projects/cantu-studio` o `projects/metodo-cantu-landing`, se cambia a mano a la ruta nueva.

## Paso 5 · Los worktrees

- **Con el sí de Chris**, `git worktree prune` en cantu-lessons (40 ya no existen) y en cantu-revisiones (2). Solo borra el registro de los que ya no existen.
- Luego, `git worktree repair` en los dos.
- **Comprobación:** `git worktree list` sin «prunable» y sin rutas a `projects\`.

## Paso 6 · Las comprobaciones

- `node context\cambio-de-cuenta\sincronia.mjs` desde `aiw-console` lista los repos.
- `node --test` en aiw-console: en la laptop dio 982 en verde.
- La consola sirve `/projects/<key>/.project/snapshot.json`.
- Se busca `AIW_Workspace/projects` y `AIW_Workspace\projects` en código vivo: solo deben salir phd-p2-experiment, Resuelve-Esparza y las rondas cerradas.
- `node tools/cabina/cierre.mjs` desde `Metodo_Cantu\cantu-lessons` corre sin error de ruta.

## Paso 7 · Retomar

- Las cabinas se abren desde `AIW_Workspace` como siempre. Las carpetas aprobadas en Remote Control o en la app que apunten a `projects\...` se cambian.
- **DASHBOARD comprueba:**
  - `git status` limpio en `Metodo_Cantu\metodo-cantu-dashboard`;
  - el empaque unido corre: `node prototipo/panel/herramientas/empaquetar-unido.mjs <temporal> --vendor`;
  - la liga v32 sigue igual.
  - Sus scripts de publicar, que viven fuera del repo, se ajustan a la ruta nueva.

## Pendiente de DASHBOARD para después de la mudanza (anotado el 2026-11-24 a las 07:37)

- **Congelado por Chris:** no hay commits, encargos ni talleres hasta que se haga aquí la mudanza. Después, DASHBOARD sigue donde se quedó.
- **Los votos ya están guardados:** `veredictos/2026-11-24-maestro-9.md` y `-piezas-24.md` (13e58922, en el repo).
- **Lo propuesto, que espera su «sí» para escribir los encargos:**
  - **MAESTRO-10**, en el puerto 8916.
    - Fijo:
      - §Q, las barras, con «Sin presentar» a la izquierda de «menos de 60» y una línea que los separe;
      - §P en la 2;
      - §G, el botón sutil, con un texto más claro, como «Ver resultados del grupo».
    - Se vota:
      - §C, 3 variantes, todas en tabla, con encabezado en la columna de los botones;
      - la calificación y la fecha del desglose, 3 formas que no parezcan fracción;
      - lo abierto en las listas, 3 variantes: una que solo deja abrir uno a la vez y dos con otro tratamiento, sin fondo gris.
  - **PIEZAS-25**, en el puerto 8917: en el Historial del alumno, solo un quiz abierto a la vez, como en el Temario. Fijo.
