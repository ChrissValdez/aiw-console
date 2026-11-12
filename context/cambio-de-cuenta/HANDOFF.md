# HANDOFF de cambio de cuenta

- **De la cuenta principal a la suplementaria.** Es el primer cambio; la suplementaria abre la cabina con el prompt de `PROTOCOLO.md`.
- **Escrito:** 2026-11-12, 14:47 (hora de la PC). Lo escribió la cabina de LECCIONES de la cuenta principal, en la sesión
  `local_3591b566-02e3-4c0e-8bca-146697b7fc03`. Esa sesión se queda esperando la vuelta.
- **`sincronia.mjs`:** EN ORDEN con el commit de esta carpeta. Las puntas eran:
  - cantu-lessons 19a8bb8e;
  - cantu-revisiones f9812a9;
  - aiw-console, el commit de este fichero.
- **Tope semanal de la principal:** 99 %. Se reinicia el viernes 13 de noviembre a las 05:00, hora de la PC.

## LECCIONES

### Hecho y en GitHub

- El bloque 3 de álgebra, «Razones» (ALG-15 a ALG-21), en web y en slides (163 slides), publicado.
  - Registro: f3039bc7.
  - Veredicto: 19a8bb8e.
  - Relevo: a2f66d2.
- Todas las galerías están sincronizadas, hasta el «Sincronizar» del operador del 12-nov a las 12:38: f9812a9 y dbda94b.
- Las herramientas de la cabina están en `projects/aiw-console/context/cabinas/lecciones/herramientas/` (ver su README). Antes vivían
  en la carpeta temporal de la sesión.

### En curso

- **Nada.** Ningún carril está trabajando y no hay ramas de carril sin integrar.
- El vigilante de votos está apagado. Se rearma con `node _scratch/cabina-lecciones/vigilar-votos.mjs 120`, en segundo plano, desde
  `AIW_Workspace`.

### Lo que sigue (solo con el «adelante» del operador)

El 12-nov el operador dijo *«por hoy no avances en nada»*. Son sus tres feedbacks del 11-nov, sin encargo todavía:

1. **El color del bloque 3.** En `SIS-COLOR-BLOQUE-3` (galería CR-AS3) votó V1 Azul acero ✓, V2 Coral ✗ y V3 Lavanda ✗.
   - Ya está escrito en las siete lecciones.
   - Falta pasarlo a DISEÑO como decisión y plegar la vista.
2. **ALG-17·S3, web.** El operador: *«un poco apretado el espaciado entre las lineas de procedimiento»*.
   - Va como encargo a CR-AW3.
   - Antes, mirar si pasa también en otras lecciones.
3. **ALG-05·D2, slide, alcance general.** La nota «Error común» sale con un fondo que el operador no aprobó, en varias slides y
   lecciones.
   - Su modelo es ARI-17·D3.
   - Pide revisar todas las slides y corregirlas.
   - Es de sistema: va a CR-SIS, con un censo de todas las lecciones.
   - Su texto completo está en `cantu-revisiones/galerias/REVISADAS/respuestas.json`, clave `com:ALG-05-20261111-192706`.

`pendientes.mjs` da 🚧 0 y no cuenta estos dos comentarios: hay que revisarlo.

### Espera del operador

- Votos de la web en CR-AW3: ALG-15·S2 (el carril recomienda la 2) y ALG-18·S4 (recomienda la 4). Si cambian, CR-AS3 rehace
  ALG-15·D6 y ALG-18·D15 a D17.
- ALG-06·EG: su voto otra vez.
- Sí o no a las secciones «solo Reto»: capital y tiempo en ALG-17, ingredientes y mezclas en ALG-19 (la recomendación es no).
- La revisión de las slides del bloque 3.
- De antes:
  - el voto de ALG-14·S2;
  - el cálido de ALG-03;
  - la ronda de mezclas de ALG-13·S3;
  - A+;
  - la rama de respaldo de la laptop.

### Ojo

- **Las sesiones de los carriles (CR-AW3, CR-AS2/AS3, CR-RS, CR-SIS…) son de la cuenta principal.** En la suplementaria no
  aparecen: se abren nuevas desde su Arranque y su relevo, en `cantu-lessons/docs/carriles/`.
- **No se toca:**
  - el servidor 8791 del operador, su navegador ni `respuestas.*`;
  - ninguna cabina vota.
- **Las pruebas,** en el 8795 o en los puertos de los carriles.

## Otras cabinas (no bloquean; que las vea su cabina)

- cantu-studio: `tools/studio/editor-ui/package-lock.json` modificado. La cabina está en pausa (D-079).
- phd-p2-experiment: 8 cosas sin commitear, seis carpetas en `data/manual/se_*` y `data/tutor-configs/v2.json` y `v3.json`. Son de su
  cabina.
