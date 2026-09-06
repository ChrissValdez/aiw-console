# VEREDICTO — `#186`: las cuatro puertas ya hablan la misma lengua

**Fecha: 2026-09-05** · **Run:** `RUN-CANTU-JSON-IMPORT-MATH-VALIDATION-PARITY-001`
**Commit del trabajo:** `2373a7d5`

---

## El veredicto, VERBATIM

```
paso 1:
No se insertó nada. Corrige y reintenta:
Bloque 1 (stackSlide) — steps.1.math: La fórmula no es válida: el comando \noexiste no está en la lista de comandos permitidos (posición 1).
paso 2:
1 bloque insertado al final del flujo Slide.


Paso 3 — este debe ser rechazado, pero dándote la salida
No se insertó nada. Corrige y reintenta:

* Bloque 1 (stackSlide) — steps.0.math: La fórmula no es válida: los símbolos < y > sueltos no están permitidos; usa \lt y \gt.
```

---

## ⚠ ES EL PRIMER VEREDICTO DE LA SESIÓN CON DETALLE POR PASO

**Todos los anteriores fueron `pass` globales.** Este trae **los tres pasos por separado y sus
mensajes literales**, copiados de la pantalla.

Eso cambia lo que el veredicto vale: no es una aprobación del conjunto sobre la palabra del
operador, es **la salida real de la puerta, transcrita por quien la vio**. Y coincide byte a byte
con lo que la cabina había medido conduciendo `parseAndValidateBlocks` antes de entregarle el
material.

---

## Lo que los tres pasos demuestran

| paso | lo que se pedía | lo que salió |
|---|---|---|
| **1** | rechazar y **nombrar el sitio** | `steps.1.math` — el segundo paso, el campo exacto, el comando y la posición |
| **2** | entrar sin protestar | *«1 bloque insertado al final del flujo Slide»* |
| **3** | rechazar **dando la salida** | *«…usa `\lt` y `\gt`»* |

El paso 2 llevaba **las tres admisiones de los runs anteriores a la vez** —`\color`, `\ge`,
`\gt`, `\ne` y `\xrightarrow`—, así que su aceptación confirma que este run **no rompió ninguno
de los tres**.

Y el paso 1 es exactamente el defecto que el operador reportó hace cuatro runs: **antes eso
entraba sin protestar y el error salía después, al editar, sin que él pudiera saber por qué.**

---

## LA CADENA QUE ESTE VEREDICTO CIERRA

Empezó cuando el operador dijo que no podía editar sus propias fórmulas. Terminó con **cuatro
puertas consultando la misma lista y tres guardas atadas**.

| run | qué destapó |
|---|---|
| `color` | la cabina había generado contenido con un comando que el editor no admite |
| **el diagnóstico del operador** | *«no está sincronizado lo que acepta el editor con la revisión del json insertado»* — **mejor que el de la cabina**, que se había quedado en «escribí el comando equivocado» |
| `alias-gap` | **no se podía escribir una desigualdad estricta en todo el sistema**. Nadie lo sabía |
| `keyboard-parity` | el teclado insertaba lo que el sanitizador rechazaba, porque se validó contra KaTeX y nunca contra la allowlist |
| `import-parity` | la puerta de importación validaba estructura y no fórmula, en doce campos |

**Las cuatro puertas: editor, teclado, importación y esquema.** Las tres guardas: la de `INV-5`
del registro de activos, la del teclado, y la de esta paridad.

**Todos los defectos de la cadena los encontró el operador usando el producto.** La cabina los
midió y los encuadró, pero **ninguno salió de una medición suya**.

---

## Lo verificado por la cabina antes de la QA

Conduciendo la puerta real y no leyendo código: válido acepta; `math` inválido rechaza nombrando
bloque, campo, comando y posición; **`preMath` inválido rechaza** —el campo que el ticket original
no vio—; el crudo rechaza con la salida; y `color`, `ge` y `xrightarrow` pasan.

`importedMathParity.js` **deriva**: importa `validateLatexPayload` y la mensajería, y **no declara
ni un comando propio** en 108 líneas. La invariante **corre antes de mirar el dato**, deriva el
censo del árbol de esquema —13 hojas para doce campos— y cuesta 0,68 ms por llamada. `src/content`
intacto. Suite 2367 → 2376.

---

## Lo que queda vivo, nombrado y sin run

- **La tabla del sandbox** no se podrá reimportar hasta que alguien la reescriba a `\lt` / `\gt`.
  Sus crudos están vetados por seguridad y el veto se queda. **Fleco declarado desde el principio.**
- **Cuatro superficies `result`** —split web, aritmética web ×2, aritmética de diapositiva— siguen
  sin allowlist. El taller midió que cero valores vivos fallarían, y **la cabina NO lo verificó**.
  Es un hueco de la misma clase que este run cerró.
- **Los diez pulsables de la clase C** del teclado, listados en su guarda.
- **El teclado se tocó dos veces en el `5173` del operador**, y en la segunda se restauró un
  borrador local para llegar al botón. Declarado las dos veces.
