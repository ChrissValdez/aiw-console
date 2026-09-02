# DECISIÓN DEL OPERADOR — `O7` no es su flujo de autoría, y baja al final

**Fecha: 2026-09-02** · **Ámbito:** orden de los objetivos de `cantu-studio`

---

## Lo que dijo, VERBATIM

```
ya vi, no son cosas tan urgentes
pense qu era mi flujo de trabajo para crear lecciones, pero realmente con generar los archviso de salida los creo

etnonces podemos bajarlo de prioridad, y vo,lver a poner 
«Cantu Studio UX
luego
Knowledge Base and Docs
y al final 
Lessons, Production, and Deployment
```

---

## Por qué importa guardarlo

**El operador subió `O7` a lo más urgente creyendo que era su flujo de trabajo para crear
lecciones.** Al leer qué contenía de verdad, descubrió que no: **su flujo real de autoría ya
funciona — genera los ficheros de salida y con eso crea las lecciones**.

`O7` no es eso. Es el paso siguiente: validar el recorrido de extremo a extremo, formalizar la
exportación, y decidir hosting y despliegue. **Cosas que aún no le hacen falta**, porque nadie
publica todavía.

**Sin este record, la próxima cabina lee «Lessons, Production, and Deployment» y vuelve a
suponer que es el camino crítico del autor.** No lo es. Esa suposición ya costó un reorden de
la cola y su reversión, en la misma sesión.

---

## Lo que la cabina le enseñó para que decidiera

Al pedirle explicación de `O7`, la cabina midió y publicó:

- **Es el objetivo menos maduro del roadmap.** Sus tres runs pendientes se clasificaron el
  **2026-08-01** y nadie los ha tocado. Sus textos son de plantilla, sin una sola cifra medida,
  a diferencia de los de `O6`, que llegaron densos porque se afinaron sobre la marcha.
- **`docs/operations/OPERATIONS-STATE.md`** —el documento cuyo trabajo es responder *«¿cuál es
  el estado operativo actual?»*— tiene 92 líneas, última verificación **2026-07-12**, y menciona
  export, deploy y hosting **cero veces**. El estado actual de esto no está escrito en ningún
  sitio.
- **`#183` iba a hacer crecer la cola**, porque su producto son runs de seguimiento.
- **`dist/` llevaba desde el 2026-08-13 sin reproducirse**, según el closeout de `#149`, así que
  validar producción contra `dist/` habría comparado contra un artefacto viejo.

---

## El orden que queda

1. **`O4` Cantu Studio UX**
2. **`O2` Knowledge Base and Docs**
3. **`O7` Lessons, Production, and Deployment**

**La razón medida que sigue en pie de la ordenación anterior, y que ahora se pierde:** el run de
auditoría de UX mira superficie de previa, botón de ajustes, cromo del editor, barra y
disposición de paneles — superficies con clases CSS. Los dos runs de renombrado de `O2` cambian
7 clases `jame-` y **334 clases `j-`**. Auditar la UX **antes** de renombrarlas significa que la
auditoría se hace sobre identificadores que van a cambiar.

**El operador conoce ese coste y aun así pone `O4` primero**, porque la auditoría de UX juzga
superficie visible y no identificadores. Queda dicho aquí para que no se redescubra como
hallazgo.

---

## Y la falsedad que esta conversación destapó

Al preparar la explicación de `O7`, la cabina fue a repetir un límite suyo —*«el export a Moodle
usa `CertUtil -encode`»*— y lo midió antes de decirlo por segunda vez. **Es falso**: `CertUtil`
aparece en cero ficheros de código. Ya estaba desmentido en el closeout de `#149`, cuyo texto
describe a la cabina de entonces con las palabras exactas que le valen a la de ahora: *«La
heredó de su relevo y la propagó sin comprobarla contra este disco.»* Corregido en el prompt de
arranque, commit `32b751f6`. **Sigue vivo en las REGLAS DE CABINA del Project**, que están fuera
del montaje y solo puede corregir el operador.
