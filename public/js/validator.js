//email validator
let email = document.getElementById("email");
let emailMessage = document.getElementById("input-email");
//Password validator
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");

// submit
let submit = document.querySelector("button[type=submit]");

let state = {
  email: false,
  password: false,
  confirmPassword: false,
};

password.addEventListener("keyup", function () {
  if (password.value.length >= 8) {
    password.classList.remove("is-invalid");
    password.classList.add("is-valid");
    state.password = true;
  } else {
    password.classList.remove("is-valid");
    password.classList.add("is-invalid");
    state.password = false;
  }
  checkState();
  console.log(state);
});

confirmPassword.addEventListener("keyup", function () {
  //
  if (password.value == confirmPassword.value) {
    confirmPassword.classList.remove("is-invalid");
    confirmPassword.classList.add("is-valid");
    state.confirmPassword = true;
  } else {
    confirmPassword.classList.add("is-invalid");
    confirmPassword.classList.remove("is-valid");
    state.confirmPassword = false;
  }
  checkState();
  console.log(state);
});
email.addEventListener("keyup", function () {
  if (validator.isEmail(email.value)) {
    this.classList.remove("is-invalid");
    this.classList.add("is-valid");
    state.email = true;
  } else {
    this.classList.remove("is-valid");
    this.classList.add("is-invalid");
    state.email = false;
  }
  checkState();
  console.log(state);
});

function checkState() {
  if (state.email && state.password && state.confirmPassword) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
}
