window.addEventListener("load", function () {
        let precio1 = document.getElementById("precio1")
        let precio = document.getElementById("precio")
        let select = document.getElementById("sel1");
        

    select.onchange = function(){
        precio.innerHTML ="$" + parseInt(precio1.innerHTML) * parseInt(select.value)
    }
  });