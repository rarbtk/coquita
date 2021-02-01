window.addEventListener("load", function () {

    console.log("valida el edit de producto")

    //  variables del formulario
    let name_product = document.getElementById("name");
    let price_product = document.getElementById("price");
    let description_product = document.getElementById("detail");
    let category_product = document.getElementById("sel1");
    let image_product = document.getElementById("image");

    
   // submit
let submit = document.querySelector("button[type=submit]");

let state = {
	name_product: false,
	price_product: false,
	description_product: false,
	category_product: false,
	image_product: false
}

name_product.addEventListener("keyup", function (e) {
    if (name_product.value.length >= 8) {
        name_product.classList.remove("is-invalid");
        name_product.classList.add("is-valid");        
      state.name_product = true;
    } else {
        name_product.classList.remove("is-valid");
        name_product.classList.add("is-invalid");
        p.classList.add('formulario__input-error_active')
      state.name_product = false;
    }
    checkState();
    console.log(state);
    e.preventDefault();
  })
  price_product.addEventListener("keyup", function (e) {
    if (price_product.value.length >= 4) {
        price_product.classList.remove("is-invalid");
        price_product.classList.add("is-valid");
      state.price_product = true;
    } else {
        price.classList.remove("is-valid");
        price_product.classList.add("is-invalid");
      state.price_product = false;
    }
    checkState();
    console.log(state);
    e.preventDefault();
    })
    
    description_product.addEventListener("keyup", function (e) {
        if (description_product.value.length >= 8) {
            description_product.classList.remove("is-invalid");
            description_product.classList.add("is-valid");
          state.description_product = true;
        } else {
            description_product.classList.remove("is-valid");
            description_product.classList.add("is-invalid");
          state.description_product = false;
        }
        checkState();
        console.log(state);
        e.preventDefault();
    })

  function checkState(e) {
    console.log('hola soy check state')
    if (state.name_product) {
      submit.disabled = false;
    } else {
      submit.disabled = true;
    }
  }
});