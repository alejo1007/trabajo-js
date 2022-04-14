swal("Aprieta el boton para continuar").then((value) => {
  swal(`Muchas gracias.: ${value}`);
});

let divDolar = document.getElementById("divDolar");

document.getElementById("botonDolar").addEventListener("click", () => {
  fetch("https://criptoya.com/api/dolar")
    .then((promesa) => promesa.json())
    .then((data) => {
      let { oficial, blue, ccb, ccl, mep, solidario } = data;
      divDolar.innerHTML = `
            <p>Oficial:$ ${oficial} </p>
            <p>Solidario:$ ${solidario} </p>
            <p>Blue:$ ${blue} </p>
            <p>Contado con Bitcoin:$ ${ccb}</p>
            <p>Contado con liquidacion:$ ${ccl} </p>
            <p>Mep: $${mep} </p>
           
        `;
    });
});

document.getElementById("botonClientes").addEventListener("click", () => {
  fetch("./json/clientes.json")
    .then((response) => response.json())
    .then((data) => console.log(data));
});

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
