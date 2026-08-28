# VEREDICTO DEL OPERADOR — `#153`: el recuadro se parte en dos, y sólo entran las dos baratas

> Dado por **Christopher Valdez Cantu** el **2026-08-27**. **Verbatim.**

---

## VERBATIM

> **«si»**

Sobre la recomendación: **abrir el `#153` con el alcance partido en dos** — «Después del último =»
y «Sin recuadro» ahora, **«Antes del último =» y «Las dos mitades» nombradas y sin abrir**.

---

## LO QUE HIZO POSIBLE PARTIRLO, Y NO SALIÓ DE ESTE RUN

`RUN-JAME-SLIDE-READINESS-EVIDENCE-001` —la auditoría del conjunto, que corrió sin el operador
delante— **respondió la pregunta de coste del `#153` sin implementar nada de él**, porque era una
medición de lectura. **La cabina no se lo creyó: corrió su misma sonda y obtuvo el mismo
resultado.**

**LO MEDIDO:**

- **El motor de diapositiva NO lee `resultBox`.** Cinco renders con las cinco formas del campo
  salen **idénticos**, 5 de 5.
- **El pie que escribe hoy EQUIVALE al `after` de Web.** En los dos motores la mitad izquierda va
  plana y la derecha en recuadro.

**CONSECUENCIA:** el valor por defecto **sale gratis** y **el corpus no cambia de pintado**.

## Y EL COSTE QUE LA PREGUNTA NO CUBRÍA — es lo que parte el run

`before` y `both` **no son un caso más del mismo desplegable**:

1. **Exigen partir `lead` y `eq` en el `parseResult` de diapositiva**, que hoy sólo devuelve dos
   piezas.
2. **Chocan con el autoajuste.** El pie es una banda cuya palanca lleva `menor: 10/13`, **y ese
   10/13 ES la mitad plana**. Con `both` **no hay mitad plana**.

**O sea: dos de las cuatro colocaciones tocan el motor de ajuste**, que es la pieza que este
proyecto lleva rondas midiendo con cuidado. **Meterlas en el mismo run habría convertido un
desplegable barato en un run de autoajuste.**

---

## LO QUE ENTRA Y LO QUE NO

| colocación | rótulo en pantalla | entra |
|---|---|---|
| `after` | «Después del último = (por defecto)» | **sí** — ya es lo que se pinta |
| `none` | «Sin recuadro» | **sí** |
| `before` | «Antes del último =» | **no** — nombrada, sin abrir |
| `both` | «Las dos mitades» | **no** — nombrada, sin abrir |

**Las dos que quedan fuera no se pierden: quedan escritas con su coste medido**, y abrirlas es una
decisión posterior del operador que ya sabe lo que cuesta.

---

## UNA DECISIÓN DE CABINA BAJO D-071, EXPLICADA AL TOMARLA

**Web sólo ofrece `resultBox` en factorización, no en modo matriz.** El operador no decidió sobre
eso porque nadie se lo preguntó.

**Se copia la asimetría de Web: el control entra SÓLO en factorización.** Razón: es el precedente
vivo, y la dirección de toda esta tanda ha sido *«la forma buena ya existe en Web y no hay que
inventarla otra vez»*. **Abrirlo en matriz sería inventar, no portar.**

**Y se nombra en vez de taparse:** medido por la auditoría, **el pie de diapositiva es
incondicional donde el de Web es condicional**, así que en matriz sí hay un pie que hoy nadie
puede apagar. **Si el operador quiere el control también ahí, es otra decisión y otro run.**

**Es reversible y barato de deshacer si dice que no.**
