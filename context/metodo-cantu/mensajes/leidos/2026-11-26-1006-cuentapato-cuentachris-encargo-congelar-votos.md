# Encargo completo: congelar los votos de la galería (va aquí porque la rama no se abre desde el teléfono)

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-26 10:06 UTC
- **Repo o área:** cantu-revisiones (galería como artefacto)
- **Qué pide:** lo mismo que el aviso de las 09:59, con el encargo entero aquí. ¿Necesita respuesta? sí (otro aviso con el PR)
- **El encargo, si lo hay:** copia de `cantu-revisiones/prototipos/galeria-artefacto/galeria/ENCARGO-congelar-votos.md` (rama `claude/project-thread-ch0ola`)
- **Palabras del operador, si las hay:** *«no puedo abrir Encargo de guardar votos dame prompt aqui»* (Pato, 26-nov)

---


- **Para:** cuentachris (el artefacto es de su organización; desde cuentapato su base no se puede leer)
- **Escrito:** 2026-11-26 por cuentapato, Línea B «Lecciones mate»
- **Artefacto:** https://claude.ai/artifact/8tPUtu4Zia4N5t7PpnL7qZ (versión 38: las 217 lecciones, sin muestras)
- **Por qué:** antes de aplicar las 55 reglas de sistema y los 151 ✓ de lecciones, hay que dejar en el repo una foto fija
  de lo que se votó y comentó en el artefacto. Si no, al recompilar se pierde el rastro de qué decisión trajo qué cambio.

## Qué hacer (solo leer y guardar; no aplicar nada)

1. Leer **toda** la colección `votos` del artefacto con la herramienta de datos del artefacto (`ArtifactData`, acción
   `list`, colección `votos`; seguir la paginación hasta el final). Cada documento es una persona: lleva `votos`,
   `comentarios` y `lecciones` (estado y envíos por lección).
2. Leer del mismo artefacto el fichero publicado `datos/galeria.json` (`Artifact` acción `read`, `path`).
3. En `cantu-revisiones`, en una rama nueva:
   - guardar la colección tal cual en `prototipos/galeria-artefacto/votos-congelados/2026-11-26-votos.json`;
   - correr `node prototipos/galeria-artefacto/galeria/votos-a-respuestas.mjs <ese votos.json> <ese galeria.json>` y
     guardar lo que imprime en `prototipos/galeria-artefacto/votos-congelados/2026-11-26-respuestas.json`;
   - `git add` de esos dos ficheros por nombre (nunca `-A`), commit, push y PR.
4. Avisar por el buzón (`aiw-console/context/metodo-cantu/mensajes/`, un fichero nuevo `…-cuentachris-cuentapato-votos-congelados.md`)
   con el enlace del PR, cuántos documentos tenía la colección y si `votos-a-respuestas` reportó choques.

## Qué NO hacer

- No borrar ni editar documentos de la base del artefacto.
- No republicar el artefacto.
- No aplicar votos a lecciones ni a reglas: eso lo hace cuentapato después, por área.

## Prompt para pegar en una sesión de cuentachris

> Lee y ejecuta el encargo `prototipos/galeria-artefacto/galeria/ENCARGO-congelar-votos.md` del repo `cantu-revisiones`
> (rama `claude/project-thread-ch0ola` si aún no está en main). Es solo de lectura sobre el artefacto de la galería:
> exporta la colección `votos` al repo por PR y avisa por el buzón. No apliques ni borres nada.
