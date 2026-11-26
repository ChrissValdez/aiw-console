# La galería como artefacto pasa a la Cuenta Chris (temporalmente)

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-26 04:30 UTC
- **Repo o área:** cantu-revisiones (Galería Matemáticas), y después Español
- **Qué pide:** seguir trabajando la galería como artefacto a partir del prototipo aprobado; el trabajo pasa a la Cuenta Chris por ahora y después regresa a la Cuenta Pato. ¿Necesita respuesta? sí: avisa por aquí cuando lo tomes y cuando lo regreses.
- **El encargo:** `cantu-revisiones/prototipos/galeria-artefacto/README.md` (PR #2: https://github.com/ChrissValdez/cantu-revisiones/pull/2). Ahí va la especificación completa, cómo está armado y las trampas del artefacto.
- **Palabras del operador:** *«Me gusta mucho más como prototipo, falta implementarlo en la galería, pero eso lo haré después; como primer prototipo me gusta. Podemos mandárselo a la otra cuenta así y allá seguirlo trabajando, porque sigue aplicarlo a la galería.»* (Pato, 2026-11-26)

## Lo aprobado

- Prototipo de ARI-01: https://claude.ai/artifact/DqZag4gc8rJp7rzJsuCHCQ. Es privado: Pato lo comparte contigo como **Editor** (como Lector no se puede votar).
- Las variantes se ven **dentro de la lección web y dentro de la slide**, no en una galería aparte con guiones.
- La pastilla de variantes va junto al código de la sección o de la slide.
- Cada variante lleva **tres votos**: ✗ no me gustó · ~ de referencia · ✓ la definitiva.
- **Colores** en la pastilla: verde, ámbar o rojo según el voto, y un punto ámbar en las que faltan.
- **ⓘ** junto a 💬 abre un recuadro pegado al botón con:
  - la pregunta en negritas;
  - **R=** la respuesta de esa variante;
  - **Dónde:** el lugar exacto con código, o «En todas las lecciones de Aritmética» si el cambio es de muchas;
  - **Por qué:** escrito para un maestro, diciendo qué se pidió, sin mandar a leer la ronda ni copiar el comentario.
- Cada **comentario** se guarda con la variante que se está viendo.
- **Flechas** de voto anterior y siguiente abajo a la derecha, que no bloquean avanzar.
- **👁** para la vista limpia, con la ✓ de cada sección o slide.
- En el artefacto no van **Sincronizar** ni **Reiniciar**, ni un botón **«Copiar los votos»**.
- El maestro normal vota y comenta; la aprobación final de cada lección sigue siendo de Meche y Chris.
- **Opción 2 recomendada:** guardar las variantes web como datos (`<lección>.web.variantes.json`, igual al de la slide) y compilar cada alternativa. En el prototipo se armaron a mano.

## Por dónde empezar

1. **Aplicarlo a la galería real mostrando solo 3 lecciones de Aritmética**, para probar el navegador, la interfaz y la base.
2. **Analizar cómo mostrar los votos sistemáticos**: el modo actual deja mucho que desear y vale la pena mejorarlo.
3. Después, **la galería de Español** con el mismo diseño, ya aprobada la de Matemáticas.

El aviso anterior de la galería (`2026-11-26-0154-…-galeria-como-artefacto.md`) sigue pendiente de analizar con Chris.
