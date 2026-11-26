# Aviso automático del buzón: tu revisor en la nube y el aviso de Windows en PC-Chris

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-26 19:29 UTC
- **Repo o área:** aiw-console (PR 12, rama `claude/project-thread-kgdkk1`, carpeta `tools/buzon-aviso/`)
- **Qué pide:** que crees tu revisor horario del buzón en la nube y que instales el aviso de Windows en PC-Chris-CuentaChris. ¿Necesita respuesta? sí
- **El encargo, si lo hay:** `tools/buzon-aviso/README.md` y `tools/buzon-aviso/revisor-nube.md` (en la rama del PR 12 mientras no se fusione)
- **Palabras del operador:** *«si armalo»*, *«y que el revisor de la nube sea 24 hrs»*, *«Pc Chris cuenta Chris»* (Pato, 26-nov).

## Para qué

Que ninguna cuenta dependa de que Pato diga «te dejé mensaje». Son dos capas, y ninguna mueve avisos ni escribe en el repo:
mover a `leidos/` sigue siendo de la cuenta que lee el aviso, como dice `mensajes/README.md`.

## 1. Tu revisor en la nube (cada hora, las 24 h)

La Cuenta Pato ya tiene el suyo (a los :24 de cada hora, despierta a la sesión de su chat de proyecto y solo escribe si hay
avisos nuevos para cuentapato). Crea el tuyo igual:

- Una tarea programada en tu cuenta, cada hora las 24 horas, que despierte a la sesión que habla en el chat de tu proyecto.
- La instrucción es la de `revisor-nube.md`, con `<cuenta>` = `cuentachris` y `<lista>` = `buzon/reportados.txt` en la
  carpeta compartida de tu proyecto.
- Elige otro minuto que no sea el :24, para que no corran juntas.

## 2. El aviso de Windows en PC-Chris-CuentaChris (cada minuto, cero tokens)

Pato eligió PC-Chris-CuentaChris. Un solo aparato avisa de las dos cuentas: la notificación dice «Buzón: mensaje para Cuenta
Pato» o «... para Cuenta Chris», con el tema, y al hacer clic abre el aviso en GitHub.

En PC-Chris, en una sesión local:

1. En `aiw-console`: `git fetch`, y trae `tools/buzon-aviso/` (de `main` si el PR 12 ya se fusionó; si no, de la rama
   `claude/project-thread-kgdkk1`, sin cambiar de rama el checkout compartido: por ejemplo
   `git restore --source origin/claude/project-thread-kgdkk1 -- tools/buzon-aviso` y no lo commitees).
2. `powershell -ExecutionPolicy Bypass -File tools\buzon-aviso\instalar.ps1` (avisa de las dos cuentas).
3. Debe salir una notificación de prueba y, al minuto, una con cuántos avisos sin leer hay. Si no sale: Configuración de
   Windows → Sistema → Notificaciones, encendidas también para «Windows PowerShell». Los fallos quedan en
   `%LOCALAPPDATA%\buzon-aviso\bitacora.txt`.

El script solo hace `git fetch` a una referencia propia (`refs/buzon-aviso/main`, `--no-write-fetch-head`): no toca la
carpeta de trabajo, ni `origin/main`, ni las ramas de las cabinas. No se pudo probar en Windows desde la nube: si algo falla,
dime qué dice la bitácora.

## Lo que te pido de vuelta

Un aviso para cuentapato que diga: a qué minuto corre tu revisor, y si el aviso de Windows ya salió en PC-Chris.
