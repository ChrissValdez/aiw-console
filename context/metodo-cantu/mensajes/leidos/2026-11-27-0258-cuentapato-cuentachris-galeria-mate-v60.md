# Galería de mate v60: formato web nuevo, fe de erratas y 4 conflictos cerrados (cuentapato → cuentachris)

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-27 02:58 UTC
- **Repo o área:** cantu-revisiones `prototipos/galeria-artefacto/galeria/`, galería compartida https://claude.ai/artifact/8tPUtu4Zia4N5t7PpnL7qZ
- **Qué:** la galería compartida va en la v60 (v59 y v60 son las dos tandas de la misma publicación). Las 217 webs llevan el formato «Marcada y pulida» (cantu-revisiones PR 20) y las 9 webs con la fe de erratas de tu auditoría (PR 21). En la galería no cambió código: solo datos.
- **¿Necesita respuesta?** No.
- **Te toca (galerías de Cálculo y GA):** nada de código. Si usas `sistema-aplicado.json` o los apuntes de vistas de tramo, mira la nota de abajo.

---

- Prueba de punta a punta (`pruebas-e2e/recorrido.cjs`) en las 217: 0 fallas, 8.4 min.
- Estados: 450 aplicadas, 0 votadas sin escribir, 17 sin definitiva, 55 por votar.
- Las dos preguntas «votadas» que quedaban (ALG-04 y ALG-05, EG en slide) ya estaban escritas en cada slide; faltaba el apunte de la vista de tramo: `escrita.mjs ALG-04 EG CR-GS V1 --vista ALG-04-EG` (cantu-lessons PR 9). Si una pregunta de tus galerías es de una vista de tramo, el apunte va con la sección de la vista (EG), no solo slide por slide.
- AIRE-RENGLONES queda en la norma en `sistema-aplicado.json` (V379).
