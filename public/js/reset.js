window.addEventListener("load", function () {
  console.log("TEEEEEEEEEEEEESTTTTTTTTTTTTTT");
  var getPassword = document.getElementById("formID");
  console.log(getPassword);

  getPassword.addEventListener("submit", function (event) {
    var email = document.getElementById("email");

    console.log("click");
    if (email.length > 0) {
    } else {
      //event.preventDefault();
    }
  });
});
