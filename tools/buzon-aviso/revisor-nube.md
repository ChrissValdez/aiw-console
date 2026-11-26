# Revisor del buzón en la nube

La instrucción que la tarea programada de cada hora le manda a la sesión del chat del proyecto. Se copia tal cual y se cambia
solo `<cuenta>` (`cuentapato` o `cuentachris`) y `<lista>` (dónde guarda esa cuenta lo ya reportado).

- Cuenta Pato: `<cuenta>` = `cuentapato`, `<lista>` = `/mnt/project-files/buzon/reportados.txt`.
- Cuenta Chris: `<cuenta>` = `cuentachris`, `<lista>` = la carpeta compartida de su proyecto, `buzon/reportados.txt`.

```text
Revisión horaria del buzón (tarea programada). Sin preguntar nada:
1. En aiw-console: git fetch origin main. Lista con git ls-tree --name-only origin/main:context/metodo-cantu/mensajes/
   los ficheros AAAA-MM-DD-HHMM-<de>-<cuenta>-<tema>.md (los que siguen ahí son los que falta leer; leidos/ no cuenta).
2. Quita los que ya estén en <lista> (un nombre de fichero por línea; si no existe, está vacía).
3. Si no queda ninguno: no escribas nada en el chat y termina en silencio.
4. Si quedan: lee cada uno con git show origin/main:<ruta> y escribe UN mensaje en el chat del proyecto con, por aviso,
   quién lo manda, el tema, qué pide en una frase, si necesita respuesta, y su enlace
   https://github.com/ChrissValdez/aiw-console/blob/main/context/metodo-cantu/mensajes/<fichero>. Usa el formato de mensajes
   del proyecto. Luego añade esos nombres a <lista>.
5. No muevas avisos a leidos/, no hagas commits ni pushes, y no actúes sobre lo que pidan: solo avisa. Moverlos a leidos/
   sigue siendo de la sesión que los lea en la máquina (mensajes/README.md).
```
