function getDanhSachProduct() {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetAll",
    method: "GET",
  });

  promise.then(function (result) {
    console.log(result.data);
    renderTable(result.data, "tblProduct");
  });
  promise.catch(function (err) {
    console.log(err);
  });
}
function renderTable(arrProduct, idBody) {
  var htmlContent = "";
  for (i = 0; i < arrProduct.length; i++) {
    var Product = arrProduct[i];
    htmlContent += `
          <tr>
              <td>${Product.id}</td>
              <td><img src="${Product.img}" alt="" class="img-product"></td>
              <td>${Product.name}</td>
              <td>${Product.price}</td>
              <td>${Product.description}</td>
              <td>${Product.type}</td>
              <td>
                  <button class="btn btn-danger" onclick="xoaProduct('${Product.id}')">Xoa</button>
                  <button class="btn btn-primary" onclick="suaProuct('${Product.id}')">Sua</button>
              </td>
          </tr>
      `;
  }
  document.getElementById(idBody).innerHTML = htmlContent;
}
// -----POST-----
document.getElementById("btnXacNhan").onclick = function () {
  var Product = new product();
  Product["id"] = document.getElementById("id").value;
  Product["name"] = document.getElementById("name").value;
  Product["price"] = document.getElementById("price").value;
  Product["img"] = document.getElementById("img").value;
  Product["description"] = document.getElementById("description").value;
  Product["type"] = document.getElementById("type").value;

  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/CreateProduct",
    method: "POST",
    data: Product,
  });
  promise.then(function (result) {
    alert(result.data.content);
    getDanhSachProduct();
  });
  promise.catch(function (err) {
    console.log(err.content);
  });
};

// -----xóa product-----
function xoaProduct(idProduct) {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/DeleteProduct/" + idProduct,
    method: "DELETE",
  });
  promise.then(function (result) {
    alert(result.data.content);
    getDanhSachProduct();
  });
  promise.catch(function (err) {
    alert(err.data);
    console.log(err);
  });
}

//------lấy thông tin product-----
function suaProuct(idProduct) {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetById/" + idProduct,
    method: "GET",
  });
  promise.then(function (result) {
    let foundProduct = result.data;
    document.getElementById("id").value = foundProduct.id;
    document.getElementById("name").value = foundProduct.name;
    document.getElementById("price").value = foundProduct.price;
    document.getElementById("img").value = foundProduct.img;
    document.getElementById("description").value = foundProduct.description;
    document.getElementById("type").value = foundProduct.type;

    document.getElementById("id").disabled = true;
  });
  promise.catch(function (err) {
    console.log(err);
  });
}

// --------cập nhật product
document.getElementById("btnCapNhat").onclick = function () {
  var productCapNhat = new product();
  productCapNhat["id"] = document.getElementById("id").value;
  productCapNhat["name"] = document.getElementById("name").value;
  productCapNhat["price"] = document.getElementById("price").value;
  productCapNhat["img"] = document.getElementById("img").value;
  productCapNhat["description"] = document.getElementById("description").value;
  productCapNhat["type"] = document.getElementById("type").value;

  // call api
  var promise = axios({
    url:
      "http://svcy.myclass.vn/api/Product/UpdateProduct/" + productCapNhat.id,
    method: "PUT",
    data: productCapNhat,
  });
  promise.then(function (result) {
    alert(result.data.content);
    getDanhSachProduct();
  });
  promise.catch(function (err) {
    console.log(err);
  });
  document.getElementById("id").disabled = false;
};

// -----tìm product-----
function findProduct() {
  let productKey = document.getElementById("tuKhoa").value;
  if (productKey) {
    var promise = axios({
      url:
        "http://svcy.myclass.vn/api/Product/SearchByName?name=" +
        encodeURI(productKey),
      method: "GET",
    });
    promise.then(function (result) {
      renderTable(result.data, "tblProduct");
      return;
    });
    promise.catch(function (err) {
      return;
    });
  } else {
    getDanhSachProduct();
  }
}

window.onload = function () {
  getDanhSachProduct();
};
