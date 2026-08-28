# VEREDICTO DEL OPERADOR — `#151`: los dudosos entran, y con ellos dos documentos que hoy mienten

> Dado por **Christopher Valdez Cantu** el **2026-08-28**, sobre los doce dudosos que el taller
> escaló en vez de resolver. **Verbatim.**

---

## VERBATIM

> **«apruebo la recomendacion procede»**

La recomendación era: **entran A y B, en esta misma ronda.** No entra `QA/temp/` ni lo que
**cuenta** lo que pasó.

---

## QUÉ ENTRA

**A · Nueve nombres de prueba y mensajes de aserción** que dicen «Cálculo aritmético». Son código
vivo, **no los lee el autor**, y sin embargo **afirman el nombre de hoy**. Ninguno se pone rojo —
por eso hacía falta mirarlos a mano.

> Un test llamado *«el selector ofrece «Cálculo aritmético»»* **ya es falso**.

**B · Dos documentos que el propio taller había clasificado como historia, y el disco dijo que
no:**

1. **`REFERENCE-SLIDE-WEB-COMPONENT-MAPPING.md`** declara **por escrito, en su cabecera**, que
   cita siempre la etiqueta **vigente**, *«including inside accounts of past events»*.
   **Este renombre acaba de dejar incumplida esa regla suya**, y una de sus tres apariciones **es
   un encabezado de sección**.
2. **`SLIDE-PER-COMPONENT-RUN-PLAN-PROPOSAL.md` §7** dice *«Six names are firm … `arithmetic` →
   «Cálculo aritmético»»*. **Afirma como FIRME un nombre que el operador acaba de cambiar.** Y el
   precedente de `timeline` **la enmendó en el sitio**, con un bloque «*Amended by…*».

## QUÉ NO ENTRA, Y NO ES OLVIDO

**`QA/temp/` entero** —39 de los 79 ficheros— y **los comentarios que CUENTAN lo que pasó**. Esas
frases **siguen siendo ciertas**: «aquel run retiró «Cálculo aritmético» de las columnas» es un
hecho histórico y reescribirlo sería falsificar el registro.

---

## POR QUÉ ESTO NO ES UNA AMPLIACIÓN SORPRESA

**El propio encargo abrió esta pregunta:** su bloque «para y reporta» decía que un caso dudoso
**se nombra y se pregunta, no se resuelve por criterio propio**. El taller lo hizo. **Este
veredicto es la continuación diseñada, no un giro.**

Aun así, las cuatro condiciones de D-061, porque ensancha la superficie que el run toca:

**1 · La pide el operador por escrito.** ✅ Verbatim arriba.
**2 · Cae sobre la superficie que la QA ejercitó.** ⚠ **TENSIÓN:** la QA visual **no se ha
ejecutado todavía** — el run va por su primera ronda. Lo que sí es cierto: los doce salieron del
censo que este mismo run produjo.
**3 · No cambia la identidad del run.** ✅ **Sin tensión.** El `run_id` dice *renombrar el
componente en los dos carriles*, y esto es exactamente dónde vive ese nombre.
**4 · El texto se enmienda en el mismo encargo.** ✅ Antes del ticket de la ronda 2.

---

## Y UN AVISO PARA QUE NADIE ESPERE DE MÁS

**Actualizar la etiqueta en el mapa NO arregla sus otras cuatro afirmaciones obsoletas** — las
que **tres runs seguidos** han encontrado, empezando por que dice que sólo Tarjeta y Narrativa
son insertables cuando hoy son once. **Eso sigue sin run**, y este veredicto no lo abre.
