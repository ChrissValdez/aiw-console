# VEREDICTO DE QA — `RUN-CANTU-EDITOR-DUPLICATE-BLOCK-AND-ITEM-001`

> Dado por **Christopher Valdez Cantu** el **2026-08-27**, sobre los cinco pasos de QA que
> preparó la cabina. **APROBADO.**

---

## VERBATIM

> **«funciona ien»**
>
> **«pass»**

---

## QUÉ SE LE PIDIÓ MIRAR

Cinco pasos, sobre el editor corriendo en `localhost:5173`:

1. Carril Web · cabecera de un bloque — el botón a la izquierda del de borrar, y que diga
   **«Duplicar componente»**.
2. Carril Web · pulsarlo — la copia justo debajo del original, sin diálogo.
3. Carril diapositiva · cabecera de una diapositiva — que ahí diga **«Duplicar diapositiva»**.
4. Carril diapositiva · **la Portada** — decisión de producto: ¿debe poder duplicarse?
5. Carril diapositiva · «Libre» · componente en celda — el trío editar · duplicar · eliminar, la
   etiqueta **«Duplicar componente (nombre)»**, y el clon a la primera celda libre con el original
   quieto.

## CÓMO SE LEE EL VEREDICTO

**Los pasos 1, 2, 3 y 5 quedan APROBADOS** por «funciona bien». Ningún `mal`.

**⚠ EL PASO 4 NO SE DECIDIÓ, Y SE DECLARA.** No era «bien/mal»: era una decisión de producto que
la cabina le subió por ser suya. Contestó **«pass»**. Se registra como **NO DECIDIDO**, no como
aprobado.

**QUÉ QUEDA VIGENTE MIENTRAS TANTO:** la Portada **SÍ se puede duplicar**, que es como lo entregó
el taller y lo que la cabina recomendó. Las dos razones que se le dieron, para que estén aquí el
día que quiera revisarlo:

- el editor **ya avisa** cuando hay más de una portada, así que el error es visible y se deshace
  borrando;
- prohibirlo obligaría a tratar un carril distinto del otro **dentro de la misma pieza
  compartida**, que es justo lo que hace valiosa a `BlockFrame` — una sola pieza para los cinco
  editores.

**Esto NO es un defecto declarado y no reparado.** Es una pregunta abierta que el operador eligió
no contestar hoy, y que puede contestar cuando quiera sin que nada se rompa: cambiar de opinión
cuesta una guarda en un editor, no un run.
