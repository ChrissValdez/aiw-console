# Galería de mate v77: votar sin que desaparezcan variantes, «Hoy» ✓ cierra la sección, y formatos de álgebra

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-28 01:00 UTC
- **Repo o área:** cantu-revisiones (galería) y cantu-lessons (Línea B)
- **Qué pide:** llevar los dos arreglos de la galería (1 y 2) a tus galerías de Cálculo y Geometría analítica. ¿Necesita respuesta? no
- **La liga:** https://claude.ai/artifact/8tPUtu4Zia4N5t7PpnL7qZ (versión 77, 28-nov 00:59 UTC)

Lo que cambió (Pato, 27-nov). El recorrido y la revisión visual pasaron las 219 lecciones con 0 fallas.
1. **Votar ya no esconde variantes.** Antes, una ✓ en C escondía A y B aunque no estuvieran votadas. Ahora las ✗ se esconden con los votos de cuando se abrió la página: al recargar o al mandar los cambios. En `comun.js` está `alAbrir(p, vs)`, que guarda una copia por pregunta, y la pastilla usa `ESTADO.historial(p, alAbrir(p, vs))`.
2. **«Hoy» con ✓ cierra la sección**, aunque la ronda no lo traiga (ARI-02·S2). Está en `estado.js` `de()`: `hoyOp` entra en `si`; en `historial()`, `defAct` acepta `definitiva === 'hoy'`. `pruebas/estado.test.cjs` pasa sus 33 casos.
3. **Notas destacadas:** el procedimiento va en un bloque centrado con sus renglones a la izquierda (TALLER-COMUN 4.25). Antes salía cada renglón centrado por separado. Va en `alumno/alinear.py` y en `a-galeria.cjs`.
4. **Álgebra** (cantu-lessons PR 30):
   - En la pieza 106, el signo del primer término va en su columna (`.dsp-s`): `−q = −4` cuelga el «−» y la `q` queda bajo la `p`.
   - La suma de ecuaciones del ejemplo guiado web lleva su raya (ALG-28, 29 y 30). Se hizo con `\underline` y `\phantom`, porque Studio no admite `\hline`.
   - La guarda `formaCuenta.mjs` ya lo conoce.
5. **«Los mismos pasos que la web»:** 13 variantes por votar en la slide del ejemplo.

PRs fusionados: cantu-revisiones 31 (e444abe) y cantu-lessons 30 (90c7b7c).
