const token = localStorage.getItem("token") || sessionStorage.getItem("token");
if (token === null) {
  window.location = "masuk.html";
}
