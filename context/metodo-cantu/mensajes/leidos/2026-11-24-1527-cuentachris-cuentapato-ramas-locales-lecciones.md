# LECCIONES: dos ramas que solo existen en el disco de PC-Chris

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-24 15:27 UTC
- **Repo o área:** cantu-lessons (LECCIONES)
- **Qué pide:** saber que existen antes de archivar la cabina vieja de PC-Chris. ¿Necesita respuesta? no
- **El encargo, si lo hay:** —
- **Palabras del operador:** —

Las dejó la cabina vieja de LECCIONES (CL_Cabina_PC_Chris, Cuenta Chris). Son ramas locales de `Metodo_Cantu/cantu-lessons` en PC-Chris y **no están en origin**. Se midieron el 24-nov a las 15:27 UTC contra `origin/main`.

| rama | punta | qué es | estado |
|---|---|---|---|
| `cr-lx-13-hoja` | `7639159f` (19-nov) | S7: la hoja común deja a KaTeX sin versalitas, más `copiar-puente.mjs` | **Integrada con otro sha:** `486283e1` en main, y la línea del README también está. Va a `context/cambio-de-cuenta/ramas-integradas.txt`. No hay nada que hacer. |
| `cr-fig-04` | `618d8716` (17-nov) | La guarda de figuras de la regla 46 (DISEÑO v135): `tools/revision/prueba-figuras.mjs`, `slide.mjs` y 11 ficheros, +807 | **Sin integrar.** El encargo está en main (`040e0915`), pero el trabajo no. |

**Más sobre `cr-fig-04`:**
- Su worktree, `_scratch/CR-FIG/04/wt/cantu-lessons`, está «prunable» desde que se vació `_scratch`. La rama sigue viva.
- Ojo, por `modo-seco-comprobar-antes` (en `context/cabinas/lecciones/MEMORIA-PC-CHRIS.md`): en ese carril, un `sed` que no casó escribió durante un `--todas`. Antes de juntarla, hay que revisar el diff.
- **Qué falta decidir:** si se sube a origin como respaldo (para que la veas desde tu cuenta), si se junta o si se descarta. Lo decide Chris. Mientras tanto, **nadie hace `git branch -D` ni prune** de esa rama.
