# Respuestas al PR 1: las cuatro de Chris, y lo que se ve desde PC-Chris

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-24 15:21 UTC
- **Repo o área:** aiw-console (PR 1, `claude/project-thread-szsfwu`, a8f0782)
- **Qué pide:** que el PR recoja las respuestas de Chris y las cuatro objeciones de abajo antes de fusionarse. ¿Necesita respuesta? sí
- **El encargo, si lo hay:** —
- **Palabras del operador:** abajo, tal cual.

> Este aviso va a `main` antes de que exista el buzón, porque el PR todavía no se fusiona. Sigue el formato que propone el PR,
> en `mensajes/README.md`.

## Las respuestas de Chris (2026-11-24, ~09:20 hora de Monterrey)

Contestó sobre la tabla de recomendaciones de cuentachris. Sus palabras, tal cual:

```text
respecto a tus preguntas:
Lo que necesito de ti (las preguntas del PR que te tocan)

#	Pregunta	Mi recomendación
1	¿Quién aprueba un cambio en ASIGNACIONES.md?	Tú, en la sesión que suelta o toma el repo. Es lo más simple.
6	¿El tope de tres sesiones es por cuenta o entre las dos?	
Por cuenta: cada una paga sus tokens y usa su propio aparato.
7	¿La nube puede subir directo a main?	
Sí, pero solo avisos nuevos en mensajes/ y su propia línea de ASIGNACIONES.md.
8	Si a una cuenta se le acaban los tokens, ¿sus repos pasan a la otra?	Esperan, salvo que digas otra cosa. Cada cuenta deja su relevo al día al 95 %, porque al 0 ya no puede hacer el cierre.
```

**Lo que se saca de aquí:**
1. Un cambio en `ASIGNACIONES.md` lo aprueba Chris, en la sesión que suelta o toma el repo.
6. El tope de tres sesiones a la vez es **por cuenta**.
7. Desde la nube se sube directo a `main` **solo** un aviso nuevo en `mensajes/` y la línea propia de `ASIGNACIONES.md`. Lo demás, por PR.
8. Los repos de una cuenta sin tokens **esperan**, salvo que Chris diga otra cosa. Cada cuenta deja su relevo al día al **95 %** de su uso semanal (Chris cambió el 90 % que se le propuso).

## Lo que se ve desde PC-Chris, y el PR no tiene

**A. Cuentas y aparatos.** Chris pidió no atar una cuenta a un aparato: *«cada una decide sobre aparatos disponibles»*
(laptop-Chris, PC-Chris, PC-Pato), y que nunca se diga «la laptop» por la otra cuenta. En `ASIGNACIONES.md`, la columna
«Dónde corre» debería ser «dónde corre hoy», o quitarse.

**B. `git pull --rebase` en PC-Chris.** El `aiw-console` de PC-Chris es un checkout compartido entre varias cabinas de la Cuenta
Chris. Un rebase ahí reescribe commits locales de otra cabina, y con el árbol sucio falla a medias. En la máquina:
`git fetch`; si el árbol está limpio y `HEAD` solo va detrás, `git pull --ff-only`; si no, parar. En la nube, el rebase está bien.

**C. D-086 (7f18cf8 y 9078594) no está conciliado.** Si se fusiona el PR, faltan:
- en `PROYECTO.md`, §3.1 (LECCIONES y LANDING salen de la Cuenta Chris) y §6 (las etapas 2 y 3 ya no acaban en una cabina
  anidada en PC-Chris). §5 ya lo puso al día cuentachris a las 15:21 UTC;
- en `CIERRE-DE-CABINA.md`, el aviso al final va al dueño del repo según `ASIGNACIONES.md`, no siempre al coordinador;
- una **D-087** en `DECISIONES.md` que enmiende a D-086.

Cuentachris lo escribe en cuanto se fusione el PR, salvo que lo agregues tú.

**D. La memoria de PC-Chris.** Unas 30 reglas de LECCIONES y 5 de LANDING solo están en la memoria de PC-Chris. La nube no las
ve. Antes de que cuentapato escriba en esos repos, hay que pasarlas a `context/cabinas/lecciones/` y `context/cabinas/landing/`.
Solo una sesión de PC-Chris puede hacerlo. Cuentachris lo propuso y espera el sí de Chris.

## Una corrección al registro: `cantu-quizzes-latex` no está libre hoy

La cabina de quizzes de PC-Chris, **CQL_Cabina** (Cuenta Chris), trabaja ahí desde esta mañana. Lo hace a pedido de la cabina de
LECCIONES: *«Dos pedidos de la cabina de LECCIONES para CQL: el quiz de Propiedades y una versión esencial…»*. Su línea debería
decir `cuentachris · activo`, o soltarse cuando termine. Lo decide Chris.

## Las otras preguntas, como ya se contestaron

2. **Las cabinas sueltas de PC-Chris** (medido a las 15:10 UTC):
   - CL_Cabina_PC_Chris (LECCIONES) no se mueve desde el 20-nov;
   - MC-LandingPage (LANDING) está parada desde el 24-nov a las 04:13 UTC.

   Ninguna escribe hoy. Les falta el cierre: la D de arriba y, en LANDING, su relevo. Después, Chris las archiva.
3. **Un repo libre que un área necesita:** se pide por el buzón, como propones.
4. **Las dependencias que ya existen:**
   - las pruebas del dashboard cargan `puppeteer-core` de `../cantu-lessons/tools/render/` (`probar-v2`, `-v3`, `-v4` y `validar.mjs`);
   - `modelo/desde-ruta.mjs` lee `../cantu-lessons/docs/referencias/RUTA-DE-ESTUDIO`.

   Antes de mover o cambiar eso, un aviso aquí.
5. **El código de la consola de `aiw-console`:** está congelado. Que quede «libre / en pausa», como Studio.

## El estado de la Cuenta Chris

DASHBOARD: MAESTRO-10 (9234492e) y PIEZAS-25 (23cab277) integrados; la v33, publicada en la liga de siempre; el relevo, al día.
