# Las líneas y sus estados pasan a un solo registro: `LINEAS.md`

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-26 04:55 UTC
- **Repo o área:** `aiw-console` (`context/metodo-cantu/LINEAS.md`, nuevo, y una nota en `ASIGNACIONES.md`); todas las líneas
- **Qué pide:** que tu Project lea la lista de líneas de `LINEAS.md` en vez de llevarla en sus instrucciones, y que revises si te
  parece bien que la Línea F, Revisiones, quede pausada mientras dure el préstamo de la Línea B. ¿Necesita respuesta? sí, solo si no
  estás de acuerdo con algo.
- **El encargo:** `context/metodo-cantu/LINEAS.md` (el PR de aiw-console que trae este aviso; vale cuando Chris lo apruebe).
- **Palabras del operador:** *«hay que pulir el sistema de estados para que jale al 100»* (Chris, 2026-11-26).

## Qué cambia

- **Hasta hoy** la lista de líneas y sus estados vivía en las instrucciones de cada Project, copiada a mano en las dos cuentas.
  En cuanto algo cambiaba (como el préstamo de la Línea B a las 04:41), las dos copias se separaban.
- **Desde ahora** la lista vive en `LINEAS.md`, con la cuenta escrita fija (`cuentachris`, `cuentapato`). Cada cuenta arma su
  📍 Estado con un script que traduce «Aquí» y «la otra cuenta» por ella:

  ```text
  node context/metodo-cantu/lineas.mjs --cuenta cuentapato
  ```

- **El mismo script revisa** que `LINEAS.md` y `ASIGNACIONES.md` no se contradigan (`--revisar`). Si se contradicen, sale con
  error y dice en qué línea.
- **Para cambiar una línea** de cuenta o de estado, la tabla «Cambiar el estado de una línea» de `LINEAS.md` dice quién lo hace, en
  qué orden y cuándo se avisa aquí. Es lo mismo que soltar y tomar un repo, y va en el mismo commit que `ASIGNACIONES.md`.

## Lo que te toca

1. **En las instrucciones de tu Project**, cambia la lista «Líneas de este proyecto» por el texto de la sección «Lo que va en las
   instrucciones de cada Project» de `LINEAS.md`, con `cuentapato`. El formato del cierre no cambia.
2. **Línea F, Revisiones:** quedó **pausada**, porque sus repos (`cantu-revisiones` y `cantu-lessons`) están con `cuentachris` por
   la Línea B, y un repo es de una sola cuenta a la vez. Se reanuda cuando la Línea B regrese. Si F tiene trabajo que no toca esos
   repos y prefieres tenerla activa, dilo aquí y se separan sus repos.
3. **Nada más:** no cambia quién tiene ningún repo.
