window.addEventListener("load", function () {

    console.log("valida el edit de producto")

    //  variables del formulario
    let name_product = document.getElementById("name");
    let price_product = document.getElementById("price");
    let description_product = document.getElementById("detail");
    // submit
    let submit = document.querySelector("button[type=submit]");
    //inputs
    let inputs = document.querySelectorAll("#formulario input");


    const validarFormulario = (e)=>{

      console.log(e.target.name)
  }

    





      inputs.forEach((input)=>{
      input.addEventListener("keyup", validarFormulario)
      input.addEventListener("blur",  validarFormulario )
      
});

name_product.addEventListener("keyup", function (e) {
    if (name_product.value.length > 0) {
        name_product.classList.remove("is-invalid");
        name_product.classList.add("is-valid");        
        
        
    } else {
        name_product.classList.remove("is-valid");
        name_product.classList.add("is-invalid");
        p.classList.add('formulario__input-error_active')
        
    }
   
  })
  price_product.addEventListener("keyup", function (e) {
    if (price_product.value.length > 0) {
        price_product.classList.remove("is-invalid");
        price_product.classList.add("is-valid");
     
      console.log(state)
    } else {
        price.classList.remove("is-valid");
        price_product.classList.add("is-invalid");
     
   
    }
    
    })
    
    description_product.addEventListener("keyup", function (e) {
        if (description_product.value.length > 0) {
            description_product.classList.remove("is-invalid");
            description_product.classList.add("is-valid");
      
       
        } else {
            description_product.classList.remove("is-valid");
            description_product.classList.add("is-invalid");
          }
        
    })

 
});