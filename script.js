var cart = {};

function addItem(productId) {
  var quantity = parseInt(
    document.getElementById("quantity" + productId).value
  );

  if (quantity > 0) {
    var productName = "Sản phẩm " + productId;
    var productPrice = getPrice(productId);
    var totalPrice = quantity * productPrice;

    if (cart[productName]) {
      cart[productName].quantity += quantity;
      cart[productName].totalPrice += totalPrice;
    } else {
      cart[productName] = {
        quantity: quantity,
        totalPrice: totalPrice,
      };
    }

    updateCart();
  }
}

function updateCart() {
  var cartTable = document.getElementById("cartTable");
  var totalPriceElement = document.getElementById("totalPrice");

  while (cartTable.rows.length > 1) {
    cartTable.deleteRow(1);
  }

  var total = 0;

  for (var product in cart) {
    if (cart.hasOwnProperty(product)) {
      var row = cartTable.insertRow();

      var productNameCell = row.insertCell(0);
      productNameCell.innerHTML = product;

      var quantityCell = row.insertCell(1);
      quantityCell.innerHTML = cart[product].quantity;

      var totalPriceCell = row.insertCell(2);
      totalPriceCell.innerHTML = cart[product].totalPrice;

      var deleteButtonCell = row.insertCell(3);
      var deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Xóa sản phẩm";
      deleteButton.onclick = createDeleteFunction(product);
      deleteButtonCell.appendChild(deleteButton);

      total += cart[product].totalPrice;
    }
  }

  if (total > 0) {
    totalPriceElement.innerHTML = "Tổng giá tiền: " + total;
    cartTable.style.display = "table";
  } else {
    totalPriceElement.innerHTML = "";
    cartTable.style.display = "none";
  }
}

function createDeleteFunction(product) {
  return function () {
    delete cart[product];
    updateCart();
  };
}

function getPrice(productId) {
  var price;
  switch (productId) {
    case 1:
      price = 1000;
      break;
    case 2:
      price = 2000;
      break;
    case 3:
      price = 3000;
      break;
    case 4:
      price = 4000;
      break;
    default:
      price = 0;
  }
  return price;
}
