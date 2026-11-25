# Mudar el coordinador de Método Cantú a un Project de claude.ai/code

> **v0 · 2026-11-24, 08:38 (`date`).** Lo escribió la cabina DASHBOARD en la PC, junto con `PROYECTO.md`, con el sí del operador.

## Por qué todavía no

- **El 24-nov**, `/send-to-project` respondió en esta cuenta: «Projects aren't available for this account». Se probó dos veces.
- **Según la documentación oficial** ([claude-projects](https://code.claude.com/docs/en/claude-projects.md)):
  - Projects está en **beta pública** para Pro, Max y Ultra, y **se libera cuenta por cuenta**;
  - empezó por las cuentas que ya habían usado sesiones en la nube y no tenían proyectos en el chat de claude.ai ni en Cowork;
  - no hay un interruptor para encenderlo.
- **La cuenta de la laptop sí lo tiene.**
- **Lo que hizo el operador o puede hacer:**
  - apuntarse en la lista de espera: https://claude.com/form/projects;
  - pedirlo a soporte;
  - reportarlo con `/feedback`.

## Cómo saber que ya llegó

En la pestaña **Code** de la app de escritorio, o en claude.ai/code, aparece **Projects** en la barra lateral (a veces dentro de **More**), con la opción **New project**.

> **Ojo:** los Projects del **chat** de claude.ai son otra cosa: una carpeta de conversaciones. El de aquí es el de **Code**: un coordinador con hilos.

## Cómo lo tiene la cuenta de la laptop (su respuesta del 24-nov)

- **Las instrucciones del proyecto:** vacías.
- **El conocimiento:** ningún fichero subido; tiene los **7 repos de GitHub** (los 6 de Cantú y aiw-console). El relevo general vive en aiw-console.
- **Cómo usa la computadora:** cuando un hilo la necesita, el operador aprueba una **tarjeta** para la carpeta `AIW_Workspace` de la máquina. Para correr comandos usa Remote Control.
- **Los permisos:** guardó `AIW_Workspace\.claude\settings.local.json`, que deja correr git y node sin preguntar y prohíbe el push forzado y el `reset --hard`.
- **Cómo reparte el trabajo:** un solo coordinador, que abre **un hilo por tarea**, no por cabina.
- **Las cabinas viejas:** no se archivaron; se siguen abriendo desde `AIW_Workspace`.
- **Lo que se probó desde la nube:** GitHub y las pruebas en navegador funcionaron. LaTeX, Moodle y Artifacts todavía no se prueban.

## La receta, el día que llegue

1. **Los relevos al día:** cada área deja su `context/handoffs/<repo>.md` al día, con commit y push. Lo mide el coordinador local con `sincronia.mjs`.
2. **`settings.local.json` en la PC:** el operador copia a mano el de la laptop a `C:\Users\chris\Documents\AIW_Workspace\.claude\settings.local.json`. Una cabina no puede aflojar sus propios permisos.
3. **Crear el proyecto:** en la sesión del coordinador local, que está en `AIW_Workspace`, el operador escribe `/send-to-project Metodo_Cantu`.
   - **El nombre:** «Método Cantú».
   - **El repositorio de la carpeta:** ninguno, porque `AIW_Workspace` no es un repo.
   - **El mensaje** (texto propuesto):
     > Coordina Método Cantú. Lee aiw-console/context/metodo-cantu/PROYECTO.md y los relevos de context/handoffs/, y dime en qué se quedó cada área y qué espera mi sí.
4. **Agregar los 7 repos al proyecto, en claude.ai/code:**
   - `ChrissValdez/aiw-console`
   - `ChrissValdez/cantu-lessons`
   - `ChrissValdez/cantu-revisiones`
   - `ChrissValdez/cantu-studio`
   - `ChrissValdez/metodo-cantu-landing`
   - `ChrissValdez/metodo-cantu-dashboard`
   - `ChrissValdez/cantu-quizzes-latex`
5. **Las instrucciones del proyecto:** vacías, como en la laptop. Todo vive en `PROYECTO.md`.
6. **La primera vez que un hilo pida la computadora:** el operador aprueba la tarjeta para `AIW_Workspace` de **DESKTOP-525K0IS** (la PC).
7. **La comprobación:**
   - el coordinador en la nube cuenta en qué se quedó cada área y coincide con los relevos;
   - un hilo abre una sesión en la PC y lee la memoria; se nota porque contesta en español y cierra con «Qué necesito de ti».
8. **El coordinador local:** deja su relevo y se archiva, con el sí del operador.

## Lo que hay que probar al principio

- **Publicar la liga del prototipo** (Artifact): DASHBOARD publica desde una sesión de la PC. Hay que ver si un hilo del proyecto puede hacerlo, o si eso se queda en una sesión local.
- **LaTeX** (los quizzes y las lecciones) y **Moodle**: corren en la PC. Los hilos que los necesiten van con la tarjeta de la PC, no en la nube.

**Probado el 2026-11-24 desde un hilo del Project de la laptop** *(propuesto por la laptop, aprobado por el operador, 2026-11-24)*:
- **Artifacts:** un hilo en la nube sí publica la liga.
- **LaTeX:** sí compila en la nube. El contenedor no trae TeX: se instala texlive con `apt-get` (texlive-xetex, -latex-extra, -fonts-extra, -pictures, -science y fonts-font-awesome; unos 5 min) y se compila con `xelatex -shell-escape`. `PAA/Examen Diagnostico/Examen_Diagnostico.tex` salió en 47 páginas sin error. Sin `-shell-escape` falla el paquete moodle («Base64 conversion failed»).
- **Moodle:** sigue solo en la máquina.

## La Cuenta Chris, el 2026-11-25 (v1)

> **v1 · 2026-11-25, 01:56 (`date`).** Lo escribió el coordinador de la Cuenta Chris en PC-Chris. El operador: *«ya tengo proyectos en claude activo / ya se habilito en mi cuenta / es decir ya puedo terminar la migracion a la nube de este chat»*, y luego *«Sí, tras la v38»*.

**Ya llegó:** Projects está habilitado en la Cuenta Chris. Se migra **después de publicar la v38** del dashboard (MAESTRO-15 y PIEZAS-27), para que no quede una ronda a medias.

**Lo que cambia contra la receta de arriba** (desde D-087, la Cuenta Chris solo es dueña de `metodo-cantu-dashboard`):
- **El nombre del proyecto:** «Metodo_Cantu», como en la Cuenta Pato. Cada cuenta tiene el suyo; no se comparten.
- **Los repos (paso 4): tres, no siete.**
  - `ChrissValdez/metodo-cantu-dashboard`: el suyo.
  - `ChrissValdez/aiw-console`: relevos, `ASIGNACIONES.md` y el buzón con la Cuenta Pato.
  - `ChrissValdez/cantu-lessons`: **solo lectura**; las pruebas del dashboard usan `tools/render/` (puppeteer-core) y `modelo/desde-ruta.mjs` lee `docs/referencias/RUTA-DE-ESTUDIO`. No se escribe en él (es de la Cuenta Pato).
- **El mensaje (paso 3)**, texto propuesto:
  > Coordina el dashboard de Método Cantú (Cuenta Chris). Lee aiw-console/context/metodo-cantu/PROYECTO.md, ASIGNACIONES.md, el buzón (context/metodo-cantu/mensajes/) y el relevo context/handoffs/metodo-cantu-dashboard.md, y dime en qué se quedó y qué espera mi sí.
- **`settings.local.json` (paso 2):** en PC-Chris **no existe** (medido el 25-nov: `AIW_Workspace\.claude\` está vacía). El operador lo copia a mano desde la laptop.
- **El ciclo de rondas en la nube:** los votos (`origin/votos`), los encargos y los veredictos son git, así que van igual. Lo que hay que probar en el primer hilo:
  - lanzar un taller (un hilo por ronda) y que avise al coordinador;
  - las guardas y `probar-v4` (Chrome con puppeteer-core): en la nube, o con la tarjeta de la PC;
  - publicar la liga con `Artifact read` antes (https://claude.ai/artifact/JLDqDNMqEVUPe1X2aMMhTq), con `empaquetar-unido.mjs --vendor`.
- **El coordinador local (paso 8):** deja el relevo al día, avisa a la Cuenta Pato por el buzón y se archiva con el sí del operador.
