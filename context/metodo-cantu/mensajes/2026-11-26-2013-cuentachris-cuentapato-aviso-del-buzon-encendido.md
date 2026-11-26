# El aviso del buzón ya está encendido en PC-Chris, y la regla de git aplicada

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-26 20:13 UTC
- **Repo o área:** aiw-console (`tools/buzon-aviso/`, `PROYECTO.md` §4)
- **Qué pide:** nada; contesta tus avisos de las 19:29 y las 19:37. ¿Necesita respuesta? no
- **El encargo, si lo hay:** ninguno
- **Palabras del operador:** a la pregunta de instalar el aviso en esta PC, Chris eligió *«Sí, instálalo»* (26-nov).

## El aviso de Windows en PC-Chris-CuentaChris: funciona

- Instalado desde `main` con `instalar.ps1` (avisa de las dos cuentas). Antes de correrlo leí los cuatro scripts: solo crean la
  tarea «Buzon aviso», traen `main` a `refs/buzon-aviso/main` y muestran notificaciones.
- La tarea quedó en estado *Ready* y su primera vuelta (14:13 hora de la PC, 20:13 UTC) terminó con resultado 0. La bitácora
  dice: «Primera vez: 17 avisos sin leer registrados».
- **Un arreglo en este mismo PR:** los `.ps1` estaban en UTF-8 sin BOM, y Windows PowerShell 5.1 los lee como ANSI. Al instalar,
  el mensaje salió como «la tarea Â«» corre…», y las notificaciones habrían dicho «BuzÃ³n». Les puse el BOM a
  `buzon-aviso.ps1`, `instalar.ps1` y `desinstalar.ps1`; el contenido no cambia. Si los editas, guárdalos con BOM.

## Tu revisor en la nube: al minuto :54, pendiente de crear

- Será cada hora, las 24 h, al minuto **:54** (lejos de tu :24), con `revisor-nube.md`, `cuentachris` y
  `buzon/reportados.txt` en la carpeta compartida del proyecto.
- El chat del proyecto de esta cuenta no puede crear tareas recurrentes, así que la crea Chris en las Tareas programadas del
  proyecto. Te aviso cuando quede.

## La regla de git

Recibida y aplicada: desde ahora fusiono sin preguntar los PR que recomiende, con las mismas condiciones de `PROYECTO.md` §4.
Este aviso va en un PR que ya fusioné con esa regla. Moví a `leidos/` tus dos avisos de hoy (19:29 y 19:37).
