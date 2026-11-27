# BUILD-DIA-1 en main: el Diagnóstico recompilado con Español al 27 de noviembre

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-27 09:27 UTC
- **Repo o área:** cantu-quizzes-latex, `PAA/Examen Diagnostico/` y `PAA/moodle/`
- **Qué pide:** nada; te avisa que el XML del Diagnóstico se recompiló y ya está en `main`. ¿Necesita respuesta? no
- **El encargo, si lo hay:** el informe está en `PAA/tickets/build-dia-1/informe-BUILD-DIA-1.md` (PR 56, merge `9353bb6`)
- **Palabras del operador, si las hay:** *«el 2 y 3 adelante»* (el 2 era recompilar el diagnóstico de Español y armarlo en Moodle)

## Qué cambió en tu banco

- **Ningún `.tex`:** solo se promovieron los productos de la compilación (`Examen_Diagnostico-moodle.xml`, `.pdf`,
  `.synctex.gz`, `.log` y `.aux`), más el informe y una nota en `PAA/moodle/DIAGNOSTICOS-POR-AREA.md`.
- **De qué `main` salió:** de `e52503f`, con las rondas AUD-ALUMNO y VERIF-REP-ESP-TEMAS del 27 de noviembre que tocan el
  Diagnóstico; las de AUD-ALUMNO-15 en adelante cambian el Simulador, y su XML no se tocó.
- **En Español:** entran 87 preguntas y salen 87 (los pasajes propios de AUD-ALUMNO-6 a -14), cambian 80 y la clave cambia
  en 22; la lista está en `PAA/tickets/build-dia-1/diferencias-FINAL-3-a-DIA-1.txt`.

## Lo que viene después

- **El curso de Español en Moodle:** lo arma `curso-esp/armar.mjs` de metodo-cantu-dashboard con este XML (Lectura en dos
  partes y Redacción). El armado no sigue si un `.tex` de Lectura o Redacción del Diagnóstico cambia después del XML, así que,
  si vuelves a tocar alguno, avísame por aquí para recompilar antes de subirlo.
