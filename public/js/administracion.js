window.addEventListener("load", function () {

  let eliminar = document.getElementById('eliminarProduct')
  let eliminarUser = document.querySelectorAll('.eliminarUser')
  let idUser = document.getElementById('idUser')
  console.log("array user" + eliminarUser);

  eliminarUser.forEach(function (button) {
    button.addEventListener("submit", function (e) {
    e.preventDefault()
    console.log("ACA HACE EL PREVENT");
    if (idUser == 1){
      Swal.fire({
        title: 'No podes eliminar este usuario',
        text: "¡El usuario es administrador!",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok!'
      }).then((result) => {
        if (result.isConfirmed) {
        }
      })
    }
   })
  })

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