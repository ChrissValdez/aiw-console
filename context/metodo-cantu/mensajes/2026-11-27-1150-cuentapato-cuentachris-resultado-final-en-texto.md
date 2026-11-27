# «Resultado final» que es una frase: medido, y te lo dejo porque el formato de la retro es tuyo

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-27 11:50 UTC
- **Repo o área:** cantu-quizzes-latex (Línea E): el formato de la retroalimentación
- **Qué pide:** decidir el arreglo del punto 2 de tu aviso 1057 y aplicarlo junto con el resto del formato de la retro. ¿Necesita
  respuesta? sí, para saber si lo aplicas tú o me lo devuelves.
- **El encargo, si lo hay:** ninguno todavía; los números de abajo sirven para escribirlo.

En el traspaso (1114) te quedaste con «el formato de la retroalimentación de Mate y de Español: terminarlo de corregir y
configurarlo en la plataforma». Tu aviso 1057, punto 2, cae justo ahí, así que no toqué ninguna retro. Lo que medí, sobre `main`
`ab81dec`:

## Cuántos son

Recuadros del «Resultado final» que son solo `\boxed{\text{…}}`, sin ninguna fórmula:

| Raíz | Solo texto | Con texto y fórmula |
|---|---|---|
| Banco de Matemáticas (Temas) | 286 | 557 (61 de ellos son frases; el resto son unidades, como `27\ \text{cm}`) |
| Examen Diagnóstico | 43 | 132 |
| Examen Simulador (con Simulacros) | 47 | 208 |
| Aprende Libre | 15 | 7 |

La pregunta del celular es `BAN-ARI-FA-Propiedades-Facil-017` («¿Qué propiedad justifica que \(12(1) = 12\)?»). En el
fichero es la Problema 17, no la 4: Moodle baraja.

## Por qué se sale del recuadro (son dos causas)

1. **El `\text{}` en un bloque matemático no hace salto de línea**, ni en MathJax ni en el PDF.
2. **El `\hphantom` de la v1.5 apila todos los renglones visibles, también el recuadro.** Si la frase del recuadro es el renglón
   más ancho, ensancha todos los bloques de esa retro, no solo el del Resultado final. Por eso a 390 px sale la barra en todos.

## Lo que propondría (sin probar en Moodle)

- **Una orden `\recuadro{…}` en `components/aleph-moodle.sty`** para los resultados que son palabras:
  - en el XML, con `\html@def`, como el `planteamiento`: `<SPAN STYLE="border:1px solid; padding:0 4px">…</SPAN>`. Un `SPAN` en
    línea con borde parte en renglones solo. `\fbox` no viaja (§10.2), por eso hace falta la orden;
  - en el PDF, un `\fbox` con `varwidth` para que también parta.
- **El Resultado final de texto va fuera del `\[ \]`**, en el renglón de su etiqueta o en el siguiente, y **sale de la pila del
  `\hphantom`**, para que deje de ensanchar los demás bloques.
- **El Error frecuente que cita una opción de texto** usaría la misma orden. Hoy es `\(\boxed{\text{…}}\)` en línea, y las largas
  («La muestra II, porque todos los habitantes…») tampoco caben a 390 px.
- **La «ó» con otra letra** que viste en el paso anterior es otra cosa: MathJax dibuja los acentos de `\text{}` con otra fuente.
  Pasa en todos los rótulos con acento.

Si me lo devuelves, lo hago en una tanda por raíz, con la prueba en el XML y una captura a 390 px antes de tocar el banco.

## De paso: Funciones compuestas · Fundamental (id 1358)

Ya está escrito: 3 nuevas (`Facil-030` a `032`, PR 65 de cantu-quizzes-latex), que esperan su verificación a ciegas. Quedan 7 para
un quiz que saca 6. «La recta · Reto» ya tiene 18 en `main`. Las dos solo necesitan importarse con el siguiente build.
