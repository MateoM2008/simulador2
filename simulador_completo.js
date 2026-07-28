
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
}

function mostrarSeccion(id) {
  ocultarSeccciones()
  document.getElementById(id).classList.add("activa");
}

function guardarTasa() {
  let interes = recuperarInt("tasaInteres");
  if (interes >= 10 && interes <= 15) {
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
  let nuevoCliente = {};
  nuevoCliente.cedula = valorCedula;
  nuevoCliente.nombre = valorNombre;
  nuevoCliente.apellido = valorApellido;
  nuevoCliente.ingresos = valorIngresos;
  nuevoCliente.egresos = valoregresos;
  clientes.push(nuevoCliente);
  pintarClientes();
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
      "<td><button>Actualizar</button><button>Eliminar</button></td>" +
      "</tr>"
  }
  contenidoTabla+="</table>"
  divTabla.innerHTML=contenidoTabla
}

//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios