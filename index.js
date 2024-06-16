document.addEventListener("DOMContentLoaded", function () {
  const formularioAlarma = document.getElementById("formulario-alarma");
  const alarmasContainer = document.getElementById("alarmas-container");
  const crearAlarmaButton = document.getElementById("crear-alarma");
  const botonContainer = document.querySelector(".boton");

  formularioAlarma.addEventListener("submit", function (event) {
    event.preventDefault();

    const hora = document.getElementById("hora").value;
    const tipo = document.getElementById("tipo").value;
    const textoVoz = document.getElementById("texto-voz").value;

    // crear y mostrar datos en navegador
    const nuevaAlarmaHTML = `
      <div class="alarma">
        <div class="hora">${hora}</div>
        <div class="flex">
          <div class="tipo">${
            tipo === "diario" ? "Diariamente" : "Lun a vie"
          }</div>
          <div class="tiempo-restante">La alarma sonará en un momento</div>
        </div>
        <div class="eliminar-icono"><i class="fas fa-trash-alt"></i></div>
      </div>
    `;

    // Insertar la nueva alarma en el contenedor
    alarmasContainer.insertAdjacentHTML("beforeend", nuevaAlarmaHTML);
    const nuevaAlarma = alarmasContainer.lastElementChild;

    let presionado = false;
    let timeoutId;

    const iniciarConteo = () => {
      presionado = true;
      timeoutId = setTimeout(() => {
        if (presionado) {
          nuevaAlarma.classList.add("mostrar-icono");
          botonContainer.classList.add("oculto");
        }
      }, 1000);
    };

    const cancelarConteo = () => {
      presionado = false;
      clearTimeout(timeoutId);
    };

    nuevaAlarma.addEventListener("touchstart", iniciarConteo);
    nuevaAlarma.addEventListener("touchend", cancelarConteo);
    nuevaAlarma.addEventListener("mousedown", iniciarConteo);
    nuevaAlarma.addEventListener("mouseup", cancelarConteo);

    const eliminarIcono = nuevaAlarma.querySelector(".eliminar-icono");
    eliminarIcono.addEventListener("click", () => {
      alarmasContainer.removeChild(nuevaAlarma);
      botonContainer.classList.remove("oculto");
    });

    formularioAlarma.reset();

    document.getElementById("modal-alarma").style.display = "none";
  });

  crearAlarmaButton.addEventListener("click", function () {
    document.getElementById("modal-alarma").style.display = "block";
  });

  const closeModalButton = document.querySelector(".modal .close");
  closeModalButton.addEventListener("click", function () {
    document.getElementById("modal-alarma").style.display = "none";
  });
});

function programarTextoAVoz() {
  var texto = document.getElementById("texto-voz").value;
  var horaInput = document.getElementById("hora").value;

  var horas = parseInt(horaInput.split(":")[0]);
  var minutos = parseInt(horaInput.split(":")[1]);

  var fechaProgramada = new Date();
  fechaProgramada.setHours(horas);
  fechaProgramada.setMinutes(minutos);
  fechaProgramada.setSeconds(0);

  var fechaActual = new Date();

  if (fechaProgramada < fechaActual) {
    fechaProgramada.setDate(fechaProgramada.getDate() + 1);
  }

  var tiempoEspera = fechaProgramada.getTime() - fechaActual.getTime();

  setTimeout(function () {
    var synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(texto);
    synth.speak(utterance);
    alert("Texto programado para ser hablado a las " + horaInput);
  }, tiempoEspera);

  // Mensaje de confirmación de programación
  alert("Texto programado para ser hablado a las " + horaInput);
}
