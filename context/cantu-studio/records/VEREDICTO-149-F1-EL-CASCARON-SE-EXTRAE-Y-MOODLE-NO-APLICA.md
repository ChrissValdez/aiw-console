# VEREDICTO DEL OPERADOR — `#149`: se extrae el ensamblador (F1) y Moodle no aplica (B1)

> Dado por **Christopher Valdez Cantu** el **2026-08-28**, sobre la parada de análisis de
> `RUN-CANTU-SLIDE-BUILD-OUTPUT-PATH-001`. **Verbatim.**

---

## VERBATIM

> **«F1»**
> **«B1»**

---

## QUÉ DECIDE

**F1 — SE EXTRAE EL ENSAMBLADOR DE DIAPOSITIVA COMO FUNCIÓN**, espejo del de Web, y `main.js`
pasa a consumirlo. **Un solo cascarón de diapositiva, como Web.**

**B1 — EL EMPAQUETADO TIPO MOODLE NO APLICA** al carril de diapositiva.

Y con ellas quedan cerradas las dos que la cabina tomó bajo D-071 y explicó al tomarlas:
**A1** —el fichero va a carril propio, `.SLIDE.html`, derivación literal de la convención de
Web— y **C1** —entran los dos botones de abrir la salida, porque sin «Abrir HTML» el run no
puede cerrarse por su propia QA—.

---

## LA RAZÓN DE F1, Y ES UNA MEDICIÓN, NO UNA PREFERENCIA

**Diapositiva YA TIENE DOS CASCARONES Y YA DIVERGEN.** Medido por el taller:

| pieza | el de construcción (`main.js`) | el de la previa |
|---|---|---|
| CSS | `readdirSync(src/design/slides).sort()` | **lista clavada a mano** |

**Hoy coinciden por casualidad** —el directorio tiene exactamente las dos hojas que la lista
enumera—. **El día que alguien añada una tercera, la previa y el build divergen en silencio.**

**`F2` habría convertido ese defecto en TRES cascarones.** Web resolvió exactamente este problema
extrayendo una función y haciendo que los dos lados la consuman; **diapositiva es el mismo
problema sin la misma solución.**

## LA RAZÓN DE B1, Y TAMBIÉN ES MEDIDA

El artefacto Moodle es **un fragmento sin documento, por contrato** —sin `<!DOCTYPE>`, sin
`<html>`, sin `<head>` propio— para pegarse dentro de una página cuyo `<head>` no controlamos.
Está razonado por escrito en el propio `buildSingleWebLesson.js`.

**Una diapositiva es lo contrario:** documento a pantalla completa 16:9 con runtime propio
—`fitEngine` y `slidesPlayer`— **que necesita su `<head>`**. Convertirla en fragmento le quita
las fuentes, KaTeX y el motor de encaje.

---

## LAS CUATRO CONDICIONES DE D-061 — porque F1 CRUZA A JAME CORE

**1 · La pide el operador por escrito.** ✅ «F1», sobre una recomendación que decía explícitamente
que la decisión era suya **porque `CLAUDE.md` regla 7 exige instrucción explícita para tocar
Core**.

**2 · Cae sobre la superficie que la QA ejercitó.** ⚠ **TENSIÓN DECLARADA.** La QA de este run
**no se ha ejecutado** — el run está en su parada de análisis y todavía no hay nada que mirar.

**3 · No cambia la identidad del run.** ✅ **Sin tensión.** El `run_id` dice *«dar al carril de
diapositiva un camino de construcción que el autor pueda disparar»*, y **extraer el ensamblador
es exactamente eso**.

**4 · El texto del run se enmienda en el MISMO encargo.** ✅ La cabina lo enmienda **antes** del
ticket de implementación — **y en la misma enmienda corrige su propia falsedad sobre `CertUtil`.**

---

## LO QUE F1 NO AUTORIZA

- **No autoriza cambiar lo que el cascarón produce.** La extracción tiene que salir
  **BYTE-IDÉNTICA** contra los 14 SLIDE de `dist/` y contra los 63 árboles fijados. **El taller
  declaró que no ha comprobado que se pueda**, sólo que debe. **Si no sale idéntica: PARA.**
- **No autoriza tocar el motor** —`renderSlides`, layouts, componentes—, que ya se reutiliza y no
  es el problema.
- **No autoriza tocar Web.** Es la referencia y se lee.
