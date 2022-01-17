class InputWarningHelper {
  onChange(e) {
    let warning = document.getElementById(e.target.id + "Warning");
    if (!document.getElementById(warning.id).classList.contains("hidden")) {
      document.getElementById(warning.id).classList.add("hidden");
    }
  }
  onBlur(e) {
    let warning = document.getElementById(e.target.id + "Warning");
    if (e.target.value === "") {
      document.getElementById(warning.id).classList.remove("hidden");
    }
  }
  ValidateEmail(inputText) {
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.value.match(mailFormat)) {
      return true;
    } else {
      return false;
    }
  }
}
export default new InputWarningHelper();
