window.addEventListener("load", function () {
  var inputAvatar = document.getElementById("avatarInputFile");
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
    var inputEmail = document.getElementById("email").value;
    var inputPassword = document.getElementById("password").value;
    var btnSavePassword = document.getElementById("btnSavePassword");
    var btnChangePassword = document.getElementById("btChangePassword");
    var messages = document.querySelector(".messages");

    console.log("SUBMIT: ", inputEmail);
    console.log("SUBMIT: ", inputPassword);
    e.preventDefault();
    // Validar password valida // mayor a 8 caracteres

    if (inputPassword.length >= 8) {
      // deshabilitar save password
      btnSavePassword.disabled = "true";

      // deshabilito input password
      inputPassword.disabled = "true";

      // habilitar change password
      btnChangePassword.removeAttribute("disabled");

      //armo el body
      const body = {
        email: inputEmail,
        password: inputPassword,
      };
      fetch("/user/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        // obtengo response en formato JSON
        .then(function (response) {
          return response.json();
        })
        //valido response
        .then(function (dataDecode) {
          console.log("DATA DECODE:", dataDecode);
          if (dataDecode.status) {
            if (dataDecode.status === "ok") {
              messages.innerHTML = `<div class="alert mt-2 alert-success alert-dismissible fade show" role="alert">
                <strong>${dataDecode.message}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              `;
            } else {
              messages.innerHTML = `<div class="alert mt-2 alert-danger alert-dismissible fade show" role="alert">
                <strong>${dataDecode.message}</strong> Favor de intentar nuevamente mas tarde
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              `;
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      messages.innerHTML = `<div class="alert mt-2 alert-danger alert-dismissible fade show" role="alert">
                <strong>La contraseña debe ser mayor a 8 caracteres</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              `;
      e.preventDefault();
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
