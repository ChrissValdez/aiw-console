# DECISIÓN DEL OPERADOR — la superficie de activos va por import, no por contexto

**Fecha:** 2026-09-01 · **Run donde se tomó:** `RUN-JAME-CTX-ASSETS-CONTRACT-001` (`#177`)
**Origen:** la parada del taller de `#177`, commit `b8d7f6ce`

---

## La decisión, VERBATIM

```
b
```

Es la opción **B** de dos que se le dibujaron. Contestó con la letra, sin matices,
que es como decide cuando las opciones están dibujadas.

---

## Qué se le presentó

**Contexto:** el taller de `#177` **paró** acogiéndose a la condición 2 de «para y
reporta»: la hipótesis del criterio 1 —*que un objeto de contexto ya llega a los
sitios que emiten*— salió **desmentida en sus dos mitades**.

Lo medido, y verificado por la cabina contra los JSON del taller:

- **36 sitios de clase componente**, en **29 ficheros**. De ellos: **0** ven contexto
  por clausura, **0** por ámbito de módulo, **1** por parámetro — y ese uno es
  `options` de `renderVideo`, una bandera `{inColumnStack}`.
- **31 firmas** a cambiar y **34 sitios de llamada**, como cota inferior.
- El «contexto» se llama `runtime` en **6 bautizos** pero sale de **3 fábricas con 3
  formas distintas**, nace por llamada, y `main.js` hace ese papel con constantes de
  módulo sin `runtime` ninguno.
- Ejercido, no leído: 42 entradas de manifiesto, **161 documentos**, **1691 llamadas**
  a 40 renderizadores, 0 fallos.

**Las dos opciones:**

| | forma | coste de adopción |
|---|---|---|
| **A** | Crear el `ctx` e hilarlo por las firmas | **31 firmas + 34 sitios de llamada**, cota inferior |
| **B** ✅ | Superficie por **import**, sin hilado | **cero firmas** |

**Lo que sostiene B, y ya estaba en disco:** 11 ficheros de componente importan
`mintId` de `shared/` sin que nadie les hile nada — re-medido por la cabina: 15
menciones menos 3 ensambladores y la propia fuente—, `renderStackSlide` ya emite la
forma `[cuerpo][config]`, y `#176` había fijado en su capítulo 0 que el registro es
una **tabla de declaración leída en compilación**, sin estado por documento y **sin
`emit()` en las firmas**.

**Recomendación de la cabina: B.** Aceptada.

---

## LA CONSECUENCIA ESTRUCTURAL, que se le dibujó antes de decidir

Bajo la forma B **no existe ningún `ctx`**. El `run_id`
`RUN-JAME-CTX-ASSETS-CONTRACT-001` y el título «Define the ctx.assets contract»
describirían un alcance falso.

**Un identificador no se enmienda.** Enmendarlo deja la identidad mintiendo en todos
los records futuros. Así que:

1. **`#177` se cierra `completed`** con un `closeout_result` que declara la parada y
   su medición. **Conserva su `queue_order`.**
2. **Se abre un run nuevo en su posición**, con el nombre de la superficie que sí
   existe.
3. **La arista de `#178`** «Integrate the Asset Registry into renderers», que declara
   `depends_on: RUN-JAME-CTX-ASSETS-CONTRACT-001`, **se reapunta en la misma
   escritura**.

El operador tomó la decisión **conociendo esas tres consecuencias**, porque se le
escribieron antes de pedirle la letra.

---

## Lo que esta decisión NO decide

**El nombre del run nuevo.** La cabina lo lleva por separado, mostrando los campos
antes de escribirlos, porque el encuadre no está cerrado y un `run_id` equivocado
sólo se arregla destruyendo y recreando otra vez.
