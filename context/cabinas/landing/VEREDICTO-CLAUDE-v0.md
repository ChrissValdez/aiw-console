# Veredicto sobre el `CLAUDE.md` v0 de la cabina LANDING (primera sesión, 4 al 6 de noviembre de 2026)

> Lo pide el propio contrato (punto 6 de «La primera sesión»): al cerrar, decir qué sirvió, qué faltó y qué estorbó. Lo
> escribió la cabina LANDING el 2026-11-06, al quedar en espera de nuevo feedback.

## Qué sirvió

- **«Sus palabras van al disco, tal cual»:** son 13 ficheros en `veredictos/` (medido el 6-nov a las 05:13). Cuando dijo «retro» y luego aclaró
  «académico, no videojuego», la diferencia estaba escrita y se pudo rastrear.
- **«Una sola versión, completa y a pantalla completa»:** evitó repetir el error del comparador.
- **«Lo que impone Moodle»:** los tres prototipos para Moodle salieron con cero corchetes y cero `<svg>` sueltos a la
  primera.
- **La sección de Git:** el commit por ruta, el push por sha y la revisión de `origin/main..HEAD`. No hubo choques con
  otros hilos en `aiw-console`.
- **«Los talleres los lanza la cabina»:** los tres prototipos en paralelo, con un contenido común (`CONTENIDO.md`) para
  que se compararan por diseño y no por texto, fue la ronda más útil del hilo.

## Qué faltó (ya está en el contrato como puntos 8 a 10, o en el relevo)

- **Que lo que él revisa va al repo, no a `_scratch`** (punto 8). La cabina dejó una copia en `_scratch` y él lo corrigió.
- **Nunca Fable** (punto 9). La cabina lanzó un taller con Fable porque él lo pidió. Gastó muchos tokens y él lo prohibió.
- **No generar prototipos sin su feedback** (punto 10).
- **Que él les escribe directo a las sesiones anidadas.** Hay que leer sus transcripciones para no perder sus palabras.
  Está en el relevo.
- **Cómo capturar y medir:** Chrome, el `puppeteer-core` de `cantu-lessons`, SwiftShader para el 3D y que la PC tiene
  apagadas las animaciones. Está en el relevo.
- **Una guarda de hora:** dos commits salieron con la hora equivocada, por suponerla. Mirar `date` antes de escribirla.

## Qué estorbó

- **El punto 3 («buscar referencias») dio poco:** seis referencias y ninguna le gustó. Las dos que sí le encantaron las
  trajo él (Oryzo y Dala), y son demos de estudios, no de su giro. Para la próxima: pedirle primero 2 o 3 sitios que le
  gusten, de cualquier giro, y analizar esos.
- **El punto 4 («pedirle sus paquetes») se repitió en casi cada mensaje** y nunca llegó. Pedir los datos de negocio una
  vez, con una lista, y no bloquear nada por ellos.
- **El punto 5 («una sola versión, hecha aquí»)** chocó con la separación cabina/taller. Lo que funcionó fue que la
  hicieran talleres, con la cabina midiendo y publicando.
- **La tabla «Dónde vive todo» y el relevo** quedaron cortos en pocas horas. El relevo se reescribió entero al cierre en
  lugar de seguir sumando párrafos.
