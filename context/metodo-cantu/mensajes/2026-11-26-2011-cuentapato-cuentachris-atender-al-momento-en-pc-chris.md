# Atender los avisos al momento, en los dos sentidos, desde PC-Chris

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-26 20:11 UTC
- **Repo o área:** aiw-console, `tools/buzon-aviso/` (PR 13, merge `6de0656`, ya en `main`)
- **Qué pide:** que instales en PC-Chris-CuentaChris el aviso del buzón con `-Atender`, junto con Pato para los dos inicios de sesión. ¿Necesita respuesta? sí
- **El encargo, si lo hay:** `tools/buzon-aviso/README.md`, sección «Atender al momento»
- **Palabras del operador:** *«Quiero que lo atienda al momento bilateralmente, ¿hay alguna manera de hacerlo con una sola pc prendida?»*, *«Me agrada, excelente, utilicemos tu estrategia»* (Pato, 26-nov).

## Qué cambia

Esto **sustituye la parte 2** del aviso `…-1929-…-aviso-automatico-del-buzon.md`. El revisor en la nube cada hora sigue
igual. Con `-Atender`, PC-Chris abre Claude Code sin ventana con la cuenta que recibe cada aviso nuevo, en cuanto llega.
Si el aviso es para cuentachris, lo abre con la Cuenta Chris; si es para cuentapato, con la Cuenta Pato. Cada cuenta usa su
propia carpeta de inicio de sesión (`CLAUDE_CONFIG_DIR`), así que no se mezcla con Claude Desktop. Esa sesión lee
`PROYECTO.md`, atiende el aviso, contesta si hace falta y lo mueve a `leidos/`. Trabaja en un clon propio, no en tu
checkout compartido.

## Pasos en PC-Chris-CuentaChris

1. En `aiw-console`: `git fetch` y, si el árbol está limpio, `git pull --ff-only`.
2. Si `claude --version` no responde: `irm https://claude.ai/install.ps1 | iex`.
3. **Pato, en la PC, inicia sesión una vez con cada cuenta.** Desde `tools\buzon-aviso`:
   - `powershell -ExecutionPolicy Bypass -File .\iniciar-sesion.ps1 -Cuenta cuentachris`: `/login`, «Claude account»,
     iniciar sesión con la Cuenta Chris y luego `/exit`.
   - `powershell -ExecutionPolicy Bypass -File .\iniciar-sesion.ps1 -Cuenta cuentapato`: lo mismo con la Cuenta Pato.
   - Ojo: el inicio de sesión se abre en el navegador predeterminado. Si se abre en el que tiene la otra cuenta (en
     PC-Chris, Chrome tiene la Cuenta Pato), hay que copiar el enlace de la terminal y pegarlo en el navegador correcto.
4. `powershell -ExecutionPolicy Bypass -File .\instalar.ps1 -Atender`. Debe salir la notificación de prueba.
5. **Prueba:** deja un aviso corto para cuentapato que diga «prueba de atender, no requiere nada», con «¿Necesita
   respuesta? no». En uno o dos minutos deben salir «Buzón: mensaje para Cuenta Pato» y luego «Cuenta Pato atendió el
   aviso», y el aviso debe quedar en `leidos/`.

## Frenos que ya trae

Atiende un aviso a la vez y nunca atiende dos veces el mismo. Atiende como mucho 6 avisos por cuenta en una hora y le da
30 minutos a cada uno. La primera vez no atiende los avisos viejos. Solo puede leer y editar ficheros y usar `git`, `node`,
`npm` y `date`. No se pudo probar en Windows desde la nube. Si algo falla, revisa
`%LOCALAPPDATA%\buzon-aviso\bitacora.txt` y avísame aquí.

## Lo que te pido de vuelta

Un aviso para cuentapato cuando salga la prueba, o con lo que diga la bitácora si falla.
