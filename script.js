// Prototipo de demostración: todo se guarda en localStorage del navegador,
// no hay servidor ni consulta real a SAMAI/TYBA ni envío real de WhatsApp.

const STORAGE_KEY = "vigilancia_registro_v1";

function soloDigitos(valor) {
  return (valor || "").replace(/\D/g, "");
}

function validarRadicado(valor) {
  return soloDigitos(valor).length === 23;
}

function validarWhatsapp(valor) {
  const digitos = soloDigitos(valor);
  return digitos.length >= 10 && digitos.length <= 15;
}

function actuacionesSimuladas(plataforma) {
  const fuente = plataforma === "tyba" ? "TYBA / Justicia XXI Web" : "SAMAI";
  return [
    {
      fecha: "2026-10-14",
      texto: `Auto que admite escrito de la parte demandada (fuente: ${fuente}).`,
    },
    {
      fecha: "2026-10-08",
      texto: `Se fija fecha de audiencia para el 2026-11-05 (fuente: ${fuente}).`,
    },
    {
      fecha: "2026-09-29",
      texto: `Notificación por estado de auto admisorio (fuente: ${fuente}).`,
    },
  ];
}

function whatsappSimulado(radicado, whatsapp) {
  const corto = radicado.slice(-6);
  return [
    {
      hora: "2026-10-14 09:12",
      texto: `Hola, tu proceso terminado en ...${corto} tiene una novedad: Auto que admite escrito de la parte demandada. Enviado a ${whatsapp}.`,
    },
    {
      hora: "2026-10-08 18:40",
      texto: `Tu proceso terminado en ...${corto} tiene audiencia programada para el 2026-11-05. Enviado a ${whatsapp}.`,
    },
  ];
}

function guardarRegistro(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function leerRegistro() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (e) {
    return null;
  }
}

function initFormulario() {
  const form = document.getElementById("registro-form");
  if (!form) return;

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();

    const radicado = document.getElementById("radicado").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const plataforma = document.getElementById("plataforma").value;

    const errRadicado = document.getElementById("error-radicado");
    const errWhatsapp = document.getElementById("error-whatsapp");

    let valido = true;

    if (!validarRadicado(radicado)) {
      errRadicado.style.display = "block";
      valido = false;
    } else {
      errRadicado.style.display = "none";
    }

    if (!validarWhatsapp(whatsapp)) {
      errWhatsapp.style.display = "block";
      valido = false;
    } else {
      errWhatsapp.style.display = "none";
    }

    if (!valido) return;

    guardarRegistro({ radicado: soloDigitos(radicado), whatsapp, plataforma });
    window.location.href = "panel.html";
  });
}

function renderPanel() {
  const chip = document.getElementById("subscriber-chip");
  const content = document.getElementById("panel-content");
  const logList = document.getElementById("whatsapp-log-list");

  const registro = leerRegistro();

  if (!registro) {
    chip.textContent = "Sin registro aún";
    content.innerHTML =
      '<div class="empty-state">Todavía no has registrado un proceso. <a href="index.html">Regístralo aquí</a> para ver el panel de ejemplo.</div>';
    logList.innerHTML = "";
    return;
  }

  chip.textContent = "WhatsApp: " + registro.whatsapp;

  const actuaciones = actuacionesSimuladas(registro.plataforma);
  const fuente = registro.plataforma === "tyba" ? "TYBA / Justicia XXI Web" : registro.plataforma === "samai" ? "SAMAI" : "Por confirmar";

  content.innerHTML = `
    <div class="process-list">
      <div class="process-card">
        <div class="process-top">
          <div>
            <div class="process-radicado">${registro.radicado}</div>
            <div class="process-meta">Fuente: ${fuente} · Última revisión: hace 3 horas (simulado)</div>
          </div>
          <div class="status-pill status-nuevo">Novedad reciente</div>
        </div>
        ${actuaciones
          .map(
            (a) => `
          <div class="actuacion">
            <div class="fecha">${a.fecha}</div>
            <div>${a.texto}</div>
          </div>`
          )
          .join("")}
      </div>
    </div>
  `;

  const mensajes = whatsappSimulado(registro.radicado, registro.whatsapp);
  logList.innerHTML = mensajes
    .map(
      (m) => `
    <div class="whatsapp-msg">
      <div class="icon">💬</div>
      <div>
        <div>${m.texto}</div>
        <div class="time">${m.hora}</div>
      </div>
    </div>`
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", initFormulario);
