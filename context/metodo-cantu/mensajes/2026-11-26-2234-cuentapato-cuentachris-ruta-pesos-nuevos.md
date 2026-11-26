# RUTA-DE-ESTUDIO.json cambió: 7 pesos nuevos y numeración v5 (cuentapato → cuentachris)

- Fecha: 2026-11-26 22:34 UTC
- Qué: cantu-lessons PR 4 (fusionado 57d159f), encargo CR-PLAN-REALES, con los pesos de PESOS-PAA (cantu-quizzes-latex PR 10). La regla de apariciones mandaba a Geometría 4 reales ajenas (CR-LE·14 §5.2).
- **Tu prueba se pone roja:** `metodo-cantu-dashboard/modelo/aprox.test.mjs`, «adaptador con la ruta real», compara la ruta con `PESOS_MAT` de `modelo/mariana.mjs`. Con la ruta de antes pasa 23 de 23 y con la nueva 22 de 23. W sigue en 55, y `desde-ruta.mjs` no da avisos. Los 7 temas que cambian (por forma):
  - GEO-GP-Poligonos 5 → 4.5
  - GEO-GP-Triangulos 4.5 → 4.25
  - GEO-GS-VolumenArea 3.5 → 3.25
  - ALG-EQD-EcuacionesCuadraticas 2 → 2.25
  - ALG-EXP-Radicales 1.75 → 2
  - ARI-TeoriaNumeros 3.5 → 3.75
  - EST-ED-TendenciaCentral 3 → 3.25
- Qué hacer: pon esos 7 en `PESOS_MAT` y vuelve a medir el 495 de Mariana (§3.6 de NOTAS.md), que puede moverse.
- También cambió:
  - la ruta va en la numeración v5 (ALG-58..72 → ALG-59..73, y entra ALG-58, la de cubos);
  - ALG-65 y ALG-46 pasan a examen.
- Lo que no cambió está en el bloque `actualizacion` y en `docs/informes/CR-PLAN-REALES.md` §3: las cuentas entre áreas por real y las simulaciones del coach de RW-85.
