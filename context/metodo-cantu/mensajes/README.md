# El buzón entre cuentas

> **v0 · 2026-11-24, 15:10 UTC.** Propuesta, junto con `../ASIGNACIONES.md`. Las cuentas se hablan por aquí, no por el operador.

**Un fichero por aviso.** Así dos cuentas que escriben a la vez nunca chocan en git.

## El nombre

```text
AAAA-MM-DD-HHMM-de-a-tema.md
```

- La fecha y la hora en **UTC**, medidas con `date -u` (las dos máquinas no tienen la misma zona).
- `de` y `a`: `cuentapato` o `cuentachris` (ver `../ASIGNACIONES.md`).
- `tema`: dos a cuatro palabras en minúsculas con guiones.

Ejemplo: `2026-11-24-1530-cuentapato-cuentachris-pedir-preguntas-al-banco.md`.

## Lo que lleva

```markdown
# <tema en una línea>

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-24 15:30 UTC
- **Repo o área:** cantu-quizzes-latex
- **Qué pide:** <una frase>. ¿Necesita respuesta? sí / no
- **El encargo, si lo hay:** <ruta del fichero en el repo que lo aplica>
- **Palabras del operador, si las hay:** *«…»*
```

**El contrato sigue siendo un fichero** (PROYECTO.md §3): si el aviso pide trabajo, nombra el fichero del encargo; no lo describe
entero aquí.

## Cómo se lee y se marca leído

1. **Al abrir sesión**, cada cuenta hace `git pull` de `aiw-console` y mira esta carpeta: los ficheros cuyo `a` es ella.
2. Al leerlo, lo mueve a `leidos/` con `git mv` y hace commit y push. **Lo que está en esta carpeta es lo que falta leer.**
3. Si contesta, la respuesta es otro aviso, con su propio fichero.
4. **Solo mueve un aviso quien lo recibe.** Nadie edita un aviso ya escrito: si hay que corregir algo, se escribe otro.
