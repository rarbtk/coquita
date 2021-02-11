window.addEventListener("load", function () {
  const URL = "http://127.0.0.1:3000";
  const userId = document.getElementById("userId").innerHTML;
  const shopQuantity = document.getElementById("shop-quantity");

  config = {
    method: "get",
    url: `${URL}/api/cart/user/${userId}`,
  };

  axios(config)
    .then((cart) => {
      if (cart.data.data.cart.length > 0) {
        console.log("mayor a cero");
        console.log(cart.data.meta.items_count);
        shopQuantity.innerHTML = `(${cart.data.meta.items_count})`;
      } else {
        console.log("carrito not found");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
