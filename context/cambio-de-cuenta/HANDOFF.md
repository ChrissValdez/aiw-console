# HANDOFF de cambio de cuenta

- **De la cuenta suplementaria a la principal**, por un rato: la principal tiene tokens que vencen hacia las 05:00 (hora de la PC). La
  principal ya tiene su cabina de LECCIONES (`local_3591b566-02e3-4c0e-8bca-146697b7fc03`). Se abre y se escribe «ya volví, revisa la
  carpeta del protocolo».
- **Escrito:** 2026-11-20, 04:05 (hora de la PC). Lo escribió la cabina de LECCIONES de la suplementaria
  (`local_f6677f4f-97d5-4ff8-aad1-45b02f781ebb`), que se queda esperando.
- **Por qué ahora:** el operador, tal cual: *«quiero temporalmente cambiar de cuenta y seguir trabajando en la otra cuenta… tengo
  tokens en otra cuenta que se vencen en 1 hora»*. Tope semanal de la suplementaria: **83 %** (se renueva el 21-nov, 00:00).
- **La pausa del 88 % es de la suplementaria.** El operador reservó su 12 % para otro trabajo. La principal no tiene esa regla, pero
  su ventana de 5 h y su semana mandan: medir con `get_usage`.
- **`sincronia.mjs`:** sale «NO CAMBIAR», solo por lo que se nombra abajo: las ramas de carril locales (están en el disco, no se
  pierden; los talleres nunca empujan), `cr-fig-04`, `cr-lx-13-hoja` y los worktrees de prueba de CR-PL·72. Puntas: cantu-lessons
  `f6681b10`, cantu-revisiones `a0405efc`, aiw-console el commit de este fichero.

## LECCIONES · el pulido CR-LX·14–25 (🟠 y 🟡 de la lectura externa)

El encargo está en `cantu-lessons/docs/carriles/CR-LX/pulido.md`, con la sección «Desde el 20-nov, 00:45 · gastar la mitad por
lección»: hoja de reglas, tandas de 2–3, Sonnet en esfuerzo medio para 🟡 de texto, Opus en esfuerzo medio para lo demás (nunca Fable),
1 subagente por taller, ningún 🔴 ni ⚠ nuevo frente a main, y no alargar escenas (si no cabe, vuelve a main y queda «en parte»).
Los 45 🔴 (CR-LX·08–12) ya estaban integrados.

### Hecho y publicado (71 de 217)

| ticket | lecciones | estado |
|---|---|---|
| ·22 + ·23 | EST, las 38 | integrado y publicado ✔ |
| ·16 | ALG-01 a 18 | integrado y publicado ✔ |
| ·14 | ARI-01 a 15 | integrado y publicado ✔ (04:00, main `f6681b10`) |

### Terminado en su rama, falta integrar (lo primero que hace la cabina que llega)

| ticket | rama y punta | qué |
|---|---|---|
| ·21 | `cr-lx-21` `c7775cd5` | GEO-23 a 44, las 22, con informe `21.md`. `node tools/cabina/integrar.mjs cantu-lessons cr-lx-21 c7775cd5` (~35 min). |
| ·20 | `cr-lx-20` `bae4b68a` | GEO-01 a 22: cerradas con commit GEO-01 a 19 y GEO-21. **GEO-20 y GEO-22 en commit provisional**: su última compilación ya salió con 0 🔴 y ningún ⚠ nuevo; les faltan las fotos y el commit de cierre. Falta el informe `20.md` (el script lo arma y cuadra). ⚠ nuevos aceptados (salto de Studio por partir pasos) en GEO-03, 07, 09, 13, 18 y 21. Relevo: `_scratch/CR-LX/20/herr/RELEVO.md`. Cerrar esas dos e integrar. |

`integrar.mjs` falla seguido en su paso 6 (push de aiw-console) porque DASHBOARD empuja a la vez: `git fetch; git rebase origin/main;
git push origin HEAD:main` en aiw-console, tras comprobar que `origin/main..HEAD` solo trae el renglón de ramas-integradas.

### Por hacer (las sesiones de taller son de la suplementaria: en la principal se abren nuevas desde su relevo)

| ticket | lecciones | dónde quedó |
|---|---|---|
| ·15 | ARI-16 a 29 | sin empezar (esperaba a ·14, ya integrado) |
| ·17 | ALG-19 a 36 | `cr-lx-17` `02b84476`: commit **PROVISIONAL**, primera pasada sin compilar; salió peor que main en ALG-19–22: compilar y rehacer lo que rompa |
| ·18 | ALG-37 a 55 | `cr-lx-18` `3d7b6996`: PROVISIONAL, apenas empezada |
| ·19 | ALG-56 a 73 | `cr-lx-19` `4c515be4`: PROVISIONAL, sin compilar: ALG-56 a 59 con primera pasada (56–57 salieron peor que main), ALG-60 a 62 a medias, ALG-63 a 73 sin tocar. Relevo: `_scratch/CR-LX/19/estado.txt` |
| ·24 | FUN-01 a 16 | `cr-lx-24` `1a9cc513`: PROVISIONAL |
| ·25 | FUN-17 a 33 | sin empezar (espera a ·24) |

Worktrees en `_scratch/CR-LX/<nn>/wt/cantu-lessons`. Compilar con `_scratch/CR-LX/turno-n.sh` y `--sin-miniaturas`.

**Al final del pulido:** aplicar `cr-lx-13-hoja` (`7639159f`, `copiar-puente.mjs --aplicar`), build completo, `cierre.mjs`, y la
lista de lo no hecho (los «no» y «en parte» de cada informe: las seis decisiones del operador, sistema, votos) para el operador.

### El cierre de LECCIONES

`tools/cabina/cierre.mjs`: **✔ listo** (medida de las 04:05, cantu-revisiones `a0405efc`, cantu-lessons `f6681b10`): 0 sin encargo,
0 por publicar, 0 votos obsoletos, 0 comentarios sin atender.

### Vigilantes

El vigilante de votos (`_scratch/cabina-lecciones/vigilar-votos.mjs 120`) y el de entregas (`_scratch/CR-LX/vigilar-entregas.mjs`,
vistos `11 22 16 23 14 21`) se apagan con esta sesión: **la cabina que llega los rearma**.

## Lo que la sincronía marca y no bloquea

- `cr-fig-04` (`618d8716`): sin cambio desde el handoff anterior; decidir si se retoma, se rehace o se archiva.
- Worktrees de prueba de CR-PL·72 con cambios sin commitear: borrar lo ajeno pide el sí del operador.

## Otras cabinas (no bloquean; que las vea su cabina)

- Resuelve-Esparza: 45 commits de GitHub sin bajar. metodo-cantu-dashboard: 5 sin bajar. phd-p2-experiment: 6 sin bajar.
- cantu-studio: 1 sin commitear (`package-lock.json`). metodo-cantu-landing: 1 sin commitear (`prototipos/AO-secciones-2-y-3/`).
