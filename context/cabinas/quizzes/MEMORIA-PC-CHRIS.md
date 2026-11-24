# Quizzes: lo que estaba solo en la memoria de PC-Chris

> **Qué es esto.** Las reglas de la cabina de **quizzes** (`cantu-quizzes-latex`, el banco y los exámenes de la PAA). Su contrato está en el repo: `CABINA.md` y `AGENTS.md`; su relevo, `PAA/HANDOFF.md`. Lo pasó el coordinador de Método Cantú (Cuenta Chris, PC-Chris) el 2026-11-24, por orden del operador: *«Sí, a las dos»* (a «¿Les mando el cierre a MC-LandingPage y a CQL_Cabina y paso yo las reglas de la memoria?»).
>
> **Por qué.** Hasta hoy estas reglas solo vivían en la memoria de Claude Code de PC-Chris (`~/.claude/projects/C--Users-chris-Documents-AIW-Workspace/memory/`). Una sesión de la Cuenta Pato, de la nube u otro aparato no las ve. Aquí sí.
>
> **Cómo se lee.** Cada sección `###` es una memoria, copiada tal cual con su fecha. Un nombre entre comillas invertidas (`así`) es otra memoria: está en este fichero, en `context/cabinas/MEMORIA-COMUN.md` o en el de otra cabina (`lecciones/`, `landing/`, `quizzes/`). Donde una regla choque con el CLAUDE.md de la cabina, su relevo o una decisión (`context/DECISIONES.md`), manda lo más nuevo y se avisa. Las rutas y nombres de sesión son de PC-Chris; las horas, de Monterrey salvo que digan UTC.
>
> **Al día.** Es una foto del 24-nov. Lo que cambie de aquí en adelante se escribe en este fichero (o en el CLAUDE.md de la cabina), no solo en la memoria de un aparato.

## Talleres y encargos

### `taller-duplicado-mismo-ticket`

*Memoria de PC-Chris, última edición 2026-09-27.*

El 2026-09-26 (~19:24 CDMX) se lanzaron dos sesiones «Ticket REP-EST» a la vez. Las dos escribían en `_scratch\REP-EST`: la otra sobrescribió mi `lib.js` e `iniciar.js` a los segundos, y mi `iniciar.js` falló porque cargó la `lib.js` de la otra.

**Why:** dos talleres sobre el mismo manifiesto acabarían escribiendo los mismos `.tex` con códigos nuevos distintos o repetidos, y las guardas de MD5 de cada uno detendrían o pisarían al otro.

**How to apply:** al arrancar un ticket de taller, antes de escribir en `_scratch\<ENCARGO>`, comprobar que la carpeta no existe y pasar `ListAgents` para ver si hay otra sesión con el mismo nombre de ticket. Si la hay, no escribir nada más: parar y preguntar a Chris cuál sigue. Ver `talleres-en-ola-paralela`.

### `talleres-en-ola-paralela`

*Memoria de PC-Chris, última edición 2026-09-27.*

Desde 2026-09-26 la cabina lanza "olas" de talleres simultáneos (p. ej. reubicaciones ARI/EST/GEO/FUN + reposición ALG), con superficies disjuntas por ticket.

**Why:** la guarda heredada de ALG-REUBICACION-AVANCE (`aplicar.js`: cualquier cambio fuera de PAA/tickets detiene) habría parado FUN-REUBICACION por los 46 `.tex` que escribían los otros talleres en su ventana.

**How to apply:** en `aplicar.js`/`verificar_final.js` parar solo ante cambios en la superficie propia (Temas del área, img del área, components, logo, Matematicas.tex) y clasificar el resto como cabina / talleres paralelos. Si el juicio cita comparadores de otras áreas, re-verificar al final que siguen existiendo con el mismo contenido y que no son candidatos en los tickets hermanos. Ver `aiw-workspace-conventions` y `computadora-sin-python`.

### `cql-nube-q-lectura`

*Memoria de PC-Chris, última edición 2026-11-05.*

El 2026-11-04 Chris le pidió a la cabina de LECCIONES aprovechar la nube para revisar el contenido de los quizzes de CQL. Quedaron diez encargos en `cantu-quizzes-latex/PAA/tickets/nube-Q/`, en los commits `bfd5b14` y `29f85bb` sobre `1eea9aa`.
- `METODO.md` es el método común: resolver a ciegas, comparar con `\item*`, comprobar cada paso de la retro y reportar con prueba.
- `NUBE-Q1`–`Q6` son Matemáticas del Banco, 3 390 preguntas.
- `Q7`–`Q8` son Español del Banco, 850 preguntas.
- `Q9`–`Q10`, opcionales, son Matemáticas del Diagnóstico y del Simulador, 1 474 preguntas.

Después se sumaron `Q11` y `Q12`, el Español del Diagnóstico y del Simulador (675 preguntas), en `62bc77c`.

**Lo que corrió:** a las 23:31 del 4-nov solo se había lanzado Q1. Terminó a las 23:15 en la rama `claude/keen-planck-02jlr4`, sin ninguna clave mal y con 9 ALTA. Antes de dar por cubierta un área, mirar con ListAgents qué sesiones de la nube existen de verdad.

Cada sesión entrega en su rama, en `informes/NUBE-Qn.md` y en `-hallazgos.csv`, y para a las 07:30 UTC porque el crédito vence a las 07:59 UTC.

**Why:** el INVENTARIO-REVISION-FINAL §6 N.3 de CQL dice que nadie ha leído si las retros dicen la verdad matemática.

**How to apply:**
- La cabina de LECCIONES no integra ni pone fila en el registro de CQL: se avisó a CQL_Cabina, y la integración es suya. Ella trae las ramas y verifica cada hallazgo ALTA.
- Si Chris pregunta por los resultados, mandarlo a esa cabina, o leer las ramas `claude/…` del repo sin escribir.

Véase `cabina-lecciones-claude-code` y `landing-metodo-cantu`.

## Escribir y reponer nuevas del banco

### `escribir-nuevas-banco`

*Memoria de PC-Chris, última edición 2026-09-27.*

En REP-GEO (2026-09-26) se escribieron 25 nuevas de Geometría; lo no obvio:

- **El listón del Reto depende del área.** En `GEO-GA-Recta`, la reubicación (informe-GEO-REUBICACION §4) recalibró la regla R: «dos pasos de Nivel PAA» NO basta, porque el Medio ya encadena 2 (Medio-015). Un Reto nuevo debe construir dos rectas y resolver su sistema o llegar a una cuadrática. Con esa vara solo salieron 8 de 10; los 2 faltantes se declararon.
- **Longitud de retro:** medir con un contador fijo (sin matemática desplegada; la inline cuenta 1) sobre las retros del propio fichero. Los primeros borradores se pasaban del máximo en 6 de 25.
- **Una fórmula en línea como `\(2 : 3\)` en el enunciado produjo un Overfull de clase nueva** en la compilación; en texto («2:3») desaparece. Comparar clases de aviso normalizadas antes/ensayo lo caza.
- **Espejo del archivo con nota RETIRADA fuera del bloque:** el código retirado aparece 3 veces, no 2. Hay que ajustar la comprobación.
- Las figuras de Geometría salen de cuadernos Jupyter (matplotlib) en `img\5. Geometria`; sin Python no hay figuras nuevas.

**Why:** el pilot de Álgebra falló en nivel y gemelas, no en claves; estas son las trampas medidas en la segunda área.

**How to apply:** en cualquier REP-<ÁREA>, leer el §4 de la reubicación del área antes de diseñar los Retos; medir longitudes y opciones antes del ensayo. Ver `verificar-nuevas-nivel-y-gemelas` y `computadora-sin-python`.

### `reponer-nuevas-gemelas-entre-areas`

*Memoria de PC-Chris, última edición 2026-09-27.*

En REP-EST (2026-09-26) una búsqueda de Jaccard sobre enunciado+opciones contra las 1025 preguntas de Estadística y Aritmética cazó un Reto mío (capicúas de 5 cifras múltiplos de 5) que era gemelo de `ARI-TeoriaNumeros-Medio-037`, de OTRA área, y que la lectura por tema no había visto. También descubrió que un comité «5 H y 4 M» repetía el grupo de `Conteo-Medio-044`.

ConceptosBasicos pedía 33 Nivel PAA, pero sus 17 existentes solo hacen 5 tareas (10 de ellas son la misma, «población con restricción»). Con el §4 estricto solo cabían 5 nuevas; declaré 28 de faltante con el censo de tareas al lado.

**Why:** el verificador del piloto retiró las gemelas entre temas; escribir para llegar a la meta repite tareas.

**How to apply:** (1) antes de escribir, agrupar las existentes del tema por TAREA y contar las familias; (2) tras el ensayo, lanzar `gemelas.js` (top-5 de similitud) contra el área propia y las vecinas que comparten objetos (Aritmética para conteo/cifras/conjuntos); (3) si el tema no da, declarar el faltante con la medición: el ticket lo autoriza («contradice a la cabina»). Sin heredocs, y nunca un `cat` sin redirección delante de un comando: se queda esperando stdin hasta el timeout. Ver `verificar-nuevas-nivel-y-gemelas` y `computadora-sin-python`.

### `reposicion-banco-lecciones`

*Memoria de PC-Chris, última edición 2026-09-27.*

Medido en REP-ARI (2026-09-26, cantu-quizzes-latex):
- Mis primeros borradores de retro salieron por encima del máximo de su fichero en 26 de 39 (mismo contador que las existentes). Hay que escribir cortas desde el principio: idea ≤ 20 palabras, errores ≤ 12 palabras, etiquetas sin datos del reactivo.
- Retirar un bloque y añadir al final obliga a renumerar los `%% Problema:` siguientes, lo que choca con «ninguna pregunta existente cambia ni un byte»; poner la repuesta en el mismo ordinal de la retirada lo evita.
- `ARI-FA-Operaciones` solo dio 5 Retos legítimos de 11 pedidos: con la regla R del contrato §3 un tema-suelo de modelos cortos no llega a 20; se declara el faltante con razón.
- Compilar con Overfull nuevos en enunciados: se arregla reescribiendo el enunciado y recompilando el ensayo.

Medido en CORR-FUN (2026-09-26), el encargo que aplica un veredicto de verificación:
- Las correcciones que propone el verificador se someten a su propia vara. Su «(b)» para `SP-Dificil-031` caía por la regla R ante `Medio-049`, y su reposición de `TFG-Medio-057` (¿para qué k no corta el eje x?) era un objeto con tema propio en `ALG-EQD-Desigualdades-Dificil-025`. Se aplicó su «(a)» (MOVER, contrato §1) y el resto se argumentó.
- Mover un bloque a otro nivel obliga a que su retro quepa en el rango del fichero destino (de 96 a 87 palabras, en uno de 55–90). La nueva va en el ordinal de la que sale y la movida va al final: ninguna previa se renumera.

Medido en CORR-ALG (2026-09-26):
- Antes de aplicar un RETIRAR «por gemela», comprobar también la regla R. `Factorizacion-Dificil-037` caía además porque `Medio-029` ya encadena factor común + trinomio no mónico y el binomio como factor común está en `Facil-010`. Así el veredicto no depende de la definición de gemela.
- Si se retira un bloque que no es el último y no hay reposición legítima, renumerar el siguiente es inevitable (ordinales consecutivos, ANATOMIA §2.6). Se declara: no llega al XML.
- Un Medio nuevo con el objeto que solo tenía el Reto (ecuación lineal sin solución, frente a `Lineales-Dificil-006`) le da al Reto una cadena de dos pasos de Nivel PAA: no le quita apoyo. Es lo contrario del caso `Sistemas-Medio-070`/`Dificil-026`.

**Why:** son los tres sitios donde el encargo gastó iteraciones.
**How to apply:** en el próximo REP-* medir rangos de retro por fichero antes de escribir y decidir la reposición en el sitio. Ver `verificar-nuevas-nivel-y-gemelas` y `talleres-en-ola-paralela`.

## Verificar y corregir

### `verificar-nuevas-nivel-y-gemelas`

*Memoria de PC-Chris, última edición 2026-09-27.*

En VERIF-REP-ALG-PILOTO (2026-09-26) la resolución ciega dio 25/25 claves, pero 8 de 25 fallaban en nivel y 3 eran gemelas de Nivel PAA de **otro tema del área** (p. ej. SistemasEcuaciones-Medio-038, -015; EcuacionesLineales-Medio-048). El contrato §4/§5 no escribe una regla de nivel operativa; la que funcionó es la regla R de `informe-ALG-REUBICACION-AVANCE.md` §4 (Reto se queda si encadena dos pasos de Nivel PAA o usa un objeto que 02_Medio no tiene; baja si lo añadido es de 01_Facil), y contrastar cada Reto nuevo con lo que la reubicación del día bajó (`decisiones-*-REUBICACION-*.csv`).

**Why:** un verificador que solo cuenta coincidencias da por buenas preguntas mal niveladas o duplicadas; y el autor solo recorre su tema.

Al ESCRIBIR también hay gemelas en **otra área**: en REP-FUN (2026-09-26) dos candidatas de TFG-Funciones eran preguntas de `ALG-EQD-EcuacionesCuadraticas` (proyectil −5t²+30t; (x−2)²=49, que además es Fundamentos). Hacer grep de frases clave en los 43 temas antes de escribir, no solo en el área.

En VERIF-REP-EST (2026-09-26) otra vez 20/20 claves y 4 defectos. Aparecieron dos tipos nuevos: **atajo por reflejo de Fundamentos**, cuando la clave coincide con el cálculo ingenuo (bandera de 4 franjas y 4 colores → 24 = 4!), y **lectura doble cuyo resultado es un distractor** («alternando hombre y mujer» → 240). Calibrar el nivel con las razones escritas de `decisiones-<ÁREA>-REUBICACION.csv`: por ejemplo, «una sola discriminación» = Fundamentos, y un resultado resumido entre las opciones = Fundamentos. Poner a prueba los faltantes «sin forzar» proponiendo cadenas concretas que pasen la regla R. La extensión de la retro depende del contador: medir con dos antes de convertirla en veredicto.

En VERIF-REP-FUN (2026-09-26) otra vez 30/30 claves y 2 defectos. La gemela estaba **en el mismo fichero**, y el autor la citaba como «base vecina» (TFG-Funciones-Medio-057 ~ -043). El Reto fallido entregaba el periodo escrito, así que no había estructura que ver. Dos trampas medidas: (a) la extensión de la retro «del propio fichero» cambia según se mida antes o después de mover bloques; (b) la meta de un tema puede ser `rec = act` y no una cuota: leer la columna `nota` de `balance-temas.csv` antes de juzgar un faltante.

En VERIF-REP-ARI (2026-09-26): 39/39 claves, 6 defectos. Qué hizo falsable la regla R: preguntar **«¿hay UN solo 02_Medio que ya encadene los dos pasos?»** (Operaciones-Dificil-022 = Medio-031 invertido). Dos atajos nuevos: la **cláusula inerte**, cuando los números hacen irrelevante el matiz («o fracción» con 54/9 exacto), y el **colapso a fórmula cerrada** (boletos 3+1 → ⌈3N/4⌉, la tubería de una bajada). Las gemelas de Intereses estaban en el mismo fichero y el autor las citaba como «base». Las notas de memoria de la sesión autora se cargan en la sesión verificadora antes del sello: hay que declararlas como exposición previa.

En VERIF-REP-GEO (2026-09-26): 25/25 claves, 7 CORREGIR (6 de ellos en los 8 Retos de Recta). Lo nuevo: (a) **receta «incógnita en dos sitios → trinomio»**: una condición de Medio con k en dos lugares da un trinomio cuyas raíces están LITERALES en ALG-EcuacionesCuadraticas-01_Facil (Facil-018 x²−7x+12, Facil-020 raíces 2 y −5). Por la regla R es 01_Facil añadido, pero el contrato §3 no dice de qué nivel es «sube por el álgebra»: presentarlo como UNA decisión para Chris; (b) **atajo por opciones con una sola condición**: comprobar si los distractores cumplen alguna de las dos condiciones; si ninguno cumple ninguna, basta una para aislar la clave; (c) **un «paso de Nivel PAA» que en realidad es Fundamentos por el dato** (punto P en el eje y → la perpendicular sale de pendiente + ordenada). En Git Bash, `grep` con clases acentuadas `[oó]` falla en silencio: buscar con regex Unicode de Node.

En VERIF-REP-ALG (2026-09-26): 29/29 claves y 5 defectos, 4 de ellos gemelas de otro Reto o Medio del área, a menudo en el mismo fichero: Exponentes-027 ~ Dificil-011, Factorización-037 ~ Dificil-017, Cuadráticas-045 ~ Dificil-004 y Lineales-Dificil-008. **El mejor detector fue el Jaccard sobre la IDEA CLAVE**, que es la primera línea del `feedback`. El del enunciado queda ahogado por plantillas como «Factorice…». Otras dos lecciones: (a) escribir en el informe la definición operativa de gemela: **mismo enunciado-tipo + mismo movimiento central; un paso rutinario posterior no las separa; entre niveles distintos manda la regla R**; (b) leer también las razones de **CONSERVAR** de `decisiones-*.csv`, no solo lo bajado: Lineales-Medio-035 se conservó por «pide el mayor», que era todo el escalón de la nueva. Cuando el ticket obliga a leer el informe de la verificación previa, **las preguntas corregidas o movidas quedan NO ciegas**: declararlo antes del sello.

En VERIF-EX-DIA-PILOTO (2026-09-26, sustituciones del Examen Diagnóstico): 12/12 claves, 1 CORREGIR. Tres lecciones de examen. (a) **Rejuzgar cada retirado con una cuenta concreta, no con el inciso de la lectura 2C**: iterar el monto a mano redondeando al centavo dio exacto en 3 de los 5 Intereses «que exigen calculadora» (los corta el tamaño, ARI §5), y NC-016 (∛ de un cubo perfecto) no está sobre el techo en sustancia porque ALG §5 da por sabido el exponente fraccionario y el mismo Diagnóstico conserva esa operación en 3 preguntas de Álgebra. (b) **Las candidatas que el autor descarta delatan gemelas del Banco**: descartó la «tasa efectiva semestral» por gemela de su Intereses-021, y esa tarea era BAN-Medio-061. (c) **Si el autor cambia un distractor para equilibrar longitudes, rehacer su bullet**: el 11 % → 12.1 % dejó una explicación que no produce el valor. El Simulador tiene 4 opciones (0 «No conozco»), códigos `SIM-` y 733 bloques: el esqueleto del Diagnóstico no se traslada. El segundo sello (el juicio propio, antes de abrir el informe del autor) cuesta un minuto y blinda la comparación. Ver `sustituir-en-examenes`.

En VERIF-CORR (2026-09-26, verificar lo que la ola 5 corrigió, movió y escribió): 27/27 claves y 10/10 defectos de la ola 4 resueltos, pero **4 de las 6 movidas a 02_Medio eran gemelas en destino**. El diagnóstico con el que se bajan («paso central de un Medio X + remate de 01_Facil») es, en 02_Medio, la definición de gemela de X si X tiene el mismo enunciado-tipo (precedente: Lineales-067 retirada). Hay que comprobar siempre la gemela en el nivel de destino. Dos trampas medidas: (a) un código «quemado» puede aparecer solo en forma corta en un informe («la Dificil-026»), así que hay que buscar también sin prefijo de tema antes de declarar un hueco; (b) un Reto que solo aparece citado en la fila de otro en `decisiones-*.csv` no está juzgado y no abre la vía R de objeto.

En VERIF-EX-DIA (2026-09-27, 22 sustitutas del Diagnóstico de EST y FG): 22/22 claves, 2 CORREGIR, las dos por **casi literal al Banco**, que el Jaccard de palabras del autor (máx. 0.35) no veía. Lo que funcionó: **LCS de palabras sobre el enunciado con números → #**, calibrado con los pares del piloto (casi literal 0.94–1.00, misma tarea 0.36–0.47; no sirve en enunciados que son solo una expresión). Dispersion-026 dio 0.86 frente a BAN-Medio-045. Otra forma de casi literal: la misma pregunta con un conjunto concreto que no interviene (dato inerte). Y un «techo pendiente de figura» no se sostiene si el tema admite una tabla en un array desplegado dentro del enunciado (sobrevive al XML; lo usan el Diagnóstico y EX-SIM-EG). La cláusula del contrato «si chocan dos fichas» casi nunca aplica: lo habitual es una letra ambigua (distancia punto-recta, pregunta 3 de RESUMEN-GEO §8) o una letra que no distingue lo que se cortó de lo que se quedó (rotaciones).

En VERIF-EX-SIM (2026-09-27, 33 sustitutas del Simulador): 33/33 claves, 1 RETIRAR y 2 CORREGIR. Tres lecciones. (a) **Gemela entre dos nuevas del MISMO encargo con redacción distinta**: TFG-Funciones-016 (f(0)=5, f(2)=45 → f(1)) y Secuencias-026 (5, x, 45 geométrica) dan Jaccard 0.19/0.00. La delató leer por tarea y comparar **datos + clave + distractores** entre nuevas; los dos autores dijeron «ninguna gemela». (b) **«Casi literal» se mide con similitud de caracteres enmascarando los números** (`literal.js`): 1.00 contra BAN-TFG-Medio-052, que el autor llamó «mismo tipo». Uso tres grados para la regla de Chris: casi literal (misma frase y misma estructura numérica, prohibido), misma plantilla (misma frase, otros números: lo decide Chris) y misma tarea. En enunciados simbólicos cortos la métrica se infla por la plantilla («Factorice…»): solo vale en prosa. (c) Dos bullets nombraban un error que no produce su valor: «suma 0.1 por doblez» da 50 con «supere», y 49 solo con «llegue»; «prohíbe repetir» con 4 casas y 3 colores da 0, no 6. Probar cada bullet con la desigualdad estricta del enunciado. Otras cosas medidas: el atajo 4! = 24 reapareció (Conteo-021); los «no encontré la tarea en el Banco» de un autor fallaron dos veces (anillo = BAN-Pol-Medio-003 «concéntricos»; diagonal interior = BAN-VA-Medio-044); en los exámenes solo Desigualdades, Sistemas, Factorización, Conteo y Secuencias tienen Retos, y hay Retos sin juzgar que marcan «en el límite» (SP-Dificil-007, -011, -020; Desig-Dificil-035).

En VERIF-CORR3 (2026-09-27, los 11 que CORR3 corrigió o escribió en los dos exámenes) salieron 11/11 claves y 11 VALIDA. Aprendí cinco cosas.
- **La medida de frase calibrada no ve «misma tarea + misma estructura numérica con otra frase».** TFG-016 (40 + 30d frente a 6·2^d, «¿a partir de qué día…?») da 0.38/0.48 contra BAN-TFG-Medio-053, que es la misma pregunta. Solo la cazó buscar la tarea en el Banco del tema. Es un tipo permitido, pero hay que declararlo.
- **La nota de memoria de la sesión autora contamina claves en la sesión verificadora.** La de CORR3 traía la clave 5 de TFG-016, y hay que declararla en el sello. Además, esa nota resumía un argumento con más fuerza que el informe del autor: «acerca a un Reto», frente a «no es de Reto, pero borra la separación». Hay que juzgar el texto del informe.
- **Un «en el límite» por un Reto sin juzgar depende de su razón concreta.** Cuando los datos cambian, la razón puede desaparecer: con el factor 121 de SP-Dificil-007, SP-027 salió del límite. Una tarea genérica que también hacen los `02_Medio` no marca el límite.
- **Las filas de `decisiones-*-REUBICACION.csv` citan el «origen que se queda».** Por ejemplo, IntD-Medio-007 se dejó a propósito. Son comparadores positivos ya juzgados.
- **Si `indice.csv` cambia en la ventana de un encargo que tenía prohibido escribirlo, hay que mirar la hora.** Aquí fue la cabina al cerrar, no el autor.

**How to apply:** en verificaciones de nuevas, (1) volcado ciego propio que descarte `feedback` y líneas `%% >>>` (traen comparadores del autor), sellar con hash antes de abrir `\item*`; (2) censo de las ~1183 del área en TSV y búsqueda de gemelas en los 42 ficheros; (3) juzgar nivel con la regla R y la lista de bajadas del día. Trampa medida: al quitar comentarios LaTeX con regex, usar `(?<!\\)%` o se come el texto tras `\%`. Ver `talleres-en-ola-paralela` y `computadora-sin-python`.

### `corregir-tras-verificacion`

*Memoria de PC-Chris, última edición 2026-09-27.*

Medido en CORR-GEO (2026-09-26, cantu-quizzes-latex):

- **Ordinales sin tocar las VALIDA.** Si salen varios bloques de un fichero y detrás hay VALIDA de la verificación (fuera de alcance, ni su `%% Problema:`), se rellenan los huecos con las nuevas y se REORDENA una corregida hacia el hueco que queda. Ejemplo: la 040 pasó del ordinal 17 al 15 y así 037 (14) y 039 (16) quedaron byte a byte. El orden no llega al XML como dato.
- **Una movida conserva el cuerpo.** La cabina verifica las movidas con el cuerpo idéntico. Si su retro se sale del rango del fichero destino (Medio-063: 121 frente a 119), no se recorta: se declara con una propuesta. El contrato v2 §4 no dice qué pasa cuando una nueva cambia de fichero.
- **Un veredicto «condicionado a Chris» que el ticket manda aplicar:** se aplica el contrato tal como está escrito (bajar por la regla R), como movimiento reversible con mapa, y se dice que no es una decisión de Chris.
- **La comprobación final de «código viejo = 0 apariciones» falla por la marca `MOVIDA … venía de <código>`**: se espera 1.
- **Anchos para el `\hphantom`:** medirlos con un .tex mínimo con la clase real y `\typeout{\the\wd}` (~1 min).

**Why:** son los sitios donde este encargo tuvo que decidir, más allá del ticket.

**How to apply:** en cualquier CORR-<ÁREA>, antes de escribir, planificar los ordinales contra la lista de VALIDA. Ver `escribir-nuevas-banco`, `verificar-nuevas-nivel-y-gemelas` y `talleres-en-ola-paralela`.

### `corregir-nuevas-corr`

*Memoria de PC-Chris, última edición 2026-09-27.*

Medido en CORR-ARI (2026-09-26, cantu-quizzes-latex):

- **«Ni un byte» en validadas choca con retirar del centro de un fichero.** Quitar un bloque renumera los `%% Problema:` de detrás (VALIDA incluidas). Salidas: reponer en el mismo ordinal, o mover solo si es el último bloque del fichero. Si no hay reposición legítima, parar y preguntar si el ordinal cuenta como byte (la reubicación sí renumeraba).
- **La salida «moverla a 02_Medio» del verificador puede crear una gemela**: un Reto que falla R porque «un solo Medio ya encadena los pasos» es, en Medio, gemela de ese Medio. Comprobarlo antes de mover.
- **Retos que nadie juzgó (no están en `candidatos-`/`decisiones-<ÁREA>-REUBICACION.csv`) solo son «par»**: cierran la vía «objeto que 02_Medio no tiene» de la regla R. En ARI-FA-Operaciones, eso bloquea todo el hilo de jerarquía (Dificil-001/004/007).
- Una corrección del verificador puede no cerrar su propio defecto (12²×18 se multiplica cómodo); proponer otra con razón.

**Why:** son los tres sitios donde el veredicto no se podía aplicar a la letra.

**How to apply:** en cada CORR-*, antes de tocar nada, mirar el ordinal de cada retirada/movida, y buscar la gemela en Medio de todo «mover a 02_Medio». Ver `verificar-nuevas-nivel-y-gemelas` y `reposicion-banco-lecciones`.

### `corregir-nuevas-banco`

*Memoria de PC-Chris, última edición 2026-09-27.*

Medido en CORR-EST (2026-09-26, cantu-quizzes-latex), con CORR-ALG en paralelo:

- **Retirar sin reponer una pregunta que no es la última** obliga a renumerar el `%% Problema:` de las siguientes, aunque sean VALIDA. Choca con «ni un byte», pero no llega al XML. CORR-ALG y CORR-EST lo resolvieron igual: renumerar, comprobar que son idénticas en el XML y declararlo como salvedad. Si hay reposición, va en el ordinal de la retirada (`reposicion-banco-lecciones`).
- **Código quemado.** Un descarte del autor que su informe nombra en el repo («la Dificil-026…») cuenta para el máximo histórico aunque «no se usó». Se salta el número y se dice por qué.
- **Extensión.** Mide contra las **previas** del fichero, sin las nuevas pendientes, con tres contadores: el del autor, el del verificador y uno propio. Es el rango más estricto y evita la discusión de «depende del contador». Las nuevas y las corregidas salieron largas en el primer ensayo; hicieron falta dos rondas de recortes.
- **Antes de citar el contador de otro, reprodúcelo.** El contador B de VERIF-REP-EST (`extension2.js`) había perdido las barras invertidas: `/\text\{/` buscaba un tabulador. Sus cifras B no valían.
- **Cambiar números en una corrección:** comprueba que la clave nueva no sea un reflejo ingenuo (4!·3! = 144 descartó 4 H y 3 M) y que ningún paso quede como un Medio literal con sus mismos números.
- **Aplicar la corrección de otro:** hazlo con fragmentos completos y un diff LCS contra el respaldo. El diff posicional marca todo el bloque como cambiado por la línea de marca añadida.

**Why:** son los sitios donde este encargo gastó iteraciones o tuvo que declarar una excepción.

**How to apply:** en el próximo CORR-*, decide los ordinales antes de ensayar, escanea el máximo histórico incluyendo la prosa de los informes, y mide la extensión contra las previas desde el primer borrador. Ver `verificar-nuevas-nivel-y-gemelas` y `computadora-sin-python`. El heredoc se comió las barras incluso con `<<'EOF'` entrecomillado.

### `corr2-propuesta-verificador-misma-vara`

*Memoria de PC-Chris, última edición 2026-09-27.*

Medido en CORR2 (2026-09-27): VERIF-CORR tumbó `SP-Dificil-033` porque «la estructura viene escrita». Su propia propuesta («las diferencias crecen siempre en la misma cantidad», con un término escondido) seguía escribiendo el tipo de estructura, recuperaba el parámetro con una lineal de Medio-043/048 y terminaba con la misma extensión: la misma vara la tumba. Apliqué otra: dos secuencias trenzadas, una de segundo orden (Medio-029 + Medio-041, que ningún Medio junta), con la clave 64 y la estrella conservadas.

Otras dos cosas medidas: retirar sin reponer los ordinales 57–59 obligó a renumerar la VALIDA de detrás (Recta-Medio-066); es la tercera vez que pasa (CORR-ALG, CORR-EST, CORR2), y se declara como salvedad. Quitar una movida devolvió el fichero exactamente al MD5 de antes de la movida: es una comprobación gratis.

**Why:** en Secuencias ya van cuatro vueltas (031, (b), 033, propuesta) con la estructura escrita.

**How to apply:** en un CORR-* que corrige un Reto, somete la propuesta del verificador a SU diagnóstico antes que a la regla R en abstracto. Si un tema no da, retirar y declarar el faltante. Ver `corregir-nuevas-corr`, `corregir-nuevas-banco` y `verificar-nuevas-nivel-y-gemelas`.

### `corr3-corregir-en-examenes`

*Memoria de PC-Chris, última edición 2026-09-27.*

Medido en CORR3 (2026-09-27), que aplicó VERIF-EX-DIA y VERIF-EX-SIM a 11 reactivos de los dos exámenes (9 corregidos en su sitio y 2 retirados con sustituta de tabla en `\[\begin{array}\]`).

- **Los Overfull nuevos de un enunciado se cazan en ~10 s.** Basta compilar solo los bloques tocados, dentro de su `\begin{quiz}`, con el preámbulo real del envoltorio (`prueba_bloques.js`). La prueba reproduce los pt exactos de la compilación entera (10.12 y 5.02). Se arreglan cambiando la frase. El Simulador entero tarda ~6,2 min.
- **Comparar datos + clave entre las propias nuevas sigue cazando cosas.** TFG-016 (exponencial frente a lineal) salía con clave 6, la misma que SP-025 (duplicar hasta rebasar). Se cambiaron los datos para que la clave fuera 5.
- **Comprobar la paridad de la clave frente a las opciones.** En dos borradores la clave era la única impar o la única par (contrato §9, invariantes baratos).
- **Si el `\hphantom` sale de una tabla de anchos que guarda la fila como texto, al cambiar los datos esa fila queda obsoleta.** Hay que volver a medir, aunque el ancho sea casi igual.
- **Propuestas del verificador que no se aplicaron, porque no pasan su propia vara:**
  - «fijar el color de la primera casa» (Conteo) añade una condición a «vecinas distintas», que es la forma de los Retos validados Dificil-025/029; además, su clave 8 sale de dos errores que se compensan;
  - la «candidata» para reemplazar una gemela repetía el mismo movimiento central (la raíz del cociente de dos pasos).
- **Las medidas de «casi literal» de los verificadores se reproducen exactas** (`lcs.js` de VERIF-EX-DIA y `literal.js` de VERIF-EX-SIM). Conviene medir antes/ahora contra el par que nombraron. Las frases de oficio («¿Cuál de las siguientes afirmaciones es correcta?», «¿Cuál es el valor de x?») inflan la LCS en enunciados cortos: cambiarlas baja 0.2–0.3.
- Tres títulos de `\begin{quiz}` del Diagnóstico llevan un doble espacio que el XML normaliza. Un chequeo literal de categoría da 45 falsas discrepancias.

**Why:** son los sitios donde CORR3 gastó iteraciones (v0 a v5) o se apartó del verificador.

**How to apply:** en un CORR-* o EX-* de exámenes, pasar la prueba aislada de bloques antes de cada ensayo compilado, y comparar datos + clave + paridad de las nuevas entre sí antes de compilar. Ver `sustituir-en-examenes`, `corr2-propuesta-verificador-misma-vara` y `verificar-nuevas-nivel-y-gemelas`.

### `corr-errores-frecuentes-sin-origen`

*Memoria de PC-Chris, última edición 2026-11-05.*

En CORR-NQ2 (2026-11-05), 60 de 149 bullets de error frecuente del Banco de Álgebra (sobre todo TrabajoRendimiento y
VelocidadDistancia) no tenían ningún error natural de un paso que diera el distractor. Se escribieron con la regla del
manual v1.4 §4: «no reconstruye ningún camino: <comprobación corta>; revisa el paso N».

**Why:** el método prohíbe escribir una causa que no se calculó, y cambiar el valor del distractor es el último recurso
(es contenido). Las notas `RETRO (encargo G4)` de esos ficheros ya decían que esos distractores son «un número redondo
alrededor de la clave».

**How to apply:**
- Antes de escribir «no reconstruye», probar todas las expresiones de 2 y 3 operandos con los datos y los intermedios de
  la retro. En CORR-NQ2, `busca.py` encontró un solo origen natural que se había pasado por alto.
- Descartar las coincidencias sin sentido, como 5 − 4.
- Guardar cada cifra del bullet nuevo en un script de cuentas con fracciones exactas.
- Actualizar las notas `%% >>>` que daban el defecto por no arreglado.
- Ver `corregir-tras-verificacion` y `verificar-nuevas-nivel-y-gemelas`.

## Español (CORR-NQ)

### `corr-nq-espanol-una-verdadera`

*Memoria de PC-Chris, última edición 2026-11-06.*

Al aplicar la regla de Chris «una sola opción verdadera» en Español, la lectura a ciegas con un lector nuevo por ronda
no es un trámite: en CORR-NQ8, 10 de 48 preguntas tocadas fallaron la primera ronda y hubo tres rondas.

**Why:** los distractores nuevos «parecen» falsos a quien los escribe y no al lector. Casos medidos:
- Adición: expresiones lexicalizadas («vivía más en el pasado», «perforar el dosel») se leen como figura.
- Particularización: un distractor «explícito» que nombra la emoción con otra palabra («una emoción especial») se lee
  como indirecto y el lector lo ELIGE; el explícito tiene que usar la palabra del enunciado o un sinónimo directo, o
  mejor poner un detalle neutro.
- Elisión: un detalle accesorio («que son los más comunes») se quita igual que la clave.
- Particularización, Integración y Generalización ya traen «MEJOR» en el enunciado (147 de 150); Adición y Elisión no.

**How to apply:**
- Lector a ciegas fresco (agente general, solo pasaje + enunciado + opciones) por cada ronda; anotar también las «en el
  límite» y cambiarlas.
- Comprobar la literalidad con rango ESTRICTO (el trozo dentro de las líneas citadas, no solo tocándolas).
- En Elisión las opciones van en orden de línea: el distractor nuevo va en su sitio.
- Repartir 10 ficheros en 5 forks con un CONVENCIONES.md común funcionó; la madre compila, compara XML y hace las ciegas.
- Un defecto que la ciega destapa fuera del CSV (Elision-Dificil-003, 3 lectores eligen A) se nombra, no se toca.

Relacionado: `barajar-posicion-espanol`, `verificar-nuevas-nivel-y-gemelas`.

### `corr-nq-espanol-opciones`

*Memoria de PC-Chris, última edición 2026-11-06.*

Al corregir Español del banco CQL cambiando distractores (regla de Chris «una sola opción verdadera»):

- **La primera corrección de un ALTA dudoso puede no bastar:** en ClasificacionTextos-001 quité «Descriptivo» y el lector a ciegas eligió «Informativo» (la frontera Informativo/Divulgativo del fichero); en Figuras-011 dio «Antítesis» como defendible. Se rehicieron y una 2.ª vuelta con lector nuevo las dio limpias.
- **Cada opción nueva se mide antes de escribir:** G15 de `guardas.py` (que la clave no quede sola como la más larga/corta, ni la única con coma) y el ancho impreso: en Comparación una opción de ~84 caracteres dio Overfull de 8,87 pt; 78 cabe. Prueba aislada con envoltorio `_test-…-mide.tex` (~1 min) en vez de recompilar las 385 (~10 min).
- **Relectura a ciegas:** dar al subagente el pasaje, el enunciado, las opciones y la línea de «Tipo de pregunta» (la regla del tipo); pedir `letra` y `otra`. Las «otra» en opciones no tocadas se nombran, no se arreglan.
- **Muchos MEDIA `DESCARTE` eran dos correctas** con la vara del propio fichero (Elisión 008/015/020): se arregla el distractor, no el descarte.

**Why:** el CSV de la nube clasifica a ojo y la cabina propone arreglos sin medir ancho ni G15; los dos fallos solo salieron midiendo.
**How to apply:** en cualquier CORR-* de Español, escribir `literales.mjs`/`citas.mjs`/`porcientos.mjs` y correrlos antes y después; no usar `node -e` con `\%` (se pierde la barra). Ver `corregir-tras-verificacion` y `verificar-nuevas-nivel-y-gemelas`.

### `corr-nq-espanol-ciegas-y-atajos`

*Memoria de PC-Chris, última edición 2026-11-06.*

Al corregir preguntas de Español con la regla «una sola opción verdadera» (CORR-NQ11, 2026-11-05/06):

- **La relectura a ciegas casi nunca sale limpia a la primera.** Tras cambiar la rival señalada, el lector encontró otra defendible: «Divulgativo» junto a «Informativo», «Metáfora» en sentido amplio cuando quitas «Personificación» y una clave que era «solo una parte». Hicieron falta 4 rondas en 3 preguntas. Cada ronda, con un subagente nuevo que solo vea pasaje, enunciado y opciones (`ciegas.mjs`).
- **Mover la marca, recortar o hacer literal una opción fabrica atajos G15**: la clave queda como la única más larga o más corta, o la única con coma o con «y». Mide largos (con la etiqueta «(NN)» incluida, como G15) antes de escribir. Mide también el **ancho impreso** con una prueba aislada de `\settowidth` en el envoltorio: una clave un carácter más larga alargó un Overfull de 4,8 a 11 pt.
- **El XML del Diagnóstico necesita `xelatex -shell-escape`**: certutil pasa las PNG a base64, y sin la opción da «Base64 conversion failed». Hay que usar `-output-directory` al andamiaje. moodle.sty borra él mismo los `.enc` de `img/`.
- **Se contrasta con la regla 5 del método y con el propio Diagnóstico.** `FuncionesLenguaje-014` enseña el oxímoron como «un silencio atronador», así que un «grito silencioso» marcado «Paradoja» es un error de clave.
- `node -e` en línea se come las barras invertidas: dos veces dio cifras falsas. Siempre un script en fichero.

**Why:** cada uno de estos casos dio un falso «hecho» que solo la medición siguiente cazó.
**How to apply:** en cualquier CORR-* de Español, presupuesta 2-3 rondas de ciega y la medida de largos y anchos antes de escribir al repo. Relacionado: `verificar-nuevas-nivel-y-gemelas`, `barajar-posicion-espanol`.

### `corr-nq-espanol-ciega-rivales`

*Memoria de PC-Chris, última edición 2026-11-06.*

En CORR-NQ7 (Lectura del Banco, 2026-11-05/06), 5 de 32 ALTA corregidos según la propuesta de la cabina NO pasaron la
primera relectura a ciegas: había otra opción verdadera que ni la nube ni la cabina nombraban (Evidencia-Dificil-008 A y D;
Informativo en Clasificación; Metáfora en Figuras; Referencial y luego Expresiva en Funciones-Medio-021).

**Why:** la regla de Chris es «una sola opción verdadera», y cada lector a ciegas encuentra una rival distinta en las
preguntas de molde abierto (clase vs. género vs. forma; «función principal»; tramos de Evidencia sobre un pasaje saturado).

**How to apply:**
- Al corregir un DOS_CORRECTAS, revisar las CUATRO opciones con la regla, no solo la que nombra el CSV; si otra también
  vale, es el mismo defecto y se cierra en la misma pasada (declararlo en el informe como ampliación).
- Si la pregunta solo se tocó por CITA/TEXTO y la ciega encuentra una segunda correcta previa, se nombra y no se toca.
- Frontera Informativo/Divulgativo: el banco no la fija; los lectores a ciegas dan Informativo por bueno en textos de
  divulgación. En Clasificación, preferir distractores claramente ajenos (Instructivo, Literario, Histórico, Técnico).
- Trampas de herramienta: las comillas `` de LaTeX cortan las plantillas de JavaScript (usar un .txt de datos); la última
  pregunta de `InterpretacionDatos-02_Medio` cierra con un `\end{multi}` sangrado (un parser anclado a `^\\end` se cuelga);
  en temas de dos pasajes `guardas.py` deja que el Pasaje B pise al A (G6/G10 ciegos al A).

Relacionado: `verificar-nuevas-nivel-y-gemelas`, `corregir-nuevas-banco`, `cql-nube-q-lectura`.

### `barajar-posicion-espanol`

*Memoria de PC-Chris, última edición 2026-09-27.*

BARAJAR-ESP (2026-09-27) paró en los 5 ficheros: 94 de 100 preguntas tenían un orden con sentido. Elisión lleva `(NN)` a la cola, ascendente. Evidencia lleva `Líneas NN (“…”)` a la cabeza, ascendente (el oficial: 22 de 22). InterpretacionDatos lleva una tirada de cifras de menor a mayor. Todo eso ya lo habían medido FASE1-E, FASE1-G y POSICION-PILOTO el 2026-09-21, y el ticket de la cabina no lo recogía.

**Why:** en esos ficheros la concentración de la clave es un sesgo de redacción: la clave se eligió en el tercio final del pasaje. No es un sesgo de colocación. Además, la zona 4 de la retro va en el orden de las opciones (manual §4.3, G4). Así que, con «retro sin tocar ni un byte», la única permutación posible desplaza la clave y conserva el orden relativo de los distractores. En una lista ordenada eso fabrica un atajo nuevo: la única opción fuera de orden es la clave.

**How to apply:** ante cualquier ticket de posición o barajado en Español, primero leer `tickets/informe-FASE1-*.md` y `informe-POSICION-PILOTO.md`. Detectar la marca de línea en las dos grafías (cabeza y cola) y la tirada de cifras. Calcular «máximo alcanzable moviendo solo los libres» antes de nada. En el detector de retro por letra, leer solo hasta el `]%` del feedback y descontar el error tipificado «quedarse con la primera opción que suena bien». Ver `verificar-nuevas-nivel-y-gemelas` y `talleres-en-ola-paralela`.

## Exámenes y compilación

### `sustituir-en-examenes`

*Memoria de PC-Chris, última edición 2026-09-27.*

Medido en EX-DIA-PILOTO (2026-09-26), el primer encargo que sustituyó reactivos en un examen: 12 retirados sobre el techo y 12 nuevas.

- **El contrato de balance §3 no tiene escala en un examen**, porque no hay 01_Facil ni 03_Dificil. Usé el Banco del mismo tema: la nueva no puede hacer lo que hace un 01_Facil ni lo que hace un Reto validado. Esa vara tumbó dos diseños de Factorización que eran Retos del Banco: el trinomio en x² (Dificil-002/006/012/018) y el binomio común seguido de una diferencia de cuadrados (Dificil-017).
- **Las gemelas se buscan en dos corpus**: los 43 ficheros del examen y el Banco. En Intereses, el Banco (el lote de REP-ARI Medio-055..068) ya cubre todo lo que se calcula sin calculadora, y 8 de las 12 nuevas repetían una tarea del Banco. Hay que declararlo, porque no hay alternativa. Tres ideas clave mías salieron casi palabra por palabra de las de REP-ARI sin haberlas leído: comparar la idea clave con el Banco antes del ensayo.
- Los exámenes tienen **5 opciones**; la quinta es «No conozco la respuesta». Para rehacer un bloque sin cambiar su esqueleto, comprobar primero que el esqueleto relleno con el propio bloque lo reproduce byte a byte.
- **Compilar**: `Examen_Diagnostico.tex` tiene solo 4 `\input` activos y no se toca. Uso una copia externa con un envoltorio `_test-` y los 43 `\input` de Matemáticas: ~125 s y 741 preguntas.
- **Códigos `DIA-`**: el máximo histórico se cuenta solo con el prefijo. Sin él, los números chocan con los del Banco.
- En el Diagnóstico, **las retros de Intereses no llevan planteamiento** (0 de 20). El ticket pide el formato de las vecinas y el manual §2.0 lo contrario; seguí a las vecinas y lo declaré.

En EX-DIA-EST (2026-09-27, 17 de Estadística; 15 sustituidos y 2 pendientes de figura) aparecieron tres cosas nuevas:
- **Un tema cuyas 15 preguntas llevan figura (InterpretacionDatos) no admite sustituta sin figura.** Sin Python no se puede ejecutar el cuaderno que genera los PNG, así que esas preguntas se quedan como «techo pendiente de figura». Pasa lo mismo en cualquier tema de gráficas.
- **La plantilla de la regla empírica que usa el Banco** («se reparten de forma aproximadamente normal, con una media de… Según la regla empírica…») hace que la nueva salga casi literal. Con solo cambiar los números, Conteo quedó a 0.55 de un tipo del Banco. Hay que cambiar el contexto y la construcción de la frase, y medir el Jaccard contra el tipo declarado antes de compilar.
- **La lectura 2C no aplica la letra de la ficha a todo el fichero.** Dispersion-015 (varianza) y 10 de 18 de Conteo («combinatoria grande», con un máximo de C(7,3)) quedaron sin marcar. Cuando la lectura marca unos reactivos por un inciso, conviene recorrer las vecinas del fichero con ese mismo inciso y nombrar las que se escaparon, sin tocarlas.

En EX-DIA-FG (2026-09-27, 12 de Funciones y Geometría; 7 sustituidos y 5 que no estaban sobre el techo), lo nuevo fue esto:
- **La lectura 2C-DIA marca como techo objetos que el Banco ya absolvió por escrito.** Hay que buscar el precedente del objeto antes de retirar:
  - la inversa disfrazada «¿qué g cumple (f∘g)(x) = x?» es `FORMA_AJENA` según informe-27 §4 y el ticket 35, y sigue en BAN-FC-Medio-007/-013;
  - la distancia punto-recta está en BAN-Recta-Medio-035; es la pregunta abierta 3 de RESUMEN-GEO §8;
  - la rotación sobre un punto y la transformación inversa las validó GEO-REUBICACION (BAN-Transformaciones-Medio-036/-037/-038).
  Con esos precedentes, 5 de 12 no se tocaron.
- **La ficha de Geometría no numera como el contrato.** El contrato v3 §9 dice «techo §6, permitido §5», pero en Geometría el techo está en el §5 y lo permitido en el §4.
- **El Banco de VolumenArea y el de TFG ya cubren casi todas las tareas de Nivel PAA.** Toda sustituta repite un tipo del Banco, y hay que declararlo. Tres de mis redacciones salieron casi literales, al Banco o al propio retirado, y las 7 retros del primer borrador se pasaban del máximo de su fichero.
- **Hay gemelas entre áreas dentro del mismo examen.** Un crecimiento exponencial con dos datos tenía el mismo movimiento que ARI-PI-Intereses-Medio-017 (raíz del factor de dos periodos). Solo lo cazó la idea clave comparada contra los 43 ficheros.

En EX-SIM-EG (2026-09-27, Simulador, 16 del techo de Estadística y Geometría), el rejuicio con una cuenta dio **4 NO de 16**. En los cuatro, la lectura 2C aplicaba un inciso que el Banco validado no respeta:
- el «máx. 35 y 24» de EST §6: 11 vecinas `NIVEL_OK` lo superan, y BAN-Conteo-Medio-005 es la misma tarea;
- el baricentro: GEO-REUBICACION lo conservó en Nivel PAA;
- dos reflexiones paralelas: BAN-Transf-Medio-042 está en 02_Medio;
- o una técnica fuera del §5 pero no vetada (mesa redonda), que es `SUBIR_A_RETO` y se queda.

Antes de retirar, buscar en `decisiones-*-REUBICACION.csv` y en el Banco si esa operación sigue en Nivel PAA. Otras cosas medidas:
- en Geometría, lo permitido es la ficha §4 y el techo la §5;
- la parte de Matemáticas del Simulador (36 `\input`, con MIX-PAA) compila en ~6,5 min y al **90 % de memoria**;
- la tabla en `\[\begin{array}\]` dentro del enunciado sustituye a una figura sin Python (llega intacta al XML);
- la herramienta Edit se come el `\t` de la línea «en blanco» de los ficheros EST: comprobar el esqueleto con un script;
- en el Banco, solo Conteo conserva `03_Dificil` entre esos temas;
- 4 de mis primeros diseños eran casi literales del Banco o gemelos del examen: buscar el Banco **antes** de fijar números.

En EX-SIM-AF (2026-09-27, Simulador, 21 de Álgebra y Funciones) el rejuicio dio **0 NO de 21**. Todos los incisos eran **objetos vetados por nombre**: cubos, 3 variables, trozos, f⁻¹, asíntota, umbral 12 y conjunta. Lo que sí sale de la cuenta es el mismo objeto conservado en otra parte, que se nombra para Chris: la conjunta en ALG-RA-TrabajoRendimiento-011/-015 y un 3×3 en BAN-Sist-Facil-035. Otras cosas medidas:
- **El Simulador está saturado.** Tumbé 11 diseños antes de escribir retros, casi todos por gemelas **en otros ficheros** del examen (TeoriaNumeros-014 y -019, EcuacionesLineales-021..025, Fundamentos-017, Cuadráticas-016, Polígonos-019, MIX-048) o por ser Retos del Banco (Sist-Dificil-012 y -033, Fundamentos-Dificil-010). Antes de diseñar hay que listar los enunciados de los 36 ficheros, no solo los del tema. Sistemas casi no tenía sustituta; la que puse (igualdad encadenada) queda en el límite.
- 4 ideas clave salieron casi calcadas de las nuevas del piloto del Diagnóstico y del Banco. Hay que comparar la idea también con **el otro examen**.
- Una opción de prosa entera dentro de `\boxed{\text{…}}` en un bullet produjo un `Underfull` nuevo. Se arregla recuadrando un fragmento literal de la opción.
- ALG-RA-TrabajoRendimiento del Simulador no tiene separador antes del Problema 12, así que hay que censar anclando en `\begin{multi}`. Los máximos `SIM-` coinciden con el recuento del fichero en los 7 temas.

**Why:** estas cosas costaron las iteraciones del piloto, y la ola de exámenes (78 reactivos) las va a repetir.

**How to apply:** en cualquier encargo EX-*, construir primero la vara de nivel desde el Banco y correr la búsqueda de gemelas contra el examen y contra el Banco antes de escribir retros. Ver `escribir-nuevas-banco`, `reponer-nuevas-gemelas-entre-areas` y `verificar-nuevas-nivel-y-gemelas`.

### `compilar-simulador-fuera-del-repo`

*Memoria de PC-Chris, última edición 2026-11-06.*

Al compilar un envoltorio `_test-*.tex` que incluya `MIX-PAA.tex` del Examen Simulador, la externalización de sus 19
`tikzpicture` crea `figuras/_test-*-tikztemp-N.pdf` junto al envoltorio. En el repo quedaría `Examen Simulador/figuras/`,
que no empieza por `_test-` y que un taller no puede borrar (CORR-NQ10, 2026-11-05).

**Why:** AGENTS.md §5 pide que todo lo que quede en el repo y no sea entregable empiece por `_test-`, y los talleres no
borran nada.

**How to apply:** compilar en `_scratch\<ENCARGO>\build\<x>\` con copias de `components`, `logo`, `img` y los `.tex` del
encargo, con el preámbulo de la raíz (como `build-documentos-completos`). La línea base así sale idéntica byte a byte
al XML promovido en las 683 preguntas de Matemáticas, así que sirve para medir «solo cambian las que toqué». En esta PC,
xelatex está en `C:\texlive\2025\` aunque `CADENA-DE-HERRAMIENTAS.md` diga 2026 (`computadora-sin-python`).

**Dos compilaciones en la misma raíz, nunca a la vez** (CORR-R2-1, 2026-11-06). `aleph-moodle.sty` L155-157 codifica
cada imagen con certutil a `<jobname>.b64` y luego a `img/…/X.enc`, con nombre fijo junto a la imagen. La base y el
ensayo en paralelo se pisaron: «Base64 conversion failed», rc 1, y quedó un `_test-…-base.b64`. Certutil no lo
sobrescribe (0x80070050), así que ese jobname sigue fallando. Compilar en serie y, si queda un `.b64`, cambiar de
jobname (no se borra). Sin tikz (sin MIX-PAA), compilar en la raíz del repo solo deja `_test-*`.

### `build-documentos-completos`

*Memoria de PC-Chris, última edición 2026-11-06.*

BUILD-FINAL (2026-09-27) compiló los cuatro documentos completos y promovió los 8 productos. Qué funcionó:

- Copias externas en `_scratch\<ENCARGO>\build\<K>\` (components, logo, img, Temas/Secciones, MD5 verificado) y envoltorio **con el mismo nombre que la raíz** (así `\jobname` y los productos coinciden). `-recorder` prueba 0 lecturas del repo.
- Los cuatro en paralelo caben (dirs separados): MAT ~11 min en un solo XML con las dos banderas, ESP ~25, DIA ~9, SIM ~57 (19 tikz).
- `Temas/test.tex` de Español (Inglés, 7 reactivos) se deja fuera: el censo 850 lo excluye.
- Páginas por pregunta: parsear `.synctex.gz` (compilar con `-synctex=1`); **las rutas vienen en latin1** (Matemáticas, Redacción). Contrastar con `pdftotext` (está en /mingw64/bin).
- La regex de páginas en el `.log` de XeTeX es `(N pages)` sin bytes.
- El corpus no usa `tabular`: las tablas son `array` con `\hline`/`|` (10 en total).
- BUILD-FINAL-3 (2026-11-06) repitió los tiempos (MAT 12 min, ESP 25, DIA 9, SIM 54) con las herramientas Python de
  `PAA/herramientas/build-final/` copiadas a `_scratch`. Lo nuevo que costó:
  - el `pdftotext` de `/mingw64/bin` es **xpdf 4.00**; usar el de TeX Live (`C:\texlive\2025\bin\windows\`, poppler) por ruta;
  - la marca vieja sale «EDuCA TALEnTO» en `pdftotext` (versalita): buscarla sin mayúsculas, acentos ni espacios; y quitar
    el base64 del XML antes (da «educa» por azar); «Educativo», «talentosa» son contenido;
  - el CSV de cambios de la cabina puede traer filas «(sin código N)»: códigos de dos cifras (`Recta-Medio-14/16/23`);
    resolver por fichero y posición, no parar;
  - los `.synctex.gz` promovidos apuntan al andamiaje y pesan 5–13 MB.

**Why:** el próximo build completo o QA visual puede reutilizar `_scratch\BUILD-FINAL\*.js` tal cual.
**How to apply:** ver `aiw-workspace-conventions` y `computadora-sin-python`.

### `parser-intervalos-semiabiertos`

*Memoria de PC-Chris, última edición 2026-11-05.*

Medido en CORR-NQ4 (cantu-quizzes-latex, 2026-11-05): un parser que equilibra **corchetes** en el argumento opcional de
`\begin{multi}`, que es la receta de `AGENTS.md` §4, se rompe cuando `feedback={…}` trae intervalos semiabiertos
(`[-3,\,\infty)`, `(-\infty, 3]`). En Funciones fueron 7 de 533 preguntas mal partidas, aunque el conteo crudo cuadraba.

Lo que funciona: equilibrar las **llaves** (saltar `\x` y los comentarios `%`) y cerrar solo en un `]` a profundidad
de llave 0. El parser bueno quedó en `_scratch\CORR-NQ4\parser.mjs`.

**Why:** la receta de AGENTS asume que los corchetes van emparejados; con notación de intervalos no es así.
**How to apply:** en cualquier taller de CQL que parsee preguntas (Dominio y rango, desigualdades, Estadística),
equilibrar llaves y comprobar que códigos únicos = `\begin{multi}` crudos. Ver `aiw-workspace-conventions` y
`corregir-tras-verificacion`.
