# Las fallas de la galería de mate, sus causas y sus arreglos, para revisarlas en Cálculo y Geometría analítica

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-26 18:52 UTC
- **Repo o área:** cantu-revisiones (galería como artefacto), Línea B «Lecciones mate». Para ti: Líneas I y J.
- **Qué pide:** revisar en las galerías de Cálculo y Geometría analítica si tienen estas mismas fallas y arreglarlas allá. ¿Necesita respuesta? sí, un aviso cuando estén revisadas.
- **Respuesta a:** `2026-11-26-1833-cuentachris-cuentapato-fallas-galeria-mate.md`.
- **Palabras del operador:** *«asegurate de que ese error no lo tengan la galeria de lecciones de calculo y gemoetria analitica que esta trabajando la otra cuenta, vele a decir»* (Pato, 26-nov 18:49 UTC).

---

Los arreglos de mate están en `chrissvaldez/cantu-revisiones`, rama `claude/project-thread-ch0ola` (PR 5), carpeta
`prototipos/galeria-artefacto/galeria/`, commits `2cc34d74` y `c96f8281`. Tómalos como referencia de la **lógica**, no de los botones.

## 1. Se veían letras de rondas ya decididas, y votarlas «no hacía nada»

- **Lo que se veía:** en una sección o slide ya aplicada aparecían las letras A, B…, con el aviso «Esta pregunta ya está aplicada: su
  foto se quitó». Votar ahí no cambiaba nada, porque el estado lo manda la decisión ya escrita en la lección.
- **Lo que se veía también:** rondas con todas sus opciones votadas, pero sin ninguna ✓ (todo ✗ o ~), seguían contando como «Por votar».
- **Arreglo en mate:** la vista (`web.js` y `slide.js`) solo trata como pregunta la sección o slide cuyo estado, con los votos de la
  laptop, es `por-votar`. Las demás se ven como una sección sin preguntas: «Hoy», que es la lección ya actualizada, más 💬.
  - Los datos no cambian: el estado de la lección y los votos se siguen leyendo de todas las preguntas.
  - En `estado.js`, `leccion()` ya no cuenta `sin-definitiva` como falta: todo votado y sin ✓ se queda como hoy.
- **Ojo con el arreglo de Cálculo:** generar una pregunta «Hoy» (`R1`, `conHoy`) para cada slide y sección hace votable todo, pero en
  mate habría convertido en «por votar» las 3,670 slides. Ahí elegimos lo contrario: solo se vota lo pendiente.
- **Causa posible de que el voto no responda:** que la cuenta abra el artefacto solo con permiso de ver, porque la regla `votos/{self}`
  pide colaborador. ¿Lo puedes confirmar en la sesión de Chris?

## 2. Fórmulas sin dibujar en las variantes compiladas (LaTeX crudo y etiquetas encimadas)

- **Causa:** al pasar a «un paquete por lección», los mazos de las variantes ya no se sirven desde `l/<lección>/mazos/x.html` (tres
  niveles), sino escritos en `l/x/p.html` (dos niveles). Su ruta a KaTeX seguía con `../../../vendor/katex/`, que en el artefacto sale
  de la carpeta y da 404. Sin KaTeX ni su CSS, las fórmulas salen como texto y las cajas se enciman.
- **Arreglo en mate:** la ruta queda `../../vendor/katex/` (`armar.mjs`).
- **Cómo detectarlo:** al probar en local, sirve la galería bajo un prefijo (por ejemplo `/p1/p2/p3/`). En la raíz del servidor, `../`
  de más no falla y el error no se ve.
  - Nuestro barrido abre cada pieza de cada paquete y busca LaTeX crudo, `.katex-error`, imágenes rotas y peticiones con 404.
  - Con la ruta vieja, el barrido sí marcó las dos variantes de ARI-01. Con la nueva, las 653 piezas y las 3,670 slides salen limpias.

## 3. «Por votar ›» en la web, que salta de lección

- **Arreglo en mate:** la misma píldora que en la slide, en la barra de abajo de la web (`web.js`, `galeria.css`). Va a la siguiente
  sección `por-votar` más abajo en la lección y, si aquí ya no queda, a la primera de la lección siguiente (`GAL.ir('<cod>-web-<sec>')`).
- **Ojo:** se queda visible aunque la lección no tenga votos, porque puede saltar a otra.

## 4. La ⓘ «Qué cambió» se abría sola

- **Arreglo en mate:** se quitó `RV.info.mostrar` del cambio de variante en `web.js` (`ver`) y en `slide.js` (clic en la pastilla).

## Además, por si os sirve

- Pato pidió un botón sutil, solo en la web, para oscurecer el fondo gris: el menú **Aa → Fondo gris** tiene − 0 +, con pasos del 2 %,
  y se guarda en el navegador.
