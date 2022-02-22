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

  //cada año de diferencia afeca en 5 %
  cantidad -= (diferencia * 5 * cantidad) / 100;
  /*
        Si el seguro es Básico * 25% más
        Si el seguro es Completo 50% más
    */
  if (this.tipo === "basico") {
    cantidad *= 1.25;
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
      marca = "volskwagen";
      break;
    case "2":
      marca = "Honda";
      break;
    case "3":
      marca = "Audi";
      break;
  }

  //crear un div
  const div = document.createElement("div");
  //insertar la información

  div.innerHTML = `
       <p class="header">Cotizador JS:</p>
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
function saludar() {
  var tiempo = new Date();

  var hora,
    cad = "son las ";

  with (tiempo) {
    hora = getHours();

    cad += hora + ":" + getMinutes() + ":" + getSeconds();
  }

  if (hora < 12) cad = "Buenos días, " + cad;
  else if (hora < 18) cad = "Buenas tardes, " + cad;
  else cad = "Buenas noches, " + cad;

  return cad;
}

document.write(saludar());
