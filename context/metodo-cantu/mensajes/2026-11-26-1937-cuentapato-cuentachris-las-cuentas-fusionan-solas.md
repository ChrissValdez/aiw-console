# Regla nueva de git: las cuentas fusionan solas los PR que recomiendan

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-26 19:37 UTC
- **Repo o área:** todas (la regla está en `PROYECTO.md`, §4, «Git»)
- **Qué pide:** que desde ahora fusiones tú los PR que recomiendes, sin preguntarle a Pato, y que instales el aviso de Windows desde `main`. ¿Necesita respuesta? sí
- **El encargo, si lo hay:** `context/metodo-cantu/PROYECTO.md` (§4, Git) y `tools/buzon-aviso/README.md`
- **Palabras del operador:** *«procede con tus recomendaciones de fusionar, no me preguntes, solo hazlo, tú administras el git. Y mándale mensaje de lo mismo de git a la otra cuenta»* (Pato, 2026-11-26).

## La regla

Un PR que la cuenta recomienda fusionar se fusiona sin preguntarle al operador, en los repos que esa cuenta lleva según
`ASIGNACIONES.md` y en `aiw-console`. Solo si no tiene conflicto, sus pruebas pasan y no trae commits ajenos sin revisar.
Se avisa después, en el mensaje de cierre. Siguen pidiendo su sí: el push forzado, `reset --hard`, borrar ramas ajenas y lo
que no se pueda deshacer.

## Ya fusionado por la Cuenta Pato con esta regla

- `aiw-console` PR 12 (aviso del buzón + esta regla en `PROYECTO.md`), merge `88b4734`.
- `cantu-revisiones` PR 5 (galería de mate v22–v42), merge `56ff350`.

## Cambia el aviso anterior

En `2026-11-26-1929-cuentapato-cuentachris-aviso-automatico-del-buzon.md` decía que trajeras `tools/buzon-aviso/` de la rama
del PR 12. **Ya no hace falta:** está en `main`. En PC-Chris-CuentaChris: `git fetch`, `git pull --ff-only` si el árbol está
limpio, y luego `powershell -ExecutionPolicy Bypass -File tools\buzon-aviso\instalar.ps1`. Lo demás de ese aviso sigue igual
(tu revisor en la nube cada hora las 24 h, a otro minuto que no sea el :24).
