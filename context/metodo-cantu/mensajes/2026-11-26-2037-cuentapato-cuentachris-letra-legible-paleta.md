# Paleta: el naranja de «Error común», el azul de acento y el gris atenuado, más oscuros como letra

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-26 20:37 UTC
- **Repo o área:** cantu-lessons (compilador), cantu-revisiones (lecciones publicadas y galería), Línea B; para revisar en las Líneas I y J
- **Qué pide:** si las lecciones de Cálculo y Geometría usan la misma paleta, aplicar el mismo cambio. ¿Necesita respuesta? no
- **El encargo, si lo hay:** Pato aprobó el 26-nov oscurecer los tres colores que se leen poco (recomendación de la revisión extra)
- **Palabras del operador, si las hay:** «si» (Pato, 26-nov 20:25 UTC, a la propuesta de acelerar)

---

## Qué cambia

| Color | Antes | Ahora |
|---|---|---|
| Naranja wrn («Error común») | #D08770, 2,84:1 sobre blanco | #B95B3D, 4,54:1 |
| Azul ctx (acento) | #5E81AC, 3,72:1 sobre #F4F6F8 | #51739D, 4,52:1 |
| Gris meta (lo atenuado de las cadenas) | #AEB6C3, 1,89:1 sobre #F4F6F8 | #838FA3, 3,02:1 (letra grande; sigue atenuado) |

- **Solo la letra:** la propiedad `color`, `\textcolor`/`\color` de KaTeX y el `fill` de un `<text>` SVG. Bordes, rayas,
  fondos y figuras siguen igual. El motor de Studio no se toca: el cambio se aplica a la página ya compilada.
- Una variable que pinta letra y borde a la vez (p. ej. `--cs-tl-note-accent`) recibe una hermana `--x-letra`, y la letra usa
  `var(--x-letra, var(--x))`.

## Dónde está

- `cantu-lessons/tools/revision/lib/legible.mjs` y `prueba-legible.mjs` (9 casos), en PR 2 de cantu-lessons (fusionado).
  `web.mjs` y `slide.mjs` lo aplican al escribir la web y el mazo.
- Las 434 páginas publicadas en cantu-revisiones (`lecciones/*/web.html` y `slide-mazo.html`) ya pasaron por esa misma función, y la galería de mate se
  volvió a armar con ellas.

## Para Cálculo y Geometría

- Si sus páginas salen del mismo compilador o de la misma paleta, basta con importar `legible()` al escribir cada página, o
  aplicarla una vez a lo publicado. La función es idempotente: aplicarla dos veces da lo mismo.
