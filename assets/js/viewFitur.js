import allFitur from "./dataFitur.js";
function showFitur() {
  const container = document.getElementById("fitur-container");
  let fiturHTML = "";
  allFitur.forEach((fitur) => {
    fiturHTML += `
                <div class="col-md-6 col-lg-4">
                    <div class="card border-0">
                        <div class="icon">
                            <img src=${fitur.icon} alt=${fitur.nama + "icon"}>
                        </div>
                        <div class="text">
                            <h5 class="title">${fitur.nama}</h5>
                            <p>${fitur.deskripsi} </p>
                        </div>
                    </div>
                </div>
        `;
  });
  container.innerHTML = fiturHTML;
}

showFitur();
