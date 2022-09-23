function loadData() {
  let request = sendRequest("parqueadero/list", "GET", "");
  let table = document.getElementById("parqueadero-table");
  table.innerHTML = "";
  request.onload = function () {
    let data = request.response;
    console.log(data);
    data.forEach((element, index) => {
      table.innerHTML += `
                <tr>
                    <th>${element.id}</th>
                    <td>${element.nit}</td>
                    <td>${element.razonsocial}</td>
                    <td>${element.email}</td>
                    <td>${element.plazacarro}</td>
                    <td>${element.plazamoto}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick='window.location = "/form_products.html?id=${element.id}"'>Editar</button>
                        <button type="button" class="btn btn-danger" onclick='deleteProducto(${element.id})'>Eliminar</button>
                    </td>
                </tr>
  
                `;
    });
  };
  request.onerror = function () {
    table.innerHTML = `
            <tr>
                <td colspan="6">Error al recuperar los datos.</td>
            </tr>
        `;
  };
}

function loadProducto(id) {
  let request = sendRequest("parqueaderp/list/" + id, "GET", "");
  let nit = document.getElementById("parqueadero-nit");
  let razonsocial = document.getElementById("parqueadero-razonsocial");
  let email = document.getElementById("parqueadero-email");
  let plazacarro = document.getElementById("parqueadero-plazacarro");
  let plazamoto = document.getElementById("parqueadero-plazamoto");
  let id = document.getElementById("parqueadero-id");
  request.onload = function () {
    let data = request.response;
    id.value = data.id;
    nit.value = data.nit;
    razonsocial.value = data.razonsocial;
    email.value = data.email;
    plazacarro.value = data.plazacarro;
    plazamoto.value = data.plazamoto;
  };
  request.onerror = function () {
    alert("Error al recuperar los datos.");
  };
}

function deleteProducto(id) {
  let request = sendRequest("parqueadero/" + id, "DELETE", "");
  request.onload = function () {
    loadData();
  };
}

function saveProducto() {
  let nit = document.getElementById("parqueadero-nit").value;
  let razonsocial = document.getElementById("parqueadero-razonsocial").value;
  let email = document.getElementById("parqueadero-email").value;
  let plazacarro = document.getElementById("parqueadero-plazacarro").value;
  let plazamoto = document.getElementById("parqueadero-plazamoto").value;
  let id = document.getElementById("parqueadero-id").value;
  let data = {
    id: id,
    nit: nit,
    razonsocial: razonsocial,
    email: email,
    plazacarro: plazacarro,
    plazamoto: plazamoto,
  };
  let request = sendRequest("parqueadero/", id ? "PUT" : "POST", data);
  request.onload = function () {
    window.location = "parqueadero.html";
  };
  request.onerror = function () {
    alert("Error al guardar los cambios.");
  };
}
