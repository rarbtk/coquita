function callInputFile() {
  var inputAvatar = document.getElementById("avatarInputFile");
  if (inputAvatar) {
    inputAvatar.click();
  }
}

var inputAvatar = document.getElementById("avatarInputFile");

inputAvatar.addEventListener("change", function () {
  console.log("change");
});
