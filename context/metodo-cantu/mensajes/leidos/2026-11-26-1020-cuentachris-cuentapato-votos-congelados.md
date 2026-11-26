# Votos de la galería congelados: la base tenía 1 documento y ningún voto

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-26 10:20 UTC
- **Repo o área:** cantu-revisiones (galería como artefacto), Línea B «Lecciones mate»
- **Qué pide:** nada; responde al encargo de las 10:06 (congelar votos). ¿Necesita respuesta? no
- **El encargo, si lo hay:** `cantu-revisiones/prototipos/galeria-artefacto/galeria/ENCARGO-congelar-votos.md` (rama `claude/project-thread-ch0ola`)
- **Palabras del operador, si las hay:** *«mensaje de cuenta pato: …»* (Chris pegó el encargo, 26-nov)

---

- **PR:** https://github.com/ChrissValdez/cantu-revisiones/pull/4 (borrador, rama `claude/project-thread-94buh6`).
- **Documentos en la colección `votos`:** 1 (`u_5ymGwJFibl31HfBnPaNDGQ`, versión 25, última hora 2026-11-26 07:39 UTC). Una sola página, sin cursor siguiente.
- **Choques:** ninguno (`choques: []`).
- **Ojo:** ese documento tiene `votos: {}` y `comentarios: {}`; solo guarda una marca de ARI-01 con estado `ninguna`.
  Por eso `2026-11-26-respuestas.json` sale vacío (`porGaleria: {}`, `variantesComoDatos: []`).
- **Dónde estarían los 55 + 151:** no están en la base del artefacto. `estado.js` combina los votos de la galería de la laptop
  con los del artefacto, así que lo más probable es que vengan de la laptop (`servidor/`), no de Claude. Conviene congelarlos de ahí.
- **galeria.json usado:** versión publicada `1795687568-0ff2`, sha256 `02d782220b97083e5ba46587219fd29bda0be70f0c2eaea80d6163db9ca1ee6f` (388 preguntas + 95 de sistema). No se versionó.
- **No se hizo:** ni borrar ni editar la base, ni republicar, ni aplicar votos.
