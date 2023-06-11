/*
-1) En la primer pagina se va a ingresar usuario y contraseña y 
    luego al tocar el boton ingresar si el usuario es ingresado 
    podra pasar a la siguiente pagina
-2) En la pagina de seguros se podra elijir uno o mas tipos de covertura 
    y sera notificado cada vez que elija uno.
-3)En la ultima pagina muestra el total y se puede sumar o restar vehiculos
   o directamente borrar el seguro no deseado


/*--Formilario inicial--*/

let formulario = document.getElementById("formulario");
let inputUsuario = document.getElementById("inputUsuario");
let inputPassword = document.getElementById("inputPassword");

formulario.onsubmit = (event) => validarFormulario(event);
function validarFormulario(event) {
  event.preventDefault();
  console.log(event.target);
  console.log("Ingreso el usuario");
  console.log(inputUsuario.value);
  console.log(inputPassword.value);
  formulario.reset();
}

const btnMostrarAlert = document.getElementById("btn-ingreso");
btnMostrarAlert.onclick = mostrarAlert;

function mostrarAlert(e) {
  e.preventDefault();
  const valor = document.querySelector("#inputUsuario").value;
  if (valor === "") {
    Swal.fire({
      title: "Error",
      text: "Por favor ingrese un usuario",
      icon: "error",
      confirmButtonText: "Confirmar",
    });
  } else {
    Swal.fire({
      icon: "success",
      title: `Bienvenido/a ${valor}`,
      text: "Por favor ingrese a la pestaña Productos",
    }).then((value) => {
      if (value) {
        window.location.href = "";
      }
    });
  }
}

/*--CLASES--*/

class Producto {
  constructor(id, nombreTipo, imagen, precio) {
    this.id = id;
    this.nombreTipo = nombreTipo;
    this.imagen = imagen;
    this.precio = precio;
  }
}

/*--CATALOGO--*/

let catalogoProductos = [];
let item1 = new Producto(1, "Brahma en lata", "Brahma en lata.jpg", 400);
let item2 = new Producto(2, "Coca Cola", "coca.jpg", 500);
let item3 = new Producto(3, "Fernet 1l", "Fernet 1l.jpg", 1500);
let item4 = new Producto(4, "Skyy rasberry", "Skyy rasberry.jpg", 2000);
let item5 = new Producto(5, "Speed XL", "Speed XL.jpg", 600);
let item6 = new Producto(
  6,
  "Chivas Regal 700cc",
  "Chivas Regal 700cc.jpg",
  5000
);
catalogoProductos.push(item1);
catalogoProductos.push(item2);
catalogoProductos.push(item3);
catalogoProductos.push(item4);
catalogoProductos.push(item5);
catalogoProductos.push(item6);

/*-- Generar mis tarjetas de seguros--*/

function renderCard(item) {
  let cardRendered = `
    <div id="cardt" class="card m-3" style="width: 18rem">
        <img src="./IMG/${item.imagen}" class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title">${item.id}.${item.nombreTipo}</h5>
            <p class="precio">$ ${item.precio}</p>
            <a href="#" class="btn d-grid gap-2 btn-primary botonDeEleccion" id="${item.id}">Elegir</a> 
        </div> 
    </div>`;
  return cardRendered;
}

const btnMostrarToast = document.getElementById("cards");
btnMostrarToast.onclick = cardToastify;

function cardToastify() {
  Toastify({
    text: "Producto seleccionado",
    className: "info",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
}

let cardsDiv = document.querySelector("#cards");
catalogoProductos.forEach((seguro) => {
  cardsDiv.innerHTML += renderCard(seguro);
});

const clickButton = document.querySelectorAll(".botonDeEleccion");
const tbody = document.querySelector(".tbody");
const abonarButton = document.getElementById("btn-pago");

let carrito = [];

clickButton.forEach((btn) => {
  btn.addEventListener("click", addToCarrito);
});

function addToCarrito(e) {
  const button = e.target;
  const item = button.closest(".card");
  const itemTitle = item.querySelector(".card-title").textContent;
  const itemPrice = item.querySelector(".precio").textContent;
  const itemImg = item.querySelector(".card-img-top").src;

  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1,
  };
  addItemCarrito(newItem);
}

/*--Suma total y borrado a eleccion--*/

function addItemCarrito(newItem) {
  const inputElemento = tbody.getElementsByClassName("input_elemento");
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === newItem.title.trim()) {
      carrito[i].cantidad++;
      const inputValue = inputElemento[i];
      inputValue.value++;
      carritoTotal();
      return null;
    }
  }
  carrito.push(newItem);
  renderCarrito();
}

function renderCarrito() {
  tbody.innerHTML = "";
  carrito.map((item) => {
    const tr = document.createElement("tr");
    tr.classList.add("itemCarrito");
    const Content = `
    <th scope= "row">1</th>
      <td class="table_productos">
        <img src=${item.img} class="card-img-top card m-3" style="width: 18rem">
        <h6 class="title">${item.title}</h6>
      </td>
      <td class="table_precio"><p>${item.precio}</p></td>
      <td class="table_cantidad">
        <input type="number" min="1" value=${item.cantidad} class="input_elemento">
        <button class="delete btn btn-danger" id="delete-buttom">X</button>
      </td>
    `;
    tr.innerHTML = Content;
    tbody.append(tr);

    tr.querySelector(".delete").addEventListener("click", removeItemCarrito);

    const btnMostrarToast2 = document.getElementById("delete-buttom");
    btnMostrarToast2.onclick = cardToastify2;

    function cardToastify2() {
      Toastify({
        text: "Compra borrada",
        className: "info",
        style: {
          background: "linear-gradient(to right, #FF5733, #90402F)",
        },
      }).showToast();
    }
    tr.querySelector(".input_elemento").addEventListener("change", suma);
  });
  carritoTotal();
}

const btnMostrarAlert2 = document.getElementById("btn-pago");
btnMostrarAlert2.onclick = mostrarAlert2;

function mostrarAlert2(e) {
  e.preventDefault();
  Swal.fire({
    icon: "success",
    title: `Compra abonada`,
    text: "Gracias por elegirnos",
  }).then((value) => {
    if (value) {
      window.location.href = "./index.html";
    }
  });
}

function carritoTotal() {
  let total = 0;
  const itemCartTotal = document.querySelector(".itemCartTotal");
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ""));
    total = total + precio * item.cantidad;
  });

  itemCartTotal.innerHTML = `Total $ ${total}`;
  addLocalStorage();
}

//REVISAR ACA QUE FALTA EL DESCUENTO POR TIPO DE CLIENTE

// function carritoTotal() {
//   let totalPayment = 0;
//   const itemCartTotal = document.querySelector(".itemCartTotal");
//   carrito.forEach((item) => {
//     const precio = Number(item.precio.replace("$", ""));

//     let category = document.querySelector(".category");
//     let totalPayment;

//     switch (category.value) {
//       case "Estudiante": {
//         totalPayment = totalPayment + precio * item.cantidad * 0.2;
//         break;
//       }
//       case "Trainee": {
//         totalPayment = totalPayment + precio * item.cantidad * 0.5;
//         break;
//       }
//       case "Junior": {
//         totalPayment = totalPayment + precio * item.cantidad * 0.85;
//         break;
//       }
//     }
//     //totalPayment = totalPayment + precio * item.cantidad;
//   });

//   itemCartTotal.innerHTML = `Total $ ${totalPayment}`;
//   addLocalStorage();
// }

function removeItemCarrito(e) {
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".itemCarrito");
  const title = tr.querySelector(".title").textContent;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i, 1);
    }
  }
  tr.remove();
  carritoTotal();
}

function suma(e) {
  const sumaInput = e.target;
  const tr = sumaInput.closest(".itemCarrito");
  const title = tr.querySelector(".title").textContent;
  carrito.forEach((item) => {
    if (item.title.trim() === title) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      carritoTotal();
    }
  });
}

abonarButton.addEventListener("click", () => {
  carrito.length = 0;
  tbody.innerHTML = "";
  carritoTotal();
});

/*--Storage--*/

function addLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem("carrito"));
  if (storage) {
    carrito = storage;
    renderCarrito();
  }
};

/*--FETCH--*/

async function obtenerJson() {
  const response = await fetch("json1.json");
  const data = await response.json();

  console.log(data);
}

obtenerJson();
