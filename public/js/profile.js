window.addEventListener("load", function () {
  var inputAvatar = document.getElementById("avatarInputFile");
  var savePassword = document.getElementById("btnSavePassword");
  var changePasswordForm = document.getElementById("changePasswordForm");

  inputAvatar.addEventListener("change", function (e) {
    if (/\.(jpe?g|png|gif)$/i.test(inputAvatar.files[0].name)) {
      var btnUploadAvatar = document.getElementById("btn-upload-avatar");
      if (btnUploadAvatar) {
        console.log(btnUploadAvatar);
        btnUploadAvatar.click();
      }
    } else {
      var errors = document.querySelector(".errors");
      console.log("selecciono la clase error: ", errors);
      errors.innerHTML = `
      <div class="alert mt-2 alert-danger alert-dismissible fade show" role="alert">
      <strong>Solo se aceptan avatars tipo GIF, JPG y PNG</strong> Favor de verificar el archivo y intentar nuevamente
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    `;
    }
  });

  changePasswordForm.addEventListener("submit", function (e) {
    var inputPassword = document.getElementById("password");
    var btnSavePassword = document.getElementById("btnSavePassword");
    var btnChangePassword = document.getElementById("btChangePassword");

    // Validar password valida // mayor a 8 caracteres
    if (inputPassword) {
      if (inputPassword.value.length >= 8) {
        // deshabilitar save password
        btnSavePassword.disabled = "true";

        // deshabilito input password
        inputPassword.disabled = "true";

        // habilitar change password
        btnChangePassword.removeAttribute("disabled");
      } else {
        // no cumple la password con 8 caracteres
        e.preventDefault();
      }
    }
  });
});

function changePassword() {
  var inputPassword = document.getElementById("password");
  var btnChangePassword = document.getElementById("btChangePassword");
  var btnSavePassword = document.getElementById("btnSavePassword");

  console.log("changing password");
  inputPassword.removeAttribute("disabled");
  inputPassword.value = "";
  inputPassword.focus();
  btnChangePassword.disabled = "true";
  btnSavePassword.removeAttribute("disabled");
}

function callInputFile() {
  var inputAvatar = document.getElementById("avatarInputFile");
  if (inputAvatar) {
    inputAvatar.click();
  }
}
