
let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

function ocultarSeccciones() {
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");
  document.getElementById("creditos").classList.remove("activa");
}

function mostrarSeccion(id) {
  ocultarSeccciones()
  document.getElementById(id).classList.add("activa");
}

function guardarTasa() {
  tasaInteres = recuperarInt("tasaInteres");
  if (tasaInteres >= 10 && tasaInteres <= 20) {
    alert("Si es válido")
  } else {
    alert("La tasa debe estar entre 10% y 20%")
  }
}

function guardarCliente() {

  let valorCedula = recuperaraTexto("txtCedula");
  let valorNombre = recuperaraTexto("txtNombre");
  let valorApellido = recuperaraTexto("txtApellido");
  let valorIngresos = recuperarInt("txtIngreses");
  let valoregresos = recuperarInt("txtEgresos");
  let existe = buscarCliente(valorCedula);
  if (existe == null) {
    let nuevoCliente = {};
    nuevoCliente.cedula = valorCedula;
    nuevoCliente.nombre = valorNombre;
    nuevoCliente.apellido = valorApellido;
    nuevoCliente.ingresos = valorIngresos;
    nuevoCliente.egresos = valoregresos;
    clientes.push(nuevoCliente);
    pintarClientes();
  } else {
    existe.nombre = valorNombre;
    existe.apellido = valorApellido;
    existe.ingresos = valorIngresos;
    existe.egresos = valoregresos;
    pintarClientes();
  }

}

function pintarClientes() {
  let divTabla = document.getElementById("tablaClientes");
  let cliente;
  let contenidoTabla = "<tabla>"
  for (let i = 0; i < clientes.length; i++) {
    cliente = clientes[i]
    contenidoTabla += "<tr><td>" + cliente.cedula + "</td>" +
      "<td>" + cliente.nombre + "</td>" +
      "<td>" + cliente.apellido + "</td>" +
      "<td>" + cliente.ingresos + "</td>" +
      "<td>" + cliente.egresos + "</td>" +
      "<td><button onclick=\"seleccionarCliente('" + cliente.cedula + "')\">Actualizar</button>" +
      "<button>Eliminar</button></td>" +
      "</tr>"
  }
  contenidoTabla += "</table>"
  divTabla.innerHTML = contenidoTabla
}

function buscarCliente(cedula) {
  let cliente;
  let clienteEncontrado = null;
  for (let i = 0; i < clientes.length; i++) {
    cliente = clientes[i];
    if (cliente.cedula == cedula) {
      clienteEncontrado = cliente
      break
    }
  }
  return clienteEncontrado
}
function seleccionarCliente(cedula) {
  let clienteSeleccionado = buscarCliente(cedula);
  if (clienteSeleccionado != null) {
    mostrarTextoEnCaja("txtCedula", clienteSeleccionado.cedula);
    mostrarTextoEnCaja("txtNombre", clienteSeleccionado.nombre);
    mostrarTextoEnCaja("txtApellido", clienteSeleccionado.apellido);
    mostrarTextoEnCaja("txtIngreses", clienteSeleccionado.ingresos);
    mostrarTextoEnCaja("txtEgresos", clienteSeleccionado.egresos);
  } else {
    alert("Cliente no encontrado")
  }
}
function limpiar() {
  mostrarTextoEnCaja("txtCedula", "");
  mostrarTextoEnCaja("txtNombre", "");
  mostrarTextoEnCaja("txtApellido", "");
  mostrarTextoEnCaja("txtIngreses", "");
  mostrarTextoEnCaja("txtEgresos", "");
}

function buscarClienteCredito() {
  let valorCedula = recuperaraTexto("buscarCedulaCredito");
  let clienteEncontrado = buscarCliente(valorCedula);
  let datosclienteCredito = document.getElementById("datosClienteCredito")
  if (clienteEncontrado != null) {
    datosclienteCredito.innerHTML = "<h3>Datos del Cliente</h3>" +
      "<p><strong>Cédula:</strong>" + clienteEncontrado.cedula + "</p>" +
      "<p><strong>Nombre:</strong>" + clienteEncontrado.nombre + "</p>" +
      "<p><strong>Apellido:</strong>" + clienteEncontrado.apellido + "</p>" +
      "<p><strong>Ingresos:</strong>" + clienteEncontrado.ingresos + "</p>" +
      "<p><strong>Egresos:</strong>" + clienteEncontrado.egresos + "</p>"
  } else {
    alert("Cliente no encontrado")
  }
}

function calcularDisponible(ingresos, egresos) {
  return ingresos - egresos;
}

function calcularCapacidadPago(montoDisponible) {
  return montoDisponible * 0.30;
}

function calcualarInteresSimple(monto, taza, plazoAnios) {
  return plazoAnios * monto * (taza / 100);
}

function calcualrTotalPagar(monto, interes) {
  return monto + interes + 100;
}

function calcularCuotaMensual(total, plazoAnios) {
  let mensual = total / (plazoAnios * 12);
  return mensual.toFixed(2);
}

function aprobarCredito(capacidadPago, cuotaMensual) {
  if (capacidadPago > cuotaMensual) {
    return true
  } else {
    return false
  }
}

function calcularCredito() {
  let monto = recuperarInt("montoCredito");
  let plazo = recuperarInt("plazoCredito");
  let valorCedula = recuperaraTexto("buscarCedulaCredito");
  let resultadoCredito=document.getElementById("resultadoCredito");
  clienteSeleccionado = buscarCliente(valorCedula);

  montoCalculado = calcularDisponible(clienteSeleccionado.ingresos, clienteSeleccionado.egresos);
  let capacidad = calcularCapacidadPago(montoCalculado);
  let totalPagar = calcualrTotalPagar(monto, tasaInteres);
  cuotaCalculada = calcularCuotaMensual(totalPagar, plazo);
  creditoAprobado = aprobarCredito(capacidad, cuotaCalculada);
  if(creditoAprobado==true){
    resultadoCredito.innerHTML="Capacidad de pago:"+capacidad+"<br>"+
  "Capacidad de pago: "+capacidad+"<br>"+
  "Total a pagar: "+totalPagar+"<br>"+
  "Cuota mensual: "+cuotaCalculada+"<br>"+
  "Resultado: Aceptado";
  resultadoCredito.className = "aprobado";
  }else{
    resultadoCredito.innerHTML="Capacidad de pago:"+capacidad+"<br>"+
  "Capacidad de pago:"+capacidad+"<br>"+
  "Total a pagar:"+totalPagar+"<br>"+
  "Cuota mensual:"+cuotaCalculada+"<br>"+
  "Resultado: Rechazado";
  resultadoCredito.className = "rechazado";
  }

  
}

//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios