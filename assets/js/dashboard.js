const sidebarToggle = document.querySelector("#sidebarToggle");
const wrapper = document.querySelector("#wrapper");

sidebarToggle.addEventListener("click", function () {
  wrapper.classList.toggle("resize");
});

const foto = document.querySelector("#foto");
const formGantiFoto = document.querySelector("#formGantiFoto");
if (foto !== null) {
  foto.addEventListener("change", function () {
    formGantiFoto.submit();
  });
}
