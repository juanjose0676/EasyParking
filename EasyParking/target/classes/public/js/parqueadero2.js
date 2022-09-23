/*$(document).ready(() => {
  //listado parqueadero
  const list = () => {
    $.ajax({
      url: "http://localhost:8080/parqueadero/list",
      type: "GET",
      dataType: "json",
      success: function (res) {
        let data = "";
        res.forEach((element) => {
          data += `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.nit}</td>
                    <td>${element.razon_social}</td>
                    <td>${element.email}</td>
                    <td>${element.plaza_carro}</td>
                    <td>${element.plaza_moto}</td>
                    <td>
                            <button type="button" class="btn btn-primary" onclick='window.location = "/form_products.html?id=${element.id}"'>Editar</button>
                            <button type="button" class="btn btn-danger" onclick='deleteProducto(${element.id})'>Eliminar</button>
                        </td>
                </tr>
            `;
        });
        $("#parqueadero-table").html(data);
      },
    });
  };

  //guardado parqueadero
  const save = () => {
    $("#agregar").on("click", function () {
      const datosParqueadero = {
        nit: $("#nit").val(),
        razon_social: $("#razon_social").val(),
        email: $("#email").val(),
        plaza_carro: $("#plaza_carro").val(),
        plaza_moto: $("#plaza_moto").val(),
      };
      $.ajax({
        url: "http://localhost:8080/parqueadero/save",
        contentType: "aplication/json",
        type: "POST",
        data: JSON.stringify(datosParqueadero),
        dataType: "json",
        success: (data) => {
          console.log("Parqueadero resgistrado");
        },
      });
    });
  };
  //llamadas a funciones
  list();
  save();
});*/

$(document).ready(function () {
  readProducts();
});

function readProducts() {
  $("#parqueadero-table").empty();

  $.ajax({
    method: "GET",
    url: "http://localhost:8080/parqueadero/list",
    type: "JSON",
    contentType: "aplication/json",
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        var row = `<tr>
                              <td>${data[i].id}</td>
                              <td>${data[i].nit}</td>
                              <td>${data[i].razon_social}</td>
                              <td>${data[i].email}</td>
                              <td>${data[i].plaza_carro}</td>
                              <td>${data[i].plaza_moto}</td>
                              <td>
                                  <a href="javascript:editProduct(${data[i].id})" class="btn btn-warning">Editar</span></a>
                                  <a href="javascript:deleteProduct(${data[i].id})"   class="btn btn-danger">Borrar</a>
                              </td>
                      </tr>`;
        $("#parqueadero-table").append(row);
      }
    },
  });
}

/* function deleteProduct(id) {
    var conf = confirm("¿Está seguro, realmente desea eliminar el registro?");
    if (conf == true) {
      $.ajax({
        url: "http://localhost:8080/products/" + id,
        method: "DELETE",
        success: function (result) {
          readProducts();
        },
        error: function (request, msg, error) {
          // handle failure
        },
      });
    }
  }*/

function addProduct() {
  var product = {
    nit: $("#nit").val(),
    razon_social: $("#razon_social").val(),
    email: $("#email").val(),
    plaza_carro: $("#plaza_carro").val(),
    plaza_moto: $("#plaza_moto").val(),
    //idTypeProduct: {
    //idTypeProduct: $("#tipo2").val(),
    //},
  };

  var json = JSON.stringify(product);

  $.ajax({
    type: "POST",
    url: "http://localhost:8080/parqueadero/",
    data: json,
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      $("#add_product").modal("hide");
      readProducts();

      $("#nit").val("");
      $("#razon_social").val("");
      $("#email").val("");
      $("#plaza_carro").val("");
      $("#plaza_moto").val("");
      location.reload();
    },
  });
}

/* function updateProduct() {
    // get values
  
    var product = {
      idProduct: sessionStorage.getItem("id"),
      productName: $("#title2").val(),
      purchaseValue: $("#purchase2").val(),
      saleValue: $("#sale2").val(),
      amount: $("#amount2").val(),
      idTypeProduct: {
        idTypeProduct: $("#tipo2").val(),
      },
    };
  
    var json = JSON.stringify(product);
  
    $.ajax({
      type: "PUT",
      url: "http://localhost:8080/products/",
      data: json,
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        $("#update_product").modal("hide");
        readProducts();
      },
    });
  }
  /*
  function editProduct(id) {
    sessionStorage.setItem("id", id);
    $.ajax({
      url: "http://localhost:8080/products/" + id,
      method: "GET",
      success: function (data) {
        $("#title2").val(data.productName);
        $("#sale2").val(data.saleValue);
        $("#purchase2").val(data.purchaseValue);
        $("#amount2").val(data.amount);
        $("#tipo2").val(data.idTypeProduct.idTypeProduct);
  
        $("#update_product").modal("show");
      },
      error: function (request, msg, error) {
        // handle failure
      },
    });
  }*/
