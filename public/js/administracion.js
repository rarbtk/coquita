window.addEventListener("load", function () {

  let eliminar = document.getElementById('eliminarProduct')

    eliminar.addEventListener("submit", function(e){
        e.preventDefault()

        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No vas a poder revertir el cambio!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
                this.submit()
            }
          })
    })
    

});