# La galería de lecciones también como artefacto: análisis y preguntas

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-26 01:54 UTC
- **Repo o área:** `cantu-revisiones` (la galería) y `cantu-lessons`; los dos son tuyos
- **Qué pide:** tu opinión y qué implicaría en tus repos. Es análisis, no una decisión ni un encargo. ¿Necesita respuesta? sí
- **El encargo, si lo hay:** — (no hay; cuentachris no toca tus repos)
- **Palabras del operador:** abajo, tal cual.

## Lo que dijo Chris

> especificamente galeria de lecciones es tricky, porque la galeria, si me gusta que se ejecute ahorita localmente en una laptop porque ahi tengo github pero no tiene que tener claude instalado
>
> basta con que vote y yo lo controlo remoto
> pero aqui que tengo instalado claude meg usta mas los artefactos ahi me gusta tener validas ambas opcinoes

> vamos a analizar lo de las lecciones es lo que causa mas ruido
>
> pero primero pasale todo este analisis a la cuenta de pato que esta manejando ese proyecto y ahi lo reviso que opinas?

## Lo que quiere Chris

Dos formas de usar la galería, las dos válidas:

1. **La de hoy, local**, en una laptop que tiene GitHub pero no Claude. Ahí se vota, y Chris la maneja a distancia.
2. **Además, como artefacto de Claude.** Cada versión de la galería se publica como una página en claude.ai que Chris abre desde
   cualquier computadora donde tenga Claude, sin ejecutar nada en ella.

## Lo que se ve desde aquí (leído en `cantu-revisiones`, main `2b81e073`; nada se cambió)

- **La galería local es un servidor**, no una página suelta: «Sincronizar», «Reiniciar», la huella del código, las rondas viejas
  que lee de la historia de git. Un artefacto es una página fija: nada de eso viaja con él. Sería una copia para mirar y votar,
  no la plataforma entera.
- **Los votos de la versión local sí llegan al repo:** se guardan en `galerias/<ticket>/respuestas.json` («claves», con
  `v:<lección>:<opción>` para votos y `c:…` para comentarios) y «Sincronizar» los sube con git.
- **El peso:** `galerias/` pesa unos 504 MB y `lecciones/` unos 155 MB. Un artefacto aguanta unos 256 MB en total, así que la
  plataforma entera no cabe. **Una galería de un ticket sí cabe:** las más grandes pesan 40 a 71 MB (`CR-GS`, `CR-GW`, `RW-61`) y
  muchas mucho menos.

## Lo que falta resolver: dónde quedan los votos del artefacto

En el artefacto los votos se pueden guardar dentro del propio artefacto, pero **no llegan solos al repo**.

**Propuesta para discutir:** que el artefacto tenga un botón «Copiar los votos» que dé el mismo formato de `respuestas.json`
(las mismas «claves»). Chris lo pega en un hilo, y quien lleve la galería lo junta en `galerias/<ticket>/respuestas.json` con la
misma lógica que ya junta los votos de dos aparatos (CR-PL·02, `servidor/juntar.mjs`). Así la galería local no se entera de
dónde se votó.

## El contexto

- **En el dashboard ya se trabaja así:** cada versión del prototipo se publica como artefacto y el código queda en
  `metodo-cantu-dashboard`. Los prototipos de la landing podrían seguir el mismo modelo.
- **Publicar en metodocantu.com (Moodle)** queda para un proyecto aparte, más adelante. Esto no lo toca.

## Lo que te pregunta Chris

1. ¿Qué opinas de tener las dos formas a la vez?
2. ¿Qué implicaría en `cantu-revisiones` y `cantu-lessons`: quién arma el artefacto de cada galería, y con qué?
3. ¿Te sirve la propuesta del botón «Copiar los votos», o ves una forma mejor de juntarlos?
4. ¿Qué partes de la galería no tienen sentido en el artefacto (por ejemplo «Sincronizar» o las vistas «Hoy»)?

Chris lo revisa contigo en tu Project. Cuentachris no hace nada más con esto hasta que contestes.
