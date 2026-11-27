# Auditoría del curso PAA como alumno: arreglos para las lecciones de mate (Línea B)

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-27 02:02 UTC
- **Repo o área:** cantu-lessons y cantu-revisiones, Línea B «Lecciones mate»
- **Qué pide:** aplicar los arreglos de abajo a las lecciones (3 de prioridad alta, 8 de media y 12 detalles), o decir cuáles no y por qué. ¿Necesita respuesta? sí, un aviso con lo que se aplica y lo que no
- **El encargo, si lo hay:** este mismo aviso; la lista completa va aquí abajo
- **Palabras del operador, si las hay:** *«adelante hazlos»* (Chris, por el coordinador de su Project, al encargo de revisar el curso de mate como alumno antes de subirlo a Moodle)

---

## Lo que se revisó y qué salió

Leí como alumno las 217 `web.html` publicadas en `cantu-revisiones` (`d12e439`), con JavaScript apagado, y comprobé cada
cuenta. Las comparé contra el temario oficial: la Guía de estudio PAA 2020 del College Board (pp. 34 a 36) y «PAA Preguntas y
respuestas 2020».

**La matemática está bien: 0 errores de concepto.** Lo que sigue son huecos de temario, cosas que confunden y erratas. Nada
choca con tu formato web nuevo (cantu-lessons PR 5): todo se puede aplicar encima.

Lo de los quizzes y el XML de Moodle va en un aviso aparte para la Línea E
(`2026-11-27-0202-cuentachris-cuentapato-auditoria-paa-quizzes.md`).

## Prioridad alta

1. **Faltan las razones trigonométricas.** La guía 2020 dice «calcular razones trigonométricas» y hay 0 lecciones de seno,
   coseno o tangente. Propuesta: una lección corta después de GEO-12 (que ya enseña los triángulos 45-45-90 y 30-60-90), con
   los valores de 30°, 45° y 60° sin calculadora. La Línea E necesita esa lección antes de escribir sus preguntas.
2. **Falta la ampliación y reducción.** La guía nombra traslación, ampliación, reducción, reflexión y rotación; GEO-41 a
   GEO-44 enseñan bien tres y no la ampliación con centro. Propuesta: una sección en GEO-44 (multiplicar las coordenadas por k
   desde el origen, y qué pasa con los lados, el perímetro y el área).
3. **Las insignias de revisión se ven.** Los recuadros punteados con el código («ARI-03·S1») salen en la web que leería el
   alumno. Propuesta: una versión para el alumno sin ellos. Además, conviene probar en el piloto de Moodle una lección con
   fórmulas (KaTeX y fuentes por CDN), un «Paso a paso» viejo (se queda en el paso 1 sin JavaScript) y una nota plegada, para
   ver qué deja pasar su filtro HTML.

## Prioridad media

4. **ARI-01·S1 abre el curso con números complejos** (ℂ, 3 + 2i, √−9 = 3i), que el PAA no usa, y ALG-43·S5 luego dice que √−8
   «no es un número real». Propuesta: pasarlos a «Para saber más» y cambiar ℚ′ por «irracionales».
5. **Tres temas oficiales están marcados opcionales:** GEO-07 (ángulos y diagonales de polígonos), ARI-25 y ARI-26 (notación
   científica) y ARI-27 a ARI-29 (conjuntos y Venn). El ejemplo oficial n.º 15 es un Venn, y el quiz Polígonos ya trae 21
   preguntas de GEO-07 que la ruta esencial no ve. Propuesta: marcarlos esenciales o subir lo mínimo a una esencial.
6. **Congruencia y simetría se quedan cortas.** GEO-13·S1 no trae los criterios LLL, LAL y ALA, y no hay ejes de simetría de
   figuras (GEO-43·S2 solo trae simetría de giro). La guía pide «comparar figuras (simetría, congruencia y semejanza)».
7. **Palabras del examen que ninguna lección usa** (0 apariciones en las 217):

   | Término del examen | Preguntas del banco | Lo que dice la lección | Dónde |
   |---|---|---|---|
   | área superficial | 15 | «área total» | GEO-24 a GEO-26 |
   | área o superficie lateral | 6 | «la cara de alrededor»; el área lateral del cono (πrg) no se enseña y la pide `Volumen y Area · Medio-038` | GEO-25, GEO-26 |
   | eje de simetría (parábola) | 3 | «el eje» | FUN-08 |
   | centroide | 3 | solo «baricentro» | GEO-15 |
   | campo de valores | 0 (es la palabra de la guía) | «rango» | FUN-12, FUN-16 |

   Propuesta: una línea «En el examen se dice…» la primera vez, sin perder el lenguaje llano.
8. **Cuentas de calculadora** en ARI-23·S3 y los ejemplos guiados de ARI-23 y ARI-24: √1.1236, 1.04⁴ = 1.16985856,
   1.07³ = 1.225043. El PAA es sin calculadora. Propuesta: dejar M = C(1 + i)ⁿ o usar números amables.
9. **ARI-05·S3:** la regla «entre la décima parte y 10 veces el estimado» casi no descarta nada; la útil (×0.56 a ×2.25) ya
   está en «Para saber más». Propuesta: subirla al cuerpo.
10. **`docs/referencias/RUTA-DE-ESTUDIO.json` dice cosas que ya no son:** el `estado` de Álgebra dice «72 lecciones en el
    temario, sin escribir», y `supuestos_de_horas` (125 palabras por pieza a 120 por minuto) da 0.03 h para ARI-01. Las
    lecciones reales tienen unas 490 palabras (de 271 a 837) más fórmulas y ejemplos.
11. **Si se agregan las lecciones de los puntos 1 y 2,** `GEO-EST-FUN-PIEZAS.json` y la ruta tienen que saberlo, para que
    la Línea E pueda etiquetar sus preguntas nuevas.

## Detalles (prioridad baja)

12. FUN-02, ejemplo guiado: la caja de error dice «Incorrecto: 3(5) + 1 = 18», que no da 18; debe ser 3(5 + 1) = 18.
13. Cajas de error que citan un paso que la sección no muestra: ARI-25·S3 («el otro negativo»), ALG-09·S3 (x/(x−3) sin la
    ecuación) y FUN-05·S3 («sacar la raíz de 4»).
14. ARI-02·S5: «ninguna operación saca el resultado, salvo la división entre 0» → «la división entre 0 no está definida».
15. EST-03·S2 y S3: «El número de camiseta es cualitativa» → «es una variable cualitativa».
16. EST-19·S1: «se parece a un promedio de las distancias» y luego «se alejan 3, en promedio» se lee como contradicción.
17. ALG-29·S6: el sistema a + b = 5, b + c = 7, a + c = 8 solo está en las cajas de color, no en el texto.
18. ARI-24·S3: la «tasa» del plan de mensualidades es una tasa plana sobre el precio; aclararlo.
19. Fuera del temario, mejor opcionales: ARI-16·S6 y S7, ALG-27·S5 (Cramer), ALG-69, GEO-09·S4 (Herón), GEO-34, GEO-35,
    GEO-40·S3 y S4, EST-22.
20. La leyenda «Del dibujo vale lo escrito…» se repite bajo cada figura, hasta 10 veces por lección; basta una.
21. GEO-30: el título dice «cortados» y la dirección dice «desarrollos», y no hay desarrollos planos.
22. ARI-11 no trae las reglas de divisibilidad entre 4 y entre 8.
23. Los patrones numéricos son de Aritmética en la guía y el curso los deja al final (FUN-26 a FUN-30).

Una nota que no es tuya: `metodo-cantu-dashboard/piloto/armar.mjs` (Línea A, pausada) copia
`cantu-lessons/lecciones/<c>/web.html`, que no existe ahí, porque la web publicada vive en `cantu-revisiones/lecciones`. Se
arregla del lado de la Línea A cuando se reanude.

## Lo que está bien y hay que cuidar

- Las cajas de «Error común» anticipan el error real del alumno, y los ejemplos guiados dan el porqué de cada paso.
- El lenguaje llano funciona; el punto 7 solo pide nombrar el término técnico una vez.
- El formato web nuevo se lee completo aunque falle el JavaScript.

## Si no estás de acuerdo

Contradice lo que no te convenza en tu respuesta. Las cuentas de los puntos 5 y 7 salen de `GEO-EST-FUN-PIEZAS.json` y de
`Matematicas-moodle.xml` (`550893c`); el resto, de leer las lecciones publicadas.
