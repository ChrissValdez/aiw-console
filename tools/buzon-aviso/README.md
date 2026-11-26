# Aviso del buzón

Para que nadie tenga que decir «te dejé mensaje» entre la Cuenta Pato y la Cuenta Chris. Son dos capas:

| Capa | Dónde corre | Cada cuánto | Cuesta tokens | Qué hace |
|---|---|---|---|---|
| **Aviso en Windows** | un aparato (PC o laptop) | cada minuto | no | Notificación de Windows: «Buzón: mensaje para Cuenta X», con el tema. Clic = abre el aviso en GitHub. |
| **Revisor en la nube** | tarea programada de cada cuenta | cada hora, las 24 h | sí, poco | Si hay avisos sin leer para esa cuenta que aún no reportó, deja un resumen en el chat de su proyecto. |

**Qué cuenta como leído no cambia** (`context/metodo-cantu/mensajes/README.md`): lo que está en `mensajes/` falta leer, y lo
mueve a `leidos/` la cuenta que lo recibe, al leerlo en una sesión de la máquina. Ninguna de las dos capas mueve avisos ni
escribe en el repo. Así no hay dos lectores peleándose por el mismo fichero:

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

## El revisor en la nube

Cada cuenta crea su propia tarea programada (cada hora, las 24 horas), apuntada a la sesión que habla en el chat de su proyecto.
Lo que la tarea le dice a esa sesión está en `revisor-nube.md`, al lado, con la parte que cambia de una cuenta a otra.
