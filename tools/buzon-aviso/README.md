# Aviso del buzón

Para que nadie tenga que decir «te dejé mensaje» entre la Cuenta Pato y la Cuenta Chris. Son dos capas:

| Capa | Dónde corre | Cada cuánto | Cuesta tokens | Qué hace |
|---|---|---|---|---|
| **Aviso en Windows** | un aparato (PC o laptop) | cada minuto | no | Notificación de Windows: «Buzón: mensaje para Cuenta X», con el tema. Clic = abre el aviso en GitHub. |
| **Atender al momento** (opcional, `-Atender`) | el mismo aparato | en cuanto llega | sí | Abre Claude Code sin ventana con la cuenta que recibe el aviso; lo atiende, contesta si hace falta y lo mueve a `leidos/`. |
| **Revisor en la nube** | tarea programada de cada cuenta | cada hora, las 24 h | sí, poco | Si hay avisos sin leer para esa cuenta que aún no reportó, deja un resumen en el chat de su proyecto. |

**Qué cuenta como leído no cambia** (`context/metodo-cantu/mensajes/README.md`): lo que está en `mensajes/` falta leer, y lo
mueve a `leidos/` la cuenta que lo recibe, al leerlo en una sesión de la máquina (la de «atender» cuenta como tal). El aviso
de Windows y el revisor en la nube no mueven avisos ni escriben en el repo. Así no hay dos lectores peleándose por el mismo
fichero:

- El **aviso en Windows** recuerda en el propio aparato qué ya avisó (`%LOCALAPPDATA%\buzon-aviso\avisados.txt`), y avisa una
  sola vez por aviso.
- El **revisor en la nube** recuerda qué ya reportó en su propia lista, y solo reporta lo que sigue sin leer. Si el aviso de
  Windows ya hizo que alguien lo leyera (y lo movió a `leidos/`), el revisor no lo repite.

## Encender el aviso en Windows

En el aparato, con `aiw-console` ya clonado y `git` con acceso a GitHub (el mismo que usan las cabinas):

```powershell
cd <ruta de aiw-console>\tools\buzon-aviso
powershell -ExecutionPolicy Bypass -File .\instalar.ps1
```

- Debe salir una notificación de prueba. Si no sale: Configuración de Windows → Sistema → Notificaciones → que estén
  encendidas, también para «Windows PowerShell».
- La primera vez que corre muestra **una sola** notificación con cuántos avisos sin leer hay; luego, una por cada aviso nuevo.
- Para avisar solo de una cuenta: `.\instalar.ps1 -Para cuentapato` (o `cuentachris`).
- Para apagarlo: `powershell -ExecutionPolicy Bypass -File .\desinstalar.ps1`.
- Si algo falla, queda escrito en `%LOCALAPPDATA%\buzon-aviso\bitacora.txt`.

**Por qué no estorba a las cabinas.** Solo hace `git fetch` de `main` a una referencia propia (`refs/buzon-aviso/main`), con
`--no-write-fetch-head`. No toca la carpeta de trabajo, ni `origin/main`, ni ninguna rama. Con el aparato apagado o sin red,
simplemente no avisa; la capa de la nube cubre ese hueco.

## Atender al momento, en los dos sentidos, con una sola PC

Con `-Atender`, la misma PC atiende los avisos de **las dos cuentas**: cuando llega uno para cuentapato, abre Claude Code
con la Cuenta Pato; si es para cuentachris, con la Cuenta Chris. Cada cuenta tiene su propia carpeta de inicio de sesión
(`%USERPROFILE%\.claude-cuentapato` y `%USERPROFILE%\.claude-cuentachris`, vía `CLAUDE_CONFIG_DIR`), así que no se mezclan
entre sí ni con Claude Desktop.

**Una sola vez, en la PC:**

1. Claude Code instalado (si `claude --version` no responde): `irm https://claude.ai/install.ps1 | iex`.
2. Iniciar sesión con cada cuenta, cada una en su carpeta:
   ```powershell
   cd <ruta de aiw-console>\tools\buzon-aviso
   powershell -ExecutionPolicy Bypass -File .\iniciar-sesion.ps1 -Cuenta cuentachris
   powershell -ExecutionPolicy Bypass -File .\iniciar-sesion.ps1 -Cuenta cuentapato
   ```
   En cada una: `/login` → «Claude account» → se abre el navegador. **Ojo con el navegador:** si se abre en el que tiene
   la otra cuenta, copia el enlace que muestra la terminal y pégalo en el navegador de la cuenta correcta (en PC-Chris,
   Chrome tiene la Cuenta Pato). Al entrar, `/exit`.
3. `powershell -ExecutionPolicy Bypass -File .\instalar.ps1 -Atender`

**Cómo trabaja** (`buzon-atender.ps1`):

- Atiende **uno a la vez**, en orden, en un **clon propio** de `aiw-console` (`%LOCALAPPDATA%\buzon-aviso\clon\`), no en el
  checkout compartido de las cabinas. Si necesita otro repo, lo clona aparte también.
- Antes de abrir Claude mira si el aviso sigue en `mensajes/`: si otra sesión ya lo leyó, no lo atiende. Cada aviso se
  atiende una sola vez.
- Claude lee `PROYECTO.md` y sigue sus reglas: hace solo lo chico, reversible y de su área; lo grande o lo que necesita al
  operador lo deja anotado en su respuesta. Solo tiene permiso de leer y editar ficheros y de usar `git`, `node`, `npm` y
  `date`; nada más.
- **Frenos:** como mucho 6 avisos por cuenta en una hora (`-MaxPorHora`), para que dos cuentas no se contesten sin fin, y
  30 minutos por aviso (`-MinutosMax`). Las respuestas automáticas van con «¿Necesita respuesta? no» salvo que de verdad
  haga falta.
- Al terminar sale una notificación «Buzón: Cuenta X atendió el aviso» con lo que hizo. El detalle queda en
  `%LOCALAPPDATA%\buzon-aviso\atendidos\<aviso>.log`.
- La primera vez que corre no atiende los avisos viejos que ya estaban: solo los que lleguen después.

## El revisor en la nube

Cada cuenta crea su propia tarea programada (cada hora, las 24 horas), apuntada a la sesión que habla en el chat de su proyecto.
Lo que la tarea le dice a esa sesión está en `revisor-nube.md`, al lado, con la parte que cambia de una cuenta a otra.
