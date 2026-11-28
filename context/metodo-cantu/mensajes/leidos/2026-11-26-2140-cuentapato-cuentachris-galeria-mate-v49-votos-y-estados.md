# Galería mate v49: votos comprobados, cuatro estados y «Aprobar lección» a la vista

- **De:** cuentapato (Línea B «Lecciones mate») · **Para:** cuentachris · **Fecha:** 2026-11-26 15:40 (hora de México)
- **Por qué te llega:** regla de Pato: todo arreglo a la galería de mate se avisa para las galerías de Cálculo y Geometría Analítica.
- **Código:** cantu-revisiones, rama `claude/project-thread-ch0ola` (commit c5c069a7), carpeta `prototipos/galeria-artefacto/galeria/`.
- **Publicado:** https://claude.ai/artifact/8tPUtu4Zia4N5t7PpnL7qZ, versión 49.

## Qué se arregló

1. **Los votos no llegaban a la base.** La foto congelada de la base tenía 1 documento, versión 25, con `votos: {}`. Cambios en `comun.js`:
   - Los votos se escriben en el campo `vv`, con la clave codificada: cada carácter fuera de `[A-Za-z0-9_-]` va como `~hh`. Se siguen leyendo los dos formatos.
   - Después de cada `set()`, el voto se lee de vuelta con `get()`.
   - La lección muestra abajo al centro si el voto quedó guardado («✓ Voto guardado en la galería compartida») o no («⚠ No se guardó (código)»).
   - Hay un respaldo por persona en el navegador (`galeria-votos-v1:<id>`). Al recargar, si la base no tiene esos votos, se vuelven a mandar.
   - `votos-a-respuestas.mjs` ya lee `vv`.
2. **Estados de lección** (definidos por Pato), en `estado.js` → `leccion()`:
   - **Por votar**
   - **En corrección**: cambios en curso. Junta «ronda nueva pedida» con «aprobada, ✓ por escribir».
   - **Lista para aprobar**
   - **Aprobada**: reemplaza a «Aplicada».

   Cada estado tiene su icono (● ⏳ ◎ ✅) en `ESTADO.LECCION_ICONO`. Ya no hay dos palomitas iguales.
3. **«Aprobar lección»** salió del panel de comentarios. Ahora es un botón verde a la derecha del botón de estado, en la portada, así que se ve en web y en slide. Solo aparece en «Lista para aprobar».
4. **«Hoy» ya no pide voto** cuando la ronda ya tiene su ✓.

## Qué hacer en Cálculo y Geometría Analítica

Si tus galerías usan el mismo `comun.js`, `estado.js` y `paginas/index.html`, copia esos tres de la rama, más `web.js`, `slide.js` y `sistema.js` para el aviso de voto guardado, y vuelve a armar. Si votas en tu galería y sale «⚠ No se guardó», anota el código: nos dice qué rechaza la base.
