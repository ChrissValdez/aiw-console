# DECISIÓN — el troceo de la migración de color, y las cuatro preguntas abiertas

> Tomada por **Christopher Valdez Cantu** el **2026-08-25**, sobre la propuesta que la cabina
> construyó a partir de la clasificación del taller. Aprobación verbatim: **«si procede»**.

---

## EL TROCEO APROBADO — cuatro lotes, en este orden

    LOTE 0 · LA TABLA COMPARTIDA            12 sitios · helpers/commons.js
             Va SOLO y va PRIMERO. Todo lo demás la lee.

    LOTE 1 · «PROCEDIMIENTO MATEMÁTICO»     70 superficies · 3 ficheros
             el color del PASO (45) + el de la NOTA (25)
             + el CONTRASTE de las insignias, que el operador mandó aquí

    LOTE 2 · LOS DE CELDA                   75 superficies · 3 ficheros
             Nota destacada (22) · Explicación guiada (20) · Tabla (16)
             Regla (13) · Anatomía de fórmula (4)

    LOTE 3 · PORTADA Y TARJETA              69 superficies · 14 ficheros
             Tarjeta (42) + Portada (27)
             La PORTADA NO TIENE CANAL DE COLOR: hay que crearlo.

**La razón del orden** es la regla que ya costó tres veces esta semana: **la pieza compartida se
arregla antes que quienes la usan.** Si `commons.js` cambiara después, los otros lotes se harían
dos veces.

## LAS CUATRO PREGUNTAS — tres decididas, una deliberadamente abierta

El operador aprobó las recomendaciones que la cabina le ofreció explícitamente como «si quieres
ir rápido». La cuarta se queda abierta **porque la propia recomendación era no decidirla
todavía**, y eso también es una decisión.

**1 · La variante «Sutil» RECIBE TOKEN.**
Es un gris que hoy no tiene token en la paleta. Razón: *un gris que no puedes cambiar es una
excepción que se olvida*. Afecta a 6 hexes en `renderCard.js:373,444,445` y
`renderCallout.js:325,326,144`.

**2 · LA PALETA GOBIERNA TAMBIÉN LA TINTA QUE VA ENCIMA DEL ACENTO.**
Es el rol `accentText`, que el compilador **ya sabe emitir** (`buildColorRolesOutput`). Afecta a
2 hexes: `renderIconList.js:260` y `renderRule.js:115`.

**3 · LOS CINCO LÁPICES DE LA BARRA DE ANOTACIÓN QUEDAN FUERA.**
Son cinco acentos de la tabla fija, pero **no pintan contenido de la lección**: son la
herramienta con la que el operador subraya mientras presenta. **Herramienta, no contenido.**
Afecta a 10 hexes en `inkEngine.js:209,213,214,215,216`, que salen del alcance de la migración.

**4 · EL GRIS POR DEFECTO DE LA NOTA DE «PROCEDIMIENTO MATEMÁTICO» — ABIERTA A PROPÓSITO.**
`#64748B` / `#F8FAFC` en `renderStackSlide.js:300`, y no corresponde a ningún token de la
paleta. **Se decide MIRANDO, dentro del lote 1**, que es donde vive. La cabina lo recomendó así
y el operador lo aceptó.

## LO QUE VIAJA CON EL LOTE 1, ADEMÁS DE SU COLOR

- **EL CONTRASTE DE LAS INSIGNIAS**: los seis pasos `str` del walkthrough quedan blanco sobre
  champán a **1,55:1**. `commons.VARIANTS` ya declara la tinta oscura del par —`#6B6352`,
  **5,95:1**—. `#133` lo midió y **no lo aplicó** porque emparejar tinta y acento es rediseño y
  no reparación de contradicción; el operador lo mandó aquí.

## LO QUE HAY QUE RESOLVER EN ALGÚN LOTE Y NO TIENE SITIO TODAVÍA

- **«JERARQUÍA» ACEPTA `variant` Y EL MOTOR YA NO LO LEE.** Tras `#133` su color entero es
  `node.color || '#5E81AC'`. **Un campo que el esquema acepta y el motor ignora es un campo que
  miente** — la clase que el operador lleva toda la sesión vetando. Y el respaldo es el `ctx`
  viejo, que no converge.
- **LOS 29 ACENTOS CONGELADOS EN HOJAS DE ESTILO**, que el censo de hexes excluye por
  construcción.
- **LA PORTADA NO TIENE CANAL DE COLOR**: el lote 3 no migra, **crea**.
