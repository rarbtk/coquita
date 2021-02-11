const URL = "http://127.0.0.1:3000";

window.addEventListener("load", function () {
  const items_container = document.getElementById("items");
  const userId = document.getElementById("userId").innerHTML;

  // find cartId by userId
  axios.get(`${URL}/api/cart/user/${userId}`).then((cart) => {
    console.log(cart.data.data.cartItems);
    carItems = cart.data.data.cartItems;

    cart["data"]["data"]["cartItems"].forEach((data) => {
      console.log(" count - ", data);
      items_container.innerHTML += `<div class="row mb-3 mt-3 item" id=${data.id}>
      <div class="col-md-1">
          <img src="/images/cupcake.svg" alt="" class="product-image">
      </div>
      <div class="col-2 product-details">
          <p class="product-details-title"><strong>Torta Advengers</strong></p>
          <p class="product-details-price"><strong>$ ${data.price}</strong></p>
      </div>
      <div class="col-md-2 actions-container">
          <button class="btn-outline-danger btn btn-remove-item" id="removeItem" value=${data.id}>
              <i class="bi bi-x-circle"> Eliminar</i>
          </button>
      </div>
  </div>`;
    });

    btn_removeItem = document.querySelectorAll("button.btn-remove-item");

    console.log(btn_removeItem);

    btn_removeItem.forEach(function (button) {
      button.addEventListener("click", function (event) {
        console.log(this.value);
        console.log("Elimino item ", this.value);
        const data = JSON.stringify({ id: this.value });
        var config = {
          method: "delete",
          url: `${URL}/api/cart/item`,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
        axios(config)
          .then((res) => {
            console.log("cart Item delete: ", res);
            //remove element into html
            const myItemToDelete = document.getElementById(this.value);
            myItemToDelete.parentNode.removeChild(myItemToDelete);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  });
});
