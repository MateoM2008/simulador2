
let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

function ocultarSeccciones(){
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");
}

function mostrarSeccion(id){
  ocultarSeccciones()
  document.getElementById(id).classList.add("activa");
}

function guardarTasa(){
  let interes=recuperarInt("tasaInteres");
  if(interes>=10 && interes <=15){
    alert("Si es válido")
  }else{
    alert("La tasa debe estar entre 10% y 20%")
  }
}

//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios