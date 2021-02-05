window.addEventListener("load", function () {
        let precio1 = document.getElementById("precio1")
        let precio = document.getElementById("precio")
        let select = document.getElementById("sel1");
        let eliminar = document.getElementById("eliminar");

    select.onchange = function(){
        precio.innerHTML ="$" + parseInt(precio1.innerHTML) * parseInt(select.value)
    }

    eliminar.click = function(){
        alert('seguro?')
    }
  });