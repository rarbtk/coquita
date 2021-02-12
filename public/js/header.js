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
      console.log(cart.data.meta.items_count);
      shopQuantity.innerHTML = `(${cart.data.meta.items_count})`;
    })
    .catch((error) => {
      console.log(error);
    });
});
