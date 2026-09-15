# DECISIÓN DEL OPERADOR — `QA/temp/` se tría, no se mueve

**Fecha: 2026-09-14** · **Origen:** el operador notó 2 115 ficheros sin seguimiento y propuso
moverlos a `_scratch`
**Estado: RUN PENDIENTE.** Se encola **después de que cierre `#194`**, que está `active` y cuyo
taller escribe precisamente ahí.

---

## Lo que dijo, VERBATIM

```
estoy notando un monton de documetnos en QA/temp/... sin commitear
duda... no seria mejro esos ponerlos en AIW_Workspace\_scratch
para que no este encusiando el repo y mostrando cambias sin cambiar constantemente?
puede hacerse el cambio despues de este run si hace conflicto moverlo ahora
Y si me recomiendas que no, pues no lo hacemos

  -> «Run de triaje después de #194 (recomendada)»
```

**Su incomodidad era correcta y su solución no**, y las dos cosas se midieron antes de contestar.

---

## Lo medido, 2026-09-14

| | |
|---|---|
| ficheros bajo `QA/temp/` | **2 115** |
| `QA/temp` en el `.gitignore` de `cantu-studio` | **NO está** — por eso se ven todos |
| documentos que **citan** `QA/temp/…` | **≥ 40**, y el conteo se truncó en ese tope |

Entre los que citan: `REFERENCE-NAMING-DISPOSITION-AND-EXCLUSION.md`, los dossiers de reescritura,
`NAMING_DISPOSITION_MAP.md`, y decenas de paquetes de QA del operador.

---

## Por qué NO se mueve

**Mover `QA/temp` fuera del repo rompería de golpe las citas de más de cuarenta documentos.** Es
**exactamente** el defecto que esta misma sesión pasó cuatro runs barriendo —`#187`, `#189`,
`#190`, `#191`—: un directorio se mueve y los punteros se quedan con la ruta vieja. Hacerlo a
propósito, y a esta escala, sería el caso más caro de toda la serie.

**Y gitignorarlo no es mejor, es peor disfrazado:** el ruido desaparece hoy y las cuarenta citas
pasan a apuntar a ficheros que **solo existen en la máquina del operador**. Una cita a algo
irrecuperable es peor que una cita rota, porque no se nota.

---

## Lo que falla de verdad, y por eso hay run

**No es dónde están: es que nadie decidió qué son.** Y esa pregunta tiene respuesta **derivable**,
no de preferencia:

- **Lo que un documento cita es EVIDENCIA.** La clase `evidence` de
  `.aiw/docs/docs_retention_archive_policy.json` nombra literalmente *«QA reproductions»* y las
  manda *«retained permanently, byte-stable»*. Eso **se versiona donde está**; ni se mueve ni se
  ignora.
- **Lo que nadie cita es trabajo intermedio**, y la regla de la cabina ya existe: respaldos y
  trabajo suelto van a `_backups\` o `_scratch\`, **fuera de todos los repos**.

**El criterio es mecánico —citado o no citado— y por eso no lo decide el taller.**

---

## Por qué después de `#194` y no ahora

`#194` está `active` y su taller escribe en `QA/temp`. **Mover el suelo bajo un encargo en vuelo**
es de las pocas cosas que el ritual prohíbe sin matices. El operador lo anticipó él mismo en su
pregunta.

---

## Lo que NO está costando mientras tanto

**Ningún commit de esta sesión arrastró un solo fichero de `QA/temp`.** El `add` va dirigido por
nombre y la guarda del índice —añadida hoy, tras el commit `b9373704`— comprueba que no se cuele
nada: **8 staged, 0 de más**, dos veces seguidas.

El coste es **visual**, no de integridad. Conviene decirlo porque cambia la urgencia: esto es
higiene, no una fuga.

---

## Lo que el run tendrá que entregar

1. **Las dos cifras antes de mover un byte:** cuántos de los 2 115 están citados y cuántos no.
2. **La lista de los citados, con quién los cita**, para que el reparto sea auditable.
3. **Y una tercera cifra que la cabina sospecha y no midió:** cuántos son artefactos **derivados**
   —`.WEB.html`, `.MOODLE.html`, `.generated.js`, `.roundtrip.json`— regenerables desde su draft.
   Un derivado regenerable no es evidencia congelada del mismo modo que un paquete de QA, y esa
   distinción puede cambiar el reparto. **Está declarada como sospecha, no como medición.**
