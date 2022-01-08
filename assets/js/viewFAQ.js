import allFAQ from "./dataFAQ.js";
function showFAQ() {
  const container = document.getElementById("accordionExample");
  let faqHTML = "";
  allFAQ.forEach((faq) => {
    faqHTML += `
    <div class="card border-0">
    <div id="heading${faq.id}">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${faq.id}" aria-expanded="false" aria-controls="collapse${faq.id}">
        ${faq.q}
        </button>
        <hr>
      </h5>
    </div>
    <div class="deskripsi">
    <div id="collapse${faq.id}" class="collapse" aria-labelledby="heading${faq.id}" data-parent="#accordionExample">
      <div class="col-10 offset-1 my-5">
      ${faq.a}
      </div>
    </div>
  </div>
</div>
        `;
  });
  container.innerHTML = faqHTML;
}

showFAQ();
