# Vigilancia de Procesos Judiciales

Prototipo de micro app para el abogado Simon Ackerman: vigilancia de procesos judiciales (SAMAI / TYBA - Justicia XXI Web) con avisos automáticos por WhatsApp a los suscriptores.

## Qué es esto

Un **prototipo navegable** (sin backend, sin consultas reales todavía) para validar la idea con Simon y con posibles clientes antes de invertir en la parte técnica real:

- `index.html` — Landing + formulario de registro (número de radicado de 23 dígitos + WhatsApp).
- `panel.html` — Panel de procesos vigilados, con actuaciones y avisos **simulados**.
- Los datos de registro se guardan solo en el navegador (localStorage), no hay servidor ni base de datos real.

## Qué falta para la versión real (no incluido en este prototipo)

- **Consulta automática periódica** a SAMAI y TYBA — requiere un servidor/cron, no corre solo en una página.
- **Envío real por WhatsApp** — requiere la API oficial de WhatsApp Business, plantillas aprobadas y consentimiento explícito de cada suscriptor.
- **Acceso a TYBA**: la pantalla de TYBA que se revisó pide usuario/contraseña. Falta confirmar si existe una consulta pública sin login.
- **Cobro de la suscripción** ($49.000 COP/mes acordado con Simon) — pasarela de pagos.
- **Cumplimiento de habeas data** (Ley 1581 de 2012 de Colombia) por guardar radicados y números de teléfono de terceros.

## Preguntas pendientes para Simon

1. ¿Qué debe avisarse? ¿Cualquier actuación nueva, o solo ciertas (autos, sentencias, audiencias, vencimiento de términos)?
2. ¿Con qué frecuencia deben revisarse los procesos (diario, varias veces al día)?
3. ¿Hay una consulta pública a TYBA sin login, o solo con credenciales?
4. ¿Los suscriptores son abogados, clientes o ambos? ¿Cuántos procesos incluye cada plan?

## Publicar en línea (gratis)

1. Crear una cuenta de GitHub (gratuita) con el correo nuevo del proyecto.
2. Crear un repositorio público, por ejemplo `vigilancia-procesos`.
3. Subir este contenido a ese repositorio.
4. En **Settings → Pages** del repositorio, activar GitHub Pages apuntando a la rama principal (carpeta raíz).
5. El sitio queda disponible en `https://<usuario>.github.io/<repositorio>/`.

Se puede invitar a Simon como colaborador del repositorio para que vea el avance.
