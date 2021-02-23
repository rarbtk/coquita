

const URL = "http://127.0.0.1:3000";

window.addEventListener("load", function () {
  const items_container = document.getElementById("items");
  const userId = document.getElementById("userId").innerHTML;

  // find cartId by userId
  axios.get(`${URL}/api/cart/user/${userId}`).then((cart) => {
    //carItems = cart.data.data.cartItems;
    console.log(cart);
    let total = 0;
    let cartId =cart.data.data.cart[0].id
    console.log("CART_ID", cartId)
    let cartIdElement = document.getElementById("cartId").value=cartId
    cartIdElement.disabled = "true"


    cart["data"]["data"]["cart"][0]["products"].forEach((data) => {
      items_container.innerHTML += `<div class="row mb-3 mt-3 item" id=${data.CartItem.id}>
        <div class="col-md-2">
            <img src="/images/cupcake.svg" alt="" class="product-image">
        </div>
        <div class="col-3 product-details">
            <p class="product-details-title"><strong>${data.name}</strong></p>
            <p class="product-details-price"><strong>Precio Unitario $ ${data.price}</strong></p>
            <p class="product-details-price"><strong>Cantidad X ${data.CartItem.quantity} </strong></p>
            <p class="product-details-price"><strong>Subtotal $ ${data.CartItem.subTotal}</strong></p>
        </div>
        <div class="col-md-2 actions-container">
            <button class="btn-outline-danger btn btn-remove-item" id="removeItem" value=${data.CartItem.id}>
                <i class="bi bi-x-circle"> Eliminar</i>
            </button>
        </div>
    </div>`;
      // calculate total amount
      total = Number(total) + Number(data.CartItem.subTotal);
      document.getElementById("totalAmount").innerHTML = total;
      console.log("TOTAL: ", total);
    });

    //remove item
    btn_removeItem = document.querySelectorAll("button.btn-remove-item");
    console.log("BOTONES: ", btn_removeItem);

    btn_removeItem.forEach(function (button) {
      button.addEventListener("click", function (event) {
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
            //remove element into html
            const myItemToDelete = document.getElementById(this.value);
            myItemToDelete.parentNode.removeChild(myItemToDelete);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });

    btn_pay = document.getElementById("pay")
    // close cart
    btn_pay.addEventListener("click", function(){
      config = {
        method: "post",
        url: `${URL}/api/cart/finish`,
        data: {
          "cart_id":document.getElementById("cartId").value,
          "user_id":userId
        },
      }
      axios(config)
      .then((response)=>{
        config = {
          method: "post",
          url: `${URL}/api/cart/create`,
          data: {
            "user_id":userId
          },
        }

        axios(config)
        .then(()=>{
          window.location.href='/cart/cart_finished'
        })

        
      })
    })
  });
});
