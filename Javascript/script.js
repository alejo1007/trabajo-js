//constructor
function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}
//cotizarSeguro
Seguro.prototype.cotizarSeguro = function () {
  /*
        1 = americano 1.15
        2 = asiatico 1.05
        3 = europeo 1.35        
    */

  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;
  }

  //leer el año
  const diferencia = new Date().getFullYear() - this.anio;
  //cada año de diferencia afeca en 3 %
  cantidad -= (diferencia * 3 * cantidad) / 100;
  /*
        Si el seguro es Básico * 30% más
        Si el seguro es Completo 50% más
    */
  if (this.tipo === "basico") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }
  return cantidad;
};

//parte visual HTML
function Interfaz() {}

//Mensaje en HTml
Interfaz.prototype.mostarMensaje = function (mensaje, tipo) {
  const div = document.createElement("div");

  if (tipo === "error") {
    div.classList.add("mensaje", "error");
  } else {
    div.classList.add("mensaje", "correcto");
  }

  div.innerHTML = `${mensaje}`;
  formulario.insertBefore(div, document.querySelector(".form-group"));

  setTimeout(function () {
    document.querySelector(".mensaje").remove();
  }, 2000);
};

//imprime resultado de cotización
Interfaz.prototype.mostrarResultado = function (seguro, total) {
  const resultado = document.getElementById("resultado");
  let marca;

  switch (seguro.marca) {
    case "1":
      marca = "Americano";
      break;
    case "2":
      marca = "Asiático";
      break;
    case "3":
      marca = "Europeo";
      break;
  }

  //crear un div
  const div = document.createElement("div");
  //insertar la información
  div.innerHTML = `
       <p class="header">Tu resumen:</p>
       <p>Marca: ${marca}</p>
       <p> Año: ${seguro.anio}</p>
       <p>Tipo: ${seguro.tipo}</p>
       <p>Total: $ ${total}</p>   
    `;
  const spinner = document.querySelector("#cargando img");
  spinner.style.display = "block";

  setTimeout(function () {
    spinner.style.display = "none";
    resultado.appendChild(div);
  }, 500);
};

//capturar datops del formulario
const formulario = document.getElementById("cotizar-seguro");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  //leer la marca seleccionada
  const marca = document.getElementById("marca");
  const marcaSeleccionada = marca.options[marca.selectedIndex].value;

  //leer año seleccionado
  const anio = document.getElementById("anio");
  const anioSeleccionado = anio.options[anio.selectedIndex].value;

  //leer dato del radio Button
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  //crear instancia de interfaz
  const interfaz = new Interfaz();
  //revisamos que los campos no estén vacíos

  if (marcaSeleccionada === "" || anioSeleccionado === "" || tipo === "") {
    //interfaz imprimiendo error
    interfaz.mostarMensaje("Faltan Datos, revisa e intenta de nuevo", "error");
  } else {
    //limpiar resultados anteriores
    const resultados = document.querySelector("#resultado div");
    if (resultados != null) {
      resultados.remove();
    }

    const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
    //Cotizar el seguro
    const cantidad = seguro.cotizarSeguro(seguro);
    //mostrar resultado
    interfaz.mostrarResultado(seguro, cantidad);
    interfaz.mostarMensaje("Cotizando", "correcto");
  }
});

const max = new Date().getFullYear(),
  min = max - 20;

const selectAnios = document.getElementById("anio");

for (let i = max; i > min; i--) {
  let option = document.createElement("option");
  option.value = i;
  option.innerHTML = i;
  selectAnios.appendChild(option);
}

/*Saludo segun hora*/

class User {
  constructor(nombre, email, password) {
    this.nombre = nombre;
    this.email = email;
    this.password = password;
  }
}

let usuarios = [];

if (localStorage.getItem("Users")) {
  usuarios = JSON.parse(localStorage.getItem("Users"));
} else {
  localStorage.setItem("Users", JSON.stringify(usuarios));
}

let formUsers = document.getElementById("formUser");
let botonUsers = document.getElementById("botonUsers");
let divUsers = document.getElementById("divUsers");

formUsers.addEventListener("submit", (e) => {
  e.preventDefault();
  let nombre = document.getElementById("usernameID").value;
  let email = document.getElementById("emailID").value;
  let password = document.getElementById("passwordID").value;
  const user = new User(nombre, email, password);
  usuarios.push(user);

  localStorage.setItem("Users", JSON.stringify(usuarios));
  formUsers.reset();
});

botonUsers.addEventListener("click", () => {
  divUsers.innerHTML = "";

  usuarios.forEach((usuariosEnArray, indice, array) => {
    console.log(array);

    divUsers.innerHTML += `
          <div id="usuario${indice}" class="card border-secondary mb-3" style="max-width: 20rem;margin:10px">
              <div class="card-header"><h4>Usuario ${usuariosEnArray.nombre}</h4></div>
                  <div class="card-body">
                      <p class="card-title">Email: ${usuariosEnArray.email}</p>
                      <button id="boton${indice}" class="btn btn-danger">Eliminar</button>
                  </div>
              </div>
      `;
  });
  //usuario.nombreAtributo = nuevoAtributo
  usuarios.forEach((usuariosEnArray, indice) => {
    document.getElementById(`boton${indice}`).addEventListener("click", () => {
      divUsers.removeChild(document.getElementById(`usuario${indice}`));
      let indiceArray = usuarios.findIndex(
        (user) => user.nombre == usuariosEnArray.nombre
      );
      usuarios.splice(indiceArray, 1);
      localStorage.setItem("Users", JSON.stringify(usuarios));
    });
  });
});

/*-- funcion nadbar--*/
$(document).ready(main);

var contador = 1;

function main() {
  $(".menu_bar").click(function () {
    // $('nav').toggle();

    if (contador == 1) {
      $("nav").animate({
        left: "0",
      });
      contador = 0;
    } else {
      contador = 1;
      $("nav").animate({
        left: "-100%",
      });
    }
  });
}
/*-- fin nadbar--*/

/*--comienza carusell--*/
var myCarousel = document.querySelector("#myCarousel");
var carousel = new bootstrap.Carousel(myCarousel);
var myCarousel = document.querySelector("#myCarousel");
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 2000,
  wrap: false,
});
