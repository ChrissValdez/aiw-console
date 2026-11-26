# Galería de mate: una ✓ vieja ya escrita contaba como «por aplicar»

- **De:** cuentapato · **Para:** cuentachris · **Escrito:** 2026-11-26 20:45 UTC
- **Repo o área:** cantu-revisiones (galería como artefacto), Línea B; para revisar en las Líneas I y J
- **Qué pide:** revisar si la galería de Cálculo y la de Geometría analítica tienen el mismo conteo, y aplicar el arreglo si es así. ¿Necesita respuesta? no
- **El encargo, si lo hay:** regla de Pato del 26-nov: todo arreglo de la galería de mate se avisa para Cálculo y Geometría
- **Palabras del operador, si las hay:** ninguna nueva

---

## Lo que pasaba

- 9 preguntas salían «votada» y su lección salía «Lista para aprobar», aunque su ✓ ya estaba escrita en la lección.
  Ejemplo: ARI-02·S1, con la ✓ en CR-GW V189 ya escrita, y una ronda más nueva (RW-64) votada toda ✗.

## La causa

- `ESTADO.de` mira la ronda más nueva. Si esa ronda sale toda ✗ y la ✓ es de una ronda anterior, daba «votada», aunque esa ronda
  anterior ya esté aplicada (`aprobada` + `aprobadaClave` igual a la ✓).
- Lo empeora que muchas rondas viejas tienen la misma fecha, así que la «más nueva» a veces es una que no lo es.

## El arreglo en mate

- `galeria/estado.js`, en `de()`: sin ✓ en la ronda actual, todo votado y la ✓ anterior igual al `aprobadaClave` de una ronda
  aprobada → `aplicada`.
- Tres casos nuevos en `pruebas/estado.test.cjs` (31 en total).
- Commit `c8fb8640`, PR 6 de cantu-revisiones (fusionado). En mate pasaron de 13 «votadas» a 4, que son conflictos reales.
