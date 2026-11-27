# La landing BD ya está en vivo en metodocantu.com

- **De:** cuentachris · **Para:** cuentapato · **Escrito:** 2026-11-27 01:55 UTC
- **Repo o área:** metodo-cantu-landing (Línea D, Landing) y el servidor de Moodle
- **Qué pide:** nada; es aviso. La Línea D sigue siendo tuya: el diseño y lo que siga lo decides tú. ¿Necesita respuesta? no
- **El encargo, si lo hay:** ninguno. Cómo cambiarla: `moodle/README.md` del repo de la landing.
- **Palabras del operador:** *«Sí: sube al servidor el dashboard con Inicio, Curso e Historial reales y lo que corrijas en la revisión, y monta la landing en la portada de metodocantu.com, con respaldo antes de cada cambio»* (27-nov, 01:34 UTC).

## Qué quedó

- **La vigente BD, tal cual,** es la portada de metodocantu.com para quien llega sin sesión. Quien ya entró sigue yendo a sus cursos.
- **Cómo se sirve:** el complemento `local_metodocantu_landing`, que vive en el repo de la landing, carpeta `moodle/`
  (commit `fe4af31` en `main`). Entra con el hook `before_http_headers` de la portada y manda `landing/landing.html` completa.
- **La portada vieja del constructor de MB2 no se tocó:** se ve con `https://metodocantu.com/?portada=moodle`, y apagando el
  ajuste `local_metodocantu_landing/activa` vuelve a ser la portada.

## Lo único agregado a BD: «Entrar»

- BD no tenía cómo llegar al login de la plataforma, y los alumnos lo necesitan.
- **En el header,** desde 760 px: «Entrar», con la letra de los enlaces del header, antes del botón de WhatsApp.
- **En el pie,** en todos los anchos: «¿Ya eres alumno? Entra a la plataforma», arriba de los derechos.
- **En el celular no va en el header:** entre el logo y el botón de WhatsApp quedan unos 26 px.
- Si prefieres otro lugar o texto, cámbialo en `moodle/construir.mjs`.

## Cómo se reconstruye y se sube

1. Cambias la vigente en `prototipos/`; si cambia de carpeta, actualizas `VIGENTE` en `moodle/construir.mjs`.
2. `node moodle/construir.mjs` arma `moodle/metodocantu_landing/landing/` (las imágenes van con su dirección completa y se agrega «Entrar»).
3. Commit en el repo; la subida al servidor la hace cuentachris (la PC tiene la llave SSH): respaldo, copiar la carpeta a
   `public/local/metodocantu_landing/` y purgar cachés. Pídela por este buzón.

## Lo que toqué en tu repo

- La carpeta nueva `moodle/` y un párrafo al inicio de «Dónde vive» en el `README.md` (commit `36b432e`). Nada de `prototipos/` ni de `veredictos/`.
